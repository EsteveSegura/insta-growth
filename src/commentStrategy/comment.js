const _ = require('lodash');
const config = require('../config.json');
const utilSave = require('../utils/saveToJson');
const userInfo = require('../utils/usersInfo');
let socket = require('socket.io-client')('http://localhost:5000/');


async function getCleanFeed(ig, hashtags) {
    return new Promise(async (resolve, reject) => {
        //Loping all hashtags, and saving it
        let allPosts = await Promise.all(hashtags.map(async (hashtag) => {
            let postsInFoodHashtags = await recentHashtagList(ig, hashtag)
            return postsInFoodHashtags;
        }))

        //Just collecting the info what we want and packing in a new object
        let cleanFeed = await allPosts.map((feed) => {
            let cleaningFeed = feed.map((objFeed) => {
                let objClean = {
                    taken_at: objFeed.taken_at,
                    media_type: objFeed.media_type,
                    pk: objFeed.pk,
                    id: objFeed.id,
                    code: objFeed.code,
                    user: objFeed.user,
                    caption: objFeed.caption,
                    comment_count: objFeed.comment_count,
                    like_count: objFeed.like_count,
                    has_liked: objFeed.has_liked,
                }
                return objClean
            });
            return cleaningFeed
        });
        resolve(_.flatten(cleanFeed));
    });
}

function sortingByCountLikesAndPosts(maxCountComments, maxCountLikes, getVideos, feed) {
    let sortingByCountLikes = feed.filter((post) => {
        if (post.like_count <= maxCountLikes) {
            if (!getVideos && post.media_type == 1) { //If is video and if we are collecting them
                return post
            } else if (getVideos) {
                return post
            }
        }
    })

    let sortingByCountComments = feed.filter((post) => {
        if (post.comment_count <= maxCountComments) {
            if (!getVideos && post.media_type == 1) { //If is video and if we are collecting them
                return post
            } else if (getVideos) {
                return post
            }
        }
    })

    let bothSortedLists = [sortingByCountLikes, sortingByCountComments]
    bothSortedLists = _.flatten(bothSortedLists)
    bothSortedLists = _.uniq(bothSortedLists)

    return bothSortedLists
}

async function sortByUserInfo(ig, feed) {
    return new Promise(async (resolve, reject) => {
        let usersFiltered = []

        for (let i = 0; i < feed.length; i++) {
            try {
                let infoAboutUser = await userInfo.getInfoAboutUser(ig,feed[i].user.username) 

                //console.log(infoAboutUser)
                if (infoAboutUser.follower_count <= config.maxFollows && infoAboutUser.media_count <= config.maxMediaCount && !infoAboutUser.is_verified) {
                    let urlPhoto = await getPhotoUrl(ig, feed[i].id)
                    
                    console.log(infoAboutUser.username)

                    let objectInfo = {
                        "userInfo" : infoAboutUser,
                        "ownFeed" : feed[i],
                        "photoUrl" : urlPhoto
                    }

                    socket.emit('addNewPost', objectInfo);
                    usersFiltered.push(objectInfo)
                }
                await sleep(8)
            } catch (error) {
                console.log(error)
            }
        }
        resolve(usersFiltered)
    });
}



module.exports = { sortByUserInfo, sortingByCountLikesAndPosts, getCleanFeed }