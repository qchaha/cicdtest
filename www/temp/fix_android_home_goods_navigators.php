<?php
/**
 * Created by PhpStorm.
 * User: jessezhang
 * Date: 2016/11/12
 * Time: 下午4:35
 */

$data = '{"error_code":20101,"error_message":"data not found","error_description":null,"data":null}';

if (strtolower($_SERVER['HTTP_X_RELEASE_PLATFORM']) == 'android') {
    $data = '{"error_code":0,"error_message":"data not found","error_description":null,"data":null}';
}


header('Content-type: application/json; charset=utf-8');

echo $data;