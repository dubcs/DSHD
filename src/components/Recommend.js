import React, { Component} from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import _ from 'lodash';
import { Avatar, Card, ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import { CardSection } from './CardSection';
import { RecommendDish, SaveRecommendation } from '../actions';
import { RestButton } from './RestButton';
import { Input } from './Input';
import { HeaderButton } from './HeaderButton';
import  FriendsLikes  from './FriendsLikes';

class Recommend extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

     return {
       headerTitle: "Recommendation",
     };
   };

  render() {
    return (
      <View>
      <Card>
        <Text style={{fontSize:17}} >Who would you like to recommend this dish to?</Text>
      </Card>
        <FlatList
            data={this.props.recommend}
            renderItem={({item}) => this.renderFlatListItem(item)}
            keyExtractor={item => item.uid}
            //horizontal={true}
          />
      </View>
    );
  };
  onUserPress(uid){
    console.log(this.props);
    const key = this.props.navigation.state.params.key;
    this.props.SaveRecommendation(key, uid);

  }
  renderFlatListItem(item) {
    return (
      <Card>
        <ListItem
          onPress={this.onUserPress.bind(this, item.uid)}
          roundAvatar
          title={item.username}
          avatar={{uri: item.avatarURL}}
        />
      </Card>
    )
  }
componentWillMount(){
  this.props.RecommendDish();
}
};
const mapStateToProps = state => {
var recommend = [];
var objectArray = _.values(state.recommend)
objectArray = _.flatten(objectArray);
  objectArray.map((info) => {
    const { avatarURL,
      username,
      followers,
      following,
      saved,
      lastRated,
      likesCount,
      likes,
      uid

    } = info;
recommend.push({avatarURL,
  username,
   followers,
   following,
   saved,
   lastRated,
   likesCount,

   likes,
   uid
  });
});
//console.log({posts});
return {recommend};
};


export default connect(mapStateToProps, {RecommendDish, SaveRecommendation})(Recommend);
