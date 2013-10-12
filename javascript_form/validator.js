(function(){
	var defaults = {
		together : false, //默认遇错误打断，显示单条错误信息
		errShow : 'alert', //错误提示，默认为alert，支持字符串(alert,single,multiple),自定义function(string || array())
		errBox : false, //错误消息div，默认不设置，为form表单中的 .error_strings
		timely : false //实时判断，是否失去焦点判断
	}
    var Common = {
		extend : function (from,to){
			var i, obj = {};
			for(i in from){
				obj[i] = to[i] ? to[i] : from[i];
			}
			return obj;
		},
        each : function (obj,fn) {
            var ret;
            if(obj.constructor === Array){
                for(var i = 0; i < obj.length; i += 1) {
                    ret = fn(i,obj[i]);
                    if(ret == 'break'){
                        return false;
                    }
                }
            }else if(typeof obj === 'object'){
                for(var i in obj){
                    ret = fn(i,obj[i]);
                    if(ret  == 'break'){
                        return false;
                    }
                }
            }
        },
        inArray : function (val,arr) {
            var i = 0, len = arr.length, ret = false, o = {};
            for( ; i < len; i += 1) {
                o[arr[i]] = true;
            }
            return o[val];
        },
        hasClass : function (element,value) {
            var reg = new RegExp('(\\s|^)' + value + '(\\s|$)');
            return element.className.match(reg);
        },
        insertAfter : function(newChild,refChild){
            var parElem=refChild.parentNode;
            if(parElem.lastChild==refChild){
                refChild.appendChild(newChild);
            }else{
                parElem.insertBefore(newChild,refChild.nextSibling);
            }
        },
        getErrBox : function (obj,tagname,classname) {
            var boxList = obj.parentNode.getElementsByTagName(tagname), i = 0, len = boxList.length, ret;
            if(len > 0){
                for ( ; i < len; i += 1){
                    if(Common.hasClass(boxList[i],classname)) {
                        ret = boxList[i];
                        return false;
                    }
                }
            }
            if(ret){
                return ret;
            }else{
                var elem = document.createElement(tagname);
                elem.className = classname;
                Common.insertAfter(elem,obj);
                return elem;
            }
        },
        addMsg : function (obj,msg) {
            obj.style.display = 'inline-block';
            obj.innerHTML = msg;
        },
        bind : (function() {
			if (window.addEventListener) {
				return function(el, type, fn, capture) {
					el.bindFn = {};
					el.addEventListener(type, function(){
						fn();
						el.bindFn[type] = el.bindFn[type] || [];
						el.bindFn[type].push(arguments.callee);
					}, capture);
				};
			} else if (window.attachEvent) {
				return function(el, type, fn, capture) {
					el.bindFn = {};
					el.attachEvent("on" + type, function(){
						fn();
						el.bindFn[type] = el.bindFn[type] || [];
						el.bindFn[type].push(arguments.callee);
					});
				};
			}
		})(),
		unbind : (function(){
			if (window.addEventListener) {
				return function(el, type ) {
					if(el.bindFn && el.bindFn[type]){
						var i = 0, len = el.bindFn[type].length;
						for (i; i<len ; i += 1){
							el.removeEventListener(type, el.bindFn[type][i]);
						}
					}else{
						el.removeEventListener(type);
					};
				};
			} else if (window.attachEvent) {
				return function(el, type) {
					if(el.bindFn && el.bindFn[type]){
						var i = 0, len = el.bindFn[type].length;
						for (i; i<len ; i += 1){
							el.detachEvent("on" + type, el.bindFn[type][i]);
						}
					}else{
						el.detachEvent("on" + type);
					};
				};
			}
		})(),
        isEmpty : function (value) {
            //是否为空的判断
            value = value.replace(/(^\s*)|(\s*$)/g,"");
            return (value.length) == 0 ? true : false;
        }
	}

	var Validator = function (frmname,options) {
		if( !(this instanceof Validator) ) {
			return new Validator(frmname,options);
		}
		this.options = Common.extend(defaults,options);
//        console.log(typeof this.options.errShow); //打印errShow的类型
        this.formobj = document.forms[frmname];
		if(!this.formobj){
			alert("找不到表单" + frmname);
			return;
		}
		this.init();
	}
	Validator.prototype.init = function () {
		//初始化
		var self = this, formobj = this.formobj;
		formobj.oldSubmit = null; //原始方法
		if( formobj.onsubmit ){
			formobj.oldSubmit = formobj.onsubmit;
			formobj.onsubmit = null;
		}
        formobj.onsubmit = function () {
            if(self.checkForm()){
                self.showError();
                return false;
            }else{
                return formobj.oldSubmit();
            }
        }
        self.ruleData = []; //缓存验证规则
        self.errObjList = {}; //缓存显示错误的obj对象

        self.errorHash = {}; //缓存错误的，哈希表
        self.errorArray = []; //缓存错误的，数组

	}
    Validator.prototype.addValidation = function () {
        var self = this, pos, rule, ruleExt, itemname, itemobj, data = {};
        if(arguments[0].constructor === Array){
            Common.each(arguments[0],function(key,value){
                itemname = value[0]; //获取表单的name值
                itemobj = self.formobj[itemname]; //获取itemname对象
                if(!itemobj){
                    return 'break';
                }
                //判断rule是否有扩展值
                pos = value[1].search('=');
                if(pos >= 0){
                    rule = value[1].substring(0,pos);
                    ruleExt = value[1].substr(pos + 1);
                    ruleExt = isNaN(ruleExt) ? ruleExt : parseInt(ruleExt);
                    if(/^('|")\w+/.test(ruleExt)){
                        ruleExt = ruleExt.replace(/['"]/g,"").split('|');
                    }
//                    console.log(ruleExt);
                }else{
                    rule = value[1];
                }
                data = {
                    name: itemname,
                    obj : itemobj,
                    rule : rule,
                    ruleExt : ruleExt !== false ? ruleExt : '',
                    msg : value[2] || ''
                }
                self.ruleData.push(data);
                if(self.options.timely){
                    //如果开启实时验证
                    (function(params){
                        Common.bind(itemobj,'blur',function(){
                            self.checkSingle(params);
                            Common.each(self.errorArray,function(key,value){
                                self.showErrorSingle(value);
                            });
                        });
                    })(data);
                };
            });
            console.log(self.ruleData);
        }
    }
	Validator.prototype.checkForm = function () {
        var self = this;
        self.errorHash = {}; //缓存错误的，哈希表
        self.errorArray = []; //缓存错误的，数组
        self.hideError(); //隐藏错误
        Common.each(self.ruleData,function(key,value){
            if(self.options.together){
                //如果检测所有错误
                self.checkSingle(value);
            }else{
                if(self.errorArray.length < 1){
                    self.checkSingle(value);
                }else{
                    return 'break';
                }
            }
        });
        return self.errorArray.length > 0 ? true : false ;
	}

    Validator.prototype.checkSingle = function(data) {
        var self = this;
        if(Commands[data.rule]){
            if(!Commands[data.rule].call(self,data)){
                //如果验证没有通过，将这条记录缓存到错误列表
                if(!self.errorHash[data.name]){
                    self.errorHash[data.name] = true;
                    self.errorArray.push(data);
                }
            }
        }else{
//            console.log(data.rule);
            self.errorHash['V_params'] = true;
            self.errorArray.push({
                msg : '参数定义错误'
            });
        }
    }
    Validator.prototype.showError = function () {
        var self = this, msgArray = [], split;

        if(typeof self.options.errShow == 'function'){
            //如果错误形式为函数的话，直接返回错误数组
            self.options.errShow(self.errorArray);
        }else{
            switch(self.options.errShow){
                case 'alert':
                case 'multiple':
                    Common.each(self.errorArray,function(key,value){
                        msgArray.push(value.msg);
                    });
                    if(self.options.errShow == 'alert'){
                        alert(msgArray.join('\n'));
                    }else{
                        self.showErrorBox(self.formobj,msgArray.join('<br/>'));
                    }
                    break;
                case 'single':
                    Common.each(self.errorArray,function(key,value){
                        self.showErrorSingle(value);
                    });
                    break;
            }
        }
    }
    Validator.prototype.showErrorSingle = function (data){
        var self = this, obj = data.obj, msg = data.msg, name = data.name;
        if(!self.errObjList[name]){
            if(obj.tagName != 'SELECT' && obj.length){
                obj = obj[obj.length-1];
            }
            self.errObjList[name] = Common.getErrBox(obj,'span','error_strings');
        }
        Common.addMsg(self.errObjList[name],msg);
    }
    Validator.prototype.showErrorBox = function (obj,msg) {
        var self = this, divList = obj.parentNode.getElementsByTagName('div');
        if(self.errGlobalObj){
            self.errGlobalObj.innerHTML = msg;
        }else{
            for(var i = 0; i < divList.length; i += 1){
                if(Common.hasClass(divList[i],'error_strings')){
                    self.errGlobalObj = divList[i];
                    Common.addMsg(self.errGlobalObj,msg);
                    return false;
                }
            }
            if(!self.errGlobalObj){
                self.errGlobalObj = document.createElement('div');
                self.errGlobalObj.className = 'error_strings';
                self.errGlobalObj.innerHTML = msg;
                Common.insertAfter(self.errGlobalObj,obj);
            }
        }
    }
    Validator.prototype.hideError = function () {
        var self = this;
        if(self.errGlobalObj){
            self.errGlobalObj.style.display = 'none';
        }
        if(self.errObjList){
            Common.each(self.errObjList,function(key,value){
                value.style.display = 'none';
            });
        }
    }


    //command验证规则，进行非空的验证。如果为空不验证
    var Commands = {
        'required' : function (data) {
            return Common.isEmpty(data.obj.value) ? false : true ;
        },
        'maxlength' : function (data) {
            return Common.isEmpty(data.obj.value) ? true : data.obj.value.length < data.ruleExt ;
        },
        'minlength' : function (data) {
            return Common.isEmpty(data.obj.value) ? true : data.obj.value.length > data.ruleExt ;
        },
        'number' : function (data) {
            return Common.isEmpty(data.obj.value) ? true : /^[\d]+$/.test(data.obj.value);
        },
        'alpha' : function (data) {
            return Common.isEmpty(data.obj.value) ? true : /^[A-Za-z]+$/.test(data.obj.value);
        },
        'string' : function (data) {
            return Common.isEmpty(data.obj.value) ? true : /^\\w+$/.test(data.obj.value)
        },
        'email' : function (data) {
            return Common.isEmpty(data.obj.value) ? true : /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/.test(data.obj.value);
        },
        'telphone' : function (data) {
            return Common.isEmpty(data.obj.value) ? true : /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(data.obj.value);
        },
        'mobile' : function (data) {
            return Common.isEmpty(data.obj.value) ? true : /^0?1(3|5|8)\d{9}$/.test(data.obj.value);
        },
        'lessthan' : function (data) {
            var compare = typeof data.ruleExt == 'number' ? data.ruleExt : parseInt(this.formobj[data.ruleExt].value);
            return parseInt(data.obj.value) < compare;
        },
        'greaterthan' : function (data) {
            var compare = typeof data.ruleExt == 'number' ? data.ruleExt : parseInt(this.formobj[data.ruleExt].value);
            return parseInt(data.obj.value) > compare;
        },
        'equal' : function (data) {
            var val = data.obj.value, ext = data.ruleExt, self = this;
            return typeof ext == 'number' ?
            (function(){
                return parseInt(val) == ext ;
            })() :
            (function(){
                if(ext.constructor === Array){
                    var ret = true;
                    for (var i = 0; i < ext.length; i += 1){
                        if(val == ext[i]){
                            ret = false;
                            return false;
                        }
                    }
                    return ret;
                }else{
                    return val == self.formobj[ext].value;
                }
            })();
        },
        'unequal' : function (data) {
            var val = data.obj.value, ext = data.ruleExt, self = this;
            return typeof ext == 'number' ?
            (function(){
                return parseInt(val) != ext ;
            })() :
            (function(){
                if(ext.constructor === Array){
                    var ret = true;
                    for (var i = 0; i < ext.length; i += 1){
                        if(val == ext[i]){
                            ret = false;
                            return false;
                        }
                    }
                    return ret;
                }else{
                   return val != self.formobj[ext].value;
                }
            })();
        },
        'notselect' : function (data) {
            return data.obj.tagName == 'SELECT' ? (function(){
                var index = data.obj.selectedIndex;
                return data.obj.options[index].value != data.ruleExt;
            })() :
            (function(){
                var objArr = data.obj, ret = true;
                if (objArr.length){
                    if(data.ruleExt && data.ruleExt.constructor === Array){
                        checklen = data.ruleExt.length;
                        for (var i = 0; i < objArr.length; i += 1) {
                            if (objArr[i].checked == true && Common.inArray(objArr[i].value,data.ruleExt)){
                                ret = false;
                                return false;
                            }
                        }
                    }else{
                        for (var i = 0; i < objArr.length; i += 1) {
                            if (objArr[i].checked == true){
                                if(data.ruleExt === undefined){
                                    ret = false;
                                    return false;
                                }else if(objArr[i].value == data.ruleExt){
                                    ret = false;
                                    return false;
                                }
                            }
                        }
                    }
                }else{
                    if (objArr.checked == true){
//                        objArr.value == data.ruleExt 一个对象时，是否判断是否等于设置的值
                        ret = false;
                    }
                }

                return ret;
            })();
        },
        'shouldselect' : function (data) {
            var objArr = data.obj, ret = false, checklen = 0, retNum = 0;
            if (objArr.length){
                if(data.ruleExt && data.ruleExt.constructor === Array){
                    checklen = data.ruleExt.length;
                    for (var i = 0; i < objArr.length; i += 1) {
                        if (objArr[i].checked == true && Common.inArray(objArr[i].value,data.ruleExt)){
                            retNum += 1;
                        }
                    }
                    ret = (checklen === retNum)?true:false;
                }else{
                    for (var i = 0; i < objArr.length; i += 1) {
                        if (objArr[i].checked == true){
                            if(data.ruleExt === undefined){
                                ret = true;
                            }else if(objArr[i].value == data.ruleExt){
                                ret = true;
                            }
                        }
                    }
                }
            }else{
                if (objArr.checked == true){
                    ret = true;
                }
            }
            return ret;
        },
		'minselect' : function (data) {
			var objArr = data.obj, checklen = 0;
			if(objArr.length){
				for(var i = 0; i < objArr.length; i += 1) {
					if(objArr[i].checked == true) {
						checklen += 1;
					}
				}
			}else{
				if (objArr.checked == true){
                    checklen += 1;
                }
			}
			return checklen >= data.ruleExt;
		},
		'maxselect' : function (data) {
			var objArr = data.obj, checklen = 0;
			if(objArr.length){
				for(var i = 0; i < objArr.length; i += 1) {
					if(objArr[i].checked == true) {
						checklen += 1;
					}
				}
			}else{
				if (objArr.checked == true){
                    checklen += 1;
                }
			}
			return checklen <= data.ruleExt;
		}
    }
	window.Validator = Validator;
})();