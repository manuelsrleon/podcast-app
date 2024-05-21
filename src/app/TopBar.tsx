"use client";
import Link from "next/link";
import "./TopBar.css"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export function TopBar() {
    const [loading, setLoading] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    //Actualmente, NextJS no expone eventos que me permitan implementar la función de manera sencilla. Disculpas
    //https://github.com/vercel/next.js/discussions/42016?sort=new
    
    const handleStart = () => setLoading (true); 
    const handleComplete = () => setLoading(false); 
    
  }, [router])
    return <div className="topbar-container">
        <Link href="/" style={{textDecoration: "none"}}>
            <span className="app-title">Podcaster</span>
        </Link>
        <div className={"topbar-loader"+( loading? " visible":"")}/>
    </div>
}
export default TopBar;