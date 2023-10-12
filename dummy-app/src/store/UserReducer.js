const initialState = {
    customerID: null
};

function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CUSTOMER':
            return {...state, customerID: action.payload};
    
        default:
            return state;
    }
    
}

export default UserReducer;