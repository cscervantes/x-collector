const request = require('request'),
cheerio       = require('cheerio'),
url           = require('url'),

async         = require('async');

const _filters = require('../X_Filters')



// this function only needs 1 parameter which is url
exports.addWebsite = function(website_url, callback){
    
    request.get(website_url, function(error, response, body){
        if(error){
            callback(error)
        }else{
            const $ = cheerio.load(body)
            let urls = $('a').map(function(){
                return $(this).attr('href')
            }).get()

            let data = {}
            data.website_url = website_url
            data.fqdn = url.parse(website_url).hostname
            data.section_urls = _filters.filteredSections(urls, url.parse(website_url).hostname)
            callback(null, data)
        }
    })
}