const router = require('express').Router(),
authMiddleware = require('../middleware/auth'),
routeController = require('../contollers'),
multer  = require('multer'),
storage = multer.diskStorage({
    destination: ( req, file, cb) => {
        cb( null, './src/public/img/uploads/')
    },
    filename: ( req, file, cb) => {
        cb( null, Date.now()+'--'+file.originalname)
    }
}),
upload = multer({ storage: storage});

router.get('/', authMiddleware, routeController.Admin.Dashboard)
router.get('/login', routeController.Admin.Login)
router.get('/logout', routeController.Admin.Logout)
router.get('/profile', authMiddleware, routeController.Admin.Profile)
router.get('/files/uploads', authMiddleware, routeController.Admin.FilesUpload)
router.get('/profile/update', authMiddleware, routeController.Admin.profileView)
router.get('/register', routeController.Admin.Register) 
router.get('/articles/create/', authMiddleware, routeController.Admin.Create)
router.get('/articles/update/:id', authMiddleware, routeController.Admin.View)
router.post('/register/new', routeController.Admin.newAdmin) 
router.post('/profile/new', authMiddleware, routeController.Admin.newProfile) 
router.post('/login/auth', routeController.Admin.Auth) 
router.post('/articles/update/:id', authMiddleware, upload.single('image'), routeController.Admin.Update)
router.post('/articles/create/', authMiddleware, upload.single('image'), routeController.Admin.newArticle)
router.post('/files/upload/', authMiddleware, upload.single('image'), routeController.Admin.newFile)

module.exports = router