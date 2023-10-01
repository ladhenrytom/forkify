import logo from "../../assets/logo.png";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import NavbarStyles from "./navbar.module.css";
import {Avatar, Badge, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography} from "@mui/material";
import {Close, Delete, Search} from "@mui/icons-material";
import {PageContext} from "../../App";
import {queries} from "../../searchHelper";

function Navbar() {
  const {fetcher, bookmarks, setBookmarks, showRecipe, alertMessage, setOpenPreview} = useContext(PageContext);
  const [searchText, setSearchText] = useState("");
  const [searchOptions, setSearchOptions] = useState<string[] | []>([]);
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setShowSearchOptions(true);
    setSearchOptions(queries.filter(q => q.includes(e.target.value)));
  };

  const handleFetch = (option: string) => {
    setShowSearchOptions(false);
    fetcher(option);
    setSearchText("");
  };

  const deleteBookmark = (id: string) => {
    const arr = bookmarks.filter(b => b.id !== id);
    setBookmarks(arr);
    localStorage.setItem("bookmarks", JSON.stringify(arr));
    alertMessage("Bookmark removed");
  };

  useEffect(() => {
    searchText.length < 1 && setShowSearchOptions(false);
  }, [searchText]);

  return (
    <Box className="h-full w-full">
      {/* big screen nav display */}
      <div className={`${NavbarStyles.container} xs:hidden md:flex justify-between items-center w-full h-full rounded-t-xl px-12`}>
        {/* logo */}
        <img src={logo} alt="logo" className="block h-12" />

        {/* search */}
        <div className="relative h-full flex items-center">
          <form
            className={`${NavbarStyles.form} flex justify-between pl-8`}
            onSubmit={e => {
              e.preventDefault();
              handleFetch(searchText);
            }}
            method="GET"
          >
            <input required className={`${NavbarStyles.input} pr-2 bg-transparent focus:outline-none w-full `} name="searchText" value={searchText} placeholder="Search over 1,000,000 recipes..." onChange={handleChange} />
            <button className=" pl-16">Search</button>
          </form>
          {showSearchOptions && (
            <div className=" absolute top-full left-0 right-0 bg-white shadow-lg max-h-96 overflow-auto z-20">
              <Stack>
                {searchOptions.sort().map((option, i) => (
                  <Typography component="div" variant="subtitle2" key={i} className={`${NavbarStyles.searchOptionItem} p-3`} onClick={() => handleFetch(option)}>
                    {option}
                  </Typography>
                ))}
              </Stack>
            </div>
          )}
        </div>

        {/* nav items*/}
        <nav className="h-full">
          <List disablePadding className=" h-full">
            <ListItem className={`${NavbarStyles.navItem} relative uppercase p-8 h-full hover:text-zinc-700 `} onMouseEnter={() => setShowBookmarks(true)} onMouseLeave={() => setShowBookmarks(false)}>
              <Badge badgeContent={<Typography className=" text-white">{bookmarks.length}</Typography>} color="primary" invisible={bookmarks.length < 1}>
                <Typography variant="subtitle1" className=" p-1 capitalize text-zinc-500 ">
                  bookmarks
                </Typography>
              </Badge>
              {/* bookmarks */}
              {showBookmarks && (
                <div className=" absolute top-full right-0 bg-white max-h-96 w-96 py-2 shadow-lg overflow-auto z-20">
                  {bookmarks.length > 0 ? (
                    <List>
                      <Stack spacing={2}>
                        {bookmarks.map(b => (
                          <ListItem
                            id={b.id}
                            key={b.id}
                            className={`${NavbarStyles.bookmarkItem} py-4 px-8 `}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete" onClick={() => deleteBookmark(b.id)}>
                                <Delete color="error" fontSize="small" />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar className="cursor-pointer" onClick={() => showRecipe(b.id)}>
                              <Avatar component="figure" sx={{width: 50, height: 50}}>
                                <figure className=" relative w-full h-full">
                                  <span className={` absolute top-0 bottom-0 right-0 left-0 opacity-40 `}></span>
                                  <img alt="" src={b.img} className={` w-full h-full object-cover`} />
                                </figure>
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              className=" pl-4"
                              primary={
                                <Typography component="big" variant="subtitle2" className=" font-bold ">
                                  {b.title}
                                </Typography>
                              }
                              secondary={<small>{b.publisher}</small>}
                            />
                          </ListItem>
                        ))}
                      </Stack>
                    </List>
                  ) : (
                    <Typography variant="body2" className="p-4 w-full text-center text-zinc-500">
                      No bookmark added yet.
                    </Typography>
                  )}
                </div>
              )}
            </ListItem>
          </List>
        </nav>
      </div>

      {/* small screen nav display */}
      <div className={`${NavbarStyles.container} relative md:hidden xs:flex justify-between w-full h-full p-2 pt-4`}>
        {/* logo */}
        <img src={logo} alt="logo" className="block h-8" />

        {/* bookmarks btn */}
        <nav className="h-6">
          <List disablePadding>
            <ListItem disablePadding className={` uppercase hover:text-zinc-700 `} onClick={() => setShowBookmarks(true)}>
              <Badge badgeContent={<Typography className=" text-white">{bookmarks.length}</Typography>} color="primary" invisible={bookmarks.length < 1}>
                <Typography variant="subtitle1" className=" p-1 capitalize text-zinc-500 ">
                  bookmarks
                </Typography>
              </Badge>
            </ListItem>
          </List>
        </nav>

        {/* bookmarks */}
        <div className={`${showBookmarks && " translate-x-full"} absolute top-0 -left-full h-screen w-screen bg-white p-2 duration-300 z-10`}>
          <Stack spacing={4}>
            <IconButton onClick={() => setShowBookmarks(false)} sx={{alignSelf: "end"}}>
              <Close />
            </IconButton>
            {bookmarks.length > 0 ? (
              <List>
                <Stack spacing={2}>
                  {bookmarks.map(b => (
                    <ListItem
                      id={b.id}
                      key={b.id}
                      className={`${NavbarStyles.bookmarkItem} py-4 px-8 `}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteBookmark(b.id)}>
                          <Delete color="error" fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar
                        className="cursor-pointer"
                        onClick={() => {
                          showRecipe(b.id);
                          setShowBookmarks(false);
                        }}
                      >
                        <Avatar component="figure" sx={{width: 50, height: 50}}>
                          <figure className=" relative w-full h-full">
                            <span className={` absolute top-0 bottom-0 right-0 left-0 opacity-40 `}></span>
                            <img alt="" src={b.img} className={` w-full h-full object-cover`} />
                          </figure>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        className=" pl-4"
                        primary={
                          <Typography component="big" variant="subtitle2" className=" font-bold ">
                            {b.title}
                          </Typography>
                        }
                        secondary={<small>{b.publisher}</small>}
                      />
                    </ListItem>
                  ))}
                </Stack>
              </List>
            ) : (
              <Typography variant="body2" className="p-4 w-full text-center text-zinc-500">
                No bookmark added yet.
              </Typography>
            )}
          </Stack>
        </div>

        {/* open search */}
        <div className="h-6">
          <IconButton onClick={() => setOpenSearch(true)} sx={{p: 1}}>
            <Search />
          </IconButton>
        </div>

        {/* search window */}
        <div className={`${openSearch && " translate-x-full"} absolute top-0 -left-full h-screen w-screen bg-white p-2 duration-300 z-10`}>
          <form
            className=" flex-col h-full"
            onSubmit={e => {
              e.preventDefault();
              handleFetch(searchText);
              setOpenSearch(false);
              setOpenPreview(true);
            }}
            method="GET"
          >
            <div className=" h-1/6 flex justify-end">
              <IconButton onClick={() => setOpenSearch(false)}>
                <Close />
              </IconButton>
            </div>
            <input required className={`${NavbarStyles.input} focus:outline-none w-full h-1/6 border-b-2 `} name="searchText" value={searchText} placeholder="Search over 1,000,000 recipes..." onChange={handleChange} />
            {showSearchOptions && (
              <div className=" h-4/6 overflow-auto">
                <Stack>
                  {searchOptions.sort().map((option, i) => (
                    <Typography
                      component="div"
                      variant="subtitle2"
                      key={i}
                      className={`${NavbarStyles.searchOptionItem} p-3`}
                      onClick={() => {
                        handleFetch(option);
                        setOpenSearch(false);
                        setOpenPreview(true);
                      }}
                    >
                      {option}
                    </Typography>
                  ))}
                </Stack>
              </div>
            )}
          </form>
        </div>
      </div>
    </Box>
  );
}

export default Navbar;
