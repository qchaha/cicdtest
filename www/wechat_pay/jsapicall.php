<?php
include_once("WxPayHelper.php");


$commonUtil = new CommonUtil();
$wxPayHelper = new WxPayHelper();

$ip = $_SERVER["REMOTE_ADDR"] ? $_SERVER["REMOTE_ADDR"] : "127.0.0.1";

$wxPayHelper->setParameter("bank_type", "WX");
$wxPayHelper->setParameter("body", "江诗丹顿");
$wxPayHelper->setParameter("partner", "1220593801");
$wxPayHelper->setParameter("out_trade_no", $commonUtil->create_noncestr());
$wxPayHelper->setParameter("total_fee", "1");
$wxPayHelper->setParameter("fee_type", "1");
$wxPayHelper->setParameter("notify_url", "http://meijialove.com/v1/payment_success_notify/wechat.json");
$wxPayHelper->setParameter("spbill_create_ip", $ip);
$wxPayHelper->setParameter("input_charset", "UTF-8");





?>
<html>
<script language="javascript">
function callpay()
{
	WeixinJSBridge.invoke('getBrandWCPayRequest',<?php echo $wxPayHelper->create_biz_package(); ?>,function(res){
	WeixinJSBridge.log(res.err_msg);
	alert(res.err_code+res.err_desc+res.err_msg);
	});
}
</script>
<body>
<button type="button" onclick="callpay()">wx pay test</button>
</body>
</html>
