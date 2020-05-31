import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chart from '../../components/Chart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 300,
        paddingBottom: 50
    }
}));


const chart1_data = [
    { month: "Jan", request_count: 0 },
    { month: "Feb", request_count: 2 },
    { month: "Mar", request_count: 3 },
    { month: "Apr", request_count: 5 },
    { month: "May", request_count: 10 },
    { month: "Jun", request_count: null },
    { month: "Jul", request_count: null },
    { month: "Aug", request_count: null },
    { month: "Sep", request_count: null },
    { month: "Oct", request_count: null },
    { month: "Nov", request_count: null },
    { month: "Dec", request_count: null },
];

const chart2_data = [
    { month: "Jan", request_count: 0 },
    { month: "Feb", request_count: 2 },
    { month: "Mar", request_count: 2 },
    { month: "Apr", request_count: 0 },
    { month: "May", request_count: 7 },
    { month: "Jun", request_count: null },
    { month: "Jul", request_count: null },
    { month: "Aug", request_count: null },
    { month: "Sep", request_count: null },
    { month: "Oct", request_count: null },
    { month: "Nov", request_count: null },
    { month: "Dec", request_count: null },
];

const chart3_data = [
    { month: "Jan", request_count: 0 },
    { month: "Feb", request_count: 0 },
    { month: "Mar", request_count: 1 },
    { month: "Apr", request_count: 5 },
    { month: "May", request_count: 3 },
    { month: "Jun", request_count: null },
    { month: "Jul", request_count: null },
    { month: "Aug", request_count: null },
    { month: "Sep", request_count: null },
    { month: "Oct", request_count: null },
    { month: "Nov", request_count: null },
    { month: "Dec", request_count: null },
];


export default function Reports() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Chart
                            data={chart1_data}
                            title={"Total number of product requests per month for " + new Date().getFullYear()}
                            x_axis={{ key: 'month' }}
                            y_axis={{ key: 'request_count', label: 'Requests' }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Chart
                            data={chart2_data}
                            title={"Total asset product requests per month for " + new Date().getFullYear()}
                            x_axis={{ key: 'month' }}
                            y_axis={{ key: 'request_count', label: 'Requests' }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Chart
                            data={chart3_data}
                            title={"Total liability product requests per month for " + new Date().getFullYear()}
                            x_axis={{ key: 'month' }}
                            y_axis={{ key: 'request_count', label: 'Requests' }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}