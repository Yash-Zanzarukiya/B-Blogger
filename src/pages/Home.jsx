import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    console.log("Inside Home Page use effect get all posts...");
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      console.log("Responded...");
    });
  }, []);

  if (!authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl ">
                <Link to={"/login"} className="font-bold text-blue-800 hover:text-blue-500">
                  Login
                </Link>{" "}
                to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
