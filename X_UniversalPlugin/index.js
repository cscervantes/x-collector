const cheerio = require('cheerio'),
S             = require('string')


function parseHTML(html){
    return cheerio.load(`<div>${html}</div>`)
}

const Plugin = function(data){
    this.html = parseHTML(data.html)
    this.title = null
    this.text = null
    this.pub_date = null
    this.sections = null
    this.authors = null
}

Plugin.prototype.getHtml = function(){
    return this.html.html()
}

Plugin.prototype.getTitle = function(){
    let entry = ''
    const TitleElements = [
        'meta[property="og:title"]', 'title', 'meta[property="og:title"]',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        
    ]
    const rawElement = this.html
    for(let e of TitleElements){
        
        if(rawElement(e).length > 0){
            console.log(e)
            if(rawElement(e).html()){
                entry = rawElement(e).html()
                entry = S(entry).collapseWhitespace().s
                entry = S(entry).stripTags().s
                entry = S(entry).decodeHTMLEntities().s
                entry = S(entry).trim().s
            }else if(rawElement(e).attr('content')){
                entry = rawElement(e).attr('content')
            }else{
                entry = 'Title is missing'
            }
            
            break
        }else{
            entry = 'Title is missing'
        }
    }
    entry = S(entry).splitLeft('|')[0].trim()
    return this.title = entry
}

Plugin.prototype.getDate = function(){
    return this.pub_date = new Date()
}

module.exports = Plugin