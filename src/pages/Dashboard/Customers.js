import React from 'react';
import Paper from '@material-ui/core/Paper';
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
function createData(id, name, email, phoneNumber) {
    return { id, name, email, phoneNumber };
}

const rows = [
    createData(0, 'Joseph Edusei', 'jedusei99@gmail.com', '020654898'),
    createData(1, 'John Doe', 'johndoe@microsoft.com', '0305658521'),
    createData(2, 'Beatrice Simpson', 'bsimpson@hotmail.com', '028225823'),
    createData(3, 'Karen Whittaker', 'karenwhite@gmail.com', '0246852281'),
    createData(4, 'Denzel Washington', 'denzel@gmail.com', '054853212'),
];


export default function Customers() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
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
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phoneNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        </Paper>
    );
}