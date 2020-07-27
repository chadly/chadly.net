import React from "react";
import FaceWall from "./facewall";

const Reposts = ({ reposts }) => {
	if (!reposts || !reposts.length) return null;

	return (
		<section>
			<h4>
				{reposts.length} Repost{reposts.length != 1 ? "s" : ""}
			</h4>
			<FaceWall faces={reposts} />
		</section>
	);
};

export default Reposts;
