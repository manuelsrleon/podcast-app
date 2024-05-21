import "./PodcastCard.css"
import Link from "next/link";
import PodcastType from "@/model/PodcastType"

export default function PodcastCard(props: PodcastType) {
    const {id, title, author, description, imgUrl} = props; 
    
    return <div className="podcast-card-container card">
        <Link href={"/podcast/"+id}>
            <img className= "podcast-card-cover" src={imgUrl} alt="podcast cover" />
        </Link>
        <hr />
        <div className="podcast-card-title-block">
        <Link href={"/podcast/"+id}  style={{textDecoration: "none", color: "black"}}>
            <span className="podcast-card-title">{title}</span>
            <br/>
            <span className="podcast-card-author">by {author}</span>
        </Link>
        </div>
            <hr />
        <div className="podcast-card-description-block">
            <span className="podcast-card-description-title">Description:</span>
            <br/>
            <span className="podcast-card-description">{description}</span>        </div>
    </div>
}