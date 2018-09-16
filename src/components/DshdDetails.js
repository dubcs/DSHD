import _ from 'lodash';
import React, { Component } from 'react';
import { Text, ScrollView, FlatList, Image, View} from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Avatar, Input } from 'react-native-elements';
import { CommentCreate, CommentSaveSuccess, getPostLocation, SaveDish } from '../actions';
import { CardSection } from './CardSection';
import { Card } from './Card';
import { RestButton } from './RestButton';
import Comments from './Comments';
import UserImages from './UserImages';


const {Marker} = MapView;

const DELISH_IMAGE = require('../images/noDSHD.png')

class DshdDetails extends Component {
  state = {
    hashtag:[]
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
   var key = this.props.navigation.state.params.key;
   this.props.getPostLocation({key});
   //this.props.navigation.setParams({ getImage: {key}});
  }
   onCommentChange(text){
      this.props.CommentCreate(text);
   }
   onButtonPress(text) {
     const key = this.props.navigation.state.params.key;
     this.props.CommentSaveSuccess({key, text});
   }
   onSaveButtonPress() {
    const key = this.props.navigation.state.params.key;
     this.props.SaveDish({key});
   }
   onRecommendButtonPress() {
    const key = this.props.navigation.state.params.key;
    this.props.navigation.navigate('RecommendDish', {key} );

   }
   onButtonPicturePress(){
    const key = this.props.navigation.state.params.key;
     this.props.navigation.navigate('GetImage', key );
   }
   onChangeTags(tag){
     this.setState({hashtag:tag});
     console.log(tag);

   }
  render(){
    return (
      <ScrollView style={{backgroundColor:'silver'}}>
        <Card>
        <UserImages {...this.props} />
        <CardSection>
          <RestButton
            onPress={this.onButtonPicturePress.bind(this)}
            >
              Post a Picture
          </RestButton>
        </CardSection>
        <CardSection>
            <Text style={{fontSize:18}}> average:  </Text>
            <Text style={{fontSize:18, fontWeight:'bold'}}> {this.props.navigation.state.params.average} </Text>
          </CardSection>
          <CardSection>
              <Text style={{fontSize:18}}> Number of rates:  </Text>
              <Text style={{fontSize:18, fontWeight:'bold'}}> {this.props.navigation.state.params.likesCount} </Text>
          </CardSection>
          <CardSection>
            <Input
              placeholder="Comments"
              value={this.props.text}
              onChangeText={this.onCommentChange.bind(this)}
            />
          </CardSection>
          <RestButton
             onPress={this.onButtonPress.bind(this, this.props.text)}
          >Post Comment</RestButton>
          <Comments {...this.props} />
          <CardSection>
            <RestButton
               onPress={this.onSaveButtonPress.bind(this)}
               >
               Save Dish For Later
             </RestButton>
             <RestButton
                onPress={this.onRecommendButtonPress.bind(this)}
                >
                 Recommend to a Friend
              </RestButton>
             </CardSection>
        <CardSection>
        <MapView
          style={styles.imageStyle}
          region={{
            latitude: _.first(this.props.location),
            longitude: _.last(this.props.location),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
        <Marker
             title={this.props.navigation.state.params.dishname}
             description={this.props.navigation.state.params.restaurant}
             coordinate={{longitude: _.last(this.props.location), latitude: _.first(this.props.location)}}
         />
      </MapView>
      </CardSection>
      </Card>
      </ScrollView>
    );
  }
}


const mapStateToProps = state => {
  const { displayName , text , location } = state.detail;
  return { displayName, text, location};
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
    height: 175,
    flex: 1,
    width: null
  }
};

export default connect(mapStateToProps, { CommentCreate,
    CommentSaveSuccess,
    getPostLocation,
    SaveDish,

  })(DshdDetails);
