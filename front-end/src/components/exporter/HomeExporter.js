import Navbar from "./Navbar";

function HomeExporter(props) {
    return (
        localStorage.getItem('role') === '4' ?
            <div className="d-flex">
                <Navbar/>
                {props.element}
            </div> :
            <div>
                <h1>404 Not Found</h1>
            </div>

    )
}
export default HomeExporter