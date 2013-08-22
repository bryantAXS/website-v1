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
class m130604_000000_create_searchindex extends BaseMigration
{
	/**
	 * Any migration code in here is wrapped inside of a transaction.
	 *
	 * @return bool
	 */
	public function safeUp()
	{
		if (!craft()->db->tableExists('searchindex'))
		{
			// Taking the scenic route here so we can get to MysqlSchema's $engine argument
			$table = DbHelper::addTablePrefix('searchindex');

			$columns = array(
				'elementId' => DbHelper::generateColumnDefinition(array('column' => ColumnType::Int, 'null' => false)),
				'attribute' => DbHelper::generateColumnDefinition(array('column' => ColumnType::Varchar, 'maxLength' => 25, 'null' => false)),
				'fieldId'   => DbHelper::generateColumnDefinition(array('column' => ColumnType::Int, 'null' => false)),
				'locale'    => DbHelper::generateColumnDefinition(array('column' => ColumnType::Locale, 'null' => false)),
				'keywords'  => DbHelper::generateColumnDefinition(array('column' => ColumnType::Text, 'null' => false)),
			);

			$this->execute(craft()->db->getSchema()->createTable($table, $columns, null, 'MyISAM'));

			// Give it a composite primary key
			$this->addPrimaryKey('searchindex', 'elementId,attribute,fieldId,locale');

			// Add the FULLTEXT index on `keywords`
			$this->execute('CREATE FULLTEXT INDEX ' .
				craft()->db->quoteTableName(DbHelper::getIndexName('searchindex', 'keywords')).' ON ' .
				craft()->db->quoteTableName($table).' ' .
				'('.craft()->db->quoteColumnName('keywords').')'
			);

			Craft::log('Successfully added the `searchindex` table with a fulltext index on `keywords`.', LogLevel::Info, true);
		}
		else
		{
			Craft::log('Tried to add the `searchindex` table, but it already exists.', LogLevel::Warning, true);
		}

		return true;
	}
}
