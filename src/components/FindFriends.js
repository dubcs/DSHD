import firebase from 'firebase';
import _ from 'lodash';
import React, { Component } from 'react';
import { Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar,
  Button,
  Card,
  ListItem,
  SearchBar,
} from 'react-native-elements';
import { findPossibleFriends, friendSearcher } from '../actions';
import { CardSection } from './CardSection';
import { RestButton } from './RestButton';

const DELISH_IMAGE = require('../images/noDSHD.png')

class FindFriends extends Component {
state = {
  searchText:'',
  friendLoading:false,
};

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
componentWillMount() {
  this.setState({friendLoading:true})
  this.props.findPossibleFriends();
  setTimeout(() => this.setState({friendLoading:false}), 1000);
}
onItemPress(item) {
  this.props.navigation.navigate('Follow', item );
}
async searchCancel() {
  await this.setState({searchText: '', friendLoading:true});
  this.props.findPossibleFriends();
  setTimeout(() => this.setState({friendLoading:false}), 1000);
}

async searchClear() {
  await this.setState({searchText: '', friendLoading:true});
  await this.setState({searchText: ''});
  this.props.findPossibleFriends();
  setTimeout(() => this.setState({friendLoading:false}), 1000);
}
async searchText(text) {
  await this.setState({searchText:text});
  const searches = this.state.searchText;
  await this.props.friendSearcher(searches,this.props.findFriends);
}

renderFlatListItem(item) {
  return (
    <ListItem
      onPress={this.onItemPress.bind(this, item)}
      roundAvatar
      rightIcon={{name: 'pageview'}}
      title={item.username}
      subtitle={item.firstname}
      leftAvatar={{ rounded: true ,source: { uri: item.avatarURL} }}
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
    const { currentUser } = firebase.auth();
    if (this.state.friendLoading){
      return (
        <View style={{ flex: 1 , alignSelf: 'stretch', justifyContent: 'center', backgroundColor:'silver'}}>
          <ActivityIndicator
            size='large'
            color='rgba(92, 99,216, 1)'
          />
          <Text style={{backgroundColor:'silver', color:"rgba(92, 99,216, 1)", fontSize:20, alignSelf:'center'}}>Finding some Friends!</Text>
        </View>
      );
    }
    return (
      <View>
      <SearchBar
        lightTheme
        round
        clearIcon
        containerStyle={{backgroundColor:'white'}}
        onChangeText={this.searchText.bind(this)}
        platform={'ios' || 'android'}
        onCancel={this.searchCancel.bind(this)}
        onClear={this.searchClear.bind(this)}
        placeholder='Type Here...' />
      <CardSection>
     <Text style={{fontSize:20, fontWeight:'bold'}}>Who do you want to follow?</Text>
      </CardSection>

    <FlatList
        data={this.props.findFriends}
        renderItem={({item}) => this.renderFlatListItem(item)}
        keyExtractor={item => item.uid }
        //initialNumToRender={8}
      />
</View>

    );
  }
}

const mapStateToProps = state => {

    var findFriends = [];
    var objectArray = _.values(state.findFriends);
    objectArray = _.flatten(objectArray);
      objectArray.map((friend) => {
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
          lastname
        } = friend;

    findFriends.push({avatarURL,
      username,
      followers,
      following,
      saved,
      lastRated,
      likesCount,
      likes,
      uid,
      firstname,
      lastname
      });
    });
    return {findFriends};

};
export default connect(mapStateToProps, {findPossibleFriends, friendSearcher})(FindFriends);
