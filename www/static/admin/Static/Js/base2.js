var FANWE = new Object();
FANWE.NO_COUNTER = false;
FANWE.GUID_TIME_OUT;

(function($){
	/*=====================会员BEGIN=====================*/
	//检测会员是否登陆
	$.Check_Login = function()
	{
		if(USER_ID == 0)
		{
			$.Show_Login_Form();
			return false;
		}
		else
			return true;
	}

	$.Show_Login_Form = function()
	{
		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=user&a=login", {contentType:'ajax',draggable:false,showButton:false,title:LANG.login,width:600});
	}
	
	$.Show_Tooltip = function(msg,isErr)
	{
		var readyFun = function(weebox){
			var fun = function()
			{
				$.weeboxs.close();
			}
			$("#TOOLTIP_BOX").width(weebox.dc.get(0).scrollWidth + 100);
			setTimeout(fun,1500);
		};
		var c = 'lb_s';
		if(isErr)
			var c = 'lb_f';
		var html = '<div class="lb_tooltip"><div class="'+c+'">'+msg+'</div></div>';
		$.weeboxs.close();
		$.weeboxs.open(html, {boxid:'TOOLTIP_BOX',type:'successTip',title:'New Window',contentType:'text',draggable:false,showButton:false,width:100,onready:readyFun});
	}

	//新增头部搜索内容,优化搜索
	
	$.Head_Search=function(keyword,action,media_type)
	{
		var key = encodeURIComponent(keyword);
		var url = "";
		if(URL_MODEL == '1')
			url = SITE_URL+"book/"+action+"?kw="+key;
		else
			url = SITE_URL+"book.php?action="+action+"&kw="+key;
		if(media_type)url += '&media_type='+media_type;
        window.location.href = url;
		return false;
	}
	
	//会员城市
	$.Bind_City = function(province,city,pid,cid)
	{
		var i = 0;
		var count = CITYS.province.length;
		var provinceID,cityID,selected;
		var html = "";
		for(i; i<count; i++)
		{
			provinceID = CITYS.province[i];
			if(pid == 0)
				pid = provinceID;

			if(pid == provinceID)
				selected = ' selected="selected"';
			else
				selected = '';

			html += '<option value="'+ provinceID +'"'+ selected +'>'+ CITYS.all[provinceID].name +'</option>';
		}

		$(province).html(html);

		$(province).change(function(){
			pid = this.value;
			i = 0;
			count = CITYS.city[pid].length;
			html = '';
			for(i; i<count; i++)
			{
				cityID = CITYS.city[pid][i];
				html += '<option value="'+ cityID +'">'+ CITYS.all[cityID].name +'</option>';
			}
			$(city).html(html);
		});
		html = '';
		i = 0;
		count = CITYS.city[pid].length;
		for(i; i<count; i++)
		{
			cityID = CITYS.city[pid][i];
			if(cid == cityID)
				selected = ' selected="selected"';
			else
				selected = '';

			html += '<option value="'+ cityID +'"'+ selected +'>'+ CITYS.all[cityID].name +'</option>';
		}

		$(city).html(html);
	}
	
	//新增分享框
	
	
	/* -------------jessezhang BEGIN --------------- */
	$.All_Share=function()
	{
		
		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=user&a=all", {contentType:'ajax',draggable:false,showButton:false,title:LANG.all_share_title,width:552,height:241});//每个宽为184，总长为552
	}
	//新增视频分享框
	$.Video_Share=function()
	{
		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=user&a=video", {contentType:'ajax',draggable:false,showButton:false,title:LANG.add_share_video_title,width:736,height:241});//每个宽为184，总长为552
	}
	//新增宝贝分享框
	$.Goods_Share=function()
	{
		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=user&a=goods", {contentType:'ajax',draggable:false,showButton:false,title:LANG.add_share_goods_title,width:736,height:241});//每个宽为184，总长为552
	}
	//新建画板
	$.create_board=function()
	{
		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=user&a=create_board", {contentType:'ajax',draggable:false,showButton:false,title:LANG.add_board_title,width:540,height:241});//每个宽为184，总长为552
	}
	/* -------------jessezhang END --------------- */
	
	
	
	$.User_Share=function()
	{
		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=user&a=share", {contentType:'ajax',draggable:false,showButton:false,title:LANG.add_share_title,width:652,height:342});
	}
	//编辑分享框
	$.Edit_Share=function(share_id)
	{
		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=user&a=editshare&share_id="+share_id, {contentType:'ajax',draggable:false,showButton:false,title:"Edit Pin",width:652,height:342});
	}
	
	
	//关注会员，uid 要关注的会员编号，ojb 点击对像，fun 处理函数
	$.User_Follow=function(uid,obj,fun)
	{
		if(!$.Check_Login())
			return false;

		var query = new Object();
		query.uid = uid;
		$.ajax({
			url: SITE_PATH+"services/service.php?m=user&a=follow",
			type: "POST",
			data:query,
			dataType: "json",
			success: function(result){
				if(result.html != null && fun == null)
					$(obj).html(result.html);
				
				if(fun != null)
				{
					result.uid = uid;
					fun.call(this,obj,result);
				}
			}
		});
	}

	//删除粉丝，uid 要删除的会员编号，fun 处理函数
	$.Remove_Fans=function(uid,obj,fun)
	{
		if(!$.Check_Login())
			return false;

		var query = new Object();
		query.uid = uid;

		$.ajax({
			url: SITE_PATH+"services/service.php?m=user&a=removefans",
			type: "POST",
			data:query,
			dataType: "json",
			success: function(result){
				if(fun != null)
					fun.call(this,obj,result);
			}
		});
	}

	//关注主题，tid 要关注的主题编号，ojb 点击对像，fun 处理函数
	$.Topic_Follow=function(tid,obj,module,fun)
	{
		if(!$.Check_Login())
			return false;

		var query = new Object();
		query.tid = tid;

		if(module == null)
			module = 'topic';

		$.ajax({
			url: SITE_PATH+"services/service.php?m="+ module +"&a=follow",
			type: "POST",
			data:query,
			dataType: "json",
			success: function(result){
				if(result.html != null && fun == null)
					$(obj).html(result.html);

				if(fun != null)
					fun.call(this,obj,result);
			}
		});
	}
	/*=====================会员END  =====================*/

	/*=====================表情BEGIN=====================*/
	//显示表现窗口
	$.Show_Expression = function(obj,height)
	{
		var readyFun = function(weebox){
			FANWE.Expression_HTML = weebox.dc.html();
			$.Expression_Init(weebox);
		};
		
		if(FANWE.Expression_HTML == null)
			$.weeboxs.open(SITE_PATH+"services/service.php?m=share&a=expression",{boxid:'EXPRESSION_BOX',contentType:'ajax',position:{refele:obj},draggable:false,modal:false,showButton:false,showHeader:false,width:496,onready:readyFun,addtop:height});
		else
			$.weeboxs.open(FANWE.Expression_HTML,{boxid:'EXPRESSION_BOX',contentType:'text',position:{refele:obj},draggable:false,modal:false,showButton:false,showHeader:false,width:496,onready:readyFun,addtop:height});
	}
	//发私信
	
	$.sendMail = function(follow_uid)
	{
		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=user&a=sendmail&follow_uid="+follow_uid, {contentType:'ajax',draggable:false,showButton:false,title:"发私信",width:458,height:244});

	}

	//表情处理
	$.Expression_Init = function(weebox)
	{
		var refele = weebox.options.position.refele;
		var form = $(refele).parents("form");

		$("#expression_tabs li").click(function(){
			$("#expression_tabs li").removeClass("c");
			$(this).addClass("c");
			$.Get_Expression($(this).attr("f"),form);
		});

		$.Expression_Click(form);
	}

	//获取表情
	$.Get_Expression = function(type,form)
	{
		if(Expression_Items[type] != null)
		{
			$("#expression_items a").unbind();
			$("#expression_items").html(Expression_Items[type]);
			$.Expression_Click(form);
		}
	}

	//处理点击表情
	$.Expression_Click = function(form)
	{
		$("#expression_items a").bind("click",function(){
			console.log($(this).attr('rel'));
			var face = $.trim(this.getAttribute('rel'));
			if(face != '')
			{
				face = '['+ face +']';
				if($(".PUB_TXT",form).length == 0)
					return false;

				var txt = $(".PUB_TXT",form);
				var pos = parseInt(txt.attr("position"));
				var val = txt.val();

				if(txt.attr('length') != undefined)
				{
					var maxLength = parseInt(txt.attr('length'));
					if(val.length + face.length > maxLength)
						return false;
				}

				var begin = val.substr(0,pos);
				var end = val.substr(pos);
				txt.val(begin + face + end);
				txt.attr({"position":pos + face.length});
				$.Recount_Word(txt.get(0));
			}
		});
	}
	/*=====================表情END  =====================*/

	/*=====================话题BEGIN  =====================*/
	$.Event_Add = function(obj){
		if(!$.Check_Login())
			return;
		var form = $(obj).parents("form");
		if($(".PUB_TXT",form).length == 0)
			return false;
		var txt = $(".PUB_TXT",form);
		var default_text = "#输入话题标题#";
		var found = txt.val().search(default_text);
		if(found==-1){
			txt.val(txt.val()+ default_text + " ");
            v = txt.val();
            found = v.search(default_text);
		}
		var start = found +1;
		var end = found + 7;
		txt.each(function() {
            if (this.setSelectionRange) {
                this.focus();
                this.setSelectionRange(start, end);
            } else if (this.createTextRange) {
                var range = this.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
        });
		$.Recount_Word(txt.val().length);

	}
	/*=====================话题BEGIN=====================*/
	/*=====================宝贝BEGIN=====================*/
	//显示商品添加窗口
	$.Goods_Add = function(obj)
	{
		if(!$.Check_Login())
			return;

		var form = $(obj).parents("form");
		if($.Get_Goods_Count(form) >= SETTING.share_goods_count)
		{
			alert(LANG.goods_collect_3.replace('%d',SETTING.share_goods_count));
			return;
		}

		$.weeboxs.close();
		var closeFun = function(){
			$.Goods_Collect_Clear();
		};
		var readyFun = function(weebox){
			FANWE.Goods_Collect_HTML = weebox.dc.html();
			$.Goods_Init(weebox);
		};
		if(FANWE.Goods_Collect_HTML == null)
			$.weeboxs.open(SITE_PATH+"services/service.php?m=share&a=addgoods",{boxid:'ADD_GOODS_BOX',contentType:'ajax',position:{refele:obj},draggable:false,modal:false,showButton:false,width:496,onclose:closeFun,onready:readyFun});
		else
			$.weeboxs.open(FANWE.Goods_Collect_HTML,{boxid:'ADD_GOODS_BOX',contentType:'text',position:{refele:obj},draggable:false,modal:false,showButton:false,width:496,onclose:closeFun,onready:readyFun});
	}

	//采集商品初始化
	$.Goods_Init = function(weebox)
	{
		$('.GOODS_COLLECT',weebox.dc).click(function(){
			$.Goods_Collect(weebox);
		});
	}

	//采集商品
	$.Goods_Collect = function(weebox)
	{
		var refele = weebox.options.position.refele;
		var form = $(refele).parents("form");
		var query = form.serialize();
		var url = $.trim($('.GOODS_URL',weebox.dc).val());

		if(url == '')
		{
			alert(LANG.goods_collect_5);
			return;
		}

		$('.PUB_LOADING',weebox.dc).show();
		$('.GOODS_BOX',weebox.dc).hide();

		$.Goods_Collect_Clear();
		FANWE.Goods_Collect_Handler = new Object();
		FANWE.Goods_Collect_Handler.fun = function(result){
			$.Goods_Collect_Result(result,weebox,form);
		};
		
		query += "&url="+escape(url);

		FANWE.Goods_Collect_Handler.ajax = $.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=collectgoods",
			type: "POST",
			data:query,
			cache:false,
			dataType: "json",
			success:function(result){
				if(FANWE.Goods_Collect_Handler.fun != null)
					FANWE.Goods_Collect_Handler.fun(result);
			},
			error:function(){
				alert(LANG.goods_collect_4);
				$.Goods_Close();
			}
		});
	}

	//处理采集返回的结果
	$.Goods_Collect_Result = function(result,weebox,form)
	{
		FANWE.Goods_Collect_Handler.fun = null;
		FANWE.Goods_Collect_Handler.ajax = null;
		FANWE.Goods_Collect_Handler = null;

		if(result.status == 1)
		{
			$('.PUB_IMG',form).append(result.item);
			weebox.setContent(result.html,true);
			$.Pub_Share_Tags(form);
			weebox.dc.ready(function(){
				if($('.TIME_OUT_CLOSE[time]',weebox.dc).length > 0)
					$.Goods_Close_Timer(weebox);
			});
			return;
		}
		else if(result.status == 0)
		{
			alert(LANG.goods_collect_4);
		}
		else if(result.status == -1)
		{
			alert(LANG.goods_collect_2);
		}
		else if(result.status == -2)
		{
			alert(LANG.goods_collect_3.replace('%d',SETTING.share_goods_count));
		}
		else if(result.status == -3)
		{
			alert(LANG.goods_collect_6);
		}
		$.Goods_Close();
	}

	//timer关闭商品添加窗口
	$.Goods_Close_Timer = function(weebox)
	{
		var timeout = $('.TIME_OUT_CLOSE',weebox.dc);
		var time = parseInt(timeout.attr("time"));
		if(isNaN(time) || time <= 0)
		{
			FANWE.Goods_Collect_Close_Timer = null;
			delete FANWE.Goods_Collect_Close_Timer;
			$.Goods_Close();
			return;
		}
		timeout.val(LANG.goods_collect_1.replace('%d',time));
		time--;
		timeout.attr({"time":time});

		var timerFun = function(){
			$.Goods_Close_Timer(weebox);
		};
		FANWE.Goods_Collect_Close_Timer = setTimeout(timerFun,1000);
	}

	//关闭商品添加窗口
	$.Goods_Close = function()
	{
		$.Goods_Collect_Clear();
		$.weeboxs.close();
	}

	//清除商品的采集
	$.Goods_Collect_Clear = function()
	{
		if(FANWE.Goods_Collect_Handler != null)
		{
			FANWE.Goods_Collect_Handler.fun = null;
			FANWE.Goods_Collect_Handler.ajax.abort();
			FANWE.Goods_Collect_Handler.ajax = null;
			FANWE.Goods_Collect_Handler = null;
		}
	}

	//获取已发布商品的数量
	$.Get_Goods_Count = function(form)
	{
		return $('.PUB_IMG .PUB_SHARTE_GOODS',form).length;
	}
	/*=====================宝贝END  =====================*/

	/*=====================图片BEGIN=====================*/
	//显示商品添加窗口
	$.Pic_Add = function(obj)
	{
		if(!$.Check_Login())
			return;

		var form = $(obj).parents("form");
		if($.Get_Pic_Count(form) >= SETTING.share_pic_count)
		{
			alert(LANG.upload_pic_1.replace('%d',SETTING.share_pic_count));
			return;
		}

		$.weeboxs.close();
		var closeFun = function(){
			$.Pic_Upload_Clear();
		};
		var readyFun = function(weebox){
			FANWE.Pic_Upload_HTML = weebox.dc.html();
			$.Pic_Init(weebox);
		};
		if(FANWE.Pic_Upload_HTML == null)
			$.weeboxs.open(SITE_PATH+"admin.php?m=Admin&c=Topic&a=getAddImgTpl",{boxid:'ADD_PIC_BOX',contentType:'ajax',position:{refele:obj},draggable:false,modal:false,showButton:false,width:496,onclose:closeFun,onready:readyFun});
		else
			$.weeboxs.open(FANWE.Pic_Upload_HTML,{boxid:'ADD_PIC_BOX',contentType:'text',position:{refele:obj},draggable:false,modal:false,showButton:false,width:496,onclose:closeFun,onready:readyFun});
	}

	//上传图片初始化
	$.Pic_Init = function(weebox,resultFun)
	{
		var refele,form;
		if(!resultFun)
		{
			refele = weebox.options.position.refele;
			form = $(refele).parents("form");
		}

		if(IS_IMAGE_SERVERS == 1)
		{
			FANWE.UPLOAD_PHOTO_RESULT_FUNC = resultFun;
			FANWE.UPLOAD_PHOTO_REFELE_FORM = form;
			var flashvars = {
				siteUrl:SITE_URL,
				btnUrl:TPL_PATH + "images/uploadpic.png",
				imageServer:FANWE.UPLOAD_IMAGE_SERVER,
				type:"uploadphoto"
			};

			var params = {
				wmode: "transparent",
				allowScriptAccess: "always"
			};
			//var data = new Date();data.toGMTString()
			swfobject.embedSWF(PUBLIC_PATH + "swf/upload33.swf", "UPLOAD_PHOTO_FLASH_BOX", "181", "28", "9.0.0", null, flashvars, params);
		}
		else
		{
			var file = $('.PUB_PIC_FILE',weebox.dc).get(0);
			file.onchange = function(){
				$('.PUB_LOADING',weebox.dc).show();
				$('.PIC_BOX',weebox.dc).hide();
				var type = $(".photo_type:checked",weebox.dc).val();
				var new_img_id = $('.PUB_IMG').attr('new_img_id');
				if(!new_img_id){
					new_img_id = 1;
				}else{
					new_img_id = parseInt(new_img_id)+1;
				}
				$('.PUB_IMG').attr('new_img_id',new_img_id);
				
				FANWE.Pic_Upload_Obj = $.ajaxFileUpload(
				{
					url:SITE_PATH+"admin.php?m=Admin&c=Image&a=uploadAjax&photo_type="+type+"&new_img_id="+new_img_id,
					secureuri:false,
					fileElementId:'Pub_Upload_Pic',
					fileElement:file,
					success:function(result,status){
						result = $('textarea',result).val();
						result = $.parseJSON(result);
						if(result.status == 1)
						{
							if(resultFun)
								resultFun.call(this,result);
							else
							{
								$('.PUB_IMG',form).parent().show();
								if($('.PUB_IMG .PUB_LOOK_DAPEI',form).length > 0)
									$('.PUB_IMG .PUB_LOOK_DAPEI',form).eq(0).before(result.html);
								else
									$('.PUB_IMG',form).append(result.html);
								var new_photo_id = '';
								$('.pub_share_img').each(function(){
									new_photo_id = $(this).attr('photo_id');						  
								});
								//$('.PUB_TXT').val($('.PUB_TXT').val()+'[IMG'+new_photo_id+']');
								if(FANWE.UPLOAD_IMAGE_RESULT_FUNC)
									FANWE.UPLOAD_IMAGE_RESULT_FUNC.call(this,form);
							}
						}
						else if(result.status == 0)
						{
							if(result.error_code == -105)
								alert("亲，你上传的图片太大了哦！");
							else
								alert(LANG.upload_pic_2);
						}
						$.Pic_Close();
					},
					error:function(s, xml, status, e){
						$.Pic_Close();
					}
				});
			};
		}
		
		$(".webpic_button",weebox.dc).click(function(){
			$(".WEB_PIC_BTN_1,#UPLOAD_PHOTO_FLASH_BOX",weebox.dc).hide();
			$(".WEB_PIC_BTN_2",weebox.dc).show();
		});
		
		$(".webpic_input",weebox.dc).focus(function(){
			if($.trim(this.value) == $(this).attr("default"))
			{
				this.value = "";
				$(this).removeClass("tipcolor");
			}
		});
		
		$(".webpic_input",weebox.dc).blur(function(){
			if($.trim(this.value) == $(this).attr("default") || $.trim(this.value) == "")
			{
				this.value = $(this).attr("default");
				$(this).addClass("tipcolor");
			}
		});
		
		$('.webpic_submit',weebox.dc).click(function(){
			$.Upload_Web_Pic(this,form);
		});
	}
	
	$.Upload_Web_Pic = function(obj,form)
	{
		var parent = $(obj).parents("#lb_pic");
		var url = $.trim($(".webpic_input",parent).val());
		if(!$.checkUrl(url))
		{
			$.Show_MiNiTooltip($(".webpic_input",parent),"WEBPIC_UPLOAD_TIP","亲，请输入正确的图片URL地址哦！",false,1,parent);
		}
		else
		{
			$('.PUB_LOADING',parent).css({"position":"absolute","z-index":1,"left":0,"top":0,"width":parent.width()-60,"height":parent.height()-60,"background":"#ffffff"});
			$('.PUB_LOADING',parent).show();
			$.Get_Image_Size(url,function(width,height){
				var query = new Object();
				query.url = url;
				query.width = width;
				query.height = height;
				query.image_server=FANWE.UPLOAD_IMAGE_SERVER;
				
				FANWE.Pic_Upload_Obj = $.ajax({
					url: SITE_PATH+"services/service.php?m=share&a=uploadwebpic",
					type: "POST",
					data:query,
					cache:false,
					dataType: "json",
					success:function(result){
						if(result.status == 1)
						{
							FANWE.UPLOAD_IMAGE_SERVER = result.image_server;
							if(FANWE.UPLOAD_PHOTO_RESULT_FUNC)
								FANWE.UPLOAD_PHOTO_RESULT_FUNC.call(this,result);
							else
							{
								$('.PUB_IMG',form).parent().show();
								if($('.PUB_IMG .PUB_LOOK_DAPEI',form).length > 0)
									$('.PUB_IMG .PUB_LOOK_DAPEI',form).eq(0).before(result.html);
								else
									$('.PUB_IMG',form).append(result.html);
									
								if(FANWE.UPLOAD_IMAGE_RESULT_FUNC)
									FANWE.UPLOAD_IMAGE_RESULT_FUNC.call(this,form);
							}
						}
						else if(result.status == 0)
						{
							$('.PUB_LOADING',parent).hide();
							if(result.error_code == -105)
								$.Show_MiNiTooltip($(".webpic_input",parent),"WEBPIC_UPLOAD_TIP","亲，你上传的图片太大了哦！",false,1,parent);
							else
								$.Show_MiNiTooltip($(".webpic_input",parent),"WEBPIC_UPLOAD_TIP",LANG.upload_pic_2,false,1,parent);
							return false;
						}
						
						$.Pic_Close();
					},
					error:function(){
						$.Pic_Close();
					}
				});
			},function(){
				$('.PUB_LOADING',parent).hide();
				$.Show_MiNiTooltip($(".webpic_input",parent),"WEBPIC_UPLOAD_TIP","亲，请输入正确的图片URL地址哦！",false,1,parent);
			});	
		}
		return false;
	}

	$.Get_Pic_Type = function()
	{
		var form = $("#UPLOAD_PHOTO_FLASH_BOX").parents("#lb_pic");
		$('.PUB_LOADING',form).css({"position":"absolute","z-index":1,"left":0,"top":0,"width":form.width()-60,"height":form.height()-60,"background":"#ffffff"});
		$('.PUB_LOADING',form).show();
		return 'default';
	}

	$.Upload_Photo_Complete = function(result,server)
	{
		result = jQuery.parseJSON(Base64.decode(result));
		if(result.status == 1)
		{
			FANWE.UPLOAD_IMAGE_SERVER = server;
			if(FANWE.UPLOAD_PHOTO_RESULT_FUNC)
				FANWE.UPLOAD_PHOTO_RESULT_FUNC.call(this,result);
			else
			{
				$('.PUB_IMG',FANWE.UPLOAD_PHOTO_REFELE_FORM).parent().show();
				if($('.PUB_IMG .PUB_LOOK_DAPEI',FANWE.UPLOAD_PHOTO_REFELE_FORM).length > 0)
					$('.PUB_IMG .PUB_LOOK_DAPEI',FANWE.UPLOAD_PHOTO_REFELE_FORM).eq(0).before(result.html);
				else
					$('.PUB_IMG',FANWE.UPLOAD_PHOTO_REFELE_FORM).append(result.html);
				if(FANWE.UPLOAD_IMAGE_RESULT_FUNC)
					FANWE.UPLOAD_IMAGE_RESULT_FUNC.call(this,FANWE.UPLOAD_PHOTO_REFELE_FORM);
			}
		}
		else if(result.status == 0)
		{
			alert(LANG.upload_pic_2);
		}
		
		FANWE.UPLOAD_PHOTO_REFELE_FORM = null;
		$.Pic_Close();
	}

	$.Clear_Upload = function(id)
	{
		if($("#"+id).length > 0)
		{
			try
			{
				document.getElementById(id).ClearUpload();
			}
			catch(e){}
		}
	}

	$.Upload_Alert = function(msg)
	{
		alert(msg);
	}

	//关闭图片添加窗口
	$.Pic_Close = function()
	{
		$.Pic_Upload_Clear();
		$.weeboxs.close();
		if(typeof(PicItemCheckFun) == "function")
			PicItemCheckFun();
	}

	//清除正在上传的操作
	$.Pic_Upload_Clear = function()
	{
		if(FANWE.Pic_Upload_Obj != null)
		{
			FANWE.Pic_Upload_Obj.abort();
			FANWE.Pic_Upload_Obj = null;
		}
	}

	//获取已发布图片的数量
	$.Get_Pic_Count = function(form)
	{
		return $('.PUB_IMG .PUB_SHARTE_PIC',form).length;
	}
	/*=====================图片END  =====================*/

	/*=====================分享发布BEGIN=====================*/
	//发布时删除分享图片的处理
	$.Pub_Share_Img_Remove = function(obj,img_id)
	{
		if(confirm('您确定要删除吗？')){
			
//			$.Pub_Share_Tags(form);
//			if(typeof(PicItemCheckFun) == "function")
//				PicItemCheckFun();
			//ajax删除数据库图片记录
			$.post('admin.php?m=Admin&c=Topic&a=removeImgAjax',{img_id:img_id},function(result){
				if(result.status == 1){
					var form = $(obj).parents("form");
					var oparent = $(obj).parent().parent();
					var rparent = oparent.parent();
					oparent.remove();
				}else{
					alert('删除失败！');
				}
			},'json');
		}
	}
	
	/*=====================文章封面设置BEGIN=====================*/
	$.Set_Topic_Index = function(str,img_id)
	{	
		$('#topic_index_img').val(str);
		$('.pub_image_box a').each(function(){
			if($(this).html() == "封面"){
				$(this).html("设置封面");
			}
		})
		$('#tip_'+img_id).html("封面");
		img_id = img_id+'';
		if(img_id.indexOf('T') == 0){
			var oDiv = $('#tip_'+img_id).parent();
			var path = oDiv.find('.path').val();
			var width = oDiv.find('.width').val();
			var height = oDiv.find('.height').val();
			var savename = oDiv.find('.savename').val();
			var newImageId = oDiv.find('.new_img_id').val();

			$('input[name=cover_img_id]').val(' ');
			$('input[name=cover_path]').val(path);
			$('input[name=cover_width]').val(width);
			$('input[name=cover_height]').val(height);
			$('input[name=cover_savename]').val(savename);
			$('input[name=cover_new_img_id]').val(newImageId);
		}else{			
			$('input[name=cover_img_id]').val(img_id);
			$('input[name=cover_path]').val(' ');
			$('input[name=cover_width]').val(' ');
			$('input[name=cover_height]').val(' ');
			$('input[name=cover_savename]').val(' ');
			$('input[name=cover_new_img_id]').val(' ');
		}
	}
	/*=====================文章封面设置END=====================*/
	
	//发布时根据分享图片确定是否显示标签输入
	$.Pub_Share_Tags = function(form)
	{
		if($('.PUB_IMG li',form).length == 0)
			$('.PUB_SHARE_TAG_BOX',form).hide();
		else
		{
			$('.PUB_SHARE_TAG_BOX',form).show();
			var tags = new Array();
			$(".GOODS_ITEM_TAG",form).each(function(){
				tags.push(this.value.split(' '));
			});

			if(tags.length > 0)
			{
				var activeTags = $(".PUB_SHARE_TAG",form).val();
				if(activeTags != '')
				{
					activeTags = activeTags.replace('　',' ');
					activeTags = activeTags.replace(/ +/g,' ');
					activeTags = ' ' + $.trim(activeTags) + ' ';
				}

				var html = '';
				var tagCount = SETTING.share_tag_count;
				var tempObj = new Object();
				var tag = '';
				for(var i = 0; i < tagCount; i++)
				{
					for(var j=0; j < tags.length; j++)
					{
						if(tags[j].length > i)
						{
							tag = tags[j][i];
							if(tempObj[tag] == null)
							{
								tempObj[tag] = 1;
								if(activeTags.indexOf(' ' + tag + ' ') == -1)
									html += '<li>'+ tag +'</li>';
								else
									html += '<li class="active">'+ tag +'</li>';
							}
						}
					}
				}
				delete tempObj;
				$(".PUB_SHARE_TAG_BOX ul",form).html(html).show();
			}
			else
			{
				$(".PUB_SHARE_TAG_BOX ul",form).hide();
			}
		}
	}

	//分享图片排序操作
	$.Pub_Img_Sort = function(form)
	{
		$('.PUB_IMG li',form).each(function(i){
			$('.share_sort',this).val(i + 1);
		});
	}

	//分享重置
	$.Pub_Share_Reset = function(form)
	{
		form.reset();
		$('.PUB_IMG li',form).remove();
		$('.PUB_SHARE_TAG_BOX',form).hide();
	}
	
	$.Share_Update = function(obj)
	{
		if(!$.Check_Login())
			return false;

        var form = $(obj).parents("form").get(0);
		var module = $.trim(form.module.value);
		var action = $.trim(form.action.value);
		var url = SITE_PATH + 'services/service.php?m=' + module + '&a=' + action;
		var content = $.trim(form.content.value);
		if(content == '')
		{
			alert(LANG.share_content_require);
			return;
		}
		
		var albumid = parseInt(form.albumid.value);
		
		$.ajax({
			url: url,
			type: "POST",
			data:$(form).serialize(),
			cache:false,
			dataType: "json",
			success:function(result){
				
				if(result.status == 1)
				{
					$.Pub_Share_Reset(form);
					var share_item = $(result.html).css({"display":"none"});
					$("#SHARE_DETAIL_LiST").prepend(share_item);
					share_item.slideDown("slow");
					$.weeboxs.close();
					location.href = location.href;
				}
				else
				{
					if(result.error_msg)
						alert(result.error_msg);
					else
						alert(LANG.pub_share_tip1);
				}
			},
			error:function(){
				$(obj).val(butTxt).removeClass('pub_loading').attr("disabled",false);
				alert(LANG.pub_share_tip1);
			}
		});
    };
    
	$.Share_Save = function(obj,loc_url)
	{
		if(!$.Check_Login())
			return false;

        var form = $(obj).parents("form").get(0);
		var module = $.trim(form.module.value);
		var action = $.trim(form.action.value);
		var url = SITE_PATH + 'services/service.php?m=' + module + '&a=' + action;
		var content = $.trim(form.content.value);
		if(content == '')
		{
			alert(LANG.share_content_require);
			return;
		}
		var albumid = parseInt(form.albumid.value);
		$.ajax({
			url: url,
			type: "POST",
			data:$(form).serialize(),
			cache:false,
			dataType: "json",
			success:function(result){
				
				if(result.status == 1)
				{
					$.weeboxs.close();
					location.href = result.url;
				}
				else
				{
					if(result.error_msg)
						alert(result.error_msg);
					else
						alert(LANG.pub_share_tip1);
				}
			},
			error:function(){
				$(obj).val(butTxt).removeClass('pub_loading').attr("disabled",false);
				alert(LANG.pub_share_tip1);
			}
		});
    };
    
	$.Share_Video_Save=function(pageUrl,albumid,pic_url,video_url,title,pub_out_check,video_detail){
		var query = new Object();
		query.pageUrl = pageUrl;
		query.imgArray = new Array(pic_url);
		query.videoArray=new Array(video_url);
		query.album_id = albumid;
		query.title = title;
		query.content = title;
		query.pub_out_check=pub_out_check;
		query.video_detail=video_detail;
		var url = SITE_PATH + 'services/service.php?m=collectshare&a=save';
		
		$.ajax({
			url: url,
			type: "POST",
			data:query,
			cache:false,
			dataType: "json",
			success:function(result){
				if(result.status == 1)
				{
					$.weeboxs.close();
					location.href = result.url;
				}	
				else
				{
					alert(result.message);
				}
			},
			error:function(){
				alert(LANG.pub_share_tip1);
			}
		});
	}
	
	
    $.Collect_Share_Save = function(obj,loc_url)//采集分享
	{
		if(!$.Check_Login())
			return false;

        var form = $(obj).parents("form").get(0);
        var _parent = $(obj).parent().parent().parent().parent().parent();
		var module = $.trim(form.module.value);
		var action = $.trim(form.action.value);
		var _length = $(".SHARE_IMG",_parent).length;
		
		var _imgArray = [];
		var _videoArray= [];
		for(var j=0;j<_length;j++)
		{
			var _share_src = $(".SHARE_IMG:eq("+j+")",_parent).attr("src");
			var _share_video=$(".SHARE_VIDEO:eq("+j+")").attr("href");
			_imgArray[j] = _share_src;
			
			_videoArray[j]=_share_video;
			
		}
		var query = new Object();
		query.pageUrl = $("#pageUrl").val();
		query.imgArray = _imgArray;
		query.videoArray=_videoArray;
		query.album_id = $("#albumid",_parent).val();
		query.title = $(".comboxText",_parent).val();
		query.content = $("#addTitle0",_parent).val();
		
		var pub_out_check = 0;
		if($("#checkbox-4",_parent).attr("checked") == true)
		{
			pub_out_check = 1;
		}
		query.pub_out_check = pub_out_check;
		
		var url = SITE_PATH + 'services/service.php?m=' + module + '&a=' + action;
		
		$.ajax({
			url: url,
			type: "POST",
			data:query,
			cache:false,
			dataType: "json",
			success:function(result){
				if(result.status == 1)
				{
					location.href = result.success_url;
				}	
				else
				{
					alert(result.message);
				}
			},
			error:function(){
				alert(LANG.pub_share_tip1);
			}
		});
    };
    
    /*=====================删除分享数据============================*/
	$.Tweet_Delete = function(share_id,type)
	{
		var query = new Object();
		query.id = share_id;
		query.type = type;

		$.ajax({
			url:SITE_PATH+"manage/manage.php?m=share&a=delete",
			type: "POST",
			data:query,
			cache:false,
			dataType: "json",
			success:function(result){
				if(result.status == 1)
				{
					$.weeboxs.close();
					location.href = location.href;
				}
			}
		});
	}
	/*=====================分享发布END  =====================*/

    /*=====================@她 BEGIN=====================*/
	//显示@她
	$.AtMe_Share = function(obj)
	{
		if(!$.Check_Login())
			return false;

		$.weeboxs.close();

		var readyFun = function(weebox){
			FANWE.ATME_HTML = weebox.dc.html();
			$("#ATME_BOX #atme_content").val("@"+obj.getAttribute("toname")+":");
		};
		if(FANWE.ATME_HTML == null)
			$.weeboxs.open(SITE_PATH+"services/service.php?m=share&a=atme",{boxid:'ATME_BOX',contentType:'ajax',draggable:false,showButton:false,width:480,onready:readyFun,title:"有什么想对她说的？"});
		else
			$.weeboxs.open(FANWE.ATME_HTML,{boxid:'ATME_BOX',contentType:'text',draggable:false,showButton:false,width:480,onready:readyFun,title:"有什么想对她说的？"});
	}

	//提交@她
	$.AtMe_Share_Save = function(obj)
	{
		var form = $(obj).parents("form");
		var formobj = form.get(0);
		if($.trim(formobj.content.value) == '')
		{
			alert(LANG.relay_content_require);
			return;
		}

		$.Show_Btn_Loading(obj);
		var query = form.serialize();
		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=save",
			data:query,
			type: "POST",
			dataType: "json",
			success: function(result){
				if(result.status == 1)
				{
					formobj.reset();
					$.weeboxs.close();
				}
				else
					alert(result.error);

				$.Remove_Btn_Loading(obj);
			},
			error:function(){
				$.Remove_Btn_Loading(obj);
			}
		});
		return false;
	}
	/*=====================@她 END  =====================*/

	/*=====================分享转发BEGIN=====================*/
	//显示分享转发
	$.Relay_Share = function(id)
	{
		if(!$.Check_Login())
			return false;

		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=share&a=relay&id="+id, {boxid:'RELAY_BOX',contentType:'ajax',draggable:false,showButton:false,title:LANG.relay_share,width:638,height:312,isFull:true});
	}

	//提交分享转发
	$.Add_Share_Relay = function(obj)
	{
		var form = $(obj).parents("form");
		var formobj = form.get(0);
		if($.trim(formobj.content.value) == '')
		{
			alert(LANG.relay_content_require);
			return;
		}

		$(obj).removeClass("callon").addClass("calloff");
		$(obj).html("保存");
		var query = form.serialize();
		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=addrelay",
			data:query,
			type: "POST",
			dataType: "json",
			success: function(result){
				if(result.status == 1)
				{
					formobj.reset();
					$.weeboxs.close();
					location.href = location.href;
				}
				else
					alert(result.error);

				$.Remove_Btn_Loading(obj);
			},
			error:function(){
				$.Remove_Btn_Loading(obj);
			}
		});
		return false;
	}
	/*=====================分享转发END  =====================*/

	/*=====================喜欢分享BEGIN=====================*/
	//喜欢分享
	$.Fav_Share = function(share_id,obj,size,parentKey)
	{
		if(!$.Check_Login())
			return false;

		var query = new Object();
		query.id = share_id;
		query.size = size;

		var parent;
		if(parentKey == null)
			parent = $(obj).parent();
		else
			parent = $(parentKey);

		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=fav",
			type: "POST",
			data:query,
			dataType: "json",
			success:function(result){
				var num = result.count;
				$(obj).hide();
				var _parent = $(obj).parent().parent();
				$(".nopointe",_parent).children(".number").html(num);
				$(".nopointe",_parent).show();
			}
		});
	}
	
	//花瓣模板 专用喜欢
	$.Fav_Share_hua = function(share_id,obj)
	{
		if(!$.Check_Login())
			return false;
		var url = '';
		var newTxt = '';
		var newAttr = '';
		var query = new Object();
		query.id = share_id;
		query.size = 32;
		var st = $(obj).attr('st');
		
		if(st == 'like')
		{
			url = SITE_PATH+"services/service.php?m=share&a=removefav";
			newTxt = '<strong><em></em>喜欢</strong><span></span>';
			newAttr = 'unlike';
		}
		else
		{
			url = SITE_PATH+"services/service.php?m=share&a=fav";
			newTxt = '<strong><em></em>取消喜欢</strong><span></span>';
			newAttr = 'like';
		}
		$.ajax({
			url: url,
			type: "POST",
			data:query,
			dataType: "json",
			success:function(result){
				$(obj).html(newTxt);
				$(obj).attr('st',newAttr);
			}
		});
	}

	$.Remove_Fav_Share = function(share_id,obj,parentKey)
	{
		if(!$.Check_Login())
			return false;

		var query = new Object();
		query.id = share_id;

		var parent;
		if(parentKey == null)
			parent = $(obj).parent();
		else
			parent = $(parentKey);

		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=removefav",
			type: "POST",
			data:query,
			dataType: "json",
			success: function(result){
				if(result.status == 1)
				{
					if(result.count > 0)
						$(".SHARE_FAV_BOX",parent).show();
					else
						$(".SHARE_FAV_BOX",parent).hide();
					$(".SHARE_FAV_COUNT",parent).html(result.count);
					$(".SHARE_FAV_LIST",parent).html(result.collects);
					$.Close_Fav_Box();
				}
			}
		});
	}

	$.Close_Fav_Box = function()
	{
		clearTimeout(FANWE.Fav_Timer);
		$("#fav_fanwe").remove();
		$("#fav_tip").remove();
	}
	/*=====================喜欢分享END  =====================*/
	
	/*=====================专辑关注BEGIN=====================*/
	$.Follow_Album = function(album_id,obj)
	{
		if(!$.Check_Login())
			return false;
		var query = new Object();
		query.album_id = album_id;
		$.ajax({
			url: SITE_PATH+"services/service.php?m=album&a=follow",
			type: "POST",
			data:query,
			dataType:"json",
			success:function(result){
				if(result.status == 1)
				{
					if(result.is_follow == 1)
					{
						$(obj).html('<strong>取消关注</strong><span></span>');
					}
					else
					{
						$(obj).html('<strong>关注</strong><span></span>');
					}	
				}
			}
		})
		
	}
	
	/*=====================专辑关注END=======================*/
	
	/*=====================评论分享BEGIN=====================*/
	$.Pop_Share_Comment = function(share_id)
	{
		$.Close_Fav_Box();
		$.weeboxs.close();

		if(!$.Check_Login())
			return false;

		$.weeboxs.open(SITE_PATH+"services/service.php?m=share&a=comment&id="+share_id, {boxid:'COMMENT_BOX',contentType:'ajax',draggable:false,showButton:false,title:LANG.comment_share,width:480});
	}

	$.Add_Share_Comment = function(obj,parentID)
	{
		if(!$.Check_Login())
			return false;
		var form = $(obj).parents("form");
		var formobj = form.get(0);

		if($.trim(formobj.content.value)=='')
		{
			alert(LANG.comment_content_require);
			formobj.content.focus();
			return false;
		}

		var query = form.serialize();

		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=addcomment",
			type: "POST",
			cache:false,
			data:query,
			dataType: "json",
			success: function(result){
				if(result.status == 1)
				{
					formobj.reset();
					if($(parentID).length > 0)
					{
						var item = $(result.html).css({"display":"none"});
						
						$(parentID).prepend(item);
						item.slideDown("slow");
					}
					$.weeboxs.close();
				}
				else
				{
					alert(result.error);
				}
			}
		});
	}

	$.Get_Share_Comment = function(share_id,page,boxID,fun)
	{
		var query = new Object();
		query.page = page;
		query.share_id = share_id;

		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=comments",
			type: "POST",
			cache:false,
			data:query,
			dataType: "html",
			success: function(html){
				$(boxID).html(html);
				if(fun != null)
					fun.call(this);
			}
		});
	}

	$.Get_Share_Comment_List = function(obj)
	{
		var parent = $(obj).parent();
		var cmtList = parent.siblings('.SHARE_COMMENT_LIST_BOX');
		if(cmtList.length > 0)
		{
			cmtList.remove();
			return false;
		}

		var shareID = $(obj).attr('shareID');
		var query = new Object();
		query.id = shareID;

		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=listcomment",
			data:query,
			cache:false,
			type: "POST",
			success: function(html){
				parent.after(html);
				parent.siblings('.SHARE_COMMENT_LIST_BOX').show();
				$.Pub_Count_Bind($(".SHARE_COMMENT_LIST_BOX .PUB_TXT").get(0));
			}
		});
	}

	$.Reply_Comment = function(obj)
	{
		if(!$.Check_Login())
			return false;

		var userName = $(obj).attr('uname');
		var cid = $(obj).attr('cid');
		var form = $(obj).parents("form").get(0);
		form.content.value = "//@"+ userName +":" + form.content.value;
		form.parent_id.value = cid;
	}
	/*=====================评论分享END  =====================*/

	/*=====================分享标签BEGIN=====================*/
	$.ShareTagEdit = function(share_id,obj)
    {
        var parent = $(obj).parents("#SHARE_TAGS_"+share_id);
        $('.SHARE_TAG_EDIT_BOX',parent).show();
        $('.SHARE_TAG_SHOW_LIST',parent).hide();
    }

    $.ShareTagClose = function(share_id,obj)
    {
		$.Remove_Btn_Loading(obj);
        var parent = $(obj).parents("#SHARE_TAGS_"+share_id);
        $('.SHARE_TAG_EDIT_BOX',parent).hide();
        $('.SHARE_TAG_SHOW_LIST',parent).show();
    }

    $.ShareTagSave = function(share_id,obj)
    {
        var parent = $(obj).parents("#SHARE_TAGS_"+share_id);
        var tags = $.trim($('.SHARE_TAG',parent).val());
        var query = new Object();
		query.share_id = share_id;
        query.tags = tags;
		var btnTxt = $(obj).html();
		$(obj).html('');
		$.Show_Btn_Loading(obj);

		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=savetag",
			type: "POST",
			cache:false,
			data:query,
			dataType: "json",
			success: function(result){
				if(result.status == 1)
				{
					$('.SHARE_TAG',parent).val(result.tags);
					$('.SHARE_TAG_LIST',parent).html(result.html);
					$('.SHARE_TAG_EDIT_BOX',parent).hide();
					$('.SHARE_TAG_SHOW_LIST',parent).show();
				}
				else
				{
					alert(result.error);
				}
				$(obj).html(btnTxt);
				$.Remove_Btn_Loading(obj);
			}
		});
    }
	/*=====================分享标签END  =====================*/

	/*=====================主题BEGIN=====================*/
	$.Topic_Post_Save = function(obj)
	{
		if(!$.Check_Login())
			return false;

        var form = $(obj).parents("form").get(0);
		var module = $.trim(form.module.value);
		var action = $.trim(form.action.value);
		var url = SITE_PATH + 'services/service.php?m=' + module + '&a=' + action;
		var content = $.trim(form.content.value);
		if(content == '')
		{
			alert(LANG.post_content_require);
			return;
		}

		$.Pub_Img_Sort(form);
		var butTxt = $(obj).val();

		$(obj).val('').addClass('pub_loading').attr("disabled",true);
		$.ajax({
			url: url,
			type: "POST",
			data:$(form).serialize(),
			cache:false,
			dataType: "json",
			success:function(result){
				$(obj).val(butTxt).removeClass('pub_loading').attr("disabled",false);
				if(result.status == 1)
				{
					$.Pub_Share_Reset(form);
					var share_item = $(result.html).css({"display":"none"});
					$("#SHARE_DETAIL_LiST").prepend(share_item);
					share_item.slideDown("slow");
				}
				else
				{
					if(result.error_msg)
						alert(result.error_msg);
					else
						alert(LANG.pub_post_tip1);
				}
			},
			error:function(){
				$(obj).val(butTxt).removeClass('pub_loading').attr("disabled",false);
				alert(LANG.pub_post_tip1);
			}
		});
    };
	/*=====================主题END  =====================*/

	/*=====================评论BEGIN=====================*/
	//删除评论
	$.Delete_Comment = function(comment_id,obj)
    {
        var query = new Object();
		query.comment_id = comment_id;

		$.ajax({
			url: SITE_PATH+"manage/manage.php?m=share&a=delcomment",
			type: "POST",
			cache:false,
			data:query,
			dataType: "json",
			success: function(result){
				if(result.status == 1)
					$("#COMMENT_" + comment_id).slideUp('slow');
			}
		});
    }
	/*=====================评论END  =====================*/
	
	
	
	/*=====================专辑BEGIN=====================*/
	//保存专辑
	$.Save_Album = function(obj,func)
    {
		var parent = $(obj).parent();
        var query = new Object();
		query.cid = $(".album_cid",parent).val();
		query.title = $.trim($(".album_name",parent).val());
		
		if(query.title == '' || query.title == LANG.new_album_name)
			return;
			
		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=savealbum",
			type: "POST",
			cache:false,
			data:query,
			dataType: "json",
			success: function(result){
				if(result.status == 1)
				{
					if(func != null)
						func.call(this,result);
				}
				else
					alert(result.msg);
			}
		});
    }
	//新建用户专辑-杂志社
	$.User_Album = function()
	{
		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=user&a=album", {contentType:'ajax',draggable:false,showButton:false,title:LANG.add_album,width:384});
	}
	//编辑用户专辑-杂志社
	$.Edit_Album = function(id)
	{
		$.weeboxs.close();
		$.weeboxs.open(SITE_PATH+"services/service.php?m=user&a=editalbum&id="+id, {contentType:'ajax',draggable:false,showButton:false,title:LANG.edit_album,width:384});
	}
	$.Update_User_Album = function(obj,func)
	{
		var parent = $(obj).parent().parent();
        var query = new Object();
		query.cid = $('input:radio[name="album_cid"]:checked',parent).val();
		query.title = $.trim($(".deftest",parent).val());
		query.id = $("#album_id",parent).val();
		
		if(query.title == '' || query.title == LANG.new_album_name)
			return;
			
		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=updatealbum",
			type: "POST",
			cache:false,
			data:query,
			dataType: "json",
			success: function(result){
				if(result.status == 1)
				{
					if(func != null)
						func.call(this,result);
				}
				else
					alert(result.msg);
			}
		});
	}
	$.Create_User_Album = function(obj,func)
	{
		var parent = $(obj).parent().parent();
        var query = new Object();
		query.cid = $('input:radio[name="album_cid"]:checked',parent).val();
		query.title = $.trim($(".deftest",parent).val());
		
		if(query.title == '' || query.title == LANG.new_album_name)
			return;
			
		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=savealbum",
			type: "POST",
			cache:false,
			data:query,
			dataType: "json",
			success: function(result){
				if(result.status == 1)
				{
					if(func != null)
						func.call(this,result);
				}
				else
					alert(result.msg);
			}
		});
	}
	
	//新建专辑
	$.New_Create_Album = function(obj,func)
    {
		
		var parent = $(obj).parent();
        var query = new Object();
		query.cid = $(".album_cid",parent).val();
		query.title = $.trim($(".deftest",parent).val());
		
		if(query.title == '' || query.title == LANG.new_album_name)
			return;
			
		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=savealbum",
			type: "POST",
			cache:false,
			data:query,
			dataType: "json",
			success: function(result){
				if(result.status == 1)
				{
					if(func != null)
						func.call(this,obj,result);
				}
				else
					alert(result.msg);
			}
		});
    }
	
	$.Get_Album_Page = function(aid,page,size,func)
	{
		if(!$.Check_Login())
			return false;
		
		var query = new Object();
		query.aid = aid;
		query.page = page;
		query.size = size;
	
		$.ajax({
			url: SITE_PATH+"services/service.php?m=share&a=getalbumpage",
			type: "POST",
			data:query,
			dataType: "json",
			success: function(result)
			{
				if(func != null)
					func.call(this,result);
			}
		});
	}
	
	$.Show_Rel_Album = function(id,type)
    {
		if(!$.Check_Login())
			return false;
			
		FANWE.ALBUM_PAGE = 1;
		FANWE.ALBUM_SELECT_ID = 0;
		FANWE.ALBUM_MAX_PAGE = 2;
		var readyFun = function(weebox)
		{
			$(weebox.dc).delegate(".album_ul li",'mouseover',function(){
				$(this).addClass('checked');
			}).delegate(".album_ul li",'mouseout',function(){
				$(this).removeClass('checked');
			}).delegate(".album_ul li",'click',function(){
				FANWE.ALBUM_SELECT_ID = this.getAttribute("album");
				$(".PUB_ALBUM_ID",weebox.dc).val(FANWE.ALBUM_SELECT_ID);
				$("input",this).attr('checked',true);
			});
			
			FANWE.ALBUM_MAX_PAGE = parseInt($(".albumMaxPage",weebox.dc).val());
			var func = function(result)
			{
				FANWE.ALBUM_MAX_PAGE = result.pager.page_count;
				FANWE.ALBUM_PAGE = result.pager.page;
				$(".album_ul",weebox.dc).html(result.html);
				$(".cu_page",weebox.dc).html(result.pager.page);
				$(".all_page",weebox.dc).html(result.pager.page_count);
			}
			
			FANWE.CREATE_ALBUM_FUN = function(result)
			{
				FANWE.ALBUM_SELECT_ID = result.aid;
				FANWE.ALBUM_PAGE = 1;
				$.Get_Album_Page(FANWE.ALBUM_SELECT_ID,FANWE.ALBUM_PAGE,6,func);
				$(".create_small",weebox.dc).show();
				$(".create_new",weebox.dc).hide();
			}

			$(".page_slide .left",weebox.dc).unbind();
			$(".page_slide .left",weebox.dc).bind('click',function(){
				if(FANWE.ALBUM_PAGE > 1)
				{
					FANWE.ALBUM_PAGE--;
					$.Get_Album_Page(FANWE.ALBUM_SELECT_ID,FANWE.ALBUM_PAGE,6,func);
				}
			});
			
			$(".page_slide .right",weebox.dc).unbind();
			$(".page_slide .right",weebox.dc).bind('click',function(){
				if(FANWE.ALBUM_PAGE < FANWE.ALBUM_MAX_PAGE)
				{
					FANWE.ALBUM_PAGE++;
					$.Get_Album_Page(FANWE.ALBUM_SELECT_ID,FANWE.ALBUM_PAGE,6,func);
				}
			});
			
			$(".create_small",weebox.dc).bind('click',function(){
				$(this).hide();
				$(".create_new",weebox.dc).show();
			});
			
			$(".album_name",weebox.dc).bind('focus',function(){
				var old = this.getAttribute("albumName");
				if(this.value == old)
				{
					this.value = '';
					$(this).css('color',"#000");
				}
			}).bind('blur',function(){
				var old = this.getAttribute("albumName");
				if(this.value == old || this.value == '')
				{
					this.value = old;
					$(this).css('color',"#ccc");
				}
			});
			
			var isTextHeight = false;
			$(".album_text",weebox.dc).bind('focus',function(){
				var old = this.getAttribute("default");
				if(this.value == old)
					this.value = '';
				$(this).css({"color":"#000","height":70});
				if(!isTextHeight)
				{
					weebox.dc.height(weebox.dc.height() + 50);
					isTextHeight = true;
				}
			}).bind('blur',function(){
				var old = this.getAttribute("default");
				if(this.value == old || this.value == '')
				{
					this.value = old;
					$(this).css('color',"#ccc");
				}
			});
		};
			
		$.weeboxs.open(SITE_PATH+"services/service.php?m=share&a=relalbum&id="+id+"&type="+type,{boxid:'REL_ALBUM_BOX',contentType:'ajax',draggable:false,modal:true,showButton:false,title:'加入杂志社',width:496,onready:readyFun});
		
    }
	
	$.Save_Rel_Album = function(obj)
	{
		if(!$.Check_Login())
			return false;
		
		var form = $(obj).parents("form").get(0);
		if(parseInt(form.albumid.value) == 0)
		{
			alert(LANG.add_rel_album_err1);	
			return false;
		}
		
		var url = SITE_PATH + 'services/service.php?m=share&a=saverelalbum';
		$(obj).hide();
		$('.sub_loading',form).show();
		
		$.ajax({
			url: url,
			type: "POST",
			data:$(form).serialize(),
			cache:false,
			dataType: "json",
			success:function(result){
				$(obj).show();
				$('.sub_loading',form).hide();
				
				if(result.status == 1)
				{
					$.Show_Tooltip(LANG.add_rel_album_ok);
				}
				else
				{
					if(result.error_msg)
						alert(result.error_msg);
					else
						alert(LANG.add_rel_album_err);
				}
			},
			error:function(){
				$(obj).show();
				$('.sub_loading',form).hide();
				alert(LANG.add_rel_album_err);
			}
		});
	}
	
	$.Remove_Album = function(aid,obj)
	{
		if(!$.Check_Login())
			return false;
		
		var query = new Object();
		query.aid = aid;
		var url = SITE_PATH + 'services/service.php?m=album&a=remove';
		$(obj).attr("disabled",true);
		$.ajax({
			url: url,
			type: "POST",
			data:query,
			cache:false,
			dataType: "json",
			success:function(result){
				var fun = function()
				{
					location.href = location.href;
				}
				setTimeout(fun,1);
			},
			error:function(){
				$(obj).attr("disabled",false);
			}
		});
	}
	
	$.Best_Album = function(aid,func)
	{
		if(!$.Check_Login())
			return false;
		
		var readyFun = function(weebox)
		{
			FANWE.ALBUM_BEST_FUNC = func;
			$.Pub_Count_Bind($("#best_form_content").get(0));
		}
		
		$.weeboxs.open(SITE_PATH+"services/service.php?m=album&a=getbest&id="+aid,{boxid:'BEST_ALBUM_BOX',contentType:'ajax',draggable:false,modal:true,showButton:false,showHeader:false,width:496,onready:readyFun});
	}
	
	$.Remove_Best_Album =function(aid,obj,func)
	{
		var query = new Object();
		query.aid = aid;
		
		FANWE.ALBUM_BEST_FUNC = func;
		
		var url = SITE_PATH + 'services/service.php?m=album&a=removebest';
		$(obj).attr("disabled",true);
		$.ajax({
			url: url,
			type: "POST",
			data:query,
			cache:false,
			dataType: "json",
			success:function(result){
				$(obj).attr("disabled",true);
				if(result.status != -1)
				{
					if(FANWE.ALBUM_BEST_FUNC != null)
						FANWE.ALBUM_BEST_FUNC.call(this,result);
				}
			},
			error:function(){
				$(obj).attr("disabled",false);
			}
		});
	}
	
	$.Save_Best_Album = function(obj)
	{
		if(!$.Check_Login())
			return false;
		
		var form = $(obj).parents("form").get(0);
		if($.trim(form.content.value) == '')
		{
			alert(LANG.relay_content_require);
			return;
		}
		
		var url = SITE_PATH + 'services/service.php?m=album&a=addbest';
		$(obj).hide();
		$('.sub_loading',form).show();
		$.ajax({
			url: url,
			type: "POST",
			data:$(form).serialize(),
			cache:false,
			dataType: "json",
			success:function(result){
				$(obj).attr("disabled",true);
				if(result.status != -1)
				{
					if(FANWE.ALBUM_BEST_FUNC != null)
						FANWE.ALBUM_BEST_FUNC.call(this,result);
					$.Show_Tooltip(LANG.best_album_ok);
				}
				else
				{
					alert(result.msg_error);
				}
			},
			error:function(){
				$(obj).show();
				$('.sub_loading',form).hide();
			}
		});
	}
	/*=====================专辑END  =====================*/
	
	//显示按钮loading
	$.Show_Btn_Loading = function(obj)
	{
		$(obj).attr("disabled",true);
		var html = '<img class="btn_loading_fanwe" src="'+ TPL_PATH +'images/btn_loading.gif" width="20" height="20" />';
		var width = $(obj).width();
		var height = $(obj).height();
		var top = $(obj).offset().top + (height - 20) / 2;
		var left = $(obj).offset().left + (width - 20) / 2;
		/*var zindex = parseInt($(obj).css('z-index'));
		if(isNaN(zindex))
			zindex = 0;
		zindex++;*/
		var zindex = 10000;
		$("body").append(html);
		$('.btn_loading_fanwe').css({"position":"absolute","left":left,"top":top,"z-index":zindex});
	}

	//删除按钮loading
	$.Remove_Btn_Loading = function(obj)
	{
		$(obj).attr("disabled",false);
		$('.btn_loading_fanwe').remove();
	}

	//字数统计
	$.Recount_Word = function(obj)
	{
		var form = obj.form;
		try{
		if(obj.getAttribute('length') == undefined)
			return false;
		}catch(e){ return false;}

		var maxLength = obj.getAttribute('length');

		var cnt = $(obj).val();

		var length = cnt.length;
		if(length > maxLength)
		{
			cnt = cnt.substr(0,maxLength);
			$(obj).val(cnt);
			$(".WORD_COUNT",form).html(0);
		}
		else
		{
			$(".WORD_COUNT",form).html(length);
			$.checkForm();//模板services/user/share 弹出的分享框使用
		}
	}
	
	//新增分享框验证
	
	$.checkForm = function()
	{
		if($("#thumb0").css('display') == 'block' && $("#albumid").val() != 0 && $.trim($("#addTitle0").val()) != "")	
		{
				$("#btnSaveBoardPic0").removeClass("calloff");
				$("#btnSaveBoardPic0").addClass("big-btn");
		}
		else
		{
				$("#btnSaveBoardPic0").removeClass("calloff");
				$("#btnSaveBoardPic0").addClass("calloff");
		}
	}

	//分享发布输入框绑定
	$.Pub_Count_Bind = function(obj)
	{
		var txt = $(obj);
		txt.attr({"position":txt.val().length});

		txt.bind('click', function(){
			txt.attr({"position":$(this).position()});
		});

		txt.bind('keyup', function(){
			txt.attr({"position":$(this).position()});
			if(this.getAttribute("cut") != 'false')
				$.Recount_Word(this);
		});

		if(txt.length > 0)
			$.Recount_Word(obj);
	}
	$.ScaleImage = function(obj,src,scaleType,scaleWidth,scaleHeight)
	{
		var parent = $(obj).parent();
		var img= new Image();
		img.src = src;
		
		if(isNaN(scaleType) || isNaN(scaleWidth) || isNaN(scaleHeight) || scaleType < 1 || (scaleWidth < 1 && scaleHeight < 1))
		{
			obj.src = src;
			delete img;
			return;
		}
		
		var autoScale = function(){
			var width = 0;
			var height = 0;
			var scale = img.width / img.height;

			if(img.width == 0 || img.height == 0)
			{
				delete img;
				return;
			}

			switch(scaleType)
			{
				case 1:
					if(img.width > scaleWidth)
					{
						width = scaleWidth;
						height = scaleWidth / scale;
					}
					else
					{
						scale = scaleWidth / img.width;
						width = scaleWidth;
						height = img.height * scale;
					}
				break;

				case 2:
					if(img.height > scaleHeight)
					{
						height = scaleHeight;
						width = scaleHeight * scale;
					}
					else
					{
						scale = scaleHeight / img.height;
						height = scaleHeight;
						width = img.width * scale;
					}
				break;

				case 3:
					if(scaleWidth/img.width < scaleHeight/img.height)
					{
						scale = scaleHeight / img.height;
						height = scaleHeight;
						width = img.width * scale;
					}
					else
					{
						scale = scaleWidth / img.width;
						width = scaleWidth;
						height = img.height * scale;
					}
				break;
				
				case 4:
					if(scaleWidth/img.width > scaleHeight/img.height)
					{
						scale = scaleHeight / img.height;
						height = scaleHeight;
						width = img.width * scale;
					}
					else
					{
						scale = scaleWidth / img.width;
						width = scaleWidth;
						height = img.height * scale;
					}
				break;

				default:
					delete img;
					return;
				break;
			}
			
			obj.width = width;
			obj.height = height;
			obj.src = img.src;
			if(scaleType == 3)
			{
				var left = (parent.width() - width) / 2;
				var top = (parent.height() - height) / 2;
				$(obj).css({"margin-top":top,"margin-left":left});
			}
			else
			{
				if($(obj).attr("updateParentSize") == "1")
					$(obj).parent().css({"width":width,"height":height});
			}
			delete img;
		};

		if(img.complete){
			autoScale();
			return;
		}

		$(img).load(function(){
			autoScale();
			return;
		});
	}
		$.Share_Publish_Init=function(form){
		$.Pub_Count_Bind($(".PUB_TXT",form).get(0));
		
		var goodsDetailed;
		var photoDetailed;
		
		var goodsDetailedFun = function(event){
			goodsDetailed = $(".PUB_GOODS_DETAILED",form);
			var target = event.target ? event.target : event.srcElement;
			if($("select",goodsDetailed).get(0) == target)
				return;
			
			if(!$.getClickIsElement(goodsDetailed,event))
			{
				if(goodsDetailed.hasClass("PUB_GOODS_DETAILEDL"))
				{
					goodsDetailed.animate({"width":0},300,"easeOutSine",function(){
						goodsDetailed.hide();
					});
				}
				else
				{
					var position = goodsDetailed.position();
					goodsDetailed.animate({"width":0,"left":position.left + 240},300,"easeOutSine",function(){
						goodsDetailed.hide();
					});
				}
				saveGoodsInfo();
			}
		};
		
		var saveGoodsInfo = function(){
			goodsDetailed = $(".PUB_GOODS_DETAILED",form);
			$("body").unbind("click",goodsDetailedFun);

			if($('.PUB_DETAILED_SELF .GOODS_INFO',form).length < 1)
				return false;

			var info = jQuery.parseJSON(Base64.decode($('.PUB_DETAILED_SELF .GOODS_INFO',form).val()));
			info.item.goodsalt = $('.PGD_GOODSALT',goodsDetailed).val();
			if($(".colorblockok",goodsDetailed).length > 0)
				info.item.color = $(".colorblockok",goodsDetailed).attr("colorID");
			else
				info.item.color = 0;
			info.item.cid = $(".PGD_GOODSCATE",goodsDetailed).val();
			$('.PUB_DETAILED_SELF .GOODS_INFO',form).val(Base64.encode(JSON.stringify(info)));
		}
		
		var photoDetailedFun = function(event){
			photoDetailed = $(".PUB_PHOTO_DETAILED",form);
			if(!$.getClickIsElement(photoDetailed,event))
			{
				if(photoDetailed.hasClass("PUB_PHOTO_DETAILEDL"))
				{
					photoDetailed.animate({"width":0},300,"easeOutSine",function(){
						photoDetailed.hide();
					});
				}
				else
				{
					var position = photoDetailed.position();
					photoDetailed.animate({"width":0,"left":position.left + 240},300,"easeOutSine",function(){
						photoDetailed.hide();
					});
				}
				savePhotoInfo();
			}
		};
		
		var savePhotoInfo = function(){
			photoDetailed = $(".PUB_PHOTO_DETAILED",form);
			$("body").unbind("click",photoDetailedFun);

			if($('.PUB_DETAILED_SELF .PHOTO_INFO',form).length < 1)
				return false;

			var info = jQuery.parseJSON(Base64.decode($('.PUB_DETAILED_SELF .PHOTO_INFO',form).val()));
			info.photoalt = $('.PHD_PHOTOALT',photoDetailed).val();
			$('.PUB_DETAILED_SELF .PHOTO_INFO',form).val(Base64.encode(JSON.stringify(info)));
		}
		
		$(".PUB_IMG li p img",form).on('click',function(event){
			var target = event.target ? event.target : event.srcElement;
			var str = '[IMG'+$(target).attr('photo_id')+']';
			$('.PUB_TXT').insertContent(str,0);
		});
		/*$(".PUB_IMG li:not(.PUB_LOOK_DAPEI)",form).on('mousedown',function(event){
			var target = event.target ? event.target : event.srcElement;
			if($(".PUB_IMG li",form).length > 1)
			{
				$('.PUB_IMG',form).sortable({items: "li:not(.PUB_LOOK_DAPEI)"});
				$('.PUB_IMG',form).disableSelection();
			}
			
			if($(".del",this).get(0) == target)
				return;
				
			if($("span",this).get(0) != target)
			{
				var type = $(this).attr('type');
				switch(type)
				{
					case "goods":
						$(".PUB_GOODS_DETAILED",form).hide();
						saveGoodsInfo();
					break;
					
					case "photo":
						$(".PUB_PHOTO_DETAILED",form).hide();
						savePhotoInfo();
					break;
				}
			}
		});*/
		
		$(".PGD_CLOSE",form).on('click',function(){
			$(".PUB_GOODS_DETAILED",form).hide();
			saveGoodsInfo();
			return false;
		});
		
		$(".PHD_CLOSE",form).on('click',function(){
			$(".PUB_PHOTO_DETAILED",form).hide();
			savePhotoInfo();
			return false;
		});
		
		$(".PUB_IMG li span",form).on('click',function(){
			goodsDetailed = $(".PUB_GOODS_DETAILED",form);
			photoDetailed = $(".PUB_PHOTO_DETAILED",form);
			goodsDetailed.stop();
			goodsDetailed.hide();
			photoDetailed.stop();
			photoDetailed.hide();
			
			var thisobj = $(this).parent();
			$(".PUB_IMG li",form).removeClass("PUB_DETAILED_SELF");
			thisobj.addClass("PUB_DETAILED_SELF");
			
			var position = thisobj.position();
			var marginTop = parseInt(thisobj.css("margin-top"));
			if(isNaN(marginTop))
				marginTop = 0;
			
			var type = thisobj.attr('type');
			var index = $(".PUB_IMG li",form).index(thisobj);
			
			var goodsFun = function(){
				if($('.GOODS_INFO',thisobj).length < 1)
					return false;

				var info = jQuery.parseJSON(Base64.decode($('.GOODS_INFO',thisobj).val()));
				$(".PGD_PRICE",goodsDetailed).html("¥" + info.item.price);
				$(".PGD_COMMISSION",goodsDetailed).hide();
				if(info.item.goodsalt)
					$(".PGD_GOODSALT",goodsDetailed).val(info.item.goodsalt);
				else
					$(".PGD_GOODSALT",goodsDetailed).val("");
				
				$(".colorblock",goodsDetailed).removeClass('colorblockok');
				if(info.item.color && info.item.color > 0)
				{
					$(".colorblock[colorID='"+info.item.color+"']",goodsDetailed).addClass('colorblockok');
				}
				if(info.item.user_commission && IS_OPEN_COMMISSION == 1)
				{
					$(".PGD_COMMISSION",goodsDetailed).show();
					$("span.PGD_COMMISSION",goodsDetailed).html( info.item.user_commission);
				}
				
				if(info.item.cid > 0)
				{
					var goodsCate = $(".PGD_GOODSCATE",goodsDetailed);
					var goodscateoption = $("option[value='"+ info.item.cid +"']",goodsCate);
					$(".PGD_GOODSCATESTR",goodsDetailed).show().html(goodscateoption.attr('cateName'));
					goodsCate.get(0).selectedIndex = $("option",goodsCate).index(goodscateoption);
					goodsCate.hide();
				}
				else
				{
					$(".PGD_GOODSCATE",goodsDetailed).get(0).selectedIndex = 0;
					$(".PGD_GOODSCATE",goodsDetailed).show();
					$(".PGD_GOODSCATESTR",goodsDetailed).hide();
				}
				
				if(index % 6 < 3)
				{
					goodsDetailed.removeClass("PUB_GOODS_DETAILEDR").addClass("PUB_GOODS_DETAILEDL");
					goodsDetailed.css({"top":position.top + marginTop,"left":position.left + 1 + thisobj.width(),"width":0});
					goodsDetailed.show();
					goodsDetailed.animate({"width":240},300,"easeInSine");
				}
				else
				{
					goodsDetailed.removeClass("PUB_GOODS_DETAILEDL").addClass("PUB_GOODS_DETAILEDR");
					goodsDetailed.css({"top":position.top + marginTop,"left":position.left - 13,"width":0});
					goodsDetailed.show();
					goodsDetailed.animate({"width":240,"left":position.left - 253},300,"easeInSine");
				}
				$("body").bind("click",goodsDetailedFun);
				return false;
			};
			
			var photoFun = function(){
				if($('.PHOTO_INFO',thisobj).length < 1)
					return false;

				var info = jQuery.parseJSON(Base64.decode($('.PHOTO_INFO',thisobj).val()));
				if(info.photoalt)
					$(".PHD_PHOTOALT",photoDetailed).val(info.photoalt);
				else
					$(".PHD_PHOTOALT",photoDetailed).val("");
					
				if(index % 6 < 3)
				{
					photoDetailed.removeClass("PUB_PHOTO_DETAILEDR").addClass("PUB_PHOTO_DETAILEDL");
					photoDetailed.css({"top":position.top + marginTop,"left":position.left + 1 + thisobj.width(),"width":0});
					photoDetailed.show();
					photoDetailed.animate({"width":240},300,"easeInSine");
				}
				else
				{
					photoDetailed.removeClass("PUB_PHOTO_DETAILEDL").addClass("PUB_PHOTO_DETAILEDR");
					photoDetailed.css({"top":position.top + marginTop,"left":position.left - 13,"width":0});
					photoDetailed.show();
					photoDetailed.animate({"width":240,"left":position.left - 253},300,"easeInSine");
				}
				$("body").bind("click",photoDetailedFun);
				return false;
			};
			
			switch(type)
			{
				case "goods":
					goodsFun();
				break;
				
				case "photo":
					photoFun();
				break;
			}
			
			return false;
		});
		
		$("body",form).on('click', '.PUB_GOODS_DETAILED .colorblock', function(){
			$(this).siblings().removeClass('colorblockok');
			$(this).toggleClass('colorblockok');
		});
	}
	
	//*****插入开始****//
	 $.fn.insertContent = function(myValue, t) {
		var $t = $(this)[0];
		if (document.selection) { //ie
			this.focus();
			var sel = document.selection.createRange();
			sel.text = myValue;
			this.focus();
			sel.moveStart('character', -l);
			var wee = sel.text.length;
			if (arguments.length == 2) {
				var l = $t.value.length;
				sel.moveEnd("character", wee + t);
				t <= 0 ? sel.moveStart("character", wee - 2 * t - myValue.length) : sel.moveStart("character", wee - t - myValue.length);
				 
				sel.select();
			}
		} else if ($t.selectionStart || $t.selectionStart == '0') {
			var startPos = $t.selectionStart;
			var endPos = $t.selectionEnd;
			var scrollTop = $t.scrollTop;
			$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
			this.focus();
			$t.selectionStart = startPos + myValue.length;
			$t.selectionEnd = startPos + myValue.length;
			$t.scrollTop = scrollTop;
			if (arguments.length == 2) {
				$t.setSelectionRange(startPos - t, $t.selectionEnd + t);
				this.focus();
			}
		}
		else {
			this.value += myValue;
			this.focus();
		}
	};
	//*****插入完毕****//
	
	//获取光标位置
	$.fn.position = function(){
		var s,e,range,stored_range;
		if(this[0].selectionStart == undefined)
		{
			var selection=document.selection;
			if (this[0].tagName.toLowerCase() != "textarea")
			{
				var val = this.val();
				range = selection.createRange().duplicate();
				range.moveEnd("character", val.length);
				s = (range.text == "" ? val.length:val.lastIndexOf(range.text));
				range = selection.createRange().duplicate();
				range.moveStart("character", -val.length);
				e = range.text.length;
			}
			else
			{
				range = selection.createRange(),
				stored_range = range.duplicate();
				stored_range.moveToElementText(this[0]);
				stored_range.setEndPoint('EndToEnd', range);
				s = stored_range.text.length - range.text.length;
				e = s + range.text.length;
			}
		}
		else
		{
			s=this[0].selectionStart,
			e=this[0].selectionEnd;
		}
		var te=this[0].value.substring(s,e);
		return s;
	};
})(jQuery);

(function($){
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

	$.checkPrice = function(val){
		var reg = /^\d+(\.\d+)?$/;
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
	
	$.getClickIsElement = function(obj,event)
	{
		var offset = obj.offset();
		var minX = offset.left;
		var minY = offset.top;
		var maxX = minX + obj.width();
		var maxY = minY + obj.height();
		if(event.pageX < minX || event.pageX > maxX || event.pageY < minY || event.pageY > maxY)
			return false;
		else
			return true;
	}
})(jQuery);
var userMenuTimeOut = null;
jQuery(function($){
	$("img.LOAD_SCALE_IMG").each(function(){
		var src = this.getAttribute('scaleSrc');
		var scaleType = parseInt(this.getAttribute('scaleType'));
		var scaleWidth = parseInt(this.getAttribute('scaleWidth'));
		var scaleHeight = parseInt(this.getAttribute('scaleHeight'));
		$.ScaleImage(this,src,scaleType,scaleWidth,scaleHeight);
	});
    $(".my_shotcuts a.message").hover(function(){
		$("#notice_menu").show();
	},function(){
		var menuHide = function(){
			$("#notice_menu").hide();
		};
		userMenuTimeOut = setTimeout(menuHide,100);
	});

	$("#notice_menu").hover(function(){
		clearTimeout(userMenuTimeOut);
	},function(){
		$(this).hide();
	});

	$(".PUB_TXT[position]").each(function(){
		$.Pub_Count_Bind(this);
	});

	$("input[tooltip],textarea[tooltip]").each(function(){
		if($.trim(this.value) == '')
		{
			this.value = this.getAttribute('tooltip');
			$(this).addClass('tipcolor');
		}
	});

	$("input[tooltip],textarea[tooltip]").focus(function(){
		$(this).removeClass('tipcolor');
		var tooltip = this.getAttribute('tooltip');
		if(this.value == tooltip)
			this.value = '';
	}).blur(function(){
		$(this).removeClass('tipcolor');
		if($.trim(this.value) == '')
		{
			this.value = this.getAttribute('tooltip');
			$(this).addClass('tipcolor');
		}
	});

	$('.SHOW_BIG_PIC').on('mousemove', function(){
		$('.SHOW_BIG',this).show();
	}).on('mouseout', function(){
		$('.SHOW_BIG',this).hide();
	});

	$('.SHARE_MANAGE').on('mouseover', function(){
		clearTimeout(FANWE.SHARE_MANAGE);
		$(".SHARE_MANAGE_LIST_CLONE").remove();
		var list = $(this).parent().siblings(".SHARE_MANAGE_LIST");
		var clone = list.clone();
		var left = $(this).offset().left + 10;
		var top = $(this).offset().top + 20;
		var height = $('li',list).length * 20 + 4;
		$('body').append(clone);
		clone.addClass('t_m_l SHARE_MANAGE_LIST_CLONE').css({"left":left,"top":top,"height":height}).slideDown(100);
	}).on('mouseout', function(){
		clearTimeout(FANWE.SHARE_MANAGE);
		var fun = function(){
			$(".SHARE_MANAGE_LIST_CLONE").hide();
		}
		FANWE.SHARE_MANAGE = setTimeout(fun,2000);
	});

	$(".SHARE_MANAGE_LIST_CLONE").on('mouseover', function(){
		clearTimeout(FANWE.SHARE_MANAGE);
		$(this).show();
	}).on('mouseout', function(){
		$(this).hide();
	});

	$(".PUB_SHARE_TAG_BOX li").on('click', function(){
		var form = $(this).parents("form");
		var tagInput = $('.PUB_SHARE_TAG',form);
		var tagValue = tagInput.val();
		tagValue = tagValue.replace('　',' ');
		tagValue = tagValue.replace(/ +/g,' ');
		tagValue = ' ' + $.trim(tagValue) + ' ';
		if($(this).hasClass('active'))
		{
			tagValue = tagValue.replace(' ' + $(this).html() + ' ',' ');
			$(this).removeClass('active');
		}
		else
		{
			tagValue += $(this).html();
			$(this).addClass('active');
		}

		tagValue = $.trim(tagValue);
		tagInput.val(tagValue);
	});

	if($("#back2top").length > 0)
	{
		var backtop = $("#back2top");
		var body_width = 960;
		body_width = $.browser.msie && $.browser.version == "6.0" ? 950 : 953;
		$("#back2top").css("left",Math.floor(($(window).width()-body_width)/2) + body_width + 5 + "px");
		$(window).scroll(function(){
			$(window).scrollTop()==0 ? backtop.fadeOut() : backtop.fadeIn()
		});

		$(window).resize(function(){
			var resize_width = Math.floor(($(window).width()-body_width)/2);
			if(resize_width > 10)
				backtop.css("left",resize_width + body_width + 5 + "px");
		});
	}
	
	$(".add_to_album_btn").each(function(){
		$(this).parent().hover(function(){
			$(".add_to_album_btn",this).show();
		},function(){
			$(".add_to_album_btn",this).hide();
		});
	});
	
	$(".GUID").on('mouseover',function(){
		if(FANWE.GUID_DEFAULT_HTML == null)
			FANWE.GUID_DEFAULT_HTML = $("#USER_INFO_TIP").html();
		clearTimeout(FANWE.GUID_TIME_OUT);
		ClearUserTipAjax();
		var uid = parseInt(this.getAttribute('uid'));
		if(uid < 1)
			return;

		UserTipShow(this,FANWE.GUID_DEFAULT_HTML);
		var query = new Object();
		query.uid = uid;
		
		var thisobj = this;
		
		FANWE.User_Tip_Ajax = $.ajax({
			url: SITE_PATH+"services/service.php?m=user&a=tip",
			type: "POST",
			data:query,
			cache:false,
			dataType: "html",
			success:function(html){
				if(html != '')
				{
					UserTipShow(thisobj,html);
				}
				else
					$("#USER_INFO_TIP").hide();
				ClearUserTipAjax();
			},
			error:function(){
				$("#USER_INFO_TIP").hide();
				ClearUserTipAjax();
			}
		});
	}).on('mouseout',function(){
		var fun = function(){
			$("#USER_INFO_TIP").hide();
		};
		FANWE.GUID_TIME_OUT = setTimeout(fun,500);
		ClearUserTipAjax();
	});
	
	$("#USER_INFO_TIP").hover(function(){
		clearTimeout(FANWE.GUID_TIME_OUT);
		$("#USER_INFO_TIP").show();
	},function(){
		$("#USER_INFO_TIP").hide();
	});
});

function UserTipShow(obj,html)
{
	$("#USER_INFO_TIP").html(html);
	$("#USER_INFO_TIP").show();
	
	var w = 302;
	var offset = $(obj).offset();
	var left = offset.left;
	var top = offset.top - $("#USER_INFO_TIP").height();
	var width = $(document).width() - 30;
	
	if(left + w > width)
		left = left - w + $(obj).width();
	else if(left < 30)
		left = 30;
	var c = offset.left - left + $(obj).width() / 2 - 8;
	
	$("#USER_INFO_TIP").css({"top":top,"left":left});
	$("#USER_INFO_TIP .tip_arrow").css({"margin-left":c});
}

function ClearUserTipAjax()
{
	if(FANWE.User_Tip_Ajax != null)
	{
		FANWE.User_Tip_Ajax.abort();
		FANWE.User_Tip_Ajax = null;
	}
}

function UserTipFollowHandler(obj,result)
{
	var parent = $(obj).parent();
	if(result.status == 1)
	{
		parent.html('<span class="fl icrad_add">已关注</span><a class="follow_del" href="javascript:;" onclick="$.User_Follow('+ result.uid +',this,UserTipFollowHandler);">取消</a>');
	}
	else
	{
		parent.html('&nbsp;<a class="green_button" onclick="$.User_Follow('+ result.uid +',this,UserTipFollowHandler);" href="javascript:;">+加关注</a>');
	}
}

//图片增加占位符
function addImgPlaceholder(imgId, type){
	var placeHolder = '';
	if(type == 'new'){
		placeHolder = '[IMGT' + imgId + ']'; 
	}else if(type == 'old'){
		placeHolder = '[IMG' + imgId + ']'; 
	}
	
	addPlaceholder(placeHolder);
}

//找到PUB_TXT表单，插入占位符
function addPlaceholder(placeHolder){
	if(placeHolder == ''){ return ;}
	if($(".PUB_TXT",form).length == 0)
		return false;

	var txt = $(".PUB_TXT",form);
	var pos = parseInt(txt.attr("position"));
	var val = txt.val();

	if(txt.attr('length') != undefined)
	{
		var maxLength = parseInt(txt.attr('length'));
		if(val.length + placeHolder.length > maxLength)
			return false;
	}

	var begin = val.substr(0,pos);
	var end = val.substr(pos);
	txt.val(begin + placeHolder + end);
	txt.attr({"position":pos + placeHolder.length});
	$.Recount_Word(txt.get(0));
}


function showTags(s){
	var fid = $(s).val();
	if(fid == 1||fid == 18 || fid ==19 || fid ==43 || fid ==45){
		$('.tag').css('display','');
	}else{
		$('.tag').css('display','none');
	}
}

function addTag(oTag){
	var tags = document.getElementById('tags').value;
	var tag = $('#tag_'+oTag).html();

	if(tags.indexOf(tag) < 0){
		var newTags = tags+';'+tag;
		$('#tags').val(newTags);
		$('#tag_'+oTag).css('color','red');
	}else{
		var newTags = tags.replace(';'+tag,'');
		newTags = newTags.replace(tag+';','');
        newTags = newTags.replace(tag, '');
		$('#tags').val(newTags);
		$('#tag_'+oTag).css('color','rgb(0,153,239)');
	}
}

function addCourseGroupTag(oTag){
    var tags = document.getElementById('courseGroupTags').value;
    var tag = $('#courseGroupTag_'+oTag).html();

    if(tags.indexOf(tag) < 0){
        var newTags = tags+';'+tag;
        $('#courseGroupTags').val(newTags);
        $('#courseGroupTag_'+oTag).css('color','red');
    }else{
        var newTags = tags.replace(';'+tag, '');
        newTags = newTags.replace(tag+';', '');
        newTags = newTags.replace(tag, '');
        $('#courseGroupTags').val(newTags);
        $('#courseGroupTag_'+oTag).css('color','rgb(0,153,239)');
    }
}

$("#form").submit(function(){
	var title = $.trim(this.title.value);
	var content = $.trim(this.content.value);
	var contentAllowEmpty = !!$(this.content).attr('data-allow-empty');
	$('#tags').removeAttr('disabled');
	if(title == '')
	{
		if (window.LANG) alert(LANG.title_require);
		this.title.focus();
		return false;
	}
	
	if(content == '' && !contentAllowEmpty)
	{
        if (window.LANG) alert(LANG.content_require);
		this.content.focus();
		return false;
	}
	
	//$.Pub_Img_Sort(this);
});
