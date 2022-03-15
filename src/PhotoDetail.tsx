import React from "react";
import { useParams } from "react-router-dom";

const PhotoDetail = () => {
  let params = useParams<{ photoId: string }>();

  return (
    <div>
      <h1>Photo Detail : {params.photoId}</h1>
    </div>
  );
};

export default PhotoDetail;
