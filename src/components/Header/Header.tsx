import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="Header">
			<a
				href="/encrypt"
				className="logo"
			>
				<h3>Crypter</h3>
			</a>

			<div className="header-link-container"></div>
		</header>
	);
}
