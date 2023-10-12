import {
    CREATE_TUTORIAL,
    RETRIEVE_TUTORIALS,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
    DELETE_ALL_TUTORIALS
  } from "./TutorialTypes";
  
  import TutorialDataService from "../services/TutorialService";
  
  export const createTutorial = (customerId, name, email, password) => async (dispatch) => {
    try {
      // const res = await TutorialDataService.create({"accountNumber":accountNumber, "customerID": customerId, "name":name, "email":email, "password": password});
      const res = await TutorialDataService.create({"customerID": customerId, "name":name, "email":email, "password": password});
      
      dispatch({
        type: CREATE_TUTORIAL,
        payload: res.data,
      });
      console.log(res)  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveTutorials = () => async (dispatch) => {
    try {
      const res = await TutorialDataService.getAll();
  
      dispatch({
        type: RETRIEVE_TUTORIALS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateTutorial = (id, data) => async (dispatch) => {
    try {
      const res = await TutorialDataService.update(id, data);
  
      dispatch({
        type: UPDATE_TUTORIAL,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteTutorial = (id) => async (dispatch) => {
    try {
      await TutorialDataService.delete(id);
  
      dispatch({
        type: DELETE_TUTORIAL,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllTutorials = () => async (dispatch) => {
    try {
      const res = await TutorialDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_TUTORIALS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findTutorialsByTitle = (title) => async (dispatch) => {
    try {
      const res = await TutorialDataService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_TUTORIALS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};