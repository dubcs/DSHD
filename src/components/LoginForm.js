import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged,
        passwordChanged,
        loginUser,
        authState,
        } from '../actions';
import { KeyboardAvoidingView } from 'react-native';
import {Button, Input} from 'react-native-elements';
import { Card } from './Card';
import { CardSection } from './CardSection';
import { Spinner } from './Spinner';
import { DshdLogoPage } from './DshdLogoPage';

const DELISH_IMAGE = require('../images/noDSHD.png')

class LoginForm extends Component {

state = {
  forgotPassword:false,
  loading:true,
}

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
     return {

     };
   };

componentDidMount() {
  this.props.authState();

}
componentWillReceiveProps(nextProps){
  if(nextProps.isLoggedin){
      this.props.navigation.navigate('second');
    } else {
       this.setState({loading: false});
    }
}
onEmailChange(text) {
  this.props.emailChanged(text);
}
onPasswordChange(text) {
   this.props.passwordChanged(text);
}
onButtonPress() {
  const { email, password } = this.props;
  this.props.loginUser({ email, password });
}
onCreateButtonPress(){
   this.props.navigation.navigate('CreateUser');
}
onForgotButtonPress(){
   console.log('forgot button');
   this.setState({forgotPassword:true});

}
onForgotGoBackButtonPress(){
  this.setState({forgotPassword:false});
}
onEmailEnteredButtonPress(){
  var auth = firebase.auth();
  console.log(this.props.email);
  auth.sendPasswordResetEmail(this.props.email).then(() => {
    this.setState({forgotPassword:false});

 }).catch((error) => {
    console.log("an error occurred");
 });
}
render(){
  if(this.props.loading){
    return (
      <View style={{flex:1 , justifyContent:'center', alignItems:'center',backgroundColor:'rgba(92, 99,216, 1)'}}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <View style={{flex:1, backgroundColor:'silver'}}>
    {this._loadScreen()}
    </View>
  );
}
renderButton() {
if (this.state.forgotPassword){
  return (
    <Button
      title="Send password reset email"
      titleStyle = {{color:'silver'}}
      buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
      containerStyle={{padding:5,paddingTop:20, alignSelf:'stretch'}}
      onPress={this.onEmailEnteredButtonPress.bind(this)}
    />
  );

}
return (
   <Button
     title="Login"
     titleStyle = {{color:'silver'}}
     buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
     containerStyle={{padding:5,paddingTop:20, alignSelf:'stretch'}}
     onPress={this.onButtonPress.bind(this)}
   />
 );
}

_loadScreen = () => {
if (this.state.forgotPassword){
  return (
    <KeyboardAvoidingView style={styles.container}
      behavior="padding"
      >
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
        value={this.props.email}
        onChangeText={this.onEmailChange.bind(this)}
      />
      </CardSection>
      {this.renderButton()}
      <Text style={styles.errorStyle}>
      there was a problem with your login
      </Text>
      <Button
        title="go back"
        titleStyle = {{color:'silver', fontSize:12}}
        buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
        containerStyle={{padding:20, alignSelf:'center'}}
        onPress={this.onForgotGoBackButtonPress.bind(this)}
      />
      </KeyboardAvoidingView>
  );
}
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
    value={this.props.email}
    onChangeText={this.onEmailChange.bind(this)}
    />
    </CardSection>

    <CardSection>
    <Input
      secureEntry
      placeholder="password"
      value={this.props.password}
      onChangeText={this.onPasswordChange.bind(this)}
    />
    </CardSection>

        {this.renderButton()}
        <Text style={styles.errorStyle}>
        {this.props.error}
        </Text>
         <Button
             title="Create an Account"
             titleStyle = {{color:'silver'}}
             buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
             containerStyle={{padding:5, alignSelf:'stretch'}}
             onPress={this.onCreateButtonPress.bind(this)}
         />
         <Button
           title="forgot password"
           titleStyle = {{color:'silver', fontSize:12}}
           buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
           containerStyle={{padding:20, alignSelf:'center'}}
           onPress={this.onForgotButtonPress.bind(this)}
         />
    </View>
  );
}

}
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    isLoggedin: state.auth.isLoggedin,
    user: state.auth.user

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
   paddingTop: 10,
   backgroundColor:'silver'
 },

};
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser,authState })(LoginForm);
