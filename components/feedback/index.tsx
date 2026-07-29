import Comments from "./comments";
import FaceWall from "./facewall";
import type { Feedback as FeedbackData } from "@/lib/feedback";

const Faces = ({
	faces,
	noun,
	className = ""
}: {
	faces: FeedbackData["likes"];
	noun: string;
	className?: string;
}) => {
	if (!faces.length) return null;

	return (
		<div className={className}>
			<p className="mb-4">
				<strong>
					{faces.length} {noun}
					{faces.length !== 1 ? "s" : ""}
				</strong>
			</p>
			<FaceWall faces={faces} />
		</div>
	);
};

const Feedback = ({ feedback }: { feedback: FeedbackData }) => {
	const { comments, totalCount, likes, reposts } = feedback;
	if (!likes.length && !comments.length && !reposts.length) return null;

	return (
		<section className="rounded-md border border-[color:var(--grid)] bg-[color:var(--panel)] p-5 sm:p-6">
			<div className="mb-6 border-b border-[color:var(--grid)] pb-2 font-mono text-[0.7rem] tracking-[0.2em] text-[color:var(--textMuted)] uppercase">
				[ incoming transmissions ]
			</div>
			<p className="m-0 mb-4 text-center font-mono text-xl font-bold text-[color:var(--textTitle)]">
				Comments
			</p>

			<Faces faces={likes} noun="Like" className="mt-6" />
			<Faces faces={reposts} noun="Repost" className="mt-6" />
			<Comments comments={comments} totalCount={totalCount} className="mt-6" />
		</section>
	);
};

export default Feedback;
