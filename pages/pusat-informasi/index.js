import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";

import LoadingDetailAkademi from "../../user-component/components/loader/DetailAkademiLoader";

const PusatInformasi = dynamic(
  () => import("../../user-component/content/beranda/pusat-informasi"),
  {
    loading: function loadingNow() {
      return <LoadingDetailAkademi />;
    },
    ssr: false,
  }
);
const Layout = dynamic(
  () => import("../../components/wrapper/beranda.wrapper"),
  { ssr: false }
);

export default function PusatInformasiPelatihan(props) {
  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <Layout title="Pusat Informasi" session={session}>
        <PusatInformasi session={session} />
      </Layout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, query, req }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      //   await store.dispatch(getDataPribadi(sessionToken));

      return {
        props: {
          title: "Pusat Informasi",
          data: "auth",
          session,
        },
      };
    }
);