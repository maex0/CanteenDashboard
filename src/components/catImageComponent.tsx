import { CircularProgress } from "@mui/material";
import CatImage from "../types/catImage";
import Image from "next/image";
import React from "react";

// Define the target size
const targetWidth = 500; // Target width in pixels
const targetHeight = 500; // Target height in pixels

const CatImageComponent: React.FC<{ cat: CatImage | undefined }> = ({ cat }) =>
  cat ? (
    <div
      style={{
        width: `${targetWidth}px`,
        height: `${targetHeight}px`,

        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        unoptimized={true}
        key={cat.id}
        src={cat.url}
        alt="Cat"
        width={cat.width}
        height={cat.height}
      />
    </div>
  ) : (
    <>
      <CircularProgress />
      <span>Loading...</span>
    </>
  );

export default CatImageComponent;
