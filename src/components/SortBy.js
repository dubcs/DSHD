import React, { Component } from 'react';
import { Text, View} from 'react-native';
import { CardSection } from './CardSection';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';


class SortBy extends Component {
state = {
  rat:false,
}


async componentWillMount(){
  if(this.props.navigation.state.params.onGoBack2) {
    await this.props.navigation.state.params.onGoBack2(this.state.rat);
  }
}
render(){
    return (
      <View style={styles.viewStyle}>
        <Button

          icon={
            <Icon
              name='arrow-left'
              size={15}
              color='silver'
            />
          }
          titleStyle = {{color:'silver'}}
          buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
          title='Sort by highest Rating'
          containerStyle={{padding:5}}
          onPress={this.ratingButton.bind(this)}
        />

        <Button
          title='Sort by highest Number of Rates'
          icon={
            <Icon

              name='arrow-left'
              size={15}
              color='silver'
            />
          }
          titleStyle = {{color:'silver'}}
          buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
          containerStyle={{padding:5}}
          onPress={this.ratesButton.bind(this)}
        />

      </View>
    );
  }
async ratesButton(){
  await this.setState({rat:true});
  if(this.props.navigation.state.params.onGoBack2) {
    await this.props.navigation.state.params.onGoBack2(this.state.rat);
  }
    this.props.navigation.goBack();
  }
async ratingButton(){
  await this.setState({rat:false});
  if(this.props.navigation.state.params.onGoBack2) {
    await this.props.navigation.state.params.onGoBack2(this.state.rat);
  }
    this.props.navigation.goBack();
  }
}
export default connect(null,{})(SortBy);

const styles = {
  viewStyle: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'silver',
  },

};
