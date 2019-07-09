/**
 * npm modules
 * 
 */
const request = require('request'),
async = require('async')
/**
 * customed modules
 * 
 */
const Command = require('./X_Cmds')
const X_UniversalPlugin = require('./X_UniversalPlugin')


// testing article
// const article = 'https://newsinfo.inquirer.net/1139490/pnp-ias-takes-over-probe-on-girls-death-in-rizal-drug-bust'
// const article = 'https://www.philstar.com/headlines/2019/07/09/1933306/philippines-gets-third-term-ioc-unesco-executive-council'
// const article = 'https://medium.com/@JSantaCL/pm2-and-memory-usage-in-node-js-apps-fd17394fcb40'
// const article = 'https://www.sunstar.com.ph/article/1813479/Manila/Local-News/Palace-clarifies-Lawmakers-have-final-say-on-Speaker'
const article = 'http://mblife.ph/35970/heres-how-filipino-languages-are-featured-in-k-drama-arthdal-chronicles/?fbclid=IwAR2OxxSO5qzcxq2sQIVOawVTZJoj1ZD6vt26BRC62bsD9iTnZ6MHm3tOFOc'
async.waterfall([
    function(cb){
        Command.extractHtml(article, cb)
    }
], function(error, result){
    if(error) throw error;
    const jsonBody = {}
    jsonBody.html = result
    jsonBody.url = article
    const Body = new X_UniversalPlugin(jsonBody)
    // console.log(Body.getHtml())
    console.log(Body.getTitle())
    console.log(Body.getDate())
})
