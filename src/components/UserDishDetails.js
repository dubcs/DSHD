import React, { Component } from 'react';
import { Text, View, FlatList, Image} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { CardSection } from './CardSection';
import { Card } from './Card';
import { RestButton } from './RestButton';
import { Input } from './Input';
import { getRatedDishes, getSavedDishes } from '../actions';
import { Avatar, Button } from 'react-native-elements';

class UserDishDetails extends Component {
  componentWillMount() {
    console.log("in here");
    this.props.getRatedDishes();
  }
  onRemoveButtonPress(item) {

  }

  renderFlatListItem(item) {
    //console.log(item);
    return (
      <View>
        <Card>
          <CardSection>
            <Avatar
              small
              rounded
              source={{ uri: item.picURL }}
              activeOpacity={0.7}
              />
          <Text>
            average:  {item.average} {'\n'}
            dishname:  {item.dishname} {'\n'}
            Restaurant:  {item.restaurant}
         </Text>
         <Button
            small
            title='Recommend'
            titleStyle= {{ fontSize: 6 }}
            buttonStyle={{
              width: 120,
              height: 30,
              borderColor:"transparent",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'black',
              backgroundColor: '#73fa79',

            }}
            onPress={this.onRemoveButtonPress.bind(this)}
            containerStyle={{marginTop: 50}}
          />
        </CardSection>
      </Card>
      </View>
     )
  }
  render() {

    return (
      <View>

      <FlatList
        data={this.props.userDetails}
        renderItem={({item}) => this.renderFlatListItem(item)}
        keyExtractor={item => item.key }
      />
      </View>
    );
  }
}

const mapStateToProps = state => {
    var userDetails = [];
    var objectArray = _.values(state.userDetails)
    //objectArray = _.flatten(objectArray);
    //console.log(objectArray);
      objectArray.map((post) => {
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
          likes
        } = post;

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
      likes
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
    height: 300,
    flex: 1,
    width: null
  },
  sliderStyle: {
    borderColor: '#73fa79',
    flex: 1,
    width: null,
    marginLeft: 10,
    marginRight: 10
  }
};

export default connect(mapStateToProps, {getRatedDishes, getSavedDishes })(UserDishDetails);
