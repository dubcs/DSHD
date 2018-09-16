import React, { Component} from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';
import { Avatar, Card, ListItem, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { CardSection } from './CardSection';
import { fetchFriends, fetchFriendsLikes } from '../actions';
import { RestButton } from './RestButton';
import { Input } from './Input';
import { HeaderButton } from './HeaderButton';
import  FriendsLikes  from './FriendsLikes';

const DELISH_IMAGE = require('../images/noDSHD.png')

class Friends extends Component {

  state = {
    loading: false,
    indexOfLast:0,
  }

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

     return {
       headerStyle: {
         backgroundColor: 'rgba(92, 99,216, 1)',
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
       headerRight: (
         <HeaderButton
          onPress={params.modalMap}
         > Find-a-Friend</HeaderButton>
       ),
       headerBackTitle:"Friends List",
     };
   };

   _modalMap = () => {
      this.props.navigation.navigate('FindFriends');
   };

   loadMore(){
     this.setState({loading:true});
     this.props.fetchFriends(this.state.indexOfLast);
     setTimeout(() => this.setState({loading:false, indexOfLast:this.state.indexOfLast+15}), 1000);
   }

   reload(){
     this.setState({loading:true});
     this.props.fetchFriends(0);
     setTimeout(() => this.setState({loading:false, indexOfLast:0}), 1000);
   }

   renderFooter = () => {
   if (this.props.friend.length === 15){
     return (
       <View
         style={{
           paddingVertical: 20,
           borderTopWidth: 5,
           borderWidth:5,
           borderColor: "white",

         }}
       >
       <Button
         title="Load more"
         iconRight={true}
         titleStyle = {{color:'silver'}}
         buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
         containerStyle={{padding:5, alignSelf:'stretch'}}
         onPress={this.loadMore.bind(this)}
       />
       </View>
     );
   }
   return (
     <View
       style={{
         paddingVertical: 20,
         borderTopWidth: 5,
         borderWidth:5,
         borderColor: "white",
       }}
     >
     <Button
       title="Reload"
       iconRight={true}
       titleStyle = {{color:'silver'}}
       buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
       containerStyle={{padding:5, alignSelf:'stretch'}}
       onPress={this.reload.bind(this)}
     />
     </View>
   );
   };
  render() {
    return (
      <View style={{backgroundColor: 'silver'}}>
            <Text style={{fontSize: 20,
              fontWeight: 'bold',
              borderWidth:2,
              backgroundColor:'white',
              borderColor:'rgba(92, 99,216, 1)',
              color:'rgba(92, 99,216, 1)'}}> What are your friends eating? </Text>
          <FlatList
            data={this.props.friend}
            renderItem={({item}) => this.renderFlatListItem(item)}
            keyExtractor={item => item.uid}
            extraData = {this.state}
            refreshing={this.state.loading}
            onRefresh={this._onRefresh}
            ListFooterComponent={this.renderFooter}
          />
      </View>
    );
  };
_onRefresh = () => {
  this.setState({loading:true});
  this.props.fetchFriends(0);
  setTimeout(() => this.setState({loading:false, indexOfLast: this.state.indexOfLast+15}), 1000);
}
  onUserPress(likes){
    this.props.navigation.navigate('FriendsLikes', likes);
  }

  renderFlatListItem(item) {
    return (
      <ListItem
        onPress={this.onUserPress.bind(this, item.likes)}
        roundAvatar
        title={item.username}
        subtitle={item.firstname+' '+item.lastname}
      //  avatar={{uri: item.avatarURL}}
        leftAvatar={{ rounded: true ,source: {uri: item.avatarURL}}}
        scaleProps={{
          friction: 90,
          tension: 100,
          activeScale: 0.95,
        }}
        containerStyle={{backgroundColor:'silver', borderColor: 'rgba(92, 99,216, 1)', borderWidth:2}}
        titleStyle={{ color:  'rgba(92, 99,216, 1)', fontWeight: 'bold' }}
    subtitleStyle={{ color:  'rgba(92, 99,216, 1)' }}
      />
    )
  }

componentDidMount(){
  this.setState({loading:true});
  this.props.navigation.setParams({ modalMap: this._modalMap });
  this.props.fetchFriends(0);
  setTimeout(() => this.setState({loading:false, indexOfLast:15}), 1000);
}
};
const mapStateToProps = state => {
var friend = [];
var objectArray = _.values(state.friend)
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
      uid,
      firstname,
      lastname,


    } = info;
friend.push({avatarURL,
  username,
   followers,
   following,
   saved,
   lastRated,
   likesCount,
   likes,
   uid,
   firstname,
   lastname,

  });
});
//console.log({posts});
return {friend};
};


export default connect(mapStateToProps, {fetchFriends, fetchFriendsLikes})(Friends);
