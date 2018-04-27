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
$inTpApp = 'backend';

// 检测PHP环境
if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');

// 开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
/*if(getenv('RUN_ENV')=='preview' || getenv('RUN_ENV')=='dev'){//开发&预发布环境打开调试功能
    define('APP_DEBUG', true);
}else{
	define('APP_DEBUG', false);
}*/
define('APP_DEBUG', !!getenv('RUN_DEBUG'));

define('XHPROF', false);
header('Content-Type: text/html; charset=utf-8');
// 定义应用目录
define('APP_PATH',dirname(__DIR__).'/base_code/Application/');

// FANWE的根目录
define('FANWE_PATH',dirname(__FILE__).'/');

// WWW的根目录
define('WWW_PATH',dirname(__FILE__).'/');

$containerType = getenv('RUN_CONTAINER_TYPE');
if(!empty($containerType) && $containerType == 'docker'){
    define('LOG_PATH', '/var/log/php-mjb/'); //日志路径
} else {
    define('LOG_PATH', '/data/docker/logs/'.basename(dirname(dirname(APP_PATH)))); //日志路径
}

define('VENDOR_PATH',APP_PATH.'Admin/Library/Vendor/');

define('BIND_MODULE','Admin');
define('FANWE_ROOT', FANWE_PATH);
define('THINK_PATH', dirname(__DIR__).'/base_code/ThinkPHP/');
define('ADMIN_PATH', str_replace('\\', '/',getcwd()));
define('APP_NAME', 'Admin');
define('DIANGAOKEY', '13b973a7529a5110ad9c0b84c7574562');
define('APP_STATUS','site_meijiabang');

if(XHPROF){
//===================
//    $XHPROF_ROOT = realpath(dirname(__DIR__) . '/../../xhprof');
    $XHPROF_ROOT = '/data/www/xhprof';
    include_once $XHPROF_ROOT . "/xhprof_lib/utils/xhprof_lib.php";
    include_once $XHPROF_ROOT . "/xhprof_lib/utils/xhprof_runs.php";
// start profiling
    xhprof_enable();
//===================
}
// 引入ThinkPHP入口文件
require '../base_code/ThinkPHP/ThinkPHP.php';

// 亲^_^ 后面不需要任何代码了 就是如此简单

if(XHPROF){
    $xhprof_data = xhprof_disable();
    $xhprof_runs = new XHProfRuns_Default();
    $run_id = $xhprof_runs->save_run($xhprof_data, "meijialove_admin");
    header('X-App-Xhprof: ' . 'http://xhprof.meijialove.com:8006/xhprof_html/index.php?run=' . $run_id . '&source=meijialove_admin');
}