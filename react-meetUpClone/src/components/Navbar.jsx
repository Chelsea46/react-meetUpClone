import Searchbar from "./Searchbar"
import { Link } from "react-router-dom"

export default function Navbar(){
    return(
        <nav>
            <div className="left-nav">
             <Link style={{ textDecoration: 'none' }} to={'/'} className="nav-logo"> <h3>BuddyUp</h3>  </Link> 
                {/* <Searchbar /> */}
            </div>
            {/* <ul className="nav-list">
                <li className="login">Log in</li>
                <li className="signup">Sign up</li>
            </ul> */}
        </nav>
    )
}
