"use client";

import { useEffect, useState} from "react";
import PodcastCard from "../PodcastCard";
import Link from "next/link";
import "./podcastPage.css"

export default function PodcastPage({params} : {params?: {podcastId: string}}) {
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL_DETAIL;
    const [podcast, setPodcast] = useState();
    const [episodes, setEpisodes] = useState<any[]>([]);

    useEffect(() => {

        const fetchPodcastData = async () => {
            try {
                const response = await fetch(`${API_URL}&id=${podcastId}&entity=podcast`);
                const podcastData = await response.json();
                setPodcast(podcastData["results"][0])
                console.log(podcastData)
            }catch(error){
                console.error(error);
            }
        }
        const fetchEpisodeData = async () => {
            try{
                const response = await fetch(`${API_URL}&id=${podcastId}&entity=podcastEpisode`);

                const episodeData = await response.json();
                setEpisodes(episodeData["results"].splice(-(episodeData["results"].length-1)));

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
        <PodcastCard id={podcast["trackId"]} 
            title={podcast["collectionName"]}
            author={podcast["artistName"]} 
            description={podcast["shortDescription"]} 
            imgUrl={podcast["artworkUrl100"]}/>
        : <></>}
        
        <div className="episodes">
            <span className="episodes-counter card">
                Episodes: {episodes.length}
            </span>
        <div className="episodes-table-container">
            <table className="episodesTable card">
                <tbody>
                <tr>
                    <th className="episodes-table-header-title">Title</th>
                    <th className="episodes-table-header-date">Date</th>
                    <th className="episodes-table-header-duration">Duration</th>
                </tr>
                {episodes.map((episode) => {
                    return <tr className="episodeRow" key={episode["trackId"]}>
                                <td className="episodes-table-title"><Link href={"/podcast/"+podcastId+"/episode/"+episode["trackId"]}>{episode["trackName"]}</Link></td>
                                <td className="episodes-table-date">{new Date(episode["releaseDate"]).toLocaleDateString()}</td>
                                <td className="episodes-table-duration">{new Date(episode["trackTimeMillis"]).toISOString().slice(11,16)}</td>
                            </tr>
                })}
                </tbody>
            </table>
        </div>
        </div>
    </div>
}