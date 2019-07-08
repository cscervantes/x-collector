const Plugin = require('./X_Plugins')
const Command = require('./X_Cmds')
const async = require('async')
const fs = require('fs')
const _DefaultSelectors = JSON.parse(fs.readFileSync('X_Defaults/selectors.json', 'utf-8'))

// const website = 'http://daytripped-running.blogspot.com/'
const website = 'https://www.inquirer.net/'
// const website = 'https://www.gmanetwork.com/news/archives/just_in/'
// console.log(Plugin)


async.waterfall([
    function(callback){
        Command.addWebsite(website, callback)
    }, function(jsonResult, callback){
        let testOneArticle = jsonResult.article_urls.splice(0, 1)[0]
        async.waterfall([
            function(cb){
                Command.extractHtml(testOneArticle, cb)
            },function(html, cb){
                var jsonBody = {}
                const rawData = {}
                rawData.html = html
                rawData.selectors = _DefaultSelectors
                var raw = new Plugin(rawData)
                jsonBody.url = testOneArticle
                jsonBody.title = raw.getTitle()
                jsonBody.date_publish = raw.getDate()
                jsonBody.authors = raw.getAuthors()
                jsonBody.sections = raw.getSections()
                jsonBody.content = raw.getContent()
                jsonBody.text = raw.getText()
                jsonBody.images = raw.getImages()
                jsonBody.videos = raw.getVideos()
                jsonResult.parsedContent = jsonBody
                return cb(null, jsonResult)
            }
        ], function(error, result){
            if(error){
                return callback(error)
            }else{
                return callback(null, result)
            }
        })
    }
], function(error, result){
    if(error){
        console.log(error)
    }else{
        console.log(result)
        fs.writeFile('text.txt', result.parsedContent.text, 'utf-8', function(err){
            if(err) throw err;
            console.log('Parsed Content Saved...')
        })
    }
})
