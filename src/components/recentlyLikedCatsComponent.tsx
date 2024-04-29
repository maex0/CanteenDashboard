import CatImage from "../types/catImage";
import React from "react";
import CatImageComponent from "./catImageComponent";

const RecentlyLikedCatsComponent: React.FC<{
  cats: CatImage[] | undefined;
}> = ({ cats }) =>
  (cats?.length ?? 0) > 0 ? (
    cats?.map((likedCat) => (
      <CatImageComponent key={likedCat.id} cat={likedCat} />
    ))
  ) : (
    <h3>No recent liked cats</h3>
  );

export default RecentlyLikedCatsComponent;
