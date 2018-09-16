import firebase from 'firebase';
import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, FlatList, Image, Slider } from 'react-native';
import {Avatar} from 'react-native-elements';
import { connect } from 'react-redux';
import { getUserImages } from '../actions';

import { CardSection } from './CardSection';
import { Button } from './Button';
import { Card } from './Card';
import { RestButton } from './RestButton';
import { Input } from './Input';

class UserImages extends Component {
  componentWillMount() {
    const key = this.props.navigation.state.params.key;;
    this.props.getUserImages({key});
  }
   renderFlatListItem(item) {
     return (
       <View >
          <CardSection>
          <Image
               style={styles.imageStyle}
               source={{ uri: item.url}}
          />
          </CardSection>
       </View>
     )
   }
  render() {
    return (
      <View>

      <FlatList
        data={this.props.userImage}
        renderItem={({item}) => this.renderFlatListItem(item)}
        keyExtractor={item => item.url}
        horizontal={true}
      />
      </View>
    );
  }
}


const mapStateToProps = state => {
var userImage = [];
var objectArray = _.values(state.userImage);
//console.log(objectArray);
//  objectArray.map((comments) => {
  //  const { displayName,
//      text
  //  } = comments;
//  comment = _.concat(comment,{
//    displayName,
//    text
//  });
userImage = _.concat(userImage, objectArray);

//});
//console.log({comment});
return {userImage};
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 200,
    width:190
  },
  sliderStyle: {
    borderColor: '#73fa79',
    flex: 1,
    width: null,
    marginLeft: 10,
    marginRight: 10
  }
};

export default connect(mapStateToProps, { getUserImages })(UserImages);
