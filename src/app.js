const Request=require("request");


Request.post({
    "headers":{"content-type":"application/json"},
    "url": "http://httpbin.org/post",
    "body":JSON.stringify({
        "firstname":"Nic",
        "lastname":"mahame"
    })
}, (error, response, body)=>{
    if(error){
        return console.dir(error);
    }
    console.log(JSON.parse(body));
})