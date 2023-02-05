import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Posts from "./Posts/Posts";
import Sideprofile from "./sideProfile/Sideprofile";
import Navigation from "../../Global Components/Navigation/Navigation";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
const Homepage = () => {

    // Initialize the skeleton loading
    const [loadPost, setLoadPost] = useState(true)
    
    // Initialize the posts state with an empty array
    const [posts, setPosts] = useState([]);

    // The collectionRef is set to refer the "posts" collection in the database
    const collectionRef = collection(db, 'posts')

    // Runs only once, when the component is first mounted.
    useEffect(() => {
        setLoadPost(true)
        // Listen the changes in the posts collection and update the posts state accordingly
        const cleanUP = onSnapshot(collectionRef, (snapshot)=>{

            // The snapshot object holds the data of the posts collection and the map function is used to iterate through each document
            snapshot.docs.map((doc)=>{
                // Update the posts state by adding each post document to the array
                setPosts((prev)=>{
                    return [...prev, {post: doc.data(), id: doc.id}]
                })
                setLoadPost(false)
            })
        })

        return(()=>{
            cleanUP()
        })
    }, []);

    console.log(posts, 'posts')
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
