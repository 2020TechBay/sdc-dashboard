import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Bounce from 'react-activity/lib/Bounce';
import 'react-activity/lib/Bounce/Bounce.css';
import { login } from '../api';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    document.title = "SDC Dashboard - Login";
    const classes = useStyles();
    const [state, _setState] = React.useState({
        email: "",
        password: "",
        showPassword: false,
        awaitingResponse: false,
        email_error: false,
        password_error: false
    });
    const setState = (newState) => {
        _setState({ ...state, ...newState });
    }
    const handleInputChange = (event) => {
        setState({
            [event.target.name]: event.target.value,
            [event.target.name + '_error']: false,
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!state.awaitingResponse) {
            let form = event.target;
            if (form.reportValidity()) {
                setState({ awaitingResponse: true });
                let result = await login(state.email, state.password);
                console.log(result);
                if (!result.error) {
                    sessionStorage.setItem('access_token', result.token);
                    window.location = '/';
                    return;
                }

                let email_error, password_error;
                switch (result.error) {
                    case "invalid_email":
                        email_error = "Incorrect entry."
                        break;
                    case "wrong_password":
                        password_error = "Incorrect entry."
                        break;

                    default:
                        alert("Something went wrong. Make sure you're connected to the internet and try again.");
                        break;
                }
                setState({
                    awaitingResponse: false,
                    email_error,
                    password_error
                });
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                    SDC Dashboard
                </Typography>
                <form className={classes.form} onSubmit={handleLogin} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={Boolean(state.email_error)}
                        helperText={state.email_error}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={state.showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        error={Boolean(state.password_error)}
                        helperText={state.password_error}
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle Password Visibility"
                                        onClick={() => setState({ showPassword: !state.showPassword })}
                                    >
                                        <Icon>  {state.showPassword ? "visibility" : "visibility_off"}</Icon>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color={state.awaitingResponse ? "secondary" : "primary"}
                        className={classes.submit}
                        disabled={state.awaitingResponse}>
                        {state.awaitingResponse ?
                            <span><Bounce color="white" /></span>
                            :
                            "Sign In"
                        }
                    </Button>
                </form>
                <Link href="#" variant="body2" >
                    Forgot password?
                </Link>
            </div>
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://github.com/2020TechBay/">
                        TechBay Inc.
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Container>
    );
}