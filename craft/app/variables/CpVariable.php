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
 * CP functions
 */
class CpVariable
{
	/**
	 * Get the sections of the CP.
	 *
	 * @return array
	 */
	public function nav()
	{
		$nav['dashboard'] = array('name' => Craft::t('Dashboard'));

		if (craft()->sections->getTotalEditableSections())
		{
			$nav['entries'] = array('name' => Craft::t('Entries'));
		}

		if (craft()->globals->getTotalEditableSets())
		{
			$nav['globals'] = array('name' => Craft::t('Globals'));
		}

		if (craft()->assetSources->getTotalViewableSources())
		{
			$nav['assets'] = array('name' => Craft::t('Assets'));
		}

		if (Craft::hasPackage(CraftPackage::Users) && craft()->userSession->checkPermission('editUsers'))
		{
			$nav['users'] = array('name' => Craft::t('Users'));
		}

		// Add any Plugin nav items
		$plugins = craft()->plugins->getPlugins();

		foreach ($plugins as $plugin)
		{
			if ($plugin->hasCpSection())
			{
				if (craft()->userSession->checkPermission('accessPlugin-'.$plugin->getClassHandle()))
				{
					$lcHandle = strtolower($plugin->getClassHandle());
					$nav[$lcHandle] = array('name' => $plugin->getName());
				}
			}
		}

		if (craft()->userSession->checkPermission('performUpdates'))
		{
			$totalAvailableUpdates = craft()->updates->getTotalAvailableUpdates();

			if ($totalAvailableUpdates > 0)
			{
				$nav['updates'] = array('name' => Craft::t('Updates'), 'badge' => $totalAvailableUpdates);
			}
			else
			{
				$nav['updates'] = array('name' => Craft::t('Updates'));
			}
		}

		if (craft()->userSession->isAdmin())
		{
			$nav['settings'] = array('name' => Craft::t('Settings'));
		}

		return $nav;
	}

	/**
	 * Returns whether the CP alerts are cached.
	 *
	 * @return bool
	 */
	public function areAlertsCached()
	{
		// The license key status gets cached on each Elliott request
		return (craft()->et->getLicenseKeyStatus() !== false);
	}

	/**
	 * Returns an array of alerts to display in the CP.
	 *
	 * @return array
	 */
	public function getAlerts()
	{
		return CpHelper::getAlerts(craft()->request->getPath());
	}
}
