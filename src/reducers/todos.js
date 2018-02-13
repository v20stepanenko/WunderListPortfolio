import {ADD_TO_DO, DELETE_TO_DO, CONFIGURE_TO_DO, COMPLETE_TO_DO} from '../instruments/constants';

export default (state = [], action) => {
    switch (action.type) {
        case ADD_TO_DO: {
            return [...state, action.payload.toDo];
        }
        case DELETE_TO_DO: {
            return state.filter(toDo => toDo.id !== action.id);     
        }
        case COMPLETE_TO_DO: {
            return state.map(toDo => {
                if(toDo.id === action.id){
                    
                 toDo.complete = true
                }
                return toDo;
            })
        }
        default: {
            return state;
        }
    }
}
