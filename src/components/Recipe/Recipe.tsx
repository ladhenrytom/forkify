import recipeStyles from "./recipe.module.css";
import {IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Tooltip, Typography} from "@mui/material";
import {ArrowForward, BookmarkBorder, BookmarkOutlined, Check, Mood, MoodBad} from "@mui/icons-material";
import {useContext} from "react";
import {PageContext} from "../../App";

const Recipe = () => {
  const {errorMessage, bookmarks, setBookmarks, recipe, alertMessage} = useContext(PageContext);

  const addBookmark = (id: string) => {
    if (bookmarks.filter(b => b.id === id).length > 0) {
      alert("Item already added to boomarks");
    } else {
      let newArr: {id: string; img: string; title: string; publisher: string}[] = [];
      recipe && newArr.push({id: id, img: recipe.image_url, title: recipe.title, publisher: recipe.publisher}, ...bookmarks);
      setBookmarks(newArr);
      localStorage.setItem("bookmarks", JSON.stringify(newArr));
      alertMessage("Recipe successfully added to bookmarks!");
    }
  };

  return (
    <div className={`${recipeStyles.container} h-full w-full md:rounded-br-xl overflow-y-auto`}>
      {recipe === null ? (
        <Stack>
          {errorMessage ? (
            // {/* error message */}
            <div className={`${recipeStyles.errorMessage} flex w-full justify-center pl-2 pt-12`}>
              <MoodBad color="error" />
              <p className=" pl-2">{errorMessage}</p>
            </div>
          ) : (
            // {/*welcome message */}
            <div className={`${recipeStyles.message} flex w-full justify-center pl-2 pt-12`}>
              <Mood color="primary" />
              <p className=" pl-2">Start by searching for a recipe. Have fun!</p>
            </div>
          )}
        </Stack>
      ) : (
        <Stack>
          {/* image preview */}
          <figure className=" relative h-60 ">
            <span className={`${recipeStyles.imgOverlay} absolute top-0 bottom-0 right-0 left-0 opacity-50`}></span>
            <img alt="" src={recipe.image_url} className={`${recipeStyles.previewImg} w-full h-full object-cover`} />
            <span className={`${recipeStyles.label} w-1/2 text-center text-xl absolute -bottom-1/4 left-0 right-0 mx-auto py-6 px-12 -skew-y-6`}>
              <Typography variant="h6" className=" max-w-full text-white font-bold uppercase overflow-hidden text-ellipsis whitespace-nowrap div-decoration-clone">
                {recipe.title}
              </Typography>
            </span>
          </figure>

          {/* details - duration & servings */}
          <Stack direction="row" spacing={4} className=" items-center justify-between px-24 pt-24 pb-12">
            <Typography></Typography>

            {/* bookmark */}
            <Tooltip arrow title="Add to bookmarked">
              <IconButton sx={{backgroundImage: "linear-gradient(to right bottom, var(--color-grad-1), var(--color-grad-2))", color: "#fff"}} onClick={() => addBookmark(recipe.recipe_id)}>
                {bookmarks.filter(b => b.id === recipe.recipe_id).length < 1 ? <BookmarkBorder color="inherit" fontSize="large" /> : <BookmarkOutlined color="inherit" fontSize="large" />}
              </IconButton>
            </Tooltip>
          </Stack>

          {/* recipe ingredients */}
          <div className={`${recipeStyles.recipeIngredients} flex flex-col items-center py-12 md:px-12 xs:px-2`}>
            <h2 className=" uppercase font-bold text-2xl">recipe ingredients</h2>
            <Stack direction="row" width="100%">
              <Stack width="50%">
                {recipe.ingredients.slice(0, recipe.ingredients.length / 2).map((ing, idx) => (
                  <List key={idx} disablePadding>
                    <ListItem>
                      <ListItemIcon>
                        <Check color="primary" />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body2" className=" font-thin">
                          {ing}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                ))}
              </Stack>
              <Stack width="50%">
                {recipe.ingredients.slice(recipe.ingredients.length / 2 + 1, recipe.ingredients.length).map((ing, idx) => (
                  <List key={idx} disablePadding>
                    <ListItem>
                      <ListItemIcon>
                        <Check color="primary" />
                      </ListItemIcon>
                      <ListItemText className=" text-xs">
                        <Typography variant="body2" className=" font-thin">
                          {ing}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                ))}
              </Stack>
            </Stack>
          </div>

          {/* how to cook - directions */}
          <div className={`${recipeStyles.directions} flex flex-col items-center py-12 px-24`}>
            <h2 className=" uppercase font-bold text-2xl">How to cook it</h2>
            <p className=" py-8 text-center">
              This recipe was carefully designed by{" "}
              <a target="blank" href={recipe.publisher_url}>
                <b className=" capitalize hover:underline">{recipe.publisher}</b>
              </a>
              . Please check out directions from their website
            </p>
            <a target="blank" href={recipe.source_url}>
              <button>
                Directions <ArrowForward className=" ml-3" />
              </button>
            </a>
          </div>
        </Stack>
      )}
    </div>
  );
};

export default Recipe;
