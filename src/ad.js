import React, { useMemo } from "react";

import Alert from "./alert";

const Ad = ({ hash }) => (
	<Alert>
		<AdContent hash={hash} />
	</Alert>
);

const AdContent = ({ hash }) => {
	const idx = useMemo(() => hash % adCopy.length, [hash]);
	return adCopy[idx];
};

const adCopy = [
	<>
		News Flash! I've made a thing. Check it out if you are interested in making{" "}
		<a href="https://www.runly.io/">scheduling and running background jobs</a>
		<> in your app easier.</>
	</>,
	<>
		News Flash! I've made a thing. Check it out if you are interested in making
		your <a href="https://www.runly.io/">app more fault tolerant</a>.
	</>,
	<>
		News Flash! I've made a thing. Check it out if you are interested in easily{" "}
		<a href="https://www.runly.io/">
			reporting progress of your long-running background jobs
		</a>
		<> in your web apps.</>
	</>
];

export default Ad;
