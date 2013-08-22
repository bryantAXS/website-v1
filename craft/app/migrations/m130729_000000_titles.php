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
class m130729_000000_titles extends BaseMigration
{
	/**
	 * Any migration code in here is wrapped inside of a transaction.
	 *
	 * @return bool
	 */
	public function safeUp()
	{
		if (!craft()->db->schema->columnExists('content', 'title'))
		{
			$primaryLocaleId = craft()->i18n->getPrimarySiteLocaleId();

			// Add the new 'title' column to the content table
			$this->addColumnAfter('content', 'title', array('column' => ColumnType::Varchar), 'locale');

			// Migrate the entry titles
			$entries = craft()->db->createCommand()
				->select('entryId, locale, title')
				->from('entries_i18n')
				->queryAll();

			foreach ($entries as $entry)
			{
				$this->insertOrUpdate('content', array(
					'elementId' => $entry['entryId'],
					'locale'    => $entry['locale']
				), array(
					'title'     => $entry['title']
				));
			}

			unset($entries);

			// Delete the old entry titles column
			$this->dropIndex('entries_i18n', 'title');
			$this->dropColumn('entries_i18n', 'title');

			// Create asset titles based on the filenames
			$assets = craft()->db->createCommand()
				->select('id, filename')
				->from('assetfiles')
				->queryAll();

			foreach ($assets as $asset)
			{
				$filename = pathinfo($asset['filename'], PATHINFO_FILENAME);
				$filename = str_replace('_', ' ', $filename);

				$this->insertOrUpdate('content', array(
					'elementId' => $asset['id'],
					'locale'    => $primaryLocaleId
				), array(
					'title'     => $filename
				));
			}

			unset($assets);

			// Create the index on the new titles column
			craft()->db->createCommand()->createIndex('content', 'title');
		}
		else
		{
			Craft::log('Tried to add a `title` column to the `content` table, but there is already one there.', LogLevel::Warning);
		}

		return true;
	}
}
