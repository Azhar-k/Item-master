import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App/App.js';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers/reducer'
import 'bootstrap/dist/css/bootstrap.min.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


/* Theme variables */
import './theme/variables.css';
import { IonReactRouter } from '@ionic/react-router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    globalState : reducer,
})
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(<IonReactRouter><Provider store={store}> <App /></Provider></IonReactRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// const mapStateToProps = state => {
//     return {
//         appsLoading: state.apps.appsLoading,
//         appsList: state.apps.appsList,
//         bugForm: state.apps.bugForm,
//         token: state.auth.token,
//         isAuthenticated : state.auth.token!==null,
//         authRedirectPath: state.auth.authRedirectPath,
//         userName : state.auth.userName,
//     };
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         onInitBugs: (token) => dispatch(bugsActions.initBugs(token)),
//         onInitApps: (token) => dispatch(addBugsAction.initApps(token)),
//         onBugFormChanged: (bugForm) => dispatch(addBugsAction.setBugForm(bugForm))
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(AddBug);