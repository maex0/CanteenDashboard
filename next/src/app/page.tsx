"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

import CatImageComponent from "@/components/catImageComponent";
import RecentlyLikedCatsComponent from "@/components/likedCatsComponent";
import { CatImage } from "@prisma/client";

enum Decision {
  Like,
  Dislike,
}

const MAX_LIKED_CAT_IMAGES = process.env.MAX_LIKED_CAT_IMAGES
  ? parseInt(process.env.MAX_LIKED_CAT_IMAGES)
  : 3;

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

  const fetchRandomCat = async () => {
    try {
      const response = await axios.get("/api/getrandomcatimage");
      const catImage: CatImage = response.data;
      setCat(catImage);
      return catImage;
    } catch (error_) {
      return;
    }
  };

  const vote = async (decision: Decision) => {
    try {
      await fetchRandomCat();
    } catch (error_) {
      return;
    }

    if (decision == Decision.Like && cat) {
      try {
        const response = await axios.post("/api/catimageshandler", cat);

        if (response.status === 201) {
          if (threeRecentLikedCats.length >= MAX_LIKED_CAT_IMAGES) {
            threeRecentLikedCats.pop();
            const updatedThreeRecentLikedCats = [cat, ...threeRecentLikedCats];
            setThreeRecentLikedCats(updatedThreeRecentLikedCats);
          } else {
            threeRecentLikedCats.push(cat);
          }
        } else {
          return;
        }
      } catch (error_) {
        return;
      }
    }
  };

  const loadRecentLikedCats = async () => {
    try {
      const response = await axios.get("/api/catimageshandler");

      if (response.status !== 200) {
        return;
      }
      const catImages: CatImage[] = response.data;
      setThreeRecentLikedCats(catImages.slice(0, MAX_LIKED_CAT_IMAGES));
    } catch (error_) {
      return;
    }
  };

  useEffect(() => {
    loadRecentLikedCats();
    fetchRandomCat();
  }, []);

  return (
    <main>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
      >
        <h1 id="mainheading">Tinder for Cats 🐈 ❤️</h1>

        <div>
          <CatImageComponent cat={cat} />
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
