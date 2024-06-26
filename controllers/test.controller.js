const models = require('../models');

async function test(req,res){

    //one to one 1:1 - user can have one address

    // one to many- 1:m user has many posts

    //many to many - m:m a post belong to many categories

    //one to one
    const user = await models.User.findByPk(12)


    res.status(200).json({
        data:user
    });
}






module.exports={
    test:test
}