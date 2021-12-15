import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingTable from "../../../LoadingTable";
import styles from "./listSubstansi.module.css";
import stylesPag from "../../../../styles/pagination.module.css";
import Image from "next/dist/client/image";

import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteSubtanceQuestionBanks,
  getAllSubtanceQuestionBanks,
} from "../../../../redux/actions/subvit/subtance.actions";
import { DELETE_SUBTANCE_QUESTION_BANKS_RESET } from "../../../../redux/types/subvit/subtance.type";
import { Card, Col, Modal, Row } from "react-bootstrap";
import { getAllSubtanceQuestionDetail } from "../../../../redux/actions/subvit/subtance-question-detail.action";

const ListSubstansi = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, subtance } = useSelector(
    (state) => state.allSubtanceQuestionBanks
  );

  const { data: dataPermission } = useSelector(
    (state) => state.permissionsSubvit
  );

  const {
    loading: loadingDelete,
    error: errorDelete,
    isDeleted,
  } = useSelector((state) => state.deleteSubtanceQuestionBanks);

  let { page = 1, success } = router.query;
  page = Number(page);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [viewSoal, setViewSoal] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (isDeleted) {
      dispatch({
        type: DELETE_SUBTANCE_QUESTION_BANKS_RESET,
      });
      dispatch(getAllSubtanceQuestionBanks(1, "", limit, token));
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success");
    }
  }, [dispatch, isDeleted, limit, token]);

  const handlePagination = (pageNumber) => {
    let link = `${router.pathname}?page=${pageNumber}`;
    if (limit) link = link.concat(`&limit=${limit}`);
    if (search) link = link.concat(`&keyword=${search}`);
    router.push(link);
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

  const onNewReset = () => {
    router.replace("/subvit/substansi", undefined, { shallow: true });
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
        dispatch(deleteSubtanceQuestionBanks(id, token));
      }
    });
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleModal = (id) => {
    dispatch(
      getAllSubtanceQuestionDetail(
        id,
        1,
        null,
        100,
        "",
        "",
        "",
        token,
        tokenPermission
      )
    );
    setViewSoal(true);
  };

  const { subtance_question_detail } = useSelector(
    (state) => state.allSubtanceQuestionDetail
  );

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
          <div className={`${styles.top} card-header border-0 mt-3`}>
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              List Test Substansi
            </h1>

            {dataPermission &&
            dataPermission.permissions.includes(
              "subvit.manage" && "subvit.substansi.manage"
            ) ? (
              <div className={`${styles.cardToolbar} card-toolbar`}>
                <Link href="/subvit/substansi/tipe-soal">
                  <a className="text-white btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2 mr-2">
                    <i className="ri-book-read-fill"></i>
                    Tipe Soal
                  </a>
                </Link>
                <Link href="/subvit/substansi/clone">
                  <a className="btn text-white btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2 mr-2">
                    <i className="ri-mastercard-fill"></i>
                    Clone Test
                  </a>
                </Link>
                <Link href="/subvit/substansi/tambah-step-1">
                  <a
                    className={`${styles.btnAdd} btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2`}
                  >
                    <i className="ri-add-fill"></i>
                    Tambah Test Subtansi
                  </a>
                </Link>
              </div>
            ) : dataPermission &&
              dataPermission.permissions.includes(
                "subvit.view" && "subvit.substansi.view"
              ) ? (
              <Link href="/subvit/substansi/tipe-soal">
                <a
                  className="text-white btn btn-primary-rounded-full  font-weight-bolder  mt-4 py-3 px-4"
                  style={{ height: "40px" }}
                >
                  <i className="ri-book-read-fill"></i>
                  Tipe Soal
                </a>
              </Link>
            ) : (
              ""
            )}
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-6">
                  <div
                    className={`${styles.baseSearch} position-relative overflow-hidden mt-3`}
                  >
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                      type="text"
                      className={`${styles.inputSearch} form-control pl-10`}
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

                <div className="col-lg-2 col-xl-2 justify-content-end d-flex"></div>
                <div className="col-lg-2 col-xl-2 justify-content-end d-flex"></div>
                <div className="col-lg-2 col-xl-2 justify-content-end d-flex"></div>
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
                        <th>Pelaksaan</th>
                        <th>Bank Soal</th>
                        <th>Kategori</th>
                        <th>Status</th>

                        {dataPermission &&
                        dataPermission.permissions.includes(
                          "subvit.manage" && "subvit.substansi.manage"
                        ) ? (
                          <th>Aksi</th>
                        ) : dataPermission &&
                          dataPermission.permissions.includes(
                            "subvit.view" && "subvit.substansi.view"
                          ) ? (
                          <th>Aksi</th>
                        ) : (
                          ""
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {!subtance ||
                      (subtance && subtance.list_substance.length === 0) ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Kosong
                        </td>
                      ) : (
                        subtance &&
                        subtance.list_substance &&
                        subtance.list_substance.map((subtance, i) => {
                          const paginate = i + 1 * (page * limit);
                          const dividers = limit - 1;
                          return (
                            <tr key={subtance.id}>
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
                                  {subtance.academy
                                    ? subtance.academy.name
                                    : "-"}
                                </b>
                                <p>
                                  {subtance.training
                                    ? subtance.training.name
                                    : "-"}
                                </p>
                              </td>
                              <td className="align-middle">
                                <b>
                                  {getStartAt(
                                    subtance ? subtance.start_at : "-"
                                  )}
                                </b>
                                <p>
                                  {isFinish(subtance ? subtance.end_at : "-")}
                                </p>
                              </td>
                              <td className="align-middle">
                                {subtance ? subtance.bank_soal : "-"} Soal
                              </td>
                              <td className="align-middle">
                                {subtance ? subtance.category : "-"}
                              </td>
                              <td className="align-middle">
                                {subtance.status ? (
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
                                  "subvit.manage" && "subvit.substansi.manage"
                                ) ? (
                                  <div className="d-flex">
                                    <Link
                                      href={`/subvit/substansi/edit?id=${subtance.id}`}
                                    >
                                      <a
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Ubah"
                                      >
                                        <i className="ri-pencil-fill p-0 text-white"></i>
                                      </a>
                                    </Link>
                                    <Link
                                      href={`/subvit/substansi/${subtance.id}`}
                                    >
                                      <a
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Detail"
                                      >
                                        <i className="ri-eye-fill p-0 text-white"></i>
                                      </a>
                                    </Link>
                                    {subtance?.bank_soal !== 0 && (
                                      <a
                                        onClick={() =>
                                          handleModal(subtance?.id)
                                        }
                                        className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Review Soal"
                                      >
                                        <i className="ri-file-text-fill p-0 text-white"></i>
                                      </a>
                                    )}

                                    <Link
                                      href={`/subvit/substansi/report?id=${subtance.id}`}
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
                                      onClick={() => handleDelete(subtance.id)}
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                      title="Hapus"
                                    >
                                      <i className="ri-delete-bin-fill p-0 text-white"></i>
                                    </button>
                                  </div>
                                ) : dataPermission &&
                                  dataPermission.permissions.includes(
                                    "subvit.view" && "subvit.substansi.view"
                                  ) ? (
                                  <Link
                                    href={`/subvit/substansi/${subtance.id}`}
                                  >
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

              <div className={`${styles.rowPagination} row`}>
                {subtance && subtance.perPage < subtance.total && (
                  // <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                  <>
                    {/* KONDISI KETIKA FOLD */}
                    <div
                      className={`${stylesPag.paginationFold} table-pagination pagination-custom col-12 col-md-6`}
                    >
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={subtance.perPage}
                        totalItemsCount={subtance.total}
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
                        itemsCountPerPage={subtance.perPage}
                        totalItemsCount={subtance.total}
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
                {subtance && subtance.total > 5 ? (
                  <div
                    className={`${stylesPag.rightPag} table-total ml-auto mt-3`}
                  >
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
                          className={`${stylesPag.textTotal} align-middle mt-3`}
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {subtance.total} List Data
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

      <Modal
        show={viewSoal}
        onHide={() => setViewSoal(false)}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>Review Soal</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setViewSoal(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "scroll", height: "500px" }}>
          <Row>
            <Col ms={12}>
              {subtance_question_detail?.list_questions && (
                <>
                  {subtance_question_detail?.list_questions?.map(
                    (item, index) => {
                      return (
                        <>
                          <Card
                            style={{
                              padding: "15px",
                              marginBottom: "10px",
                            }}
                          >
                            <h4>Soal {index + 1}</h4>
                            <Card
                              style={{
                                marginTop: "10px",

                                padding: "15px",
                              }}
                            >
                              <div className="d-flex flex-row">
                                <div className="mr-3">
                                  {item.question_image ? (
                                    <Image
                                      src={
                                        process.env.END_POINT_API_IMAGE_SUBVIT +
                                        item.question_image
                                      }
                                      alt=""
                                      width={70}
                                      height={70}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div>
                                  {" "}
                                  <h5>{item.question}</h5>
                                </div>
                              </div>

                              {JSON.parse(item?.answer).map((anw) => {
                                console.log(anw);
                                return (
                                  <>
                                    <div className="d-flex flex-row ">
                                      <div className="mt-6">
                                        {anw.image !== "" ? (
                                          <Image
                                            src={
                                              process.env
                                                .END_POINT_API_IMAGE_SUBVIT +
                                              anw.image
                                            }
                                            alt=""
                                            width={40}
                                            height={40}
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div style={{ width: "100%" }}>
                                        <Card
                                          onClick={() => setOpen(true)}
                                          style={{
                                            padding: "5px",
                                            marginTop: "15px",
                                            margin: "10px",
                                          }}
                                          className={
                                            anw.key === item.answer_key
                                              ? styles.answer
                                              : ""
                                          }
                                        >
                                          <p
                                            style={{
                                              padding: "5px",
                                              marginTop: "5px",
                                            }}
                                          >
                                            {anw.key} . {anw.option}
                                          </p>
                                        </Card>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </Card>
                          </Card>
                        </>
                      );
                    }
                  )}
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
            type="button"
            onClick={() => setViewSoal(false)}
          >
            Kembali
          </button>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default ListSubstansi;
