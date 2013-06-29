// Garden Gnome Software - Skin
// Pano2VR pro 4.1.0/3405MS
// Filename: myskin.ggsk
// Generated 星期六 六月 29 12:32:10 2013

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
		hs+='left: -334px;';
		hs+='top:  -1px;';
		hs+='width: 400px;';
		hs+='height: 237px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0.7;';
		hs+='visibility: inherit;';
		this.__1.setAttribute('style',hs);
		this.__2=document.createElement('div');
		this.__2.ggId='\u56fe\u7247 2';
		this.__2.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__2.ggVisible=true;
		this.__2.className='ggskin ggskin_image';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  1px;';
		hs+='width: 335px;';
		hs+='height: 234px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this.__2.setAttribute('style',hs);
		this.__2__img=document.createElement('img');
		this.__2__img.setAttribute('src',basePath + 'images/_2.png');
		this.__2__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this.__2__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this.__2__img);
		this.__2.appendChild(this.__2__img);
		this.__1.appendChild(this.__2);
		this.__4=document.createElement('div');
		this.__4.ggId='\u6309\u94ae 4';
		this.__4.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__4.ggVisible=true;
		this.__4.className='ggskin ggskin_button';
		hs ='position:absolute;';
		hs+='left: 335px;';
		hs+='top:  91px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__4.setAttribute('style',hs);
		this.__4__img=document.createElement('img');
		this.__4__img.setAttribute('src',basePath + 'images/_4.png');
		this.__4__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this.__4__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this.__4__img);
		this.__4.appendChild(this.__4__img);
		this.__4.onclick=function () {
			if (me.player.transitionsDisabled) {
				me.__1.style[domTransition]='none';
			} else {
				me.__1.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me.__1.ggParameter.rx=334;me.__1.ggParameter.ry=0;
			me.__1.style[domTransform]=parameterToTransform(me.__1.ggParameter);
			if (me.player.transitionsDisabled) {
				me.__4.style[domTransition]='none';
			} else {
				me.__4.style[domTransition]='all 500ms ease-out 0ms';
			}
			me.__4.style.opacity='0';
			me.__4.style.visibility='hidden';
			if (me.player.transitionsDisabled) {
				me.__50.style[domTransition]='none';
			} else {
				me.__50.style[domTransition]='all 500ms ease-out 0ms';
			}
			me.__50.style.opacity='1';
			me.__50.style.visibility=me.__50.ggVisible?'inherit':'hidden';
		}
		this.__1.appendChild(this.__4);
		this.__50=document.createElement('div');
		this.__50.ggId='\u6309\u94ae 5';
		this.__50.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this.__50.ggVisible=true;
		this.__50.className='ggskin ggskin_button';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  91px;';
		hs+='width: 32px;';
		hs+='height: 32px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0;';
		hs+='visibility: hidden;';
		hs+='cursor: pointer;';
		this.__50.setAttribute('style',hs);
		this.__50__img=document.createElement('img');
		this.__50__img.setAttribute('src',basePath + 'images/_50.png');
		this.__50__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this.__50__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this.__50__img);
		this.__50.appendChild(this.__50__img);
		this.__50.onclick=function () {
			if (me.player.transitionsDisabled) {
				me.__1.style[domTransition]='none';
			} else {
				me.__1.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me.__1.ggParameter.rx=0;me.__1.ggParameter.ry=0;
			me.__1.style[domTransform]=parameterToTransform(me.__1.ggParameter);
			if (me.player.transitionsDisabled) {
				me.__50.style[domTransition]='none';
			} else {
				me.__50.style[domTransition]='all 500ms ease-out 0ms';
			}
			me.__50.style.opacity='0';
			me.__50.style.visibility='hidden';
			if (me.player.transitionsDisabled) {
				me.__4.style[domTransition]='none';
			} else {
				me.__4.style[domTransition]='all 500ms ease-out 0ms';
			}
			me.__4.style.opacity='1';
			me.__4.style.visibility=me.__4.ggVisible?'inherit':'hidden';
		}
		this.__1.appendChild(this.__50);
		this.__5=document.createElement('div');
		this.__5.ggId='\u6309\u94ae 5';
		this.__5.ggParameter={ rx:0,ry:0,a:0,sx:0.7,sy:0.7 };
		this.__5.ggVisible=true;
		this.__5.className='ggskin ggskin_button';
		hs ='position:absolute;';
		hs+='left: 166px;';
		hs+='top:  44px;';
		hs+='width: 42px;';
		hs+='height: 54px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this.__5.ggParameter) + ';';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__5.setAttribute('style',hs);
		this.__5__img=document.createElement('img');
		this.__5__img.setAttribute('src',basePath + 'images/_5.png');
		this.__5__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this.__5__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this.__5__img);
		this.__5.appendChild(this.__5__img);
		this.__5.onclick=function () {
			me.player.openNext("b.xml","0\/0\/0");
		}
		this.__1.appendChild(this.__5);
		this.__6=document.createElement('div');
		this.__6.ggId='\u6309\u94ae 6';
		this.__6.ggParameter={ rx:0,ry:0,a:0,sx:0.7,sy:0.7 };
		this.__6.ggVisible=true;
		this.__6.className='ggskin ggskin_button';
		hs ='position:absolute;';
		hs+='left: 22px;';
		hs+='top:  115px;';
		hs+='width: 42px;';
		hs+='height: 54px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this.__6.ggParameter) + ';';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this.__6.setAttribute('style',hs);
		this.__6__img=document.createElement('img');
		this.__6__img.setAttribute('src',basePath + 'images/_6.png');
		this.__6__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this.__6__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this.__6__img);
		this.__6.appendChild(this.__6__img);
		this.__6.onclick=function () {
			me.player.openNext("a.xml","0\/0\/0");
		}
		this.__1.appendChild(this.__6);
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