import "./App.css";
import Header from "./components/Header/Header";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import EncryptPage from "./pages/EncryptPage/EncryptPage";

function App() {
	return (
		<div className="App">
			<Header />
			<Router>
				<Routes>
					<Route
						path="/crypt*"
						element={<EncryptPage />}
					/>
					<Route
						path="*"
						element={
							<Navigate
								to="/crypt"
								replace
							/>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
