var fs = require("fs");

//load all helpers in this folder
fs.readdirSync(__dirname).forEach(function(file) {
	if (file !== "index.js" && file.indexOf(".js") > 0) {
		var name = file.slice(0, -3); //slice off .js extension
		exports[name] = require("./" + file);
	}
});
