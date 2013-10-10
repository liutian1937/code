(function(){
	var defaults = {
		together : false, //默认遇错误打断，显示单条错误信息
		errShow : 'alert', //错误提示，默认为alert，支持字符串(alert,single,multiple),自定义function(string || array())
		errBox : false, //错误消息div，默认不设置，为form表单中的 .error_strings
		timely : false, //实时判断，是否失去焦点判断
		ajax : false //是否采用ajax提交
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
            if(obj.constructor === Array){
                for(var i = 0; i < obj.length; i += 1) {
                    fn(i,obj[i]);
                }
            }else if(typeof obj === 'object'){
                for(var i in obj){
                    fn(i,obj[i]);
                }
            }
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
		})()
	}

	var Validator = function (frmname,options) {
		if( !(this instanceof Validator) ) {
			return new Validator(frmname,options);
		}
		this.options = Common.extend(defaults,options);
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
                return false;
            }else{
                return formobj.oldSubmit();
            }
        }
        self.ruleData = []; //缓存验证规则
        self.error = false; //是否有错误
        self.listError = {}; //缓存错误信息
	}
    Validator.prototype.addValidation = function () {
        var self = this, pos, rule, ruleExt, itemname, itemobj, data = {};
        if(arguments[0].constructor === Array){
            Common.each(arguments[0],function(key,value){
                itemname = value[0]; //获取表单的name值
                itemobj = self.formobj[itemname]; //获取itemname对象

                //判断rule是否有扩展值
                pos = value[1].search('=');
                if(pos >= 0){
                    rule = value[1].substring(0,pos);
                    ruleExt = value[1].substr(pos + 1);
                }else{
                    rule = value[1];
                }
                data = {
                    name: itemname,
                    obj : itemobj,
                    rule : rule,
                    ruleExt : ruleExt || '',
                    msg : value[2] || ''
                }
                self.ruleData.push(data);
                if(self.options.timely){
                    //如果开启实时验证
                    Common.bind(itemobj,'blur',function(){
                        self.checkSingle(data);
                    });
                };
            });
            console.log(self.ruleData);
        }
    }
	Validator.prototype.checkForm = function () {
        var self = this;
        Common.each(self.ruleData,function(key,value){
            self.checkSingle(value);
        });
        return self.error;
	}

    Validator.prototype.checkSingle = function(data) {
        var self = this;
        if(Commands[data.rule]){
            if(Commands[data.rule](data)){

            }else{
                alert (data.msg);
                self.error = true; //有错误
                //self.listError[data.name] = data.msg;
            }
        }else{
            self.error = true; //有错误
            //self.listError['params'] = '参数定义错误';
        }
    }

    var Commands = {
        'required' : function (data) {
            return Test.isEmpty(data.obj.value) ? false : true ;
        },
        'maxlength' : function (data) {
            return (data.obj.value.length > data.ruleExt) ? false : true ;
        },
        'minlength' : function (data) {
            return (data.obj.value.length < data.ruleExt) ? false : true ;
        },
        'allownum' : function (data) {
            return /[\d]/.test(data.obj.value);
        }
    }

    var Test = {
        trim : function(value) {
            //过滤前后空格
            return value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        },
        isEmpty : function (value) {
            //是否为空的判断
            value = Test.trim(value);
            return (value.length) == 0 ? true : false;
        },
        isChecked : function (objcheck,value) {
            //checkbox,radio判断是否选中某个值
            if (objcheck.length){
                for (var i = 0; i < objcheck.length; i += 1) {
                    if (objcheck[c].checked == "1" && objcheck[c].value == value){
                        return true;
                    }
                }
            }else{
                if (objcheck.checked == "1")
                {
                    return true;
                }
            }
            return false;
        },
        isSelected : function (objselect,value) {
            //select下拉选择
            for (var i = 0; i < objselect.options.length; i++)
            {
                if (objselect.options[i].selected == true && objselect.options[i].value == value)
                {
                    return true;
                }
            }
            return false;
        }
    }


    function validateInput(strValidateStr, objValue, strError)
    {

        switch (command)
        {

            case "alnum":
            case "alphanumeric":
            {
                ret = TestInputType(objValue, "[^A-Za-z0-9]", strError, objValue.name + ": Only alpha-numeric characters allowed ");
                break;
            }
            case "alnum_s":
            case "alphanumeric_space":
            {
                ret = TestInputType(objValue, "[^A-Za-z0-9\\s]", strError, objValue.name + ": Only alpha-numeric characters and space allowed ");
                break;
            }
            case "num":
            case "numeric":
            case "dec":
            case "decimal":
            {
                if (objValue.value.length > 0 && !objValue.value.match(/^[\-\+]?[\d\,]*\.?[\d]*$/))
                {
                    sfm_show_error_msg(strError, objValue);
                    ret = false;
                } //if
                break;
            }
            case "alphabetic":
            case "alpha":
            {
                ret = TestInputType(objValue, "[^A-Za-z]", strError, objValue.name + ": Only alphabetic characters allowed ");
                break;
            }
            case "alphabetic_space":
            case "alpha_s":
            {
                ret = TestInputType(objValue, "[^A-Za-z\\s]", strError, objValue.name + ": Only alphabetic characters and space allowed ");
                break;
            }
            case "email":
            {
                ret = TestEmail(objValue, strError);
                break;
            }
            case "lt":
            case "lessthan":
            {
                ret = TestLessThan(objValue, cmdvalue, strError);
                break;
            }
            case "gt":
            case "greaterthan":
            {
                ret = TestGreaterThan(objValue, cmdvalue, strError);
                break;
            }
            case "regexp":
            {
                ret = TestRegExp(objValue, cmdvalue, strError);
                break;
            }
            case "dontselect":
            {
                ret = TestDontSelect(objValue, cmdvalue, strError)
                break;
            }
            case "dontselectchk":
            {
                ret = TestDontSelectChk(objValue, cmdvalue, strError)
                break;
            }
            case "shouldselchk":
            {
                ret = TestShouldSelectChk(objValue, cmdvalue, strError)
                break;
            }
            case "selmin":
            {
                ret = TestSelMin(objValue, cmdvalue, strError);
                break;
            }
            case "selmax":
            {
                ret = TestSelMax(objValue, cmdvalue, strError);
                break;
            }
            case "selone_radio":
            case "selone":
            {
                ret = TestSelectOneRadio(objValue, strError);
                break;
            }
            case "dontselectradio":
            {
                ret = TestSelectRadio(objValue, cmdvalue, strError, false);
                break;
            }
            case "selectradio":
            {
                ret = TestSelectRadio(objValue, cmdvalue, strError, true);
                break;
            }
            //Comparisons
            case "eqelmnt":
            case "ltelmnt":
            case "leelmnt":
            case "gtelmnt":
            case "geelmnt":
            case "neelmnt":
            {
                return TestComparison(objValue, cmdvalue, command, strError);
                break;
            }
            case "req_file":
            {
                ret = TestRequiredInput(objValue, strError);
                break;
            }
            case "file_extn":
            {
                ret = TestFileExtension(objValue, cmdvalue, strError);
                break;
            }

        } //switch
        return ret;
    }

	window.Validator = Validator;
})();