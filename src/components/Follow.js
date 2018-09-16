import firebase from 'firebase';
import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, FlatList, Image, Slider } from 'react-native';
import { Avatar, Card,ListItem, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchFollowUser, followUser, unFollowUser } from '../actions';
import { CardSection } from './CardSection';

const DELISH_IMAGE = require('../images/noDSHD.png');

class Follow extends Component {

  state = {
    toggle: false,
  }

  static navigationOptions = ({navigation}) => {
      const params = navigation.state.params || {};

       return {
         headerStyle: {
           backgroundColor: 'rgba(92, 99,216, 1)',
         },
         headerBackTitleStyle:{
           color:'silver',
         },
         headerTitleStyle:{
           color:'silver'
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
       };
  };


async componentWillMount() {
  const keys = this.props.navigation.state.params
  if(keys.followers){
    await this.setState({ toggle: keys.followers[firebase.auth().currentUser.uid]});
  } else {
    await this.setState({toggle: false});
  }
  this.props.fetchFollowUser(keys);
  }
   renderFlatListItem(item) {
     return (
        <ListItem
          title={item.dishname}
          leftAvatar={{ rounded: false ,source: { uri: item.picURL} }}
          scaleProps={{
            friction: 90,
            tension: 100,
            activeScale: 0.95,
          }}
          containerStyle={{backgroundColor:'rgba(92, 99,216, 1)'}}
          titleStyle={{ color: 'silver', fontWeight: 'bold' }}
          subtitleStyle={{ color: 'silver' }}
        />
     )
   }
  render() {
    const keys = this.props.navigation.state.params;
    return (
      <View>
      <CardSection>
      <Avatar
        large
        rounded
        source={{uri:keys.avatarURL }}
        activeOpacity={0.7}
      />
      <Text> Name: </Text>
      <Text style={{fontSize:20, fontWeight:'bold'}}> {keys.firstname} </Text>
      <Text style={{fontSize:20, fontWeight:'bold'}}> {keys.lastname} </Text>
      </CardSection>
      {this.followButtonToggle(keys)}
        <FlatList
          data={this.props.follow}
          renderItem={({item}) => this.renderFlatListItem(item)}
          keyExtractor={(item, index) => item.key+index}

        />
      </View>
    );
  };
  followButtonToggle(keys){
    const uid = firebase.auth().currentUser.uid;
    if (this.state.toggle) {
      return (
            <Button
              title="UnFollow"
              titleStyle = {{color:'silver'}}
              buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
              containerStyle={{padding:5, alignSelf:'stretch'}}
              onPress={this.unFollowButtonPress.bind(this,keys.uid)}
            />
          );
    }
      return (
        <Button
          title="Follow"
          titleStyle = {{color:'rgba(92, 99,216, 1)'}}
          buttonStyle = {{backgroundColor: 'silver', borderRadius:30}}
          containerStyle={{padding:5, alignSelf:'stretch'}}
          onPress={this.followButtonPress.bind(this,keys.uid)}
        />
      );

  }
async followButtonPress(key) {
    this.props.followUser(key);
    await this.setState({toggle:true});
  }
async unFollowButtonPress(key) {
    this.props.unFollowUser(key);
    await this.setState({toggle:false});
  }
}


const mapStateToProps = state => {
var follow = [];
var objectArray = _.values(state.follow)
objectArray = _.flatten(objectArray);
  objectArray.map((like) => {
    const { dishname,
      restaurant,
      category,
      average,
      hatesCount,
      lastModified,
      likesCount,
      picURL,
      poster,
      key,
      postcomments,
      likes,
      latitude,
      longitude
    } = like;
follow.push({
  dishname,
  restaurant,
  category,
  average,
  hatesCount,
  lastModified,
  likesCount,
  picURL,
  poster,
  key,
  postcomments,
  likes,
  latitude,
  longitude
  });
});
//console.log({posts});
return {follow};
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

export default connect(mapStateToProps, { fetchFollowUser, followUser, unFollowUser })(Follow);
