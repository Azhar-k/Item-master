

import * as actionTypes from './ActionTypes';
import {auth} from '../../FireBaseServices'

export const authStartOrStop = () => {
    return {
        type: actionTypes.LOADING
    };
};

export const authSuccess = (token, userId,userName) => {
    return {
        type: actionTypes.LOADING,
        userId: userId,
        userName : userName,

    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.ERROR,
        error: error
    };
};

export const authenticate = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStartOrStop());
        auth.signInWithEmailAndPassword(email,password)
        .then((response)=>{
            dispatch(authStartOrStop());

        }).catch(error=>{
            dispatch(authStartOrStop());
            dispatch(authFail(error));
            console.log(error);
        })
        
    };
};
export const authCheckState = (status) => {

    return dispatch=>{
        dispatch(authStateChanged(status))
    }
};

export const authStateChanged =(status)=>{
    return({
        type : actionTypes.AUTH_CHANGED,
        status : status

    })
}

