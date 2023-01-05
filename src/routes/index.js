const express = require('express');
const authRoutes = require('./auth.route');
const pieRoutes = require('./pie.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/pies', pieRoutes);

module.exports = router;