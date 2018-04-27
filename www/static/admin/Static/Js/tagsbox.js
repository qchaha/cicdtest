/**
 * 
 */

$().ready(function(){

	$('.show-img').bind('mouseover',function(){
		$(this).parent().imgbox({
			'speedIn'		: 0,
			'speedOut'		: 0,
			'alignment'		: 'center',
			'overlayShow'	: true,
			'allowMultiple'	: false
		});
	});

	/*********************教程标签浮层*****************/
	$('.point').bind('click',function(event){
		$('.tagsBox').removeClass('box_show');
		$('.show-img').removeClass('pic_up');
		var bigBox = $(this).parent().parent();
		var tagsBox = $(this).parent().parent().find('.tagsBox');
		
 		var left = bigBox.offset().left;
 		var oWidth = window.innerWidth;
		var tagsBoxWidth = tagsBox.width();

		if(left > (600/1366)*oWidth){
			left = -450;
			tagsBox.addClass('right_box');
			tagsBox.css('left',left);
			bigBox.find('.show-img').addClass('pic_up').css('margin-left','70px');
		}else if(left + tagsBoxWidth > oWidth/2 && left > oWidth/4 && left < oWidth/2){
			left = -200;
			tagsBox.addClass('right_box');
			tagsBox.css('left',left);
			bigBox.find('.show-img').addClass('pic_up').css('margin-left','320px');
		}else{
			tagsBox.addClass('left_box');
		}
		bigBox.find('.content').addClass('pic_up');
		bigBox.find('.actions').addClass('box_show');
		bigBox.find('.show-img').addClass('pic_up');
		tagsBox.addClass('box_show');
		event.stopPropagation();
	});

	$('.tagsBox').mouseleave(function(){
		var bigBox = $(this).parent();
		$(this).removeClass('box_show');
		 bigBox.find('.show-img').removeClass('pic_up');
		 bigBox.find('.show-img').removeClass('pic_up').css('margin-left','0');
		 bigBox.find('.content').removeClass('pic_up');
		 bigBox.find('.actions').removeClass('box_show');
		
	});

	$('.tagsBox').bind('mouseover',function(){
		var bigBox = $(this).parent();
		bigBox.find('.show-img').addClass('pic_up');
		bigBox.find('.content').addClass('pic_up');
		bigBox.find('.actions').addClass('box_show');
		$(this).addClass('box_show');
	});

/*********************教程标签浮层结束*****************/
	
	$('.comment-btn').bind('click',function(){
		var bigBox = $(this).parent().parent();
		var commentBox = bigBox.find('.postcomment');
		if(commentBox.hasClass('box_show')){
			commentBox.removeClass('box_show');
		}else{
			commentBox.addClass('box_show');
		}
		bigBox.find('.show-img').addClass('pic_up').css('margin-left','0');
	});

	$(".change_tags").bind("click",function(){
		var _share_id = $(this).attr("share");
		var _tag = $(this).attr("tag");
		var key;

		tag = $('#tags_'+_share_id).val();
		if(tag.indexOf(_tag) != -1){
			$('#tags_'+_share_id).val($('#tags_'+_share_id).val().replace(' '+_tag,''));
			$('#tags_'+_share_id).val($('#tags_'+_share_id).val().replace(_tag+' ',''));
			$('.'+_tag+_share_id).css('color','#444');
		}else{
			$('#tags_'+_share_id).val($('#tags_'+_share_id).val()+' '+_tag);
			$('.'+_tag+_share_id).css('color','rgb(255,103,154)');
		}
		
	})
});

function set_grade(share_id, grade){
	var query = {};
	query.share_id = share_id;
	query.grade = grade;
	query.from_admin = $('#from_admin').val();
	query.type = 'grade';
	$.ajax({
		url: SITE_PATH+"admin.php?m=Admin&c=share&a=editajax",
		type: "POST",
		data:query,
		dataType: "json",
		success: function(result){
			if (result.status == 1){
				var gradeName = '';
				for(i=1;i<=5;i++){
					gradeName = "#grade_"+i+"_"+share_id;
					$(gradeName).attr('style','');
				}
				gradeName = "#grade_"+grade+"_"+share_id;
				$(gradeName).attr('style','color:red');
			}else{
				alert('修改数据失败');
			}
		},
		error: function(){
			alert('修改数据失败');
		}
	});
}
function set_tags(share_id){
	var query = {};
	query.share_id = share_id;
	query.content = $('#share_content_'+share_id).val();
	query.tag = $('#tags_'+share_id).val();
	query.topic_tag = $('#topic_tags_'+share_id).val();
	query.type = 'tags';
	$.ajax({
		url: SITE_PATH+"admin.php?m=Admin&c=share&a=editajax",
		type: "POST",
		data:query,
		dataType: "json",
		success: function(result){
			if (result.status == 1){
				alert('图片id:'+share_id +' 修改数据成功');
			}else{
				alert('修改数据失败');
			}
		},
		error: function(){
			alert('修改数据失败');
		}
	});
}

function set_grade_time(share_id){
	var query = {};
	query.share_id = share_id;
	query.grade_time = $('#share_grade_time_'+share_id).val();
	query.type = 'grade_time';
	$.ajax({
		url: SITE_PATH+"admin.php?m=Admin&c=share&a=editajax",
		type: "POST",
		data:query,
		dataType: "json",
		success: function(result){
			if (result.status == 1){
				alert('图片id:'+share_id +' 修改数据成功');
			}else{
				alert('修改数据失败');
			}
		},
		error: function(){
			alert('修改数据失败');
		}
	});
}

function change_tags(share_id,tag,key) {
    var share_tags = $('#tags_' + share_id).val();
    if (share_tags.indexOf(tag) != -1) {
        $('#tags_' + share_id).val($('#tags_' + share_id).val().replace(' ' + tag, ''));
        $('#tags_' + share_id).val($('#tags_' + share_id).val().replace(tag + ' ', ''));
        $('.' + key + tag + share_id).css('color', '#444');
    } else {
        $('#tags_' + share_id).val($('#tags_' + share_id).val() + ' ' + tag);
        $('.' + key + tag + share_id).css('color', 'rgb(255,103,154)');
    }
}

function change_topic_tags(share_id,tag,key){
    var tags = $('#topic_tags_'+share_id).val();
	if(tags.indexOf(tag)!=-1){
		$('#topic_tags_'+share_id).val($('#topic_tags_'+share_id).val().replace(' '+tag,''));
		$('#topic_tags_'+share_id).val($('#topic_tags_'+share_id).val().replace(tag+' ',''));
		$('.'+key+tag+share_id).css('color','#444');
	}else{
		$('#topic_tags_'+share_id).val($('#topic_tags_'+share_id).val()+' '+tag);
		$('.'+key+tag+share_id).css('color','rgb(255,103,154)');
	}
}

function appraiseImage(img_id){
	$('#appraise-radio-'+img_id).parent().removeClass('appraise-notice');
	var query = new Object();
	query.img_id = img_id;
	query.grade = $('input[name=grade_'+img_id+']:checked').val();
	query.tag = $('#tags_'+img_id).val();
	query.topic_tag = $('#topic_tags_'+img_id).val();
	query.content = $('#share_content_'+img_id).val();
	query.interval = $('#interval_'+img_id).val();
	query.type = 'appraise';
	if(!query.grade){
		$('#appraise-radio-'+img_id).parent().addClass('appraise-notice');
		return false;
	}
	$.ajax({
		url: SITE_PATH+"admin.php?m=Admin&c=share&a=appraiseajax",
		type: "POST",
		data:query,
		dataType: "json",
		success: function(result){
			if (result.status == 1){
				alert('ok');
			}else{
				alert('修改数据失败');
			}
		},
		error: function(){
			alert('修改数据失败');
		}

	});
}