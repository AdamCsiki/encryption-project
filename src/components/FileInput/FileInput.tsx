import "./FileInput.css";

export default function FileInput(
	props: React.InputHTMLAttributes<HTMLInputElement>
) {
	return (
		<input
			{...props}
			type="file"
			className="FileInput"
		/>
	);
}
