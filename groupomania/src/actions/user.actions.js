import axios from "axios";

export const GET_USER ="Get_USER";
export const UPLOAD_PICTURE ="UPLOAD_PICTURE"

//récupérer les informations des utilisateurs
export const getUser = (uid) => {
    return (dispatch) => {
      return axios
      ({
        method: "get",
        url: (`http://localhost:5000/api/user/${uid}`),
        withCredentials : true,
      })
        .then((res) => {
          dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };
//récupère tous ce qui est mis dans data dans UploadImg
export const uploadPicture = (data, id) => {
    return (dispatch) => {
      return axios
      ({
        method: "post",
        url:`http://localhost:5000/api/user/upload`,
        data: data,
        withCredentials : true,
      })
        .then((res) => {
            return axios
            ({
              method: "get",
              url:(`http://localhost:5000/api/user/${id}`),
              withCredentials : true,
            })
              .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
              });  
        })
        .catch((err) => console.log(err));
    };
  };