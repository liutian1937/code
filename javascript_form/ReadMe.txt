//    var Common = {
//		extend : function (from,to){
//			var i, obj = {};
//			for(i in from){
//				obj[i] = to[i] ? to[i] : from[i];
//			}
//			return obj;
//		},
//		bind : (function() {
//			if (window.addEventListener) {
//				return function(el, type, fn, capture) {
//					el.bindFn = {};
//					el.addEventListener(type, function(){
//						fn();
//						el.bindFn[type] = el.bindFn[type] || [];
//						el.bindFn[type].push(arguments.callee);
//					}, capture);
//				};
//			} else if (window.attachEvent) {
//				return function(el, type, fn, capture) {
//					el.bindFn = {};
//					el.attachEvent("on" + type, function(){
//						fn();
//						el.bindFn[type] = el.bindFn[type] || [];
//						el.bindFn[type].push(arguments.callee);
//					});
//				};
//			}
//		})(),
//		unbind : (function(){
//			if (window.addEventListener) {
//				return function(el, type ) {
//					if(el.bindFn && el.bindFn[type]){
//						var i = 0, len = el.bindFn[type].length;
//						for (i; i<len ; i += 1){
//							el.removeEventListener(type, el.bindFn[type][i]);
//						}
//					}else{
//						el.removeEventListener(type);
//					};
//				};
//			} else if (window.attachEvent) {
//				return function(el, type) {
//					if(el.bindFn && el.bindFn[type]){
//						var i = 0, len = el.bindFn[type].length;
//						for (i; i<len ; i += 1){
//							el.detachEvent("on" + type, el.bindFn[type][i]);
//						}
//					}else{
//						el.detachEvent("on" + type);
//					};
//				};
//			}
//		})()
//	}