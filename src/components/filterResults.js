import React, { Component } from 'react';
import { Text, Picker, View } from 'react-native';
import { connect } from 'react-redux';
import { filterUpdate } from '../actions';
import { Card } from './Card';
import { CardSection } from './CardSection';
import { RestButton } from './RestButton';


class filterResults extends Component {
onSaveButtonPress(item) {
//  console.log(item);
  Actions.DshdList(item);

}
  render() {
    return (
      <View>
        <CardSection>
          <Text>How many miles out would you like to search? </Text>
        </CardSection>
        <CardSection>
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.props.radius}
            onValueChange={miles => this.props.filterUpdate({ prop: 'radius', value: miles })}
          >
              <Picker.Item label="1 mile" value='1' />
              <Picker.Item label="5 miles" value='5' />
              <Picker.Item label="10 miles" value='10' />
              <Picker.Item label="20 miles" value='20' />
          </Picker>
        </CardSection>
        <CardSection>
          <RestButton
            onPress={this.onSaveButtonPress.bind(this, this.props.radius )}>
           Save
           </RestButton>
        </CardSection>
      </View>
    );
  }



}
const mapStateToProps = (state) => {
  const { radius } = state.filter;
  return { radius };
};

export default connect(mapStateToProps, { filterUpdate })(filterResults);
