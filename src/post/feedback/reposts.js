import React from "react";

import FaceWall from "./facewall";

const Reposts = ({ reposts, ...props }) => {
	if (!reposts || !reposts.length) return null;

	return (
		<div {...props}>
			<p>
				<strong>
					{reposts.length} Repost{reposts.length != 1 ? "s" : ""}
				</strong>
			</p>
			<FaceWall faces={reposts} />
		</div>
	);
};

export default Reposts;
