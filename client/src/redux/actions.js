import { AUTH_EDIT, USER_EDIT } from "./types";

export function editAuth(isAuthenticated){
    return {
        type: AUTH_EDIT,
        payload: isAuthenticated
    }
}

export function editUser(user){
    return {
        type: USER_EDIT,
        payload: user
    }
}