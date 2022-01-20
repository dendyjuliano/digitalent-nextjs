import dynamic from "next/dynamic";
import LoadingSkeleton from "../../components/LoadingSkeleton";
// import DashbardSubvit from "../../components/content/subvit/dashboard/dashboard-subvit";
// import Layout from "../../components/templates/layout.component";
import { getSession } from "next-auth/client";
import { getDashboardSubvit } from "../../redux/actions/subvit/subtance-question-detail.action";
import { wrapper } from "../../redux/store";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
import { getPermissionSubvit } from "../../redux/actions/subvit/subtance.actions";

const DashboardSubvit = dynamic(
  () => import("../../components/content/subvit/dashboard/dashboard-subvit"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function Dashboard(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardSubvit token={session.token} />
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
        getDashboardSubvit(
          query.page_substansi,
          query.page_trivia,
          query.page_survey,
          session.user.user.data.token,
          permission
        )
      );

      await store.dispatch(
        getPermissionSubvit(session.user.user.data.token, permission)
      );

      return {
        props: { session, title: "Dashboard - Subvit" },
      };
    }
);
