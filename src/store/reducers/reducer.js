import * as actionTypes from '../actions/ActionTypes.js'

const initialState = {
    loading: false,
    userId :null,
    isLoggedIn:false,
    error:"",
   
}

const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.LOADING) {

        const updatedLoading = !state.loading;
        return {
            ...state,
            loading: updatedLoading,
        }
    }

    if (action.type === actionTypes.AUTHENTICATE) {
        console.log(state.isLoggedIn)
        return {
            ...state,
            isLoggedIn:true
        }
    }

    if (action.type === actionTypes.AUTH_CHANGED) {

        return {
            ...state,
            isLoggedIn:action.status,
        }
    }

    if (action.type === actionTypes.ERROR) {

        return {
            ...state,
            error:action.error.code.substr(5),
        }
    }

    return state;
}

export default reducer;