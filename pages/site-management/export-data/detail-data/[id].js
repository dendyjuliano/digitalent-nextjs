import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getDetailsExportData } from "../../../../redux/actions/site-management/export-data.actions";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

const UbahRole = dynamic(
  () =>
    import(
      "../../../../components/content/site-management/export-data/detail-data"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function UbahRoles(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <UbahRole token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req, query }) => {
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
        getDetailsExportData(
          query.id,
          session.user.user.data.token,
          null,
          null,
          null,
          req.cookies.token_permission
        )
      );
      return {
        props: {
          session,
          title: "Detail Data - Site Management",
        },
      };
    }
);
