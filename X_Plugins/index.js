var cheerio = require('cheerio')
var S       = require('string')

function loadCheerio(html)
{
    return cheerio.load(`<div>${html}</div>`)
}
var Plugin = function(data){
    this.html = data.html
    this.selector = data.selectors
    this.title = null
    this.date_publish = null
    this.authors = null
    this.sections = null
    this.content = null
    this.text = null
    this.images = null
    this.videos = null
}

Plugin.prototype.getTitle = function(){
    var $ = loadCheerio(this.html)
    var entry = ""
    if(this.selector.title_selector.selectors.length > 0){
      for(let i = 0; i < this.selector.title_selector.selectors.length; i++){
        if($(this.selector.title_selector.selectors[i].selector).length > 0){
          if(this.selector.title_selector.ignores.length > 0){
              for(var j=0; j < this.selector.title_selector.ignores.length; j++){
                  var ignore_this = this.selector.title_selector.ignores[j];
                  $(ignore_this).remove();
              }
          }
          let txt = $(this.selector.title_selector.selectors[i].selector).html()
          txt = S(txt).stripTags().s
          txt = S(txt).decodeHTMLEntities().s
          txt = S(txt).trim().s
          entry = txt
          break;
        }else{
          entry = 'No title selector'
        }
      }
    }else{
      entry = 'No title selector'
    }
    return this.title = entry
}

Plugin.prototype.getDate = function(){
    var $ = loadCheerio(this.html)
    var entry = ""
    if(this.selector.date_publish_selector.selectors.length > 0){
      for(let i = 0; i < this.selector.date_publish_selector.selectors.length; i++){
        if($(this.selector.date_publish_selector.selectors[i].selector).length > 0){
          if(this.selector.date_publish_selector.ignores.length > 0){
              for(var j=0; j < this.selector.date_publish_selector.ignores.length; j++){
                  var ignore_this = this.selector.date_publish_selector.ignores[j];
                  $(ignore_this).remove();
              }
          }
          let txt = $(this.selector.date_publish_selector.selectors[i].selector).html()
          txt = S(txt).stripTags().s
          txt = S(txt).decodeHTMLEntities().s
          txt = S(txt).trim().s
          entry = txt
          break
        }else{
          entry = 'No date publish selector'
        }
      }
    }else{
       entry = 'No date publish selector'
    }
    return this.date_publish = entry
}

Plugin.prototype.getAuthors = function(){
    var $ = loadCheerio(this.html)
    var entry = ""
    if(this.selector.author_selector.selectors.length > 0){
      for(let i = 0; i < this.selector.author_selector.selectors.length; i++){
        if($(this.selector.author_selector.selectors[i].selector).length > 0){
          if(this.selector.author_selector.ignores.length > 0){
              for(var j=0; j < this.selector.author_selector.ignores.length; j++){
                  var ignore_this = this.selector.author_selector.ignores[j];
                  $(ignore_this).remove();
              }
          }
          let txt = $(this.selector.author_selector.selectors[i].selector).html()
          txt = S(txt).stripTags().s
          txt = S(txt).decodeHTMLEntities().s
          txt = S(txt).trim().s
          entry = txt
          break
        }else{
          entry = 'No author selector'
        }
      }
    }else{
      entry = 'No author selector'
    }
    return this.author = entry
}

Plugin.prototype.getSections = function(){
    var $ = loadCheerio(this.html)
    var entry = ""
    if(this.selector.section_selector.selectors.length > 0){
      for(let i = 0; i < this.selector.section_selector.selectors.length; i++){
        if($(this.selector.section_selector.selectors[i].selector).length > 0){
          if(this.selector.section_selector.ignores.length > 0){
              for(var j=0; j < this.selector.section_selector.ignores.length; j++){
                  var ignore_this = this.selector.section_selector.ignores[j];
                  $(ignore_this).remove();
              }
          }
          let txt = $(this.selector.section_selector.selectors[i].selector).html()
          txt = S(txt).stripTags().s
          txt = S(txt).decodeHTMLEntities().s
          txt = S(txt).trim().s
          entry = txt
          break
        }else{
          entry = 'Blog'
        }
      }
    }else{
      entry = 'Blog'
    }
    return this.sections = entry
}

Plugin.prototype.getContent =  function(){
    var $ = loadCheerio(this.html)
    var entry = ""
    if(this.selector.content_selector.selectors.length > 0){
      for(let i = 0; i < this.selector.content_selector.selectors.length; i++){
        if($(this.selector.content_selector.selectors[i].selector).length > 0){
          if(this.selector.content_selector.ignores.length > 0){
              for(var j=0; j < this.selector.content_selector.ignores.length; j++){
                  var ignore_this = this.selector.content_selector.ignores[j]
                  $(ignore_this).remove()
              }
          }
          let txt = $(this.selector.content_selector.selectors[i].selector).html()
          // txt = S(txt).collapseWhitespace().s
          // txt = S(txt).stripTags().s
          // txt = S(txt).decodeHTMLEntities().s
          txt = S(txt).trim().s
          // console.log(txt)
          entry = txt
          break
        }else{
          entry = 'No content selector'
        }
      }
    }else{
      entry = 'No content selector'
    }
    return this.content = entry
}

Plugin.prototype.getText = function(){
  let txt = this.content
  txt = S(txt).stripTags().s
  txt = S(txt).decodeHTMLEntities().s
  txt = S(txt).trim().s
  return this.text = txt
}

Plugin.prototype.getImages = function(){
  let html = cheerio.load(`<div>${this.content}</div>`)
  return html('img').map(function(){
    return html(this).attr('src')
  }).get()
}

Plugin.prototype.getVideos = function(){
  let html = cheerio.load(`<div>${this.content}</div>`)
  return html('iframe').map(function(){
    return html(this).attr('src')
  }).get()
}

module.exports = Plugin
