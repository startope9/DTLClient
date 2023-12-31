import React, { useEffect, useState } from "react"
import "./display.css"
import { Typography, Fab, TextField, Stack, Button } from "@mui/material";
// import FavoriteIcon from '@mui/icons-material/Favorite';

import Loading from "./Loading";
import { Pagination } from "@mui/material";
export default function AdminDisplay() {

    const [arr, setArr] = useState([])
    const [arrdisplay, setArrayDisplay] = useState([])
    const [error, setError] = useState('')


    const [value, pageValue] = useState(1)
    const [totalpages, setTotalPages] = useState(0)
    const [sliceValue, setSliceValue] = useState(0)
    const [columns, setColumns] = useState(10)


    function data_sort(setofarr) {
        var sortedArry = setofarr.sort(function (a, b) {
            return b[3] - a[3];
        })
        setArr(sortedArry)
        setArrayDisplay(sortedArry)
        setTotalPages(Math.ceil(sortedArry.length / columns))
    }


    useEffect(() => {
        document.title = 'Admin | display';

        (async () => {
            await fetch('https://hostelhelpserver.onrender.com/get_data/' + 'unsolved', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'https://hostelhelpserver.onrender.com',
                    'Content-type': 'include'
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then((res) => {
                    setTotalPages(Math.ceil(res.length / columns))
                    data_sort(res)
                })
                .catch((err) => {
                    console.log(err)
                    setError(err)
                })
        })();


        // else document.getElementsByClassName('each-prob').classList.remove('display-item')

    }, [])

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

    function callremove(_id) {
        let removed = []
        for (var i = 0; i < arr.length; i++) {
            if (i[3] !== _id) removed.push(i);
        }
        if (!arr.length) data_sort([])
        else data_sort(removed)
    }

    const handleSolved = (_id) => {
        (async () => {
            await fetch('https://hostelhelpserver.onrender.com/handlesolved', {
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
                    if (res === 200) callremove(_id)
                })
                .catch((err) => {
                    console.log(err)
                })
        })();
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
                                <TextField id="usefetch" fullWidth onChange={handleChange} label="Search Problem" />
                            </center>
                            <div className="why">
                                {arrdisplay.slice(0 + sliceValue, columns + sliceValue).map((element) => (
                                    <div key={element[0]} className="each-prob default" id="each-prob" >
                                        <Typography variant="h6">{element[1]}</Typography>
                                        <Typography variant="body2">{element[2]}</Typography>
                                        <div>
                                            <Stack direction="row" spacing={4}>
                                                <Fab size="small" disabled id={`outer-circle ${element[0]}`} >
                                                    {element[3]}
                                                </Fab>
                                                <Button variant="contained" onClick={() => handleSolved(element[0])}>Solved</Button>
                                            </Stack>
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
                        <Typography variant="body1" style={{ 'margin': '5px', 'color': 'red' }}>No problem posted</Typography>
                        :
                        (<div><Loading /> </div>)

                }
            </div>
        </div>

    )
}

