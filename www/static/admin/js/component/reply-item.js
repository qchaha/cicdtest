define("component/reply-item",["common/util"],function(t){"use strict";function e(t){t=t||$(document);var e=t.find('[data-component="'+o+'"]'),i='<div id="replySelector" tabindex="-1" role="dialog" data-hasfoot="false" data-backdrop="false" class="sui-modal hide fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">×</button><h4 id="contentPickerLabel" class="modal-title"><div class="title">添加回复</div></h4></div><div class="modal-body"><div class="content"><div class="reply"><div class="user"><label><input type="radio" name="random" value="0" checked>&nbsp;后台发表文章用户</label>&nbsp;&nbsp;<label><input type="radio" name="random" value="1">&nbsp;随机小号</label></div><select name="uid" id="userSelect"><option>请选择发表用户</option></select>&nbsp;&nbsp; <input id="authors" type="text" name="authors" placeholder="输入..." class="input-xlarge" autocomplete="off"></div><textarea rows="6" cols="45" id="reply_content" name="reply_content" placeholder="填写评论"></textarea></div></div><div class="modal-footer"><input type="button" data-ok="modal" class="sui-btn btn-primary btn-large js-ok" value="回复"><input type="hidden" id="content-list" name="content-list"></div></div></div></div>';$("body").append(i),$('input[name="random"]').click(function(){var t=$('input[name="random"]:checked').val(),e="1"==t?1:0;1==e?$.get("/admin.php?m=Admin&c=User&a=getReplyAuthors",{random:e},function(t){for(var e in t)t.hasOwnProperty(e)&&($("#userSelect").html('<option value="'+e+'">'+t[e]+"</option>"),$("#authors").css("display","none"))},"JSON"):n()}),e.each(function(t,e){$(e).attr("data-toggle","modal"),$(e).attr("data-target","#replySelector"),$(e).on("click",function(){n(),$(".modal-footer .js-ok").click(function(){var t=$(e).data("id"),n=$(e).attr("data-action"),o=$("#userSelect").val(),i=$("#reply_content").val();return""==i||""==o||""==t||void 0===t?(alert("评论者或内容为空，请检查"),!1):(a(t,o,i,n),!1)})})})}function a(t,e,a,n){if(n=n||"replyComment",""==t||""==e||""==a)return!1;var o={};o.reply_id=t,o.content=a,o.uid=e,$.ajax({url:APP+"?"+VAR_MODULE+"="+CURR_MODULE+"&"+VAR_CONTROLLER+"="+CURR_CONTROLLER+"&"+VAR_ACTION+"="+n,type:"POST",cache:!1,data:o,dataType:"json",success:function(t){0==t.isErr?alert("评论失败"):(alert("评论成功"),window.location.reload())}})}function n(){var t=[];$.get("/admin.php?m=Admin&c=User&a=getReplyAuthors",{},function(e){$("#userSelect").html("<option>请选择发表用户</option>");for(var a in e)e.hasOwnProperty(a)&&($("#userSelect").append('<option value="'+a+'">'+e[a]+"</option>"),t.push(e[a]),$("#authors").css("display",""));$("#authors").autocomplete({lookup:t,minChars:0,appendTo:$("#authors").parent(),onSelect:function(t){$("#userSelect option").filter(function(){return this.text==t.value}).attr("selected",!0)}})},"JSON")}var o=(t("common/util"),"reply-item");return e});