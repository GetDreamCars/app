"use client";
import Header from "@/components/Header/Header";
import Add from "@/components/Add/Add";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative overflow-y-auto">
        <Add />
        <video 
          src={'/video/1690137-hd_1920_1080_30fps.mp4'} 
          autoPlay 
          muted 
          loop 
          className="fixed top-0 left-0 w-full h-full object-cover -z-10" 
        />
      </main>
    </div>
  );
}