import { GET_USER } from "../actions/user.actions";

//information sur le user
const initialState = {};

//on incrémente initialState pour avoir la DATA partotu sur notre site et dans nos components
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload
        default:
        return state;
    }
}