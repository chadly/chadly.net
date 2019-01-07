/* eslint-disable import/no-commonjs */
const fs = require("fs");

// create the .env file from the sample.env file if it doesn't already exist
if (!fs.existsSync(".env")) {
	fs.createReadStream("sample.env").pipe(fs.createWriteStream(".env"));
}
