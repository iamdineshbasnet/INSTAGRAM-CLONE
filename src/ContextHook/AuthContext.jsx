import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userInfo, setUserInfo] = useState([])
    const [currentUserList, setCurrentUserList] = useState([])
    const handleCurrentUserList = async (user) =>{
        const userRef = collection(db, `users`)
        const q = query(userRef, where('displayName', '==', `${user?.displayName}`))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((item)=>{
            setCurrentUserList({user: item.data(), id: item.id})
        })

    }
    const listUserInfo = async()=>{
        const listUserSnapshot = await getDocs(collection(db, `users`))
        listUserSnapshot.forEach(async(userPosts)=>{
            const userPostSnapshot = await getDocs(collection(db, `users/${userPosts.id}/posts`))
            const posts = []
            userPostSnapshot.forEach((post)=>{
                posts.push(post.data())
            })

            const savedPostSnapshot = await getDocs(collection(db, `users/${userPosts.id}/saved`))
            const saved = []
            savedPostSnapshot.forEach((saves)=>{
                saved.push(saves.data())
            })

            const followersSnapshot = await getDocs(collection(db, `users/${userPosts.id}/followers`))
            const followers = []
            followersSnapshot.forEach((follower)=>{
                followers.push(follower.data())
            })

            const followingSnapshot = await getDocs(collection(db, `users/${userPosts.id}/following`))
            const following = []
            followingSnapshot.forEach((follow)=>{
                following.push(follow.data())
            })
            setUserInfo((prev)=>{
                return [...prev, {listUsers: userPosts.data(), id: userPosts.id, posts, saved, followers, following}]
            })
        })
    }
    useEffect(() => {
        listUserInfo()
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            handleCurrentUserList(user)
        });
        return () => {
            unsub();
        };
    }, []);
    return (
        <AuthContext.Provider value={{ currentUser, userInfo, setUserInfo, currentUserList }}>
            {children}
        </AuthContext.Provider>
    );
};
