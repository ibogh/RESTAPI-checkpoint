import {
    GET_CONTACTS_FAIL,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_LOAD,
    DELETE_CONTACT,
    GET_CONTACT,
    EDIT_CONTACT,
} from "../constants/contacts";
import axios from "axios";

export const getContacts = () => async (dispatch) => {
    dispatch({ type: GET_CONTACTS_LOAD });
    try {
        let result = await axios.get("/api/contact");
        console.log(result)
        dispatch({ type: GET_CONTACTS_SUCCESS, payload: result.data.response });
    } catch (error) {
        dispatch({ type: GET_CONTACTS_FAIL, payload: error });
        console.log(error);
    }
};

export const deleteContact = (id) => (dispatch) => {
    axios
        .delete(`/api/contact/${id}`)
        .then((res) => dispatch(getContacts()))
        .catch((err) => console.log(err));
};

export const getContact = (id) => (dispatch) => {
    axios
        .get(`/api/contact/${id}`)
        .then((res) => dispatch({ type: GET_CONTACT, payload: res.data.response }))
        .catch((err) => console.log(err));
};

export const postContact = (user) => async (dispatch) => {
    try {
        const result = await axios.post("/api/contact", user);
        dispatch(getContacts());
    } catch (error) {
        console.log(error.response);
    }
};

export const editContact = (id, user) => (dispatch) => {
    axios
        .put(`/api/contact/${id}`, user)
        .then((res) => {
            dispatch({ type: EDIT_CONTACT, payload: res.data.message });
        })
        .then(dispatch(getContacts()))
        .catch((err) => console.log(err));
};