var svgns="http://www.w3.org/2000/svg";
//定义Sprite
function Sprite(){
	
}
Sprite.prototype.rx=30;
Sprite.prototype.ry=20;
Sprite.prototype.cx=200;
Sprite.prototype.cy=320;
Sprite.prototype.id=null;

Role.prototype=Sprite.prototype;
Monster.prototype=Sprite.prototype;
function Role(){
	this.larging=true;
	this.init=function(){
		var _tmp=document.createElementNS(svgns,'ellipse');
		_tmp.setAttribute('cx',200);
		_tmp.setAttribute('cy',320);
		_tmp.setAttribute('rx',30);
		_tmp.setAttribute('ry',20);
		_tmp.setAttribute('fill','blue');
		_tmp.setAttribute('class','role');
		_tmp.setAttribute('id','r0');//设置人物的id
		this.id='r0';
		return _tmp;
    }
    this.draw=function(){
    	var tmp=document.getElementById(this.id);
    	var ry=tmp.getAttribute('ry');
    	if(this.larging){
    		tmp.setAttribute('ry',parseInt(ry)+1);
    		(tmp.getAttribute('ry')==this.rx)&&(this.larging=false);
    	}
    	else{
    		tmp.setAttribute('ry',parseInt(ry)-1);
    		(tmp.getAttribute('ry')==this.rx*2/3)&&(this.larging=true);
    	}
    }
}
function Monster(){
	this.init=function(){
		var _tmp=document.createElementNS(svgns,'ellipse');
		_tmp.setAttribute('cx',960);
		_tmp.setAttribute('cy',640*Math.random());
		_tmp.setAttribute('rx',this.rx);
		_tmp.setAttribute('ry',20);
		_tmp.setAttribute('fill','blue');
		_tmp.setAttribute('class','monster');
		//随机生成id,如果超过10次皆重复则不返回_tmp
		var times=0;
		var have_id=false;
		while(times<10){
			var h=Math.ceil(Math.random()*1000);
			if(document.getElementById('m'+h)){
				times++;
			}
			else{
				have_id=h;
				break;
			}
		}
		if(have_id){
			_tmp.setAttribute('id','m'+have_id);
			this.id='m'+have_id;
			return _tmp;
		}
			else{return false;}
	}
	this.draw=function(){
		var tmp=document.getElementById(this.id);
		var cx=tmp.getAttribute('cx');
	    tmp.setAttribute('cx',parseInt(cx)-3);
	}
	//测试是否移除元素
	this.checkandRemove=function(){
		var tmp=document.getElementById(this.id);
		if(tmp.getAttribute('cx')<-this.rx){
			document.getElementById('stage').removeChild(tmp);
			return true;
		}
		return false;
	}
}