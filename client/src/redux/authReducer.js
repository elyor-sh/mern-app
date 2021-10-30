import { AUTH_EDIT } from "./types";

const initialState = {
    isAuthitenticated: false,
    token: '',
    name: '',
    email: '',
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_EDIT:
            
            return {...state, isAuthitenticated: action.payload};
    
        default:
            return state;
    }
    
}