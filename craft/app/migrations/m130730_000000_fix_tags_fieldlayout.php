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
class m130730_000000_fix_tags_fieldlayout extends BaseMigration
{
	/**
	 * Any migration code in here is wrapped inside of a transaction.
	 *
	 * @return bool
	 */
	public function safeUp()
	{
		if (craft()->db->tableExists('fieldlayouts'))
		{
			$this->update('fieldlayouts',
				array('type' => 'Tag'),
				array('type' => '')
			);
		}
		else
		{
			Craft::log('Tried to fix the Tag fieldlayout type in the `fieldlayouts`table, but there is no table!', LogLevel::Error);
		}

		return true;
	}
}
