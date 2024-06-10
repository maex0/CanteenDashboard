import { CircularProgress } from "@mui/material";
import CatImage from "../types/catImage";
import Image from "next/image";
import React from "react";

const targetWidth = 300;
const targetHeight = 300;

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
        id="maincatimage"
        key={cat.id}
        src={cat.url}
        alt="Cat"
        width={cat.width}
        height={cat.height}
        style={{
          width: "100%",
          height: "auto",
        }}
        priority={true}
      />
    </div>
  ) : (
    <>
      <CircularProgress />
      <span>Loading...</span>
    </>
  );

export default CatImageComponent;
