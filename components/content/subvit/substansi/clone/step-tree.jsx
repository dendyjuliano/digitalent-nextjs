import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  updateSubtanceQuestionBanksPublish,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance.actions";
import { UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_RESET } from "../../../../../redux/types/subvit/subtance.type";

import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import moment from "moment";
import styles from "../../../../../styles/stepInput.module.css";
import styleBtn from "../../trivia/edit/step.module.css";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInputClone";
import LoadingPage from "../../../../LoadingPage";
import { helperRegexNumber } from "../../../../../utils/middleware/helper";

const StepTwo = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { id } = router.query;
  const { error: detailData, subtance } = useSelector(
    (state) => state.detailSubtanceQuestionBanks
  );
  const { loading, error, success } = useSelector(
    (state) => state.updateSubtanceQuestionBanksPublish
  );
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

    if (success) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_RESET,
      });
      router.push({
        pathname: `/subvit/substansi`,
        query: { success: true },
      });
    }
  }, [dispatch, error, success, router]);

  const [startDate, setStartDate] = useState(
    subtance?.start_at ? new Date(subtance.start_at) : new Date(Date.now())
  );
  const [endDate, setEndDate] = useState(
    subtance?.end_at ? new Date(subtance.end_at) : new Date(Date.now())
  );
  const [duration, setDuration] = useState(subtance?.duration);
  const [jumlah_soal, setJumlahSoal] = useState(subtance?.questions_to_share);
  const [passing_grade, setPassingGrade] = useState(subtance?.passing_grade);
  const [status, setStatus] = useState(subtance?.status || 0);
  const [, forceUpdate] = useState();

  const saveDraft = () => {
    if (simpleValidator.current.allValid()) {
      const start_at = moment(startDate).format("YYYY-MM-DD");
      const end_at = moment(endDate).format("YYYY-MM-DD");

      const data = {
        _method: "put",
        start_at,
        end_at,
        duration,
        passing_grade,
        status: 0,
        questions_to_share: jumlah_soal,
      };

      dispatch(updateSubtanceQuestionBanksPublish(data, id, token));
      localStorage.removeItem("clone1");
      localStorage.removeItem("clone3");
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (simpleValidator.current.allValid()) {
      const start_at = moment(startDate).format("YYYY-MM-DD");
      const end_at = moment(endDate).format("YYYY-MM-DD");

      const data = {
        _method: "put",
        start_at,
        end_at,
        duration,
        passing_grade,
        status: status,
        questions_to_share: jumlah_soal,
      };

      dispatch(
        updateSubtanceQuestionBanksPublish(data, id, token, tokenPermission)
      );
      localStorage.removeItem("clone1");
      localStorage.removeItem("clone3");
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleTotalSoal = (e) => {
    if (e === "" || helperRegexNumber.test(e)) {
      setJumlahSoal(e);
    }
  };

  const handleDuration = (e) => {
    if (e === "" || helperRegexNumber.test(e)) {
      setDuration(e);
    }
  };

  const handlePassingGrade = (e) => {
    if (e === "" || helperRegexNumber.test(e)) {
      setPassingGrade(e);
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
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="4"></StepInput>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">
              Publish Hasil Clone Soal Test Substansi
            </h2>
          </div>
          <div className="card-body pt-0">
            <h4 className="mt-2">
              <b>{subtance?.training?.name}</b>
            </h4>
            <table>
              <tr>
                <td>Tanggal Pendaftaran &nbsp;</td>
                <td>: &nbsp;</td>
                <td>
                  {subtance?.pendaftaran_mulai} &nbsp; s.d. &nbsp;
                  {subtance?.pendaftaran_selesai}{" "}
                </td>
              </tr>
              <tr>
                <td>Tanggal Pelatihan </td>
                <td> : </td>{" "}
                <td>
                  {subtance?.pelatihan_mulai} &nbsp; s.d. &nbsp;{" "}
                  {subtance?.pelatihan_selesai}{" "}
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
                    value={startDate}
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
                    Sampai
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
                    value={endDate}
                    disabled={!startDate}
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
                      placeholder="20"
                      value={jumlah_soal}
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
                    "required",
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
                      className="form-control"
                      placeholder="360"
                      aria-describedby="basic-addon2"
                      value={duration}
                      onChange={(e) => handleDuration(e.target.value)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("durasi")
                      }
                      min={1}
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
                    "required",
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
                    Passing Grade
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon2"
                      placeholder="80"
                      value={passing_grade}
                      onChange={(e) => handlePassingGrade(e.target.value)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("passing grade")
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-primary text-white"
                        id="basic-addon2"
                      >
                        Nilai
                      </span>
                    </div>
                  </div>

                  {simpleValidator.current.message(
                    "passing grade",
                    passing_grade,
                    "required",
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
                    onChange={(e) => setStatus(e.target.value)}
                    onBlur={(e) => {
                      setStatus(e.target.value);
                      simpleValidator.current.showMessageFor("status");
                    }}
                  >
                    <option value={1}> Publish </option>
                    <option value={0}> Draft </option>
                  </select>
                  {simpleValidator.current.message(
                    "status",
                    status,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="row">
                <div className=" col-xs-12 col-sm-12 col-md-12 pt-0">
                  <button
                    className={`${styleBtn.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                    type="button"
                    onClick={() => {
                      router.push(
                        `/subvit/substansi/clone/step-3?id=${router.query.id}`
                      );
                    }}
                  >
                    Kembali
                  </button>
                  <div className="float-right ">
                    <div className={styles.foldResponsive}>
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
                        {" "}
                        <button
                          className={`${styleBtn.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                          type="button"
                          onClick={onSubmit}
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
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default StepTwo;
