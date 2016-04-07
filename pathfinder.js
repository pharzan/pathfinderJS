var isDefined= require('./utils.js').isDefined,
    isEmpty= require('./utils.js').isEmpty;

exports.pathFinder=(function PathFinder(request,response){
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

