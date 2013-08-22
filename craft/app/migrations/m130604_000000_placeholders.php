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
 * The class name is the UTC timestamp in the format of mYYMMDD_HHMMSS_migrationName
 */
class m130604_000000_placeholders extends BaseMigration
{
	/**
	 * Any migration code in here is wrapped inside of a transaction.
	 *
	 * @return bool
	 */
	public function safeUp()
	{

		// Find all the PlainText Fields
		$fields = craft()->db->createCommand()
			->select('id,settings')
			->from('fields')
			->where(array('type' => 'PlainText'))
			->queryAll();


		foreach ($fields as $field)
		{
			$fieldSettings = JsonHelper::decode($field['settings']);

			if (isset($fieldSettings['hint']))
			{
				$fieldSettings['placeholder'] = $fieldSettings['hint'];
				unset($fieldSettings['hint']);
			}


			$this->update('fields',
				array('settings' => JsonHelper::encode($fieldSettings)),
				array('id' => $field['id'])
			);

		}

		Craft::log('Successfully changed `hint` setting to the `placeholder` setting.', LogLevel::Info, true);

		return true;
	}
}
