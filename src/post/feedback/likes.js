import React from "react";
import FaceWall from "./facewall";

const Likes = ({ likes }) => {
	if (!likes || !likes.length) return null;

	return (
		<section>
			<h3>
				{likes.length} Like{likes.length != 1 ? "s" : ""}
			</h3>
			<FaceWall faces={likes} />
		</section>
	);
};

export default Likes;
