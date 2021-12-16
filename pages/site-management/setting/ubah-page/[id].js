import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getDetailPages } from "../../../../redux/actions/site-management/settings/page.actions";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

const UbahPage = dynamic(
  () =>
    import(
      "../../../../components/content/site-management/settings/page/ubah-page"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function TambahPages(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <UbahPage token={session.token} />
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
        getDetailPages(params.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Ubah Page - Site Management" },
      };
    }
);
