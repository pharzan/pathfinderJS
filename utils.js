exports.isDefined=function(variable){

    if (typeof variable === 'undefined' || variable === null) {
	return false;
    }
    return true;
};

exports.isEmpty=function(obj){
    
    if (obj == null) return true;

    return obj.length === 0;
    
  
};
