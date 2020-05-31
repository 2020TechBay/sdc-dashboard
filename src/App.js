import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b74c21'
    },
    secondary: {
      main: '#c56f4d'
    },
  },
});

function App() {
  const isLoggedIn = (localStorage.getItem('access_token') != null);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/login'>
            {isLoggedIn ?
              <Redirect to='/dashboard' />
              :
              <Login />
            }
          </Route>
          <Route path={['/', '/customers', '/requests', '/reports']} exact>
            {isLoggedIn ?
              <Dashboard />
              :
              <Redirect to='/login' />
            }
          </Route>
          <Route path='/'>
            <Redirect to={isLoggedIn ? '/dashboard' : '/login'} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;