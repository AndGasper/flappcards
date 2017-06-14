import {FETCH_USER_META} from '../actions/types';

const default_state ={
    userName: "",
    email: "",
    birthday: "",
    name: '',
    joinDate: '',
    avatar: ''
};

export default function (state = default_state, action) {
    switch (action.type){
        case(FETCH_USER_META):
            return {
                ...state,
                userName: action.payload[0].username,
                email: action.payload[0].user_email,
                birthday: action.payload[0].user_bday,
                name: action.payload[0].fullname,
                joinDate: action.payload[0].user_join,
                avatar: action.payload[0].avatar
            }
    }
    return state;
}