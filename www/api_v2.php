<?php
/**
 * API 网关入口文件
 */
$inTp = true;
$inTpApp = 'frontend';

$param = empty($_REQUEST['data']) ? "" : $_REQUEST['data'];
if (!is_array($param)) {
    $param = json_decode(rawurldecode($param), true);
}
$method = empty($param['method']) ? "getItemsFromList" : $param['method'];

$_API_CONFIG_LIST = array(
    'topic_detail' => array(
        'controller' => 'Topic',
        'action' => 'topicDetail',
    ),
    'topic_list' => array(
        'controller' => 'Topic',
        'action' => 'topicList',
    ),
    'user_info' => array(
        'controller' => 'User',
        'action' => 'userInfo',
    ),
    'user_profile_set' => array(
        'controller' => 'User',
        'action' => 'editUserProfile',
    ),
    'act_info' => array(
        'controller' => 'Others',
        'action' => 'actInfo',
    ),
    'share_add' => array(
        'controller' => 'Share',
        'action' => 'add',
    ),
    'share_delete' => array(
        'controller' => 'Share',
        'action' => 'remove',
    ),
    'share_list' => array(
        'controller' => 'Share',
        'action' => 'shareList',
    ),
    'share_search' => array(
        'controller' => 'Share',
        'action' => 'shareList',
    ),
    'share_detail' => array(
        'controller' => 'Share',
        'action' => 'shareDetail',
    ),
    'user_like' => array(
        'controller' => 'Share',
        'action' => 'collect',
    ),
    'user_unlike' => array(
        'controller' => 'Share',
        'action' => 'uncollect',
    ),
    'user_like_list' => array(
        'controller' => 'Share',
        'action' => 'userLikeList',
    ),
    'user_share_list' => array(
        'controller' => 'Share',
        'action' => 'userShareList',
    ),
    'tutorial_want_list' => array(
        'controller' => 'Share',
        'action' => 'tutorialWantList',
    ),
    'upload_image' => array(
        'controller' => 'Image',
        'action' => 'upload',
    ),
    'topic_add' => array(
        'controller' => 'Topic',
        'action' => 'add',
    ),
    'topic_delete' => array(
        'controller' => 'Topic',
        'action' => 'remove',
    ),
    'tutorial_want' => array(
        'controller' => 'Share',
        'action' => 'tutorialWant',
    ),
    'tutorial_crontab' => array(
        'controller' => 'Share',
        'action' => 'getMaxTopicWantShareByCrontab',
    ),
    'share_score_crontab' => array(
        'controller' => 'Share',
        'action' => 'updateShareScoreByCrontab',
    ),
    'crontab_from_table' => array(
        'controller' => 'Crontab',
        'action' => 'run',
    ),
    'comment_list' => array(
        'controller' => 'Comment',
        'action' => 'lists',
    ),
    'comment_add' => array(
        'controller' => 'Comment',
        'action' => 'add',
    ),
    'user_comment_delete' => array(
        'controller' => 'Comment',
        'action' => 'removeCommentByUid',
    ),
    'comment_delete' => array(
        'controller' => 'Comment',
        'action' => 'remove',
    ),
    'topic_comment' => array(
        'controller' => 'Comment',
        'action' => 'lists',
    ),
    'topic_comment_add' => array(
        'controller' => 'Comment',
        'action' => 'add',
    ),
    'check_region_update' => array(
        'controller' => 'Others',
        'action' => 'checkRegionUpdate',
    ),
    'config' => array(
        'controller' => 'Others',
        'action' => 'config',
    ),
    'get_templates_url' => array(
        'controller' => 'Others',
        'action' => 'getTemplatesUrl',
    ),
    'share_delete_by_user_id' => array(
        'controller' => 'Share',
        'action' => 'deleteByUserId',
    ),
    'tutorial_count_down_time' => array(
        'controller' => 'Others',
        'action' => 'courseCountdownTime',
    ),
    'tutorial_count_down_lefttime' => array(
        'controller' => 'Others',
        'action' => 'courseCountdownLefttime',
    ),
    'user_black' => array(
        'controller' => 'Others',
        'action' => 'userBlack',
    ),
    'driven_info_report' => array(
        'controller' => 'Others',
        'action' => 'drivenInfoReport',
    ),
    'driven_info' => array(
        'controller' => 'Others',
        'action' => 'drivenInfo',
    ),
    'nailshop_order_add' => array(
        'controller' => 'Vshop',
        'action' => 'nailshopOrderAdd',
    ),
    'nailshop_order_detail' => array(
        'controller' => 'Vshop',
        'action' => 'nailshopOrderDetail',
    ),
    'nailshop_order_list' => array(
        'controller' => 'Vshop',
        'action' => 'nailshopOrderList',
    ),
    'nailshop_order_lastest_address' => array(
        'controller' => 'Vshop',
        'action' => 'nailshopOrderLastestAddress',
    ),
    'nailshop_list' => array(
        'controller' => 'Vshop',
        'action' => 'nailshopList',
    ),
    'nailshop_goods_list' => array(
        'controller' => 'Vshop',
        'action' => 'nailshopGoodsList',
    ),
    'my_coupon' => array(
        'controller' => 'Vshop',
        'action' => 'myCoupon',
    ),
    'nailshop_order_edit' => array(
        'controller' => 'Vshop',
        'action' => 'nailshopOrderEdit',
    ),
    'obtain_coupon' => array(
        'controller' => 'Vshop',
        'action' => 'obtainCoupon',
    ),

);

if (isset($_API_CONFIG_LIST[$method])) {
    // 检测PHP环境
    if (version_compare(PHP_VERSION, '5.3.0', '<')) {
        die('require PHP > 5.3.0 !');
    }
    define('APP_PATH', dirname(__DIR__) . '/base_code/Application/');
    define('FANWE_PATH', dirname(__FILE__) . '/');
    define('WWW_PATH', dirname(__FILE__) . '/');
    define('VENDOR_PATH', APP_PATH . 'Common/Library/Vendor/');
    $containerType = getenv('RUN_CONTAINER_TYPE');
    if(!empty($containerType) && $containerType == 'docker'){
        define('LOG_PATH', '/var/log/php-mjb/'); //日志路径
    } else {
        define('LOG_PATH', '/data/docker/logs/'.basename(dirname(dirname(APP_PATH)))); //日志路径
    }

    define('APP_DEBUG', !!getenv('RUN_DEBUG'));

    if (preg_match('/meiliadmin\.api\.mli\.so$/', $_SERVER['HTTP_HOST'])) {
        define('APP_STATUS', 'site_meijiabang');
    } elseif (preg_match('/(^|\.)meili\.meijialove.com$/', $_SERVER['HTTP_HOST'])) {
        define('APP_STATUS', 'site_meili');
    } else {
        if (preg_match('/(^|\.)api\.mli.so$/', $_SERVER['HTTP_HOST'])) {
            define('APP_STATUS', 'site_meili_api');
        } else {
            define('APP_STATUS', 'site_meijiabang');
        }
    }

    define('BIND_MODULE', 'Oldapi');
    define('BIND_CONTROLLER', $_API_CONFIG_LIST[$method]['controller']);
    define('BIND_ACTION', $_API_CONFIG_LIST[$method]['action']);
    $_API_CONFIG = $_API_CONFIG_LIST[$method];

    // 引入ThinkPHP入口文件
    require '../base_code/ThinkPHP/ThinkPHP.php';

} else {//调用fanwe

    header('RUN_SERVER_ENV:' . getenv('RUN_SERVER') . '-' . getenv('RUN_ENV'));

    $ref = parse_url($_SERVER['HTTP_REFERER']);
    header('Access-Control-Allow-Origin: ' . $ref['scheme'] . '://' . $ref['host']);
    header('Access-Control-Allow-Headers: X-Requested-With');
    header('Access-Control-Allow-Methods: GET,POST,OPTIONS');

    $param = empty($_REQUEST['data']) ? "" : $_REQUEST['data'];
    $domain = empty($_REQUEST['domain']) ? "" : $_REQUEST['domain'];


    if (!empty($_POST['data'])) {
        $type = 'json';
    } else {
        $type = empty($_REQUEST['type']) ? "jsonp" : $_REQUEST['type'];
    }

    $callback = empty($_REQUEST['callback']) ? "callback" : $_REQUEST['callback'];
    if (!is_array($param)) {
        $param = json_decode(rawurldecode($param), true);
    }

    $param['client_version'] = empty($_REQUEST['client_version']) ? "1.0" : htmlspecialchars($_REQUEST['client_version']);
    $param['client_version_code'] = empty($_REQUEST['client_version_code']) ? "1" : htmlspecialchars($_REQUEST['client_version_code']);
    $param['client_type'] = empty($_REQUEST['client_type']) ? "android" : htmlspecialchars($_REQUEST['client_type']);
    if ($param['client_type'] == 'iPhone' || $param['client_type'] == 'iPad') {
        $param['client_type'] = 'iphone';
    }

    $ret = array();
    $data = array();
    $data['method'] = $method;
    $data['result'] = array();
    $ret['api'] = 'meijialove.com';
    $ret['v'] = $param['client_version'];
    if (($param['client_type'] == 'iphone' && $param['client_version_code'] >= 12)
        || ($param['client_type'] == 'android' && $param['client_version_code'] >= 17)
    ) {
        $ret['result_message'] = '请升级版本';
    } else {
        $ret['ret'] = array('请升级版本');
    }

    $ret['result_code'] = 2000;
    $ret['data'] = $data;


    if (!empty($ret['data'])) {
        $ret['data']['auth'] = '';
    }
    if ($type == 'jsonp') {
        header('Content-type: application/javascript');
        echo $callback . "(" . json_encode($ret) . ")";
    } elseif ($type == 'json') {
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($ret);
    } elseif ($type == 'iframe') {
        header('Content-type: text/html');
        if (!empty($domain)) {
            echo '<script>document.domain = "' . $domain . '";</script>';
        }
        echo '<script>parent.' . $callback . "(" . json_encode($ret) . ")" . '</script>';
    }
}