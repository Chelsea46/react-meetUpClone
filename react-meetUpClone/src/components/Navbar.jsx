import Searchbar from "./Searchbar"

export default function Navbar(){
    return(
        <nav>
            <h3 className="nav-logo">BuddyUp</h3>
            <Searchbar />
            <ul className="nav-list">
                <li className="login">Log in</li>
                <li className="signup">Sign up</li>
            </ul>
        </nav>
    )
}