import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home/Home';
import Appointment from './pages/appointment/Appointment/Appointment';
import Login from './pages/Login/Login/Login';
import Navigation from './pages/shared/Navigation/Navigation';
import Registation from './pages/Login/Registation/Registation';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './pages/Login/PrivateRoute/PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/appointment">
            <Appointment/>
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard/>
          </PrivateRoute>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Navigation/>
            <Login/>
          </Route>
          <Route path="/registration">
            <Navigation/>
            <Registation/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
