var isDefined= require('./utils.js').isDefined,
    isEmpty= require('./utils.js').isEmpty;

exports.pathFinder=(function PathFinder(request,response){
    var self=this;
    if (!(this instanceof PathFinder)) 
	return new PathFinder();
    
    this.routes=[];
    
    this.init=function(request,response,io){
	this.request=request;
	this.response=response;
	this.io=io;
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
	console.log(params)
	
	if(this.request.method==='GET'){
	    
		this.routes.map(function(route,i){
		    if(route.path===params[0])
			route.onGet(this.response);
		    if(i==self.routes.length-1)	    
			if(!self.response.finished)
			    self.write('no route found')
		});
	    
	}
	
	//console.log(params);
	
	if(params.length>1){
	    console.log('params length is bigger',params)
	    
	}
    
	this.request.on('data', function(chunk) {
	    console.log('in the on data');
	    self.routes.map(function(route,i){
		if(route.path===params[0])
		    route.onPost(this.response);
		
		if(i==self.routes.length-1)
		    if(!self.response.finished)
			self.write('no route found')
		
	    })
		   //if in here it is a POST
	    // var data=JSON.parse(chunk.toString());
	    // var d=JSON.parse(data)
	    // console.log('Data Received::',d)

	    
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

    this.emit=function(emission){
	
	emission.fn.call(this);
    };
    
})();



var queryTranslator=function (query){
    
};

