const router = require('express').Router(),
routeController = require('../contollers')
router.get( '/', routeController.Home)
router.get('/top-10', ( req, res)=>{
    res.render('journal/top-10', {
        title: 'The most secured cold wallets in the market',
        description: `
            Because cryptocurrency is a complicated topic, 
            using a cold wallet is the best method to keep 
            it secure. An offline device known as a cold 
            wallet is used to store the private keys 
            required to access cryptocurrency funds. 
            However, there are other choices out there that 
            combine both offline and online capabilities into 
            one solution if you want more security:
        `
    })
})
router.get('/phones', ( req, res)=>{
    res.render('journal/phones', {
        title: 'Which phones are secured for your crypto?',
        description: `
            A phone offering a secure place to store your crypto 
            assets is a good investment because they can help keep 
            you safe from hackers who may be looking for opportunities 
            to steal coins from unsuspecting users and investors alike.
        `
    })
})
router.get('/gpu', ( req, res)=>{
    res.render('journal/gpu', {
        title: 'The best GPUs in the market',
        description: ""
    })
})
router.get('/tinubu', ( req, res)=>{
    res.render('journal/tinubu', {
        title: 'Messi’s fourth time, is this his Buhari moment?',
        description: "If you are interested in football, one common question is who do you think is a better player: Lionel Messi or Christiano Ronaldo?"
    })
})
router.get('/messi', ( req, res)=>{
    res.render('journal/messi', {
        title: 'Messi’s fourth time, is this his Buhari moment?',
        description: "If you are interested in football, one common question is who do you think is a better player: Lionel Messi or Christiano Ronaldo?"
    })
})
module.exports = router