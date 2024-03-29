import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingContent from "../../../user-component-new/components/loader/LoadingContent";

import {
  getDataPribadi,
  dropdownProvinsi,
  dropdownAgama,
  dropdownPendidikan,
  dropdownStatusPekerjaan,
} from "../../../redux/actions/pelatihan/function.actions";
import {
  getProfileAlamat,
  getProfilePendidikan,
  getProfilePekerjaan,
  getDataRefPekerjaan,
  getDataAsalSekolah,
} from "../../../redux/actions/pelatihan/profile.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";

const WizzardPekerjaan = dynamic(
  () => import("../../../user-component-new/content/peserta/wizzard/pekerjaan"),
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

export default function WizzardPekerjaanPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Pekerjaan Peserta - Pelatihan" session={session}>
        <WizzardPekerjaan session={session} />
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

      const data = session.user.user.data.user;

      await store.dispatch(getDataPribadi(data.token));
      await store.dispatch(getProfileAlamat(data.token));
      await store.dispatch(getProfilePendidikan(data.token));

      // await store.dispatch(dropdownProvinsi(data.token));
      await store.dispatch(dropdownAgama(data.token));
      await store.dispatch(dropdownStatusPekerjaan(data.token));
      await store.dispatch(dropdownPendidikan(data.token));
      await store.dispatch(getProfilePekerjaan(data.token));
      await store.dispatch(getDataRefPekerjaan(data.token));
      // await store.dispatch(getDataAsalSekolah(data.token, 100));
      await store.dispatch(getDataAsalSekolah(data.token));

      return {
        props: { data: "auth", session, title: "Profile - Peserta" },
      };
    }
);
