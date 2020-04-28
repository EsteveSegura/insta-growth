const fs = require('fs')

function readConfig(){
    return new Promise((resolve,reject) => {
        fs.readFile('./config.json',(err,data) => {
            if(err){
                reject(err);
            }            
            resolve(data);
        });
    });
}

function writeConfig(data){
    return new Promise((resolve,reject) => {
        fs.writeFile('./config.json',data,() => {
            resolve(true)
        })
    })
}

module.exports = { readConfig, writeConfig }