import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FilterReducer from './FilterReducer';
import PostReducer from './PostReducer';
import DetailReducer from './DetailReducer';
import CreateUserReducer from './CreateUserReducer';
import MapViewReducer from './MapViewReducer';
import NavigationReducer from './NavigationReducer';
import GetImageReducer from './GetImageReducer';
import CommentReducer from './CommentReducer';
import UserImagesReducer from './UserImagesReducer';
import UserDetailsReducer from './UserDetailsReducer';
import UserSettingsReducer from './UserSettingsReducer';
import friendsReducer from './friendsReducer';
import FriendsLikesReducer from './FriendsLikesReducer';
import FindFriendsReducer from './FindFriendsReducer';
import FollowReducer from './FollowReducer';
import RecommendReducer from './RecommendReducer';
import ContributorReducer from './ContributorReducer';

export default combineReducers({
  nav: NavigationReducer,
  auth: AuthReducer,
  filter: FilterReducer,
  posts: PostReducer,
  detail: DetailReducer,
  createUser: CreateUserReducer,
  mapper: MapViewReducer,
  image: GetImageReducer,
  comment: CommentReducer,
  userDetails: UserDetailsReducer,
  userImage: UserImagesReducer,
  setting: UserSettingsReducer,
  friend: friendsReducer,
  friendsLikes: FriendsLikesReducer,
  findFriends: FindFriendsReducer,
  follow: FollowReducer,
  recommend: RecommendReducer,
  contributorImage: ContributorReducer,
});
