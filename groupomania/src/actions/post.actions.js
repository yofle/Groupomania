import axios from "axios"

//posts
export const GET_POSTS ="GET_POSTS";
export const LIKE_POST ="LIKE_POST"
export const UNLIKE_POST ="UNLIKE_POST"
export const UPDATE_POST ="UPDATE_POST"
export const DELETE_POST ="DELETE_POST"

export const getPosts = () => {
    return (dispatch) => {
        return axios
        .get(`http://localhost:5000/api/post/`)
        .then((res) => {
            dispatch({ type: GET_POSTS, payload: res.data })
        })
        .catch((err) => console.log(err))
    }
}

export const likePost = (postId, userId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `http://localhost:5000/api/post/like-post/` + postId,
        data: { id: userId },
        withCredentials : true,
      })
        .then((res) => {
          dispatch({ type: LIKE_POST, payload: { postId, userId } });
        })
        .catch((err) => console.log(err));
    };
  };
  
  export const unlikePost = (postId, userId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `http://localhost:5000/api/post/unlike-post/` + postId,
        data: { id: userId },
        withCredentials : true,
      })
        .then((res) => {
          dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const updatePost = (postId, message) => {
    return (dispatch) => {
      return axios({
        method: "put",
        url: `http://localhost:5000/api/post/${postId}`,
        data: {message},
        withCredentials : true,
      })
        .then((res) => {
          dispatch({ type: UPDATE_POST, payload: {message, postId } });
          
        })
        .catch((err) => console.log(err));
    };
  };

  export const deletePost = (postId) => {
    return (dispatch) => {
      return axios({
        method: "delete",
        url: `http://localhost:5000/api/post/${postId}`,
        withCredentials : true,
      })
        .then((res) => {
          dispatch({ type: DELETE_POST, payload: { postId } });
        })
        .catch((err) => console.log(err));
    };
  };