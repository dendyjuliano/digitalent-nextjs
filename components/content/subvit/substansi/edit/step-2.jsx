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
import styles from "../../trivia/edit/step.module.css";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInputPublish from "/components/StepInputPublish";
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
    if (success) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_RESET,
      });
      router.push({
        pathname: `/subvit/substansi`,
        query: { success: true },
      });
    }
  }, [dispatch, success, router]);

  const [startDate, setStartDate] = useState(
    subtance.start_at ? new Date(subtance.start_at) : null
  );
  const [endDate, setEndDate] = useState(
    subtance.end_at ? new Date(subtance.end_at) : null
  );
  const [duration, setDuration] = useState(subtance?.duration);
  const [jumlah_soal, setJumlahSoal] = useState(subtance?.questions_to_share);
  const [passing_grade, setPassingGrade] = useState(subtance?.passing_grade);
  const [status, setStatus] = useState(subtance?.status);
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

      dispatch(
        updateSubtanceQuestionBanksPublish(data, id, token, tokenPermission)
      );
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
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  const handleChange = (e) => {
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
      if (e.target.value < 30) {
        setDuration(e.target.value);
      } else {
        setDuration(e.target.value);
      }
    }
  };

  const handlePassingGrade = (e) => {
<<<<<<< HEAD
    if (e === "" || helperRegexNumber.test(e)) {
      setPassingGrade(e);
=======
    if (e.target.value === "" || helperRegexNumber.test(e.target.value)) {
      e.target.value = Math.max(
        Number(e.target.min),
        Math.min(Number(e.target.max), Number(e.target.value))
      );
      if (e.target.value < 30) {
        setPassingGrade(e.target.value);
      } else {
        setPassingGrade(e.target.value);
      }
>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
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
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <StepInputPublish step="2" type="Substansi" />
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Publish Soal</h2>
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
                  {subtance?.pendaftaran_mulai} &nbsp;s.d.&nbsp;
                  {subtance?.pendaftaran_selesai}{" "}
                </td>
              </tr>
              <tr>
                <td>Tanggal Pelatihan </td>
                <td> : </td>{" "}
                <td>
                  {subtance?.pelatihan_mulai} &nbsp;s.d.&nbsp;{" "}
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
                    placeholderText="Silahkan Pilih Tanggal Sampai"
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
                      maxLength={3}
                      className="form-control"
                      aria-describedby="basic-addon2"
                      value={duration}
                      onChange={(e) => handleDuration(e)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("durasi")
                      }
                      min="0"
                      max="360"
                      placeholder="360"
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
                      value={passing_grade}
<<<<<<< HEAD
                      onChange={(e) => handlePassingGrade(e.target.value)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("passing grade")
                      }
=======
                      onChange={(e) => handlePassingGrade(e)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("passing grade")
                      }
                      min="0"
                      max="100"
>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
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
                    onChange={(event) => handleChange(event)}
                    onBlur={(event) => {
                      handleChange(event);
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
                    passing_grade,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6">
                  <button
                    className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                    type="button"
                    onClick={() => {
                      router.push(
                        `/subvit/substansi/edit?id=${router.query.id}`
                      );
                    }}
                  >
                    Kembali
                  </button>
                </div>
                <div className="col-sm-6 text-right">
                  <button
                    className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                    type="submit"
                  >
                    Simpan & Lanjut
                  </button>
                  <button
                    className="btn btn-primary-rounded-full "
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

export default StepTwo;
