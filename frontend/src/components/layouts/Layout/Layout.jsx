import Footer from "../Footer/Footer"
import Nav from "../Nav/Nav"
import "./Layout.css"


export default function Layout({ children }) {

    return (
    <>
        <Nav />
        <div className="main-layout">
            { children }
        </div>
        {/* <Footer /> */}
    </>
    )
}   