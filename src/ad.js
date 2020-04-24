import React, { useMemo } from "react";
import moment from "moment";

import Alert from "./alert";

const Ad = ({ hash, ...props }) => {
	const date = useMemo(() => moment(new Date()).format("MMMM YYYY"), []);

	return (
		<Alert {...props}>
			<strong>{date} News Flash! I've made a thing.</strong>
			<br />
			<AdContent hash={hash} />
		</Alert>
	);
};

const AdContent = ({ hash }) => {
	const idx = useMemo(() => hash % adCopy.length, [hash]);
	return adCopy[idx];
};

const adCopy = [
	<>
		Check it out if you are interested in making{" "}
		<a href="https://www.runly.io/">scheduling and running background jobs</a>
		<> in your app easier.</>
	</>,
	<>
		Check it out if you are interested in making your{" "}
		<a href="https://www.runly.io/">app more fault tolerant</a>.
	</>,
	<>
		Check it out if you are interested in easily{" "}
		<a href="https://www.runly.io/">
			reporting progress of your long-running background jobs
		</a>
		<> in your web apps.</>
	</>
];

export default Ad;
