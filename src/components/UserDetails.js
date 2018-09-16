import firebase from 'firebase';
import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, FlatList, Image
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Button, Card, ListItem } from 'react-native-elements';
import { getRatedDishes,
        getSavedDishes,
        getRecommended,
        removeItem,
        removeSavedItem,
      } from '../actions';
import { CardSection } from './CardSection';
import { RestButton } from './RestButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const DELISH_IMAGE = require('../images/noDSHD.png');


class UserDetails extends Component {
  state = {
    loading : false,
    whichList : 'rated',
    indexOfLast:0,
  }
async componentDidMount() {
  this.setState({whichList:'rated', loading: true, indexOfLast:0})
  this.props.getRatedDishes(0);
  setTimeout(() => this.setState({loading:false, indexOfLast:15}), 1000);
}
onRatedButtonPress() {
  this.setState({whichList:'rated', loading: true})
  this.props.getRatedDishes(0);
  setTimeout(() => this.setState({loading:false, indexOfLast: this.state.indexOfLast+10}), 1000);
}
onSavedButtonPress() {
  this.setState({whichList:'saved', loading: true})
  this.props.getSavedDishes();
  setTimeout(() => this.setState({loading:false,indexOfLast:0}), 1000);
}
onRemoveButtonPress(item) {
  this.setState({whichList:'recommended', loading: true})
  this.props.removeItem(item, this.props.userDetails);
  setTimeout(() => this.setState({loading:false}), 1000);
}
onRemoveSavedButtonPress(item) {
  this.setState({loading: true});
  this.props.removeSavedItem(item, this.props.userDetails);
  setTimeout(() => this.setState({loading:false}), 1000);
}
onRecommendButtonPress() {
  this.setState({whichList:'recommended', loading: true})
  this.props.getRecommended();
  setTimeout(() => this.setState({loading:false, indexOfLast:0}), 1000);
}
onItemPress(item){
  this.props.navigation.navigate('DshdDetails', item)
}
_onRefresh = () => {
 this.setState({loading:true, whichList:'rated'});
 this.props.getRatedDishes();
  setTimeout(() => this.setState({loading:false}), 1000);
}
loadMore(){
  this.setState({loading:true});
  this.props.getRatedDishes( this.state.indexOfLast);
  setTimeout(() => this.setState({loading:false, indexOfLast:this.state.indexOfLast+10}), 1000);
}

reload(){
  this.setState({loading:true});
  this.props.getRatedDishes(0);
  setTimeout(() => this.setState({loading:false, indexOfLast:0}), 1000);
}

renderFlatListItem(item) {

  if (this.state.whichList === 'recommended'){
    return (
      <ListItem
        onPress={this.onItemPress.bind(this, item)}
        rightElement={
          <Button
            title="Remove"
            titleStyle = {{color:'rgba(92, 99,216, 1)', fontSize:12}}
            buttonStyle = {{backgroundColor: 'silver', borderRadius:30}}
            containerStyle={{padding:5, alignSelf:'center'}}
            onPress={this.onRemoveButtonPress.bind(this, item)}
          />
        }
        title={item.dishname}
        subtitle={'Recommended by: ' + item.uid}
      //  leftAvatar={{ rounded: false ,source: { uri: item.picURL} }}
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
        containerStyle={{backgroundColor:'rgba(92, 99,216, 1)', borderColor:'silver', borderWidth:2}}
        titleStyle={{ color: 'silver', fontWeight: 'bold' }}
        subtitleStyle={{ color: 'silver' }}
      />
    );
  } else if (this.state.whichList === 'saved') {
      return (
        <ListItem
          onPress={this.onItemPress.bind(this, item)}
          rightElement={
            <Button
              title="Remove"
              titleStyle = {{color:'rgba(92, 99,216, 1)', fontSize:12}}
              buttonStyle = {{backgroundColor: 'silver', borderRadius:30}}
              containerStyle={{padding:5, alignSelf:'center'}}
              onPress={this.onRemoveSavedButtonPress.bind(this, item)}
            />
          }
          title={item.dishname}
          subtitle={item.restaurant}
          //leftAvatar={{ rounded: false ,source: { uri: item.picURL} }}
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
          containerStyle={{backgroundColor:'rgba(92, 99,216, 1)', borderColor:'silver', borderWidth:2}}
          titleStyle={{ color: 'silver', fontWeight: 'bold' }}
          subtitleStyle={{ color: 'silver' }}
        />



      );

  }
  return (

    <ListItem
      onPress={this.onItemPress.bind(this, item)}
      rightElement={
          <Icon
            name='arrow-right'
            size={15}
            color='silver'
          />
      }
      title={item.dishname}
      subtitle={item.restaurant}
    //  leftAvatar={{ rounded: false ,source: { uri: item.picURL} }}
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
      containerStyle={{backgroundColor:'rgba(92, 99,216, 1)', borderColor:'silver', borderWidth:2}}
      titleStyle={{ color: 'silver', fontWeight: 'bold' }}
      subtitleStyle={{ color: 'silver' }}
    />

   )
}
renderAvatar = () => {
  var { currentUser } = firebase.auth();


  if (currentUser.photoURL){
    return (
    <Avatar
    large
    rounded
    source={{uri:currentUser.photoURL }}
    onPress={() => console.log("Works!")}
    activeOpacity={0.7}
    containerStyle={{alignSelf:'center',paddingTop:30}}
  />
  );
}
return (
  <Avatar
  large
  rounded
  title="DSHD"
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
  containerStyle={{alignSelf:'center',paddingTop:30}}
  />
);
}
renderFooter = () => {

if (this.props.userDetails.length >9){
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
    const { currentUser } = firebase.auth();
    return (
      <View style={{backgroundColor:'silver', flex:1, paddingTop:30}}>
      {this.renderAvatar()}

      <Text style={{fontSize: 30,
        fontWeight: 'bold',
        color: 'rgba(92, 99,216, 1)',
        alignSelf:'center'}}>{currentUser.displayName.toUpperCase()}
      </Text>

      <CardSection>
        <RestButton onPress={this.onRatedButtonPress.bind(this)}>
            Rated Dishes
         </RestButton>
          <RestButton onPress={this.onSavedButtonPress.bind(this)}>
            Saved For Later
          </RestButton>
          <RestButton onPress={this.onRecommendButtonPress.bind(this)}>
            Recommended
          </RestButton>
      </CardSection>
      {this.renderList()}
      </View>
    );
  }
renderList = () => {

  if (this.props.userDetails.length > 0){
    return(
  <FlatList
    data={this.props.userDetails}
    renderItem={({item}) => this.renderFlatListItem(item)}
    keyExtractor={(item, index) => item.key+index }
    refreshing={this.state.loading}
    onRefresh={this._onRefresh}
    ListFooterComponent={this.renderFooter}
    initialNumToRender={6}
  />
);
} else {
  return (
    <Text style={{paddingTop:150,
      fontSize:18,
      color: 'rgba(92, 99,216, 1)',
      backgroundColor:'silver',
      alignSelf: 'center'}}>You have no entries to display here yet</Text>
  );
}
}

}

const mapStateToProps = state => {
    var userDetails = [];
    var objectArray = _.values(state.userDetails)
    objectArray = _.flatten(objectArray);
    //console.log(objectArray);
      objectArray.map((userDetail) => {
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
          uid,
        } = userDetail;

    userDetails.push({
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
      uid,
      });
    });
    //console.log({userDetails});
    return {userDetails};

};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  textStyle: {
    fontSize: 12,
    marginLeft: 40

  },
  thumbnailStyle: {
    height: 100,
    width: 100,
    borderRadius: 5,
    marginRight: 30
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 100,

    flex: 1,
    width: 100
  },
  sliderStyle: {
    borderColor: '#73fa79',
    flex: 1,
    width: null,
    marginLeft: 10,
    marginRight: 10
  }
};

export default connect(mapStateToProps, {getRatedDishes,
  getSavedDishes,
  getRecommended,
  removeItem,
  removeSavedItem})(UserDetails);
