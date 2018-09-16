import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { MapView, Location } from 'expo';
import { Avatar, Button } from 'react-native-elements';
import { userLocationFetch, getPostsLatLong, getNewRegion} from '../actions'
import { HeaderButton} from './HeaderButton';
import { CardSection } from './CardSection';
import Icon from 'react-native-vector-icons/FontAwesome';

const {Marker} = MapView;
const DELISH_IMAGE = require('../images/noDSHD.png')

class MapView1 extends Component {
  static navigationOptions = ({navigation}) => {


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


//  loadMoreHeader = () => {
//    this.setState({mapLoading:true});
//    var region = this.state.region;
//    this.props.getPostsLatLong(region,this.state.indexOfLast);
//    if(this.props.navigation.state.params.onGoBack) {
//          this.props.navigation.state.params.onGoBack(region, this.state.indexOfLast);
//      }
//    setTimeout(() => this.setState({mapLoading:false, indexOfLast: this.state.indexOfLast+15}), 1000);
//  };

  state = {
    indexOfLast:0,
    mapLoading: false,
    region: {
        latitude:0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta:0.0421,
      },
  }

async componentWillMount() {
  this.setState({mapLoading:true, region:this.props.navigation.state.params.region});
//  this.props.navigation.setParams({ loadMoreHeader: this.loadMoreHeader});
//  console.log(this.props.navigation.state.params);
//  await this.props.getPostsLatLong(this.props.navigation.state.params.region,
//    this.props.navigation.state.params.indexOfLast);
  //  await setTimeout(() => this.setState({mapLoading:false,
  //      region:this.props.navigation.state.params.region}), 1000);
  this.setState({mapLoading:false,
        region:this.props.navigation.state.params.region})
this.props.userLocationFetch(this.props.navigation.state.params.posts);
}
async onButtonPress() {
  await this.setState({mapLoading:true});
  var region = this.state.region;
//  await this.props.getPostsLatLong(region, this.state.indexOfLast);
  if(this.props.navigation.state.params.onGoBack) {
        this.props.navigation.state.params.onGoBack(region);
    }
  this.setState({mapLoading:false});
  this.props.navigation.goBack();
}
async onCurrentLocation(){
  await this.setState({mapLoading:true});
  let currentLocation = await Location.getCurrentPositionAsync({});
            let region = {
                 latitude:currentLocation.coords.latitude,
                 longitude: currentLocation.coords.longitude,
                 latitudeDelta: 0.0922,
                 longitudeDelta:0.0421
               };

  //this.props.getPostsLatLong(region,this.state.indexOfLast);
  if(this.props.navigation.state.params.onGoBack) {
        this.props.navigation.state.params.onGoBack(region);
  }
this.setState({mapLoading:false, region:region, indexOfLast: 15});
this.props.navigation.goBack();
}
async onRegionChangeComplete(region){
  await this.setState({region});
}
onMarkerChange = (markers) => {
if (markers) {
  return (
    markers.map(marker => (
      <Marker
      coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
      title={marker.dishname}
      description={marker.restaurant}
      //image={{ uri: marker.picURL  }}
      key={marker.key}
      />
    ))
  );
}
}
render(){
    return (
      <View style={{ flex: 1 , alignSelf: 'stretch'}}>

      <MapView
            showsUserLocation={true}
            followUserLocation={true}
            style={{ flex: 1 , alignSelf: 'stretch'}}
            region={this.state.region}
            onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            loadingEnabled={true}

          >
              {this.onMarkerChange(this.props.markerLocation)}
          </MapView>
          <View style={styles.imageStyle}>
            <Button
              buttonStyle={{borderRadius:30, height:30, backgroundColor: 'silver'}}
              title="Find Posts in this region"
              onPress={this.onButtonPress.bind(this)}
              titleStyle={{ color:"rgba(92, 99,216, 1)" , fontSize:12}}
              />
              <Button
                buttonStyle={{borderRadius:30, height:30, backgroundColor: 'silver'}}
                title="goto current location"
                onPress={this.onCurrentLocation.bind(this)}
                titleStyle={{ color:"rgba(92, 99,216, 1)", fontSize: 12 }}
                containerStyle={{ marginTop: 10 }}
                />
          </View>

      </View>
    );
  }

}
 const mapStateToProps = state => {
  const { markerLocation } = state.mapper;
  if (markerLocation) {
    return {markerLocation};
  }
};

const styles = {
  imageStyle: {
    position: 'absolute',
    bottom:20,
    left:10,
    right:10,
  },

};

export default connect(mapStateToProps, {userLocationFetch, getPostsLatLong, getNewRegion})(MapView1);
