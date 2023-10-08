import "./TextArea.css";

export default function TextArea(
	props: React.InputHTMLAttributes<HTMLTextAreaElement>
) {
	return (
		<textarea
			{...props}
			className="TextArea"
			placeholder="To be written here"
		/>
	);
}
