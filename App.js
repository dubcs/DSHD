import React, { Component } from 'react';
import { View, Alert, Platform } from 'react-native';
import expo from 'expo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';
import * as firebase from 'firebase';
import reducers from './src/reducers';
import { MainStack } from './src/router';
import { StackNavigator ,  TabNavigator } from 'react-navigation';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default class dshdReact extends Component {
state = { loggedIn: null };

componentWillMount() {
  firebase.initializeApp({
     apiKey: 'AIzaSyBlwU5mR-S1Iuu-e2SVSVm70x9r2Yb7HW4',
     authDomain: 'dshd-53cf8.firebaseapp.com',
     databaseURL: 'https://dshd-53cf8.firebaseio.com',
     projectId: 'dshd-53cf8',
     storageBucket: 'dshd-53cf8.appspot.com',
     messagingSenderId: '251505718012'
  });
  this.getLocationAsync();


}
async getLocationAsync() {
  const { Location, Permissions } = Expo;

  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === 'granted') {
    this.getCameraAsync();
  } else {
    Alert.alert(
  'Warning',
  'This app will not function without your Location permission! Please fix in settings',
  [
    {text: 'OK', onPress: () => console.log("first if")},
  ],
  { cancelable: false }
)
  }
}
async getCameraAsync() {
  const { Permissions } = Expo;
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  if (status === 'granted') {
    if(Platform.OS !== 'android'){
    this.getCameraRollAsync();
  }
    return;
  } else {
    Alert.alert(
  'Warning',
  'This app will not function without your Camera permission! Please fix in settings',
  [
    {text: 'OK', onPress: () => console.log("second if") },
  ],
  { cancelable: false }
)
  }
}
async getCameraRollAsync() {
  const { Permissions } = Expo;
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === 'granted') {
    return;
  } else {
    Alert.alert(
  'Warning',
  'This app will not function without your CAMERA ROLL permission! Please fix in settings',
  [
    {text: 'OK', onPress: () => console.log("third if")},
  ],
  { cancelable: false }
)
  }
}

  render() {
    return (

      <Provider store={(store)}>
      <View style={{ flex: 1 }}>
        <MainStack />
      </View>
      </Provider>
    );
  }
}
