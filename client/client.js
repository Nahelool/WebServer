var socketServerUrl = ""
var hostToLive = "http://localhost"

var socket = require('socket.io-client')(socketServerUrl)
const { response } = require('express')
const superagent = require('superagent')

socket.on('connect',function(){
    console.log("connected");

})

socket.on('disconnect',function(){
    console.log("connection lost");
    
})

socket.on('page-request', function(data){
    var path = data.pathname
    var method = data.method
    var params = data.params

    var localhostUrl = hostToLive + path

    if(method=="get")executeGet(localhostUrl,params)
    else if(method=="post")executePost(localhostUrl,params)
})

function executeGet(url,prms){
    superagent.get(url)
    .query(params)
    .end((err,response)=>{
        if (err){return console.log(err)}
        socket.emit('page-response', response.text)
    })
}

function executePost(url,prms){
    superagent.post(url)
    .query(params)
    .end((err,response)=>{
        if (err){return console.log(err)}
        socket.emit('page-response', response.text)
    })
}