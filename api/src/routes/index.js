const express = require('express');
const profilesRouter = require('./profiles');
const resortsRouter = require('./resorts');
const weatherReportsRouter = require('./weather-reports');
const roadReportsRouter = require('./road-reports');
const postsRouter = require('./posts');
const favoritesRouter = require('./favorites');
const notificationsRouter = require('./notifications');
const verificationsRouter = require('./verifications');

const router = express.Router();

router.use('/profiles', profilesRouter);
router.use('/resorts', resortsRouter);
router.use('/weather-reports', weatherReportsRouter);
router.use('/road-reports', roadReportsRouter);
router.use('/posts', postsRouter);
router.use('/favorites', favoritesRouter);
router.use('/notifications', notificationsRouter);
router.use('/verifications', verificationsRouter);

module.exports = router;
