"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { Box, Button, CircularProgress } from "@mui/material";
import Image from "../types/image";

enum Decision {
  Like,
  Dislike,
}

/**
 * @returns home page
 */
const Home: React.FC = () => {
  const [cat, setCat] = useState<Image>();
  const [error, setError] = useState("");

  const fetchRandomCat = async () => {
    setError("");
    try {
      const response = await axios.get("/api");
      const catImage: Image = response.data;
      console.log(catImage);
      setCat(catImage);
    } catch (error_) {
      setError(String(error_));
    }
  };

  const vote = (decision: Decision) => {
    setError("");
    try {
      console.log(decision);
      //await axios.post("/api", { like: decision });
      fetchRandomCat();
    } catch (error_) {
      setError(String(error_));
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
        <h1>Tinder for Cats 🐈 ❤️</h1>

        <div className={styles.cats}>
          {cat ? (
            <img
              key={cat.id}
              src={cat.url}
              alt="Cat"
              style={{ width: "400px", height: "400px" }}
            />
          ) : (
            <>
              <CircularProgress />
              <span>Loading...</span>
            </>
          )}
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
      </Box>
    </main>
  );
};

export default Home;
