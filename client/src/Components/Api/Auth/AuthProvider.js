import { httpLoginPost } from '../utils/utils'

const AuthProvider =  {
    login:(value) => {
        return(
            httpLoginPost(value)
                .then(res => {
                    return res.data
                })
                .then(jsonData => {
                    const currentUser = {
                        userId: jsonData.userId,
                        userName: jsonData.userName
                    }
                    localStorage.setItem('currentUser', JSON.stringify(currentUser))
                    localStorage.setItem('token', jsonData.token)
                })
                .catch(err => {
                    throw new Error(err)
                })
        )
    },
    checkError:(error) => {
        console.log(error)
        if(error && error.status && error.status === 401){
            localStorage.clear()
            window.location.assign('/login') 
        }
        return Promise.reject()
    },
}

export default AuthProvider