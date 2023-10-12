const initialState = {
    account: null,
    status: true,
    token: null
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ACCOUNT":
            // console.log("Setting account data:", action.payload); // Add this log
            return {...state, account: action.payload};
        case "CHANGE_STATUS":
            return {...state, status: action.payload};
        case "SET_TOKEN":
            return {...state, token: action.payload};
        default:
            return state;
    }
}

export default accountReducer;