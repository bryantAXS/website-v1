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
 *
 */
class UpdatesWidget extends BaseWidget
{
	/**
	 * Returns the type of widget this is.
	 *
	 * @return string
	 */
	public function getName()
	{
		return Craft::t('Updates');
	}

	/**
	 * Gets the widget's body HTML.
	 *
	 * @return string
	 */
	public function getBodyHtml()
	{
		if (craft()->updates->isUpdateInfoCached())
		{
			return craft()->templates->render('_components/widgets/Updates/body', array(
				'total' => craft()->updates->getTotalAvailableUpdates()
			));
		}
		else
		{
			craft()->templates->includeJsResource('js/UpdatesWidget.js');
			craft()->templates->includeJs('new Craft.UpdatesWidget('.$this->model->id.');');

			return '<p class="centeralign">'.Craft::t('Checking for updates…').'</p>';
		}
	}
}
