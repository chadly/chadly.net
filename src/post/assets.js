import React from "react";
import Helmet from "react-helmet";

const AssetIncluder = ({ assets }) => {
	if (!assets || !assets.length) {
		return null;
	}

	return (
		<Helmet>
			{assets.map(ass => {
				if (ass.endsWith(".css")) {
					return <link key={ass} rel="stylesheet" type="text/css" href={ass} />;
				}

				if (ass.endsWith(".js")) {
					return <script key={ass} type="text/javascript" src={ass} />;
				}
			})}
		</Helmet>
	);
};

export default AssetIncluder;
