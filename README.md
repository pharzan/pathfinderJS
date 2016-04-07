# PathfinderJS
### A simple route handler for servers created with NodeJS.
Handeling http requests and creating a routing mechanisim may be accomplished using the express framework but I prefer full control of what is going on so this simple pathfinder can be used to return and route the server side in a controlled manner.
The headers are allow [cross domain access](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) and to let the server run locally on a configured web server.

### Usage:
Clone the repository in a desired location.
```sh
git clone https://github.com/pharzan/pathfinderJS.git
cd pathfinderJS
```
The route definitions are added by using the pathFinder.add(param) method with a route config as a parameter passed in to the method. Edit the server.js file to create the definitions. To start the server:
```sh 
node server.js
```
Followed should be _server initialized_ message. Now from another shell using the curl command make a GET request to the server. You can also make a request using a browser and navigating to http://127.0.0.1:8001/kitty or a tool such as [POSTMAN](https://www.getpostman.com/) can also be convinient.
```sh
curl 127.0.0.1:8001/kitty
```
By doing so since in server.js there is a kitty definition added to the routes the server will execute the function defined as the fn in the JSON.
```js
pathFinder.addRoute({path:'kitty',
            		  fn:function (){
		                    console.log('hi kitty');
		                    pathFinder.write('!!!Kittty');
		                    }
				 
				});
```
Also GET requests are handled and by making an AJAX request to http://127.0.0.1:8001/kitty you will receive a JSON response from the server.

TODO:
* complete GET method configuration adder to PathFinder and handle it
* complete PathFinder config init
