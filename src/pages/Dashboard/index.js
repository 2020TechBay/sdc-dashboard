import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink, Switch, Route } from 'react-router-dom';
import Title from '../../components/Title';
import Chart from '../../components/Chart';
import Customers from './Customers';
import Requests from './Requests';
import Reports from './Reports';

const drawerWidth = 240;
const roleMap = {
    'Admin': 'Administrator',
    'APM': 'Asset Product Manager',
    'LPM': 'Liability Product Manager'
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    sidebar_header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        height: '64px',
        backgroundColor: theme.palette.primary.main
    },
    logo: {
        width: '200px'
    },
    profile: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: '20px',
    },
    email: {
        opacity: 0.8
    },
    role: {
        fontWeight: 'bold',
        opacity: 0.5,
        textTransform: 'uppercase',
        marginBottom: 10
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function SidebarItem({ caption, icon, target }) {
    const children = (
        <>
            <RouterLink to={target}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }} />
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={caption} />
        </>
    );
    return (
        <Switch>
            <Route path={target} exact>
                <ListItem button selected>
                    {children}
                </ListItem>
            </Route>
            <Route>
                <ListItem button>
                    {children}
                </ListItem>
            </Route>
        </Switch>
    );
}

export default function Dashboard() {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('user_info'));
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        <Switch>
                            <Route path='/' exact>
                                Dashboard
                            </Route>
                            <Route path='/customers'>
                                Customers
                            </Route>
                            <Route path='/requests'>
                                Requests
                            </Route>
                            <Route path='/reports'>
                                Reports
                            </Route>
                        </Switch>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.sidebar_header}>
                    <img src="sdc_logo.png" alt="" className={classes.logo} />
                </div>
                <div className={classes.profile}>
                    <span className={classes.name}>{user.name}</span>
                    <span className={classes.email}>{user.email}</span>
                    <span className={classes.role}>{roleMap[user.role]}</span>
                    <Button mt={4} variant="contained" color="primary" disableElevation
                        onClick={() => {
                            localStorage.clear();
                            window.location = '/login';
                        }}>
                        Logout
                    </Button>
                </div>
                <Divider />
                <List>
                    <SidebarItem caption="Dashboard" icon="home" target='/' />
                    <SidebarItem caption="Customers" icon="people" target='/customers' />
                    <SidebarItem caption="Requests" icon="drafts" target='/requests' />
                    <SidebarItem caption="Reports" icon="assignment" target='/reports' />
                </List>
                <Box mt='auto' py={2}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="https://github.com/2020TechBay/">
                            TechBay Inc.
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        <Route path='/' exact>
                            <DashboardPage />
                        </Route>
                        <Route path='/customers'>
                            <Customers />
                        </Route>
                        <Route path='/requests'>
                            <Requests />
                        </Route>
                        <Route path='/reports'>
                            <Reports />
                        </Route>
                    </Switch>
                </Container>
            </main>
        </div>
    );
}

const chart_data = [
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

function DashboardPage() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart
                        data={chart_data}
                        title={"Total number of requests per month for " + new Date().getFullYear()}
                        x_axis={{ key: 'month' }}
                        y_axis={{ key: 'request_count', label: 'Requests' }}
                    />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                        <Title>Peak</Title>
                        <Box display='flex' flex={1} flexDirection='column' alignItems='center' justifyContent='center' pb={3}>
                            <Typography component="p" variant="h4">
                                10
                            </Typography>
                            <Typography color="textSecondary">
                                requests on May 2020
                        </Typography>
                        </Box>
                    </React.Fragment>
                </Paper>
            </Grid>
            {/* Recent Requests */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        <Title>Recent Requests</Title>
                        <Table  >
                            <TableHead >
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell align="right">Response</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.product}</TableCell>
                                        <TableCell>{row.customer}</TableCell>
                                        <TableCell align="right">{row.response}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Box align="right" mt={3}>
                            <Link color="primary" href="/requests" >
                                View all
                            </Link>
                        </Box>
                    </React.Fragment>
                </Paper>
            </Grid>
        </Grid>
    );
}