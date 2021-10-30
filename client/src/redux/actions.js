import { AUTH_EDIT } from "./types";

export function editAuth(isAuthenticated){
    return {
        type: AUTH_EDIT,
        payload: isAuthenticated
    }
}