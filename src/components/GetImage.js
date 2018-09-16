import React, { Component} from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Constants, ImagePicker } from 'expo';
import { connect } from 'react-redux';
import { CardSection } from './CardSection';
import { getPhotos, getPhotosCamera } from '../actions';
import {Button} from './Button';

class GetImage extends Component {
  render() {
    let {image} = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image ? null : (
          <Text
            style={{
              fontSize: 30,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
            How would you like to load picture?
          </Text>
        )}
        <CardSection>
        <Button
          onPress={this.pickImage.bind(this)}>
          Pick an image from camera roll
        </Button>
        </CardSection>
        <CardSection>
        <Button
          onPress={this.takePhoto.bind(this)}
          >Take a photo
          </Button>
          </CardSection>

        <StatusBar barStyle="default" />
      </View>
    );
  };
  componentWillMount() {

  }

takePhoto() {
  const key = this.props.navigation.state.params;
  this.props.getPhotosCamera({key});
};
 pickImage() {
   const key = this.props.navigation.state.params
  this.props.getPhotos({key});
};


  _share = () => {
    Share.share({
      message: this.props.image,
      title: 'Check out this photo',
      url: this.props.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.props.image);
    alert('Copied image URL to clipboard');
  };
}
  const mapStateToProps = state => {
    const { image, uploading } = state.image;
    return { image, uploading };
  };

export default connect(mapStateToProps, {getPhotos, getPhotosCamera})(GetImage);
