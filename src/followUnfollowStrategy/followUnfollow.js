const userInfo = require('../utils/usersInfo');
const config = require('../config.json')
const _ = require('lodash');
let socket = require('socket.io-client')('http://localhost:5000/');

async function getTargetsFromUsersScraped(ig){
    return new Promise((resolve,reject) => {
        resolve(userInfo.usersScraped);
    });
}

async function getTargetsFromTopHashtag(ig,hashtags){
    return new Promise(async (resolve,reject) => {
        let dataFromHashtags = []
        let targets = []
        
        for(let i = 0 ; i < hashtags.length ; i++){
            console.log('Looking in hashtag ' + hashtags[i])
            let actualHashtag = await topHashtagList(ig, hashtags[i]);
            dataFromHashtags.push(actualHashtag)
            await sleep(5);
        }

        //FILTER HERE
        

        dataFromHashtags = _.flatten(dataFromHashtags);
        dataFromHashtags = _.shuffle(dataFromHashtags);
        dataFromHashtags = _.take(dataFromHashtags,3)
        let usernamesFromPosts = dataFromHashtags.map((post) => {
            let username = post.user.username
            return username
        });

        for(let i = 0 ; i < usernamesFromPosts.length ;i++){
            try {
                let likers = await getRecentPostLikersByUsername(ig, usernamesFromPosts[i])

                for(let y = 0 ; y < likers.length;y++){
                    console.log(y + likers[y].username)
                    let userAboutInfo = await userInfo.getInfoAboutUser(ig,likers[y].username);
                    let ratioFollow = userAboutInfo.follower_count / userAboutInfo.following_count
                    await sleep(7)
                    //console.log(userAboutInfo)
                    console.log(`following : ${userAboutInfo.following_count} , followers ${userAboutInfo.follower_count} - ${userAboutInfo.username}`)
                    console.log(ratioFollow)
                    if(userAboutInfo.follower_count <= config.maxFollowerCountToFollowUnfollow && ratioFollow <= config.ratioFollowUnfollow){
                        console.log('ADD')
                        socket.emit('addNewFollow', {"user" : likers[y]});
                    }
                }

                targets.push(likers)
                
            } catch (error) { 
                console.log(error)
                console.log('somethin is wrong, but we keep going on!')                
            }
        }
        //socket.emit('addNewFollow', {"targets" : "asdasd"});
        resolve(targets)
    });
}

async function getTargetsFromUsername(ig,username){
    return new Promise((resolve,reject) => {

    });
}

module.exports = { getTargetsFromTopHashtag,getTargetsFromUsername,getTargetsFromUsersScraped }