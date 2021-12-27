import React, { useEffect, useState, useRef } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import styles from "../edit/step.module.css";

import { useDispatch, useSelector } from "react-redux";

import {
  clearErrors,
  updateTriviaQuestionDetail,
} from "../../../../../redux/actions/subvit/trivia-question-detail.action";
import { UPDATE_TRIVIA_QUESTION_DETAIL_RESET } from "../../../../../redux/types/subvit/trivia-question-detail.type";

import PageWrapper from "../../../../wrapper/page.wrapper";
import LoadingPage from "../../../../LoadingPage";
import PollingComponent from "./edit-soal/polling-component";
import CheckboxComponent from "./edit-soal/checkbox-component";
import BlankComponent from "./edit-soal/blank-component";

const EditSoalTrivia = ({ token, tokenPermission }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

  const {
    loading: detailLoading,
    error: detailError,
    trivia_question_detail,
  } = useSelector((state) => state.detailTriviaQuestionDetail);
  const { loading, error, success } = useSelector(
    (state) => state.updateTriviaQuestionDetail
  );
  let { id } = router.query;

  const [methodAdd, setMethodAdd] = useState(trivia_question_detail?.type);

  const [question, setQuestion] = useState(trivia_question_detail?.question);
  const [question_image, setQuestionImage] = useState(
    trivia_question_detail?.question_image
  );
  const [question_image_preview, setQuestionImagePreview] = useState(
    process.env.END_POINT_API_IMAGE_SUBVIT +
      trivia_question_detail?.question_image_preview
  );
  const [question_image_name, setQuestionImageName] = useState("Pilih Gambar");

  const [answer, setAnswer] = useState(
    JSON.parse(trivia_question_detail?.answer)
  );

  const [duration, setDuration] = useState(trivia_question_detail?.duration);
  const [answerKey, setAnswerKey] = useState(
    trivia_question_detail?.answer_key
  );
  const [status, setStatus] = useState(trivia_question_detail?.status);

  useEffect(() => {
    if (success) {
      dispatch({
        type: UPDATE_TRIVIA_QUESTION_DETAIL_RESET,
      });
      router.push({
        pathname: `/subvit/trivia/${localStorage.getItem("id_trivia")}`,
        query: { success: true },
      });
    }
  }, [dispatch, success, router]);

  const handleSoalImage = (e) => {
    if (e.target.name === "question_image") {
      if (e.target.files[0].size > 5000000) {
        e.target.value = null;
        Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
      } else {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setQuestionImage(reader.result);
            }
          };
          setQuestionImagePreview(URL.createObjectURL(e.target.files[0]));
          setQuestionImageName(e.target.files[0].name);
          reader.readAsDataURL(e.target.files[0]);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch(
        {
          type: UPDATE_TRIVIA_QUESTION_DETAIL_RESET,
        },
        token
      );
    }

    if (question == "" && question_image == "") {
      valid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi pertanyaan dengan benar !",
      });
    }

    answer.forEach((row, j) => {
      if (row.option == "" && row.image == "") {
        valid = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi jawaban dengan benar !",
        });
      }
    });

    const answers = JSON.stringify(answer);
    switch (methodAdd) {
      case "polling":
        if (valid) {
          const data = {
            trivia_question_bank_id:
              trivia_question_detail.trivia_question_bank_id,
            question,
            question_image,
            answer: answers,
            status,
            type: methodAdd,
            _method: "put",
          };
          dispatch(
            updateTriviaQuestionDetail(id, data, token, tokenPermission)
          );
        }
        break;
      case "checkbox":
        if (valid) {
          const data = {
            trivia_question_bank_id:
              trivia_question_detail.trivia_question_bank_id,
            question,
            question_image,
            answer: answers,
            duration,
            status,
            type: methodAdd,
            _method: "put",
          };
          dispatch(
            updateTriviaQuestionDetail(id, data, token, tokenPermission)
          );
        }
        break;
      case "fill_in_the_blank":
        if (valid) {
          const data = {
            trivia_question_bank_id:
              trivia_question_detail.trivia_question_bank_id,
            question,
            question_image,
            answer: answers,
            duration,
            status,
            type: methodAdd,
            _method: "put",
          };
          dispatch(
            updateTriviaQuestionDetail(id, data, token, tokenPermission)
          );
        }
        break;
      default:
        break;
    }
  };

  const handleMethodeInput = () => {
    switch (methodAdd) {
      case "polling":
        return (
          <PollingComponent
            propsAnswer={answer}
            propsStatus={status}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => setStatus(status)}
          />
        );
        break;
      case "checkbox":
        return (
          <CheckboxComponent
            propsAnswer={answer}
            propsStatus={status}
            propsDuration={duration}
            propsAnswerKey={answerKey}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => setStatus(status)}
            sendPropsDuration={(duration) => setDuration(duration)}
            sendPropsAnswerKey={(answerKey) => setAnswerKey(answerKey)}
          />
        );
        break;
      case "fill_in_the_blank":
        return (
          <BlankComponent
            propsAnswer={answer}
            propsStatus={status}
            propsDuration={duration}
            sendPropsAnswer={(answers) => setAnswer(answers)}
            sendPropsStatus={(status) => setStatus(status)}
            sendPropsDuration={(duration) => setDuration(duration)}
          />
        );
        break;
      default:
        return (
          <PollingComponent
            propsAnswer={(answer) => setAnswer(answer)}
            propsStatus={(status) => setStatus(status)}
          />
        );
        break;
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

      <div className="col-lg-12 order-1 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <form onSubmit={handleSubmit}>
            <div className="card-header border-0 d-flex pb-0">
              <h2 className="card-title h2 text-dark">
                Soal {parseInt(router.query.no) + 1}
              </h2>
            </div>

            <div className="card-body pt-0">
              <div className="title row mb-5">
                {question_image_preview !=
                  "https://dts-subvit-dev.s3.ap-southeast-1.amazonaws.com/" && (
                  <div className="col-md-3 mt-4 text-center">
                    <Image
                      src={question_image_preview}
                      alt="logo"
                      width={210}
                      height={150}
                      objectFit="fill"
                    />
                  </div>
                )}
                <div className="col-md-9 pt-2">
                  <input
                    type="text"
                    className="form-control"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Contoh Soal"
                  />
                  <div className="custom-file mt-2">
                    <span>Gambar Pertanyaan (Opsional)</span>
                    <input
                      type="file"
                      className="custom-file-input"
                      name="question_image"
                      onChange={(e) => handleSoalImage(e)}
                      accept="image/png, image/gif, image/jpeg , image/jpg"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {trivia_question_detail.question_image_preview.substr(
                        14
                      ) || question_image_name}
                    </label>
                  </div>
                  <span className="text-muted">
                    (Maksimal ukuran file 5 MB)
                  </span>
                </div>
                {/* <div className="col-md-2 d-flex my-auto">
                  <button
                    className="btn pt-0 mr-3"
                    style={{ marginTop: "45px" }}
                    type="button"
                  >
                    <Image
                      alt="button-action"
                      src="/assets/icon/trash-red.svg"
                      width={20}
                      height={30}
                    />
                  </button>
                </div> */}
              </div>

              <div>Jenis Pertanyaan</div>
              <div className="form-group row mt-4 mb-3">
                <div className="col-sm-12 col-md-8">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="polling"
                      checked={methodAdd === "polling"}
                      onChange={() => setMethodAdd("polling")}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Polling
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="checkbox"
                      checked={methodAdd === "checkbox"}
                      onChange={() => setMethodAdd("checkbox")}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Checkbox
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="fill_in_the_blank"
                      checked={methodAdd === "fill_in_the_blank"}
                      onChange={() => setMethodAdd("fill_in_the_blank")}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                      Fill in the blank
                    </label>
                  </div>
                </div>
              </div>

              {handleMethodeInput()}

              <div className="button-back float-right p-5">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-rounded-full text-white"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditSoalTrivia;
