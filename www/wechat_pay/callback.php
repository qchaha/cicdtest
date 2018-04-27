<?php
/*
 * 微信支付获取package
 */
require dirname(__FILE__) . '/../core/fanwe.php';;
$fanwe = &FanweService::instance();
$fanwe->initialize();

loadMooyoo();
$payment = D('Common/MallPayment');
$xml = $payment->getWechatNativePackageXml();
echo $xml;
?>
