const router = require('express').Router();
const adminRoutes = require('./admin');

router.get('/', (req, res) => {
  res.send('Welcome to the FlexStore API');
});

router.use('/admin', adminRoutes);

module.exports = router;
