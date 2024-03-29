import dynamic from "next/dynamic";
// import EditTriviaStep2 from "../../../../components/content/subvit/trivia/edit/step-2";

import { getDetailTriviaQuestionBanks } from "../../../../redux/actions/subvit/trivia-question.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const EditTriviaStep2 = dynamic(
  () => import("../../../../components/content/subvit/trivia/edit/step-2"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditTriviaStep2Page(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditTriviaStep2
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

      const permission = req.cookies.token_permission;

      await store.dispatch(
        getDetailTriviaQuestionBanks(
          query.id,
          session.user.user.data.token,
          permission
        )
      );
      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      return {
        props: { session, title: "Ubah Triva Step 2 - Subvit", permission },
      };
    }
);
