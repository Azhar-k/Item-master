
import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonLoading, IonText, } from '@ionic/react';
import { IonItem, IonList, IonLabel, IonInput, IonButton } from '@ionic/react'
import { connect } from 'react-redux';
import * as authAction from '../../store/actions/firebaseAuth'
import { Redirect } from 'react-router';



class Auth extends Component {

  state = {
    authForm: {
      email: '',
      password: '',
    }
  }

  inputChangeHandler = (event) => {
    const key = event.target.id;
    let value = event.target.value;

    let updatedForm = { ...this.state.authForm }
    updatedForm[key] = value;

    this.setState({ authForm: updatedForm })

  }

  authFormHandler = (event) => {
    event.preventDefault();
    const email = this.state.authForm.email;
    const password = this.state.authForm.password;
    this.props.onAuthenticate(email, password, true)


  }
  render() {
    console.log("login render")
    console.log("isLoggedIn : " + this.props.isLoggedIn)
    if (this.props.isLoggedIn) {
      return <Redirect to='/' />
    }
    return (
      <IonPage className='align-items-center'>
        <IonHeader>
          
        </IonHeader>
        <IonContent className='ion-padding' fullscreen>
          <form onSubmit={this.authFormHandler}>
            <IonList>

              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput id='email' onIonChange={this.inputChangeHandler} required type='email' value={this.state.authForm.email}></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput id='password' onIonChange={this.inputChangeHandler} required type='password' value={this.state.authForm.password}></IonInput>
              </IonItem>

              <IonButton type='submit' expand="block" fill="clear" color='primary'>Login</IonButton>
              <IonText className='ion-text-center' color='danger'>{this.props.error}</IonText>
              {/* <IonText>New user ? click here </IonText> */}

            </IonList>
            <IonLoading isOpen={this.props.loading} />
          </form>
        </IonContent>
      </IonPage>
    );
  }

};

const mapStateToProps = state => {
  return {
    loading: state.globalState.loading,
    isLoggedIn: state.globalState.isLoggedIn,
    error: state.globalState.error,

  };

}
const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: (email, password, isSignUp) => dispatch(authAction.authenticate(email, password, isSignUp))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
