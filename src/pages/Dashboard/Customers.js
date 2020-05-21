import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Bounce from 'react-activity/lib/Bounce';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getCustomers } from '../../api';

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

let customers;
export default function Customers() {
    const [isLoading, setLoading] = React.useState(customers === undefined);
    const theme = useTheme();
    const classes = useStyles();

    React.useEffect(() => {
        if (isLoading) {
            getCustomers()
                .then(results => {
                    customers = results;
                    setLoading(false);
                })
                .catch(() => alert("Something went wrong. Please check your internet connection and refresh the page."));
        }
    }, [isLoading]);

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
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(customers || []).map(c => (
                                <TableRow key={c.email}>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.email}</TableCell>
                                    <TableCell>{c.phoneNumber}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box mt={2} align="right">
                        <Button variant="contained" color="primary" onClick={() => setLoading(true)}>
                            Refresh
                        </Button>
                    </Box>
                </React.Fragment>
            }
        </Paper>
    );
}