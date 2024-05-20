import "./Podcast.css"

interface PodcastProps {
    id: string;
    imageUrl: string; 
    title: string; 
    author: string;
    onClick: (id: string) => void;
}
 
    
export function Podcast(props: PodcastProps){
    const {id, imageUrl, title, author, onClick} = props; 
    
    const handleClick = () => {
        onClick(id);
    }
    return (
        <div className="podcast-container">
            <div className="podcast-card card" onClick={handleClick}>
             <img src={imageUrl} alt="" className="podcast-img" />
           
            <span className="podcast-title">{title}</span>
            <span className="podcast-author">Author: {author}</span>
            </div>
        </div>
    )
}
 
export default Podcast;