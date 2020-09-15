import { IonContent, IonHeader, IonPage } from '@ionic/react';
import React,{Component} from 'react';
import './Home.css';

class Home extends Component {
  render(){
    return (
      <IonPage>
        <IonHeader>
          
        </IonHeader>
        <IonContent fullscreen>
          <h1>Home</h1>
        </IonContent>
      </IonPage>
    );
  }
  
};

export default Home;
