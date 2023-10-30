const express = require('express');
const router = express.Router();
const { getDetails, postSignin, postSignup } = require('../Controllers/auth');

router.post('/v1/auth/signup', postSignup);
router.post('/v1/auth/signin', postSignin);
router.get('/v1/auth/me', getDetails);

module.exports = router;
