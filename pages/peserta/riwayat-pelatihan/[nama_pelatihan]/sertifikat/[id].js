import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Cookies from "js-cookie";
import { wrapper } from "../../../../../redux/store";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { getDataPribadi } from "../../../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthPesertaSession } from "../../../../../utils/middleware/authMiddleware";
import { getDetailRiwayatPelatihan } from "../../../../../redux/actions/pelatihan/riwayat-pelatihan.actions";
import { getAllAkademi } from "../../../../../redux/actions/beranda/beranda.actions";
import { getDashboardPeserta } from "../../../../../redux/actions/pelatihan/dashboard-peserta.actions";

const SertifikatPeserta = dynamic(
  () =>
    import(
      "../../../../../user-component-new/content/peserta/sertifikat-peserta/sertifikat-peserta"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const BelumTersedia = dynamic(
  () =>
    import(
      "../../../../../user-component-new/content/peserta/sertifikat-peserta/Belum-tersedia"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import(
    "../../../../../user-component-new/components/template/Layout-peserta.component"
  )
);

export default function RiwayatPelatihanPage(props) {
  const session = props.session.user.user.data.user;

  return (
    <>
      <Layout title="Administrasi" session={session}>
        {!props.success ? (
          <SertifikatPeserta session={session} />
        ) : (
          <BelumTersedia />
        )}
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
      if (!query.id) {
        success = false;
      } else {
      }
      await store.dispatch(getDataPribadi(session.user.user.data.user.token));
      await store.dispatch(getAllAkademi());

      const { data } = await store.dispatch(
        getDashboardPeserta(session?.user.user.data.user.token)
      );
      const status = data.pelatihan.pelatihan_selesi.status || "";
      if (!status || status == "") {
        success = false;
      } else if (
        !status.includes("substansi" || "belum tersedia" || "belum mengerjakan")
      ) {
        await store.dispatch(
          getDetailRiwayatPelatihan(
            data.pelatihan.pelatihan_selesi.id,
            session.user.user.data.user.token
          )
        );
        success = true;
      } else {
        success = false;
      }

      console.log(session.user.user.data.user.token);

      return {
        props: {
          data: "auth",
          session,
          title: "Administrasi Pelatihan - Peserta",
          success,
        },
      };
    }
);
