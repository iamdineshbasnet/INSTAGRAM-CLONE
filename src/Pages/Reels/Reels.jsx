import React, { useRef, useState } from "react";
import "./style.css";
import Header from "./Header/Header";
import video1 from "./video1.mp4";
import video2 from "./video2.mp4";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";

// Reels Component to display the video post
const Reels = () => {
    // Array of reelsPost object
    const reelsPost = [
        {
            video_url: video1,
            videoTitle: "video1",
            videoAuthor_img:
                "http://projects.websetters.in/digg-seos/digg/wp-content/themes/twentytwenty-child-theme/img/demo-prof.jpg",
            likes_count: 100,
            comments_count: 200,
            share_count: 5,
        },
        {
            video_url: video2,
            videoTitle: "video2",
            videoAuthor_img:
                "https://www.sragenkab.go.id/assets/images/demo/user-1.jpg",
            likes_count: 200,
            comments_count: 400,
            share_count: 10,
        },
        // {
        //     video_url: video1,
        //     videoTitle: "video3",
        //     videoAuthor_img:
        //         "https://www.sragenkab.go.id/assets/images/demo/user-10.jpg",
        //     likes_count: 300,
        //     comments_count: 600,
        //     share_count: 15,
        // },
    ];

    // State variable to keep track of video playing status
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // "useRef" hook to access the video element
    const videoRef = useRef(null);

    // State variable to keep track of current playing video
    const [currentPlaying, setCurrentPlaying] = useState(-1);

    // Function to play or pause the video
    const handleVideo = (index) => {
        const video = videoRef[index].current
        console.log(video, 'video')
        // If video is currently playing
        if (isVideoPlaying) {
            // Pause the current playing video
            video.pause();
            setIsVideoPlaying(false);
        }
        // If video is currently not playing
        else {
            // Play the video at index
            video.play();
            setIsVideoPlaying(true);
            // setCurrentPlaying(index);
        }
    };

    return (
        <div className="reels">
            <div className="reels_container">
                {reelsPost.map((reel, index) => (
                    <div className="video_container" key={index}>
                        <Header isVideoPlaying={isVideoPlaying} />
                        <Sidebar
                            likes_count={reel.likes_count}
                            comments_count={reel.comments_count}
                            share_count={reel.share_count}
                        />
                        <video
                            ref={videoRef}
                            onClick={()=>handleVideo(index)}
                            loop
                            autoPlay>
                            <source src={reel.video_url} type="video/mp4" />
                        </video>
                        <Footer
                            isVideoPlaying={isVideoPlaying}
                            video_title={reel.videoTitle}
                            videoAuthor_img={reel.videoAuthor_img}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reels;
