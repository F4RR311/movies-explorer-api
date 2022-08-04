const router = require('express').Router();
const { getUserMe, updateUserInfo } = require('../controllers/users');
const { validUserId } = require('../middlewares/validation');

router.route('/me')
    .get(getUserMe)
    .patch(validUserId, updateUserInfo);

module.exports = router;