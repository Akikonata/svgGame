//用于存储各种形状
var shape={
	//每个形状两帧
	fishRole:function(){
		this.path=[{d:"M0 0 l60 60 l-60 60 z",f:"yellow"},{d:"M-30 20 l40 40 l-40 40",f:"yellow"}];//存储路径模板
		this.r=45;//检测区域的宽
		this.cx=15;
		this.cy=60;
		this.Move=function(disX,disY){
			//移动路径组
			this.path.forEach(function(o){
				var len=o.d.length;
				var oX='',oY='',change=false,Cur;
				for(var i=1;i<o.d.length;i++){
					if(!change&&o.d[i]!=" "){oX+=o.d[i];}
					else if(!change&&o.d[i]==" "){change=true;}
					else if(change&&o.d[i]!=" "){oY+=o.d[i];}
					else {Cur=i;break;}
				}
				oX=parseInt(oX)+disX;
				oY=parseInt(oY)+disY;
				//console.log(oX,oY,Cur);
				var newPos=oX+" "+oY,
				    oldPos=o.d.substr(1,Cur-1);
				o.d=o.d.replace(oldPos,newPos);
			});
			//修改圆心值
			this.cx+=disX;
			this.cy+=disY;
			//console.log(this.cx,this.cy);
		}
	}
}