import Searchbar from "./Searchbar"
import { Link } from "react-router-dom"

export default function Navbar(){
    return(
        <nav>
            <div className="left-nav">
             <Link style={{ textDecoration: 'none' }} to={'/'}> <img className="logo-img" src="../src/assets/images/2.png" alt="" /> </Link> 
                <Searchbar />
            </div>
            <ul className="nav-list">
                <li className="login">Log in</li>
                <li className="signup">Sign up</li>
            </ul>
        </nav>
    )
}
