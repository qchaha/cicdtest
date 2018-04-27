jQuery(function($){
    //字段关联tr元素
    for(var i=0; i<relatedFields.length; i++) {
        var inputObj = $('.table-form').find("input[name='"+relatedFields[i]+"']");
        if(inputObj.length > 0) {
            var obj = inputObj;
        } else {
            var selectObj = $('.table-form').find("select[name='"+relatedFields[i]+"']");
            if(selectObj.length > 0) {
                var obj = selectObj;
            } else {
                var textareaObj = $('.table-form').find("textarea[name='"+relatedFields[i]+"']");
                if(textareaObj.length > 0) {
                    var obj = textareaObj;
                }
            }
        }
        if(obj) {
            var parent = obj.parent().parent();
            parent.prop('class', 'tr_'+relatedFields[i]);
        }
    }
    //获取非必需字段,并且隐藏起来
    var type = $("input[name='type']").val();
    if(type > 0) {
        var excludeElement = excludeFields[type - 1].split(',');
        for( var i=0; i<excludeElement.length; i++) {
            $('.tr_'+relatedFields[excludeElement[i]]).hide();
        }
    }

    $("#cal_btn").click(function(){
        calculateTotalData();
    });
    $('#check_all').click(function(){
        if($(this).prop("checked")) {
            $("input[name='return_items[]']").each(function(){
                console.log('fsfsf');
                $(this).prop("checked", true);
                var itemId = $(this).val();
                var goodsCount = $('#goods_count_'+itemId).val();
                $('#goods_return_count_'+itemId).val(goodsCount);
            });
        } else {
            $("input[name='return_items[]']").each(function(){
                console.log('fsfsf1111');
                $(this).prop("checked", false);
                var itemId = $(this).val();
                $('#goods_return_count_'+itemId).val(0);
            });
        }
    });

    $("select[name='select_type']").change(function(){
        var selectValue = $(this).val();
        if(selectValue == 0) {
            return;
        }
        if(confirm('确定选中此类型（选中后不可修改）？')) {
            $(this).prop('disabled', true);
            $("input[name='type']").val(selectValue);

            //将非必要字段隐藏
            var hideElement = excludeFields[selectValue - 1].split(',');
            for( var i=0; i<hideElement.length; i++) {
                $('.tr_'+relatedFields[hideElement[i]]).hide();
            }
        }
    });

    $("select[name='status']").change(function() {
        var selectValue = $(this).val();
        var orderType = $("input[name='order_type']").val();
        var presalerderReturnAmount = $("input[name='presale_order_return_amount']").val();
        if (selectValue == 0) {
            return;
        }
        if (selectValue == 20) {
            if (confirm('确定选中此状态（选中后不可修改）？')) {
                $(this).prop('disabled', true);
                if (orderType == 'presale' && presalerderReturnAmount != null) {
                    $(this).after('  <input type="button" id="confirm_presale_order_refund_btn" name="confirm_presale_order_refund" class="sui-btn btn-large" value="订金单已退款" />  ' +
                        '  <input type="button" id="confirm_order_refund_btn" name="confirm_order_refund" class="sui-btn btn-large" value="尾款单已退款" />');
                }else if(orderType == 'presale' && presalerderReturnAmount == null){
                    $(this).after('  <input type="button" id="confirm_order_refund_btn" name="confirm_order_refund" class="sui-btn btn-large" value="尾款单已退款" />');
                }else{
                    $(this).after('  <input type="button" id="confirm_order_refund_btn" name="confirm_order_refund" class="sui-btn btn-large" value="订单已退款" />');
                }
                $("input[name='status']").val(selectValue);
            }
        }else if(selectValue == 40){
            $(this).val(0);
            $("input[name='status']").val(0);
            alert('此状态不可选择');
        }else{
            $("input[name='status']").val(selectValue);
        }
    });

    $('#confirm_order_refund_btn').click(function(){
        if (confirm('是否确认订单已退款？')) {
            confirmRefund('final_order');
        }
    });

    $('#confirm_presale_order_refund_btn').click(function(){
        if (confirm('是否确认订单已退款？')) {
            confirmRefund('deposit_order');
        }
    });

    $("input[name='order_sn']").blur(function(){
        var orderSn = $("input[name='order_sn']").val();
        if(orderSn == '') {
            return;
        }
        var query = new Object();
        query.order_sn = orderSn;
        query.is_ajax = 1;
        query.ajax_type = 'get_order_info';
        $.ajax({
            url: APP + '?' + VAR_MODULE + '=' + CURR_MODULE + '&'+VAR_CONTROLLER+'=' + CURR_CONTROLLER + '&' + VAR_ACTION + '=addReturns',
            type:"GET",
            cache: false,
            data:query,
            dataType:"json",
            success: function(result){
                if(result)
                {
                    var uid = $('#uid').val();
                    var orderInfo = result.order_info;
                    console.log(uid,orderInfo.uid);
                    if(uid != '' && uid != orderInfo.uid) {
                        alert('填写的订单用户与选择的用户不相同');
                        return;
                    }
                    if(orderInfo) {
                        $("input[name='order_id']").val(orderInfo.order_id);
                        $("input[name='consignee']").val(orderInfo.shipping_address.name);
                        $("input[name='address']").val(orderInfo.shipping_address.province+orderInfo.shipping_address.city
                        +orderInfo.shipping_address.district+orderInfo.shipping_address.address);
                        $("input[name='phone']").val(orderInfo.shipping_address.phone);

                        if(orderInfo.waybill) {
                            $("input[name='waybill_number']").val(orderInfo.waybill.waybill_number);
                        }
                    }

                    var returnRecords = result['return_records'];
                    if(returnRecords) {
                        $("#return_record_table tr:gt(0)").remove();
                        var requestUrl = APP + '?' + VAR_MODULE + '=' + CURR_MODULE
                            + '&'+VAR_CONTROLLER+'=' + CURR_CONTROLLER + '&' + VAR_ACTION + '=editReturns&returns_id=';
                        var html = '';
                        for(var i=0; i< returnRecords.length; i++) {
                            var returnsId = returnRecords[i].returns_id;
                            var applyTime = new Date(parseInt(returnRecords[i].apply_time) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                            console.log(returnsId, applyTime);
                            html += '<tr>'+
                                            '<td style="width:200px;text-align: center;">'+returnsId+'</td>'+
                                            '<td style="width:200px;text-align: center;">'+applyTime+'</td>'+
                                            '<td style="width:200px;text-align: center;">'+
                                                '<a target="_blank" href="'+requestUrl+returnsId+'">'+
                                                '详情'+
                                                '</a>'+
                                            '</td>'+
                                        '</tr>';
                        }
                        $("#return_record_table tr:eq(0)").after(html);
                    }

                    var goodsInfo = result['goods_info'];
                    var html = '<tbody>';
                    $("tr[id^='tr_goods_']").remove();  //清除旧的商品
                    if(goodsInfo) {
                        for(var i=0; i< goodsInfo.length; i++) {
                            var freebiesHtml = '';
                            var canReturnSeparatelyHtml = '';
                            var premiumOptionalGoodsHtml = '';
                            var recId = goodsInfo[i].rec_id;
                            var itemId = goodsInfo[i].item_id;
                            var goodsId = goodsInfo[i].goods_id;
                            var sku = goodsInfo[i].sku;
                            var goodsName = goodsInfo[i].goods_name;
                            var groupAndSpecName = goodsInfo[i].group_and_spec_name;
                            var count = goodsInfo[i].count;
                            var depositOrderPrice = goodsInfo[i].deposit_order_price;
                            var price = goodsInfo[i].price;
                            var mallPrice = goodsInfo[i].mall_price;
                            var payPrice = goodsInfo[i].pay_price;
                            var isFreebies = goodsInfo[i].is_freebies;
                            var promotionType = goodsInfo[i].promotion_type;
                            var canReturnSeparately = goodsInfo[i].can_return_separately;
                            if(isFreebies == 1) {
                                freebiesHtml = '<span style="color:red;">赠品</span>';
                                depositOrderPrice = '';
                                price = '';
                                mallPrice = '';
                                payPrice = '';
                            }
                            if (canReturnSeparately == false && promotionType == 'combine') {
                                canReturnSeparatelyHtml = '<span style="color:red;">不可单退</span>';
                                depositOrderPrice = '';
                                price = '';
                                mallPrice = '';
                                payPrice = '';
                            }
                            if (promotionType == 'premium_optional') {
                                premiumOptionalGoodsHtml = '<span style="color:red;">换购商品</span>';
                                depositOrderPrice = '';
                                price = '';
                                mallPrice = '';
                                payPrice = '';
                            }
                            html += '<tr id="tr_goods_'+recId+'" class="tr_goods">'+
                            '<td style="width:200px;text-align: center;">'+
                            '<input type="hidden" name="return_goods_list" value="">'+
                            '<input type="checkbox" id="return_items_'+recId+'" name="return_items[]" value="'+recId+'" />'+
                            '<input type="hidden" id="rec_ids_'+recId+'" name="rec_ids[]" value="'+recId+'" />'+
                            freebiesHtml + canReturnSeparatelyHtml + premiumOptionalGoodsHtml +
                            '</td>'+
                            '<td style="width:200px;text-align: center;">' +
                                itemId +
                            '</td>'+
                            '<td style="width:200px;text-align: center;">' +
                                goodsId +
                            '</td>'+
                            '<td style="width:200px;text-align: center;">' +
                                sku +
                            '</td>'+
                            '<td style="width:200px;text-align: center;">' +
                                goodsName +
                            '</td>'+
                            '<td style="width:200px;text-align: center;">' +
                                groupAndSpecName +
                            '</td>'+
                            '<td style="width:200px;text-align: center;">' +
                                count +
                            '</td>'+
                            '<td style="width:200px;text-align: center;">' +
                                depositOrderPrice +
                                '</td>' +
                                '<td style="width:200px;text-align: center;">' +
                                price +
                            '</td>'+
                            '<td style="width:200px;text-align: center;">' +
                                mallPrice +
                            '</td>'+
                            '<td style="width:200px;text-align: center;">' +
                                payPrice +
                                '</td>' +
                                '<td style="width:200px;text-align: center;">' +
                            '<input size="15" type="text" id="goods_return_count_'+recId+'" name="return_count[]" value="" />'+
                            '<input type="hidden" id="goods_count_'+recId+'" name="goods_count[]" value="'+count+'" />'+
                            '<input type="hidden" id="goods_price_'+recId+'" name="goods_price[]" value="'+price+'" />'+
                            '<input type="hidden" id="goods_mall_price_'+recId+'" name="goods_mall_price[]" value="'+mallPrice+'" />'+
                            '</td>'+
                            '</tr>';
                        }
                        html += '</tbody>'
                        $("#order_table_thead").after(html);
                        // var rowSpan = goodsInfo.length + 1;
                        // $("#calculate_amount").find('th').prop('rowspan', rowSpan);
                    }
                }
                else
                {
                    console.log('请求失败');
                }
            }
        });
    });
    
    $("#form").on('submit',function () {
        var trElements = $("[id^=tr_goods_]");
        if(trElements.length > 0) {
            var recIds = new Array();
            var returnCountArray = new Array();
            var returnItemsArray = new Array();
            for (var i = 0; i < trElements.length; i++) {
                var idName = trElements.eq(i).prop('id');
                var tmpRecId = idName.replace('tr_goods_', '');
                var returnStatus = $('#return_items_'+tmpRecId).prop("checked");
                var returnCount = Number($('#goods_return_count_'+tmpRecId).val());
                var count = Number($('#goods_count_'+tmpRecId).val());
                if(returnStatus && returnCount > 0){
                    returnItemsArray.push(tmpRecId);
                }
                recIds.push(tmpRecId);
                returnCountArray.push(returnCount);
            }
            $("input[name='rec_ids\[\]']").each(function(){
                $(this).remove();
            });
            var recIdsStr = recIds.join('-');
            var itemFields = "<input hidden name='rec_ids' value='"+recIdsStr+"'/>";
            $("input[type='submit']").after(itemFields);


            $("input[name='return_items\[\]']").each(function(){
                $(this).remove();
            });
            var recIdsStr = returnItemsArray.join('-');
            var itemFields = "<input hidden name='return_items' value='"+recIdsStr+"'/>";
            $("input[type='submit']").after(itemFields);


            $("input[name='return_count\[\]']").each(function(){
                $(this).remove();
            });
            var recIdsStr = returnCountArray.join('-');
            var itemFields = "<input hidden name='return_count' value='"+recIdsStr+"'/>";
            $("input[type='submit']").after(itemFields);

            $("input[name='goods_count\[\]']").each(function(){
                $(this).remove();
            });
            $("input[name='goods_price\[\]']").each(function(){
                $(this).remove();
            });
            $("input[name='goods_mall_price\[\]']").each(function(){
                $(this).remove();
            });
        }
    });
});
//计算总金额
function calculateTotalData() {
    var orderId = $('#order_id').val();console.log(orderId);

    //判断价格是否超出
    var trElements = $("[id^=tr_goods_]");
    if(trElements.length > 0) {
        var recIds = new Array();
        var returnCountArray = new Array();
        var returnItemsArray = new Array();
        for(var i=0;i<trElements.length;i++) {
            var idName = trElements.eq(i).prop('id');
            var tmpRecId = idName.replace('tr_goods_', '');
            var returnStatus = $('#return_items_'+tmpRecId).prop("checked");
            var returnCount = Number($('#goods_return_count_'+tmpRecId).val());
            var count = Number($('#goods_count_'+tmpRecId).val());
            if(returnCount > count) {
                alert('退货数量不能超出实际购买数量');
                return false;
            }
            if(returnStatus && returnCount > 0){
                returnItemsArray.push(tmpRecId);
            }
            recIds.push(tmpRecId);
            returnCountArray.push(returnCount);
        }
        //请求数据
        var query = {
            'rec_ids': recIds.join('-'),
            'return_count': returnCountArray.join('-'),
            'return_items': returnItemsArray.join('-')
        };
        query.order_id = $('#order_id').val();
        query.returns_id = $('#returns_id').val();
        query.is_ajax = 1;
        query.need_goods_info = 0;
        $.ajax({
            url: APP + '?' + VAR_MODULE + '=' + CURR_MODULE + '&'+VAR_CONTROLLER+'=' + CURR_CONTROLLER + '&' + VAR_ACTION + '=addReturns',
            type:"POST",
            cache: false,
            data:query,
            dataType:"json",
            success: function(result){
                if(result)
                {
                    var degradeTips = '';
                    if(result.is_degrade) {
                        degradeTips = '会员将降级到'+result.degrade_name+'或以下';
                        alert(degradeTips);
                    } else if(result.is_upgrade) {
                        degradeTips = '会员将升级到'+result.upgrade_name;
                        alert(degradeTips);
                    }
                    $('#degrade_tips').text(degradeTips);

                    //修改展示的总金额
                    $('#total_return_amount').val(result.total_return_amount);
                    $('#total_return_order_score').val(result.total_return_order_score);
                    $('#total_return_coin_count').val(result.total_return_coin_count);
                }
                else
                {
                    console.log('请求失败');
                }
            }
        });
    }
}
//确定已退款
function confirmRefund(type)
{
    var returnsId = $('#returns_id').val();

    var fun = function(){
        var url = APP+'?'+VAR_MODULE+'='+CURR_MODULE+'&'+VAR_CONTROLLER+'='+CURR_CONTROLLER+'&'+VAR_ACTION+'=confirmOrderReturnRefund&returns_id='+returnsId+'&type=' + type;
        window.location.href = url;
    };

    setTimeout(fun,1);
}