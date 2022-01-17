import React, { useState, useEffect } from "react";

import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllTriviaQuestionDetail,
  deleteTriviaQuestionDetail,
  importFileTriviaQuestionDetail,
  importImagesTriviaQuestionDetail,
  clearErrors,
} from "../../../../../redux/actions/subvit/trivia-question-detail.action";
import {
  IMPORT_FILE_TRIVIA_QUESTION_DETAIL_RESET,
  IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_RESET,
  DELETE_TRIVIA_QUESTION_DETAIL_RESET,
} from "../../../../../redux/types/subvit/trivia-question-detail.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import StepInputClone from "/components/StepInputClone";
import LoadingTable from "../../../../LoadingTable";
import ButtonAction from "../../../../ButtonAction";
import styles from "../edit/step.module.css";
import axios from "axios";

const StepTwo = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: loadingData,
    error: errorData,
    success: successData,
    trivia_question_detail,
  } = useSelector((state) => state.allTriviaQuestionDetail);
  const {
    loading: loadingDelete,
    error: errorDelete,
    isDeleted,
  } = useSelector((state) => state.deleteTriviaQuestionDetail);
  const {
    loading: loadingFile,
    error: errorFile,
    success: successFile,
    trivia_question_file,
  } = useSelector((state) => state.importFileTriviaQuestionDetail);
  const {
    loading: loadingImages,
    error: errorImages,
    success: successImages,
    trivia_question_images,
  } = useSelector((state) => state.importImagesTriviaQuestionDetail);
  let { page = 1, id } = router.query;
  page = Number(page);

  let error;
  if (errorFile) {
    error = errorFile;
  } else if (errorImages) {
    error = errorImages;
  } else if (errorData) {
    error = errorData;
  } else if (errorDelete) {
    error = errorDelete;
  }
  let loading = false;
  if (loadingFile) {
    loading = loadingFile;
  } else if (loadingImages) {
    loading = loadingImages;
  } else if (loadingData) {
    loading = loadingData;
  } else if (loadingDelete) {
    loading = loadingData;
  }

  const [question_file, setQuestionFile] = useState(null);
  const [image_file, setImageFile] = useState(null);
  const [typeSave, setTypeSave] = useState("lanjut");
  const [limit, setLimit] = useState(null);
  const [fileSoalName, setFileSoalName] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [successType, setSuccessType] = useState(null);

  useEffect(() => {
    dispatch(
      getAllTriviaQuestionDetail(id, 1, "", null, token, tokenPermission)
    );
    // if (error) {
    //     dispatch(clearErrors())
    // }
    if (successFile) {
      dispatch(
        getAllTriviaQuestionDetail(id, 1, "", null, token, tokenPermission)
      );
      setQuestionFile(null);
      document.getElementById("question_soal").value = null;
    }

    if (successImages) {
      dispatch(
        getAllTriviaQuestionDetail(id, 1, "", null, token, tokenPermission)
      );
      setImageFile(null);
      document.getElementById("question_image").value = null;
    }

    if (isDeleted) {
      dispatch(
        getAllTriviaQuestionDetail(id, 1, "", null, token, tokenPermission)
      );
    }
  }, [
    dispatch,
    id,
    successFile,
    successImages,
    isDeleted,
    token,
    tokenPermission,
  ]);

  const saveDraft = () => {
    let valid = true;

    if (localStorage.getItem("successFile") === null) {
      if (!successImages) {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data gambar dengan benar !",
        });
      }
      if (!successFile) {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data soal dengan benar !",
        });
      }
    }

    if (valid) {
      localStorage.removeItem("method");
      localStorage.removeItem("step1");
      localStorage.removeItem("successFile");
      localStorage.removeItem("successImage");
      dispatch(
        {
          type: IMPORT_FILE_TRIVIA_QUESTION_DETAIL_RESET,
        },
        token
      );
      dispatch(
        {
          type: IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_RESET,
        },
        token
      );
      if (localStorage.getItem("detail-import") !== null) {
        router.push(localStorage.getItem("detail-import"));
        localStorage.removeItem("detail-import");
      } else {
        router.push({
          pathname: `/subvit/trivia`,
          query: { success: true },
        });
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (localStorage.getItem("successFile") === null) {
      if (!successImages) {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data gambar dengan benar !",
        });
      }
      if (!successFile) {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data soal dengan benar !",
        });
      }
    }

    if (valid) {
      localStorage.removeItem("successFile");
      localStorage.removeItem("successImage");
      localStorage.setItem("method", "import" || router.query.metode);
      if (localStorage.getItem("detail-import") !== null) {
        router.push(localStorage.getItem("detail-import"));
        localStorage.removeItem("detail-import");
        localStorage.removeItem("method");
        localStorage.removeItem("step2");
        localStorage.removeItem("clone");
      } else {
        router.push({
          pathname: `/subvit/trivia/tambah/step-3`,
          query: { id },
        });
      }
    }
  };

  const handleImportFile = async () => {
    const data = new FormData();
    data.append("trivia_question_bank_id", id);
    data.append("question_file", question_file, question_file.name);

    Swal.fire({
      title: "Perhatian",
      text: "Jika file anda mempunyai gambar harap import gambar terlebih dahulu, atau kamu tetap ingin melanjutkan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya Lanjut !",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(importFileTriviaQuestionDetail(data, token, tokenPermission));
        setSuccessType("file");
      }
    });
  };

  const handleImportImage = async () => {
    const data = new FormData();
    data.append("trivia_question_bank_id", id);
    data.append("image_file", image_file, image_file.name);

    dispatch(importImagesTriviaQuestionDetail(data, token, tokenPermission));
    setSuccessType("images");
  };

  const handlePagination = (pageNumber) => {
    router.push(`${router.pathname}?id=${id}&page=${pageNumber}`);
    // dispatch(getAllTriviaQuestionDetail(id, pageNumber, "", limit, token));
  };

  const handleLimit = (val) => {
    setLimit(val);
    router.push(`${router.pathname}?id=${id}&page=${1}&limit=${val}`);
    // dispatch(getAllTriviaQuestionDetail(id, 1, "", val, token));
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
        dispatch(deleteTriviaQuestionDetail(id, token, tokenPermission));
      }
    });
  };

  const handleDownloadTemplate = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Permission: tokenPermission || "",
      },
    };
    await axios
      .get(
        process.env.END_POINT_API_SUBVIT +
          "api/trivia-question-bank-details/template",
        config
      )
      .then((res) => {
        window.location.href = res.data.data;
      });
  };

  const handleResetDelete = () => {
    dispatch({
      type: DELETE_TRIVIA_QUESTION_DETAIL_RESET,
    });
  };

  const handleQuestionFile = (e) => {
    setQuestionFile(null);
    dispatch({
      type: IMPORT_FILE_TRIVIA_QUESTION_DETAIL_RESET,
    });
    if (e.target.files[0]) {
      localStorage.setItem("successFile", e.target.files[0].name);
      setQuestionFile(e.target.files[0]);
    }
  };

  const handleImageFile = (e) => {
    setImageFile(null);
    dispatch({
      type: IMPORT_FILE_TRIVIA_QUESTION_DETAIL_RESET,
    });
    if (e.target.files[0]) {
      localStorage.setItem("successImage", e.target.files[0].name);
      setImageFile(e.target.files[0]);
      setSuccessType("images");
    }
  };

  return (
    <PageWrapper>
      {error && (
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
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      )}
      {isDeleted && (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Menghapus Data</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetDelete}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      )}
      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          {localStorage.getItem("clone") === "true" ? (
            <StepInputClone step="3" />
          ) : (
            <StepInput step="2" title="Trivia"></StepInput>
          )}
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Metode Import .csv/.xls</h2>
          </div>
          <div className="card-body">
            <div className="mb-5">
              <p className="mb-1">Unduh Template Soal</p>
              <div className="row">
                <div className="col">
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="btn btn-rounded-full bg-blue-secondary btn-sm text-white"
                  >
                    <i className="ri-download-2-fill text-white"></i> Unduh
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <span style={{ color: "#ffa800" }}>
                  *Jika anda ingin membuat soal yang terdapat gambar silahkan
                  import file gambar terlebih dahulu !
                </span>
              </div>
            </div>
            <form onSubmit={onSubmit} id="form-upload">
              <div className="form-group row pt-3">
                <div className="col-sm-10 col-md-10">
                  <span>File Soal</span>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      accept=".csv,.xlsx,.xls"
                      name="question_soal"
                      id="question_soal"
                      onChange={(event) => handleQuestionFile(event)}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {question_file ||
                      localStorage.getItem("successFile") !== null
                        ? localStorage.getItem("successFile")
                        : "Choose file"}
                    </label>
                  </div>
                  <span className="text-muted">
                    Silahkan File berformat .csv / .xls
                  </span>
                </div>
                <div className="col-md-2 col-sm-2 d-flex align-items-center">
                  {question_file ? (
                    <button
                      type="button"
                      className="btn btn-rounded-full btn-light-success btn-sm py-3"
                      onClick={handleImportFile}
                    >
                      Import File
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-rounded-full btn-light-success btn-sm py-3"
                      onClick={handleImportFile}
                      disabled={!question_file}
                      style={{ cursor: "not-allowed" }}
                    >
                      Import File
                    </button>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-10 col-md-10">
                  <span>File Gambar</span>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      accept=".zip"
                      name="question_image"
                      id="question_image"
                      onChange={(event) => handleImageFile(event)}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {image_file ||
                      localStorage.getItem("successImage") !== null
                        ? localStorage.getItem("successImage")
                        : "Choose file"}
                    </label>
                  </div>
                  <span className="text-muted">
                    Silahkan File berformat .zip
                  </span>
                </div>
                <div className="col-md-2 col-sm-2 d-flex align-items-center">
                  {image_file ? (
                    <button
                      type="button"
                      className="btn btn-rounded-full btn-light-success btn-sm py-3"
                      onClick={handleImportImage}
                    >
                      Import File
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-rounded-full btn-light-success btn-sm py-3"
                      onClick={handleImportFile}
                      disabled={!image_file}
                      style={{ cursor: "not-allowed" }}
                    >
                      Import File
                    </button>
                  )}
                </div>
              </div>

              <div className="table-page" style={{ marginTop: "20px" }}>
                {successFile && successType === "file" && (
                  <div className="mb-5">
                    <h2 className="text-success">Sukses Import Soal</h2>
                    <span className="text-muted">
                      {trivia_question_file.success +
                        trivia_question_file.failed}{" "}
                      Total Import | {trivia_question_file.success} Sukses di
                      Import | {trivia_question_file.failed} Gagal di import
                    </span>
                  </div>
                )}
                {successImages && successType === "images" && (
                  <div className="mb-5">
                    <h2 className="text-success">Sukses Import Gambar</h2>
                    <span className="text-muted">
                      {trivia_question_images.success +
                        trivia_question_images.failed}{" "}
                      Total Import | {trivia_question_images.success} Sukses di
                      Import | {trivia_question_images.failed} Gagal di import
                    </span>
                  </div>
                )}
                <div className="table-responsive">
                  <LoadingTable loading={loading} />

                  {loading === false ? (
                    <table className="table table-separate table-head-custom table-checkable">
                      <thead
                        style={{
                          background: "#F3F6F9",
                        }}
                      >
                        <tr>
                          <th className="text-center">No</th>
                          <th>ID Soal</th>
                          <th>Soal</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trivia_question_detail &&
                        trivia_question_detail.list_questions &&
                        trivia_question_detail.list_questions.length === 0 ? (
                          <td className="align-middle text-center" colSpan={6}>
                            Data Tidak Ditemukan
                          </td>
                        ) : (
                          trivia_question_detail &&
                          trivia_question_detail.list_questions &&
                          trivia_question_detail.list_questions.map(
                            (question, i) => {
                              const paginate = i + 1 * (page * limit);
                              const dividers = limit - 1;
                              return (
                                <tr key={question.id}>
                                  <td className="align-middle text-center">
                                    <span className="">
                                      {paginate - dividers}
                                    </span>
                                  </td>
                                  <td className="align-middle font-weight-bold">
                                    CC
                                    {question.id}
                                  </td>
                                  <td className="align-middle">
                                    {question.question}
                                  </td>
                                  <td className="align-middle">
                                    {question.status ? (
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
                                    <div className="d-flex">
                                      <Link
                                        href={`/subvit/trivia/edit-soal-trivia?id=${question.id}`}
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
                                      <button
                                        className="btn btn-link-action bg-blue-secondary text-white"
                                        onClick={() =>
                                          handleDelete(question.id)
                                        }
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Hapus"
                                      >
                                        <i className="ri-delete-bin-fill p-0 text-white"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            }
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                </div>

                {trivia_question_detail &&
                trivia_question_detail.list_questions &&
                trivia_question_detail.list_questions.length > 0 ? (
                  <div className="row">
                    <div className="table-pagination">
                      {trivia_question_detail && (
                        <Pagination
                          activePage={page}
                          itemsCountPerPage={trivia_question_detail.perPage}
                          totalItemsCount={trivia_question_detail.total}
                          pageRangeDisplayed={3}
                          onChange={handlePagination}
                          nextPageText={">"}
                          prevPageText={"<"}
                          firstPageText={"<<"}
                          lastPageText={">>"}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      )}
                    </div>

                    <div className="table-total ml-auto">
                      {trivia_question_detail &&
                        trivia_question_detail.list_questions && (
                          <div className="row">
                            <div className="col-4 mr-0 p-0">
                              <select
                                value={limit}
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
                              >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                              </select>
                            </div>
                            <div className="col-8 my-auto">
                              <p
                                className="align-middle mt-3"
                                style={{
                                  color: "#B5B5C3",
                                }}
                              >
                                Total Data {trivia_question_detail.total}
                              </p>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-12 pt-4">
                  {(localStorage.getItem("detail-import") !== null ||
                    localStorage.getItem("clone") !== null) && (
                    <button
                      className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                      type="button"
                      onClick={() => {
                        if (localStorage.getItem("clone") === "true") {
                          router.push(
                            `/subvit/trivia/clone/step-3?id=${router.query.id}`
                          );
                        } else {
                          if (localStorage.getItem("detail-import") !== null) {
                            router.push(localStorage.getItem("detail-import"));
                            localStorage.removeItem("detail-import");
                          } else {
                            router.push("/subvit/trivia/tambah");
                          }
                        }
                      }}
                    >
                      Kembali
                    </button>
                  )}
                  <div className="float-right">
                    <button
                      className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                      type="submit"
                    >
                      Simpan & Lanjut
                    </button>
                    <button
                      className="btn btn-primary-rounded-full text-white"
                      onClick={saveDraft}
                      type="button"
                    >
                      Simpan Draft
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepTwo;
