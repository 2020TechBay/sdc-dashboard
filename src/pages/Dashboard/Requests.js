import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
}));

// Generate Order Data
function createData(id, date, customer, product, response) {
    return { id, date, customer, product, response };
}

const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'HP Laptop', 'N/A'),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'Xbox One Console', 'ACCEPTED'),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Samsung TV', 'REJECTED'),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'iPhone', 'REJECTED'),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'BMW M3', 'ACCEPTED'),
];

export default function Requests() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <React.Fragment>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Response</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.product}</TableCell>
                                <TableCell>{row.customer}</TableCell>
                                <TableCell>{row.response}</TableCell>
                                <TableCell align="right">
                                    {row.response === 'N/A' ?
                                        <Button variant="contained" color="primary" disableElevation>
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
            </React.Fragment>
        </Paper>
    );
}