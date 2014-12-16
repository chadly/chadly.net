//https://github.com/TryGhost/Ghost/blob/master/core/server/helpers/index.js

var moment = require('moment');

module.exports = function (context, options) {
	if (!options && context.hasOwnProperty('hash')) {
		options = context;
		context = undefined;

		// set to date by default, if it's available
		// otherwise, this will print the current date
		if (this.date) {
			context = this.date;
		}
	}

	var f = options.hash.format || 'MMM Do, YYYY',
        timeago = options.hash.timeago,
        date;


	if (timeago) {
		date = moment.utc(context).fromNow();
	} else {
		date = moment.utc(context).format(f);
	}
	return date;
};