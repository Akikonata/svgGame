//用于存储各种形状
var shape={
	//每个形状两帧
	fishRole:function(){
		this.path=[{d:"M0 0 l100 100 l-100 100 z",f:"red"}];//存储路径模板
		this.move=function(){}
	},
	fish2:"",
	fish3:"",
	fish4:"",
	stone1:"",
	stone2:"",
	grass:""
}