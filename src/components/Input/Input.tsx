import "./Input.css";

export default function Input(
	props: React.InputHTMLAttributes<HTMLInputElement>
) {
	return (
		<input
			{...props}
			className="Input"
		/>
	);
}
