import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [listAllUser, setListAllUser] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const listAllUsers = async() =>{
        const usersSnapshot = await getDocs(collection(db, "users"))
        usersSnapshot.forEach(async(userItem)=>{
            setListAllUser((prev)=>{
                return [...prev, {listUsers: userItem.data()}]
            })
        })
    }
    const listUserInfo = async()=>{
        console.log(currentUser)
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
            setUserInfo((prev)=>{
                return [...prev, {listUserInfo: userPosts.data(), posts, saved}]
            })
        })
    }
    useEffect(() => {
        listAllUsers()
        listUserInfo()
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => {
            unsub();
        };
    }, []);
    return (
        <AuthContext.Provider value={{ currentUser, listAllUser, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
