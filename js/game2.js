
/*
	第二关
*/


/*
背景层
*/

(function(w){
var _;

function Background2(){
	_=this;
	base(_,LSprite,[]);
	_.bitmap1;
	_.bitmap2;
	_.targetD=0;
}
Background2.prototype.init=function(){
	_.targetD=-game.totalHeight*4;

	addChild(_);
	_.bitmap1=new LBitmap(new LBitmapData(game.loadList["bg"]));
	_.addChild(_.bitmap1);
	_.bitmap1.y=0;
	_.bitmap2=new LBitmap(new LBitmapData(game.loadList["bg"]));
	_.addChild(_.bitmap2);
	_.bitmap2.y=-_.bitmap1.getHeight();	
}
Background2.prototype.addEvent=function(){
	_.addEventListener(LEvent.ENTER_FRAME,_.run.bind(_));
}
Background2.prototype.run=function(){

		_.bitmap1.y+=10;
		_.bitmap2.y+=10;
		_.targetD+=10;
		if(_.targetD>=0){
			_.removeAllEventListener();
			_.addEventListener(LEvent.ENTER_FRAME,target);
		};
	if(_.bitmap1.y>=_.bitmap1.getHeight()){
		_.bitmap1.y=_.bitmap2.y-_.bitmap1.getHeight();
	}
	if(_.bitmap2.y>=_.bitmap2.getHeight()){
		_.bitmap2.y=_.bitmap1.y-_.bitmap2.getHeight();
	}
	planeLayer2.run();
	meteoriteLayer2.run();
};
function target(){
	if(planeLayer2.childList[0].y>-200){
		planeLayer2.childList[0].y-=20;
	}else{
		_.removeAllEventListener();
		if(planeLayer2.count==2){
			success2.init();
		}else{
			gameover2.init();
		}
	}
};
w.backLayer2=new Background2();
})(window);


/*
	地球层
*/
(function(w){
	var _;

	function Earth(){
		_=this;
		base(_,LSprite,[]);
	}
	Earth.prototype.init=function(){
		backLayer2.addChild(_);
		_.bitmap=new LBitmap(new LBitmapData(game.loadList["earthBg"]));
		_.addChild(_.bitmap);
		_.bitmap.y=game.totalHeight-_.bitmap.getHeight();
	}

	Earth.prototype.run=function(){
		var t1=new TimelineLite();
		t1.to(_.bitmap,2,{y:"+="+_.bitmap.getHeight()});
	}
	w.EarthLayer=new Earth();
})(window);

/*
	按钮层
*/

(function(w){
	var _;
	var btnLeft,btnRight;
	function Btn2(){
		_=this;
		base(_,LSprite,[]);
	}
	Btn2.prototype.init=function(){
		backLayer2.addChild(_);
		btnLeft=new LBitmap(new LBitmapData(game.loadList["btn-left"]));
		_.btnLeft=new LButton(btnLeft);
		_.addChild(_.btnLeft);
		_.btnLeft.x=73;
		_.btnLeft.y=LGlobal.height-_.btnLeft.getHeight()-55;
		_.btnLeft.addEventListener(LMouseEvent.MOUSE_DOWN,_.leftdown.bind(_));
		_.btnLeft.addEventListener(LMouseEvent.MOUSE_UP,_.up.bind(_));
		btnRight=new LBitmap(new LBitmapData(game.loadList["btn-right"]));
		_.btnRight=new LButton(btnRight);
		_.addChild(_.btnRight);
		_.btnRight.x=LGlobal.width-_.btnRight.getWidth()-73;
		_.btnRight.y=LGlobal.height-_.btnRight.getHeight()-55;
		_.btnRight.addEventListener(LMouseEvent.MOUSE_DOWN,_.rightdown.bind(_));
		_.btnRight.addEventListener(LMouseEvent.MOUSE_UP,_.up.bind(_));
	}

	Btn2.prototype.leftdown=function(){
		planeLayer2.dir="left";
	}
	Btn2.prototype.rightdown=function(){
		planeLayer2.dir="right";
	}
	Btn2.prototype.up=function(){
		planeLayer2.dir=null;
	}
	w.btn2=new Btn2();
})(window);


/*
	飞机层
*/

(function(w){
	var _;
	var speed=10;
	var num=0;
	function Plane2(){
		_=this;
		base(_,LSprite,[]);
		_.dir=null;
		_.count;
	};
	Plane2.prototype.init=function(){
		_.count=0;
		backLayer2.addChild(_);
		_.bitmap=new LBitmap(new LBitmapData(game.loadList["plane"]));
		_.addChild(_.bitmap);
		_.bitmap.x=(LGlobal.width-_.bitmap.getWidth())/2;
		_.bitmap.y=LGlobal.height-_.bitmap.getHeight()-150;
		num=_.bitmap.x;
	}
	Plane2.prototype.run=function(){
		if(_.dir=="left"){
			num-=speed;
			if(_.bitmap.x<=-25){
				num=-25;
			}
			_.bitmap.x=num;
		}
		if(_.dir=="right"){
			num+=speed;
			if(_.bitmap.x>=LGlobal.width-_.bitmap.getWidth()+25){
				num=LGlobal.width-_.bitmap.getWidth()+25;
			}
			_.bitmap.x=num;
		}
		/*开始碰撞检测*/
		var i;
		for(i=0;i<meteoriteLayer2.childList.length;i++){
			if(_.bitmap.x+25<meteoriteLayer2.childList[i].x+meteoriteLayer2.childList[i].tx+meteoriteLayer2.childList[i].w&&
				meteoriteLayer2.childList[i].x+meteoriteLayer2.childList[i].tx<_.bitmap.x+75&&
				_.bitmap.y+17<meteoriteLayer2.childList[i].y+meteoriteLayer2.childList[i].ty+meteoriteLayer2.childList[i].h&&
				meteoriteLayer2.childList[i].y+meteoriteLayer2.childList[i].ty<_.bitmap.y+17+95){
				if(meteoriteLayer2.childList[i].name!="meteorite18"&&
					meteoriteLayer2.childList[i].name!="meteorite19"&&
					meteoriteLayer2.childList[i].name!="meteorite110"&&
					meteoriteLayer2.childList[i].name!="meteorite111"&&
					meteoriteLayer2.childList[i].name!="energy"){
					gameover2.init();
					// console.log(meteoriteLayer2.meteoriteArr[i].type);
				}else if(meteoriteLayer2.childList[i].name=="energy"){
					meteoriteLayer2.removeChild(meteoriteLayer2.childList[i]);
					_.count++;
				}
			}
		}
	}
	w.planeLayer2=new Plane2();
})(window);


/*
陨石层

*/

(function(w){
	var _;
	var posArr=[],
	recordHeight=0,
	recordX=-1;
	var num=0,
	meteoriteArr=[
			{type:"meteorite11",
			x:0,
			y:0,
			tx:56,
			ty:56,
			w:26,
			h:23},
			{type:"meteorite12",
			x:0,
			y:0,
			tx:55,
			ty:55,
			w:53,
			h:48},
			{type:"meteorite13",
			x:0,
			y:0,
			tx:60,
			ty:54,
			w:93,
			h:106},
			{type:"meteorite14",
			x:0,
			y:0,
			tx:56,
			ty:54,
			w:64,
			h:84},
			{type:"meteorite15",
			x:0,
			y:0,
			tx:54,
			ty:52,
			w:145,
			h:147},
			{type:"meteorite16",
			x:0,
			y:0,
			tx:23,
			ty:42,
			w:108,
			h:75},
			{type:"meteorite17",
			x:0,
			y:0,
			tx:52,
			ty:54,
			w:90,
			h:105},
			{type:"meteorite18",
			x:0,
			y:0,
			tx:0,
			ty:0,
			w:80,
			h:109},
			{type:"meteorite19",
			x:0,
			y:0,
			tx:0,
			ty:0,
			w:80,
			h:109},
			{type:"meteorite110",
			x:0,
			y:0,
			tx:0,
			ty:0,
			w:80,
			h:109},
			{type:"meteorite111",
			x:0,
			y:0,
			tx:0,
			ty:0,
			w:80,
			h:109},
			{
			type:"energy",
			x:0,
			y:0,
			tx:82,
			ty:79,
			w:75,
			h:75
			},{
			type:"energy",
			x:0,
			y:0,
			tx:82,
			ty:79,
			w:75,
			h:75
			}
		];
	for(var i=0;i<meteoriteArr.length;i++){
		posArr.push(i);
	};
	function Meteorite2(){
		_=this;
		base(_,LSprite,[]);	
	};
	Meteorite2.prototype.arr=function(){
		/*呵呵，记录忘了重置*/
		recordHeight=0;
		for(var i=0;i<meteoriteArr.length;i++){
			meteoriteArr[i].x=0;
			meteoriteArr[i].y=0;
		}
	}
	Meteorite2.prototype.init=function(){
		_.arr();
		posArr.sort(function(a,b){
			return Math.random()>0.5?-1:1;
		});
		
		backLayer2.addChild(_);
		var i,bitmap;
		for(i=0;i<meteoriteArr.length;i++){
			meteoriteArr[posArr[i]].x=Math.random()*(game.totalWidth-meteoriteArr[posArr[i]].tx-meteoriteArr[posArr[i]].w);
			if(i-1>=0){
				while(meteoriteArr[posArr[i-1]].x<meteoriteArr[posArr[i]].x+meteoriteArr[posArr[i]].w&&meteoriteArr[posArr[i]].x<meteoriteArr[posArr[i-1]].x+meteoriteArr[posArr[i-1]].w){
					meteoriteArr[posArr[i]].x=Math.random()*(game.totalWidth-meteoriteArr[posArr[i]].tx-meteoriteArr[posArr[i]].w);
					}
				}
			meteoriteArr[posArr[i]].y=0;
			meteoriteArr[posArr[i]].y=-game.totalHeight*3+recordHeight+Math.random()*200;
			recordHeight=meteoriteArr[posArr[i]].h+game.totalHeight*3+meteoriteArr[posArr[i]].y+50;
		}
		for(i=0;i<meteoriteArr.length;i++){
			bitmap=new LBitmap(new LBitmapData(game.loadList[meteoriteArr[i].type]));
			bitmap.name=meteoriteArr[i].type;
			bitmap.tx=meteoriteArr[i].tx;
			bitmap.ty=meteoriteArr[i].ty;
			bitmap.w=meteoriteArr[i].w;
			bitmap.h=meteoriteArr[i].h;
			bitmap.x=meteoriteArr[i].x;
			bitmap.y=meteoriteArr[i].y;
			_.addChild(bitmap);
		}
	}
	Meteorite2.prototype.run=function(){
		var i;
		for(i=0;i<_.childList.length;i++){
			_.childList[i].y+=10;
		}
	}
	w.meteoriteLayer2=new Meteorite2();
})(window);

/*游戏结束*/

(function(w){
	var _;
	function GameOver2(){
		_=this;
		base(_,LSprite,[]);

	}
	GameOver2.prototype.init=function(){
		backLayer2.die();
		backLayer2.removeAllChild();
		meteoriteLayer2.removeAllChild();
		EarthLayer.removeAllChild();
		planeLayer2.removeAllChild();
		planeLayer2.dir=null;
		backLayer2.addChild(_);
		var bitmap=new LBitmap(new LBitmapData(game.loadList["failBg"]));
		_.addChild(bitmap);
		var sprite,i,btp,j;
		for(i=4;i<=5;i++){
			sprite=new LSprite();
			_.addChild(sprite);
			if((i-3)<=planeLayer2.count){
				btp=new LBitmap(new LBitmapData(game.loadList["prize0"+i+"-a"]));
			}else{
				btp=new LBitmap(new LBitmapData(game.loadList["prize0"+i]));
			}
			sprite.addChild(btp);
			sprite.y=405+(i-4)*btp.getHeight();
			sprite.x=(game.totalWidth-btp.getWidth())/2;
			sprite.name="p0"+i;
			sprite.addEventListener(LMouseEvent.MOUSE_DOWN,down);
		}
		_.restart();
	}
	GameOver2.prototype.restart=function(){
		var click=new LBitmap(new LBitmapData(game.loadList["againBtn"]));
		_.btn=new LButton(click);
		_.btn.x=206;
		_.btn.y=886;
		_.addChild(_.btn);
		_.btn.addEventListener(LMouseEvent.MOUSE_DOWN,_.reDown.bind(_));
	}
	GameOver2.prototype.reDown=function(){
		backLayer2.die();
		backLayer2.removeAllChild();
		backLayer2.init();
		EarthLayer.init();
		EarthLayer.run();
		meteoriteLayer2.init();
		btn2.init();
		planeLayer2.init();
		backLayer2.addEvent();
	}
	function down(){
		prize.name=this.sp.name;
		prize.show();
	}
	w.gameover2=new GameOver2();
})(window);

/*
	通关层
*/

(function(w){
	var _;
	function Success2(){
		_=this;
		base(_,LSprite,[]);
		_.offOn;
	};
	Success2.prototype.init=function(){
		_.offOn=true;
		backLayer2.die();
		backLayer2.removeAllChild();
		meteoriteLayer2.removeAllChild();
		EarthLayer.removeAllChild();
		planeLayer2.removeAllChild();
		planeLayer2.dir=null;
		backLayer2.addChild(_);
		var bitmap=new LBitmap(new LBitmapData(game.loadList["success01"]));
		_.addChild(bitmap);
		var sprite,i,btp,j;
		for(i=4;i<=5;i++){
			sprite=new LSprite();
			_.addChild(sprite);
			btp=new LBitmap(new LBitmapData(game.loadList["prize0"+i+"-a"]));
			sprite.addChild(btp);
			sprite.y=405+(i-4)*btp.getHeight();
			sprite.x=(game.totalWidth-btp.getWidth())/2;
			sprite.name="p0"+i;
			sprite.addEventListener(LMouseEvent.MOUSE_DOWN,down);
		}
		_.next();
	};

	Success2.prototype.next=function(){
		var click=new LBitmap(new LBitmapData(game.loadList["nextBtn"]));
		_.btn=new LButton(click);
		_.btn.x=206;
		_.btn.y=886;
		_.addChild(_.btn);
		_.btn.addEventListener(LMouseEvent.MOUSE_DOWN,_.reDown.bind(_));
	}

	Success2.prototype.reDown=function(){
		console.log(1);
		if(_.offOn){
			_.offOn=false;
			/*关数*/
			game.stage++;
		}
		backLayer2.die();
		backLayer2.removeAllChild();
		backLayer3.init();
		planetLayer.init();
		planetLayer.run();
		meteoriteLayer3.init();
		btn3.init();
		planeLayer3.init();
		backLayer3.addEvent();
	}

	function down(){
		prize.name=this.sp.name;
		prize.show();
	}
	w.success2=new Success2();
})(window);



