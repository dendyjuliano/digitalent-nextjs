import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import { Modal } from "react-bootstrap";
import moment from "moment";
import Select from "react-select";
import Cookies from "js-cookie";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";
import { getPendaftaranPeserta } from "../../../../redux/actions/pelatihan/summary.actions";

import { useDispatch, useSelector } from "react-redux";

const DaftarPesertaPelatihan = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token_permission = Cookies.get("token_permission");

  const { error: errorDataAkademi, data: dataPelatihan } = useSelector(
    (state) => state.getAkademiByPelatihan
  );
  const {
    loading,
    error: errorPendaftarPeserta,
    peserta,
  } = useSelector((state) => state.getPendaftaranPeserta);

  let { id } = router.query;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [statusTesSubstansi, setStatusTesSubstansi] = useState(null);
  const [statusBerkas, setStatusBerkas] = useState(null);
  const [statusPeserta, setStatusPeserta] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const optionsPeserta = [
    { value: "menunggu", label: "Menunggu" },
    { value: "tidak lulus administrasi", label: "Tidak Lulus Administrasi" },
    { value: "tes substansi", label: "Tes Substansi" },
    { value: "tidak lulus tes substansi", label: "Tidak Lulus Tes Substansi" },
    { value: "lulus tes substansi", label: "Lulus Tes Substansi" },
    { value: "ditolak", label: "Ditolak" },
    { value: "diterima", label: "Diterima" },
    { value: "pelatihan", label: "Pelatihan" },
    { value: "lulus pelatihan", label: "Lulus Pelatihan" },
    { value: "tidak lulus pelatihan", label: "Tidak Lulus Pelatihan" },
  ];

  const optionsBerkas = [
    { value: "unverified", label: "Unverified" },
    { value: "verified", label: "Verified" },
    { value: "incomplete", label: "Incomplete" },
  ];

  const optionsSubstansi = [
    { value: "belum tersedia", label: "Belum Tersedia" },
    { value: "belum mengerjakan", label: "Belum Mengerjakan" },
    { value: "gagal tes", label: "Gagal Tes" },
    { value: "lulus tes", label: "Lulus Tes" },
  ];

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
    dispatch(
      getPendaftaranPeserta(
        token,
        token_permission,
        id,
        search,
        limit,
        pageNumber
      )
    );
  };

  function capitalize(s) {
    let a = s.split(" ");
    let result = [];
    for (let i = 0; i < a.length; i++) {
      result.push(a[i].charAt(0).toUpperCase() + a[i].slice(1, a[i].length));
    }
    return result.join(" ");
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(
      getPendaftaranPeserta(token, token_permission, id, search, limit, 1)
    );
  };

  const handleLimit = (val) => {
    setLimit(val);
    setPage(1);
    dispatch(
      getPendaftaranPeserta(token, token_permission, id, search, val, 1)
    );
  };

  const handleFilter = () => {
    dispatch(
      getPendaftaranPeserta(
        token,
        token_permission,
        id,
        search,
        limit,
        1,
        statusBerkas === null ? "" : statusBerkas.value,
        statusPeserta === null ? "" : statusPeserta.value,
        statusTesSubstansi === null ? "" : statusTesSubstansi.value
      )
    );
    setShowModal(false);
  };

  const handleExportReport = async () => {};

  const handleSecondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    return hours + ":" + minutes + ":" + seconds;
  };

  const handleReset = () => {
    setStatusPeserta(null);
    setStatusTesSubstansi(null);
    setStatusBerkas(null);
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Daftar Peserta Digitalent
            </h1>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6 col-md-6">
                  <div className="position-relative overflow-hidden mt-3">
                    <form onSubmit={(e) => handleSearch(e)}>
                      <i className="ri-search-line left-center-absolute ml-2"></i>
                      <input
                        type="text"
                        className="form-control pl-10"
                        placeholder="Ketik disini untuk Pencarian..."
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
                    <button
                      className="btn bg-blue-primary text-white right-center-absolute"
                      style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                      onClick={(e) => handleSearch(e)}
                    >
                      Cari
                    </button>
                  </div>
                </div>

                <div className="col-lg-6 col-xl-6 col-md-6 justify-content-end d-flex mt-3">
                  <button
                    className="btn border d-flex align-items-center justify-content-between mt-1 btn-block w-lg-50 w-md-100 w-100"
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

            <div className="table-page mt-5">
              <div className="table-responsive">
                <LoadingTable loading={loading} />
                {loading === false && (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center ">No</th>
                        <th>Peserta</th>
                        <th>Pelatihan Sebelumnya</th>
                        <th>Test Substansi</th>
                        <th>Berkas</th>
                        <th>Status Peserta</th>
                        <th>Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!peserta ||
                      (peserta && peserta.list === null) ||
                      peserta.list.length === 0 ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Kosong
                        </td>
                      ) : (
                        peserta.list.map((row, i) => (
                          <tr key={i}>
                            <td className="text-center">
                              {limit === null
                                ? i + 1 * (page * 5) - (5 - 1)
                                : i + 1 * (page * limit) - (limit - 1)}
                            </td>
                            <td>
                              <p className="font-weight-bolder my-0">
                                {row.name}
                              </p>
                              <p className="my-0">{row.nik}</p>
                            </td>
                            <td>{row.jumlah_pelatihan || "-"}</td>
                            <td>
                              <p
                                className={`my-0 ${
                                  row.subtansi_status === "gagal tes"
                                    ? "text-danger"
                                    : "text-success"
                                } `}
                              >
                                {capitalize(row.subtansi_status) || "-"}
                              </p>
                              <p className="my-0">
                                {Math.round(row.nilai) || "-"}
                              </p>
                              <p className="my-0">
                                {handleSecondsToTime(row.waktu) || "-"}
                              </p>
                            </td>
                            <td>
                              <span
                                className={
                                  (row.administrasi === "unverified" &&
                                    "label label-inline select-pelatihan-warning font-weight-bold text-capitalize") ||
                                  (row.administrasi === "verified" &&
                                    "label label-inline statusPeserta-success font-weight-bold text-capitalize") ||
                                  (row.administrasi === "incomplete" &&
                                    "label label-inline statusPeserta-danger font-weight-bold text-capitalize")
                                }
                              >
                                {capitalize(row.administrasi)}
                              </span>
                            </td>
                            <td>
                              <span
                                className={
                                  (row.status === "tidak lulus administrasi" &&
                                    "label label-inline statusPeserta-danger font-weight-bold text-capitalize") ||
                                  (row.status === "tidak lulus tes substansi" &&
                                    "label label-inline statusPeserta-danger font-weight-bold text-capitalize") ||
                                  (row.status === "tidak lulus pelatihan" &&
                                    "label label-inline statusPeserta-danger font-weight-bold text-capitalize") ||
                                  (row.status === "ditolak" &&
                                    "label label-inline statusPeserta-danger font-weight-bold text-capitalize") ||
                                  (row.status === "seleksi administrasi" &&
                                    "label label-inline select-pelatihan-warning font-weight-bold text-capitalize") ||
                                  (row.status === "tes substansi" &&
                                    "label label-inline select-pelatihan-warning font-weight-bold text-capitalize") ||
                                  (row.status === "seleksi akhir" &&
                                    "label label-inline select-pelatihan-warning font-weight-bold text-capitalize") ||
                                  (row.status === "administrasi akhir" &&
                                    "label label-inline select-pelatihan-warning font-weight-bold text-capitalize") ||
                                  (row.status === "diterima" &&
                                    "label label-inline statusPeserta-success font-weight-bold text-capitalize") ||
                                  (row.status === "lulus pelatihan" &&
                                    "label label-inline statusPeserta-success font-weight-bold text-capitalize")
                                }
                              >
                                {capitalize(row.status)}
                              </span>
                            </td>
                            <td>
                              <p className="font-weight-bolder my-0">
                                {row.update_by}
                              </p>
                              <p className="my-0">
                                {moment(row.update_time).format("DD MMMM YYYY")}
                              </p>
                              <p className="my-0">
                                {moment(row.update_time).format("hh:mm:ss")}
                              </p>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="row">
                {peserta && peserta.perPage < peserta.total && (
                  <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={peserta.perPage}
                      totalItemsCount={peserta.total}
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
                )}
                {peserta && peserta.total > 5 && (
                  <div className="table-total ml-auto">
                    <div className="row">
                      <div className="col-4 mr-0 p-0 mt-3">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect2"
                          style={{
                            width: "65px",
                            background: "#F3F6F9",
                            borderColor: "#F3F6F9",
                            color: "#9E9E9E",
                          }}
                          onChange={(e) => handleLimit(e.target.value)}
                          onBlur={(e) => handleLimit(e.target.value)}
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
                          Total Data {peserta.total}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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
            <label className="p-0">Tes Substansi</label>
            <Select
              placeholder="Silahkan Pilih Tes Substansi"
              options={optionsSubstansi}
              value={statusTesSubstansi}
              onChange={(e) =>
                setStatusTesSubstansi({ label: e.label, value: e.value })
              }
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status Berkas</label>
            <Select
              placeholder="Silahkan Pilih Status Berkas"
              options={optionsBerkas}
              value={statusBerkas}
              onChange={(e) =>
                setStatusBerkas({ label: e.label, value: e.value })
              }
            />
          </div>
          <div className="form-group mb-5">
            <label className="p-0">Status Peserta</label>
            <Select
              placeholder="Silahkan Pilih Status Peserta"
              options={optionsPeserta}
              value={statusPeserta}
              onChange={(e) =>
                setStatusPeserta({ label: e.label, value: e.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light-ghost-rounded-full mr-2"
            type="button"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </button>
          <button
            className="btn btn-primary-rounded-full"
            type="button"
            onClick={() => handleFilter()}
          >
            Terapkan
          </button>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default DaftarPesertaPelatihan;
