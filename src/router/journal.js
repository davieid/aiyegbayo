const router = require('express').Router(),
routeController = require('../contollers')

router.get( '/', routeController.Home.Home)
router.get('/articles/:id', routeController.Home.Find)
router.post('/search', routeController.Home.Search)
router.post('/newsletter', routeController.Home.Newsletter)

module.exports = router