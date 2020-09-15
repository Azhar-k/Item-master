import React, { Component } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonRouterOutlet, IonRoute } from '@ionic/react';
import { calendar, personCircle, map, informationCircle } from 'ionicons/icons';


class Tabs extends Component {
  render() {
    return (
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path='/tabs/:tab(home)' component={<Test/>} exact />
          <Route path='/tabs/:tab(test)' component={<Test/>} exact />
          
        </IonRouterOutlet>
        <IonTabs>
          <IonTabBar slot="top">
            <IonTabButton tab="home">
              <IonIcon icon={calendar} />
              <IonLabel>Schedule</IonLabel>
              <IonBadge>6</IonBadge>
            </IonTabButton>

            <IonTabButton tab="test">
              <IonIcon icon={personCircle} />
              <IonLabel>Speakers</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    );
  }
}

export default Tabs;