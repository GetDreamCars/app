"use client";
import Header from "@/components/Header/Header";
import Add from "@/components/Add/Add";

export default function Home() {

  return (
    <>
    <Header />
    <Add />
    <video 
      src={'/video/1690137-hd_1920_1080_30fps.mp4'} 
      autoPlay 
      muted 
      loop 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover', 
        zIndex: -1 // Ensure the video is behind other elements
      }} 
    />
    </>
  );
}