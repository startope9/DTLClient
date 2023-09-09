import React, { useEffect, useState } from "react"
import "./display.css"
import { Typography, Fab, TextField } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


import { Pagination } from "@mui/material";
import Loading from "./Loading";

export default function Display() {

    const [arr, setArr] = useState([])
    const [arrdisplay, setArrayDisplay] = useState([])
    const [error, setError] = useState('')


    const [value, pageValue] = useState(1)
    const [totalpages, setTotalPages] = useState(0)
    const [sliceValue, setSliceValue] = useState(0)
    const [columns, setColumns] = useState(10)


    useEffect(() => {
        document.title = 'Unsolved problems';
        (async () => {
            await fetch('https://hostelhelpserver.onrender.com/get_data/' + 'unsolved', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'https://hostelhelpserver.onrender.com',
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then((res) => {
                    setArr(res)
                    setArrayDisplay(res)
                    setTotalPages(Math.ceil(res.length / columns))
                })
                .catch((err) => {
                    console.log(err)
                    setError(err)
                })
        })();


        // else document.getElementsByClassName('each-prob').classList.remove('display-item')

    }, [])

    const handleUpvote = (_id) => {
        if (document.getElementById("outer-circle " + _id).classList.contains('addbg')) {
            document.getElementById("outer-circle " + _id).classList.remove('addbg');
            document.getElementById('like-icon ' + _id).style.color = 'black';
            (async () => {
                await fetch('https://hostelhelpserver.onrender.com/likeaction/' + 'dislike', {
                    method: "POST",
                    headers: {
                        'Access-Control-Allow-Origin': 'https://hostelhelpserver.onrender.com',
                        'Content-type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ID: _id
                    })
                })
                    .then(res => res.json())
                    .then((res) => {
                        // console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })();
        }
        else {
            document.getElementById("outer-circle " + _id).classList.add('addbg');
            document.getElementById("like-icon " + _id).style.color = 'white';
            (async () => {
                await fetch('https://hostelhelpserver.onrender.com/likeaction/' + 'like', {
                    method: "POST",
                    headers: {
                        'Access-Control-Allow-Origin': 'https://hostelhelpserver.onrender.com',
                        'Content-type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ID: _id
                    })
                })
                    .then(res => res.json())
                    .then((res) => {
                        // console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })();
        }

    }


    function callBack() {
        if (value === 1)
            setSliceValue(0)
        else {
            pageValue(value - 1)
            setSliceValue(sliceValue - columns)
        }
    }

    function callFor() {
        if (value === totalpages)
            setSliceValue(totalpages * columns - columns)
        else {
            pageValue(value + 1)
            setSliceValue(sliceValue + columns)
        }
    }

    const handleChange = () => {
        let filter = document.getElementById('usefetch').value;
        let length_filter = document.getElementById('usefetch').value.length;
        var todispl = []

        if (filter.length) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][2].slice(0, length_filter) === filter) {
                    todispl.push(arr[i])
                }
            }
            setArrayDisplay(todispl)
            setTotalPages(Math.ceil(todispl.length / columns))
        }
        else {
            setArrayDisplay(arr)
            setTotalPages(Math.ceil(arr.length / columns))
            pageValue(1)
        }

    }

    const handleChangepage = (event, curval) => {
        if (value > curval) { pageValue(curval); callBack(); }
        else { pageValue(curval); callFor(); }
    }


    return (

        <div id="check-scroll">
            <div className="home">
                <center>
                    <Typography variant="h4" style={{ 'color': '#414756', 'marginTop': '2%' }}>Complaint Registration Interface</Typography>
                    <div><Typography variant="h6" style={{ 'color': '#414756', 'textDecoration': 'underline' }}></Typography></div> <br />
                    <br />
                </center>
            </div>
            <br />
            <div className="displaying" >
                {arr.length ?
                    (
                        <div>
                            <center style={{ 'margin': '1%' }}>
                                <TextField id="usefetch" fullWidth onChange={handleChange} label="Search" />
                            </center>
                            <div className="why">
                                {arrdisplay.slice(0 + sliceValue, columns + sliceValue).map((element) => (
                                    <div key={element[0]} className="each-prob default" id="each-prob" >
                                        <Typography variant="h6">{element[1]}</Typography>
                                        <Typography variant="body2">{element[2]}</Typography>
                                        <div>
                                            <Fab size="small" id={`outer-circle ${element[0]}`} onClick={() => handleUpvote(element[0])}>
                                                <FavoriteIcon size="small" id={`like-icon ${element[0]}`} />
                                            </Fab>
                                        </div>
                                        <br />
                                    </div>
                                ))}
                            </div>
                            <center className="outlin">
                                <Pagination count={totalpages} page={value} color="primary" onChange={handleChangepage} />
                            </center>
                        </div>
                    )
                    : error.length ?
                        (<Typography variant="body1" style={{ 'margin': '5px', 'color': 'red' }}>No problem posted</Typography>)
                        :
                        (<div><Loading /> </div>)
                }
            </div>
        </div>

    )
}

// id={`${element[0]}`} 