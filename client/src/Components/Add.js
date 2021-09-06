import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { editContact, postContact } from "../JS/actions/contacts";
import { Link } from "react-router-dom";
const Add = () => {
    const [user, setUser] = useState({ name: "", email: "", Phone: "" });
    const userReducer = useSelector((state) => state.contactReducer.user);
    const edit = useSelector((state) => state.editReducer.edit);

    const dispatch = useDispatch();

    useEffect(() => {
        edit ? setUser(userReducer) : setUser({ name: "", email: "", Phone: "" });
    }, [userReducer, edit]);


    const handleContact = () => {
        if (!edit) {
            dispatch(postContact(user));
        } else {
            dispatch(editContact(userReducer._id, user));
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    return (
        <Form>
            <Form.Field>
                <label> Name</label>
                <input
                    value={user.name}
                    placeholder=" Name"
                    name="name"
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input
                    value={user.email}
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Phone</label>
                <input
                    value={user.Phone}
                    placeholder="Phone"
                    name="Phone"
                    onChange={handleChange}
                />
            </Form.Field>
            <Link to="/">
                <Button type="submit" onClick={handleContact}>
                    {edit ? "Edit" : "Save"}
                </Button>
            </Link>
        </Form>
    );
};

export default Add;