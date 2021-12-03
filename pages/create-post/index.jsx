import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styles from "./create-post.module.scss";
// import { Post } from "../create-post/index.jsx";
import Loader from '../../components/loader/loader';
import Link from "next/link";

const CREATE_LINK_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $body: String!) {
    createPost(input: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;


const Post = ({ item }) => {
  return (
    <div className={styles.post}>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.body}>{item.body}</p>
      
    </div>
  );
};
const CreatePost = () => {
  const [formState, setFormState] = useState({
    title: "",
    body: "",
  });
  const [createLink, { loading,error, data }] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      title: formState.title,
      body: formState.body,
    },
    context: { clientName: "mutation" },

    // onCompleted: () => history.push('/new/1')
  });
  return (
    <div className={styles.createPost}>
      <div className={styles.viewall}>
        <Link href={`/posts`}>
          <a>{"<-- Take Me Back..!"}</a>
        </Link>
      </div>
      <h2>Create a new Post!</h2>
      {error && console.log("err", error.message)}
      {data && console.log(data.createPost)}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className={styles.form}>
          <input
            className="mb2"
            value={formState.title}
            onChange={(e) =>
              setFormState({
                ...formState,
                title: e.target.value,
              })
            }
            type="text"
            placeholder="A title for the post"
          />
          <textarea
            className="mb2"
            value={formState.body}
            onChange={(e) =>
              setFormState({
                ...formState,
                body: e.target.value,
              })
            }
            type="text"
            placeholder="The body of the post"
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      {loading && <Loader/>}
      {data && (
        <div>
           <h2>Post created successfully</h2>
          
          {data.createPost && <Post item={data.createPost}></Post>}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
