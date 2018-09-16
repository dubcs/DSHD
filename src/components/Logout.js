import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { CardSection } from './CardSection';
import { RestButton } from './RestButton';


class Logout extends Component {
onSaveButtonPress() {
  this.props.logout();
}
  render() {
    return (
      <View>
        <CardSection>
          <Text>Are you sure you want to logout? </Text>
        </CardSection>
        <CardSection>
          <RestButton
            onPress={this.onSaveButtonPress.bind(this)}>
            Logout
           </RestButton>
        </CardSection>
      </View>
    );
  }
}

export default connect(null, { logout })(Logout);
