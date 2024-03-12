import React from "react";
import { Container, PostForm } from "../components/index";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        {console.log("Inside Add post page...")}
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
