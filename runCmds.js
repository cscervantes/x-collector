const Plugin = require('./X_Plugins')
const Command = require('./X_Cmds')
const async = require('async')

const website = 'http://daytripped-running.blogspot.com/'
console.log(Plugin)


async.waterfall([
    function(callback){
        Command.addWebsite(website, callback)
    }
], function(error, result){
    if(error){
        console.log(error)
    }else{
        console.log(result)
    }
})
