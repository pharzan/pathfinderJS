var http = require('http'),
    url = require('url'),
    pathFinder = require('./pathfinder.js').pathFinder;

var config = {
    PORT: 8001
};

function server() {

    http.createServer(function(request, response) {
	
        var responseHeaders = {
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS, XMODIFY",
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, X-HTTP-Method-Override, content-type, Accept, Key, Host',
            'Access-Control-Allow-Headers': ' X-Requested-With, X-HTTP-Method-Override, content-type, Accept, Key,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type',
            'Access-Control-Allow-Credentials': true,
            "Content-Type": "application/json"
        };

        //response.writeHead(200, responseHeaders);

        if (request.method === "OPTIONS") {
            // Add headers to response and send
            response.writeHead(200, responseHeaders);
            response.end();
        }

        if (request.url === '/favicon.ico') { // favicon request ignore	    
            response.writeHead(200, {
                'Content-Type': 'image/x-icon'
            });
            response.end();
            return;
        }

        var realUrl = (request.connection.encrypted ? 'https' : 'http') + '://' + request.headers.host + request.url;
        var urlParts = url.parse(realUrl, true);
        var search = urlParts.search;
        //console.log('Path:',urlParts.path,'Search:',urlParts.search,'Query',urlParts.query)
        urlParts.search = decodeURI(urlParts.search);
        
        pathFinder.init(request, response);
        var r = pathFinder.routeHandler(urlParts, request, response);

        // response.write(JSON.stringify({status:"OK",response:r,urlInfo:urlParts}));
        // response.end();
    }).listen(config.PORT);
    console.log("server initialized");

}

pathFinder.addRoute({
    path: 'kitty',
    onGet: function() {
        console.log('onGet Activated');
        pathFinder.write('hi from the kitty route config');
    },
    onPost:function(){
	console.log('onPost Activated');
	pathFinder.write('hi from on POST');
    }

});


server();
