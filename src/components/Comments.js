import firebase from 'firebase';
import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, FlatList, Image, Slider, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ParsedText from 'react-native-parsed-text';
import { getComments } from '../actions';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Card } from './Card';
import { RestButton } from './RestButton';
import { Input } from './Input';

class Comments extends Component {
  componentWillMount() {

    const key = this.props.navigation.state.params.key;;
    //console.log(key);
    this.props.getComments({key});
  }
  handleHashtag(hash){
    console.log('hash');
  }
   renderFlatListItem(item) {
     return (
       <View >
          <CardSection>
            <Text>{item.displayName}
            </Text>
            <ParsedText
              parse={
                [
                  {pattern: /#(\w+)/,  style: styles.hashTag, onPress: this.handleHashtag.bind(this)},
                ]
              }
            > : {item.text}
            </ParsedText>
          </CardSection>
       </View>
     )
   }
  render() {
    //console.log(this.props.comment);
    return (
      <View>

      <FlatList
        data={this.props.comment}
        renderItem={({item}) => this.renderFlatListItem(item)}
        keyExtractor={(item, index) => (item.text+item.commentKey)}
      />
      </View>
    );
  }
}


const mapStateToProps = state => {
var comment = [];
var objectArray = _.values(state.comment)
//console.log(objectArray);
//  objectArray.map((comments) => {
  //  const { displayName,
//      text
  //  } = comments;
//  comment = _.concat(comment,{
//    displayName,
//    text
//  });
comment = _.concat(comment, objectArray);

//});
//console.log({comment});
return {comment};
};

const styles= StyleSheet.create({
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  hashTag:{
    color: 'blue',
    textDecorationLine: 'underline',
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
    height: 300,
    flex: 1,
    width: null
  },
  sliderStyle: {
    borderColor: '#73fa79',
    flex: 1,
    width: null,
    marginLeft: 10,
    marginRight: 10
  }
});

export default connect(mapStateToProps, { getComments })(Comments);
