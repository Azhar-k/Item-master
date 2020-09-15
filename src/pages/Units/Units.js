
import React, { Component } from 'react';
import './Units.css';
import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonIcon, IonModal, IonList, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, } from '@ionic/react';
import { connect } from 'react-redux';
import * as loadingAction from '../../store/actions/loading'
import { firestore } from '../../FireBaseServices'
import AddUnit from '../../components/Units/AddUnit/AddUnit';
import { add as addIcon } from 'ionicons/icons'
import Spinner from '../../components/Spinner/Spinner';

class Units extends Component {

  state = {
    unitForm: {
      unitName: '',
      unitCode: '',
    },
    showModal: false,
    unitList: [],
    unitsFetching: false,
    errorOnAdding: null,
  }

  componentDidMount = () => {

    console.log("units : component did mount")
    this.loadUnitList();
  }

  loadUnitList = () => {
    this.setState({ unitsFetching: true });
    const fetechedUnitList = [];
    const unitsRef = firestore.collection('Units');
    unitsRef.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {


        const fetechedUnit = {
          unitId: doc.id,
          unitName: doc.data().unitName,
          unitCode: doc.data().unitCode,
        }
        fetechedUnitList.push(fetechedUnit);
      })
      this.setState({
        unitList: fetechedUnitList
      })
      this.setState({ unitsFetching: false });

    }).catch(error => {
      this.setState({ unitsFetching: false });
    })
    
  }


  inputChangeHandler = (event) => {
    const key = event.target.id;
    let value = event.target.value;

    let updatedForm = { ...this.state.unitForm }
    updatedForm[key] = value;

    this.setState({ unitForm: updatedForm })

  }

  createUnitFormHandler = (event) => {
    this.props.onSetLoading();
    event.preventDefault();
    const unitsRef = firestore.collection('Units');
    const unit = this.state.unitForm;
    unitsRef.add(unit).then((response) => {
      this.loadUnitList(); //reload units list after adding a unit
      this.changeModalState(false);
      this.resetUnitsForm();
      this.props.onSetLoading();
      
    }).catch(error => {
      this.props.onSetLoading();
      this.setState({ errorOnAdding: error })
    });


  }
  resetUnitsForm = () => {
    this.setState({
      unitForm: {
        unitName: '',
        unitCode: '',
      },
    })
  }

  changeModalState = (status) => {
    const updatedModalState = status;
    this.setState({ showModal: updatedModalState })
  }

  setUnitsView = () => {
    //let units = <p className='ion-text-center'>Please wait...</p>
    let units = <Spinner count='4' />
    if (!this.state.unitsFetching) {
      units = (
        <IonList>

          {
            this.state.unitList.map(unit => {
              return (

                <IonCard key={unit.unitId}>
                  <IonCardHeader>
                    <IonCardTitle>{unit.unitName}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonCardSubtitle>{unit.unitCode}</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>


              )
            })
          }
        </IonList>
      )
    }

    return units;
  }

  render() {


    const units = this.setUnitsView();
    return (
      <IonPage className='align-items-center'>
        <IonHeader></IonHeader>

        <IonContent className='ion-padding ' fullscreen>

          {units}

          <IonModal
            isOpen={this.state.showModal}
            cssClass='my-custom-class'
            onDidDismiss={()=>this.changeModalState(false)}>

            <AddUnit
              createUnitFormHandler={this.createUnitFormHandler}
              inputChangeHandler={this.inputChangeHandler}
              state={this.state}
              displayLoading={this.props.loading}
              error={this.state.errorOnAdding}
            />

          </IonModal>



          <IonFab slot='fixed' vertical='bottom' horizontal="end">
            <IonFabButton onClick={()=>this.changeModalState(true)}>
              <IonIcon icon={addIcon} />
            </IonFabButton>
          </IonFab>


        </IonContent>
      </IonPage>
    );
  }

};

const mapStateToProps = state => {
  return {
    loading: state.globalState.loading,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onSetLoading: () => dispatch(loadingAction.setLoading())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Units);
