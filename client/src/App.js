import {BrowserRouter as Router} from 'react-router-dom'
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
