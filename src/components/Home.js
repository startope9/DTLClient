import { Button, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import './home.css'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {

    useEffect(() => {
        document.title = 'hostelhubhome'
    }, [])

    return (
        <div>
            <div className="home">
                <div style={{ 'float': 'right' }}><Link to="/admin"><Button color="secondary" variant="text" className="call-admin">AdminLogin</Button></Link></div>
                <center>
                    <Typography variant="h4" style={{ 'color': '#414756', 'marginTop': '2%' }}>Complaint Registration Interface</Typography>
                    <div><Typography variant="body2" style={{ 'color': '#414756' }}>An efficient platform for hostel students to report issues and receive prompt resolutions from the dedicated hostel warden, ensuring a seamless living experience</Typography></div> <br />
                    <br />
                </center>
            </div>
            <br />
            <div className="parent-card">
                <fieldset className="child-card">
                    <legend><img src={require('../images/problem.jpg')} alt="image1" style={{ 'width': '200px', 'height': '250px' }} /></legend>
                    <section>You live in hostel and facing issues? What are you waiting for click below and submit it!</section>
                    <Link to="/student"><Button variant="contained" className="problem-submit" startIcon={<AddIcon />}>Post Problem</Button></Link>
                </fieldset>
                <fieldset className="child-card">
                    <legend><img src={require('../images/solving-wicked-problems.jpg')} alt="image1" style={{ 'width': '200px', 'height': '250px' }} /></legend>
                    <section>See the current problems being posted!</section>
                    <Link to="/displayproblems"><Button variant="outlined" className="problem-submit">Current Problem</Button></Link>
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
