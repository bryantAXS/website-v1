<?php

// Path to your craft/ folder
$craftPath = '../craft';

// Define protocol relative site URL
define('CRAFT_SITE_URL',  '//' . $_SERVER['SERVER_NAME']);

// Setup environment-friendly configs
switch ($_SERVER['HTTP_HOST']) {
  case 'authenticff.com' :
    define('ENV', 'live');
    break;

  case 'staging.authenticff.com' :
    define('ENV', 'dev');
    break;

  default :
    define('ENV', 'local');
    break;
}

// Move plugins path to right above web root
define('CRAFT_PLUGINS_PATH', realpath(dirname(__FILE__) . "/../plugins").'/');

// Move templates path to right above web root
define('CRAFT_TEMPLATES_PATH', realpath(dirname(__FILE__) . "/../templates").'/');

define('CRAFT_STORAGE_PATH', realpath(dirname(__FILE__) . "/../craft/storage").'/');



// Do not edit below this line
$path = rtrim($craftPath, '/').'/app/index.php';

if (!is_file($path))
{
  exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
}

require_once $path;
