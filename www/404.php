<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>美甲帮 404 页面</title>
</head>
<body>
<div style="text-align:center;margin-top:200px;">
    <h2>404</h2>
    <div>程序员和产品经理私奔了   O(∩_∩)O ~ </div>
    <div style="margin-top: 20px;">
        <?php
        if ( ! function_exists('getClientIp')) {
            function getClientIp($type = 0)
            {
                $type = $type ? 1 : 0;
                static $ip = null;
                if ($ip !== null) {
                    return $ip[$type];
                }
                if (isset( $_SERVER["HTTP_WL_PROXY_CLIENT_IP"] ) && ! empty( $_SERVER["HTTP_WL_PROXY_CLIENT_IP"] ) && strpos($_SERVER["HTTP_WL_PROXY_CLIENT_IP"],'10.') !==0 && strpos($_SERVER["HTTP_WL_PROXY_CLIENT_IP"],'127.') !==0 ) {
                    $ip = $_SERVER["HTTP_WL_PROXY_CLIENT_IP"];
                }elseif (isset( $_SERVER["HTTP_REMOTE_ADDR"] ) && ! empty( $_SERVER["HTTP_REMOTE_ADDR"] ) && strpos($_SERVER["HTTP_REMOTE_ADDR"],'10.') !==0 && strpos($_SERVER["HTTP_REMOTE_ADDR"],'127.') !==0 ) {
                    $ip = $_SERVER["HTTP_REMOTE_ADDR"];
                }elseif (isset( $_SERVER['REMOTE_ADDR'] )  && strpos($_SERVER["REMOTE_ADDR"],'10.') !==0 && strpos($_SERVER["REMOTE_ADDR"],'127.') !==0 ) {
                    $ip = $_SERVER['REMOTE_ADDR'];
                } elseif (isset( $_SERVER['HTTP_X_FORWARDED_FOR'] ) && strpos($_SERVER["HTTP_X_FORWARDED_FOR"],'10.') !==0 && strpos($_SERVER["HTTP_X_FORWARDED_FOR"],'127.') !==0 ) {
                    $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
                    $pos = array_search('unknown', $arr);
                    if (false !== $pos) {
                        unset( $arr[$pos] );
                    }
                    $ip = trim($arr[0]);
                } elseif (isset( $_SERVER['HTTP_CLIENT_IP'] )) {
                    $ip = $_SERVER['HTTP_CLIENT_IP'];
                }
                // IP地址合法验证
                $long = sprintf("%u", ip2long($ip));
                $ip   = $long ? array( $ip, $long ) : array( '0.0.0.0', 0 );

                return $ip[$type];

            }
        }
        echo getClientIp();
        ?>
    </div>
</div>
</body>
</html>