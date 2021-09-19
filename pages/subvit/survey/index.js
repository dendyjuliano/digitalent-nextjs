import React from "react";
import dynamic from "next/dynamic";

// import ListSurvey from '../../../components/content/subvit/survey/list-survey'
import Layout from "../../../components/templates/layout.component";
// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

import { getAllSurveyQuestionBanks } from "../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../redux/store";

const ListSurvey = dynamic(
  () => import("../../../components/content/subvit/survey/list-survey"),
  { loading: () => <LoadingSkeleton /> }
);
import { getSession } from "next-auth/client";

export default function Survey() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="List Test Survey">
          <ListSurvey />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      await store.dispatch(
        getAllSurveyQuestionBanks(query.page, query.keyword, query.limit)
      );

      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { session },
      };
    }
);
