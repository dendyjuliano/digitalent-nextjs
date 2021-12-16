import dynamic from "next/dynamic";
// import ReportTrivia from "../../../../components/content/subvit/trivia/report-trivia";

import { allReportTriviaQuestionBanks } from "../../../../redux/actions/subvit/trivia-question.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const ReportTrivia = dynamic(
  () => import("../../../../components/content/subvit/trivia/report-trivia"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);
export default function ReportTriviaPage(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ReportTrivia token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      const permission = req.cookies.token_permission;

      await store.dispatch(
        allReportTriviaQuestionBanks(
          query.id,
          query.page,
          query.keyword,
          query.limit,
          query.card,
          session.user.user.data.token,
          permission
        )
      );
      return {
        props: { session, title: "Report Trivia - Subvit" },
      };
    }
);
