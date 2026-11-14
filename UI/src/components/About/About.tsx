import Login from "../Login/Login"
import Register from "../Register/Register"

const About = () => {
    return (
        <div>
            <h1>About</h1>
            {/* <Button label="Submit" onClick={() => {}} sx={{}} />
            <CommonInput label="Enter your name" value="" onChange={(e) => {}} placeholder="Enter your name" /> */}
            <Login/>
            <Register/>
        </div>
    )
}

export default About