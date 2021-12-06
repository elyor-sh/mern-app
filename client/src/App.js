import { BrowserRouter as Router } from 'react-router-dom'
import useRoutes from './Components/Routes/useRoutes';
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { editAuth, editUser } from './redux/actions';
import Toast from './Components/Toast/Toast';

function App({ isAuthitenticated, editAuth, editUser }) {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      editAuth(true)
    } else {
      editAuth(false)
    }

    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser'))

      const currentUser = {
        name: user.userName,
        email: user.userEmail,
        id: user.userId,
        avatar: user.userAvatar,
      }
      editUser(currentUser)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const routes = useRoutes(isAuthitenticated)
  return (
    <>
      <Toast/>
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
  editAuth: editAuth,
  editUser: editUser
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
