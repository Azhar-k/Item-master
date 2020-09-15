import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet, } from '@ionic/react';

import Home from '../../pages/Home/Home';
import Units from '../../pages/Units/Units';
import {connect} from 'react-redux'


class AppTabs extends Component {

    render() {
        console.log("inside AppTab render")
        if(this.props.isLoggedIn===false){
            console.log("apptabs-->login redirected")
           return <Redirect to='/login'></Redirect>
        }
        return (
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/my/units" component={Units}></Route>
                    <Route exact path="/my" render={() => <Redirect to="/my/units" />} />
        
                </IonRouterOutlet>

                <IonTabBar slot="bottom">

                    <IonTabButton tab="units" href='/my/units' >
                        <IonLabel>Units</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="home" href='/my/units'>
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>


                </IonTabBar>

            </IonTabs>


        );
    }

}
const mapStateToProps = state => {
    return {
        loading: state.globalState.loading,
        isLoggedIn : state.globalState.isLoggedIn,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        //onSetLoading: () => dispatch(loadingAction.setLoading()),
        //onAuthStateCheck:()=>dispatch(authAction.authCheckState()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppTabs);
