const _       = require('lodash'),
fs            = require('fs'),
S             = require('string');

const X_Defaults = JSON.parse(fs.readFileSync('./X_Defaults/main_section_defaults.json', 'utf-8'))
const X_DefaultsArticleConfig =  JSON.parse(fs.readFileSync('./X_Defaults/section_article_defauts.json', 'utf-8'))


const removeSocialMedia = function(urls){
    return urls.filter(function(v){
      return v !== '' && v !== '#' && v !== undefined && !v.includes('mailto:') && !v.includes('facebook.com') && !v.includes('twitter.com') && !v.includes('youtube.com') && !v.includes('instagram.com') && !v.includes('google.com')
    })
  }

const cleanUrl = function(fqdn, urls){
    var new_urls = []
    for(url of urls){
        if(S(url).startsWith('//')){
            new_urls.push(`http:${url}`)
        }else if(S(url).startsWith('/')){
            new_urls.push(`http://${fqdn}/${url}`)
        }else{
            new_urls.push(url)
        }
    }
    return new_urls
}

exports.filteredSections = function(urls, fqdn){
    let removeWWW = S(fqdn).chompLeft('www.').s
    let array_urls = _.compact(_.uniq(urls))
    let cleanUrls = cleanUrl(fqdn, array_urls)
    let removeSocialMedias = removeSocialMedia(cleanUrls).filter(v=>S(v).contains(removeWWW))
    let replaceHttps = removeSocialMedias.map(v=>S(v).replaceAll('https:', 'http:').s)
    let filteredUrls = replaceHttps.map(v=>S(v).chompRight('/').s)
    let uniqFilteredUrls = _.uniq(filteredUrls)

    var filteredSections = uniqFilteredUrls

    var startWith = X_Defaults.main_section_config.startsWith
    var toStrstartWith = startWith.map(function(v){
        return '!f.includes(\''+v+'\')'
    })

    var endWith = X_Defaults.main_section_config.endsWith
    var toStrendWith = endWith.map(function(v){
        return '!f.includes(\''+v+'\')'
    })

    var containWith = X_Defaults.main_section_config.containsWith
    var toStrcontainWith = containWith.map(function(v){
        return '!f.includes(\''+v+'\')'
    })

    var exactWith = X_Defaults.main_section_config.exact
    var toStrexactWith = exactWith.map(function(v){
        return '!f.includes(\''+v+'\')'
    })

    var acceptWith = X_Defaults.main_section_config.accept_only
    var toStracceptWith = acceptWith.map(function(v){
        return 'f.includes(\''+v+'\')'
    })

    var regexInclude = X_Defaults.main_section_config.regex_include
    var toStrregexInclude = regexInclude.map(function(v){
        return 'f.search('+v+') != -1'
    })

    var regexExclude = X_Defaults.main_section_config.regex_exclude
    var toStrregexExclude = regexExclude.map(function(v){
        return 'f.search('+v+') == -1'
    })


    if(startWith.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrstartWith.join(' && '))
        })
    }
        
    if(endWith.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrendWith.join(' && '))
        })
    }

    if(containWith.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrcontainWith.join(' && '))
        })
    }

    if(exactWith.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrexactWith.join(' && '))
        })
    }

    if(acceptWith.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStracceptWith.join(' && '))
        })
    }

    if(regexInclude.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrregexInclude.join(' && '))
        })
    }

    if(regexExclude.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrregexExclude.join(' && '))
        })
    }

    fs.writeFileSync('filteredSections.json', JSON.stringify(filteredSections, null, 4), 'utf-8', function(err){
        if(err) throw err;
        console.log('Saving filtered')
    })

    return filteredSections.sort()
}

exports.filteredArticles = function(urls, fqdn){

    let removeWWW = S(fqdn).chompLeft('www.').s
    let array_urls = _.compact(_.uniq(urls))
    let cleanUrls = cleanUrl(fqdn, array_urls)
    let removeSocialMedias = removeSocialMedia(cleanUrls).filter(v=>S(v).contains(removeWWW))
    let replaceHttps = removeSocialMedias.map(v=>S(v).replaceAll('https:', 'http:').s)
    let filteredUrls = replaceHttps.map(v=>S(v).chompRight('/').s)
    let uniqFilteredUrls = _.uniq(filteredUrls)

    var filteredSections = uniqFilteredUrls

    var startWith = X_DefaultsArticleConfig.article_config.startsWith
    var toStrstartWith = startWith.map(function(v){
        return '!f.includes(\''+v+'\')'
    })

    var endWith = X_DefaultsArticleConfig.article_config.endsWith
    var toStrendWith = endWith.map(function(v){
        return '!f.includes(\''+v+'\')'
    })

    var containWith = X_DefaultsArticleConfig.article_config.containsWith
    var toStrcontainWith = containWith.map(function(v){
        return '!f.includes(\''+v+'\')'
    })

    var exactWith = X_DefaultsArticleConfig.article_config.exact
    var toStrexactWith = exactWith.map(function(v){
        return '!f.includes(\''+v+'\')'
    })

    var acceptWith = X_DefaultsArticleConfig.article_config.accept_only
    var toStracceptWith = acceptWith.map(function(v){
        return 'f.includes(\''+v+'\')'
    })

    var regexInclude = X_DefaultsArticleConfig.article_config.regex_include
    var toStrregexInclude = regexInclude.map(function(v){
        return 'f.search('+v+') != -1'
    })

    var regexExclude = X_DefaultsArticleConfig.article_config.regex_exclude
    var toStrregexExclude = regexExclude.map(function(v){
        return 'f.search('+v+') == -1'
    })


    if(startWith.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrstartWith.join(' && '))
        })
    }
        
    if(endWith.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrendWith.join(' && '))
        })
    }

    if(containWith.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrcontainWith.join(' && '))
        })
    }

    if(exactWith.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrexactWith.join(' && '))
        })
    }

    if(acceptWith.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStracceptWith.join(' && '))
        })
    }

    if(regexInclude.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrregexInclude.join(' && '))
        })
    }

    if(regexExclude.length > 0){
        var filteredSections = filteredSections.filter(function(f){
            return eval(toStrregexExclude.join(' && '))
        })
    }

    return filteredSections.sort()
}