const express = require('express');
const router = express.Router();
const configUtils = require('../utils/configUtils')
router.get('/' , (req,res) => {
    res.render('index.ejs');
});

router.get('/streaming' , (req,res) => {
    res.render('streaming.ejs');
});

router.get('/list' , (req,res) => {
    res.render('listposts.ejs');
});

router.get('/followunfollow' , (req,res) => {
    res.render('followunfollow.ejs');
})

router.get('/config', async(req,res) => {
    let config = await configUtils.readConfig()
    //console.log(config.toString('ascii').replace('\n',''))
    res.render('config.ejs',{
        configFile : config.toString('ascii').replace(/(\r\n|\n|\r)/gm," ")
    })
})

router.post('/config', async(req,res) => {
    configUtils.writeConfig(JSON.stringify(req.body.config).trim())
    res.json({"message" : req.body})
})

module.exports = router;