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
 * Element type base class
 */
abstract class BaseElementType extends BaseComponentType implements IElementType
{
	/**
	 * @access protected
	 * @var string The type of component this is
	 */
	protected $componentType = 'ElementType';

	/**
	 * Returns whether this element type has titles.
	 *
	 * @return bool
	 */
	public function hasTitles()
	{
		return false;
	}

	/**
	 * Returns whether this element type can have statuses.
	 *
	 * @return bool
	 */
	public function hasStatuses()
	{
		return false;
	}

	/**
	 * Returns whether this element type can have thumbnails.
	 *
	 * @return bool
	 */
	public function hasThumbs()
	{
		return false;
	}

	/**
	 * Returns whether this element type is translatable.
	 *
	 * @return bool
	 */
	public function isTranslatable()
	{
		return false;
	}

	/**
	 * Returns this element type's sources.
	 *
	 * @return array|false
	 */
	public function getSources()
	{
		return false;
	}

	/**
	 * Defines which model attributes should be searchable.
	 *
	 * @return array
	 */
	public function defineSearchableAttributes()
	{
		return array();
	}

	/**
	 * Returns the attributes that can be shown/sorted by in table views.
	 *
	 * @param string|null $source
	 * @return array
	 */
	public function defineTableAttributes($source = null)
	{
		return array();
	}

	/**
	 * Defines any custom element criteria attributes for this element type.
	 *
	 * @return array
	 */
	public function defineCriteriaAttributes()
	{
		return array();
	}

	/**
	 * Returns the element query condition for a custom status criteria.
	 *
	 * @param DbCommand $query
	 * @param string $status
	 * @return string|false
	 */
	public function getElementQueryStatusCondition(DbCommand $query, $status)
	{
	}

	/**
	 * Modifies an entries query targeting entries of this type.
	 *
	 * @param DbCommand $query
	 * @param ElementCriteriaModel $criteria
	 * @return null|false
	 */
	public function modifyElementsQuery(DbCommand $query, ElementCriteriaModel $criteria)
	{
	}

	/**
	 * Populates an element model based on a query result.
	 *
	 * @param array $row
	 * @return BaseModel
	 */
	public function populateElementModel($row)
	{
	}

	/**
	 * Routes the request when the URI matches an element.
	 *
	 * @param BaseElementModel
	 * @return mixed Can be false if no special action should be taken,
	 *               a string if it should route to a template path,
	 *               or an array that can specify a controller action path, params, etc.
	 */
	public function routeRequestForMatchedElement(BaseElementModel $element)
	{
		return false;
	}
}
