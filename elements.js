var svgns="http://www.w3.org/2000/svg";
//定义Sprite
function Sprite(){
	
}
Sprite.prototype.speed=2;
Sprite.prototype.id=null;
Sprite.prototype.dead=false;//死亡标记
Sprite.prototype.cx=200;
Sprite.prototype.cy=320;
//两个类均继承自Sprite
Role.prototype=Sprite.prototype;
Monster.prototype=Sprite.prototype;

function Role(id){
	var Rshape=new shape.fishRole();
	this.cx=Rshape.cx;
	this.cy=Rshape.cy;
	this.r=Rshape.r;
	console.log(this.r);
	this.init=function(){
		var _tmp=document.createElementNS(svgns,'g');
		Rshape.path.forEach(
			function(o){
				PPath=document.createElementNS(svgns,'path');
				PPath.setAttribute('d',o.d);
				PPath.setAttribute('fill',o.f);
				_tmp.appendChild(PPath);
			}
		);
		_tmp.setAttribute('id',id);
		this.id=id;
		return _tmp;
    }
    this.draw=function(disX,disY){
    	Rshape.Move(disX,disY);
    	this.cx=Rshape.cx;
	    this.cy=Rshape.cy;
    	var _rg=document.getElementById(this.id).childNodes;
	    Rshape.path.forEach(function(o,index){
	    	var oldD=_rg[index].getAttribute('d');
	    	//若路径发生了改变则进行重绘
	    	if(oldD!=o.d){
	    		_rg[index].setAttribute('d',o.d);
	    	}
	    });
    }
    //测试怪物是否临近
    this.checkNear=function(m){
    	var dis=Math.sqrt(Math.pow(this.cx-m.cx,2)+Math.pow(this.cy-m.cy,2));
    	//if(dis<100)console.log(dis);
    	if(dis<(parseInt(this.r)+parseInt(m.r))){return true}
    	return false;
    }
}
function Monster(){
	this.r=15;
	this.cx=750;
    this.cy=320;
    this.danger=true;
	this.init=function(){
		var _tmp=document.createElementNS(svgns,'circle');
		_tmp.setAttribute('cx',this.cx);
		_tmp.setAttribute('cy',this.cy=640*Math.random());
		_tmp.setAttribute('r',this.r=15+Math.ceil(50*Math.random()));
		var _fill='black';
		if(this.r<40){
			this.danger=false;
			_fill='rgba('+Math.ceil(255*Math.random())+','+Math.ceil(255*Math.random())+','+Math.ceil(255*Math.random())+',1)';
		}
		_tmp.setAttribute('fill',_fill);
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
			this.speed=2+Math.ceil(5*Math.random());
			return _tmp;
		}
		else{return false;}
	}
	this.draw=function(){
		var tmp=document.getElementById(this.id);
		var cx=tmp.getAttribute('cx');
	    tmp.setAttribute('cx',this.cx=parseInt(cx)-this.speed);
	}
	//测试是否移除元素
	this.checkandRemove=function(){
		var tmp=document.getElementById(this.id);
		if(tmp.getAttribute('cx')<-this.r||this.dead){
			document.getElementById('stage').removeChild(tmp);
			return true;
		}
		return false;
	}
}