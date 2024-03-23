import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState({ postContent: null, isAuthor: false });
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((res_post) => {
        if (res_post) {
          let isAuthor = userData ? res_post.userId === userData.$id : false;
          setPost({
            postContent: res_post,
            isAuthor,
          });
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.postContent.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.postContent.featuredImage);
        navigate("/");
      }
    });
  };

  return post.postContent ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.previewFile(post.postContent.featuredImage)}
            alt={post.postContent.title}
            className="rounded-xl"
          />
          {post.isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.postContent.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <hr />
          <h1 className="text-3xl font-bold my-4">{post.postContent.title}</h1>
          <hr />
        </div>
        <div className="browser-css text-2xl">{parse(post.postContent.content)}</div>
      </Container>
    </div>
  ) : null;
}
