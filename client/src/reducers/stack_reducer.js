import {FETCH_STACKS, FETCH_CARD, FETCH_MY_STACK_OVERVIEW, FETCH_MY_RECENT_STACKS, FETCH_STACK_OVERVIEW} from '../actions/types';

const default_state ={
    all: [],
    subj: "",
    course: "",
    creator: "",
    number: "",
    single: [],
    stacks: []
};


export default function (state = default_state, action) {
    switch (action.type){
        case(FETCH_STACKS):
            return{...state,
                all: action.payload.cards,
                subj: action.payload.subject,
                course: action.payload.category,
                creator: action.payload.createdBy,
                number: action.payload.totalCards};
        case(FETCH_CARD):
            return{...state, single: action.payload.cards};

        case(FETCH_MY_STACK_OVERVIEW):
            return{...state, stacks: action.payload};

        case (FETCH_MY_RECENT_STACKS):
            return {...state, recentStacks: action.payload};

        case (FETCH_STACK_OVERVIEW):
            debugger;
            return {...state, stackCards: action.payload};

    }
    return state;
}

// Added recentStacks to the props of the React app