const { getUsers } = require('../../../controllers/admin/userController');

const router = require('express').Router();

router.get('/', getUsers);

module.exports = router;
