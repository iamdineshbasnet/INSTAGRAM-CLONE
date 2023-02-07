import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Posts from "./Posts/Posts";
import Sideprofile from "./sideProfile/Sideprofile";
import Navigation from "../../Global Components/Navigation/Navigation";
import { db } from "../../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
const Homepage = () => {

    // Initialize the skeleton loading
    const [loadPost, setLoadPost] = useState(false)
    
    // Initialize the posts state with an empty array
    const [posts, setPosts] = useState([]);
    // The collectionRef is set to refer the "posts" collection in the database
    const collectionRef = collection(db, 'posts')

    // Runs only once, when the component is first mounted.
    useEffect(() => {
        const unsubscribe = async () => {
          const postSnapshot = await getDocs(collection(db, "posts"));
          postSnapshot.forEach(async (postItem) => {
            const commentSnapshot = await getDocs(collection(db, `posts/${postItem.id}/comments`));
            const comments = [];
            commentSnapshot.forEach((commentItem) => {
              comments.push(commentItem.data());
            });
    
            setPosts((prev) => {
              const updatedPosts = prev.map((post) => {
                if (post.post.id === postItem.id) {
                  return { post: postItem.data(), comments };
                }
                return post;
              });
              return [...updatedPosts, { post: postItem.data(), id: postItem.id, comments }];
            });
          });
        };
        return () => {
          unsubscribe();
        };
      }, []);

    return (
        <>
            <Header/>
            <Posts posts={posts} setPosts={setPosts} loadPost={loadPost}/>
            <Sideprofile/>
            <Navigation collectionRef={collectionRef} posts={posts} setPosts={setPosts}/>
        </>
    );
};

export default Homepage;
