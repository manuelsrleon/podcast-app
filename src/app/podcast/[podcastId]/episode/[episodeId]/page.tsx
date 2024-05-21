"use client";

import { useEffect, useState} from "react";
import PodcastCard from "../../../PodcastCard";
import "../../podcastPage.css"
import "./episode.css"

export default function EpisodePage({params} : {params?: {podcastId: string, episodeId: string}}) {
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL_DETAIL;
    const [podcast, setPodcast] = useState();
    const [episode, setEpisode] = useState<any[]>([]);
    
    const CACHE_PODCAST_KEY = 'podcastData';
    const CACHE_EPISODE_KEY = 'episodeData';
    const CACHE_TIMESTAMP_KEY = 'podcastDataTimestamp';
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
    useEffect(() => {
        const cachedPodcastData = localStorage.getItem(CACHE_PODCAST_KEY);
        const cachedEpisodeData = localStorage.getItem(CACHE_EPISODE_KEY);
        
        const cachedTimestamp = parseInt(localStorage.getItem(CACHE_TIMESTAMP_KEY) ?? "-1");
        const now = Date.now();
        //cache check
        

        const fetchPodcastData = async () => {
            if (cachedPodcastData && cachedTimestamp != -1 && (now - cachedTimestamp < ONE_DAY_IN_MS)){
                return JSON.parse(cachedPodcastData);
            }
            try {
                const response = await fetch(`${API_URL}&id=${podcastId}&entity=podcast`);
                const podcastData = await response.json();
                setPodcast(podcastData["results"][0])
                localStorage.setItem(CACHE_KEY, JSON.stringify(podcastData["results"][0]))
                localStorage.setItem(CACHE_TIMESTAMP_KEY, JSON.stringify(now.toString))
            }catch(error){
                console.error(error);
            }
        }
        const fetchEpisodeData = async () => {
            if (cachedEpisodeData && cachedTimestamp != -1 && (now - cachedTimestamp < ONE_DAY_IN_MS)){
                console.log("cache get!");
                return JSON.parse(cachedEpisodeData);
            }
            try{
                const response = await fetch(`${API_URL}&id=${podcastId}`);

                const episodeData = await response.json();
                //trackId, trackName, trackTimeMillis, trackViewURL, releaseDate
                console.log(episodeData["results"].filter((episode: any) => episode["trackId"] == params?.episodeId)[0]);
                setEpisode(episodeData["results"].filter((episode: any) => episode["trackId"] == params?.episodeId)[0]);

            }catch(error) {
            console.error(error);
            }
        
        }

        fetchPodcastData();
        fetchEpisodeData();

    }, [API_URL])
    
    const podcastId = params?. podcastId;
    
    return <div className="podcast-root">
        {podcast? 
        <PodcastCard id={podcast["collectionId"]} 
            title={podcast["collectionName"]}
            author={podcast["artistName"]} 
            description={podcast["collectionName"]} 
            imgUrl={podcast["artworkUrl100"]}/>
        : <></>}
        
        <div className="episode card">
            <h1>{episode["trackName"]}</h1>
            <p className="episode-description"> {episode["description"]}</p>
            <hr />
            <audio controls={true} className="episode-player">
                <source src={episode["episodeUrl"]} type="audio/mpeg" />
            </audio>
            
        </div>
    </div>
}