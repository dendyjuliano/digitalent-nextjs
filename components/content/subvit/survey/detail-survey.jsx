import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteSurveyQuestionDetail,
  clearErrors,
} from "../../../../redux/actions/subvit/survey-question-detail.action";

const DetailSurvey = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { survey_question_detail } = useSelector(
    (state) => state.allSurveyQuestionDetail
  );
  const { error, isDeleted } = useSelector(
    (state) => state.deleteSurveyQuestionDetail
  );
  const { survey } = useSelector((state) => state.detailSurveyQuestionBanks);

  let { page = 1, id } = router.query;
  page = Number(page);

  useEffect(() => {
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    }
  }, [isDeleted]);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  const handlePagination = (pageNumber) => {
    router.push(`${router.pathname}/${id}?page=${pageNumber}`);
  };

  const handleLimit = (val) => {
    router.push(`${router.pathname}/${id}?page=${1}&limit=${val}`);
  };

  const handleDelete = (id) => {
    console.log(id);
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
        dispatch(deleteSurveyQuestionDetail(id));
      }
    });
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
          pathname: `/subvit/survey/tambah/step-2-entry`,
          query: { id },
        });
      } else if (result.isDenied) {
        router.push({
          pathname: `/subvit/survey/tambah/step-2-import`,
          query: { id },
        });
      }
    });
  };

  const handleSearch = () => {
    let link = `${router.pathname}?id=${id}&page=1&keyword=${search}`;
    router.push(link);
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

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header">
            <h3 className="card-title font-weight-bolder text-dark">
              Survey FGA - Cloud Computing
            </h3>
            <div className="card-toolbar">
              <Link href={`/subvit/survey/edit?id=${id}`}>
                <a className="btn btn-sm btn-light-success px-6 font-weight-bold btn-block ">
                  Edit
                </a>
              </Link>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="row">
                  <div
                    className="col title-1 font-weight-bold"
                    style={{ color: "#80808F" }}
                  >
                    <p>Akademi</p>
                    <p>Tema</p>
                    <p>Pelatihan</p>
                    <p>Status</p>
                  </div>
                  <div className="col value-1">
                    <p>{survey.academy.name}</p>
                    <p>{survey.theme.name}</p>
                    <p>{survey.training.name}</p>
                    <p>{survey.status ? "Publish" : "Draft"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div
                    className="col title-1 font-weight-bold"
                    style={{ color: "#80808F" }}
                  >
                    <p>Pelaksanaan</p>
                    <p>Jumlah Soal</p>
                    <p>Durasi Tes</p>
                  </div>
                  <div className="col value-1">
                    <p>1 - 5 Juli 2021</p>
                    <p>{survey.questions_to_share} Soal</p>
                    <p>{survey.duration} Menit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <div className="card-toolbar">
              <h3 className="card-title font-weight-bolder text-dark">
                Bank Soal
              </h3>
              {/* <label htmlFor=""></label> */}
            </div>
            <div className="card-toolbar">
              <a
                className="btn btn-sm btn-light-success px-6 font-weight-bold btn-block "
                onClick={handleModal}
              >
                Tambah Soal
              </a>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-10 col-xl-10">
                  <div className="input-icon">
                    <input
                      style={{ background: "#F3F6F9", border: "none" }}
                      type="text"
                      className="form-control mt-2"
                      placeholder="Search..."
                      id="kt_datatable_search_query"
                      onChange={(e) => setSearch(e.target.value)}
                      autoComplete="off"
                    />
                    <span>
                      <i className="flaticon2-search-1 text-muted"></i>
                    </span>
                  </div>
                </div>

                <div className="col-lg-2 col-xl-2">
                  <button
                    className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block mt-2"
                    onClick={handleSearch}
                  >
                    Cari
                  </button>
                </div>
              </div>
            </div>

            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-center">No</th>
                      <th>ID Soal</th>
                      <th>Soal</th>
                      <th>Status</th>
                      <th className="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {survey_question_detail &&
                    survey_question_detail.list_questions &&
                    survey_question_detail.list_questions.length === 0 ? (
                      <td className="align-middle text-center" colSpan={8}>
                        Data Masih Kosong
                      </td>
                    ) : (
                      survey_question_detail &&
                      survey_question_detail.list_questions.map(
                        (question, i) => {
                          return (
                            <tr key={question.id}>
                              <td className="align-middle text-center">
                                <span className="badge badge-secondary text-muted">
                                  {i + 1 * (page * 5 || limit) - 4}
                                </span>
                              </td>
                              <td className="align-middle">CC{question.id}</td>
                              <td className="align-middle">
                                {question.question}
                              </td>
                              <td className="align-middle">
                                {question.status === true ? (
                                  <span className="label label-inline label-light-success font-weight-bold">
                                    Publish
                                  </span>
                                ) : (
                                  <span className="label label-inline label-light-danger font-weight-bold">
                                    Draft
                                  </span>
                                )}
                              </td>
                              <td className="align-middle">
                                <ButtonAction
                                  icon="write.svg"
                                  link={`edit-soal-survey?id=${question.id}`}
                                  title="Edit"
                                />
                                <button
                                  onClick={() => handleDelete(question.id)}
                                  className="btn mr-1"
                                  style={{
                                    background: "#F3F6F9",
                                    borderRadius: "6px",
                                  }}
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Hapus"
                                >
                                  <Image
                                    alt="button-action"
                                    src={`/assets/icon/trash.svg`}
                                    width={18}
                                    height={18}
                                  />
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="row">
                {survey_question_detail &&
                  survey_question_detail.perPage <
                    survey_question_detail.total && (
                    <div className="table-pagination">
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={survey_question_detail.perPage}
                        totalItemsCount={survey_question_detail.total}
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
                {survey_question_detail && survey_question_detail.total > 5 ? (
                  <div className="table-total ml-auto">
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
                          Total Data {survey_question_detail.total}
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

export default DetailSurvey;
