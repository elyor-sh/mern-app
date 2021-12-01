import { AUTH_EDIT, USER_EDIT } from "./types";

const initialState = {
    isAuthitenticated: false,
    token: '',
    user: {
        name: '',
        email: '',
        avatar: '',
        id: ''
    },
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_EDIT:
            
            return {...state, isAuthitenticated: action.payload};
        case USER_EDIT:
            
            return {...state, user: action.payload};
    
        default:
            return state;
    }
    
}