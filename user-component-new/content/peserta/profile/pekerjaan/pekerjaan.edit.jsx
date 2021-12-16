import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import style from "../style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
	updateProfilePekerjaan,
	clearErrors,
	getDataAsalSekolah,
	getDataRefPekerjaan,
} from "../../../../../redux/actions/pelatihan/profile.actions";
import { UPDATE_PEKERJAAN_RESET } from "../../../../../redux/types/pelatihan/profile.type";
import router from "next/router";
import {
	helperRegexNumber,
	helperRemoveZeroFromIndex0,
	SweatAlert,
} from "../../../../../utils/middleware/helper";

const PekerjaanEdit = ({ funcViewEdit, token, wizzard }) => {
	const dispatch = useDispatch();

	const { error: errorPekerjaan, pekerjaan } = useSelector(
		(state) => state.dataPekerjaan
	);
	const { data: dataAsalSekolah } = useSelector(
		(state) => state.getAsalSekolah
	);

	const { dataRefPekerjaan } = useSelector((state) => state.getRefPekerjaan);

	const { error: errorStatusPekerjaan, data: dataStatusPekerjaan } =
		useSelector((state) => state.drowpdownStatusPekerjaan);
	const {
		error: errorUpdateData,
		loading,
		success,
	} = useSelector((state) => state.updatePekerjaan);

	const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
	const [, forceUpdate] = useState();

	const [statusPekerjaan, setStatusPekerjaan] = useState(
		(pekerjaan && {
			value: pekerjaan.status_pekerjaan,
			label: pekerjaan.status_pekerjaan,
		}) || {
			value: "",
			label: "",
		}
	);

	const [pekerjaanNama, setPekerjaan] = useState(
		(pekerjaan && pekerjaan.pekerjaan) || ""
	);
	const [perusahaan, setPerusahaan] = useState(
		(pekerjaan && pekerjaan.perusahaan) || ""
	);
	const [penghasilan, setPenghasilan] = useState(
		(pekerjaan && pekerjaan.penghasilan) || "1"
	);
	const [sekolah, setSekolah] = useState(
		(pekerjaan && pekerjaan.sekolah) || ""
	);
	const [tahunMasuk, setTahunMasuk] = useState(
		(pekerjaan && pekerjaan.tahun_masuk) || ""
	);

	const optionsStatusPekerjaan = [];
	if (dataStatusPekerjaan) {
		for (let index = 0; index < dataStatusPekerjaan.data.length; index++) {
			let val = {
				value: dataStatusPekerjaan.data[index].id,
				label: dataStatusPekerjaan.data[index].label,
			};
			optionsStatusPekerjaan.push(val);
		}
	}

	const optionsDataRefPekerjaan = [];
	if (dataRefPekerjaan) {
		for (let i = 0; i < dataRefPekerjaan.length; i++) {
			let obj = {
				value: dataRefPekerjaan[i].id,
				label: dataRefPekerjaan[i].label,
			};
			optionsDataRefPekerjaan.push(obj);
		}
	}

	useEffect(() => {
		if (errorUpdateData) {
			SweatAlert("Gagal", errorUpdateData, "error");
			dispatch(clearErrors());
		}

		if (success) {
			SweatAlert("Berhasil", "Berhasil Update Data", "success");
			if (wizzard) {
				router.push("/peserta");
			} else {
				funcViewEdit(false);
			}
			dispatch({ type: UPDATE_PEKERJAAN_RESET });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errorUpdateData, success, dispatch, funcViewEdit, token]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (statusPekerjaan.label === "Tidak Bekerja") {
			simpleValidator.current.fields["tahun masuk"] = true; //pelajar
			simpleValidator.current.fields["sekolah"] = true; //pelajar
			simpleValidator.current.fields["pekerjaan"] = true; //pekerjaan
			simpleValidator.current.fields["penghasilan"] = true; //pekerjaan
			simpleValidator.current.fields["perusahaan"] = true; //pekerjaan
			simpleValidator.current.fields["sekolah lainnya"] = true;
		}
		if (statusPekerjaan.label == "Pelajar/Mahasiswa") {
			simpleValidator.current.fields["pekerjaan"] = true; //pekerjaan
			simpleValidator.current.fields["penghasilan"] = true; //pekerjaan
			simpleValidator.current.fields["perusahaan"] = true; //pekerjaan
		}
		if (statusPekerjaan.label == "Bekerja") {
			simpleValidator.current.fields["tahun masuk"] = true; //pelajar
			simpleValidator.current.fields["sekolah"] = true; //pelajar
			simpleValidator.current.fields["sekolah lainnya"] = true;
		}

		if (simpleValidator.current.allValid()) {
			let data = {};
			if (
				statusPekerjaan === "Tidak Bekerja" ||
				statusPekerjaan.label === "Tidak Bekerja"
			) {
				data = {
					status_pekerjaan: statusPekerjaan.label || statusPekerjaan,
					pekerjaan: "-",
					perusahaan: "-",
					penghasilan: "1",
					sekolah: "-",
					tahun_masuk: parseInt(0),
				};
			} else if (
				statusPekerjaan === "Bekerja" ||
				statusPekerjaan.label === "Bekerja"
			) {
				data = {
					status_pekerjaan: statusPekerjaan.label || statusPekerjaan,
					pekerjaan: pekerjaanNama,
					perusahaan,
					penghasilan: penghasilan.split(".").join(""),
					sekolah: "-",
					tahun_masuk: 0,
				};
			} else if (
				statusPekerjaan === "Pelajar/Mahasiswa" ||
				statusPekerjaan.label === "Pelajar/Mahasiswa"
			) {
				if (sekolah.includes("Lainnya") && sekolahLainnya) {
					data = {
						status_pekerjaan: statusPekerjaan.label || statusPekerjaan,
						pekerjaan: "-",
						perusahaan: "-",
						penghasilan: "1",
						sekolah: sekolahLainnya,
						tahun_masuk: parseInt(tahunMasuk),
					};
				} else {
					data = {
						status_pekerjaan: statusPekerjaan.label || statusPekerjaan,
						pekerjaan: "-",
						perusahaan: "-",
						penghasilan: "1",
						sekolah,
						tahun_masuk: parseInt(tahunMasuk),
					};
				}
			}
			window.scrollTo(0, 0);
			dispatch(updateProfilePekerjaan(data, token));
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

	let separator = "";

	function formatRupiah(angka, prefix) {
		var number_string = angka.replace(/[^,\d]/g, "").toString(),
			split = number_string.split(","),
			sisa = split[0].length % 3,
			rupiah = split[0].substr(0, sisa),
			ribuan = split[0].substr(sisa).match(/\d{3}/gi);

		if (ribuan) {
			separator = sisa ? "." : "";
			rupiah += separator + ribuan.join(".");
		}

		rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
		return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
	}
	const [year, setYear] = useState();

	useEffect(() => {
		const today = new Date();
		setYear(today.getFullYear());
		dispatch(getDataRefPekerjaan(token));
	}, []);

	useEffect(() => {
		if (tahunMasuk > year) {
			setTahunMasuk(year);
		}
	}, [tahunMasuk, year]);

	const [lainnya, setLainnya] = useState(false);
	const [sekolahLainnya, setSekolahLainnya] = useState("");

	useEffect(() => {
		if (sekolah.includes("Lainnya")) {
			setLainnya(true);
		} else {
			setSekolahLainnya("");
			setLainnya(false);
		}
	}, [sekolah]);

	const [optionsAsalSekolah, setOptionsAsalSekolah] = useState([]);
	const [inputSekolah, setInputSekolah] = useState("");

	useEffect(() => {
		setOptionsAsalSekolah((prev) => {
			let arr = [];
			arr.push({ value: "", label: "Nama Institusi Lainnya.." });
			dataAsalSekolah.map((item) => {
				arr.push({ label: item.label, value: item.id });
			});
			return arr;
		});
	}, [dataAsalSekolah]);

	useEffect(() => {
		console.log(inputSekolah);
		if (inputSekolah.length > 3) {
			setTimeout(() => {
				dispatch(getDataAsalSekolah(token, inputSekolah));
			}, 1000);
		}
	}, [inputSekolah]);

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<div className="informasi-pribadi">
					<h3 className="font-weight-bolder mb-5">Pekerjaan</h3>
					<Form.Group className="mb-3" controlId="formGridAddress1">
						<Form.Label>Status Pekerjaan</Form.Label>
						<Select
							placeholder={
								(pekerjaan && pekerjaan.status_pekerjaan) ||
								"Silahkan Pilih Status Pekerjaan"
							}
							options={optionsStatusPekerjaan}
							onChange={(e) =>
								setStatusPekerjaan({ label: e.label, value: e.value })
							}
							onBlur={() =>
								simpleValidator.current.showMessageFor("status pekerjaan")
							}
							// eslint-disable-next-line react/jsx-no-duplicate-props
							placeholder={`${
								pekerjaan && pekerjaan.status_pekerjaan
									? pekerjaan.status_pekerjaan
									: "Silahkan Pilih Status Pekerjaan"
							}`}
						/>
						{simpleValidator.current.message(
							"status pekerjaan",
							statusPekerjaan,
							"required",
							{
								className: "text-danger",
							}
						)}
					</Form.Group>
				</div>
				{statusPekerjaan !== "-" &&
					statusPekerjaan.label === "Tidak Bekerja" && <div className=""></div>}
				{statusPekerjaan !== "-" && statusPekerjaan.label === "Bekerja" && (
					<div className="kontak-darurat mt-6">
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3" controlId="formGridAddress1">
									<Form.Label>Pekerjaan</Form.Label>
									<div className="position-relative">
										<Select
											placeholder={
												pekerjaanNama || "Silahkan Masukkan Pekerjaan"
											}
											options={optionsDataRefPekerjaan}
											selectedValue={pekerjaanNama}
											onChange={(e) => setPekerjaan(e.label)}
											onBlur={() =>
												simpleValidator.current.showMessageFor("pekerjaan")
											}
										/>
									</div>
									{simpleValidator.current.message(
										"pekerjaan",
										pekerjaanNama,
										statusPekerjaan === "Bekerja" ||
											statusPekerjaan.label === "Bekerja"
											? "required"
											: "",
										{
											className: "text-danger",
										}
									)}
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3" controlId="formGridAddress1">
									<Form.Label>Perusahaan / Institut Tempat Bekerja</Form.Label>
									<Form.Control
										placeholder="Silahkan Masukkan Perusahaan"
										value={perusahaan}
										onChange={(e) => setPerusahaan(e.target.value)}
										onBlur={() =>
											simpleValidator.current.showMessageFor("perusahaan")
										}
									/>
									{simpleValidator.current.message(
										"perusahaan",
										perusahaan,
										statusPekerjaan === "Bekerja" ||
											statusPekerjaan.label === "Bekerja"
											? "required"
											: "",
										{
											className: "text-danger",
										}
									)}
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className="mb-3" controlId="formGridAddress1">
							<Form.Label>Penghasilan</Form.Label>
							<Form.Control
								placeholder="Silahkan Masukkan Penghasilan"
								value={formatRupiah(penghasilan)}
								onChange={(e) => {
									setPenghasilan(formatRupiah(e.target.value));
								}}
								onBlur={() =>
									simpleValidator.current.showMessageFor("penghasilan")
								}
							/>
							{simpleValidator.current.message(
								"penghasilan",
								penghasilan,
								statusPekerjaan === "Bekerja" ||
									statusPekerjaan.label === "Bekerja"
									? "required"
									: "",
								{
									className: "text-danger",
								}
							)}
						</Form.Group>
					</div>
				)}

				{statusPekerjaan !== "-" &&
					statusPekerjaan.label === "Pelajar/Mahasiswa" && (
						<div className="unggah-berkas-pribadi mt-6">
							<Row>
								<Col md={6}>
									<Form.Group className="mb-3" controlId="formGridAddress1">
										<Form.Label>Sekolah / Perguruan Tinggi</Form.Label>
										<Select
											// list="data"
											placeholder={"Pilih Sekolah"}
											options={optionsAsalSekolah}
											// className="form-control"
											onInputChange={(e) => {
												setInputSekolah(e);
											}}
											value={{ label: sekolah }}
											onChange={(e) => {
												setSekolah(e.label);
											}}
										/>
										{/* <datalist id="data">
                      {dataAsalSekolah === undefined
                        ? "kosong"
                        : dataAsalSekolah.map((item, index) => {
                            return <option value={item.label} key={index} />;
                          })}
                    </datalist> */}
										{simpleValidator.current.message(
											"sekolah",
											sekolah,
											statusPekerjaan === "Pelajar/Mahasiswa" ||
												statusPekerjaan.label === "Pelajar/Mahasiswa"
												? "required"
												: "",
											{
												className: "text-danger",
											}
										)}
									</Form.Group>
								</Col>
								{lainnya && (
									<Col md={6}>
										<Form.Group className="mb-3" controlId="formGridAddress1">
											<Form.Label>Nama Institusi Pendidikan</Form.Label>
											<Form.Control
												placeholder="Silahkan Masukkan Nama Institusi"
												onChange={(e) => {
													setSekolahLainnya(e.target.value);
												}}
												onBlur={() =>
													simpleValidator.current.showMessageFor("tahun masuk")
												}
												type="text"
											/>
											{simpleValidator.current.message(
												"sekolah lainnya",
												sekolahLainnya,
												statusPekerjaan === "Pelajar/Mahasiswa" ||
													statusPekerjaan.label === "Pelajar/Mahasiswa"
													? "required"
													: "",
												{
													className: "text-danger",
												}
											)}
										</Form.Group>
									</Col>
								)}
								<Col md={6}>
									<Form.Group className="mb-3" controlId="formGridAddress1">
										<Form.Label>Tahun Masuk</Form.Label>
										<Form.Control
											placeholder="Silahkan Masukkan Tahun Masuk"
											value={tahunMasuk}
											minLength={4}
											maxLength={4}
											onChange={(e) => {
												if (
													e.target.value === "" ||
													helperRegexNumber.test(e.target.value)
												) {
													helperRemoveZeroFromIndex0(
														e.target.value,
														setTahunMasuk
													);
												}
											}}
											onBlur={() =>
												simpleValidator.current.showMessageFor("tahun masuk")
											}
											type="text"
										/>
										{simpleValidator.current.message(
											"tahun masuk",
											tahunMasuk,
											statusPekerjaan === "Pelajar/Mahasiswa" ||
												statusPekerjaan.label === "Pelajar/Mahasiswa"
												? "required|integer"
												: "",
											{
												className: "text-danger",
											}
										)}
									</Form.Group>
								</Col>
							</Row>
						</div>
					)}
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
							Simpan
						</Button>
					</div>
				)}
			</Form>
		</>
	);
};

export default PekerjaanEdit;
