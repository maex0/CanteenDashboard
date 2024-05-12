"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { Box, Button } from "@mui/material";
import CatImage from "../types/catImage";
import CatImageComponent from "@/components/catImageComponent";
import RecentlyLikedCatsComponent from "@/components/recentlyLikedCatsComponent";

enum Decision {
  Like,
  Dislike,
}

const MAX_LIKED_CAT_IMAGES = 3;

/**
 * `Home` is the home page of the application.
 *
 * @returns home page
 */
const Home: React.FC = () => {
  const [cat, setCat] = useState<CatImage>();
  const [threeRecentLikedCats, setThreeRecentLikedCats] = useState<CatImage[]>(
    [],
  );
  const [error, setError] = useState("");

  const fetchRandomCat = async () => {
    setError("");
    try {
      const response = await axios.get("/api/catimageapi");
      const catImage: CatImage = response.data;
      setCat(catImage);
      return catImage;
    } catch (error_) {
      setError(String(error_));
      return;
    }
  };

  const vote = async (decision: Decision) => {
    setError("");
    try {
      await fetchRandomCat();
    } catch (error_) {
      setError(String(error_));
    }

    if (decision == Decision.Like && cat) {
      if (threeRecentLikedCats.length >= MAX_LIKED_CAT_IMAGES) {
        threeRecentLikedCats.pop();
        const updatedThreeRecentLikedCats = [cat, ...threeRecentLikedCats];
        setThreeRecentLikedCats(updatedThreeRecentLikedCats);
      } else {
        threeRecentLikedCats.push(cat);
      }
    }
  };

  useEffect(() => {
    fetchRandomCat();
  }, []);

  return (
    <main className={styles.main}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
      >
        <h1 id="mainheading">Tinder for Cats 🐈 ❤️</h1>

        <div className={styles.cats}>
          <CatImageComponent cat={cat} />
          {error && <p>Error: {error}</p>}
        </div>

        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            sx={{
              m: 2,
              bgcolor: "success.main",
              "&:hover": {
                bgcolor: "success.dark",
              },
            }}
            onClick={() => vote(Decision.Like)}
            disabled={!cat}
          >
            Like
          </Button>
          <Button
            variant="contained"
            sx={{
              m: 2,
              bgcolor: "error.main",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
            onClick={() => vote(Decision.Dislike)}
            disabled={!cat}
          >
            Dislike
          </Button>
        </Box>
        <h2>Three recent liked cats</h2>
        <Box display="flex" justifyContent="center" mt={2}>
          <RecentlyLikedCatsComponent cats={threeRecentLikedCats} />
        </Box>
      </Box>
    </main>
  );
};

export default Home;
