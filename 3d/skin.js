// Garden Gnome Software - Skin
// Pano2VR pro 4.1.0/3405MS
// Filename: myskin.ggsk
// Generated 星期六 六月 29 13:17:08 2013

function pano2vrSkin(player,base) {
	var me=this;
	var flag=false;
	var nodeMarker=new Array();
	var activeNodeMarker=new Array();
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=new Array();
	this.elementMouseOver=new Array();
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	for(i=0;i<prefixes.length;i++) {
		if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
			cssPrefix='-' + prefixes[i].toLowerCase() + '-';
			domTransition=prefixes[i] + 'Transition';
			domTransform=prefixes[i] + 'Transform';
		}
	}
	
	this.player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=new Array();
		stack.push(startElement);
		while(stack.length>0) {
			e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	parameterToTransform=function(p) {
		return 'translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
	}
	
	this.findElements=function(id,regex) {
		var r=new Array();
		var stack=new Array();
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		this.__1=document.createElement('div');
		this.__1.ggId='\u5bb9\u5668 1';
		this.__1.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__1.ggVisible=true;
		this.__1.className='ggskin ggskin_container';
		hs ='position:absolute;';
		hs+='left: -335px;';
		hs+='top:  0px;';
		hs+='width: 400px;';
		hs+='height: 237px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0.9;';
		hs+='visibility: inherit;';
		this.__1.setAttribute('style',hs);
		this._pic=document.createElement('div');
		this._pic.ggId='pic';
		this._pic.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._pic.ggVisible=true;
		this._pic.className='ggskin ggskin_image';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  1px;';
		hs+='width: 335px;';
		hs+='height: 234px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._pic.setAttribute('style',hs);
		this._pic__img=document.createElement('img');
		this._pic__img.setAttribute('src',basePath + 'images/pic.png');
		this._pic__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._pic__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._pic__img);
		this._pic.appendChild(this._pic__img);
		this.__1.appendChild(this._pic);
		this._btn4=document.createElement('div');
		this._btn4.ggId='btn4';
		this._btn4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._btn4.ggVisible=true;
		this._btn4.className='ggskin ggskin_button';
		hs ='position:absolute;';
		hs+='left: 335px;';
		hs+='top:  91px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._btn4.setAttribute('style',hs);
		this._btn4__img=document.createElement('img');
		this._btn4__img.setAttribute('src',basePath + 'images/btn4.png');
		this._btn4__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._btn4__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._btn4__img);
		this._btn4.appendChild(this._btn4__img);
		this._btn4.onclick=function () {
			if (me.player.transitionsDisabled) {
				me.__1.style[domTransition]='none';
			} else {
				me.__1.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me.__1.ggParameter.rx=335;me.__1.ggParameter.ry=0;
			me.__1.style[domTransform]=parameterToTransform(me.__1.ggParameter);
			if (me.player.transitionsDisabled) {
				me._btn4.style[domTransition]='none';
			} else {
				me._btn4.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._btn4.style.opacity='0';
			me._btn4.style.visibility='hidden';
			if (me.player.transitionsDisabled) {
				me._btn5.style[domTransition]='none';
			} else {
				me._btn5.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._btn5.style.opacity='1';
			me._btn5.style.visibility=me._btn5.ggVisible?'inherit':'hidden';
		}
		this.__1.appendChild(this._btn4);
		this._btn5=document.createElement('div');
		this._btn5.ggId='btn5';
		this._btn5.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._btn5.ggVisible=true;
		this._btn5.className='ggskin ggskin_button';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  91px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0;';
		hs+='visibility: hidden;';
		hs+='cursor: pointer;';
		this._btn5.setAttribute('style',hs);
		this._btn5__img=document.createElement('img');
		this._btn5__img.setAttribute('src',basePath + 'images/btn5.png');
		this._btn5__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._btn5__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._btn5__img);
		this._btn5.appendChild(this._btn5__img);
		this._btn5.onclick=function () {
			if (me.player.transitionsDisabled) {
				me.__1.style[domTransition]='none';
			} else {
				me.__1.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me.__1.ggParameter.rx=0;me.__1.ggParameter.ry=0;
			me.__1.style[domTransform]=parameterToTransform(me.__1.ggParameter);
			if (me.player.transitionsDisabled) {
				me._btn5.style[domTransition]='none';
			} else {
				me._btn5.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._btn5.style.opacity='0';
			me._btn5.style.visibility='hidden';
			if (me.player.transitionsDisabled) {
				me._btn4.style[domTransition]='none';
			} else {
				me._btn4.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._btn4.style.opacity='1';
			me._btn4.style.visibility=me._btn4.ggVisible?'inherit':'hidden';
		}
		this.__1.appendChild(this._btn5);
		this._btn6=document.createElement('div');
		this._btn6.ggId='btn6';
		this._btn6.ggParameter={ rx:0,ry:0,a:0,sx:0.8,sy:0.8 };
		this._btn6.ggVisible=true;
		this._btn6.className='ggskin ggskin_button';
		hs ='position:absolute;';
		hs+='left: 166px;';
		hs+='top:  44px;';
		hs+='width: 42px;';
		hs+='height: 54px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this._btn6.ggParameter) + ';';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._btn6.setAttribute('style',hs);
		this._btn6__img=document.createElement('img');
		this._btn6__img.setAttribute('src',basePath + 'images/btn6.png');
		this._btn6__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._btn6__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._btn6__img);
		this._btn6.appendChild(this._btn6__img);
		this._btn6.onclick=function () {
			me.player.openNext("b.xml","0\/0\/0");
		}
		this.__1.appendChild(this._btn6);
		this._btn7=document.createElement('div');
		this._btn7.ggId='btn7';
		this._btn7.ggParameter={ rx:0,ry:0,a:0,sx:0.8,sy:0.8 };
		this._btn7.ggVisible=true;
		this._btn7.className='ggskin ggskin_button';
		hs ='position:absolute;';
		hs+='left: 22px;';
		hs+='top:  115px;';
		hs+='width: 42px;';
		hs+='height: 54px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this._btn7.ggParameter) + ';';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._btn7.setAttribute('style',hs);
		this._btn7__img=document.createElement('img');
		this._btn7__img.setAttribute('src',basePath + 'images/btn7.png');
		this._btn7__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._btn7__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._btn7__img);
		this._btn7.appendChild(this._btn7__img);
		this._btn7.onclick=function () {
			me.player.openNext("a.xml","0\/0\/0");
		}
		this.__1.appendChild(this._btn7);
		this.divSkin.appendChild(this.__1);
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
		}
		this.divSkin.ggReLoaded=function() {
		}
		this.divSkin.ggEnterFullscreen=function() {
		}
		this.divSkin.ggExitFullscreen=function() {
		}
		this.skinTimerEvent();
	};
	this.hotspotProxyClick=function(id) {
	}
	this.hotspotProxyOver=function(id) {
	}
	this.hotspotProxyOut=function(id) {
	}
	this.changeActiveNode=function(id) {
		var newMarker=new Array();
		var i,j;
		var tags=me.player.userdata.tags;
		for (i=0;i<nodeMarker.length;i++) {
			var match=false;
			if (nodeMarker[i].ggMarkerNodeId==id) match=true;
			for(j=0;j<tags.length;j++) {
				if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
			}
			if (match) {
				newMarker.push(nodeMarker[i]);
			}
		}
		for(i=0;i<activeNodeMarker.length;i++) {
			if (newMarker.indexOf(activeNodeMarker[i])<0) {
				if (activeNodeMarker[i].ggMarkerNormal) {
					activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
				}
				if (activeNodeMarker[i].ggMarkerActive) {
					activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
				}
				if (activeNodeMarker[i].ggDeactivate) {
					activeNodeMarker[i].ggDeactivate();
				}
			}
		}
		for(i=0;i<newMarker.length;i++) {
			if (activeNodeMarker.indexOf(newMarker[i])<0) {
				if (newMarker[i].ggMarkerNormal) {
					newMarker[i].ggMarkerNormal.style.visibility='hidden';
				}
				if (newMarker[i].ggMarkerActive) {
					newMarker[i].ggMarkerActive.style.visibility='inherit';
				}
				if (newMarker[i].ggActivate) {
					newMarker[i].ggActivate();
				}
			}
		}
		activeNodeMarker=newMarker;
	}
	this.skinTimerEvent=function() {
		setTimeout(function() { me.skinTimerEvent(); }, 10);
	};
	this.addSkin();
};