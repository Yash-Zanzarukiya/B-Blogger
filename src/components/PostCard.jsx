import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, featuredImage, title }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full flex justify-center mb-4 align-middle">
          <img
            src={appwriteService.previewFile(featuredImage)}
            alt={title}
            className="rounded-xl max-h-40"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
