import { Button, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './home.css'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {

    const [variant, setVariant] = useState('')

    useEffect(() => {
        document.title = 'hostelhubhome'
        if (window.innerWidth > 500) setVariant("h4")
        else setVariant("h5")
    }, [])

    return (
        <div>
            <div className="admin-login"><Link to="/admin"><Button color="secondary" variant="text" className="call-admin">AdminLogin</Button></Link></div>

            <div className="home">
                <center>
                    <Typography variant={variant} style={{ 'color': '#414756', 'marginTop': '4%' }}>Complaint Registration Interface</Typography>
                    <div><Typography variant="body2" style={{ 'color': '#414756' }}>An efficient platform for hostel students to report issues and receive prompt resolutions from the dedicated hostel warden, ensuring a seamless living experience</Typography></div> <br />
                    <br />
                </center>
            </div>
            <br />
            <div className="instructions">
                <div>
                    <img style={{ 'width': '400px', 'height': '200px' }} src={require('../images/instructions.webp')} alt="intructions" />
                </div>
                <div>
                    <ul>
                        <li><b>Current Problems:</b> Before students post there problems they are requested to check whether the problem is present in current problems.
                            It has a feature where students are allowed to give a like/upvote a problem which is present.
                        </li><br />
                        <li><b>Post Problems:</b> Students can post the problems they are facing here.</li><br />
                        <li><b>Solved Problems:</b> It is for the students to keep track whether the warden is regularly solving the issues being raised.</li>
                    </ul>
                </div>
            </div>
            <br />
            <div className="parent-card">

                <fieldset className="child-card">
                    <legend><img src={require('../images/solving-wicked-problems.jpg')} alt="image1" style={{ 'width': '200px', 'height': '250px' }} /></legend>
                    <section>See the current problems being posted!</section>
                    <Link to="/displayproblems"><Button variant="contained" className="problem-submit">Current Problem</Button></Link>
                </fieldset>
                <fieldset className="child-card">
                    <legend><img src={require('../images/problem.jpg')} alt="image1" style={{ 'width': '200px', 'height': '250px' }} /></legend>
                    <section>You live in hostel and facing issues? What are you waiting for click below and submit it!</section>
                    <Link to="/student"><Button variant="contained" className="problem-submit" startIcon={<AddIcon />}>Post Problem</Button></Link>
                </fieldset>
                <fieldset className="child-card">
                    <legend><img src={require('../images/solved.png')} alt="image1" style={{ 'width': '200px', 'height': '250px' }} /></legend>
                    <section>List of problems that are solved!!!</section>
                    <Link to="/solvedProbs"><Button variant="contained" className="problem-submit" endIcon={<TaskAltIcon />}>Solved Problem</Button></Link>
                </fieldset>
            </div>
        </div>
    )
}
