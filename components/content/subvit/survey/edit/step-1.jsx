import React, { useState, useEffect } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  updateSurveyQuestionBanks,
  clearErrors,
} from "../../../../../redux/actions/subvit/survey-question.actions";
import { UPDATE_SURVEY_QUESTION_BANKS_RESET } from "../../../../../redux/types/subvit/survey-question.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInputPublish from "/components/StepInputPublish";
import LoadingPage from "../../../../LoadingPage";

const StepOne = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { id } = router.query;
  const { error: detailData, survey } = useSelector(
    (state) => state.detailSurveyQuestionBanks
  );
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateSurveyQuestion
  );

  const [typeSave, setTypeSave] = useState("lanjut");
  const [academy_id, setAcademyId] = useState(survey.academy_id);
  const [theme_id, setThemeId] = useState(survey.theme_id);
  const [training_id, setTrainingId] = useState(survey.training_id);

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

    if (isUpdated) {
      dispatch({
        type: UPDATE_SURVEY_QUESTION_BANKS_RESET,
      });
      if (typeSave === "lanjut") {
        router.push({
          pathname: `/subvit/survey/edit/step-2`,
          query: { id },
        });
      } else if (typeSave === "draft") {
        router.push({
          pathname: `/subvit/survey`,
          query: { success: true },
        });
      }
    }
  }, [dispatch, error, isUpdated, id, typeSave, router]);

  // const saveAndContinue = () => {
  //   router.push("/subvit/substansi/edit/step-2");
  // };

  const saveDraft = () => {
    setTypeSave("draft");
    const data = {
      academy_id,
      theme_id,
      training_id,
      _method: "put",
    };

    dispatch(updateSurveyQuestionBanks(id, data));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTypeSave("lanjut");

    const data = {
      academy_id,
      theme_id,
      training_id,
      _method: "put",
    };

    dispatch(updateSurveyQuestionBanks(id, data));

    console.log(data);
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
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <StepInputPublish step="1"></StepInputPublish>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Edit Test Survey</h2>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={onSubmit}>
              <div className="form-group my-3">
                <label htmlFor="staticEmail" className=" col-form-label ">
                  Akademi
                </label>
                <div className="">
                  <select
                    name="academy_id"
                    id=""
                    onChange={(e) => setAcademyId(e.target.value)}
                    className="form-control"
                  >
                    <option> -Pilih Akademi -</option>
                    <option value="1" selected>
                      {" "}
                      Computer Scientist{" "}
                    </option>
                    <option value="2"> Designer </option>
                  </select>
                </div>
              </div>

              <div className="form-group my-3">
                <label htmlFor="staticEmail" className=" col-form-label ">
                  Tema
                </label>
                <div className="">
                  <select
                    name="the_id"
                    id=""
                    onChange={(e) => setThemeId(e.target.value)}
                    className="form-control"
                  >
                    <option> -Pilih Tema-</option>
                    <option value="1" selected>
                      {" "}
                      Cloud Computing{" "}
                    </option>
                    <option value="2"> UI/UX Designer </option>
                  </select>
                </div>
              </div>

              <div className="form-group ">
                <label htmlFor="staticEmail" className=" col-form-label ">
                  Pelatihan
                </label>
                <div className="">
                  <select
                    name="training_id"
                    id=""
                    onChange={(e) => setTrainingId(e.target.value)}
                    className="form-control"
                  >
                    <option> -Pilih Pelatihan-</option>
                    <option value="1" selected>
                      {" "}
                      Google Cloud Computing{" "}
                    </option>
                    <option value="2"> Adobe UI/UX Designer </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <div className=" text-right">
                  <button
                    className="btn btn-light-ghost-rounded-full mr-2"
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

export default StepOne;
