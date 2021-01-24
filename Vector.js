function Vector(x, y, z){
	
	if(x){
		this.x = x;
	}
	else{
		this.x = 0;
	}
	if(y){
		this.y = y;
	}
	else{
		this.y = 0;
	}
	if(z){
		this.z = z;
	}
	else{
		this.z = 0;
	}

	this.magnitude = Math.sqrt(Math.pow(this.x, 2) + 
		Math.pow(this.y, 2) + Math.pow(this.z, 2));

	this.ux = this.x / this.magnitude;
	this.uy = this.y / this.magnitude;
	this.uz = this.z / this.magnitude;

	this.add = function(a){
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
		return(new Vector(this.x, this.y, this.z));
		
	}

	this.sub = function(a){
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
		return(new Vector(this.x, this.y, this.z));
	}

	this.setMag = function(val){
		this.x = this.ux * val;
		this.y = this.uy * val;
		this.z = this.uz * val;
	}

	this.mul = function(a){
		this.x *= a.x;
		this.y *= a.y;
		this.z *= a.z;
	}

	this.div = function(a){
		this.x /= a.x;
		this.y /= a.y;
		this.z /= a.z;
	}

	this.magLim = function(a, b){
		if(this.mag <= a){
			this.setMag(a);
		}
		if(this.mag>=b){
			this.setMag(b);
		}
	}

	this.dist = function(b){
		return Math.sqrt(Math.pow(b.x - this.x, 2) + 
			Math.pow(b.y - this.y, 2) + Math.pow(b.z - this.z, 2));
	}	

	this.dot = function(a){
		return this.x * a.x + this.y * a.y + this.z * a.z;
	};

	this.negative = function(){
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
	};

	this.cross = function(v){
		return new Vector( 
	  		this.y * v.z - this.z * v.y,
      		this.z * v.x - this.x * v.z,
      		this.x * v.y - this.y * v.x);
	}; 

	this.globalAngle = function(){
		var u = new Vector(1, 0, 0);
		return Math.acos(this.dot(u) / this.magnitude * u.magnitude) * 57.2958;
	}

	this.angle = function(u){
		return Math.acos(this.dot(u) / this.magnitude * u.magnitude) * 57.2958;
	}

	this.normalize = function(){
		this.x = Math.ceil(this.ux);
		this.y = Math.ceil(this.uy);
		this.z = Math.ceil(this.uz);
	}

	this.fromAngle = function(phi){
		  return new Vector(Math.cos(0) * Math.cos(-phi), Math.sin(-phi), Math.sin(0) * Math.cos(-phi));

	}

	this.min = function() {
    return Math.min(Math.min(this.x, this.y), this.z);
  }
   this.max = function() {
    return Math.max(Math.max(this.x, this.y), this.z);
  }

  this.scalar = function(a){
  	this.x = this.x*a;
  	this.y = this.y*a;
  	this.z = this.z*a;
  }

  this.equalTo = function(a,b,c){
  	this.x = a;
  	this.y = b;
  	this.z = c;
  }
  this.copy = function(){
  	return(new Vector(this.x, this.y, this.z));
  }
  this.random = function(a){
  	this.x = (Math.random()-0.5)*a;
  	this.y = (Math.random()-0.5)*a;
  	this.z = (Math.random()-0.5)*a;
  }

}
