/*!
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2013, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */

(function($) {


Craft.Updater = Garnish.Base.extend({

	$graphic: null,
	$status: null,
	data: null,

	init: function(handle, manualUpdate)
	{
		this.$graphic = $('#graphic');
		this.$status = $('#status');

		if (!handle)
		{
			this.showError(Craft.t('Unable to determine what to update.'));
			return;
		}

		this.data = {
			handle: handle,
			manualUpdate: manualUpdate
		};

		this.postActionRequest('update/prepare');
	},

	updateStatus: function(msg)
	{
		this.$status.html(msg);
	},

	showError: function(msg)
	{
		this.updateStatus(msg);
		this.$graphic.addClass('error');
	},

	postActionRequest: function(action)
	{
		var data = {
			data: this.data
		};

		Craft.postActionRequest(action, data, $.proxy(this, 'onSuccessResponse'), $.proxy(this, 'onErrorResponse'));
	},

	onSuccessResponse: function(response)
	{
		if (!response.success && !response.error)
		{
			// Bad request, even though it's not returning with a 500 status
			this.onErrorResponse();
			return;
		}

		if (response.data)
		{
			this.data = response.data;
		}

		if (response.nextStatus)
		{
			this.updateStatus(response.nextStatus);
		}

		if (response.nextAction)
		{
			this.postActionRequest(response.nextAction);
		}

		if (response.error)
		{
			this.$graphic.addClass('error');
			this.updateStatus(response.error);
		}
		else if (response.finished)
		{
			this.onFinish(response.returnUrl);
		}
	},

	onErrorResponse: function()
	{
		this.showError(Craft.t('An unknown error occurred. Rolling back…'));
		this.postActionRequest('update/rollback');
	},

	onFinish: function(returnUrl)
	{
		this.updateStatus(Craft.t('All done!'));
		this.$graphic.addClass('success');

		// Redirect to the Dashboard in half a second
		setTimeout(function() {
			if (returnUrl) {
				window.location = Craft.getUrl(returnUrl);
			}
			else {
				window.location = Craft.getUrl('dashboard');
			}
		}, 500);
	}
});


})(jQuery);
