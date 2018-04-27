jQuery(function($) {
    $("#add_return_close_div >span").on('click', function() {
        $('#add_return_div').hide();
        $('#add_return_iframe').prop('src', '');
    });
});
function getOrderReturnRecordHtml(record) {
    var requestUrl = APP + '?' + VAR_MODULE + '=' + CURR_MODULE
        + '&'+VAR_CONTROLLER+'=' + CURR_CONTROLLER + '&' + VAR_ACTION + '=editReturns&returns_id=';
    var returnsId = record.returns_id;
    var orderSn = record.order_sn;
    var consignee = record.consignee;
    var address = record.address;
    var phone = record.phone;
    var waybillNumber = record.waybill_number;
    var returnLogisticsCompany = record.return_logistics_company;
    var returnLogisticsNumber = record.return_logistics_number;
    //var applyTime = new Date(parseInt(record.apply_time) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    var html = '<tr>'
        +'<td><input type="checkbox" name="returns_ids[]" value="'+returnsId+'"/></td>'
        +'<td>'+returnsId+'</td>'
        +'<td>'+orderSn+'</td>'
        +'<td>'+consignee+'</td>'
        +'<td>'+address+'</td>'
        +'<td>'+phone+'</td>'
        +'<td>'+waybillNumber+'</td>'
        +'<td>'+returnLogisticsCompany+'</td>'
        +'<td>'+returnLogisticsNumber+'</td>'
        +'<td>'
        +'<a target="_blank" href="'+requestUrl+returnsId+'">'
        +'详情'
        +'</a>'
        +'</td>'
        +'</tr>';

    return html;
}
function getOrderRecordHtml(record) {
    var requestUrl = getRequestUrl('=orderDetail&order_id=');
    var orderId = record.order_id;
    var orderSn = record.order_sn;
    var consignee = record.consignee;
    var address = record.address;
    var phone = record.phone;
    var waybillNumber = record.waybill_number;
    var logisticsCompany = record.logistics_company;
    //var applyTime = new Date(parseInt(record.apply_time) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    var html = '<tr>'
        +'<td><input type="checkbox" class="order_sn" name="order_sns[]" value="'+orderSn+'"/></td>'
        +'<td>'+orderId+'</td>'
        +'<td>'+orderSn+'</td>'
        +'<td>'+consignee+'</td>'
        +'<td>'+address+'</td>'
        +'<td>'+phone+'</td>'
        +'<td>'+waybillNumber+'</td>'
        +'<td>'+logisticsCompany+'</td>'
        +'<td>'
        +'<a target="_blank" href="'+requestUrl+orderId+'">'
        +'详情'
        +'</a>'
        +'</td>'
        +'</tr>';

    return html;
}
function getRequestUrl(url) {
    var requestUrl = APP+'?'+VAR_MODULE+'='+CURR_MODULE
        +'&'+VAR_CONTROLLER+'='+CURR_CONTROLLER+'&'
        +VAR_ACTION+url;
    return requestUrl;
}
function searchReturnRecords() {
    var searchValue = $('#search_value').val();
    var searchType = $('#search_type').val();
    if(searchValue != '') {
        var needOrderReturnRecord = 1;  //需要退货记录
        var needOrderRecord = 1;    //需要订单记录
        var type = 'get_latest_records';
        var url = getRequestUrl('=returnGoodsRecord');

        var operateType = $("input[name='type']").val();
        if(!operateType) {  //新增时从下拉框选择
            operateType = $("select[name='type']").val();
        }
        if(operateType == 'reject_cod') {    //货到付款拒收
            needOrderReturnRecord = 0;
        }

        var query = new Object();
        query.search_type = searchType;
        query.search_value = searchValue;
        query.type = type;
        query.need_order_return_record = needOrderReturnRecord;
        query.need_order_record = needOrderRecord;
        $.ajax({
            url: url,
            type: "GET",
            cache: false,
            data: query,
            dataType: "json",
            success: function (result) {
                if (result) {
                    //退换补记录
                    var returnRecords = result['order_return_records'];
                    if(returnRecords) {
                        $("#order_return_record_table tr:gt(0)").remove();
                        var html = '';
                        for(var i=0; i< returnRecords.length; i++) {
                            html += getOrderReturnRecordHtml(returnRecords[i]);
                        }
                        $("#order_return_record_table tr:eq(0)").after(html);
                    }

                    //订单记录
                    var returnRecords = result['order_records'];
                    if(returnRecords) {
                        $("#order_record_table tr:gt(0)").remove();
                        var html = '';
                        for(var i=0; i< returnRecords.length; i++) {
                            html += getOrderRecordHtml(returnRecords[i]);
                        }
                        $("#order_record_table tr:eq(0)").after(html);
                        if(html != '' && operateType == 'confirm_return_and_change') {  //退换货
                            $(".order_sn").on('click', function(){
                                if($(this).prop('checked')) {
                                    //弹出新增退换补记录的窗口
                                    var orderSn = $(this).val();
                                    var requestUrl = getRequestUrl('=addReturns&order_sn='+orderSn);
                                    $('#add_return_iframe').prop('src', requestUrl);
                                    $('#add_return_iframe').load(function(){    //加载完再执行
                                        var iframeContent = $('#add_return_iframe').contents();
                                        iframeContent.find(".handle-btns").hide();
                                        iframeContent.find("#form").unbind('submit').submit(function(e){  //ajax提交表单
                                            e.preventDefault();
                                            //新增退换补记录
                                            var requestUrl = getRequestUrl('=insertReturns&is_ajax_submit=1');
                                            $.ajax({
                                                type: "POST",
                                                url:requestUrl,
                                                data:iframeContent.find('#form').serialize(),
                                                async: false,
                                                dataType: "json",
                                                error: function(request) {
                                                    alert("Connection error");
                                                },
                                                success: function(result) {
                                                    if(result) {
                                                        //新增的记录插入到可关联的退换补记录里面，并勾选上
                                                        $("input[name='returns_ids[]']").prop('checked', false);
                                                        var html = getOrderReturnRecordHtml(result);
                                                        $("#order_return_record_table tr:eq(0)").after(html);
                                                        $("#order_return_record_table tr:eq(1)")
                                                            .find("input[name='returns_ids[]']")
                                                            .prop('checked', true);

                                                        $('#add_return_div').hide();

                                                        $('#form1').submit();
                                                    }
                                                }
                                            });
                                            return false;
                                        });
                                    });

                                    $('#add_return_div').show();
                                }
                            });
                        }
                    }
                }
            }
        });
    }
}