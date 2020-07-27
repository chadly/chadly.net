import React from "react";
import FaceWall from "./facewall";

const Likes = ({ likes, ...props }) => {
	if (!likes || !likes.length) return null;

	return (
		<div {...props}>
			<p>
				<strong>
					{likes.length} Like{likes.length != 1 ? "s" : ""}
				</strong>
			</p>
			<FaceWall faces={likes} />
		</div>
	);
};

export default Likes;
