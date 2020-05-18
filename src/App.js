import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />;
        </Route>
        <Route path='/' exact>
          <Dashboard />
        </Route>
        <Route path='/'>
          <Redirect to='/login' />
        </Route>
      </Switch>
    </Router>
  );
  return (
    <Router>
      <div className="App">
        <Sidebar
          selectedTab={window.location.pathname}
          tabs={[
            { caption: "Home", icon: "home_icon.png", target: "/" },
            { caption: "Customers", icon: "people_icon.png", target: "/customers" },
            { caption: "Reports", icon: "graph_icon.png", target: "/reports" },
          ]} />
        <Switch>
          <Route path="/reports">
            <div className="App-header">Reports</div>
          </Route>
          <Route path="/customers">
            <div className="App-header">Customers</div>
          </Route>
          <Route path="/">
            <div className="App-header">Home</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;