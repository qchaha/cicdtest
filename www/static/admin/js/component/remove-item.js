define("component/remove-item",["common/util"],function(t){"use strict";function a(t){t=t||$(document);var a=t.find('[data-component="'+n+'"]');a.each(function(t,a){var n=$(a).attr("data-id")||0,e=$(a).attr("data-pk")||"id";$(a).on("click",function(){i(this,n,e,$(this).attr("data-action"))})})}function i(t,a,i,n){n=n||"remove";var e=[];if(isNaN(a))$("#"+a+" input:checked[name='key']").each(function(){e.push(this.value)});else{e.push(a);var c=$(t).parent().parent();a=c.parent().parent().attr("id")}if(e=e.join(","),""==e)return!1;if(!window.confirm(CONFIRM_DELETE))return!1;var r={};r[i]=e,$.ajax({url:APP+"?"+VAR_MODULE+"="+CURR_MODULE+"&"+VAR_CONTROLLER+"="+CURR_CONTROLLER+"&"+VAR_ACTION+"="+n,type:"POST",cache:!1,data:r,dataType:"json",success:function(t){0==t.isErr?$("#"+a+" tbody tr input[name='key']").each(function(){-1!=(","+e+",").indexOf(","+this.value+",")&&(c=$(this).parent().parent(),this.checked=!1,$("td span,td a",c).each(function(){if("function"==typeof this.onclick&&""!=this.onclick.toString()){if(-1!=this.onclick.toString().indexOf("toggleStatus")){var t=$("img",this).get(0);t.src=t.src.replace("status","disabled")}this.onclick=""}}),c.attr({disabled:!0,title:ALREADY_REMOVE}),$("td",c).attr({disabled:!0}).addClass("disabled"),$("td *",c).attr({disabled:!0}).addClass("disabled")),0==$("#"+a+" tbody tr:not([disabled])").length&&location.reload(!0)}):$.ajaxError(t.content)}})}var n=(t("common/util"),"remove-item");return a});