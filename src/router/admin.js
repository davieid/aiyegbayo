const router = require('express').Router(),
routeController = require('../contollers')
router.get( '/articles/create', (req, res) => {
    res.render('admin/create_article')
})
module.exports = router