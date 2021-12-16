import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import EditSurveyStep1 from "../../../../components/content/subvit/survey/edit/step-1";
import Layout from "../../../../components/templates/layout.component";
import {
  dropdownAkademi,
  dropdownPelatihan,
  dropdownTema,
} from "../../../../redux/actions/pelatihan/function.actions";

import { getDetailSurveyQuestionBanks } from "../../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const EditSurveyStep1 = dynamic(
  () => import("../../../../components/content/subvit/survey/edit/step-1"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditSurveyStep1Page(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSurveyStep1
          token={session.token}
          tokenPermission={props.permission}
        />
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
        dropdownAkademi(session.user.user.data.token, permission)
      );
      await store.dispatch(
        dropdownTema(session.user.user.data.token, permission)
      );
      await store.dispatch(
        dropdownPelatihan(session.user.user.data.token, permission)
      );

      await store.dispatch(
        getDetailSurveyQuestionBanks(
          query.id,
          session.user.user.data.token,
          permission
        )
      );
      return {
        props: { session, title: "Edit Test Survey - Step 1", permission },
      };
    }
);
