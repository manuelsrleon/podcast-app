import Link from "next/link";
import "./TopBar.css"
export function TopBar() {
    return <>
        <Link href="/" style={{textDecoration: "none"}}>
            <span className="app-title">Podcaster</span>
        </Link>
        <hr />
    </>
}
export default TopBar;