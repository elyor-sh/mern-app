import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import useRoutes from './Components/Routes/useRoutes';
function App() {
    const routes = useRoutes(false)
  return (
    <>
      <Router>
        {routes}
      </Router>
    </>
  );
}

export default App;
