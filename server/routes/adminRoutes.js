const express = require('express');
const router = express.Router();
const Multer = require("multer");
const { Login,PostMember,PostEvent,logout } = require('../controllers/adminController'); 

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.route('/admin/login').post(Login);
router.post('/admin/postMember',upload.single('my_file'),PostMember);
router.post('/admin/postEvent',upload.single('my_file'),PostEvent);
router.route('/admin/logout').post(logout);

module.exports = router;