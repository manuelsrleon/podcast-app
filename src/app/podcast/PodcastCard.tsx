import "./PodcastCard.css"
import PodcastType from "@/model/PodcastType"

export default function PodcastCard(props: PodcastType) {
    const {id, title, author, description, imgUrl} = props; 
    
    return <div className="podcast-card-container card">
        <img className= "podcast-card-cover" src={imgUrl} alt="podcast cover" />
        <hr />
        <div className="podcast-card-title-block">
            <span className="podcast-card-title">{title}</span>
            <br/>
            <span className="podcast-card-author">by {author}</span>
        </div>
            <hr />
        <div className="podcast-card-description-block">
            <span className="podcast-card-description-title">Description:</span>
            <br/>
            <span className="podcast-card-description">{description}</span>
        </div>
    </div>
}