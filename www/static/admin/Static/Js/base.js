var ajaxError = false;

(function($){
	$.ajaxError = function(msg){
		ajaxError = true;
		if(!msg)
			msg = AJAX_ERROR;
		$(".ajax-loading").html(msg).addClass("ajax-error").stop(true).show();
		$(".ajax-loading").css({"opacity":1}).fadeOut(3000);
	};
	
	$.getStringLength=function(str)
	{
		str = $.trim(str);
		
		if(str=="")
			return 0; 
			
		var length=0; 
		for(var i=0;i <str.length;i++) 
		{ 
			if(str.charCodeAt(i)>255)
				length+=2; 
			else
				length++; 
		}
		
		return length;
	}
	
	$.getLengthString=function(str,length,isSpace)
	{
		if(arguments.length < 3)
			var isSpace = true; 
		
		if($.trim(str)=="")
			return "";
		
		var tempStr="";
		var strLength = 0;
		
		for(var i=0;i <str.length;i++) 
		{
			if(str.charCodeAt(i)>255)
				strLength+=2;
			else
			{
				if(str.charAt(i) == " ")
				{
					if(	isSpace)
						strLength++;	
				}
				else
					strLength++;
			}
				
			if(length >= strLength)
				tempStr += str.charAt(i);
		}
		
		return tempStr;
	}
	
	$.windowCenter=function(obj)
	{
		var windowWH = $.getWindowWH();
		var windowWidth=windowWH[0];
		var windowHeight=windowWH[1];
		var objWidth=obj.width();
		var objHeight=obj.height();
		var objTop=tooltipTop + $.getBodyScrollTop();
		var objLeft=(windowWidth - objWidth ) / 2;
		obj.css({position:"absolute",display:"block","z-index":1000,top:objTop,left:objLeft});
	}
	
	$.getBodyScrollTop=function(){
        var scrollPos; 
        if (typeof window.pageYOffset != 'undefined') { 
            scrollPos = window.pageYOffset; 
        } 
        else if (typeof document.compatMode != 'undefined' && 
            document.compatMode != 'BackCompat') { 
            scrollPos = document.documentElement.scrollTop; 
        } 
        else if (typeof document.body != 'undefined') { 
            scrollPos = document.body.scrollTop; 
        } 
        return scrollPos;
    }
	
	$.getWindowWH = function(){
		var width=$.support.cssFloat ? $(document.documentElement).width() : $(window).width();
		var height=$.support.cssFloat ? $(document.documentElement).height() : $(document).height();
		return [width,height];
	}
	
	$.checkRequire = function(value){
		var reg = /.+/;
        return reg.test($.trim(value));
	}
	
	$.minLength = function(value, length , isByte) {
		var strLength = $.trim(value).length;
		if(isByte)
			strLength = $.getStringLength(value);
			
		return strLength >= length;
	};
	
	$.maxLength = function(value, length , isByte) {
		var strLength = $.trim(value).length;
		if(isByte)
			strLength = $.getStringLength(value);
			
		return strLength <= length;
	};
	
	$.rangeLength = function(value, minLength,maxLength, isByte) {
		var strLength = $.trim(value).length;
		if(isByte)
			strLength = $.getStringLength(value);
			
		return strLength >= minLength && strLength <= maxLength;
	}
	
	$.checkMobilePhone = function(value){
		return /^(13\d{9}|18\d{9}|15\d{9})$/i.test($.trim(value));
	}
	
	$.checkPhone = function(val){
  		var flag = 0;
		val = $.trim(val);
  		var num = ".0123456789/-()";
  		for(var i = 0; i < (val.length); i++)
		{
    		tmp = val.substring(i, i + 1);
    		if(num.indexOf(tmp) < 0)
      			flag++;
 		}
  		if(flag > 0)
			return true;
		else
			return false;
	}
	
	$.checkEmail = function(val){
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; 
		return reg.test(val);
	};
	
	$.checkUrl = function(val){
		var reg = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/; 
        return reg.test(val);
	};
	
	$.checkCurrency = function(val){
		var reg = /^\d+(\.\d+)?$/; 
        return reg.test(val);
	};
	
	$.checkNumber = function(val){
		var reg = /^\d+$/; 
        return reg.test(val);
	};
	
	$.checkInteger = function(val){
		var reg = /^[-\+]?\d+$/; 
        return reg.test(val);
	};
	
	$.checkDouble = function(val){
		var reg = /^[-\+]?\d+(\.\d+)?$/; 
        return reg.test(val);
	};
	
	$.checkEnglish = function(val){
		var reg = /^[A-Za-z]+$/; 
        return reg.test(val);
	};
	
	$.checkQQMsn = function(val){
		var reg = /^[1-9]*[1-9][0-9]*$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; 
        return reg.test(val);
	};
})(jQuery);

jQuery(function($){
	$(".ajax-loading").bind('ajaxSend',function(){
		$(".ajax-loading").removeClass("ajax-error").html(AJAX_LOADING).stop(true).show();
		$(".ajax-loading").css({"opacity":1});
	});
	
	$(".ajax-loading").bind('ajaxError',function(){
		$.ajaxError();
	});
	
	$(".ajax-loading").bind('ajaxSuccess',function(){
		if(!ajaxError)
			$(".ajax-loading").hide();
		
		ajaxError = false;
	});
	
	$(".tabs-title .tt-item").click(function(){
		$(".tabs-title .tt-item").removeClass('active');
		$(this).addClass('active');
		$(".tabs-body .tabs-item").removeClass('tabs-active');
		$(".tabs-body .tabs-item[rel='"+ this.getAttribute('rel') +"']").addClass('tabs-active');
	});

	$(".table-form tr > th:first-child").addClass('first');
	
	$('a').focus(function(){
		this.blur();
	});
	
	$(".handle-btns .link-button").hover(function(){
		$(this).addClass("link-button-hover");
	},function(){
		$(this).removeClass("link-button-hover");
	});
	$(".handle-btns .img-button").hover(function(){
		$(this).addClass("img-button-hover");
	},function(){
		$(this).removeClass("img-button-hover");
	});
	
	$(".label_box input").on('change',function(){
		if(this.checked)
			$(this).parent().addClass('active');
		else
			$(this).parent().removeClass('active');
	});
});

function checkAll(id)
{
	$("#" + id + " tbody tr:not([disabled]) input[name='key']").each(function(){
		if(this.checked)
			this.checked = false;
		else
			this.checked = true;
	});
}

function viewData(obj,id,pk)
{
	var fun = function(){
		//location.href = "http://m.meijiabang.cn/#!topic/" + id;
        url= '1'== topicStatus[id]?"http://m.meijiabang.cn/#!topic/" + id:'http://m.meijiabang.cn/page/topic/index.html#topic_id='+ id;
		window.open(url);
	};
	
	setTimeout(fun,1);
}

function addData(obj, actionName)
{
    actionName = actionName || 'add';

    var fun = function(){
		location.href = APP+'?'+VAR_MODULE+'='+CURR_MODULE+'&'+VAR_CONTROLLER+'='+CURR_CONTROLLER+'&'+VAR_ACTION+'='+actionName;
	};
	
	setTimeout(fun,1);
}

function editData(obj, id, pk, actionName)
{
    actionName = actionName || 'edit';
    if(isNaN(id))
		id = $("#" + id + " input:checked[name='key']").eq(0).val();
		
	if(!id)
		return false;
		
	if(pk == null)
		pk = 'id';
	
	var fun = function(){
		location.href = APP+'?'+VAR_MODULE+'='+CURR_MODULE+'&'+VAR_CONTROLLER+'='+CURR_CONTROLLER+'&'+VAR_ACTION+'='+actionName+'&'+pk+'=' + id;
	};
	
	setTimeout(fun,1);
}

function removeImg(obj,id,field,relMod)
{
	var query = new Object();
	query.id = id;
	query.field = field;
	query.rel_mod = relMod;
	
	$.ajax({
		url: APP + '?' + VAR_MODULE + '=' + CURR_MODULE + '&'+VAR_CONTROLLER+'='+CURR_CONTROLLER+'&' + VAR_ACTION + '=deleteImg',
		type:"POST",
		cache: false,
		data:query,
		dataType:"json",
		success: function(result){
			if(result.isErr == 0)
				$(obj).parent().remove();
			else
				$.ajaxError(result.content);
		}
	});
}

function removeData(obj, id, pk, actionName)
{
    actionName = actionName || 'remove';
    var ids =  [];
	if(isNaN(id))
	{
		$("#" + id + " input:checked[name='key']").each(function(){
			ids.push(this.value);
		});
	}
	else
	{
		ids.push(id);
		var parent = $(obj).parent().parent();
		id = parent.parent().parent().attr('id');
	}
	
	ids = ids.join(',');
	if(ids == '')
		return false;
	
	if(!window.confirm(CONFIRM_DELETE))
		return false;
	
	var query = {};
	query.id = ids;
	
	$.ajax({
		url: APP + '?' + VAR_MODULE + '=' + CURR_MODULE + '&'+VAR_CONTROLLER+'='+CURR_CONTROLLER+'&' + VAR_ACTION + '='+actionName,
		type:"POST",
		cache: false,
		data:query,
		dataType:"json",
		success: function(result){
			if(result.isErr == 0)
			{
				$("#" + id + " tbody tr input[name='key']").each(function(){
					if((',' + ids + ',').indexOf(',' + this.value + ',') != -1)
					{
						parent = $(this).parent().parent();
						this.checked = false;
						$('td span,td a',parent).each(function(){
							if (typeof(this.onclick) == 'function' && this.onclick.toString() != '')
							{
								if(this.onclick.toString().indexOf('toggleStatus') != -1)
								{
									var img = $('img',this).get(0);
									img.src = img.src.replace('status','disabled');
								}
								
								this.onclick = '';
							}
						});
						
						parent.attr({"disabled":true,"title":ALREADY_REMOVE});
						$("td",parent).attr({"disabled":true}).addClass('disabled');
						$("td *",parent).attr({"disabled":true}).addClass('disabled');
					}
					
					if($("#" + id + " tbody tr:not([disabled])").length == 0)
						location.reload(true);
				});
			}
			else
				$.ajaxError(result.content);
		}
	});
}

function refreshData(){
	$.ajax({
		url: APP + '?' + VAR_MODULE + '=' + CURR_MODULE + '&'+VAR_CONTROLLER+'='+CURR_CONTROLLER+'&' + VAR_ACTION + '=refreshData',
		type:"POST",
		cache: false,
		data:{},
		dataType:"json",
		success: function(result){
			if(result.isErr == 0)
			{
				alert(result.content);
			}
			else
				$.ajaxError(result.content);
		}
	});
}

//imagePicker
(function($){
	var commonImagePickerLoaded = 0;//公共是否加载完
	var currentImagePickerLoaded = 0;//本页是否加载完
	window.uploadedImages = '';//用户页面提交时，将本页操作了的图片路径信息提交上去

	//给子iframe传递信息的对象
	window.imagePickerParam = {hide: function () {
		$('#myImagePicker').modal('hide')
	}};

	$().ready(function() {
		//选择框
		var content = '<style>#myImagePicker{z-index: 50001;}#myImagePicker .mg-b0{margin-bottom:0;}</style><div id="myImagePicker" tabindex="-1" role="dialog" data-width="840" data-hasfoot="false" data-backdrop="false" class="sui-modal hide fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">×</button><style>.pd-t0{padding:0}</style><ul class="sui-nav nav-tabs mg-b0"><li class="active"><a href="#current" data-toggle="tab" data-type="current">本页</a></li><li><a href="#common" data-toggle="tab" data-type="common">公用</a></li></ul><div class="tab-content tab-wraped pd-t0" style="padding:10px;"><div id="current" class="tab-pane active"><iframe id="image-selector-current" width="100%" height="600" style="border: none;" src="" frameborder="0"></iframe></div><div id="common" class="tab-pane"><iframe id="image-selector-common" width="100%" height="600" src="" frameborder="0" style="border: none;"></iframe></div></div></div></div></div></div>';

		//将content查到页面中
		$('body').append(content);

		//选择框取消按钮
		$('.image-helper-main .image-helper-close').bind('click', function () {
			$('.image-helper-mask').hide();
			$('.image-helper-main').hide();
		})

		//在表单提交时，插入图片信息文本框一起提交
		$('form').on('submit', function(){
			var oInput = $('<input>');

			oInput.attr({name: 'uploadedImages', type: 'hidden', value: window.uploadedImages});
			$(this).append(oInput);
		})
	});

	$.fn.imagePicker = function(options){
		var el = options.el;
		var triggerEvent = options.triggerEvent == undefined ? 'click' : options.triggerEvent;
		$(this).on(triggerEvent, function (){
			//
			$(this).attr({
				'data-toggle': 'modal',
				'data-target': '#myImagePicker'
			});

			//设置传给子iframe的参数
			if(el === 'self'){
				options.el = $(this);
			}
			window.imagePickerParam.el = options.el;
			window.imagePickerParam.mode = options.mode;
			window.imagePickerParam.format = options.format;
			window.imagePickerParam.objId = isNaN(options.objId) ? 0 : options.objId;
			window.imagePickerParam.objType = options.objType;
			window.imagePickerParam.width = options.width;
			window.imagePickerParam.height = options.height;
			if(typeof options.callback == 'function')window.imagePickerParam.callback = options.callback;

			//点击选择框各个tab看看页面是否加载过
			$('body').on('click', '#myImagePicker [data-toggle=tab]', function() {
				var type = $(this).attr('data-type');
				console.log(type);
				switch (type) {
					case 'current':
						if (currentImagePickerLoaded == 0) {
							$('#image-selector-current').attr('src', '/admin.php?c=Image&a=current&objId=' + options.objId + '&objType=' + options.objType);
							currentImagePickerLoaded = 1;
						}
						break;
					case 'common':
						if (commonImagePickerLoaded == 0) {
							$('#image-selector-common').attr('src', '/admin.php?c=Image&a=index');
							commonImagePickerLoaded = 1;
						}
						break;
					default :
					//
				}
			})
			//打开选择框时，刷新设置一下本页的数据
			$('#image-selector-current').attr('src', '/admin.php?c=Image&a=current&objId=' + options.objId + '&objType=' + options.objType);

			//打开选择框页面
			$('.image-helper-mask').show();
			$('.image-helper-main').show();

		});
	}

})(jQuery);


//初始化图片上传控件
$(function(){
	function imgTag2Src(tag,imgFormat){
		switch(imgFormat){
			case 'shortTag':
				return tag.replace(/\[IMG ([^\]]+)\]/,"https://cdn1.meijiabang.cn/$1");
			case 'url':
				return "https://cdn1.meijiabang.cn/"+tag;
			case 'path':
				return "https://cdn1.meijiabang.cn/"+tag;
		}
	}
	$('[data-module="image-upload"]').each(function(i,el){
		var imgCount = parseInt($(el).attr('data-count')) || 1000;
		var imgFormat = $(el).attr('data-format') || 'shortTag';
		var oldValue = $(el).attr('data-value');
		var oldImg = [];
		if(oldValue){
			$(oldValue.split(',')).each(function(i,val){
				oldImg.push('<div class="uploaded-image"><img src="'+imgTag2Src(val, imgFormat)+'" /><input type="hidden" name="'+$(el).attr('data-name')+(imgCount>1?'[]':'')+'" value="'+val+'"></div>');
			})
		}

		$(el).html('<div class="uploaded-wrap">'+oldImg.join('')+'</div><div class="upload-btn"><i class="sui-icon icon-touch-plus"></i></div>');
		if($(el).find('.uploaded-wrap img').length >= imgCount){
			$(el).find('.upload-btn').hide();
		}

		$(el).on('click','.upload-btn',function(){
			$(this).imagePicker({
				objType: $(el).attr('data-obj-type'),
				objId: $(el).attr('data-obj-id'),
				callback:function(obj){
					$(el).find('.uploaded-wrap').append('<div class="uploaded-image"><img src="'+obj.url+'" /><input type="hidden" name="'+$(el).attr('data-name')+(imgCount>1?'[]':'')+'" value="'+obj[imgFormat]+'"></div>');
					if($(el).find('.uploaded-wrap img').length >= imgCount){
						$(el).find('.upload-btn').hide();
					}
				}
			})
		});

		$(el).on('click','.uploaded-image',function(){
			var self = this;
			$(this).imagePicker({
				objType: $(el).attr('data-obj-type'),
				objId: $(el).attr('data-obj-id'),
				callback:function(obj){
					$(self).find('img').attr('src',obj.url);
					$(self).find('input').attr('value',obj[imgFormat]);
				}
			})
		});
	})
});



(function($){

	var options = {
		userPicker: {
			queryUrl: '/admin.php?m=Admin&c=User&a=queryDataForUserPicker',
		},
		goodsPicker: {
			queryUrl: '/admin.php?m=Admin&c=Mall&a=queryDataForGoodsPicker',
		},
	};
	var queryParam = {};
	var pickerBoxStatus = 0;

	var tpl = {
		pickerItem: '<div class="pickerItem">'+
					'<div>'+
					'<span userItem>{{name}}</span>'+
					'<span style="float: right;">'+
					'<a href="javascript:void(0);" class="sui-btn btn-bordered btn-small btn-info" pick-box-select data-id="{{id}}">选择</a>'+
					'</span>'+
					'</div>'+
					'</div>',
		pickerNoData: '<div class="pickerItem">'+
					'<div>'+
					'无结果'+
					'</div>'+
					'</div>',
		pickerLoading: '<div class="pickerItem">'+
					'<div style="text-align: center;">'+
					'<div class="sui-loading loading-xxsmall loading-inline"><i class="sui-icon icon-pc-loading"></i></div>'+
					'</div>'+
					'</div>',
		pickerPageInfo: '<div class="pickerItem">'+
					'<div style="text-align: center;" class="picker-box-page">'+
					'{{pageInfo}}'+
					'</div>',

	};

	function picker(obj, option)
	{
		var curObj = $(obj),
			p;
		var offsetInfo = curObj.offset();

		$('#pickerBox').css({top: offsetInfo.top + curObj[0].clientHeight + 4, left:offsetInfo.left - 6});
		$('#pickerBox').show();
		pickerBoxStatus = 1;
		//搜索按钮
		$('body').on('click', '[picker-box-search-btn]', function(){
			var name = $('[picker-box-name]').val();

			var type = option.type != undefined ? option.type : 0;//商品type：0为所有，1位普通商品，2位闪购商品

			queryParam = {
				queryUrl: option.queryUrl,
				param: {
					p: 1,
					name: name,
					type: type
				},
				callback: render,
			};

			console.log(queryParam);
			queryData(queryParam);
		});

		//搜索结果选择按钮
		$('body').on('click', '[pick-box-select]', function(){
			switch(option.mode){
				case 'append':
					var oldValue = curObj.val();
					if(oldValue) oldValue = oldValue+',';
					curObj.val(  + $(this).attr('data-id'));
					break;
				default:
					curObj.val($(this).attr('data-id'));
			}

			$('#pickerBox').hide();
			pickerBoxStatus = 0;
		});
	}

	function queryData(param)
	{
		$.get(param.queryUrl, param.param, param.callback, 'JSON');
	}

	function render(result)
	{
		console.log(result);
		//渲染数据
		if(result.data.length > 0){
			var html = '';
			$(result.data).each(function(i, item){
				var itemTpl = tpl.pickerItem;
				itemTpl = itemTpl.replace(/\{\{id\}\}/, item.id);
				itemTpl = itemTpl.replace(/\{\{name\}\}/, item.name.substr(0,16));

				html += itemTpl;
			});

			//分页
			if(result.pageInfo != ''){
				var pageInfoTpl = tpl.pickerPageInfo;
				pageInfoTpl = pageInfoTpl.replace(/\{\{pageInfo\}\}/, result.pageInfo);

				html += pageInfoTpl;
			}
		}else{
			html = tpl.pickerNoData;
		}

		$('#pickerBox .pickerList').html(html);
	}

	$.fn.userPicker = function(){
		$(this).on('click', function(){
			picker(this, options.userPicker);
			return false;
		})

		return this;
	}

	$.fn.goodsPicker = function(type){
		$(this).on('click', function(){
			options.goodsPicker.type = type;
			picker(this, options.goodsPicker);
			return false;
		})

		return this;
	}

	$(document).on('click', function(){
		if(pickerBoxStatus == 1){
			$('#pickerBox').hide();
			pickerBoxStatus = 0;
			return false;
		}
	})

	$(function(){
		var content = '<style>#pickerBox{position:fixed;width:260px;border:1px solid #eee;background-color:#fff;display:none;z-index:50002;}#pickerBox .sui-form{margin-bottom:0}#pickerBox>div[pick-box-search]{width:100%}#pickerBox>div[pick-box-search] input{width:86%;margin-left:6px}#pickerBox .pickerList .pickerItem{margin-left:6px;height:20px;line-height:20px;border-bottom:1px solid #ccc;padding:4px 6px;width:90%}#pickerBox .pickerList .pickerItem:last-child{margin-left:6px;height:20px;line-height:20px;border-bottom:0 solid #ccc;padding:4px 6px;width:90%}#pickerBox .picker-box-page a,#pickerBox .picker-box-page span{padding:0 4px}</style><div id="pickerBox"><div pick-box-search><div class="sui-form form-inline"><div class="input-append"><input type="text" picker-box-name placeholder="请输入名称" class="span2"><button type="button" picker-box-search-btn class="sui-btn">搜索</button></div></div></div><div class="pickerList"></div></div>';

		$('body').append(content);


		$('body').on('click', '#pickerBox', function(){
			return false;
		})

		$('body').on('click', '#pickerBox .num', function(){
			var p = $(this).html();

			queryParam.param.p = p;
			queryData(queryParam);

			return false;
		})

		$('body').on('click', '#pickerBox .next', function(){
			var p = $('#pickerBox .current').html();

			queryParam.param.p = p - 0 + 1;
			queryData(queryParam);

			return false;
		})
		$('body').on('click', '#pickerBox .prev', function(){
			var p = $('#pickerBox .current').html();

			queryParam.param.p = p - 1;
			queryData(queryParam);

			return false;
		})

	})

})(jQuery);

//========================  新框架 =======================//

App = window.App || {};
App.Util = App.Util || {};
App.Util.parseImageTag = function(val){
	val = val.replace(/\[IMG ([^\]]+)\]/g, "https://cdn1.meijiabang.cn/$1");
	return val;
};
App.Util.restoreWx135Image = function(val){
    var imgProxy = [{"scheme":"http","host":"img03.store.sogou.com","path":"/net/a/04/link","query":"url"},{"scheme":"http","host":"remote.wx135.com","path":"/oss/view","query":"d"}];
    var reg = /<img[^>]+src=["']?(https?:\/\/[^\s]+(?:\.(?:jpg|jpeg|png|gif|bmp|webp)|(?:[^\s]+?)))["']+[^\s]*?/gi;
    function parse_url(str, component) {
        //       discuss at: http://phpjs.org/functions/parse_url/
        //      original by: Steven Levithan (http://blog.stevenlevithan.com)
        // reimplemented by: Brett Zamir (http://brett-zamir.me)
        //         input by: Lorenzo Pisani
        //         input by: Tony
        //      improved by: Brett Zamir (http://brett-zamir.me)
        //             note: original by http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
        //             note: blog post at http://blog.stevenlevithan.com/archives/parseuri
        //             note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
        //             note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
        //             note: a seriously malformed URL.
        //             note: Besides function name, is essentially the same as parseUri as well as our allowing
        //             note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
        //        example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
        //        returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}

        var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
                'relative', 'path', 'directory', 'file', 'query', 'fragment'
            ],
            ini = (this.php_js && this.php_js.ini) || {},
            mode = (ini['phpjs.parse_url.mode'] &&
                ini['phpjs.parse_url.mode'].local_value) || 'php',
            parser = {
                php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
            };

        var m = parser[mode].exec(str),
            uri = {},
            i = 14;
        while (i--) {
            if (m[i]) {
                uri[key[i]] = m[i];
            }
        }

        if (component) {
            return uri[component.replace('PHP_URL_', '')
                .toLowerCase()];
        }
        if (mode !== 'php') {
            var name = (ini['phpjs.parse_url.queryKey'] &&
                ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
            parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
            uri[name] = {};
            query = uri[key[12]] || '';
            query.replace(parser, function($0, $1, $2) {
                if ($1) {
                    uri[name][$1] = $2;
                }
            });
        }
        delete uri.source;
        return uri;
    }
    function parse_str(str, array) {
        //       discuss at: http://phpjs.org/functions/parse_str/
        //      original by: Cagri Ekin
        //      improved by: Michael White (http://getsprink.com)
        //      improved by: Jack
        //      improved by: Brett Zamir (http://brett-zamir.me)
        //      bugfixed by: Onno Marsman
        //      bugfixed by: Brett Zamir (http://brett-zamir.me)
        //      bugfixed by: stag019
        //      bugfixed by: Brett Zamir (http://brett-zamir.me)
        //      bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
        // reimplemented by: stag019
        //         input by: Dreamer
        //         input by: Zaide (http://zaidesthings.com/)
        //         input by: David Pesta (http://davidpesta.com/)
        //         input by: jeicquest
        //             note: When no argument is specified, will put variables in global scope.
        //             note: When a particular argument has been passed, and the returned value is different parse_str of PHP. For example, a=b=c&d====c
        //             test: skip
        //        example 1: var arr = {};
        //        example 1: parse_str('first=foo&second=bar', arr);
        //        example 1: $result = arr
        //        returns 1: { first: 'foo', second: 'bar' }
        //        example 2: var arr = {};
        //        example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', arr);
        //        example 2: $result = arr
        //        returns 2: { str_a: "Jack and Jill didn't see the well." }
        //        example 3: var abc = {3:'a'};
        //        example 3: parse_str('abc[a][b]["c"]=def&abc[q]=t+5');
        //        returns 3: {"3":"a","a":{"b":{"c":"def"}},"q":"t 5"}

        var strArr = String(str)
            .replace(/^&/, '')
            .replace(/&$/, '')
            .split('&'),
            sal = strArr.length,
            i, j, ct, p, lastObj, obj, lastIter, undef, chr, tmp, key, value,
            postLeftBracketPos, keys, keysLen,
            fixStr = function(str) {
                return decodeURIComponent(str.replace(/\+/g, '%20'));
            };

        if (!array) {
            array = this.window;
        }

        for (i = 0; i < sal; i++) {
            tmp = strArr[i].split('=');
            key = fixStr(tmp[0]);
            value = (tmp.length < 2) ? '' : fixStr(tmp[1]);

            while (key.charAt(0) === ' ') {
                key = key.slice(1);
            }
            if (key.indexOf('\x00') > -1) {
                key = key.slice(0, key.indexOf('\x00'));
            }
            if (key && key.charAt(0) !== '[') {
                keys = [];
                postLeftBracketPos = 0;
                for (j = 0; j < key.length; j++) {
                    if (key.charAt(j) === '[' && !postLeftBracketPos) {
                        postLeftBracketPos = j + 1;
                    } else if (key.charAt(j) === ']') {
                        if (postLeftBracketPos) {
                            if (!keys.length) {
                                keys.push(key.slice(0, postLeftBracketPos - 1));
                            }
                            keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos));
                            postLeftBracketPos = 0;
                            if (key.charAt(j + 1) !== '[') {
                                break;
                            }
                        }
                    }
                }
                if (!keys.length) {
                    keys = [key];
                }
                for (j = 0; j < keys[0].length; j++) {
                    chr = keys[0].charAt(j);
                    if (chr === ' ' || chr === '.' || chr === '[') {
                        keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
                    }
                    if (chr === '[') {
                        break;
                    }
                }

                obj = array;
                for (j = 0, keysLen = keys.length; j < keysLen; j++) {
                    key = keys[j].replace(/^['"]/, '')
                        .replace(/['"]$/, '');
                    lastIter = j !== keys.length - 1;
                    lastObj = obj;
                    if ((key !== '' && key !== ' ') || j === 0) {
                        if (obj[key] === undef) {
                            obj[key] = {};
                        }
                        obj = obj[key];
                    } else { // To insert new dimension
                        ct = -1;
                        for (p in obj) {
                            if (obj.hasOwnProperty(p)) {
                                if (+p > ct && p.match(/^\d+$/g)) {
                                    ct = +p;
                                }
                            }
                        }
                        key = ct + 1;
                    }
                }
                lastObj[key] = value;
            }
        }
    }
    function htmlspecialchars_decode(string, quote_style) {
        //       discuss at: http://phpjs.org/functions/htmlspecialchars_decode/
        //      original by: Mirek Slugen
        //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //      bugfixed by: Mateusz "loonquawl" Zalega
        //      bugfixed by: Onno Marsman
        //      bugfixed by: Brett Zamir (http://brett-zamir.me)
        //      bugfixed by: Brett Zamir (http://brett-zamir.me)
        //         input by: ReverseSyntax
        //         input by: Slawomir Kaniecki
        //         input by: Scott Cariss
        //         input by: Francois
        //         input by: Ratheous
        //         input by: Mailfaker (http://www.weedem.fr/)
        //       revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // reimplemented by: Brett Zamir (http://brett-zamir.me)
        //        example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
        //        returns 1: '<p>this -> &quot;</p>'
        //        example 2: htmlspecialchars_decode("&amp;quot;");
        //        returns 2: '&quot;'

        var optTemp = 0,
            i = 0,
            noquotes = false;
        if (typeof quote_style === 'undefined') {
            quote_style = 2;
        }
        string = string.toString()
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
        var OPTS = {
            'ENT_NOQUOTES': 0,
            'ENT_HTML_QUOTE_SINGLE': 1,
            'ENT_HTML_QUOTE_DOUBLE': 2,
            'ENT_COMPAT': 2,
            'ENT_QUOTES': 3,
            'ENT_IGNORE': 4
        };
        if (quote_style === 0) {
            noquotes = true;
        }
        if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
            quote_style = [].concat(quote_style);
            for (i = 0; i < quote_style.length; i++) {
                // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
                if (OPTS[quote_style[i]] === 0) {
                    noquotes = true;
                } else if (OPTS[quote_style[i]]) {
                    optTemp = optTemp | OPTS[quote_style[i]];
                }
            }
            quote_style = optTemp;
        }
        if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
            string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
            // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
        }
        if (!noquotes) {
            string = string.replace(/&quot;/g, '"');
        }
        // Put this in last place to avoid escape being double-decoded
        string = string.replace(/&amp;/g, '&');

        return string;
    }
    function checkUsingProxy(imgProxy,text){
        for (var j in imgProxy ){
            if (text.indexOf(imgProxy[j]['scheme']+'://'+imgProxy[j]['host']) !== -1){
                return true;
            }
        }
        return false;
    }
    function restoreImage(imgTag,proxyConfig,reg) {
        var matches = reg.exec(imgTag);
        if (matches){
            var url = matches.length > 1 ? matches[1]:'';
            if (url){
                var pathInfo = parse_url(url);
                if (pathInfo.query){
                    var query = {};
                    parse_str(htmlspecialchars_decode(pathInfo.query),query);
                    if (proxyConfig.host == pathInfo.host && pathInfo.path.indexOf(proxyConfig.path) !== -1 && query[proxyConfig.query] !== undefined){
                        var originImgUrl = query[proxyConfig.query];
                        imgTag = imgTag.replace(matches[1],originImgUrl);
                    }
                }
            }
        }
        return imgTag;
    }
    while (checkUsingProxy(imgProxy,val)){
        for (var j in imgProxy ){
            while (val.indexOf(imgProxy[j]['scheme']+'://'+imgProxy[j]['host']) !== -1){
                var matches = val.match(reg);
                if (matches){
                    for (var i in matches ){
                        val = val.replace(matches[i],restoreImage(matches[i],imgProxy[j],/<img[^>]+src=["']?(https?:\/\/[^\s]+(?:\.(?:jpg|jpeg|png|gif|bmp|webp)|(?:[^\s]+?)))["']+[^\s]*?/i));
                    }
                }
            }
        }
    }
    return val;
};

App.Util.replaceStyle2Class = function(html) {
	//清除title\alt\label
	html = html.replace(/ (title|alt|label|opacity|mapurl|data-width|data-style|data-w|data-txtless|data-brushtype|data-txtlessp|data-bcless|data-id|data-color|data-custom|data-ratio|data-w|data-s|data-type)="[^"]*"/gi, '');
	html = html.replace(/ (width|height)=""/gi, '');
	//135编辑器无用内容去除
	html = html.replace(/( class="(135editor|article135|135brush|layout)")/g, '');

	console.log(html.length);
	var matchReg = /style="([^"]+)"/gi;
	var m = html.match(matchReg);
	var styles = '';
	var hasStyle = {};

	var styleIndex = 0;
	var classPrefix = "ms";


	if (m) {
		for (var i = 0, len = m.length; i < len; i++) {
			//去除空格
			var matchStyle = m[i].replace(/([,:;"])\s+/g, "$1");
			html = html.replace(m[i], matchStyle);

			//内容短的样式不替换
			if (m[i].length < 40)continue;

			var changeClass;

			//有重复使用的样式,变成class
			if (hasStyle[matchStyle]) {
				changeClass = classPrefix + hasStyle[matchStyle][0];
				console.log('has');

				//第一次是替换之前的
				html = html.replace(matchStyle, 'class="' + changeClass + '"');
				//第二次是替换本次的
				html = html.replace(matchStyle, 'class="' + changeClass + '"');

				if (!hasStyle[matchStyle][1]) {
					hasStyle[matchStyle][1] = 1;
					styles += '.' + changeClass + '{' + matchStyle.replace(matchReg, "$1") + '}';
				}
			} else {//不同的样式,新建class
				styleIndex++;
				hasStyle[matchStyle] = [styleIndex, 0];
			}
		}
	}

	//常用样式提取
	var shortClasses = {
		'box': 'box-sizing:border-box',
		'b0n': 'border:0px none',
		'b0': 'border:0px',
		'bs': 'border-style:solid',
		'bn': 'border:none',
		'br50p': 'border-radius:50%',
		'br1e': 'border-radius:1em',
		'br5p': 'border-radius:5px',
		'blss': 'border-left-style:solid',
		'brss': 'border-right-style:solid',
		'btss': 'border-top-style:solid',
		'bbss': 'border-bottom-style:solid',
		'blsn': 'border-left-style:none',
		'brsn': 'border-right-style:none',
		'btsn': 'border-top-style:none',
		'bbsn': 'border-bottom-style:none',
		'bssn':'border-style:solid none',
		'bla': 'margin-left:auto',
		'bra': 'margin-right:auto',
		'bim': 'border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial',
		'brs': 'border-right-style:solid',
		'cb': 'clear:both',
		'ci': 'color:inherit',
		'c0': 'color:#000000',
		'di': 'display:inline-block',
		'f1e': 'font-size:1em',
		'f2e': 'font-size:2em',
		'fl': 'float:left',
		'fr': 'float:right',
		'ffi': 'font-family:inherit',
		'fwi': 'font-weight:inherit',
		'fw': 'font-family:微软雅黑',
		'f14':'font-size:14px',
		'h0w0': 'height:0px;width:0px',
		'h00p': 'height:100%',
		'lh14': 'line-height:1.4',
		'lh16': 'line-height:1.6',
		'lh15e': 'line-height:1.5em',
		'lh2e': 'line-height:2em',
		'lhi': 'line-height:inherit',
		'oh': 'overflow:hidden',
		'ps': 'position:static',
		'taj': 'text-align:justify',
		'tal': 'text-align:left',
		'tar': 'text-align:right',
		'tac': 'text-align:center',
		'tdi': 'text-decoration:inherit',
		'tr50': 'transform:rotate(50deg);-webkit-transform:rotate(50deg);-moz-transform:rotate(50deg);-ms-transform:rotate(50deg);-o-transform:rotate(50deg)',
		'vab': 'vertical-align:bottom',
		'vat': 'vertical-align:top',
		'vac': 'vertical-align:center',
		'w0h0': 'width:0px;height:0px',
		'wn': 'white-space:normal',
		'w00p': 'width:100%'
	};

	for (i = 1; i < 3; i++) {
		shortClasses['btw' + i] = 'border-top-width:' + i + 'px';
		shortClasses['bbw' + i] = 'border-bottom-width:' + i + 'px';
		shortClasses['blw' + i] = 'border-left-width:' + i + 'px';
		shortClasses['brw' + i] = 'border-right-width:' + i + 'px';
	}
	for (i = 5; i < 30; i++) {
		shortClasses['f' + i] = 'font-size:' + i + 'px';
	}

	for (i = 0.1; i < 30; i=i+0.1) {
		var tmp2 = ('' + tmp).replace('.', '-') + 'e';
		shortClasses['f' + tmp2] = 'font-size:' + i + 'em';
	}
	for (i = 0; i < 200; i++) {
		shortClasses['h' + i] = 'height:' + i + 'px';
		shortClasses['w' + i] = 'width:' + i + 'px';
	}
	for (i = -10; i < 30; i++) {
		shortClasses['m' + i] = 'margin:' + i + 'px';
		shortClasses['mt' + i] = 'margin-top:' + i + 'px';
		shortClasses['ml' + i] = 'margin-left:' + i + 'px';
		shortClasses['mr' + i] = 'margin-right:' + i + 'px';
		shortClasses['mb' + i] = 'margin-bottom:' + i + 'px';
		shortClasses['p' + i] = 'padding:' + i + 'px';
		shortClasses['pt' + i] = 'padding-top:' + i + 'px';
		shortClasses['pl' + i] = 'padding-left:' + i + 'px';
		shortClasses['pr' + i] = 'padding-right:' + i + 'px';
		shortClasses['pb' + i] = 'padding-bottom:' + i + 'px';
	}
	for (i = -10; i < 20; i++) {
		var tmp = i / 4;
		var tmp2 = ('' + tmp).replace('.', '-') + 'e';
		shortClasses['m' + tmp2] = 'margin:' + tmp + 'em';
		shortClasses['mt' + tmp2] = 'margin-top:' + tmp + 'em';
		shortClasses['ml' + tmp2] = 'margin-left:' + tmp + 'em';
		shortClasses['mr' + tmp2] = 'margin-right:' + tmp + 'em';
		shortClasses['mb' + tmp2] = 'margin-bottom:' + tmp + 'em';
		shortClasses['p' + tmp2] = 'padding:' + tmp + 'em';
		shortClasses['pt' + tmp2] = 'padding-top:' + tmp + 'em';
		shortClasses['pl' + tmp2] = 'padding-left:' + tmp + 'em';
		shortClasses['pr' + tmp2] = 'padding-right:' + tmp + 'em';
		shortClasses['pb' + tmp2] = 'padding-bottom:' + tmp + 'em';
	}

	for (var k in shortClasses) {
		var reg = new RegExp('(style="(?:[^"]*;)?)' + shortClasses[k].replace(/\-/g, '\-') + '[;$]([^"]*")', 'gi');
		if (!html.match(reg))continue;
		var regClass = new RegExp('(class="[^"]*)(" style="(?:[^"]*;)?)' + shortClasses[k].replace(/\-/g, '\-').replace(/\./g, '\.') + '[;$]([^"]*")', 'gi');
		html = html.replace(regClass, '$1 ' + k + '$2$3');
		html = html.replace(reg, 'class="' + k + '" $1$2');
		styles += '.' + k + '{' + shortClasses[k] + '}';
	}

	html = html.replace(/ style="\s*"/gi, '');

	html = '<style>' + styles + '</style>' + html;

	return html;
}
