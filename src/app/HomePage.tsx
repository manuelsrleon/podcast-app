"use client";
import { useEffect, useState } from "react";
import "./HomePage.css";
import Podcast from "./Podcast";
import { useRouter } from "next/navigation";

export function HomePage() {
    const [podcasts, setPodcasts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(); 
    const API_URL = process.env.NEXT_PUBLIC_API_URL_TOP_PODCASTS;
    const router = useRouter();

    function navigateToPodcast(podcastId: string){
        router.push("/podcast/"+podcastId);
    }
    useEffect(() => {
        const fetchData = async () => {
            try{

                const response = await fetch(`${API_URL}`);

                const data = await response.json();
                setPodcasts(data["feed"]["entry"]);
                setIsLoading(false);

            }catch(error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    },[API_URL]
)
    return(
        <>
        <div className="search-bar-container">
            <span className="counter-badge">{podcasts.length ?? 0}</span>
            <input className="search-bar" type="text" name="search-bar" id="search-bar" label="search-bar" placeholder="Filter podcasts..."/>
        </div>
        <div className="podcast-grid">
            {podcasts.map((podcast) => {
                return <Podcast key={podcast["id"]["attributes"]["im:id"]} id={podcast["id"]["attributes"]["im:id"]} imageUrl={podcast["im:image"][2]["label"]} title={podcast["im:name"]["label"]} author={podcast["im:artist"]["label"]} onClick={navigateToPodcast}></Podcast>
            }
            )
        }
        </div>
        </>
    )
}

export default HomePage;