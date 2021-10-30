import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from './Components/Routes/useRoutes';
import {connect} from 'react-redux'

function App({isAuthitenticated}) {
    const routes = useRoutes(isAuthitenticated)
  return (
    <>
      <Router>
        {routes}
      </Router>
    </>
  );
}

const mapStateToProps = state => {
  return {
      isAuthitenticated: state.auth.isAuthitenticated
  }
}


export default connect(mapStateToProps, null)(App);
