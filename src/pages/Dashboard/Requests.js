import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Bounce from 'react-activity/lib/Bounce';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import { getRequests, sendResponse } from '../../api';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    loadingContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

let requests = 0;
export default function Requests() {
    const [isLoading, setLoading] = React.useState(requests === 0);
    const [showModal, setModalVisible] = React.useState(false);
    const [selectedRequest, setSelectedRequest] = React.useState();
    const [isSendingResponse, setIsSendingResponse] = React.useState(false);
    const theme = useTheme();
    const classes = useStyles();

    React.useEffect(() => {
        if (isLoading) {
            getRequests(requests !== 0)
                .then(results => {
                    requests = results;
                    setLoading(false);
                })
                .catch(() => alert("Something went wrong. Please check your internet connection and refresh the page."));
        }
    }, [isLoading]);

    const handleResponseClicked = (response) => {
        setIsSendingResponse(true);
        sendResponse(selectedRequest.id, response)
            .catch(() => alert("Something went wrong. Please check your internet connection and refresh the page."))
            .then(() => {
                setIsSendingResponse(false);
                setModalVisible(false);
                setLoading(true);
            });
    };

    return (
        <Paper className={classes.paper}>
            {isLoading ?
                <Box className={classes.loadingContainer}>
                    <Bounce color={theme.palette.primary.main} />
                </Box>
                :
                <React.Fragment>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Date</b></TableCell>
                                <TableCell><b>Customer</b></TableCell>
                                <TableCell><b>Product Name</b></TableCell>
                                <TableCell><b>Product Description</b></TableCell>
                                <TableCell><b>Response</b></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(requests || []).map(r => (
                                <TableRow key={r.id}>
                                    <TableCell>{moment(r.date).format("D MMM YYYY [at] h:mm a")}</TableCell>
                                    <TableCell>{r.customer.name}</TableCell>
                                    <TableCell>{r.product.name}</TableCell>
                                    <TableCell>{r.product.description}</TableCell>
                                    <TableCell>{r.response}</TableCell>
                                    <TableCell align="right">
                                        {r.response === 'N/A' ?
                                            <Button variant="contained" color="primary" disableElevation
                                                onClick={() => {
                                                    setSelectedRequest(r);
                                                    setModalVisible(true);
                                                }}>
                                                Respond
                                        </Button>
                                            :
                                            null
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box mt={2} align="center">
                        <Button variant="contained" color="primary" onClick={() => setLoading(true)}>
                            Refresh
                        </Button>
                    </Box>
                </React.Fragment>
            }
            <Dialog
                fullWidth
                disableBackdropClick
                disableEscapeKeyDown
                open={showModal}
                onClose={() => setModalVisible(false)}
            >
                <DialogTitle id="alert-dialog-title">Respond to Request</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <b>Product: </b>{selectedRequest?.product.name}<br />
                        <b>Customer Info:</b>
                        <div style={{ marginLeft: 10 }}>
                            <b>Name: </b>{selectedRequest?.customer.name}<br />
                            <b>Age: </b>{selectedRequest?.customer.age} years<br />
                            <b>Email: </b>{selectedRequest?.customer.email}<br />
                            <b>Phone Number: </b>{selectedRequest?.customer.phoneNumber}<br />
                            <b>Nationality: </b>{selectedRequest?.customer.nationality}<br />
                            <b>National ID Number: </b>{selectedRequest?.customer.nationalID}<br />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" disabled={isSendingResponse}
                        onClick={() => setModalVisible(false)} >
                        Cancel
                     </Button>
                    <Button color="primary" disabled={isSendingResponse}
                        onClick={() => handleResponseClicked("REJECTED")} >
                        Reject
                     </Button>
                    <Button variant="contained" color="primary" autoFocus disableElevation disabled={isSendingResponse}
                        onClick={() => handleResponseClicked("ACCEPTED")} >
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}