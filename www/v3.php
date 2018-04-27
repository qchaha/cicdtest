<?php

use Pango\Component\HttpFoundation\Request;
use Symfony\Component\Debug\Debug;
use Meijiabang\Http\Helpers\Toolkit;

require __DIR__.'/../vendor/autoload.php';

$in_v3 = true;
//app mode
Toolkit::setEnvironmentVariable('MJB_APP_MODE', 'api');
//env load
Environment::load();

$debug = Environment::isDebug();
$runEnv = Environment::getRunEnv();
if ($debug) {
    Debug::enable();
}

//kernel
$kernel = new FrontendKernel($runEnv, $debug);
//init request
//Request::enableHttpMethodParameterOverride();
$request = Request::createFromGlobals();
//handle
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
