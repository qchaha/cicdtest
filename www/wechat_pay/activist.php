<?php
/**
 * 微信支付维权接口
 */

$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
if(empty($postStr))$postStr = $HTTP_RAW_POST_DATA;
if(empty($postStr))$postStr = file_get_contents("php://input");	
logger($postStr);
//日志记录
function logger($log_content)
{
    $max_size = 100000;
    $log_filename = "wechat_activist_log.xml";
    if(file_exists($log_filename) and (abs(filesize($log_filename)) > $max_size)){unlink($log_filename);}
    file_put_contents($log_filename, date('H:i:s')." ".$log_content."\r\n", FILE_APPEND);
}

