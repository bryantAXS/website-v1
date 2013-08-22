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
class DateFieldType extends BaseFieldType
{
	/**
	 * Returns the type of field this is.
	 *
	 * @return string
	 */
	public function getName()
	{
		return Craft::t('Date');
	}

	/**
	 * Returns the content attribute config.
	 *
	 * @return mixed
	 */
	public function defineContentAttribute()
	{
		return AttributeType::DateTime;
	}

	/**
	 * Defines the settings.
	 *
	 * @access protected
	 * @return array
	 */
	protected function defineSettings()
	{
		return array(
			'showTime' => AttributeType::Bool,
		);
	}

	/**
	 * Returns the field's settings HTML.
	 *
	 * @return string|null
	 */
	public function getSettingsHtml()
	{
		return craft()->templates->renderMacro('_includes/forms.html', 'checkboxField', array(
			array(
				'label' => Craft::t('Show time?'),
				'id' => 'showTime',
				'name' => 'showTime',
				'checked' => $this->getSettings()->showTime,
			)
		));
	}

	/**
	 * Returns the field's input HTML.
	 *
	 * @param string $name
	 * @param mixed  $value
	 * @return string
	 */
	public function getInputHtml($name, $value)
	{
		$suffix = '-'.uniqid();

		$input = craft()->templates->render('_includes/forms/date', array(
			'id'       => rtrim(preg_replace('/[\[\]]+/', '-', $name), '-').$suffix,
			'name'     => $name,
			'value'    => $value
		));

		if ($this->getSettings()->showTime)
		{
			$input .= ' '.craft()->templates->render('_includes/forms/time', array(
				'id'       => rtrim(preg_replace('/[\[\]]+/', '-', $name), '-').$suffix,
				'name'     => $name,
				'value'    => $value
			));
		}

		return $input;
	}

	/**
	 * Get the posted time and adjust it for timezones.
	 *
	 * @param mixed $value
	 * @return DateTime
	 */
	protected function prepPostData($value)
	{
		if ($value)
		{
			// Ugly?  Yes.  Yes it is.
			$timeString = $value->format(DateTime::MYSQL_DATETIME, DateTime::UTC);
			return DateTime::createFromFormat(DateTime::MYSQL_DATETIME, $timeString, craft()->getTimeZone());
		}
	}

	/**
	 * Convert back to the server's timezone.
	 *
	 * @param mixed $value
	 * @return DateTime
	 */
	public function prepValue($value)
	{
		if ($value)
		{
			return $value->setTimezone(new \DateTimeZone(craft()->getTimeZone()));
		}
	}
}
