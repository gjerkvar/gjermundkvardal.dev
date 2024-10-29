import HeaderTitle from "./HeaderTitle.component";
import Navbar from "./Navbar/Navbar.component";

const Header = () => {

    return(
        <div>
            <header className="header">
                <Navbar/>
                <HeaderTitle/>
            </header>
        </div>
    )
}
export default Header;