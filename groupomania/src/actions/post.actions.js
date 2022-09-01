import axios from "axios"

//posts
export const GET_POSTS ="GET_POSTS";
export const ADD_POSTS ="ADD_POSTS";
export const LIKE_POST ="LIKE_POST"
export const UNLIKE_POST ="UNLIKE_POST"
export const UPDATE_POST ="UPDATE_POST"
export const DELETE_POST ="DELETE_POST"

// comments
export const ADD_COMMENT ="ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

//-------------------------------

export const getPosts = (num) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `http://localhost:5000/api/post/`,
      withCredentials : true,
    })
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
      return axios
      .post(`http://localhost:5000/api/post/`, data)
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

  export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `http://localhost:5000/api/post/comment-post/${postId}`,
        withCredentials : true,
        data: { commenterId, text, commenterPseudo },
      })
        .then((res) => {
          //mongoDB à un id unique par post
          dispatch({ type: ADD_COMMENT, payload: { postId } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `http://localhost:5000/api/post/edit-comment-post/${postId}`,
        withCredentials : true,
        data: { commentId, text },
      })
        .then((res) => {
          dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `http://localhost:5000/api/post/delete-comment-post/${postId}`,
        withCredentials : true,
        data: { commentId },
      })
        .then((res) => {
          dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
        })
        .catch((err) => console.log(err));
    };
  };