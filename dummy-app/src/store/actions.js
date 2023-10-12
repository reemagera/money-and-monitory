import axios from "axios";


export const setAccount = (account) => {
    return {
        type: "SET_ACCOUNT",
        payload: account
    };
};

export const fetchAccountDetails = (customerID, token) => {
    return (dispatch) => {
        const headers = { 'Authorization': `Bearer ${token}` };
        const config = {
            headers: headers
        };
        axios.get(`http://localhost:8083/accounts-api/account/${customerID}`, config)
        .then((response) => {
            // console.log("API Response:", response.data); 
            dispatch(setAccount(response.data));
        })
        .catch((error) => {
            console.log("Error fetching account details: ", error, error.status);
        })
    }
}

export const setCustomer = (customerID) => {
    return {
        type: 'SET_CUSTOMER',
        payload: customerID
    };
};

export const changeEnable = (status) => {
    return {
        type: "CHANGE_STATUS",
        payload: status
    };
};

export const fetchEnableStatus = (customerID, token) => {
    return (dispatch) => {
        const headers = { 'Authorization': `Bearer ${token}` };
        const config = {
            headers: headers
        };
        axios.get(`http://localhost:8083/transactions-api/transactions/${customerID}`, config)
        .then((response) => {
            dispatch(changeEnable(response.data.roundUpenabled));
        })
        .catch((error) => {
            console.log("Error fetching status: ", error);
        })
    }
}

export const setToken = (token) => {
    return {
        type: "SET_TOKEN",
        payload: token,
    }
}