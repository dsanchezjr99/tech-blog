const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./routes-home.js');
const dashboardRoutes = require('./routes-dashdb.js');

//router routes

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;