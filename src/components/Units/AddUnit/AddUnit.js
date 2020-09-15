
import React, { Component } from 'react';
import { IonLoading, IonText, } from '@ionic/react';
import { IonItem, IonList, IonLabel, IonInput, IonButton } from '@ionic/react'



class AddUnit extends Component {

    render() {

        return (
            <form onSubmit={this.props.createUnitFormHandler}>
                <IonList>

                    <IonItem>
                        <IonLabel position="floating">Unit Name</IonLabel>
                        <IonInput id='unitName' onIonChange={this.props.inputChangeHandler} required type='text' value={this.props.state.unitForm.unitName}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Unit Code</IonLabel>
                        <IonInput id='unitCode' onIonChange={this.props.inputChangeHandler} required type='text' value={this.props.state.unitForm.unitCode}></IonInput>
                    </IonItem>

                    <IonButton type='submit' expand="block" fill="clear" color='primary'>Create Unit</IonButton>
                    <IonText className='ion-text-center' color='danger'>{this.props.error}</IonText>
                </IonList>
                <IonLoading isOpen={this.props.displayLoading} />
            </form>

        );
    }

};

// const mapStateToProps = state => {
//     return {
//         loading: state.globalState.loading,
//     };
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         onSetLoading: () => dispatch(loadingAction.setLoading())
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(AddUnit);
export default AddUnit;
