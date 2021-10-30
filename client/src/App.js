import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard';
import Error from './Components/Error/Error';
import Files from './Components/Files/Files';
import Links from './Components/Links/Links';
import LoginPage from './Components/LoginPage/LoginPage';
import RegistrationPage from './Components/RegistrationPage/RegistrationPage';
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/links" component={Links} />
          <Route path="/files" component={Files} />
          <Route component={Error} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
