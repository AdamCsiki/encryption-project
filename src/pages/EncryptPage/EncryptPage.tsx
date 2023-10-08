import { useEffect, useState } from "react";
import TextArea from "../../components/TextArea/TextArea";
import "./EncryptPage.css";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import FileInput from "../../components/FileInput/FileInput";
import axios from "../../api/axios";
import Select from "../../components/Select/Select";
import fileDownload from "js-file-download";

export default function EncryptPage() {
	const [isFile, setIsFile] = useState<boolean>(false);
	const [isFileKey, setIsFileKey] = useState<boolean>(false);

	const [algorithm, setAlgorithm] = useState<string>("aes");

	const [operation, setOperation] = useState<string>("encrypt");

	const [formData, setFormData] = useState<{
		text?: string | null;
		key: string | any;
		file?: any | null;
	}>({ text: "", key: "", file: null });

	const [result, setResult] = useState<string>();

	const onSubmit = () => {
		let url = "/" + operation.toLocaleLowerCase() + "/" + algorithm;

		if (isFile) {
			url += "/file";
			delete formData.text;

			if (!formData.file) {
				setResult("No file");
				return;
			}
		} else {
			delete formData.file;

			if (!formData.text) {
				setResult("No message / encrypted message");
				return;
			}
		}

		if (!formData.key) {
			setResult("No key");
			return;
		}

		let form_data = new FormData();

		for (var key in formData) {
			// @ts-ignore
			form_data.append(key, formData[key]);
		}

		axios
			.postForm(url, form_data, {
				responseType: isFile ? "blob" : "json",
			})
			.then((res) => {
				if (isFile) {
					if (operation === "encrypt") {
						fileDownload(res.data, formData.file.name + ".enc");
					} else {
						fileDownload(
							res.data,
							formData.file.name.replace(".enc", "")
						);
					}

					return;
				}
				setResult(res.data.result);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const onGenerate = () => {
		axios
			.get("/generate/" + algorithm, {
				responseType: "blob",
			})
			.then((res) => {
				fileDownload(res.data, algorithm + "_keys.zip");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	useEffect(() => {
		setResult(undefined);
	}, [isFile]);

	return (
		<div className="EncryptPage">
			<div className="encrypt-page-container">
				<h5>{operation === "Encrypt" ? "Message" : "Encrypted"}</h5>
				{isFile ? (
					<FileInput
						onChange={(event) => {
							if (!event.target.files) {
								return;
							}
							if (event.target.files[0] == null) {
								return;
							}

							setFormData((old) => ({
								...old,
								file: event.target.files![0],
							}));
						}}
					/>
				) : (
					<TextArea
						onChange={(event) => {
							setFormData((old) => ({
								...old,
								text: event.target.value,
							}));
						}}
					/>
				)}

				{isFileKey ? (
					<>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "1rem",
							}}
						>
							<h5
								style={{
									width: "fit-content",
									display: "flex",
									flexDirection: "row",
									whiteSpace: "nowrap",
								}}
							>
								{operation === "encrypt"
									? "Private Key:"
									: "Public Key:"}
							</h5>
							<FileInput
								onChange={(event) => {
									if (!event.target.files) {
										return;
									}
									if (event.target.files[0] == null) {
										return;
									}

									setFormData((old) => ({
										...old,
										key: event.target.files![0],
									}));
								}}
							/>
						</div>

						<Button
							onClick={() => {
								onGenerate();
							}}
						>
							Generate Key
						</Button>
					</>
				) : (
					<Input
						placeholder="Key"
						onChange={(event) => {
							setFormData((old) => ({
								...old,
								key: event.target.value,
							}));
						}}
					/>
				)}
			</div>
			<div className="encrypt-middle">
				<Select
					onChange={(event) => {
						setOperation(event.target.value.toLowerCase());
					}}
				>
					<option>Encrypt</option>
					<option>Decrypt</option>
				</Select>
				<Select
					onChange={(event) => {
						setAlgorithm(event.target.value.toLowerCase());

						if (event.target.value.toLowerCase() === "rsa") {
							setIsFileKey(true);
						} else {
							setIsFileKey(false);
							setFormData((old) => ({
								...old,
								key: "",
							}));
						}
					}}
				>
					<option>AES</option>
					<option>DES</option>
					<option>RSA</option>
				</Select>
				<Button
					onClick={() => {
						onSubmit();
					}}
				>
					Run
				</Button>
				<div>
					<input
						type="checkbox"
						onChange={(e) => {
							setIsFile(e.target.checked);
						}}
					/>
					<label>File</label>
				</div>
			</div>

			<div className="encrypt-page-container">
				<h5>{operation === "Encrypt" ? "Encrypted" : "Message"}</h5>
				{!isFile ? (
					<TextArea value={result}></TextArea>
				) : (
					<>
						<h4>...Waiting for upload</h4>
						{result && <h4>Error: {result}</h4>}
					</>
				)}
			</div>
		</div>
	);
}
