import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Navbar from './Navbar';
import DashboardItems from './DashboardItems';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ForumIcon from "@material-ui/icons/Forum";
import axios from "axios";
import endPointObj from '../../endPointUrl.js';
import Button from '@mui/material/Button';
import { Modal} from 'react-bootstrap';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

const showApplicant = (applicantId) => {
    console.log(applicantId);
}

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Candidates(props) {
    console.log(JSON.stringify(props));
    const classes = useStyles();

    const [applicants, setApplicants] = useState([]);

    const [applicantId, setApplicantId] = useState('');
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmailId, setApplicantEmailId] = useState('');
    const [applicantStreet, setApplicantStreet] = useState('');
    const [applicantCity, setApplicantCity] = useState('');
    const [applicantCountry, setApplicantCountry] = useState('');
    const [applicantZipcode, setApplicantZipcode] = useState('');
    const [applicationStatus, setApplicationStatus] = useState('');
    const [message, setMessage] = useState('')

    const jobId = "619f92c5227cb6690426e43a";

    const [chatOpen, setChatOpen] = React.useState(false);
    const [chatExistOpen, setChatExistOpen] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleChatOpen = () => {setChatOpen(true);}
    const handleChatClose = () => { setChatOpen(false);};
    const handleChatExistOpen = () => {setChatExistOpen(true);}
    const handleChatExistClose = () => { setChatExistOpen(false);};

    const handleClickOpen = (rowId) => {

        //MAC

        setApplicantId(rowId);
        setApplicantName('Harper Lee');
        setApplicantEmailId('harperlee@gmail.com');
        setApplicantStreet('360 S Market St');
        setApplicantCity('San Jose');
        setApplicantCountry('United States');
        setApplicantZipcode('95113');
        setApplicationStatus('HIRED');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChatClick = async (jobSeekerId) =>{
        console.log(jobSeekerId)
        setApplicantId(jobSeekerId);
        const response = await axios.get(
            `${endPointObj.url}/employer/get-chats/${localStorage.getItem('userId')}/${jobSeekerId}`
        );
        console.log("get chat response",response)
        if(response.data.status === 404){
            console.log("chat not found");
            handleChatOpen();
        }
        else{
            handleChatExistOpen();
        }
    }

    const handleApplicationStatusChange = (event) => {

        //MAC
        setApplicationStatus(event.target.value);
    };

    const initiateChat = async () =>{

        const data = {
            employerId:localStorage.getItem('userId'),
            jobSeekerId:applicantId,
            message:message
        }
        console.log("data", data)
        const response = await axios.post(
            `${endPointObj.url}/employer/send-first-message`, data
        );
        console.log(response)
       
    }

    useEffect( () => {

        try {
            let rows = [];
            const testrows= [{
                _id:81263,
                jobSeekerDetails:{
                    firstName:"Ratika",
                    lastName:"Bhuwalka",
                    _id:"61a9e159c3372184f5262e6b"
                },
                resume:{
                    name:"test resume",
                    url:"test url"
                },
                coverLetter:{
                    name:"test resume",
                    url:"test url"
                },
                chat:"",
                rowId:132334,
            }]
            //const applications = await axios.get(endPointObj.url + "/employer/get-job-applicants?jobId=" + jobId);

            //console.log("Returned applications from backend: " + JSON.stringify(applications.data));

            if (testrows) {
                testrows.map((application) => {
                    console.log(application);
                    console.log(application._id);
                    console.log(application.jobSeekerDetails.firstName);
                    console.log(application.jobSeekerDetails.lastName);
                    const app = {
                        id: application._id,
                        resume: "View Resume",
                        coverLetter: "View Cover Letter",
                        applicantName: application.jobSeekerDetails.firstName + ' ' + application.jobSeekerDetails.lastName,
                        resumeName: application.resume.name,
                        resumeUrl: application.resume.url,
                        coverLetterName: application.coverLetter.name,
                        coverLetterUrl: application.coverLetter.url,
                        rowId: application._id,
                        jobSeekerId: application.jobSeekerDetails._id
                    }
                    console.log("app", app)
                    rows.push(app);
                })
                setApplicants(rows);
            }
            else {
                    console.log("test rows not found")
            }

        }
        catch (err) {
            console.log("Error in fetching employer" + err);
        }
    }, [])

    console.log("applicant details",applicants)
    let redirectComponent = null;
    if (!props.location.state) {
        if (localStorage.getItem('role') === "EMPLOYER") {
            alert('Select a job to view candidates');
            redirectComponent = <Redirect to="/employer/jobs" />
        }
        else{
            redirectComponent = <Redirect to="/login" />
        }
    }

    const columns = [
        {
            field: 'resume',
            headerName: 'Resume',
            width: 300,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <strong>
                    <a
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16, textDecoration: 'none', cursor: 'pointer' }}
                        href={params.row.resumeUrl}
                        target="_blank"
                    >
                        {params.row.resumeName}
                    </a>
                </strong>
            ),
        },
        // {
        //     field: 'coverLetter',
        //     headerName: 'Cover Letter',
        //     width: 300,
        //     headerAlign: 'center',
        //     align: 'center',
        //     renderCell: (params) => (
        //         <strong>
        //             <a
        //                 variant="contained"
        //                 color="primary"
        //                 size="small"
        //                 style={{ marginLeft: 16, textDecoration: 'none', cursor: 'pointer' }}
        //                 href={params.row.coverLetterUrl}
        //                 target="_blank"
        //             >
        //                 {params.row.coverLetterName}
        //             </a>
        //         </strong>
        //     ),
        // },
        {
            field: 'applicantName',
            headerName: 'Applicant Name',
            width: 300,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <strong>
                    <a
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16, textDecoration: 'none', cursor: 'pointer' }}
                        onClick={() => {
                            handleClickOpen(params.row.rowId);
                        }}
                    >
                        {params.value}
                    </a>
                </strong>
            ),
        },

        {
            field: 'chat',
            headerName: 'Chat Messages',
            width: 300,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <strong>
                    {/* <a
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16, textDecoration: 'none', cursor: 'pointer' }}
                        onClick={() => {
                            handleClickOpen(params.row.rowId);
                        }}
                    >
                        {params.value}
                    </a> */}
                    <ForumIcon
                    onClick = {()=>{
                        handleChatClick(params.row.jobSeekerId);
                    }}/>
                    
                   

                </strong>
            ),
        },



    ];

    const ChatModal = () => {
        return (
         <Modal show={chatOpen} onHide={handleClose} animation={false} >
         <Modal.Header>
           <Modal.Title>Chat with Candidate</Modal.Title>
         </Modal.Header>
         <Modal.Body>
             <div><h5>Chat Not Found!</h5></div>
             <div>
                 Intiate Conversation with Candidate:
             </div>
             <div>
                 <input type="text" value = {message} onChange={(e) => setMessage(e.target.value) }></input>
                 <button onClick= {initiateChat}>Send</button>
             </div>
         </Modal.Body>
         <Modal.Footer>
             <Button variant="light" onClick={handleChatClose}>Cancel</Button>
             
         </Modal.Footer>
       </Modal>
         ) 
       };

       const ChatExistsModal = () => {
        return (
         <Modal show={chatExistOpen} onHide={handleChatExistClose} animation={false} >
         <Modal.Header>
           <Modal.Title>Chat with Candidate</Modal.Title>
         </Modal.Header>
         <Modal.Body>
             <div><h5>Chat Exists!</h5></div>
             <div>
                Chat history with Candidate Found
             </div>
             <div>
                <a href = "/employer/messages">Go to Chats</a>
             </div>
         </Modal.Body>
         <Modal.Footer>
             <Button variant="light" onClick={handleChatExistClose}>Cancel</Button>
             
         </Modal.Footer>
       </Modal>
         ) 
       };
     

    return (
        <div>
            {redirectComponent}
            <Navbar current='dashboard' />
            <DashboardItems current="candidates" />
            <div hidden={showApplicant} style={{ marginTop: '8%', height: '100vh', backgroundColor: '#f2f2f2' }}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={3}>
                        <div >
                            <br />
                            Applicants for Job : {props.location.state ? (props.location.state.jobTitle ? props.location.state.jobTitle : '') : ''}
                        </div>
                    </Grid>

                </Grid>

                <Card sx={{ display: 'flex' }} style={{ width: '75%', marginTop: '1%', marginLeft: '15%', borderRadius: '15px', height: '50%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flex: '1 0 auto' }} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '1%', height: '100%' }}>
                            <div style={{ height: '100%', width: '100%' }} className={classes.root}>
                                <DataGrid rows={applicants} columns={columns} disableColumnMenu hideFooterSelectedRowCount={true} />
                            </div>

                        </CardContent>
                    </Box>
                </Card>

            </div>

            <React.Fragment>

                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                >

                    <DialogTitle style={{ fontWeight: 'bolder', backgroundColor: 'rgb(37, 87, 167)', color: '#ffffff', fontSize: 'xx-large' }}>{applicantName}</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ fontWeight: 'bolder', color: "#000000", fontFamily: 'Open Sans', marginTop: '2%', marginBottom: '2%' }}>{applicantEmailId}</Typography>
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ color: "#000000", fontFamily: 'Open Sans' }}>{applicantStreet}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ color: "#000000", fontFamily: 'Open Sans' }}>{applicantCity}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ color: "#000000", fontFamily: 'Open Sans' }}>{applicantZipcode}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ color: "#000000", fontFamily: 'Open Sans' }}>{applicantCountry}</Typography>
                            </Grid>

                        </Grid>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <InputLabel htmlFor="max-width">Application Status </InputLabel>
                                <Select
                                    autoFocus
                                    value={applicationStatus}
                                    onChange={handleApplicationStatusChange}
                                    label="applicationStatus"
                                    inputProps={{
                                        name: 'applicationStatus',
                                        id: 'max-width',
                                    }}
                                >
                                    <MenuItem value="SUBMITTED">Submitted</MenuItem>
                                    <MenuItem value="REVIEWED">Reviewed</MenuItem>
                                    <MenuItem value="INITIAL_SCREENING">Initial Screening</MenuItem>
                                    <MenuItem value="INTERVIEWING">Interviewing</MenuItem>
                                    <MenuItem value="HIRED">Hired</MenuItem>
                                    <MenuItem value="REJECTED">Rejected</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{
                            width: "100%",
                            borderRadius: '8px',
                            height: "40px",
                            color: "#ffffff",
                            backgroundColor: "rgb(37, 87, 167)",
                            cursor: "pointer",
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '100%',
                        }} onClick={handleClose}>Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            <ChatModal/>
            <ChatExistsModal/>

        </div>
    )

}
