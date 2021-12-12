import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import styles from "../../../../styles/subvit.module.css";
import stylesPag from "../../../../styles/pagination.module.css";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteSurveyQuestionBanks,
  clearErrors,
  getAllSurveyQuestionBanks,
} from "../../../../redux/actions/subvit/survey-question.actions";
import { DELETE_SURVEY_QUESTION_BANKS_RESET } from "../../../../redux/types/subvit/survey-question.type";

const ListSurvey = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, survey } = useSelector(
    (state) => state.allSurveyQuestionBanks
  );

  const { data: dataPermission } = useSelector(
    (state) => state.permissionsSubvit
  );

  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deleteSurveyQuestionBanks);

  let { page = 1, success } = router.query;
  page = Number(page);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  useEffect(() => {
    if (isDeleted) {
      dispatch({
        type: DELETE_SURVEY_QUESTION_BANKS_RESET,
      });
      dispatch(getAllSurveyQuestionBanks(page, "", limit, token));
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success");
    }
  }, [isDeleted, dispatch, page, limit, token]);

  const handlePagination = (pageNumber) => {
    if (limit != null) {
      router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`);
    } else if (search != "" && limit != null) {
      router.push(
        `${router.pathname}?page=${pageNumber}&limit=${limit}&keyword=${search}`
      );
    } else if (search != "") {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}`);
    } else {
      router.push(`${router.pathname}?page=${pageNumber}`);
    }
  };

  const handleSearch = () => {
    if (limit != null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`);
    } else {
      router.push(`${router.pathname}?page=1&keyword=${search}`);
    }
  };

  const handleLimit = (val) => {
    setLimit(val);
    if (search) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${val}`);
    } else {
      router.push(`${router.pathname}?page=1&limit=${val}`);
    }
  };

  const handleDelete = (id) => {
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
        dispatch(deleteSurveyQuestionBanks(id, token));
      }
    });
  };

  const onNewReset = () => {
    router.replace("/subvit/survey", undefined, { shallow: true });
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const getStartAt = (date) => {
    if (!date) {
      return "-";
    }
    const startAt = new Date(date);
    var tahun = startAt.getFullYear();
    var bulan = startAt.getMonth();
    var tanggal = startAt.getDate();

    switch (bulan) {
      case 0:
        bulan = "Januari";
        break;
      case 1:
        bulan = "Februari";
        break;
      case 2:
        bulan = "Maret";
        break;
      case 3:
        bulan = "April";
        break;
      case 4:
        bulan = "Mei";
        break;
      case 5:
        bulan = "Juni";
        break;
      case 6:
        bulan = "Juli";
        break;
      case 7:
        bulan = "Agustus";
        break;
      case 8:
        bulan = "September";
        break;
      case 9:
        bulan = "Oktober";
        break;
      case 10:
        bulan = "November";
        break;
      case 11:
        bulan = "Desember";
        break;
    }

    return `${tanggal} ${bulan} ${tahun}`;
  };

  const isFinish = (date) => {
    if (!date) {
      return "Belum Dilaksanakan";
    }
    const endAt = new Date(date);
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    if (endAt > today) {
      return "Belum Selesai";
    } else {
      return "Selesai";
    }
  };

  return (
    <PageWrapper>
      {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetError}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {success ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Menyimpan Data</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={onNewReset}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header row border-0 mt-3">
            {/* <h1 className="card-title text-dark mt-2" style={{ fontSize: "24px" }}> */}
            <h1
              className={`${styles.headTitle} col-sm-12 col-md-8 col-lg-8 col-xl-9`}
            >
              List Survey
            </h1>
            {dataPermission &&
              dataPermission.permissions.includes(
                "subvit.manage" && "subvit.survey.manage"
              ) && (
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3 card-toolbar">
                  <Link href="/subvit/survey/tambah">
                    {/* <a className="text-white btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2 mr-2"> */}
                    <a
                      className={`${styles.btnTambah} btn btn-primary-rounded-full px-6 font-weight-bolder btn-block`}
                    >
                      <i className="ri-add-fill"></i>
                      Tambah Survey
                    </a>
                  </Link>
                </div>
              )}
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6">
                  <div
                    className="position-relative overflow-hidden mt-3"
                    style={{ maxWidth: "330px" }}
                  >
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="text"
                      className="form-control pl-10"
                      placeholder="Ketik disini untuk Pencarian..."
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="btn bg-blue-primary text-white right-center-absolute"
                      style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                      onClick={handleSearch}
                    >
                      Cari
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <LoadingTable loading={loading} />

                {loading === false ? (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center">No</th>
                        <th>Pelatihan</th>
                        <th>Pelaksanaan</th>
                        <th>Bank Soal</th>
                        <th>Status</th>
                        {dataPermission &&
                        dataPermission.roles.includes("Super Admin") &&
                        dataPermission &&
                        dataPermission.permissions.includes(
                          "subvit.manage" && "subvit.survey.manage"
                        ) ? (
                          <th style={{ width: "10px" }}>Aksi</th>
                        ) : dataPermission &&
                          dataPermission.permissions.includes(
                            "subvit.view" && "subvit.survey.view"
                          ) ? (
                          <th style={{ width: "10px" }}>Aksi</th>
                        ) : (
                          ""
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {!survey ||
                      (survey && survey.list_survey.length === 0) ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Kosong
                        </td>
                      ) : (
                        survey &&
                        survey.list_survey.map((row, i) => {
                          const paginate = i + 1 * (page * limit);
                          const dividers = limit - 1;
                          return (
                            <tr key={row.id}>
                              <td className="align-middle text-center">
                                {/* <span className="">{paginate - dividers}</span> */}
                                {limit === null ? (
                                  <span>{i + 1 * (page * 5) - (5 - 1)}</span>
                                ) : (
                                  <span>
                                    {i + 1 * (page * limit) - (limit - 1)}
                                  </span>
                                )}
                              </td>
                              <td className="align-middle">
                                <b>
                                  {row.academy === null
                                    ? "-"
                                    : row.academy.name}
                                </b>
                                <p>
                                  {row.training !== null
                                    ? row.training.name
                                    : "-"}
                                </p>
                              </td>
                              <td className="align-middle">
                                <b>{getStartAt(row.start_at)}</b>
                                <p>{isFinish(row.end_at)}</p>
                              </td>
                              <td className="align-middle">
                                {row.bank_soal} Soal
                              </td>
                              <td className="align-middle">
                                {row.status === 1 ? (
                                  <span className="label label-inline label-light-success font-weight-bold">
                                    Publish
                                  </span>
                                ) : (
                                  <span className="label label-inline label-light-warning font-weight-bold">
                                    Draft
                                  </span>
                                )}
                              </td>
                              <td className="align-middle">
                                {dataPermission &&
                                dataPermission.permissions.includes(
                                  "subvit.manage" && "subvit.survey.manage"
                                ) ? (
                                  <div className="d-flex">
                                    <Link
                                      href={`/subvit/survey/edit?id=${row.id}`}
                                    >
                                      <a
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Edit"
                                      >
                                        <i className="ri-pencil-fill p-0 text-white"></i>
                                      </a>
                                    </Link>
                                    <Link href={`/subvit/survey/${row.id}`}>
                                      <a
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Detail"
                                      >
                                        <i className="ri-eye-fill p-0 text-white"></i>
                                      </a>
                                    </Link>
                                    <Link
                                      href={`/subvit/survey/report?id=${row.id}`}
                                    >
                                      <a
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Report"
                                      >
                                        <i className="ri-todo-fill p-0 text-white"></i>
                                      </a>
                                    </Link>
                                    <button
                                      className="btn btn-link-action bg-blue-secondary text-white"
                                      onClick={() => handleDelete(row.id)}
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Hapus"
                                    >
                                      <i className="ri-delete-bin-fill p-0 text-white"></i>
                                    </button>
                                  </div>
                                ) : dataPermission &&
                                  dataPermission.permissions.includes(
                                    "subvit.view" && "subvit.survey.view"
                                  ) ? (
                                  <Link href={`/subvit/survey/${row.id}`}>
                                    <a
                                      className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Detail"
                                    >
                                      <i className="ri-eye-fill p-0 text-white"></i>
                                    </a>
                                  </Link>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                {survey && survey.perPage < survey.total && (
                  <>
                    {/* KONDISI KETIKA FOLD */}
                    <div
                      className={`${stylesPag.paginationFold} table-pagination pagination-custom col-12 col-md-6`}
                    >
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={survey?.perPage}
                        totalItemsCount={survey?.total}
                        pageRangeDisplayed={2}
                        onChange={handlePagination}
                        nextPageText={">"}
                        prevPageText={"<"}
                        firstPageText={"<<"}
                        lastPageText={">>"}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                    <div
                      className={`${stylesPag.pagination} table-pagination pagination-custom col-12 col-md-6`}
                    >
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={survey?.perPage}
                        totalItemsCount={survey?.total}
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
                  </>
                )}
                {survey && survey.total > 5 ? (
                  <div className={`${stylesPag.rightPag} table-total ml-auto`}>
                    <div className="row">
                      <div className="col-4 mr-0">
                        <select
                          value={limit}
                          className="form-control"
                          id="exampleFormControlSelect2"
                          style={{
                            width: "70px",
                            background: "#F3F6F9",
                            borderColor: "#F3F6F9",
                            color: "#9E9E9E",
                          }}
                          onChange={(e) => handleLimit(e.target.value)}
                          onBlur={(e) => handleLimit(e.target.value)}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="30">30</option>
                          <option value="40">40</option>
                          <option value="50">50</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {survey && survey.total} List Data
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ListSurvey;
