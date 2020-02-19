global.noLogo = true
require('tools-for-instagram');
const _ = require('lodash');
const utilSave = require('./utils/saveToJson');
let socket = require('socket.io-client')('http://localhost:5000/');

const commentStrategy = require('./commentStrategy/comment');
const followUnfollowStrategy = require('./followUnfollowStrategy/followUnfollow');




(async () => {
    const config = require('./config.json')
    let ig = await login();
    await setAntiBanMode(ig)

    socket.on("connect", () => {
        console.log('Bot WORKING');
    });
    
    socket.on('postComment', function(data){
        console.log(data);
        //commentMediaId(ig, data.media_id, data.commentContent)
    });
    
    socket.on('giveLike', function(data){
        console.log(data)
        //likeMediaId(ig, data.media_id)  
    });

    

    socket.on('triggerFollowUnfollow', async(data) =>{
        console.log('START followunfollow')
        let followUnfollow = await followUnfollowStrategy.getTargetsFromTopHashtag(ig,config.hashtags);
    });
    

    socket.on('triggerComments', async(data) =>{
        let feed = await commentStrategy.getCleanFeed(ig, config.hashtags);
        let sortedByPopularity = commentStrategy.sortingByCountLikesAndPosts(2, 20, false, _.take(feed,10)) //Check varibale name
        let sortedByInfoUser = await commentStrategy.sortByUserInfo(ig,sortedByPopularity)// sortByUserInfo(ig,sortedByPopularity)
    });
    
    

    //utilSave.saveVarToJson(sortedByInfoUser)
})();