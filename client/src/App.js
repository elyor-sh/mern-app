import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from './Components/Routes/useRoutes';
import {connect} from 'react-redux'
import {useEffect} from 'react'
import { editAuth } from './redux/actions';

function App({isAuthitenticated, editAuth}) {

  useEffect(() => {
   const token = localStorage.getItem('token')
   if(token){
    editAuth(true)
   }else{
    editAuth(false)
   }
  }, [editAuth])
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

const mapDispatchToProps = {
  editAuth: editAuth
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
