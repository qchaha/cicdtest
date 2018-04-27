jQuery(function($){
	$("#user_group").change(function(){
		var gid = this.value;
		getUserGroupAuthoritys(gid);
	});

    $('input[name=deleteUser]').click(function(){
            deleteUser();
    });
    var opDeviceIdToken = $('input[name=opDeviceIdToken]').val();
    $('span.unBlackDevice').on('click',function(){
        if(confirm('确定解封此设备?')){
            var deviceId = $(this).parent().parent().attr('data-deviceId');
            $.post(APP + '?' + VAR_CONTROLLER + '=User&' + VAR_ACTION + '=unBlackDevice',{"deviceId":deviceId,"opDeviceIdToken":opDeviceIdToken}, function (data) {
                alert(data.msg);
                window.location.href = location.href;
            },'json');
        }
        return false;
    });
    $('span.blackDevice').on('click',function(){
        if(confirm('确定封杀此设备?')){
            var deviceId = $(this).parent().parent().attr('data-deviceId');
            $.post(APP + '?' + VAR_CONTROLLER + '=User&' + VAR_ACTION + '=blackDevice',{"uid":$('input[name=uid]').val(),"deviceId":deviceId,"opDeviceIdToken":opDeviceIdToken}, function (data) {
                alert(data.msg);
                window.location.href = location.href;
            },'json');
        }
        return false;
    });

});

function getCitys(province,city)
{
	var provinceID = $(province).val();
	$.ajax({
		url: APP + '?' + VAR_CONTROLLER + '=Region&' + VAR_ACTION + '=getCitys',
		type:"POST",
		cache: false,
		data:{"pid":provinceID},
		dataType:"json",
		success: function(result){
			html = '';
			i = 0;
			count = result.length;
			for(i; i<count; i++)
			{
				html += '<option value="'+ result[i].id +'">'+ result[i].name +'</option>';
			}
			
			$(city).html(html);
		}
	});
}

function getUserGroupAuthoritys(gid)
{
	$.ajax({
		url: APP + '?' + VAR_MODULE + '=UserGroup&' + VAR_ACTION + '=authoritys',
		type:"POST",
		cache: false,
		data:{"gid":gid},
		dataType:"html",
		success: function(html){
			$("#user_authoritys").html(html);
		}
	});
}

function getUserExits(uid,userName)
{
	var userCount = 0;
	$.ajax({
		url: APP + '?' + VAR_MODULE + '=User&' + VAR_ACTION + '=getUserExits',
		type:"POST",
		async:false,
		cache: false,
		data:{"uid":uid,"user_name":userName},
		dataType:"json",
		success: function(result){
			userCount = result.count;
		}
	});
	return userCount;
}

function searchUser(sele,keyword)
{
    var keywords = $(keyword).val();
    var searchType = $("select[name='search_type']").val();
    var sele = $(sele);

    sele.empty();
    option = new Option(SEARCH_LOADING,'');
    sele.get(0).options.add(option);
    $.ajax({
        url: APP + '?' + VAR_CONTROLLER + '=User&' + VAR_ACTION + '=getUserList',
        cache: false,
        data:{"key":keywords,"search_type":searchType},
        dataType:"json",
        success:function(data)
        {
            sele.empty();
            if(data && data.length > 0)
            {
                for(var i=0;i<data.length;i++)
                {
                    option = new Option(data[i].user_name, data[i].uid);
                    sele.get(0).options.add(option);
                }
            }
            else
            {
                option = new Option('用户不存在','');
                sele.get(0).options.add(option);
            }
        }
    });
}

function deleteUser(){
    if(confirm('严重：该功能个只供技术人员使用，运营人员请使用账号禁用功能')){
        var userName = $('#user_name').val();
        if(userName == prompt('请输入需要删除的用户名')){
            $.post(
                APP + '?' + VAR_CONTROLLER + '=User&' + VAR_ACTION + '=delUser',
                {'uid':$('input[type=hidden][name=uid]').val(),'delToken':$('input[type=hidden][name=delToken]').val(),'userName':userName},
                function(d){
                    console.log(d);
                    alert(d.msg);
                    if(0 == d.status){
                        window.reload();
                    }
                },'json'
            );
        }
    }
}