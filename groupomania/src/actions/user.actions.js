import axios from "axios";

export const GET_USER ="Get_USER";
export const UPLOAD_PICTURE ="UPLOAD_PICTURE"

//récupérer les informations des utilisateurs
export const getUser =(uid) => {
    return (dispatch) => {
        return axios
            .get(`http://localhost:5000/api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload : res.data})
            })
            .catch((err) => console.log(err))
    }
}
//récupère tous ce qui est mis dans data dans UploadImg
export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .post(`http://localhost:5000/api/user/upload`, data)
            .then((res) => {
                return axios
                .get(`http://localhost:5000/api/user/${id}`)
                .then ((res) => {
                    dispatch({type: UPLOAD_PICTURE, payload: res.data.picture})
                })
            })
            .catch((err) => console.log(err))
    }
}