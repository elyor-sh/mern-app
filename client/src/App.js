import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard';
import Error from './Components/Error/Error';
import LoginPage from './Components/LoginPage/LoginPage';
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={LoginPage} />
          <Route component={Error} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
