let usersScraped = []

async function getInfoAboutUser(ig,username){
    return new Promise(async (resolve,reject) => {
        let userInfo = await getUserInfo(ig, username)
        usersScraped.push(userInfo)
        resolve(userInfo)
    });
}



module.exports = { getInfoAboutUser, usersScraped }
