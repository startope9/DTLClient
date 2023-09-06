import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {

    const navigate = useNavigate();

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [alert, setAlert] = useState('')

    const handleSubmit = () => {
        (async () => {
            await fetch('https://hostelhelpserver.onrender.com/adminlog', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    Head: user,
                    Password: pass
                })
            })
                .then(res => res.json())
                .then((res) => {
                    if (res === 200) {
                        navigate('/admindisplay');
                        setAlert('')
                    }
                    else {
                        setAlert('Incorrect Credentials')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })();
    }

    return (
        <div className="log">
            <div className="home">
                <center>
                    <Typography variant="h4" style={{ 'color': '#414756', 'marginTop': '2%' }}>Complaint Registration Interface</Typography>
                    <div><Typography variant="h6" style={{ 'color': '#414756', 'textDecoration': 'underline' }}></Typography></div> <br />
                    <br />
                </center>
            </div>
            <center className="admin-log">
                <Stack row='row' spacing={2} width='50%' className="lets-try">
                    <Typography variant="body1" style={{ 'color': '#414756' }}>Admin Login</Typography>
                    <TextField variant="outlined" label='Username' style={{ 'backgroundColor': 'white' }} onChange={(e) => setUser(e.target.value)} />
                    <TextField variant="outlined" label='Password' style={{ 'backgroundColor': 'white' }} type="password" onChange={(e) => setPass(e.target.value)} />
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Stack>
                <div style={{ 'color': 'red' }}>{alert}</div>
            </center>
        </div>
    )
}

