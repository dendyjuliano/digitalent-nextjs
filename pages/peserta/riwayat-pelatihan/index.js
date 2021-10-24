import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { getAllRiwayatPelatihanPeserta } from "../../../redux/actions/pelatihan/riwayat-pelatihan.actions";

const RiwayatPelatihan = dynamic(
  () =>
    import("../../../user-component/content/peserta/riwayat-pelatihan/index"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import("../../../user-component/components/template/Layout.component")
);

export default function RiwayatPelatihanPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Pelatihan Peserta - Pelatihan" session={session}>
        <RiwayatPelatihan />
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
      await store.dispatch(
        getAllRiwayatPelatihanPeserta(session.user.user.data.user.token)
      );
      // await store.dispatch(getDataPribadi(session.user.user.data.user.token));

      return {
        props: { data: "auth", session, title: "Riwayat Pelatihan - Peserta" },
      };
    }
);
