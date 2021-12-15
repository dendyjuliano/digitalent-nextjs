import React, { useState, useEffect } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import styles from "../../../../../styles/stepInput.module.css";
import styleBtn from "../../trivia/edit/step.module.css";

import {
  getAllSubtanceQuestionDetail,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance-question-detail.action";
import { deleteCloneSubtanceQuestionBanks } from "../../../../../redux/actions/subvit/subtance.actions";
import { DELETE_SUBTANCE_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/subtance-question-detail.type";
import { DELETE_CLONE_SUBTANCE_QUESTION_BANKS_RESET } from "../../../../../redux/types/subvit/subtance.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInputClone";
import LoadingTable from "../../../../LoadingTable";
import ButtonAction from "../../../../ButtonAction";

const StepTwo = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { page = 1, id } = router.query;
  let error;
  const {
    loading: loadingAll,
    error: errorAll,
    success: successData,
    subtance_question_detail,
  } = useSelector((state) => state.allSubtanceQuestionDetail);
  const {
    loading,
    error: errorDelete,
    isDeleted,
  } = useSelector((state) => state.deleteSubtanceQuestionBanks);
  page = Number(page);

  if (errorAll) {
    error = errorAll;
  } else if (errorDelete) {
    error = errorDelete;
  }
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);
  const [checkedDelete, setCheckedDelete] = useState([]);

  useEffect(() => {
    if (limit) {
      router.push(`${router.pathname}?id=${id}&page=1&limit=${limit}`);
    }
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
      dispatch({
        type: DELETE_CLONE_SUBTANCE_QUESTION_BANKS_RESET,
      });
    }
  }, [limit, isDeleted, dispatch, id, router]);

  const saveDraft = () => {
    router.push({
      pathname: `/subvit/substansi`,
      query: { success: true },
    });
  };
  const saveLanjut = () => {
    router.push({
      pathname: `/subvit/substansi/clone/step-3`,
      query: { id },
    });
  };

  const handleSearch = () => {
    if (limit != null) {
      router.push(
        `${router.pathname}?id=${id}&page=1&keyword=${search}&limit=${limit}`
      );
    } else {
      router.push(`${router.pathname}?id=${id}&page=1&keyword=${search}`);
    }
  };

  const handlePagination = (pageNumber) => {
    router.push(`${router.pathname}?id=${id}&page=${pageNumber}`);
  };

  const handleLimit = (val) => {
    router.push(`${router.pathname}?id=${id}&page=${1}&limit=${val}`);
  };

  const handleCheckboxDelete = (e, items) => {
    if (e.target.checked) {
      let arr = checkedDelete;
      if (checkedDelete.indexOf(items.id) === -1) {
        arr.push(items.id);
      }
      setCheckedDelete(arr);
    } else {
      let arr = checkedDelete;
      const index = checkedDelete.indexOf(items.id);
      if (index > -1) {
        arr.splice(index, 1);
      }
      setCheckedDelete(arr);
    }
    if (checkedDelete.length >= 1) {
      document.getElementById("btn-delete-all").classList.remove("d-none");
    } else {
      document.getElementById("btn-delete-all").classList.add("d-none");
    }
  };

  const handleCheckboxDeleteAll = (e) => {
    if (e.target.checked) {
      let arr = checkedDelete;
      subtance_question_detail.list_questions.forEach((row) => {
        if (checkedDelete.indexOf(row.id) === -1) {
          arr.push(row.id);
          setCheckedDelete(arr);
          checkedDelete.forEach((items, i) => {
            const input = document.getElementsByClassName("input_delete");
            input[i].checked = true;
          });
        }
      });
    } else {
      subtance_question_detail.list_questions.forEach((row, i) => {
        let arr = checkedDelete.splice(
          checkedDelete.indexOf(row.id),
          checkedDelete.length
        );
        setCheckedDelete(arr);
        const input = document.getElementsByClassName("input_delete");
        input[i].checked = false;
      });
    }
    if (checkedDelete.length >= 1) {
      document.getElementById("btn-delete-all").classList.remove("d-none");
    } else {
      document.getElementById("btn-delete-all").classList.add("d-none");
    }
  };

  const handleDeleteAll = () => {
    const data = {
      list_soal: checkedDelete,
    };
    dispatch(deleteCloneSubtanceQuestionBanks(data, token, tokenPermission));
  };

  const handleModal = () => {
    Swal.fire({
      title: "Silahkan Pilih Metode Entry",
      icon: "info",
      showDenyButton: true,
      showCloseButton: true,
      confirmButtonText: `Entry`,
      denyButtonText: `Import`,
      confirmButtonColor: "#3085d6",
      denyButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({
          pathname: `/subvit/substansi/tambah-step-2-entry`,
          query: { id },
        });
      } else if (result.isDenied) {
        router.push({
          pathname: `/subvit/substansi/tambah-step-2-import`,
          query: { id },
        });
      }
    });
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
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
      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="2"></StepInput>
          <div className="card-body">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-xs-4 col-sm-5 col-lg-5 col-xl-5 col-md-8">
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

                <div className="col-xs-1 col-sm-1 col-lg-1 col-xl-1 col-md-1"></div>

                <div className="col-xs-7 col-sm-6 col-lg-4 col-xl-3 col-md-3  ml-auto mt-3">
                  <button
                    className="btn btn-primary-rounded-full btn-block mt-2"
                    style={{ width: "100%" }}
                    onClick={handleModal}
                  >
                    <i className="flaticon2-notepad"></i>Tambah Soal
                  </button>
                </div>

                <div
                  id="btn-delete-all"
                  className="col-lg-2 col-xl-2 d-none mt-3"
                >
                  <button
                    className="btn btn-danger btn-block"
                    onClick={handleDeleteAll}
                  >
                    <i className="flaticon2-notepad"></i>Hapus
                  </button>
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                {loading === true ? (
                  <LoadingTable loading={loading} />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-center align-middle">
                          <input
                            type="checkbox"
                            aria-label="Checkbox for following text input"
                            onClick={(e) => handleCheckboxDeleteAll(e)}
                          />
                        </th>
                        <th>No</th>
                        <th>ID Soal</th>
                        <th>Soal</th>
                        <th>Kategori</th>
                        <th>Bobot</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subtance_question_detail &&
                      subtance_question_detail.list_questions &&
                      subtance_question_detail.list_questions.length === 0 ? (
                        <td className="align-middle text-center" colSpan={8}>
                          Data Kosong
                        </td>
                      ) : (
                        subtance_question_detail &&
                        subtance_question_detail.list_questions &&
                        subtance_question_detail.list_questions.map(
                          (question, i) => {
                            return (
                              <tr key={question.id}>
                                <td className="align-middle text-center">
                                  <input
                                    className="input_delete"
                                    type="checkbox"
                                    aria-label="Checkbox for following text input"
                                    value={question.id}
                                    checked={checkedDelete.find(
                                      (items) => items.id === question.id
                                    )}
                                    onChange={(e) =>
                                      handleCheckboxDelete(e, question)
                                    }
                                  />
                                </td>
                                <td className="align-middle">
                                  <span className="">
                                    {i + 1 * (page * 5 || limit) - 4}
                                  </span>
                                </td>
                                <td className="align-middle">
                                  CC{question.subtance_question_bank_id}
                                </td>
                                <td className="align-middle">
                                  {question.question}
                                </td>
                                <td className="align-middle">
                                  {question.type.name}
                                </td>
                                <td className="align-middle">
                                  {question.type.value} poin
                                </td>
                                <td className="align-middle">
                                  {question.status === true ? (
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
                                  <Link
                                    href={`/subvit/substansi/edit-soal-substansi?id=${question.id}`}
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
                                </td>
                              </tr>
                            );
                          }
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="row">
                <div className="table-pagination">
                  {subtance_question_detail && (
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={subtance_question_detail.perPage}
                      totalItemsCount={subtance_question_detail.total}
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
                  {subtance_question_detail &&
                    subtance_question_detail.list_questions && (
                      <div className="row">
                        <div className="col-4 mr-0 p-0">
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
                            style={{ color: "#B5B5C3" }}
                          >
                            Total Data {subtance_question_detail.total}
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              </div>
              <div className="row mt-7">
                <div className=" col-xs-12 col-sm-12 col-md-12 pt-0">
                  <div className="float-right ">
                    <div className={styles.foldResponsive}>
                      <button
                        className={`${styles.btnNextFold} btn btn-light-ghost-rounded-full mr-2`}
                        type="button"
                        onClick={saveLanjut}
                      >
                        Simpan & Lanjut
                      </button>
                      <button
                        className={`${styles.btnDraftFold} btn btn-primary-rounded-full`}
                        onClick={saveDraft}
                        type="button"
                      >
                        Simpan Draft
                      </button>
                    </div>
                    <div className={`${styles.normalBtn} row`}>
                      <div className="col-xs-6">
                        <button
                          className={`${styleBtn.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                          type="button"
                          onClick={saveLanjut}
                        >
                          Simpan & Lanjut
                        </button>
                      </div>
                      <div className="col-xs-6">
                        <button
                          className={` btn btn-primary-rounded-full`}
                          onClick={saveDraft}
                          type="button"
                        >
                          Simpan Draft
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepTwo;
