import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { getDetailZonasi } from "../../../../../redux/actions/site-management/zonasi.actions";
import { wrapper } from "../../../../../redux/store";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

const DetailRole = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/master-data/master-zonasi/detail"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DetailRoles(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailRole token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
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

      await store.dispatch(
        getDetailZonasi(params.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Detail Zonasi - Site Management" },
      };
    }
);
