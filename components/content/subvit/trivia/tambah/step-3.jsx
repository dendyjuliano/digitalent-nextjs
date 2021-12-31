import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  updateTriviaQuestionBanksPublish,
  clearErrors,
} from "../../../../../redux/actions/subvit/trivia-question.actions";
import { UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_RESET } from "../../../../../redux/types/subvit/trivia-question.type";
import {
  helperRegexNumber,
  helperTextLimitMax,
} from "../../../../../utils/middleware/helper";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage";
import styles from "../edit/step.module.css";
import DatePicker from "react-datepicker";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import moment from "moment";
import Select from "react-select";

const StepThree = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { id } = router.query;
  const { loading, error, success } = useSelector(
    (state) => state.updateTriviaQuestionBanksPublish
  );

  const { trivia } = useSelector((state) => state.detailTriviaQuestionBanks);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  useEffect(() => {
    // if (error) {
    //   dispatch(clearErrors());
    // }

    if (success) {
      dispatch({
        type: UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_RESET,
      });
      router.push({
        pathname: `/subvit/trivia`,
        query: { success: true },
      });
    }
  }, [dispatch, error, success, router]);

  const [, forceUpdate] = useState();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState("");
  const [jumlah_soal, setJumlahSoal] = useState("");
  const [status, setStatus] = useState("");

  const saveDraft = () => {
    if (
      moment(startDate).format("YYYY-MM-DD") >
      moment(endDate).format("YYYY-MM-DD")
    ) {
      Swal.fire(
        "Oops !",
        "Tanggal sebelum tidak boleh melebihi tanggal sesudah.",
        "error"
      );
      setStartDate(null);
      setEndDate(null);
    } else {
      if (simpleValidator.current.allValid()) {
        const start_at = moment(startDate).format("YYYY-MM-DD");
        const end_at = moment(endDate).format("YYYY-MM-DD");

        const data = {
          _method: "put",
          start_at,
          end_at,
          duration,
          status: 0,
          questions_to_share: jumlah_soal,
        };

        dispatch(
          updateTriviaQuestionBanksPublish(data, id, token, tokenPermission)
        );
        localStorage.removeItem("method");
        localStorage.removeItem("step1");
        localStorage.removeItem("step2");
        localStorage.removeItem("clone1");
        localStorage.removeItem("clone3");
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (error) {
      dispatch(clearErrors());
    }

    if (
      moment(startDate).format("YYYY-MM-DD") >
      moment(endDate).format("YYYY-MM-DD")
    ) {
      Swal.fire(
        "Oops !",
        "Tanggal sebelum tidak boleh melebihi tanggal sesudah.",
        "error"
      );
      setStartDate(null);
      setEndDate(null);
    } else {
      if (simpleValidator.current.allValid()) {
        const start_at = moment(startDate).format("YYYY-MM-DD");
        const end_at = moment(endDate).format("YYYY-MM-DD");

        const data = {
          _method: "put",
          start_at,
          end_at,
          duration,
          status: status,
          questions_to_share: jumlah_soal,
        };

        dispatch(
          updateTriviaQuestionBanksPublish(data, id, token, tokenPermission)
        );
        localStorage.removeItem("method");
        localStorage.removeItem("step1");
        localStorage.removeItem("step2");
        localStorage.removeItem("clone1");
        localStorage.removeItem("clone3");
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    }
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleTotalSoal = (e) => {
    if (e === "" || helperRegexNumber.test(e)) {
      setJumlahSoal(e);
    }
  };

  const handleDuration = (e) => {
    if (e.target.value === "" || helperRegexNumber.test(e.target.value)) {
      e.target.value = Math.max(
        Number(e.target.min),
        Math.min(Number(e.target.max), Number(e.target.value))
      );

      setDuration(e.target.value);
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
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="3" title="Trivia"></StepInput>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Publish Soal</h2>
          </div>
          <div className="card-body pt-0">
            <h4 className="mt-2">
              <b>{trivia?.training?.name}</b>
            </h4>
            <table>
              <tr>
                <td>Tanggal Pendaftaran &nbsp;</td>
                <td>: &nbsp;</td>
                <td>
                  {trivia?.pendaftaran_mulai} &nbsp;s.d.&nbsp;
                  {trivia?.pendaftaran_selesai}{" "}
                </td>
              </tr>
              <tr>
                <td>Tanggal Pelatihan </td>
                <td> : </td>{" "}
                <td>
                  {trivia?.pelatihan_mulai} &nbsp;s.d.&nbsp;
                  {trivia?.pelatihan_selesai}{" "}
                </td>
              </tr>
            </table>
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <div className="col-sm-12 col-md-6">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Pelaksanaan Dari
                  </p>
                  <DatePicker
                    wrapperClassName="datepicker"
                    className="form-control"
                    name="start_date"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tanggal mulai")
                    }
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    placeholderText="Silahkan Pilih Tanggal Dari"
                  />

                  {simpleValidator.current.message(
                    "tanggal mulai",
                    startDate,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>

                <div className="col-sm-12 col-md-6">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Pelaksanaan Sampai
                  </p>
                  <DatePicker
                    wrapperClassName="datepicker"
                    className="form-control"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tanggal sampai")
                    }
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    disabled={!startDate}
                    placeholderText="Silahkan Pilih Tanggal Sampai"
                  />

                  {simpleValidator.current.message(
                    "tanggal sampai",
                    endDate,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-6">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Jumlah Soal
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon2"
                      value={jumlah_soal}
                      placeholder="20"
                      onChange={(e) => handleTotalSoal(e.target.value)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("jumlah soal")
                      }
                      min={1}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-primary text-white"
                        id="basic-addon2"
                      >
                        Soal
                      </span>
                    </div>
                  </div>

                  {simpleValidator.current.message(
                    "jumlah soal",
                    jumlah_soal,
                    "required|integer",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-sm-12 col-md-6">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Durasi Test
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      maxLength={3}
                      min="0"
                      className="form-control"
                      aria-describedby="basic-addon2"
                      value={duration}
                      placeholder="360"
                      onChange={(e) => handleDuration(e)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("durasi")
                      }
                      max="300"
                    />

                    <div className="input-group-append bg-sedondary">
                      <span
                        className="input-group-text bg-primary text-white"
                        id="basic-addon2"
                      >
                        Menit
                      </span>
                    </div>
                  </div>

                  {simpleValidator.current.message(
                    "durasi",
                    duration,
                    "required|integer",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-12">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Status
                  </p>
                  <select
                    name="status"
                    id=""
                    className="form-control"
                    value={status}
                    onChange={(event) => handleStatus(event)}
                    onBlur={(event) => {
                      handleStatus(event);
                      simpleValidator.current.showMessageFor("status");
                    }}
                  >
                    <option value="" selected disabled>
                      -- PILIH STATUS --
                    </option>
                    <option value={1}> Publish </option>
                    <option value={0}> Draft </option>
                  </select>

                  {simpleValidator.current.message(
                    "status",
                    status === 0,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2">
                  <button
                    className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                    onClick={() => {
                      localStorage.getItem("method") === "entry"
                        ? router.push(
                            `/subvit/trivia/tambah/step-2-entry?id=${
                              router.query.id
                            }&metode=${localStorage.getItem("method")}`
                          )
                        : router.push(
                            `/subvit/trivia/tambah/step-2-import?id=${
                              router.query.id
                            }&metode=${localStorage.getItem("method")}`
                          );
                    }}
                    type="button"
                  >
                    Kembali
                  </button>
                </div>
                <div className="col-sm-10 text-right">
                  <button
                    className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                    type="submit"
                  >
                    Simpan & Lanjut
                  </button>
                  <button
                    className="btn btn-primary-rounded-full"
                    onClick={saveDraft}
                    type="button"
                  >
                    Simpan Draft
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepThree;
