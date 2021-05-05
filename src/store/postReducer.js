import { UPLOAD_POSTS, TOGGLE_BOOKED, DELETE_POST, ADD_POST } from './types';

const initState = {
  allPosts: [],
  bookedPosts: [],
  loading: true,
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case UPLOAD_POSTS:
      return {
        ...state,
        allPosts: action.payload,
        bookedPosts: action.payload.filter((post) => post.booked),
        loading: false,
      };
    case TOGGLE_BOOKED:
      const allPosts = state.allPosts.map((post) => {
        if (post.id === action.payload) {
          post.booked = !post.booked;
        }
        return post;
      });
      return {
        ...state,
        allPosts,
        bookedPosts: allPosts.filter((post) => post.booked),
      };
    case DELETE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter((post) => post.id !== action.payload),
        bookedPosts: state.bookedPosts.filter(
          (post) => post.id !== action.payload
        ),
      };
    case ADD_POST:
      return {
        ...state,
        allPosts: [{ ...action.payload }, ...state.allPosts],
      };
    default:
      return state;
  }
}

export default reducer;
