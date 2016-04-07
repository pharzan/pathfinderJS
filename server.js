var http=require('http'),
    url = require('url'),
    isDefined= require('./utils.js').isDefined,
    isEmpty= require('./utils.js').isEmpty;

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
	    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
	    response.end();
	    return;
	}

	var realUrl = (request.connection.encrypted ? 'https': 'http') + '://' + request.headers.host + request.url;
	var urlParts = url.parse(realUrl,true);
	var search=urlParts.search;
	//console.log('Path:',urlParts.path,'Search:',urlParts.search,'Query',urlParts.query)
	urlParts.search=decodeURI(urlParts.search);
	console.log('here')
	pathFinder.init(request,response);
	var r=pathFinder.routeHandler(urlParts,request,response);
	
	// response.write(JSON.stringify({status:"OK",response:r,urlInfo:urlParts}));
	// response.end();
    }).listen(8001);
    console.log("server initialized");

}


	
	
var pathFinder=(function PathFinder(request,response){
    var self=this;
    if (!(this instanceof PathFinder)) 
	return new PathFinder();
    this.routes=[];
    
    this.init=function(request,response){
	this.request=request;
	this.response=response;
    };
    
    this.addRoute=function(route){
	
	var exists;
	if (isDefined(route))
	{ 
	    this.routes.map(function(exisitingRoute){
		
		if(exisitingRoute.path==route.path){
		    console.log('Route Already Exists');
		    exists=true;
		}
	    });
	    
	}
	
	if(!exists)
	    this.routes.push(route);   
	

    };
    
    this.routeHandler=function(urlParts){
	//console.log(urlParts);
	// if(!isEmpty(urlParts.search)){
	//     console.log('searchQuery',urlParts.query);
	// }
	
	var params=urlParts.pathname.split('/');
	
	params.shift();
	
	if(this.request.method==='GET'){
	    this.routes.map(function(route){
		if(route.path===params[0])
		    route.fn(this.response);
		
	    });
	    
	if(!this.response.finished)
	    self.response.end();
	}
	
	//console.log(params);
	var skip=false;
	if(params.length>1)
	    console.log('params length is bigger',params)
    
	this.request.on('data', function(chunk) {
		   
	    var data=JSON.parse(chunk.toString());
	    var d=JSON.parse(data)
	    console.log('Data Received::',d)
	    self.write('done')
	    skip=true;
	});
	
    };
    
    this.write=function (msg){
	
	var responseHeaders= {"access-control-allow-origin": "*",
			      "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS, XMODIFY",
			      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, X-HTTP-Method-Override, content-type, Accept, Key, Host',
			      'Access-Control-Allow-Headers': ' X-Requested-With, X-HTTP-Method-Override, content-type, Accept, Key,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type',
			      'Access-Control-Allow-Credentials': true,
			      "Content-Type": "application/json"};
	self.response.writeHead(200, responseHeaders);
	self.response.write(JSON.stringify({message:msg}));
	self.response.end();
	
    };
    
})();



var queryTranslator=function (query){
    
};

pathFinder.addRoute({path:'kitty',
		  fn:function (){
		      console.log('hi kitty');
		      pathFinder.write('!!!Kittty');
		  }
				 
				});

server();
