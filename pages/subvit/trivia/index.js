import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getAllTriviaQuestionBanks } from "../../../redux/actions/subvit/trivia-question.actions";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getPermissionSubvit } from "../../../redux/actions/subvit/subtance.actions";
import { getAllTriviaQuestionDetail } from "../../../redux/actions/subvit/trivia-question-detail.action";

const ListTrivia = dynamic(
  () => import("../../../components/content/subvit/trivia/list-trivia"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function Trivia(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListTrivia token={session.token} tokenPermission={props.permission} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

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
        getAllTriviaQuestionBanks(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token,
          permission
        )
      );

      await store.dispatch(
        getPermissionSubvit(session.user.user.data.token, permission)
      );

      return {
        props: { session, title: "Trivia - Subvit", permission },
      };
    }
);
