import "./App.css";
import {Dispatch, SetStateAction, createContext, useState} from "react";
import {Backdrop, Box, CircularProgress, Snackbar, Alert} from "@mui/material";
import Display from "./components/Display/Display";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";

// all items and functions shared across components
export const PageContext = createContext<{
  data:
    | {
        image_url: string;
        publisher: string;
        title: string;
        source_url: string;
        recipe_id: string;
      }[]
    | [];
  errorMessage: string;
  fetcher: (q: string) => void;
  bookmarks: {id: string; img: string; title: string; publisher: string}[];
  setBookmarks: Dispatch<
    SetStateAction<
      {
        id: string;
        img: string;
        title: string;
        publisher: string;
      }[]
    >
  >;
  recipe: {image_url: string; publisher: string; publisher_url: string; title: string; source_url: string; recipe_id: string; ingredients: []} | null;
  inView: string;
  showRecipe: (id: string) => Promise<void>;
  alertMessage: (text: string) => void;
  openPreview: boolean;
  setOpenPreview: Dispatch<SetStateAction<boolean>>;
}>({data: [], errorMessage: "", fetcher: () => {}, bookmarks: [], setBookmarks: () => [], recipe: null, inView: "", showRecipe: async () => {}, alertMessage: () => {}, openPreview: false, setOpenPreview: () => {}});

// main page
export default function Home() {
  // get stored bookmarks from localstorage
  const bookmarksArr = localStorage.getItem("bookmarks");
  // fetched data init
  const [data, setData] = useState<
    {
      image_url: string;
      publisher: string;
      title: string;
      source_url: string;
      recipe_id: string;
    }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [bookmarks, setBookmarks] = useState<{id: string; img: string; title: string; publisher: string}[]>((bookmarksArr && JSON.parse(bookmarksArr)) || []);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [recipe, setRecipe] = useState<{image_url: string; publisher: string; publisher_url: string; title: string; source_url: string; recipe_id: string; ingredients: []} | null>(null);
  const [inView, setInView] = useState<string>("");
  const [openPreview, setOpenPreview] = useState(false);

  // fetcher function
  const fetcher = (q: string) => {
    setOpenBackdrop(true);
    setData([]);
    setErrorMessage("");
    setTimeout(async () => {
      try {
        const res = await axios.get<{recipes: {image_url: string; publisher: string; title: string; source_url: string; recipe_id: string}[]}>(`https://forkify-api.herokuapp.com/api/search?q=${q}`, {timeout: 3000});
        setData(res.data.recipes);
      } catch (error: any) {
        if (error.message.includes("timeout")) {
          setErrorMessage("Could not get recipe. Please check your internet connection.");
        } else {
          setErrorMessage("Recipe not found. Please adjust search parameters.");
        }
      }
      setOpenBackdrop(false);
    }, 2000);
  };

  // show recipe function to display a selected recipe in full details
  const showRecipe = async (id: string) => {
    setInView(id);
    try {
      const res = await axios.get(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
      setRecipe(res.data.recipe);
    } catch (error: any) {
      alert("Something went wrong!");
    }
  };

  // feedback messages
  const alertMessage = (text: string) => {
    setSnackbarText(text);
    setOpenSnackbar(true);
  };

  return (
    <PageContext.Provider
      value={{
        data: data,
        errorMessage: errorMessage,
        fetcher: fetcher,
        bookmarks: bookmarks,
        setBookmarks: setBookmarks,
        recipe: recipe,
        inView: inView,
        showRecipe: showRecipe,
        alertMessage: alertMessage,
        openPreview: openPreview,
        setOpenPreview: setOpenPreview,
      }}
    >
      <div className="md:p-6 justify-center flex h-screen">
        <main className=" w-full max-w-6xl max-h-full flex flex-col md:rounded-xl shadow-2xl">
          <div className=" h-1/6">
            <Navbar />
          </div>

          <Box className=" h-5/6">
            {/* recipe display */}
            <div className=" h-full flex-1">
              <Display />
            </div>

            {/* spinner */}
            <Backdrop open={openBackdrop} className=" z-10">
              <CircularProgress color="primary" />
            </Backdrop>

            {/* alert messages */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} anchorOrigin={{vertical: "top", horizontal: "center"}} onClose={() => setOpenSnackbar(false)} className=" m-4">
              <Alert onClose={() => setOpenSnackbar(false)} sx={{width: "100%"}}>
                {snackbarText}
              </Alert>
            </Snackbar>
          </Box>
        </main>
      </div>
    </PageContext.Provider>
  );
}
