import { UPLOAD_POSTS, TOGGLE_BOOKED, DELETE_POST, ADD_POST } from './types';
import { DB } from '../db';
import * as FileSystem from 'expo-file-system';

const uploadAllPosts = () => {
  return async dispatch => {
    const posts = await DB.getPosts();
    dispatch({
      type: UPLOAD_POSTS,
      payload: posts,
    })
  }
  
};

const toggleBooked = (post) => async dispatch => {
await DB.updatePost(post);

  dispatch ({
    type: TOGGLE_BOOKED,
    payload: post.id,
  })
};

const deletePost = (id) => async dispatch => {
  await DB.removePost(id);

  dispatch ({
    type: DELETE_POST,
    payload: id,
  })
};

const addPost = (post) => async dispatch => {
  console.log('post.img>>', post.img.current);

const fileName = post.img.current.split('/').pop();
console.log('fileName>>', fileName)
const newPath = FileSystem.documentDirectory + fileName;

try {
  await FileSystem.moveAsync({
    to: newPath,
    from: post.img.current
  })
} catch (e) {
console.log(e);
}

const payload = {...post, img: newPath}
const id = await DB.createPost(payload);
payload.id = id;
  dispatch ({
    type: ADD_POST,
    payload,
  })
};

export { uploadAllPosts, toggleBooked, deletePost, addPost };
