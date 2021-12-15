/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select, { components } from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import style from "../style.module.css";

import {
	updateProfilePendidikan,
	clearErrors,
	getProfilePendidikan,
	getDataAsalSekolah,
} from "../../../../../redux/actions/pelatihan/profile.actions";
import { UPDATE_PENDIDIKAN_RESET } from "../../../../../redux/types/pelatihan/profile.type";
import {
	helperRegexNumberIpk,
	helperRegexNumber,
	helperRemoveZeroFromIndex0,
	SweatAlert,
} from "../../../../../utils/middleware/helper";
import moment from "moment";
import { useRouter } from "next/router";

const PendidikanEdit = ({ funcViewEdit, token, wizzard }) => {
	const dispatch = useDispatch();
	const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
	const [, forceUpdate] = useState();
	const router = useRouter();
	const { data: dataAsalSekolah } = useSelector(
		(state) => state.getAsalSekolah
	);

	const { error: errorPendidikan, data: dataPendidikan } = useSelector(
		(state) => state.drowpdownPendidikan
	);
	const { error: errorPendidikanData, pendidikan } = useSelector(
		(state) => state.dataPendidikan
	);
	const {
		error: errorUpdateData,
		loading,
		success,
	} = useSelector((state) => state.updatePendidikan);

	const [jengjangPendidikan, setJenjangPendidikan] = useState(
		(pendidikan && {
			value: pendidikan.jenjang,
			label: pendidikan.jenjang,
		}) || {
			value: "",
			label: "Silahkan Pilih Jenjang Pendidikan",
		}
	);

	const [asalSekolah, setAsalSekolah] = useState(
		(pendidikan && pendidikan.asal_pendidikan) || ""
	);
	const [lainya, setLainya] = useState((pendidikan && pendidikan.lainya) || "");
	const [asalInstitusi, setAsalInstitusi] = useState(
		(pendidikan && pendidikan.asal_pendidikan) || ""
	);
	const [programStudi, setProgramStudi] = useState(
		(pendidikan && pendidikan.program_studi) || ""
	);
	const [ipk, setIpk] = useState((pendidikan && pendidikan.ipk) || "");
	const [tahunMasuk, setTahunMasuk] = useState(
		(pendidikan && pendidikan.tahun_masuk) || ""
	);

	const [ijazahName, setIjazahName] = useState(
		pendidikan ? pendidikan?.ijasah?.split("/ijasah/") : "Belum ada file"
	);
	const [ijazah, setIjazah] = useState("");
	const [ijazahPreview, setIjazahPreview] = useState("");

	const [dataSearch, setDataSearch] = useState([]);
	const optionsJenjangPendidikan = [];
	if (dataPendidikan) {
		for (let index = 0; index < dataPendidikan?.data?.length; index++) {
			let val = {
				value: dataPendidikan.data[index].id,
				label: dataPendidikan.data[index].label,
			};
			optionsJenjangPendidikan.push(val);
		}
	}

	const [showInputCollegeName, setShowInputCollegeName] = useState(false);

	const NoOptionsMessage = (props) => {
		return (
			<components.NoOptionsMessage {...props}>
				<p className="text-left">
					Silahkan pilih Nama Institusi Pendidikan Lainnya bila Nama Institusi
					Pendidikan Anda tidak muncul..
				</p>
			</components.NoOptionsMessage>
		);
	};

	useEffect(() => {
		dispatch(getDataAsalSekolah(token));

		if (errorUpdateData) {
			SweatAlert("Gagal", errorUpdateData, "error");
			dispatch(clearErrors());
		}

		if (success) {
			SweatAlert("Berhasil", "Berhasil Update Data", "success");
			dispatch({ type: UPDATE_PENDIDIKAN_RESET });
			if (wizzard) {
				router.push("/peserta/wizzard/pekerjaan");
			} else {
				funcViewEdit(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		success,
		errorUpdateData,
		dispatch,
		jengjangPendidikan.value,
		funcViewEdit,
		token,
		asalSekolah,
	]);

	const optionsAsalSekolah = [];

	dataAsalSekolah &&
		dataAsalSekolah.map((item) => {
			optionsAsalSekolah.push({
				value: item.id,
				label: item.label,
			});
		});

	optionsAsalSekolah.push({
		value: "",
		label: "Nama Institusi Lainnya..",
	});

	const searchAsal = (word) => {
		let array = [];
		const searchData = getAsalSekolah;
		searchData.filter((data, index) => {
			if (data.value.toLowerCase().includes(word.toLowerCase())) {
				array.push(data);
			}
		});
		setDataSearch(array);
	};

	const onChangeAsalSekolah = (text) => {
		if (text === "Nama Institusi Lainnya..") {
			setShowInputCollegeName(true);
			setAsalSekolah("Nama Institusi Lainnya..");
		} else {
			setShowInputCollegeName(false);
			setAsalSekolah(text);
		}
	};

	const onChangeIjazah = (e) => {
		const type = ["image/jpg", "image/jpeg"];
		if (e.target.files[0]) {
			if (type.includes(e.target.files[0].type)) {
				if (e.target.files[0].size > 5000000) {
					e.target.value = null;
					Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
				} else {
					const reader = new FileReader();
					reader.onload = () => {
						if (reader.readyState === 2) {
							setIjazah(reader.result);
						}
					};
					reader.readAsDataURL(e.target.files[0]);
					setIjazahPreview(e.target.files[0]);
					setIjazahName(e.target.files[0].name);
				}
			} else {
				e.target.value = null;
				Swal.fire(
					"Oops !",
					"Data yang bisa dimasukkan hanya berupa image.",
					"error"
				);
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = {};
		if (simpleValidator.current.allValid()) {
			if (jengjangPendidikan.label === "Tidak Sekolah") {
				data = {
					jenjang: jengjangPendidikan.label,
					asal_pendidikan: "-",
					lainya: "-",
					program_studi: "-",
					ipk: "0",
					tahun_masuk: parseInt("1"),
					ijasah: "",
				};
			} else if (
				jengjangPendidikan.label === "TK" ||
				jengjangPendidikan.label === "SD/Sederajat" ||
				jengjangPendidikan.label === "SMP/Sederajat"
			) {
				data = {
					jenjang: jengjangPendidikan.label,
					asal_pendidikan: "0",
					lainya,
					program_studi: "0",
					ipk: "0",
					tahun_masuk: parseInt(tahunMasuk),
					ijasah: ijazah,
				};
			} else if (jengjangPendidikan.label === "SMA/Sederajat") {
				data = {
					jenjang: jengjangPendidikan.label,
					asal_pendidikan: asalSekolah,
					lainya: "-",
					program_studi: "0",
					ipk: "0",
					tahun_masuk: parseInt(tahunMasuk),
					ijasah: ijazah,
				};
			} else if (
				jengjangPendidikan.label === "D3" ||
				jengjangPendidikan.label === "D4" ||
				jengjangPendidikan.label === "S1" ||
				jengjangPendidikan.label === "S2" ||
				jengjangPendidikan.label === "S3"
			) {
				if (asalSekolah !== "Nama Institusi Lainnya..") {
					data = {
						jenjang: jengjangPendidikan.label,
						asal_pendidikan: asalSekolah,
						lainya: "-",
						program_studi: programStudi,
						ipk: `${ipk}`,
						tahun_masuk: parseInt(tahunMasuk),
						ijasah: ijazah,
					};
				} else {
					data = {
						jenjang: jengjangPendidikan.label,
						asal_pendidikan: asalInstitusi,
						lainya: "-",
						program_studi: programStudi,
						ipk: `${ipk}`,
						tahun_masuk: parseInt(tahunMasuk),
						ijasah: ijazah,
					};
				}
			}
			dispatch(updateProfilePendidikan(data, token));
			window.scrollTo(0, 0);
		} else {
			simpleValidator.current.showMessages();
			forceUpdate(1);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Isi data dengan benar !",
			});
		}
	};

	useEffect(() => {
		if (tahunMasuk > moment().year()) {
			setTahunMasuk(moment().year());
		}
	}, [tahunMasuk]);

	useEffect(() => {
		const validateIpk = /^[0-9]+\.[0-9][0-9][0-9][0-9]$/;
		if (ipk >= 4) {
			setIpk(4);
		}
		if (validateIpk.test(ipk)) {
			setIpk(Math.round(ipk));
		}
		const target = document.getElementById("formGridIpk");
		if (target) {
			target.onkeydown = (e) => {
				if (e.code == "Minus") {
					return false;
				}
				if (e.code == "NumpadAdd") {
					return false;
				}
				if (e.code == "NumpadSubtract") {
					return false;
				}
				if (e.code == "Equal") {
					return false;
				}
				if (e.code == "Comma") {
					return false;
				}
			};
		}
	}, [ipk]);

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<div className="informasi-pribadi">
					<h3 className="font-weight-bolder mb-5">Pendidikan Terakhir</h3>
					<Form.Group className="mb-3" controlId="formGridAddress1">
						<Form.Label>Jenjang Pendidikan</Form.Label>
						<div className="position-relative" style={{ zIndex: "5" }}>
							<Select
								placeholder={
									(pendidikan && pendidikan.jenjang) ||
									"Silahkan Pilih Asal Jenjang Pendidikan"
								}
								options={optionsJenjangPendidikan}
								defaultValue={jengjangPendidikan}
								onChange={(e) =>
									setJenjangPendidikan({ label: e.label, value: e.value })
								}
								onBlur={() =>
									simpleValidator.current.showMessageFor("jenjang pendidikan")
								}
							/>
						</div>
						{simpleValidator.current.message(
							"jenjang pendidikan",
							jengjangPendidikan,
							"required",
							{
								className: "text-danger",
							}
						)}
					</Form.Group>
					{jengjangPendidikan.value === 19 && <div className=""></div>}
					{jengjangPendidikan.label === "SMA/Sederajat" && (
						<Form.Group className="mb-3" controlId="formGridAdress1">
							<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
							<div className="position-relative" style={{ zIndex: "4" }}>
								<Select
									// list="data"
									placeholder={asalSekolah || "Pilih Sekolah"}
									options={optionsAsalSekolah}
									// className="form-control"
									defaultValue={asalSekolah}
									onChange={(e) => {
										setAsalSekolah(e.label);
									}}
								/>
							</div>
							{simpleValidator.current.message(
								"asal sekolah",
								asalSekolah,
								asalSekolah === null ? "required" : "",
								{
									className: "text-danger",
								}
							)}
						</Form.Group>
					)}

					{jengjangPendidikan.label === "D3" && showInputCollegeName === false && (
						<Row>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAdress1"
							>
								<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
								<div className="position-relative" style={{ zIndex: "4" }}>
									<Select
										placeholder={asalSekolah || "Pilih Sekolah"}
										options={optionsAsalSekolah}
										selectedValue={asalSekolah}
										onChange={(e) => {
											onChangeAsalSekolah(e.label);
										}}
										components={{ NoOptionsMessage }}
									/>
								</div>
								{simpleValidator.current.message(
									"asal sekolah",
									asalSekolah,
									asalSekolah === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Program Studi</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Program Studi"}
									value={programStudi === "0" ? "-" : programStudi}
									onChange={(e) => setProgramStudi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("program studi")
									}
								/>
								{simpleValidator.current.message(
									"program studi",
									programStudi,
									programStudi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "D3" && showInputCollegeName === true && (
						<Row>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAdress1"
							>
								<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
								<div className="position-relative" style={{ zIndex: "4" }}>
									<Select
										placeholder={asalSekolah || "Pilih Sekolah"}
										options={optionsAsalSekolah}
										selectedValue={asalSekolah}
										onChange={(e) => {
											onChangeAsalSekolah(e.label);
										}}
										components={{ NoOptionsMessage }}
									/>
								</div>
								{simpleValidator.current.message(
									"asal sekolah",
									asalSekolah,
									asalSekolah === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Nama Institusi Pendidikan</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Nama Institusi Pendidikan"}
									value={asalInstitusi}
									onChange={(e) => setAsalInstitusi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("nama institusi")
									}
								/>
								{simpleValidator.current.message(
									"nama institusi",
									asalInstitusi,
									asalInstitusi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "D4" && showInputCollegeName === false && (
						<Row>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAdress1"
							>
								<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
								<div className="position-relative" style={{ zIndex: "4" }}>
									<Select
										placeholder={asalSekolah || "Pilih Sekolah"}
										options={optionsAsalSekolah}
										selectedValue={asalSekolah}
										onChange={(e) => {
											onChangeAsalSekolah(e.label);
										}}
										components={{ NoOptionsMessage }}
									/>
								</div>
								{simpleValidator.current.message(
									"asal sekolah",
									asalSekolah,
									asalSekolah === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Program Studi</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Program Studi"}
									value={programStudi === "0" ? "-" : programStudi}
									onChange={(e) => setProgramStudi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("program studi")
									}
								/>
								{simpleValidator.current.message(
									"program studi",
									programStudi,
									programStudi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "D4" && showInputCollegeName === true && (
						<Row>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAdress1"
							>
								<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
								<div className="position-relative" style={{ zIndex: "4" }}>
									<Select
										placeholder={asalSekolah || "Pilih Sekolah"}
										options={optionsAsalSekolah}
										selectedValue={asalSekolah}
										onChange={(e) => {
											onChangeAsalSekolah(e.label);
										}}
										components={{ NoOptionsMessage }}
									/>
								</div>
								{simpleValidator.current.message(
									"asal sekolah",
									asalSekolah,
									asalSekolah === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Nama Institusi Pendidikan</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Nama Institusi Pendidikan"}
									value={asalInstitusi}
									onChange={(e) => setAsalInstitusi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("nama institusi")
									}
								/>
								{simpleValidator.current.message(
									"nama institusi",
									asalInstitusi,
									asalInstitusi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "S1" && showInputCollegeName === false && (
						<Row>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAdress1"
							>
								<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
								<div className="position-relative" style={{ zIndex: "4" }}>
									<Select
										placeholder={asalSekolah || "Pilih Sekolah"}
										options={optionsAsalSekolah}
										selectedValue={asalSekolah}
										onChange={(e) => {
											onChangeAsalSekolah(e.label);
										}}
										components={{ NoOptionsMessage }}
									/>
								</div>
								{simpleValidator.current.message(
									"asal sekolah",
									asalSekolah,
									asalSekolah === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Program Studi</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Program Studi"}
									value={programStudi === "0" ? "-" : programStudi}
									onChange={(e) => setProgramStudi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("program studi")
									}
								/>
								{simpleValidator.current.message(
									"program studi",
									programStudi,
									programStudi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "S1" && showInputCollegeName === true && (
						<Row>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAdress1"
							>
								<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
								<div className="position-relative" style={{ zIndex: "4" }}>
									<Select
										placeholder={asalSekolah || "Pilih Sekolah"}
										options={optionsAsalSekolah}
										selectedValue={asalSekolah}
										onChange={(e) => {
											onChangeAsalSekolah(e.label);
										}}
										components={{ NoOptionsMessage }}
									/>
								</div>
								{simpleValidator.current.message(
									"asal sekolah",
									asalSekolah,
									asalSekolah === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Nama Institusi Pendidikan</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Nama Institusi Pendidikan"}
									value={asalInstitusi}
									onChange={(e) => setAsalInstitusi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("nama institusi")
									}
								/>
								{simpleValidator.current.message(
									"nama institusi",
									asalInstitusi,
									asalInstitusi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "S2" && showInputCollegeName === false && (
						<Row>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAdress1"
							>
								<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
								<div className="position-relative" style={{ zIndex: "4" }}>
									<Select
										placeholder={asalSekolah || "Pilih Sekolah"}
										options={optionsAsalSekolah}
										selectedValue={asalSekolah}
										onChange={(e) => {
											onChangeAsalSekolah(e.label);
										}}
										components={{ NoOptionsMessage }}
									/>
								</div>
								{simpleValidator.current.message(
									"asal sekolah",
									asalSekolah,
									asalSekolah === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Program Studi</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Program Studi"}
									value={programStudi === "0" ? "-" : programStudi}
									onChange={(e) => setProgramStudi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("program studi")
									}
								/>
								{simpleValidator.current.message(
									"program studi",
									programStudi,
									programStudi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{/* Jika asal sekolah tidak ada */}
					{jengjangPendidikan.label === "S2" && showInputCollegeName === true && (
						<Row>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAdress1"
							>
								<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
								<div className="position-relative" style={{ zIndex: "4" }}>
									<Select
										placeholder={asalSekolah || "Pilih Sekolah"}
										options={optionsAsalSekolah}
										selectedValue={asalSekolah}
										onChange={(e) => {
											onChangeAsalSekolah(e.label);
										}}
										components={{ NoOptionsMessage }}
									/>
								</div>
								{simpleValidator.current.message(
									"asal sekolah",
									asalSekolah,
									asalSekolah === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Nama Institusi Pendidikan</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Nama Institusi Pendidikan"}
									value={asalInstitusi}
									onChange={(e) => setAsalInstitusi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("nama institusi")
									}
								/>
								{simpleValidator.current.message(
									"nama institusi",
									asalInstitusi,
									asalInstitusi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "S3" && showInputCollegeName === false && (
						<Row>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAdress1"
							>
								<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
								<div className="position-relative" style={{ zIndex: "4" }}>
									<Select
										placeholder={asalSekolah || "Pilih Sekolah"}
										options={optionsAsalSekolah}
										selectedValue={asalSekolah}
										onChange={(e) => {
											onChangeAsalSekolah(e.label);
										}}
										components={{ NoOptionsMessage }}
									/>
								</div>
								{simpleValidator.current.message(
									"asal sekolah",
									asalSekolah,
									asalSekolah === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Program Studi</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Program Studi"}
									value={programStudi === "0" ? "-" : programStudi}
									onChange={(e) => setProgramStudi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("program studi")
									}
								/>
								{simpleValidator.current.message(
									"program studi",
									programStudi,
									programStudi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{/* Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "S3" && showInputCollegeName === true && (
						<Row>
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAdress1"
							>
								<Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
								<div className="position-relative" style={{ zIndex: "4" }}>
									<Select
										placeholder={asalSekolah || "Pilih Sekolah"}
										options={optionsAsalSekolah}
										selectedValue={asalSekolah}
										onChange={(e) => {
											onChangeAsalSekolah(e.label);
										}}
										components={{ NoOptionsMessage }}
									/>
								</div>
								{simpleValidator.current.message(
									"asal sekolah",
									asalSekolah,
									asalSekolah === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Nama Institusi Pendidikan</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Nama Institusi Pendidikan"}
									value={asalInstitusi}
									onChange={(e) => setAsalInstitusi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("nama institusi")
									}
								/>
								{simpleValidator.current.message(
									"nama institusi",
									asalInstitusi,
									asalInstitusi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "TK" && (
						<Form.Group className="mb-3" controlId="formGridAddress1">
							<Form.Label>Lainnya ( Sekolah / PT)</Form.Label>
							<Form.Control
								placeholder="Silahkan Masukkan Lainnya ( Sekolah / PT)"
								value={lainya}
								onChange={(e) => setLainya(e.target.value)}
								onBlur={() =>
									simpleValidator.current.showMessageFor(
										"lainya ( sekolah/ pt )"
									)
								}
							/>
							{simpleValidator.current.message(
								"lainya ( sekolah/ pt )",
								lainya,
								lainya === null ? "required" : "",
								{
									className: "text-danger",
								}
							)}
						</Form.Group>
					)}
					{jengjangPendidikan.label === "SD/Sederajat" && (
						<Form.Group className="mb-3" controlId="formGridAddress1">
							<Form.Label>Lainnya ( Sekolah / PT)</Form.Label>
							<Form.Control
								placeholder="Silahkan Masukkan Lainnya ( Sekolah / PT)"
								value={lainya}
								onChange={(e) => setLainya(e.target.value)}
								onBlur={() =>
									simpleValidator.current.showMessageFor(
										"lainya ( sekolah/ pt )"
									)
								}
							/>
							{simpleValidator.current.message(
								"lainya ( sekolah/ pt )",
								lainya,
								lainya === null ? "required" : "",
								{
									className: "text-danger",
								}
							)}
						</Form.Group>
					)}
					{jengjangPendidikan.label === "SMP/Sederajat" && (
						<Form.Group className="mb-3" controlId="formGridAddress1">
							<Form.Label>Lainnya ( Sekolah / PT)</Form.Label>
							<Form.Control
								placeholder="Silahkan Masukkan Lainnya ( Sekolah / PT)"
								value={lainya}
								onChange={(e) => setLainya(e.target.value)}
								onBlur={() =>
									simpleValidator.current.showMessageFor(
										"lainya ( sekolah/ pt )"
									)
								}
							/>
							{simpleValidator.current.message(
								"lainya ( sekolah/ pt )",
								lainya,
								lainya === null ? "required" : "",
								{
									className: "text-danger",
								}
							)}
						</Form.Group>
					)}
					{jengjangPendidikan.label === "TK" && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "" : "required|integer",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}
					{jengjangPendidikan.label === "SD/Sederajat" && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "" : "required|integer",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}
					{jengjangPendidikan.label === "SMP/Sederajat" && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "" : "required|integer",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}
					{jengjangPendidikan.label === "SMA/Sederajat" && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "" : "required|integer",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}
					{jengjangPendidikan.label === "SD/Sederajat" && (
						<div className="form-group">
							<label className="col-form-label">Unggah Ijazah</label>
							<div className="d-flex">
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										name="question_image"
										accept="image/jpeg , image/jpg"
										onChange={onChangeIjazah}
										onBlur={() =>
											simpleValidator.current.showMessageFor("ijazah")
										}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										{ijazahName}
									</label>
									<label style={{ marginTop: "15px" }}>
										{simpleValidator.current.message(
											"ijazah",
											ijazah,
											ijazah === null ? "required" : "",
											{
												className: "text-danger",
											}
										)}
									</label>
								</div>
							</div>
							<small className="text-muted">
								*JPG/JPEG (Maksimal ukuran file 5 MB)
							</small>
						</div>
					)}
					{jengjangPendidikan.label === "SMP/Sederajat" && (
						<div className="form-group">
							<label className="col-form-label">Unggah Ijazah</label>
							<div className="d-flex">
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										name="question_image"
										accept="image/jpeg , image/jpg"
										onChange={onChangeIjazah}
										onBlur={() =>
											simpleValidator.current.showMessageFor("ijazah")
										}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										{ijazahName}
									</label>
									<label style={{ marginTop: "15px" }}>
										{simpleValidator.current.message(
											"ijazah",
											ijazah,
											ijazah === null ? "required" : "",
											{
												className: "text-danger",
											}
										)}
									</label>
								</div>
							</div>
							<small className="text-muted">
								*JPG/JPEG (Maksimal ukuran file 5 MB)
							</small>
						</div>
					)}
					{jengjangPendidikan.label === "SMA/Sederajat" && (
						<div className="form-group">
							<label className="col-form-label">Unggah Ijazah</label>
							<div className="d-flex">
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										name="question_image"
										accept="image/jpeg , image/jpg"
										onChange={onChangeIjazah}
										onBlur={() =>
											simpleValidator.current.showMessageFor("ijazah")
										}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										{ijazahName}
									</label>
									<label style={{ marginTop: "15px" }}>
										{simpleValidator.current.message(
											"ijazah",
											ijazah,
											ijazah === null ? "required" : "",
											{
												className: "text-danger",
											}
										)}
									</label>
								</div>
							</div>
							<small className="text-muted">
								*JPG/JPEG (Maksimal ukuran file 5 MB)
							</small>
						</div>
					)}

					{jengjangPendidikan.label === "D3" && showInputCollegeName === false && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridIpk">
								<Form.Label>IPK</Form.Label>
								<Form.Control
									minLength={0}
									maxLength={4}
									type="text"
									placeholder="Silahkan Masukkan IPK"
									value={ipk === "0" ? "-" : ipk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumberIpk.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setIpk);
										}
									}}
									onBlur={() => simpleValidator.current.showMessageFor("ipk")}
								/>
								<span className="text-muted">
									Gunakan titik "." - Contoh : 3.75
								</span>
								{simpleValidator.current.message(
									"ipk",
									ipk,
									ipk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "D3" && showInputCollegeName === true && (
						<Row className="mb-3">
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Program Studi</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Program Studi"}
									value={programStudi === "0" ? "-" : programStudi}
									onChange={(e) => setProgramStudi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("program studi")
									}
								/>
								{simpleValidator.current.message(
									"program studi",
									programStudi,
									programStudi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group as={Col} md={6} controlId="formGridIpk">
								<Form.Label>IPK</Form.Label>
								<Form.Control
									minLength={0}
									maxLength={4}
									type="text"
									placeholder="Silahkan Masukkan IPK"
									value={ipk === "0" ? "-" : ipk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumberIpk.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setIpk);
										}
									}}
									onBlur={() => simpleValidator.current.showMessageFor("ipk")}
								/>
								<span className="text-muted">
									Gunakan titik "." - Contoh : 3.75
								</span>
								{simpleValidator.current.message(
									"ipk",
									ipk,
									ipk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "D4" && showInputCollegeName === false && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridIpk">
								<Form.Label>IPK</Form.Label>
								<Form.Control
									minLength={0}
									maxLength={4}
									type="text"
									placeholder="Silahkan Masukkan IPK"
									value={ipk === "0" ? "-" : ipk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumberIpk.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setIpk);
										}
									}}
									onBlur={() => simpleValidator.current.showMessageFor("ipk")}
								/>
								<span className="text-muted">
									Gunakan titik "." - Contoh : 3.75
								</span>
								{simpleValidator.current.message(
									"ipk",
									ipk,
									ipk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "D4" && showInputCollegeName === true && (
						<Row className="mb-3">
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Program Studi</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Program Studi"}
									value={programStudi === "0" ? "-" : programStudi}
									onChange={(e) => setProgramStudi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("program studi")
									}
								/>
								{simpleValidator.current.message(
									"program studi",
									programStudi,
									programStudi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group as={Col} md={6} controlId="formGridIpk">
								<Form.Label>IPK</Form.Label>
								<Form.Control
									minLength={0}
									maxLength={4}
									type="text"
									placeholder="Silahkan Masukkan IPK"
									value={ipk === "0" ? "-" : ipk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumberIpk.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setIpk);
										}
									}}
									onBlur={() => simpleValidator.current.showMessageFor("ipk")}
								/>
								<span className="text-muted">
									Gunakan titik "." - Contoh : 3.75
								</span>
								{simpleValidator.current.message(
									"ipk",
									ipk,
									ipk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "S1" && showInputCollegeName === false && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridIpk">
								<Form.Label>IPK</Form.Label>
								<Form.Control
									minLength={0}
									maxLength={4}
									type="text"
									placeholder="Silahkan Masukkan IPK"
									value={ipk === "0" ? "-" : ipk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumberIpk.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setIpk);
										}
									}}
									onBlur={() => simpleValidator.current.showMessageFor("ipk")}
								/>
								<span className="text-muted">
									Gunakan titik "." - Contoh : 3.75
								</span>
								{simpleValidator.current.message(
									"ipk",
									ipk,
									ipk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "S1" && showInputCollegeName === true && (
						<Row className="mb-3">
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Program Studi</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Program Studi"}
									value={programStudi === "0" ? "-" : programStudi}
									onChange={(e) => setProgramStudi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("program studi")
									}
								/>
								{simpleValidator.current.message(
									"program studi",
									programStudi,
									programStudi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group as={Col} md={6} controlId="formGridIpk">
								<Form.Label>IPK</Form.Label>
								<Form.Control
									minLength={0}
									maxLength={4}
									type="text"
									placeholder="Silahkan Masukkan IPK"
									value={ipk === "0" ? "-" : ipk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumberIpk.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setIpk);
										}
									}}
									onBlur={() => simpleValidator.current.showMessageFor("ipk")}
								/>
								<span className="text-muted">
									Gunakan titik "." - Contoh : 3.75
								</span>
								{simpleValidator.current.message(
									"ipk",
									ipk,
									ipk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "S2" && showInputCollegeName === false && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridIpk">
								<Form.Label>IPK</Form.Label>
								<Form.Control
									minLength={0}
									maxLength={4}
									type="text"
									placeholder="Silahkan Masukkan IPK"
									value={ipk === "0" ? "-" : ipk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumberIpk.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setIpk);
										}
									}}
									onBlur={() => simpleValidator.current.showMessageFor("ipk")}
								/>
								<span className="text-muted">
									Gunakan titik "." - Contoh : 3.75
								</span>
								{simpleValidator.current.message(
									"ipk",
									ipk,
									ipk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "S2" && showInputCollegeName === true && (
						<Row className="mb-3">
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Program Studi</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Program Studi"}
									value={programStudi === "0" ? "-" : programStudi}
									onChange={(e) => setProgramStudi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("program studi")
									}
								/>
								{simpleValidator.current.message(
									"program studi",
									programStudi,
									programStudi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group as={Col} md={6} controlId="formGridIpk">
								<Form.Label>IPK</Form.Label>
								<Form.Control
									minLength={0}
									maxLength={4}
									type="text"
									placeholder="Silahkan Masukkan IPK"
									value={ipk === "0" ? "-" : ipk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumberIpk.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setIpk);
										}
									}}
									onBlur={() => simpleValidator.current.showMessageFor("ipk")}
								/>
								<span className="text-muted">
									Gunakan titik "." - Contoh : 3.75
								</span>
								{simpleValidator.current.message(
									"ipk",
									ipk,
									ipk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "S3" && showInputCollegeName === false && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridIpk">
								<Form.Label>IPK</Form.Label>
								<Form.Control
									minLength={0}
									maxLength={4}
									type="text"
									placeholder="Silahkan Masukkan IPK"
									value={ipk === "0" ? "-" : ipk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumberIpk.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setIpk);
										}
									}}
									onBlur={() => simpleValidator.current.showMessageFor("ipk")}
								/>
								<span className="text-muted">
									Gunakan titik "." - Contoh : 3.75
								</span>
								{simpleValidator.current.message(
									"ipk",
									ipk,
									ipk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "S3" && showInputCollegeName === true && (
						<Row className="mb-3">
							<Form.Group
								as={Col}
								md={6}
								className="mb-3"
								controlId="formGridAddress1"
							>
								<Form.Label>Program Studi</Form.Label>
								<Form.Control
									placeholder={"Silahkan Masukkan Program Studi"}
									value={programStudi === "0" ? "-" : programStudi}
									onChange={(e) => setProgramStudi(e.target.value)}
									onBlur={() =>
										simpleValidator.current.showMessageFor("program studi")
									}
								/>
								{simpleValidator.current.message(
									"program studi",
									programStudi,
									programStudi === null ? "required" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
							<Form.Group as={Col} md={6} controlId="formGridIpk">
								<Form.Label>IPK</Form.Label>
								<Form.Control
									minLength={0}
									maxLength={4}
									type="text"
									placeholder="Silahkan Masukkan IPK"
									value={ipk === "0" ? "-" : ipk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumberIpk.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setIpk);
										}
									}}
									onBlur={() => simpleValidator.current.showMessageFor("ipk")}
								/>
								<span className="text-muted">
									Gunakan titik "." - Contoh : 3.75
								</span>
								{simpleValidator.current.message(
									"ipk",
									ipk,
									ipk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "D3" && showInputCollegeName === false && (
						<div className="form-group">
							<label className="col-form-label">Unggah Ijazah</label>
							<div className="d-flex">
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										name="question_image"
										accept="image/jpeg , image/jpg"
										onChange={onChangeIjazah}
										onBlur={() =>
											simpleValidator.current.showMessageFor("ijazah")
										}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										{ijazahName}
									</label>
									<label style={{ marginTop: "15px" }}>
										{simpleValidator.current.message(
											"ijazah",
											ijazah,
											ijazah === null ? "required" : "",
											{
												className: "text-danger",
											}
										)}
									</label>
								</div>
							</div>
							<small className="text-muted">
								*JPG/JPEG (Maksimal ukuran file 5 MB)
							</small>
						</div>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "D3" && showInputCollegeName === true && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group as={Col} md={6} controlId="formGridIjazah">
								<Form.Label>Unggah Ijazah</Form.Label>
								<Form.Control
									type="file"
									className="custom-file-input"
									name="question_image"
									accept="image/jpeg , image/jpg"
									onChange={onChangeIjazah}
									onBlur={() =>
										simpleValidator.current.showMessageFor("ijazah")
									}
								/>
								<label
									className="custom-file-label mt-8 mx-3"
									htmlFor="customFile"
								>
									{ijazahName}
								</label>
								<label>
									{simpleValidator.current.message(
										"ijazah",
										ijazah,
										ijazah === null ? "required" : "",
										{
											className: "text-danger",
										}
									)}
								</label>
								<small className="text-muted">
									*JPG/JPEG (Maksimal ukuran file 5 MB)
								</small>
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "D4" && showInputCollegeName === false && (
						<div className="form-group">
							<label className="col-form-label">Unggah Ijazah</label>
							<div className="d-flex">
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										name="question_image"
										accept="image/jpeg , image/jpg"
										onChange={onChangeIjazah}
										onBlur={() =>
											simpleValidator.current.showMessageFor("ijazah")
										}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										{ijazahName}
									</label>
									<label style={{ marginTop: "15px" }}>
										{simpleValidator.current.message(
											"ijazah",
											ijazah,
											ijazah === null ? "required" : "",
											{
												className: "text-danger",
											}
										)}
									</label>
								</div>
							</div>
							<small className="text-muted">
								*JPG/JPEG (Maksimal ukuran file 5 MB)
							</small>
						</div>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "D4" && showInputCollegeName === true && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group as={Col} md={6} controlId="formGridIjazah">
								<Form.Label>Unggah Ijazah</Form.Label>
								<Form.Control
									type="file"
									className="custom-file-input"
									name="question_image"
									accept="image/jpeg , image/jpg"
									onChange={onChangeIjazah}
									onBlur={() =>
										simpleValidator.current.showMessageFor("ijazah")
									}
								/>
								<label
									className="custom-file-label mt-8 mx-3"
									htmlFor="customFile"
								>
									{ijazahName}
								</label>
								<label>
									{simpleValidator.current.message(
										"ijazah",
										ijazah,
										ijazah === null ? "required" : "",
										{
											className: "text-danger",
										}
									)}
								</label>
								<small className="text-muted">
									*JPG/JPEG (Maksimal ukuran file 5 MB)
								</small>
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "S1" && showInputCollegeName === false && (
						<div className="form-group">
							<label className="col-form-label">Unggah Ijazah</label>
							<div className="d-flex">
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										name="question_image"
										accept="image/jpeg , image/jpg"
										onChange={onChangeIjazah}
										onBlur={() =>
											simpleValidator.current.showMessageFor("ijazah")
										}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										{ijazahName}
									</label>
									<label style={{ marginTop: "15px" }}>
										{simpleValidator.current.message(
											"ijazah",
											ijazah,
											ijazah === null ? "required" : "",
											{
												className: "text-danger",
											}
										)}
									</label>
								</div>
							</div>
							<small className="text-muted">
								*JPG/JPEG (Maksimal ukuran file 5 MB)
							</small>
						</div>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "S1" && showInputCollegeName === true && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group as={Col} md={6} controlId="formGridIjazah">
								<Form.Label>Unggah Ijazah</Form.Label>
								<Form.Control
									type="file"
									className="custom-file-input"
									name="question_image"
									accept="image/jpeg , image/jpg"
									onChange={onChangeIjazah}
									onBlur={() =>
										simpleValidator.current.showMessageFor("ijazah")
									}
								/>
								<label
									className="custom-file-label mt-8 mx-3"
									htmlFor="customFile"
								>
									{ijazahName}
								</label>
								<label>
									{simpleValidator.current.message(
										"ijazah",
										ijazah,
										ijazah === null ? "required" : "",
										{
											className: "text-danger",
										}
									)}
								</label>
								<small className="text-muted">
									*JPG/JPEG (Maksimal ukuran file 5 MB)
								</small>
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "S2" && showInputCollegeName === false && (
						<div className="form-group">
							<label className="col-form-label">Unggah Ijazah</label>
							<div className="d-flex">
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										name="question_image"
										accept="image/jpeg , image/jpg"
										onChange={onChangeIjazah}
										onBlur={() =>
											simpleValidator.current.showMessageFor("ijazah")
										}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										{ijazahName}
									</label>
									<label style={{ marginTop: "15px" }}>
										{simpleValidator.current.message(
											"ijazah",
											ijazah,
											ijazah === null ? "required" : "",
											{
												className: "text-danger",
											}
										)}
									</label>
								</div>
							</div>
							<small className="text-muted">
								*JPG/JPEG (Maksimal ukuran file 5 MB)
							</small>
						</div>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "S2" && showInputCollegeName === true && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group as={Col} md={6} controlId="formGridIjazah">
								<Form.Label>Unggah Ijazah</Form.Label>
								<Form.Control
									type="file"
									className="custom-file-input"
									name="question_image"
									accept="image/jpeg , image/jpg"
									onChange={onChangeIjazah}
									onBlur={() =>
										simpleValidator.current.showMessageFor("ijazah")
									}
								/>
								<label
									className="custom-file-label mt-8 mx-3"
									htmlFor="customFile"
								>
									{ijazahName}
								</label>
								<label>
									{simpleValidator.current.message(
										"ijazah",
										ijazah,
										ijazah === null ? "required" : "",
										{
											className: "text-danger",
										}
									)}
								</label>
								<small className="text-muted">
									*JPG/JPEG (Maksimal ukuran file 5 MB)
								</small>
							</Form.Group>
						</Row>
					)}

					{jengjangPendidikan.label === "S3" && showInputCollegeName === false && (
						<div className="form-group">
							<label className="col-form-label">Unggah Ijazah</label>
							<div className="d-flex">
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										name="question_image"
										accept="image/jpeg , image/jpg"
										onChange={onChangeIjazah}
										onBlur={() =>
											simpleValidator.current.showMessageFor("ijazah")
										}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										{ijazahName}
									</label>
									<label style={{ marginTop: "15px" }}>
										{simpleValidator.current.message(
											"ijazah",
											ijazah,
											ijazah === null ? "required" : "",
											{
												className: "text-danger",
											}
										)}
									</label>
								</div>
							</div>
							<small className="text-muted">
								*JPG/JPEG (Maksimal ukuran file 5 MB)
							</small>
						</div>
					)}

					{/* Jika Asal Sekolah Tidak Ada */}
					{jengjangPendidikan.label === "S3" && showInputCollegeName === true && (
						<Row className="mb-3">
							<Form.Group as={Col} md={6} controlId="formGridTahun">
								<Form.Label>Tahun Masuk</Form.Label>
								<Form.Control
									type="text"
									placeholder="Silahkan Masukkan Tahun Masuk"
									value={tahunMasuk === 1 ? "-" : tahunMasuk}
									onChange={(e) => {
										if (
											e.target.value === "" ||
											helperRegexNumber.test(e.target.value)
										) {
											helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
										}
									}}
									maxLength={4}
									minLength={4}
									onBlur={() =>
										simpleValidator.current.showMessageFor("tahun masuk")
									}
								/>
								<span className="text-muted">
									Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
								</span>
								{simpleValidator.current.message(
									"tahun masuk",
									tahunMasuk,
									tahunMasuk === null ? "required|integer" : "",
									{
										className: "text-danger",
									}
								)}
							</Form.Group>

							<Form.Group as={Col} md={6} controlId="formGridIjazah">
								<Form.Label>Unggah Ijazah</Form.Label>
								<Form.Control
									type="file"
									className="custom-file-input"
									name="question_image"
									accept=" image/jpeg, image/jpg"
									onChange={onChangeIjazah}
									onBlur={() =>
										simpleValidator.current.showMessageFor("ijazah")
									}
								/>
								<label
									className="custom-file-label mt-8 mx-3"
									htmlFor="customFile"
								>
									{ijazahName}
								</label>
								<label>
									{simpleValidator.current.message(
										"ijazah",
										ijazah,
										ijazah === null ? "required" : "",
										{
											className: "text-danger",
										}
									)}
								</label>
								<small className="text-muted">
									*JPG/JPEG (Maksimal ukuran file 5 MB)
								</small>
							</Form.Group>
						</Row>
					)}
				</div>
				{!wizzard ? (
					<div className="button-aksi mt-5 float-right">
						<Button
							className={`${style.button_profile_batal} rounded-xl mr-2`}
							type="button"
							onClick={() => funcViewEdit(false)}
						>
							Batal
						</Button>
						<Button
							className={`${style.button_profile_simpan} rounded-xl`}
							type="submit"
						>
							Simpan
						</Button>
					</div>
				) : (
					<div className="button-aksi mt-5 float-right">
						<Button
							className={`${style.button_profile_simpan} rounded-xl`}
							type="submit"
						>
							Lanjut
						</Button>
					</div>
				)}
			</Form>
		</>
	);
};

export default PendidikanEdit;
