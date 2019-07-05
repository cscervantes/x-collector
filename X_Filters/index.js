const _             = require('lodash'),
S             = require('string');

exports.filteredSections = function(urls, fqdn){
    let array_urls = _.compact(_.uniq(urls))
    return array_urls.filter(v=>S(v).contains(fqdn))
}

exports.filteredArticles = function(urls, fqdn){

}