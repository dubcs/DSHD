import React, { Component} from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import firebase from 'firebase';
import { Avatar, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { CardSection } from './CardSection';
import { Card } from './Card';
import { getAvatarPhotos,
        userEmailChanged,
        userPasswordChanged,
        userUsernameChanged,
        updateUserProfile,
        firstNameChanged,
        lastNameChanged,
        isContributor,
      } from '../actions';
import { Input} from './Input';
import { HeaderButton } from './HeaderButton';
import Icon from 'react-native-vector-icons/FontAwesome';


const DELISH_IMAGE = require('../images/noDSHD.png')

class UserSettings extends Component {

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

     return {
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
       headerRight: (
         <HeaderButton
          onPress={params.modalMap}
         > logout </HeaderButton>
       ),
     };
   };

componentWillMount(){
    this.props.navigation.setParams({ modalMap: this._modalMap });
    this.props.isContributor();
}
_modalMap = () => {
  Alert.alert(
 'Warning',
 'Are You sure you want to logout?',
 [
   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'),},
   {text: 'OK', onPress: () =>this.onLogoutOk()},
 ],
 { cancelable: false }
)
};
onLogoutOk = () => {
  firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('First');
    }).catch((error) => {
 // An error happened.
  });
}
  render() {
    return (
      <View style={{ flex: 1,
        backgroundColor:'silver' }}>

          <CardSection>
          <Input
            placeholder="Change Username?"
            label='username'
            value={this.props.username}
            onChangeText={this.onUsernameChange.bind(this)}
          />
          </CardSection>
          <CardSection>
          <Input
            placeholder="Change Password?"
            label='password'
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
          />
        </CardSection>
        <CardSection>
        <Input
          placeholder="Change Email?"
          label='email'
          value={this.props.email}
          onChangeText={this.onEmailChange.bind(this)}
        />
        </CardSection>
        <CardSection>
        <Input
          placeholder="Change First Name?"
          label='First Name'
          value={this.props.firstname}
          onChangeText={this.onFirstnameChange.bind(this)}
        />
        </CardSection>
        <CardSection>
        <Input
          placeholder="Change Last Name?"
          label='Last Name'
          value={this.props.lastname}
          onChangeText={this.onLastnameChange.bind(this)}
        />
        </CardSection>

<View style={{flex:1, backgroundColor:'silver'}}>
        <Button
          title='Save Changes'
          titleStyle = {{color:'silver'}}
          buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)',borderRadius:30, height: 40}}
          containerStyle={{padding:5, alignSelf:'stretch'}}
          onPress={this.onSavePress.bind(this)}
        />
        <Button
          title="Add an Avatar"
          titleStyle = {{color:'silver'}}
          buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30, height: 40}}
          containerStyle={{padding:5, alignSelf:'stretch'}}
          onPress={this.onAvatarPress.bind(this)}
        />
        {this.contributor()}
</View>
      </View>
    );
  };
  contributor(){
    if (this.props.contributor) {
      return(
      <Button
        title="Add a Post"
        titleStyle = {{color:'silver'}}
        buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30, height: 40}}
        containerStyle={{padding:5, alignSelf:'stretch'}}
        onPress={this.onAddPostPress.bind(this)}
      />
    );
    }
  }
  onAddPostPress(){
    this.props.navigation.navigate('Contribute');
  }
  onSavePress(){
    const { email, password, username, firstname, lastname } = this.props;
    this.props.updateUserProfile({ email, password, username, firstname, lastname});
  }
  onEmailChange(text) {
    this.props.userEmailChanged(text);
  }
  onPasswordChange(text) {
     this.props.userPasswordChanged(text);
  }
  onUsernameChange(text) {
     this.props.userUsernameChanged(text);
  }
  onFirstnameChange(text) {
     this.props.firstNameChanged(text);
  }
  onLastnameChange(text) {
     this.props.lastNameChanged(text);
  }
  onAvatarPress(){
    this.props.getAvatarPhotos();
  }
};
const mapStateToProps = state => {
    return {
      email: state.setting.email,
      password: state.setting.password,
      username: state.setting.username,
      lastname: state.setting.lastname,
      firstname: state.setting.firstname,
      contributor: state.setting.contributor,
    };
  };

export default connect(mapStateToProps,
{
  getAvatarPhotos,
  userUsernameChanged,
  userPasswordChanged,
  userEmailChanged,
  updateUserProfile,
  firstNameChanged,
  lastNameChanged,
  isContributor
})
(UserSettings);
