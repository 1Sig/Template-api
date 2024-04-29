const router = require('express').Router();

router.get('/courtesy-route',(req,res)=> {
    res.json({message:'you have connected to BYTT UT TIL HVA PROSJEKT HETER, and it is running!'});
})

module.exports=router;