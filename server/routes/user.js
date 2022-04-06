const express = require('express');
const router = express.Router();
const UserService = require('../services/userservice');
const userServiceObj = new UserService();
const auth = require("./auth");

router.get('/', (req,res) => {
    res.send('Users Root page');
});

router.get('/list', auth.required, async (req,res) => {
    let users = await userServiceObj.getUserList();
    res.send(users);
});

router.post('/login', async (req,res)=> {
    let loginResult = await userServiceObj.loginUser(req.body);
    res.send(loginResult);
})

router.post('/create',  auth.required,async (req,res) => {
    console.log(req.body);
    let user = await userServiceObj.createUser(req.body);
    res.send(user);
});

// router.put('/update/:id', async (req,res) => {
//     let user = await userServiceObj.updateUser(req.params.id, req.body);
//     res.send(user);
// });

router.delete('/delete/:id',  auth.required,async (req,res) => {
    let delUser = await userServiceObj.deleteUser(req.params.id);
    res.send(delUser);
});

module.exports = router;