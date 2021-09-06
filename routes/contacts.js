const express = require("express");

const router = express.Router();

const Contact = require("../models/Contact")

router.get("/hello", (req, res) => {

    res.send("hello");
});


// @POST method
// @desc post a contact
// @path : http://localhost:5000/api/contact/
// Params Body 
router.post("/", async (req, res) => {
    try {
        // create a new contact with the model contact
        const newContact = new Contact(req.body);
    // test if the user has an email
        if (!req.body.email) {
          res.status(400).send({ message: "email is required check again" });
          return;
        }
        // test 2: if the email ele=ready exist => email should be unique 
        const user = await Contact.findOne({ email: req.body.email });
        if (user) {
          res.status(400).send({ message: "user already exist email should be unique" });
          return;
        }
        // save the contact
        const response = await newContact.save();
        res.send({ response: response, message: "user is saved" });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "can not save it" });
      }
    });
// @Method GET
// @desc GET all contact
// @path : http://localhost:5000/api/contact/
router.get("/", async (req, res) => {
    try {
        const result = await Contact.find()
        res.send({ response: result, message: "getting contacts " });
    } catch (error) {
        res.status(400).send({ message: "can not get contacts" });
    }
});


// @Method GET
// @desc GET one contact
// @path : http://localhost:5000/api/contact/:id
// @Params id
router.get("/:id", async (req, res) => {
    try {
        const result = await Contact.findOne({ _id: req.params.id });
        res.send({ response: result, message: "getting contact " });
    } catch (error) {
        res.status(400).send({ message: "there is no contact with this id" });
    }
});

// @Method DELETE
// @desc DELETE one contact by id
// @path : http://localhost:5000/api/contact/:id
// @Params id
router.delete("/:id", async (req, res) => {
    try {
        const result = await Contact.deleteOne({ _id: req.params.id });
        result.n ? res.send({ response: "user deleted" }) :
            res.send({message:"there is no contact with this id "});

    } catch (error) {
        res.status(400).send({ message: "there is no contact with this id" });
    }
});

// @Method PUT
// @desc PUT A contact by id
// @path : http://localhost:5000/api/contact/:id
// @Params id Body
router.put("/:id", async (req, res) => {
    try {
        const result = await Contact.updateOne({ _id: req.params.id }, { $set: { ...req.body } });
        result.nModified ? res.send({ message: "user updated" }) :
        res.send({ message: "there is no contact with this id "});
        res.send({ response: result, message: "getting contact " });
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;