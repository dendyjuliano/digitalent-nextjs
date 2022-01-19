import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Badge, Modal, Select } from "react-bootstrap";
import Pagination from "react-js-pagination";
import PaginationPeserta from "../../../components/global/PaginationPeserta";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

import CardPill from "../../../components/global/CardPill";
import CardPage from "../../../components/global/CardPage";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";

import moment from "moment";
import Cookies from 'js-cookie'
import PulseLoaderRender from "../../../components/loader/PulseLoader";

import {
	deleteArtikelPeserta,
	getAllArtikelsPeserta,
} from "../../../../redux/actions/publikasi/artikel.actions";

const Dashboard = ({ session, success }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const allArtikelsPeserta = useSelector((state) => state.allArtikelsPeserta);
	const deleteArtikel = useSelector((state) => state.deleteArtikel);
	const cekLulus = useSelector((state) => state.cekLulusPelatihan);

	const [keyword, setKeyword] = useState(null);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [dateRegister, setDateRegister] = useState([null, null]);
	const [dateRegisterStart, dateRegisterEnd] = dateRegister;
	const [showModal, setShowModal] = useState(false);

	const listPeserta =
		allArtikelsPeserta.artikel?.artikel.length > 0 ? (
			allArtikelsPeserta.artikel.artikel.map((item, index) => {
				return (
					<tr key={index}>
						<td className="text-center align-middle">{index + 1}</td>
						<td className="align-middle">
							<Image
								unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
								loader={
									process.env.END_POINT_API_IMAGE_PUBLIKASI +
									"publikasi/images/" +
									item.gambar
								}
								src={
									process.env.END_POINT_API_IMAGE_PUBLIKASI +
									"publikasi/images/" +
									item.gambar
								}
								width="111"
								height="52"
								objectFit="cover"
								alt={"Ini Gambar"}
							/>
						</td>
						<td className="align-middle">{item.kategori_akademi}</td>
						<td
							className="align-middle"
							style={{
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								maxWidth: "11rem",
							}}
						>
							{item.judul}
						</td>
						<td className="align-middle">
							{moment(item.created_at).format("DD MMMM YYYY")}
						</td>
						<td className="align-middle">
							{" "}
							<span
								className={`label label-inline label-light-${item.publish === 1 ? "success" : "danger"
									} font-weight-bold`}
							>
								{item.publish === 1 ? "Publish" : "Unpublish"}
							</span>
						</td>
						<td className="align-middle">
							<div className="d-flex">
								<Link href={`/peserta/artikel/preview/${item.id}`}>
									<a
										className="btn btn-link-action btn-primary text-white mr-2"
										data-toggle="tooltip"
										data-placement="bottom"
										title="Detail"
									>
										<i className="ri-search-eye-fill text-white p-0"></i>
									</a>
								</Link>
								<Link href={`/peserta/artikel/edit/${item.id}`}>
									<a
										className="btn btn-link-action btn-warning text-white mr-2"
										data-toggle="tooltip"
										data-placement="bottom"
										title="Edit"
									>
										<i className="ri-pencil-fill text-white p-0"></i>
									</a>
								</Link>
								<button
									className="btn btn-link-action btn-danger text-white"
									data-toggle="tooltip"
									data-placement="bottom"
									title="Delete"
									onClick={(e) => {
										e.preventDefault();
										Swal.fire({
											title: "Apakah anda yakin ?",
											text: "Data ini tidak bisa dikembalikan !",
											icon: "warning",
											showCancelButton: true,
											confirmButtonColor: "#3085d6",
											cancelButtonColor: "#d33",
											confirmButtonText: "Ya !",
											cancelButtonText: "Batal",
										}).then((result) => {
											if (result.isConfirmed) {
												dispatch(deleteArtikelPeserta(item.id, session.token));
											}
										});
									}}
								>
									<i className="ri-delete-bin-6-fill text-white p-0"></i>
								</button>
							</div>
						</td>
					</tr>
				);
			})
		) : (
			<td className="align-middle text-center" colSpan={8}>
				Data Kosong
			</td>
		);

	useEffect(() => {
		if (deleteArtikel.loading) {
			Swal.fire("Berhasil", "Data berhasil di hapus", "success").then(() => {
				window.location.reload();
			});
		}
	}, [deleteArtikel.loading]);

	let loading = false;

	if (allArtikelsPeserta.loading) {
		loading = allArtikelsPeserta.loading;
	}

	if (deleteArtikel.loading) {
		loading = deleteArtikel.loading;
	}

	const loader = (
		<td className="align-middle text-center" colSpan={8}>
			<PulseLoaderRender />
		</td>
	);

	const handleSearch = () => {
		dispatch(
			getAllArtikelsPeserta(session.token, 1, limit, keyword, null, null, null)
		);
	};

	const handlePagination = (pageNumber) => {
		setPage(pageNumber);
		dispatch(
			getAllArtikelsPeserta(
				session.token,
				pageNumber,
				limit,
				keyword,
				null,
				null,
				null
			)
		);
	};

	return (
		<>
			<PesertaWrapper>
				<Row className="mx-1">
					<CardPill
						background="bg-extras"
						backgroundImg="Selected-file.svg"
						icon="new/open-book.svg"
						color="#FFFFFF"
						value={allArtikelsPeserta.artikel?.total}
						title="Artikel Saya"
						search={() => {
							dispatch(
								getAllArtikelsPeserta(
									session.token,
									1,
									5,
									null,
									null,
									null,
									null
								)
							);
						}}
					/>
					<CardPill
						background="bg-success"
						backgroundImg="File done.svg"
						icon="new/done-circle.svg"
						color="#FFFFFF"
						value={allArtikelsPeserta.artikel?.publish}
						title="Sudah Publish"
						search={() => {
							dispatch(
								getAllArtikelsPeserta(
									session.token,
									1,
									5,
									null,
									"1",
									null,
									null
								)
							);
						}}
					/>
					<CardPill
						background="bg-danger"
						backgroundImg="Deleted-file.svg"
						icon="new/done-circle.svg"
						color="#FFFFFF"
						value={allArtikelsPeserta.artikel?.unpublish}
						title="Belum Publish"
						search={() => {
							dispatch(
								getAllArtikelsPeserta(
									session.token,
									1,
									5,
									null,
									"0",
									null,
									null
								)
							);
						}}
					/>
				</Row>
				<div
					className="mx-3 bg-white mt-4"
					style={{
						borderRadius: "12px",
					}}
				>
					<Row className="">
						<Col md={12} className="mb-4 px-10">
							<div className="mt-10 d-flex">
								<h3>Artikel Saya</h3>
								<Link href="/peserta/artikel/tambah-artikel/" passHref>
									{cekLulus.status === false ? (
										<button
											disabled
											className="btn btn-primary ml-auto rounded-full px-10 py-3 text-center font-weight-bolder"
										>
											<i className="ri-pencil-fill mr-2"></i>Buat Artikel
										</button>
									) : (
										<button className="btn btn-primary ml-auto rounded-full px-10 py-3 text-center font-weight-bolder">
											<i className="ri-pencil-fill mr-2"></i>Buat Artikel
										</button>
									)}
								</Link>
							</div>
						</Col>
					</Row>
					<div className="table-filter">
						<div className="row align-items-center d-flex">
							<div className="col-lg-5 col-xl-5 mb-4 px-10 ">
								<div className="position-relative overflow-hidden mb-2 mt-3">
									<form onSubmit={(e) => {
										e.preventDefault();
										handleSearch
									}}
									>
										<i className="ri-search-line left-center-absolute ml-2"></i>
										<input
											type="text"
											className="form-control pl-10"
											placeholder="Ketik disini untuk Pencarian..."
											value={keyword}
											onChange={(e) => {
												setKeyword(e.target.value);
											}}
										/>
										<button
											className="btn btn-primary text-white right-center-absolute"
											style={{
												borderTopLeftRadius: "0",
												borderBottomLeftRadius: "0",
											}}
											onClick={handleSearch}
										>
											Cari
										</button>
									</form>
								</div>
							</div>

							<div className="col-lg-4 col-xl-4 ml-auto d-flex mt-3 mb-4 px-10">
								<button
									className="btn border d-flex align-items-center justify-content-between mb-2 w-100"
									style={{
										color: "#bdbdbd",
										float: "right",
									}}
									onClick={() => setShowModal(true)}
								>
									<div className="d-flex align-items-center">
										<i className="ri-filter-fill mr-3"></i>
										Pilih Filter
									</div>
									<i className="ri-arrow-down-s-line"></i>
								</button>
							</div>
						</div>
					</div>
					<div className="table-page mt-5 mx-6">
						<div className="table-responsive">
							<table className="table table-separate table-head-custom table-checkable">
								<thead className="w-100" style={{ background: "#F3F6F9" }}>
									<tr>
										<th
											className="text-center font-weight-bolder"
											style={{
												fontSize: "14px",
											}}
										>
											No
										</th>
										<th
											className="font-weight-bolder"
											style={{
												fontSize: "14px",
											}}
										>
											Thumbnail
										</th>
										<th
											className="font-weight-bolder"
											style={{
												fontSize: "14px",
											}}
										>
											Kategori
										</th>
										<th
											className="font-weight-bolder"
											style={{
												fontSize: "14px",
											}}
										>
											Judul
										</th>
										<th
											className="font-weight-bolder"
											style={{
												fontSize: "14px",
											}}
										>
											Tanggal Dibuat
										</th>
										<th
											className="font-weight-bolder"
											style={{
												fontSize: "14px",
											}}
										>
											Status
										</th>
										<th
											className="row-aksi-pelatihan font-weight-bolder"
											style={{
												fontSize: "14px",
											}}
										>
											Aksi
										</th>
									</tr>
								</thead>
								<tbody className="w-100">
									{loading ? loader : listPeserta}
								</tbody>
							</table>
						</div>
						{allArtikelsPeserta?.artikel?.total > 5 && (
							<div className="row">
								<div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
									<Pagination
										activePage={page}
										itemsCountPerPage={allArtikelsPeserta.artikel.perPage}
										totalItemsCount={allArtikelsPeserta.artikel.total}
										pageRangeDisplayed={3}
										onChange={handlePagination}
										nextPageText={">"}
										prevPageText={"<"}
										firstPageText={"<<"}
										lastPageText={">>"}
										itemClass="page-item"
										linkClass="page-link"
									/>
								</div>
								<div className="table-total ml-auto">
									<div className="row">
										<div className="col-4 mr-0 p-0 mt-3">
											<select
												className="form-control"
												id="exampleFormControlSelect2"
												onChange={(e) => {
													setLimit(e.target.value);
													dispatch(
														getAllArtikelsPeserta(
															session.token,
															page,
															e.target.value,
															keyword,
															null,
															null,
															null
														)
													);
												}}
												style={{
													width: "65px",
													background: "#F3F6F9",
													borderColor: "#F3F6F9",
													color: "#9E9E9E",
												}}
												// onChange={(e) => handleLimit(e.target.value)}
												// onBlur={(e) => handleLimit(e.target.value)}
												value={limit}
											>
												<option value="5">5</option>
												<option value="10">10</option>
												<option value="30">30</option>
												<option value="40">40</option>
												<option value="50">50</option>
											</select>
										</div>
										<div className="col-8 my-auto pt-3">
											<p
												className="align-middle mt-3"
												style={{ color: "#B5B5C3" }}
											>
												Total Data {allArtikelsPeserta.artikel.total}
											</p>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					<Modal
						show={showModal}
						onHide={() => setShowModal(false)}
						aria-labelledby="contained-modal-title-vcenter"
						centered
					>
						<Modal.Header>
							<Modal.Title>Filter</Modal.Title>
							<button
								type="button"
								className="close"
								onClick={() => setShowModal(false)}
							>
								<i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
							</button>
						</Modal.Header>
						<Modal.Body>
							<div className="form-group mb-5">
								<label className="p-0">Tanggal di Buat</label>
								<DatePicker
									wrapperClassName="datepicker"
									className="form-control"
									placeholder="Filter Tanggal"
									value={dateRegister}
									name="start_date"
									selectsRange={true}
									onChange={(date) => setDateRegister(date)}
									startDate={dateRegisterStart}
									endDate={dateRegisterEnd}
									dateFormat="dd/MM/yyyy"
									autoComplete="off"
								/>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<button
								className="btn btn-light-ghost-rounded-full mr-2"
								type="button"
								onClick={(e) => {
									setDateRegister([null, null]);
									setShowModal(false);
									dispatch(
										getAllArtikelsPeserta(
											session.token,
											1,
											limit,
											keyword,
											null,
											null
										)
									);
								}}
							>
								Reset
							</button>
							<button
								className="btn btn-primary-rounded-full"
								type="button"
								onClick={() => {
									setPage(1);
									setShowModal(false);
									dispatch(
										getAllArtikelsPeserta(
											session.token,
											1,
											limit,
											keyword,
											null,
											dateRegister[0] !== null
												? moment(dateRegister[0]).format("YYYY-MM-DD")
												: null,
											dateRegister[1] !== null
												? moment(dateRegister[1]).format("YYYY-MM-DD")
												: null
										)
									);
								}}
							>
								Terapkan
							</button>
						</Modal.Footer>
					</Modal>
				</div>
			</PesertaWrapper>
		</>
	);
};

export default Dashboard;
