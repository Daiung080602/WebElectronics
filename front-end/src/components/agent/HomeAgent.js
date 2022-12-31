import Navbar from "./Navbar";

function HomeAgent(props) {
    return (
        localStorage.getItem('role') == 2 ?
            <div className="d-flex">
                <Navbar/>
                {props.element}
            </div> :
            <div>
                <h1>404 Not Found</h1>
            </div>

    )

}

export default HomeAgent