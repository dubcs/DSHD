import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { createEmailChanged,
        createPasswordChanged,
        createUsernameChanged,
        saveUser,
        createFirstNameChanged,
        createLastNameChanged,
        } from '../actions';
import { Button } from 'react-native-elements';
import { Card } from './Card';
import { CardSection } from './CardSection';
import { Input } from './Input';
import { Spinner } from './Spinner';


const DELISH_IMAGE = require('../images/noDSHD.png')

class CreateUser extends Component {

onEmailChange(text) {
  this.props.createEmailChanged(text);
}
onPasswordChange(text) {
   this.props.createPasswordChanged(text);
}
onUsernameChange(text) {
   this.props.createUsernameChanged(text);
}
onFirstNameChange(text) {
  this.props.createFirstNameChanged(text);
}
onLastNameChange(text) {
  this.props.createLastNameChanged(text);
}
onButtonPress(){
 const { email, password, username, firstname, lastname } = this.props;
 this.props.saveUser({ email, password, username, firstname, lastname });
}
onBackButtonPress(){
  this.props.navigation.goBack();
}
render() {
  return (
  <View style={styles.container}>
  <Image
    source={DELISH_IMAGE}
    style={{alignSelf:'center',
    height:150,
    width:150,
    marginTop: 40,
    marginBottom: 20,
    }}
  />
    <CardSection>
      <Input
        placeholder="user@gmail.com"
        label="email"
        value={this.props.email}
        onChangeText={this.onEmailChange.bind(this)}
        />
    </CardSection>

    <CardSection>
      <Input
        secureEntry
        placeholder="password"
        label='password'
        value={this.props.password}
        onChangeText={this.onPasswordChange.bind(this)}
        />
    </CardSection>
    <CardSection>
        <Input
          placeholder="username"
          label='username'
          value={this.props.username}
          onChangeText={this.onUsernameChange.bind(this)}
          />
    </CardSection>
    <CardSection>
        <Input
          placeholder="First Name"
          label='firstname'
          value={this.props.firstname}
          onChangeText={this.onFirstNameChange.bind(this)}
          />
    </CardSection>
    <CardSection>
        <Input
          placeholder="Last Name"
          label='lastname'
          value={this.props.lastname}
          onChangeText={this.onLastNameChange.bind(this)}
          />
    </CardSection>

    <Text style={styles.errorStyle}>
      {this.props.error}
    </Text>

      <Button
        title="Submit"
        titleStyle = {{color:'silver'}}
        buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
        containerStyle={{padding:5,paddingTop:20, alignSelf:'stretch'}}
        onPress={this.onButtonPress.bind(this)}
      />
      <Button
        title="go back to Login"
        titleStyle = {{color:'silver', fontSize:12}}
        buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
        containerStyle={{padding:5,paddingTop:40, alignSelf:'center'}}
        onPress={this.onBackButtonPress.bind(this)}
      />
  </View>
  );
}
}
const mapStateToProps = state => {

  return {
    email: state.createUser.email,
    password: state.createUser.password,
    username: state.createUser.username,
    firstname: state.createUser.firstname,
    lastname: state.createUser.lastname,
    error: state.createUser.error
  };
};

const styles = {
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  container: {
   flex: 1,
   flexDirection: 'column',
   //justifyContent: 'center',
   paddingTop: 30,
   backgroundColor:'silver'
 },

};
export default connect(mapStateToProps, {
      createEmailChanged,
      createPasswordChanged,
      createUsernameChanged,
      saveUser,
      createFirstNameChanged,
      createLastNameChanged,
    })(CreateUser);
