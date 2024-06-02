const express = require('express');
const router = express.Router();

const {AuthMid} = require('../middlewares/AuthMid');
const {login,signup, updateUser} = require('../controllers/Auth');

const {dashboard,playListModification} = require('../controllers/Dashboard');



router.post("/login",login);
router.post("/signup",signup);
router.put("/updateUser",updateUser);

router.put('/dashboard',AuthMid,dashboard);
router.put('/playListModification',playListModification);


module.exports = router;