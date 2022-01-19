import dynamic from "next/dynamic";
// import Preview from "../../../../components/content/publikasi/artikel/preview";
import Footer from "../../../../components/templates/footer.component";

import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import { getDetailArtikel } from "../../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
import { getTagBerandaArtikel } from "../../../../redux/actions/beranda/artikel.actions"
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const Preview = dynamic(
  () => import("../../../../components/content/publikasi/artikel/preview"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(
  () => import("../../../../user-component-new/components/template/Layout.component")
)

export default function PreviewArtikel(props) {
  const session = props.session.user.user.data;
  return (
    <div className="wrapper-preview" style={{ background: '#fff' }}>
      <Layout title="Pratinjau Artikel - Publikasi" token={session.token}>
        <Preview />
      </Layout>
    </div>
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
        getDetailArtikel(params.id, session.user.user.data.token, req.cookies.token_permission)
      );

      await store.dispatch(
        getTagBerandaArtikel(session.user.user.data.token, req.cookies.token_permission)
      )

      return {
        props: { session, title: "Preview Artikel - Publikasi", data: "auth" },
      };
    }
);
