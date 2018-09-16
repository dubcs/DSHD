import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, FlatList , Image, Slider, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Rating, SearchBar, Button} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { locationFetch,
        sliderMoved,
        restaurantDishes,
        searcher,
        addKeys,
        loadMapObjects } from '../actions';
import { Location } from 'expo';
import { CardSection } from './CardSection';
import { Card } from './Card';
import { HeaderButton } from './HeaderButton';
import  SortBy  from './SortBy';
import Icon from 'react-native-vector-icons/FontAwesome';
import FadeIn from 'react-native-fade-in-image';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const DELISH_IMAGE = require('../images/noDSHD.png');

const Placeholder = () => (
  <View style={{flex: 1, justifyContent:'center'}}>
    <ActivityIndicator size='large'/>
  </View>
);

const inputProps = {
  keyboardType: 'default',
  placeholder: '#tags',
  autoFocus: true,
  style: {
    fontSize: 14,
  },
};

class DshdList extends Component {

state = {
  loading:false,
  region:{
    latitude:-122,
    longitude: 37,
    latitudeDelta: 0.0922,
    longitudeDelta:0.0421,

  },
  text: '',
  tags:'',
  searchText:'',
  rat:false,
  indexOfLast:0.0,
};

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
         > Map View</HeaderButton>
       ),
       headerLeft: (

           <HeaderButton
            onPress={params.modalSort}
           > Sort By</HeaderButton>

       ),
       headerBackTitle:"View in List",

     };
}
async searchText(text) {
  await this.setState({searchText:text});
}
async searchesText(text) {
  await this.setState({loading:true, indexOfLast:this.state.indexOfLast});
  this.props.searcher(this.state.searchText,this.state.region, this.state.indexOfLast);
  this.setState({ loading: false});
}
async componentWillMount() {
  await this.setState({loading:true, indexOfLast:1.0})
  this.props.navigation.setParams({ modalMap: this._modalMap});
  this.props.navigation.setParams({ modalSort: this._modalSort});
  let currentLocation = await Location.getCurrentPositionAsync({
    enableHighAccuracy:true
  });
          let currentPosition = {
               latitude:currentLocation.coords.latitude,
               longitude: currentLocation.coords.longitude,
               latitudeDelta: 0.0922,
               longitudeDelta:0.0421
             };
             this.setState({region : currentPosition });
             this.props.locationFetch(currentPosition , this.state.indexOfLast);
             this.setState({loading:false});
}

onGoBack = (region) => {
    this.setState({ loading:true, indexOfLast: 3});
    this.props.locationFetch(region, 3.0);
    this.setState({ loading: false,region:region})
}
onGoBack2 = (rat) => {
    this.setState({rat});
    this.props.addKeys(this.state.rat, this.props.posts);
}
_modalMap = () => {
this.props.navigation.navigate('MapView1',{posts:this.props.posts, region:this.state.region,onGoBack: this.onGoBack})
};
_modalSort = () => {
   this.props.navigation.navigate('SortBy',{onGoBack2: this.onGoBack2});
};
onButtonPress(item) {
  this.props.navigation.navigate('DshdDetails', item );
}
async onRestaurantNameButtonPress(name) {
  await this.setState({indexOfLast: this.state.indexOfLast})
  this.props.restaurantDishes(name, this.state.region, this.state.indexOfLast);
}
sliderState = ({vae,item, index}) => {
  var origPostList = this.props.posts;
  this.props.sliderMoved( {vae, item, origPostList,index}, () => {
    Alert.alert(
  'Thank You',
  'Your input is appreciated!',
  [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)
  }
);
}
_onRefresh = () => {
  this.setState({loading:true});
  this.props.locationFetch(this.state.region, 2);
  setTimeout(()=> this.setState({loading: false, indexOfLast:2}), 1000);
}

async searchClear() {
  await this.setState({loading:true, indexOfLast: this.state.indexOfLast});
  this.props.locationFetch(this.state.region, this.state.indexOfLast);
  setTimeout(() => this.setState({loading: false,searchText:''}),1000);
}

async loadMore(){
  await this.setState({loading:true, indexOfLast:this.state.indexOfLast + 2.0});
  this.props.locationFetch(this.state.region , this.state.indexOfLast);
  setTimeout(() => this.setState({loading: false}),1000);
}

reload(){
  this.setState({loading:true, indexOfLast:2});
  this.props.locationFetch(this.state.region,0);
  setTimeout(() => this.setState({loading: false, indexOfLast:0}),1000);
}


renderFlatListItem(item, index) {
  return (
    <Card>
          <Button
            title={item.dishname || "N/A"}
            titleStyle = {{color:'silver'}}
            buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
            containerStyle={{padding:5, alignSelf:'stretch'}}
            onPress={this.onButtonPress.bind(this, item )}
          />
        <Button
          title={item.restaurant}
          titleStyle = {{color:'silver'}}
          buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
          containerStyle={{padding:5, alignSelf:'stretch'}}
          onPress={this.onRestaurantNameButtonPress.bind(this, item )}
        />
        <FadeIn
            renderPlaceholderContent={ <Placeholder />}
            placeholderStyle={{ backgroundColor: 'grey' }}
        >
        <Image
             style={styles.imageStyle}
             source={{uri: item.picURL}}
             resizeMode='contain'
             resizeMethod='scale'
        />

      </FadeIn>
        <View style={styles.container2}>
            <Text style={{backgroundColor:'silver', paddingTop:5}}> This dishes current average rating is:  </Text>
            <Text style={{fontSize:20,
              fontWeight: 'bold',
              color:"rgba(92, 99,216, 1)",
              backgroundColor:'silver',
              }}> {Math.round((item.average * 100)/100)} </Text>
        </View>
        <View style={styles.container2}>
              <Text style={{backgroundColor:'silver'}}> On a total Number of ratings:  </Text>
              <Text style={{fontSize:17,
                color: "rgba(92, 99,216, 1)",
                backgroundColor:'silver'}}> {item.likesCount} </Text>
        </View>

    <View style={styles.container}>
      <Text style={{fontSize: 15,backgroundColor:'silver'}}> Rate it(scale of 1-10):  </Text>
        <View style={styles.containerRow}>
          <Text style={{padding:10, color: "rgba(92, 99,216, 1)"}}>0</Text>
          <Slider
            style={{backgroundColor:'silver',
            alignSelf:'stretch',
            flex: 1,
          }}
            thumbTintColor={"rgba(92, 99,216, 1)"}
            maximumValue={10}
            minimumValue={1}
            step={1}
            value={5}
            onSlidingComplete={(vae) => this.sliderState({vae, item, index})}
            maximumTrackTintColor={"rgba(92, 99,216, 1)"}
            minimumTrackTintColor={"rgba(92, 99,216, 1)"}
          />

          <Text style={{padding:10, color: "rgba(92, 99,216, 1)"}}>10</Text>
        </View>
    </View>

    </Card>

   )

}
emptyList(){
if(this.state.loading){
  return (
  <View  >
    <ActivityIndicator style={{paddingTop:120, paddingBottom:20}}
    size="large"
    color="rgba(92, 99,216, 1)"/>
    <Text style={{paddingBottom:10,
      fontSize:23,
      fontWeight:'bold',
      color: 'rgba(92, 99,216, 1)',
      backgroundColor:'silver',
      alignSelf: 'center'}}>Searching...</Text>
    <Text style={{
      fontSize:18,
      color: 'rgba(92, 99,216, 1)',
      backgroundColor:'silver',
      alignSelf: 'center', padding:10}}>Click the Map view button to change the search area, if nothing loads</Text>
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
}
  return (
    <FlatList
      data={this.props.posts}
      renderItem={({item, index}) => this.renderFlatListItem(item, index)}
      keyExtractor={(item, index) => (item.key+index) }
      refreshing={this.state.loading}
      onRefresh={this._onRefresh}
      ListHeaderComponent={this.renderHeader}
      ListFooterComponent={this.renderFooter}
      initialNumToRender={20}
      />
    );
  }

renderFooter = () => {
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
      title="Expand Search Radius!"
      iconRight={true}
      titleStyle = {{color:'silver'}}
      buttonStyle = {{backgroundColor: 'rgba(92, 99,216, 1)', borderRadius:30}}
      containerStyle={{padding:5, alignSelf:'stretch'}}
      onPress={this.loadMore.bind(this)}
    />
    </View>
  );
//}
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
renderHeader = () => {
  return (
    <View style={{flexDirection:'row', backgroundColor:'white'}}>

    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='false'    // true/false/undefined
      fetchDetails={true}
    //  renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        let position = {
             latitude:details.geometry.location.lat,
             longitude: details.geometry.location.lng,
             latitudeDelta: 0.0922,
             longitudeDelta:0.0421
           };
        this.props.searcher(details.name, position, 1);
      }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyCSe-uXG59ptIBnbxV3uZ-k9Q_64mP4bd4",
        language: 'en', // language of the results
        types: 'establishment' // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food'

      }}

      filterReverseGeocodingByTypes={['locality']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      //predefinedPlaces={[homePlace, workPlace]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}

/>

    </View>
  );
}

render() {
  console.ignoredYellowBox = ['Setting a timer'];
    return (

      <View style={{backgroundColor:'silver', flex:1}}>
      <KeyboardAvoidingView behavior="padding" enabled>
        {this.emptyList()}
          </KeyboardAvoidingView>
      </View>

    );
  }
}

const mapStateToProps = state => {
var posts = [];
var objectArray = _.values(state.posts);
objectArray = _.flatten(objectArray);
  objectArray.map((post) => {
    const {
      dishname,
      restaurant,
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
    } = post;
  posts.push({
    dishname,
    restaurant,
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
return {posts};
};

const styles = {
  container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'center',
   backgroundColor: 'white',
   paddingTop: 5,
   backgroundColor:'silver'
 },
 container2: {
  flex: 1,
  flexDirection: 'row',
//  justifyContent: 'stretch',
  paddingTop:5,
  backgroundColor: 'silver',
},
containerRow: {
 flex: 1,
 flexDirection: 'row',
 alignSelf: 'stretch',
 paddingTop:5,
 backgroundColor: 'silver',
},
  imageStyle: {
    height: 400,
    width: 400,
    flex: 1,
    borderRadius: 5,
    marginLeft: 5,
    marginRight:5,
    alignSelf:'center'
  },

};

export default connect(mapStateToProps,
  {locationFetch,
    sliderMoved,
    restaurantDishes,
    addKeys,
    searcher,
    loadMapObjects})(DshdList);
