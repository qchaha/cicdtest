<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用入口文件
$inTp = true;
$inTpApp = 'frontend';

// 检测PHP环境
if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');

/*if(getenv('RUN_ENV')=='preview' || getenv('RUN_ENV')=='dev'){//开发&预发布环境打开调试功能
    define('APP_DEBUG', true);
}else{
	define('APP_DEBUG', false);
}*/
if((isset($_GET['debug_Dd4fsDFG4']) && $_GET['debug_Dd4fsDFG4'] == 'FfD35SAGs44dfgs34') || getenv('RUN_SERVER_SUPPLIER')=='local-docker'){//加参数打开调试功能
    define('APP_DEBUG', true);
}else{
	define('APP_DEBUG', false);
}

// 定义应用目录
define('APP_PATH',dirname(__DIR__).'/base_code/Application/');

// FANWE的根目录
define('FANWE_PATH',dirname(__FILE__).'/');

// WWW的根目录
define('WWW_PATH',dirname(__FILE__).'/');

define('VENDOR_PATH',APP_PATH.'Common/Library/Vendor/');

$containerType = getenv('RUN_CONTAINER_TYPE');
if(!empty($containerType) && $containerType == 'docker'){
    define('LOG_PATH', '/var/log/php-mjb/'); //日志路径
} else {
    define('LOG_PATH', '/data/docker/logs/'.basename(dirname(dirname(APP_PATH)))); //日志路径
}

if(preg_match('/(^|\.)mli\.so$/', $_SERVER['HTTP_HOST'])){
    define('APP_STATUS','site_meili_api');
}elseif(preg_match('/(^|\.)meili\.meijialove\.com$/', $_SERVER['HTTP_HOST'])){
	define('APP_STATUS','site_meili');
}else{
	define('APP_STATUS','site_meijiabang');
}

// 引入ThinkPHP入口文件
require '../base_code/ThinkPHP/ThinkPHP.php';

// 亲^_^ 后面不需要任何代码了 就是如此简单