import firebase from 'firebase';
import _ from 'lodash';
import React, { Component } from 'react';
import { Text,
          View,
          FlatList,
          Image,
          Slider,
          ActivityIndicator } from 'react-native';
import { Avatar, Card,ListItem, Button, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchFriendsLikes, loadMore } from '../actions';
import { CardSection } from './CardSection';
import Icon from 'react-native-vector-icons/FontAwesome';
import FadeIn from 'react-native-fade-in-image';

const DELISH_IMAGE = require('../images/noDSHD.png')

class FriendsLikes extends Component {
  state = {
    loading: false,
    indexOfLast:0,
    isVisible: false,
    item:{},
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
  componentWillMount() {
    this.setState({loading:true, indexOfLast:0});
    const keys = this.props.navigation.state.params;
    this.props.fetchFriendsLikes(keys, this.state.indexOfLast);
    setTimeout(() => this.setState({loading:false, indexOfLast:this.state.indexOfLast+10}), 1000);
  }
   renderFlatListItem(item) {
     return (
       <View style={{flex:1}}>

        <ListItem
          onPress={this.onDishPress.bind(this, item)}
          title={item.dishname}

          leftElement={
            <Image
                 style={styles.imageStyle}
                 source={{ uri: item.picURL}}
                 resizeMode='contain'
                 resizeMethod='resize'
            />
          }
          scaleProps={{
            friction: 90,
            tension: 100,
            activeScale: 0.95,
          }}
          containerStyle={{backgroundColor:'rgba(92, 99,216, 1)',borderColor:'silver', borderTopWidth:2}}
          titleStyle={{ color: 'silver', fontWeight: 'bold' }}
          subtitleStyle={{ color: 'silver' }}
          rightElement={
            <Button
              title="Enlarge"
              titleStyle = {{color:'rgba(92, 99,216, 1)', fontSize:12}}
              buttonStyle = {{backgroundColor: 'silver', borderRadius:30}}
              containerStyle={{padding:5, alignSelf:'center'}}
              onPress={()=> this.setState({isVisible:true, loading: true ,picURL:item.picURL})}
            />
          }
        />
        </View>
     )
   }
  render() {

    return (

      <View>

        <FlatList
          data={this.props.friendsLikes}
          renderItem={({item}) => this.renderFlatListItem(item)}
          keyExtractor={item => item.key}
          extraData={this.state}
          refreshing={this.state.loading}
          onRefresh={this._onRefresh}
          ListFooterComponent={this.renderFooter}
          initialNumToRender={10}
        />
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({isVisible: false, loading:false})}
          width={375}
          height={375}
        >
        <View style={{alignItems:'center'}}>
        <FadeIn>
        <Image
          style={{height:350, width:350, alignSelf: 'center'}}
          source={{ uri: this.state.picURL }}
          resizeMode='contain'
          resizeMethod='resize'
          />
        </FadeIn>

        </View>
        </Overlay>
      </View>
    );
  };
  renderFooter = () => {
  if (this.props.friendsLikes.length > 9){
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
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
        borderTopWidth: 1,
        borderColor: "#CED0CE"
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
renderHeader = () => {
if (!this.state.loading) return null;

return (
  <View
    style={{
      paddingVertical: 20,
      borderTopWidth: 1,
      borderColor: "#CED0CE"
    }}
  >
    <ActivityIndicator animating size="large" />
  </View>
);
};
loadMore() {
  console.log('loadMore');
  if(!this.state.loading){
    const keys = this.props.navigation.state.params;
    this.setState({loading:true});
    this.props.loadMore(keys, this.state.indexOfLast);
    setTimeout(() => this.setState({loading:false, indexOfLast:this.state.indexOfLast+10}), 1000);
  }
};
reload() {
  if(!this.state.loading){
    const keys = this.props.navigation.state.params;
    this.setState({loading:true, indexOfLast:0});
    this.props.fetchFriendsLikes(keys, 0);
    setTimeout(() => this.setState({loading:false, indexOfLast:this.state.indexOfLast+10}), 1000);
  }
};
  _onRefresh = () => {
    this.setState({loading:true});
    const keys = this.props.navigation.state.params;
    this.props.fetchFriendsLikes(keys);
    setTimeout(() => this.setState({loading:false}), 1000);
  }
  async onDishPress(item ){
    this.props.navigation.navigate('DshdDetails', item);
  }
  press = (item) => {
    this.setState({isVisible:true, item: item});
  }
};


const mapStateToProps = state => {
var friendsLikes = [];
var objectArray = _.values(state.friendsLikes)
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
friendsLikes.push({
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
return {friendsLikes};
};
const styles = {
  imageStyle: {
    height: 100,
    width:100,
    flex: 1,
  },
};


export default connect(mapStateToProps, { fetchFriendsLikes, loadMore })(FriendsLikes);
