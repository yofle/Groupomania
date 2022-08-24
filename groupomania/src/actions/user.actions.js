import axios from "axios";

export const GET_USER ="Get_USER";

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