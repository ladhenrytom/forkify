import SidebarStyles from "./sidebar.module.css";
import {Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography} from "@mui/material";
import {useContext, useState} from "react";
import {Close, East, West} from "@mui/icons-material";
import {PageContext} from "../../App";

function Sidebar() {
  const {data, showRecipe, inView, openPreview, setOpenPreview} = useContext(PageContext);
  const [currPage, setCurrPage] = useState(1);

  return (
    <Box className="block bg-white md:rounded-bl-xl h-full">
      <Stack display={{xs: "none", md: "flex"}} spacing={2} className=" py-4 h-full justify-between">
        {/* number of recipes found */}
        {data.length > 0 && (
          <Typography color="secondary.main" className=" self-center px-4">
            {data.length + " recipes found"}
          </Typography>
        )}

        {/* recipe preview list */}
        {data.length > 0 && (
          <List className="flex-1">
            {data.slice((currPage - 1) * 5, (currPage - 1) * 5 + 5).map((d, i) => (
              <ListItem key={i} sx={{py: 1.5}} className={`${SidebarStyles.listItem} ${inView === d.recipe_id && SidebarStyles.selected} cursor-pointer`} onClick={() => showRecipe(d.recipe_id)}>
                <ListItemAvatar>
                  <Avatar component="figure" sx={{width: 50, height: 50}}>
                    <figure className=" relative w-full h-full rounded-full">
                      <span className={`${SidebarStyles.imgOverlay} absolute top-0 bottom-0 right-0 left-0 rounded-full opacity-40 `}></span>
                      <img alt="" src={d.image_url} className={`${SidebarStyles.previewImg} w-full h-full object-cover rounded-full`} />
                    </figure>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component="big" fontWeight="bold">
                      {d.title}
                    </Typography>
                  }
                  secondary={<small>{d.publisher}</small>}
                  sx={{pl: 1}}
                />
              </ListItem>
            ))}
          </List>
        )}

        {/* pagination */}
        {data.length > 0 && (
          <Box>
            <Stack direction="row" className=" justify-between px-3 w-full">
              {currPage > 1 && (
                <Button variant="outlined" size="small" color="primary" className=" capitalize rounded-full px-3" startIcon={<West />} onClick={() => setCurrPage(prev => prev - 1)}>
                  Prev
                </Button>
              )}
              {currPage < data.length / 5 && (
                <Button variant="outlined" size="small" color="primary" sx={{ml: "auto"}} endIcon={<East />} onClick={() => setCurrPage(prev => prev + 1)}>
                  Next
                </Button>
              )}
            </Stack>
          </Box>
        )}
      </Stack>

      {/* mobile view */}
      <Box className={`${openPreview && "translate-x-full"} absolute top-0 -left-full w-screen h-screen bg-white duration-300 z-10`}>
        <Stack px={2} py={2}>
          {/* close button */}
          <div className=" h-1/6 flex justify-end">
            <IconButton
              onClick={() => {
                setOpenPreview(false);
              }}
            >
              <Close />
            </IconButton>
          </div>

          {/* number of recipes found */}
          {data.length > 0 && (
            <Typography color="secondary.main" className=" self-center px-4">
              {data.length + " recipes found"}
            </Typography>
          )}

          {/* recipe preview list */}
          {data.length > 0 && (
            <List disablePadding className="flex-1">
              {data.slice((currPage - 1) * 5, (currPage - 1) * 5 + 5).map((d, i) => (
                <ListItem
                  disablePadding
                  key={i}
                  sx={{py: 1.5}}
                  className={`${SidebarStyles.listItem} ${inView === d.recipe_id && SidebarStyles.selected} cursor-pointer`}
                  onClick={() => {
                    showRecipe(d.recipe_id);
                    setOpenPreview(false);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar component="figure" sx={{width: 50, height: 50}}>
                      <figure className=" relative w-full h-full rounded-full">
                        <span className={`${SidebarStyles.imgOverlay} absolute top-0 bottom-0 right-0 left-0 rounded-full opacity-40 `}></span>
                        <img alt="" src={d.image_url} className={`${SidebarStyles.previewImg} w-full h-full object-cover rounded-full`} />
                      </figure>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="big" fontWeight="bold">
                        {d.title}
                      </Typography>
                    }
                    secondary={<small>{d.publisher}</small>}
                    sx={{pl: 1}}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {/* pagination */}
          {data.length > 0 && (
            <Box>
              <Stack direction="row" className=" justify-between px-3 w-full">
                {currPage > 1 && (
                  <Button variant="outlined" size="small" color="primary" className=" capitalize rounded-full px-3" startIcon={<West />} onClick={() => setCurrPage(prev => prev - 1)}>
                    Prev
                  </Button>
                )}
                {currPage < data.length / 5 && (
                  <Button variant="outlined" size="small" color="primary" sx={{ml: "auto"}} endIcon={<East />} onClick={() => setCurrPage(prev => prev + 1)}>
                    Next
                  </Button>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default Sidebar;
