import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Contact from "./Contact";
import { getContacts } from "../JS/actions/contacts";

const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contactReducer.contacts);
    const loadContacts = useSelector(
        (state) => state.contactReducer.loadContacts
    );
    useEffect(() => {
        dispatch(getContacts());
    }, []);
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                }}
            >
                {loadContacts ? (
                    <h2>loading</h2>
                ) : contacts.length == 0 ? (
                    <h2>there is no data show</h2>
                ) : (
                    contacts.map((el) => <Contact key={el._id} contact={el} />)
                )}
            </div>
        </div>
    );
};

export default ContactList;