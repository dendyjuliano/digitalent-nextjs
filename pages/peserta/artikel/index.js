import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { getDashboardPeserta } from "../../../redux/actions/pelatihan/dashboard-peserta.actions";
import LoadingContent from "../../../user-component-new/components/loader/LoadingContent";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { useRouter } from "next/router";
import { cekLulus } from "../../../redux/actions/beranda/artikel.actions";
import { getAllArtikelsPeserta } from "../../../redux/actions/publikasi/artikel.actions";

const Dashboard = dynamic(
  () => import("../../../user-component-new/content/peserta/artikel/index"),
  {
    loading: function loadingNow() {
      return <LoadingContent />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import(
    "../../../user-component-new/components/template/Layout-peserta.component"
  )
);

export default function DashboardPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Artikel" session={session}>
        <Dashboard session={session} success={props.success} />
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      const middleware = middlewareAuthPesertaSession(session);

      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      let success = false;
      if (session) {
        const dataPribadi = await store.dispatch(
          getDataPribadi(session?.user.user.data.user.token, req.cookies.token_permission)
        );
        if (dataPribadi?.data.status == false || !dataPribadi?.data.status) {
          success = false;
        } else {
          success = true;
        }
      }

      await store.dispatch(
        getAllArtikelsPeserta(session?.user.user.data.user.token, 1, 5, null, null, null, null, req.cookies.token_permission)
      );
      await store.dispatch(
        getDashboardPeserta(session?.user.user.data.user.token, req.cookies.token_permission)
      );
      await store.dispatch(cekLulus(session?.user.user.data.user.token, req.cookies.token_permission));

      return {
        props: { data: "auth", session, title: "Dashboard - Peserta", success },
      };
    }
);
