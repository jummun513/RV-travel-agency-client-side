import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer/Footer';
import NavBar from '../components/shared/Navbar/Navbar';

function Main() {

    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}

export default Main;