import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import DshdList from '../components/DshdList';
import UserDetails from './components/UserDetails';
import MapView1 from './components/MapView';

export default TabNavigator({
  Home: { screen: DshdList },
  Details: { screen: DshdDetails },
  Map: {screen: MapView1}
});
