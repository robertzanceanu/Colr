const Likes = require('../../model/likesModel')

module.exports = async(request, response, userId) => {
    var dict_artefact = {}
    var dict_user ={}
    likes = await Likes.find({})
    for (var key in likes)
    {
        dict_artefact[likes[key].artefactId]=0
        dict_user[likes[key].userId]=0
    }
    for( var key in likes)
    {
        for(var key2 in dict_artefact){
        if(likes[key].artefactId === key2)
        {
            dict_artefact[key2]+=1
        }
    }}
    for( var key in likes)
    {
        for(var key2 in dict_user){
        if(likes[key].userId === key2)
        {
            dict_user[key2]+=1
        }
    }}
    var items = Object.keys(dict_artefact).map(function(key) {
    return [key, dict_artefact[key]];
  });
  
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  
  var itemsUser = Object.keys(dict_user).map(function(key) {
    return [key, dict_user[key]];
  });
  
  itemsUser.sort(function(first, second) {
    return second[1] - first[1];
  });
  response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify({items,itemsUser}))
    response.end()
}