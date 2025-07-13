const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to the FlexStore API');
});

module.exports = router;
