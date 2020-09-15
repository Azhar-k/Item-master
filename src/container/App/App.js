import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonToolbar, IonTitle, IonHeader, IonContent, IonLoading, IonText } from '@ionic/react';
import Login from '../../pages/Login/Login';
import AppTabs from '../AppTabs/AppTabs';
import * as authAction from '../../store/actions/firebaseAuth'
import { connect } from 'react-redux'
import { auth } from '../../FireBaseServices'
import * as loadingAction from '../../store/actions/loading'


class App extends Component {

  state = {
    loading: true
  }
  componentDidMount(props) {
    console.log("component did mount")
    auth.onAuthStateChanged((user) => {
      console.log('auth changed');
      this.props.onAuthStateCheck(Boolean(user))
      this.setState({ loading: false });
    })


  }

  logOutHandler = () => {
    
    console.log("logoutHandler")
    auth.signOut();

  }

  getLogoutButton = () =>{
    let logOutButtton = null;
    if (this.props.isLoggedIn) {
      logOutButtton = <IonText onClick={this.logOutHandler} size="small" color='danger' slot='end' className='ion-padding'>Logout</IonText>
    }

    return logOutButtton
  }


  render() {
    console.log("App render")
    if (this.state.loading) {
      return <IonLoading isOpen />

    }

    let logOutButtton=this.getLogoutButton();
    
    return (

      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Item Master</IonTitle>
            {logOutButtton}
          </IonToolbar>

        </IonHeader>

        <IonContent>
          <IonRouterOutlet>

            <Route path="/login" component={Login} exact={true} />
            <Route path="/my" component={AppTabs} />
            <Route exact path="/" render={() => <Redirect to="/my" />} />


          </IonRouterOutlet>
        </IonContent>



      </IonApp >
    );
  }

}

const mapStateToProps = state => {
  return {
    loading: state.globalState.loading,
    isLoggedIn: state.globalState.isLoggedIn,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onSetLoading: () => dispatch(loadingAction.setLoading()),
    onAuthStateCheck: (status) => dispatch(authAction.authCheckState(status)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

