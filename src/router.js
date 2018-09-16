import React, { Component } from 'react';
import { StackNavigator ,  addNavigationHelpers, TabNavigator, SwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Image, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import LoginForm from './components/LoginForm';
import DshdList from './components/DshdList';
import filterResults from './components/filterResults';
import DshdDetails from './components/DshdDetails';
import GetImage from './components/GetImage';
import Logout from './components/Logout';
import CreateUser from './components/CreateUser';
import UserDetails from './components/UserDetails';
import UserDishDetails from './components/UserDishDetails';
import MapView1 from './components/MapView';
import UserSettings from './components/UserSettings';
import Friends from './components/friends';
import FriendsLikes from './components/FriendsLikes';
import FindFriends from  './components/FindFriends';
import Follow from './components/Follow';
import Recommend from './components/Recommend';
import SortBy from './components/SortBy';
import Contributor from './components/Contributor';
import {DshdLogoPage} from './components/DshdLogoPage';

const DELISH_IMAGE = require('./images/noDSHD.png')

export const Stack = StackNavigator({
  LoginForm: { screen: LoginForm },
    CreateUser: {
      screen: CreateUser,
      navigationOptions: {
      title: "CreateUser"
    }
  },
  LogoPage: {
    screen: DshdLogoPage,
    navigationOptions: {
    header: 'none'
  }
},
  Logout: {
      screen: Logout,
      navigationOptions: {
      title: "Logout"
    }
  },
},
{
  mode: 'modal',
  headerMode: 'none',
});
export const MacStack = StackNavigator({
    Dshd: { screen: DshdList},
    DshdDetails: { screen: DshdDetails },
    MapView1: { screen: MapView1},
    GetImage: {screen: GetImage},
    RecommendDish: {screen: Recommend},
    SortBy: {screen: SortBy},
});
export const UserStack = StackNavigator({
    User: {screen: UserDetails,
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'rgba(92, 99,216, 1)',
        },
        headerTitle:
        <View style={{flex:1, alignSelf:'center'}}>
         <Image
                 style={{
                   width:40,
                   height:40,
                   resizeMode: 'contain',
                   alignSelf:'center',
                 }}
                 source={DELISH_IMAGE}
            />
            </View>,
    }},
    DshdDetails: {screen: DshdDetails},
});
export const FriendStack = StackNavigator(
  {
    Friends: { screen: Friends },
    FriendsLikes: { screen: FriendsLikes,
      navigationOptions: {
      title: "Last Rated"
    }
  },
    FindFriends: { screen: FindFriends},
    Follow: { screen: Follow},
    DshdDetails: {screen: DshdDetails},
  },
);
export const SettingStack = StackNavigator({
    Settings: {screen: UserSettings,
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'rgba(92, 99,216, 1)',
        },
        headerTitle:
         <Image
                 style={{width:40, height:40}}
                 source={DELISH_IMAGE}
            />
    }},
    Contribute: {screen: Contributor}
});
export const Tabs = TabNavigator(
{
  Feed: {screen: MacStack},
  User: {screen:UserStack},
  Friends: {screen:FriendStack},
  Settings: {screen:SettingStack}
},
{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Feed') {
          iconName = `ios-pizza${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if (routeName === 'Friends') {
          iconName = `ios-people-outline`;
        } else if (routeName === 'User') {
          iconName = `ios-body-outline`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'rgba(92, 99,216, 1)',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white'
      },
    },

    showIcon: true,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
export const MainStack = SwitchNavigator({
  First: {screen: Stack},
  second: {screen: Tabs}
});


class Nav extends Component {
  render(){
    return (
      <MainStack navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
      })}
      />
    )
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation
});

export default connect(mapStateToProps)(Nav);
