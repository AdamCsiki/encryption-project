import "./Select.css";

export default function Select(
	props: React.InputHTMLAttributes<HTMLSelectElement>
) {
	return (
		<select
			{...props}
			className="Select"
		/>
	);
}
