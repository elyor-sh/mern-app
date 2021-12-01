function setLocalStorage(user) {
    const currentUser = {
        userId: user.userId,
        userName: user.userName,
        userAvatar: user.avatar,
        userEmail: user.userEmail
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
}

export default setLocalStorage