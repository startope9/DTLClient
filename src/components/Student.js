import { Button, Stack, TextField, Typography } from "@mui/material";

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Student() {

    const [number, setNumber] = useState('')
    const [desc, setDesc] = useState('')
    const [alert, setalert] = useState('')
    const [error, setError] = useState('')
    const [check, setCheck] = useState(1)

    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Post Problem';
    }, [])

    const handleProbSubmit = () => {

        if (number.length > 6) setalert("Enter appropriate room number");

        else {
            setalert('');
            setCheck(0);

            (async () => {
                await fetch('https://hostelhelpserver.onrender.com/upload_prob', {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': 'https://hostelhelpserver.onrender.com',
                        'Content-type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        roomNo: number,
                        Prob: desc,
                        vote_count: 0,
                        solved: 0
                    })
                })
                    .then(res => res.json())
                    .then((res) => {
                        if (res === 200) {
                            navigate('/')
                            setCheck(1)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        setError(err)
                        setCheck(1)
                    })
            })();
        }
    }

    return (
        <div>
            <div className="home">
                <center>
                    <Typography variant="h4" style={{ 'color': '#414756', 'marginTop': '2%' }}>Complaint Registration Interface</Typography>
                    <div><Typography variant="h6" style={{ 'color': '#414756', 'textDecoration': 'underline' }}></Typography></div> <br />
                    <br />
                </center>
            </div>
            <br />
            <center className="admin-log">
                <Stack row='row' spacing={2} width='50%' className="student-log">
                    <Typography variant="h6" style={{ 'color': '#414756' }}>Enter Room number</Typography><TextField className="room-input" helperText={alert} onChange={(e) => setNumber(e.target.value)} />
                    <Typography variant="h6" style={{ 'color': '#414756' }}>Problem Description</Typography>
                    <TextField multiline className="prob-inp" onChange={(e) => setDesc(e.target.value)} />
                    {check ?
                        <Button variant="contained" onClick={handleProbSubmit} helperText={error}>Submit</Button>
                        :
                        <Button variant="contained" disabled>Submit</Button>
                    }
                </Stack>
            </center>
        </div>
    )
}


