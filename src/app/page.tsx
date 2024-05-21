"use client";
import { useEffect, useState } from "react";
import "./HomePage.css";
import Podcast from "./Podcast";
import { useRouter } from "next/navigation";

export function HomePage() {
    const [podcasts, setPodcasts] = useState<any[]>([]);
    const [filteredPodcasts, setFilteredPodcasts] = useState<any[]>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>(); 
    const [filterString, setFilterString] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL_TOP_PODCASTS;
    const CACHE_KEY = 'podcastData';
    const CACHE_TIMESTAMP_KEY = 'podcastDataTimestamp';
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

    const router = useRouter();

    function navigateToPodcast(podcastId: string){
        router.push("/podcast/"+podcastId);
    }
    function handleFilterChange(e: React.FormEvent<HTMLInputElement>){
        setFilterString(e.currentTarget.value);
        const filteredItems =  podcasts.filter((podcast:any) => 
            podcast["im:name"]["label"].toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
            podcast["im:artist"]["label"].toLowerCase().includes(e.currentTarget.value.toLowerCase())
            
            );

        setFilteredPodcasts(filteredItems);

    }
    useEffect(() => {
        const fetchData = async () => {
            //cache info
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cachedTimestamp = parseInt(localStorage.getItem(CACHE_TIMESTAMP_KEY) ?? "-1");
            const now = Date.now();
            //cache check
            if (cachedData && cachedTimestamp != -1 && (now - cachedTimestamp < ONE_DAY_IN_MS)){
                return JSON.parse(cachedData);
            }
            try{
                
                const response = await fetch(`${API_URL}`);

                const data = await response.json();
                setPodcasts(data["feed"]["entry"]);
                localStorage.setItem(CACHE_KEY, JSON.stringify(data))
                localStorage.setItem(CACHE_TIMESTAMP_KEY, JSON.stringify(now.toString))
                setFilteredPodcasts(data["feed"]["entry"]);
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
            <span className="counter-badge">{filteredPodcasts.length ?? 0}</span>
            <input 
                value={filterString}
                className="search-bar" 
                type="text" 
                name="search-bar" 
                id="search-bar"
                placeholder="Filter podcasts..." 
                onChange={handleFilterChange}/>
        </div>
        <div className="podcast-grid">
            {filteredPodcasts.map((podcast) => {
                return <Podcast key={podcast["id"]["attributes"]["im:id"]} id={podcast["id"]["attributes"]["im:id"]} imageUrl={podcast["im:image"][2]["label"]} title={podcast["im:name"]["label"]} author={podcast["im:artist"]["label"]} onClick={navigateToPodcast}></Podcast>
            }
            )
        }
        </div>
        </>
    )
}

export default HomePage;