<?php
namespace Craft;

/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2013, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */

/**
 * Config functions
 */
class ConfigVariable
{
	/**
	 * Returns whether a config item exists.
	 *
	 * @param string $name
	 * @return bool
	 */
	function __isset($name)
	{
		return isset(craft()->params['generalConfig'][$name]);
	}

	/**
	 * Returns a config item.
	 *
	 * @param string $name
	 * @return string
	 */
	function __get($name)
	{
		return (string)craft()->config->get($name);
	}

	/**
	 * Returns whether generated URLs should be formatted using PATH_INFO.
	 *
	 * @return bool
	 */
	public function usePathInfo()
	{
		return craft()->config->usePathInfo();
	}
}
