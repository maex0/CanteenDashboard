import { CircularProgress } from "@mui/material";
import { CatImage } from "@prisma/client";

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
        className="liked-cat-image"
        key={cat.id}
        src={cat.url}
        alt="Cat image from TheCatAPI"
        width={cat.width}
        height={cat.height}
        style={{
          width: "100%",
          height: "auto",
        }}
        priority
      />
    </div>
  ) : (
    <>
      <CircularProgress />
      <span>Loading...</span>
    </>
  );

export default CatImageComponent;
