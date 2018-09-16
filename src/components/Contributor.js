import React, { Component} from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Input } from 'react-native-elements';
import { getContributorPhotos,
  uploadContributorImage,
  restaurantNameChanged,
  dishNameChanged,
  contributorPhotoSaveCancelled,
} from '../actions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class Contributor extends Component {
  render() {
    let {contributorImage} = this.props;
    return (
      <ScrollView style={{ flex: 1}}>
        {this.finishLoad()}

      </ScrollView>
    );
  };
 finishLoad = () => {
  if(this.props.uploading) {
    return (
      <View style={{flex:1, justifyContent:'center'}}>
        <ActivityIndicator  size="large"/>
      </View>
    );
  }
  if (this.props.contributorImage) {
    return (
      <KeyboardAvoidingView
      style={{flex:1, justifyContent:'center'}}
      behavior="position"
      >
      <Image
        source={{ uri: this.props.contributorImage.uri}}
        style={{height:300, width: 300, alignSelf:'center'}}
        />

      <GooglePlacesAutocomplete
        placeholder='Find the Restaurant'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='false'    // true/false/undefined
        fetchDetails={true}
      //  renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(details.name);
          let position = {
               latitude:details.geometry.location.lat,
               longitude: details.geometry.location.lng,
               latitudeDelta: 0.0922,
               longitudeDelta:0.0421
             };
         this.setState({region:position, restaurant: details.name});
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

        }}
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food'
        }}

        filterReverseGeocodingByTypes={['restaurant', 'food']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        //predefinedPlaces={[homePlace, workPlace]}

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}

  />
      <Input
        placeholder='Dish Name'
        value={this.props.dishname}
        onChangeText={this.onDishNameChange.bind(this)}
      />
      <Button
      title='Post Dish'
      onPress={this.postDish.bind(this)}
      containerStyle={{padding:5}}
      />
      <Button
        title='cancel post'
        onPress={this.cancelPost.bind(this)}
        containerStyle={{padding:5}}
        />
    </KeyboardAvoidingView>

    );
  }
  return (
    <View>
    <Card>
      <Text style={{fontSize:18, fontWeight:'bold'}}>
      "With great power comes great responsibilty!"
      </Text>
      <Text>
      please be aware of what you are posting and where it is posting from! All pictures will be assigned
      a location based on where the picture was taken, so please take the picture in the restaurant!
      Also, please avoid duplicate posts and have location services enabled on your phone while taking pictures!
      Thank you for your help.  I love you all!
      </Text>
    </Card>
    <Card>
      {this.props.contributorImage ? null : (
        <Text
          style={{
            fontSize: 30,
            marginBottom: 20,
            textAlign: 'center',
            marginHorizontal: 15,
          }}>
          Would you like to post a new Dish?
        </Text>
      )}
      <Button
        title='pick image from library'
        onPress={this.pickImages.bind(this)}
        containerStyle={{padding:5}}
      />
  </Card>
  </View>
  );
}
cancelPost(){
  this.props.contributorPhotoSaveCancelled();
}
onDishNameChange(text) {
  this.props.dishNameChanged(text);
}
onrestaurantNameChange(text) {
  this.props.restaurantNameChanged(text);
}
pickImages(){
   this.props.getContributorPhotos();
};
postDish(){
  console.log(this.state.region.latitude);
  this.props.uploadContributorImage(
    this.props.contributorImage,
    this.props.dishname,
    this.state.restaurant,
    this.state.region,
  );
};
};

const mapStateToProps = state => {
  const { contributorImage, uploading, dishname, restaurant } = state.contributorImage;
  return { contributorImage, uploading, dishname, restaurant };
};

export default connect(mapStateToProps, {
  getContributorPhotos,
  uploadContributorImage,
  dishNameChanged,
  restaurantNameChanged,
  contributorPhotoSaveCancelled,
 })(Contributor);
