import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";
import { getTagBerandaBerita } from "../../redux/actions/beranda/berita.actions";
import { getAllAkademi } from "../../redux/actions/beranda/beranda.actions";
import LoadingDetailAkademi from "../../user-component-new/components/loader/LoadingDetailAkademi";

const Kontak = dynamic(() =>
  import("../../user-component-new/content/home/kontak/Kontak.component"),
  {
    loading: function loadingNow() {
      return <LoadingDetailAkademi />;
    },
    ssr: false,
  }
);

const Layout = dynamic(
  () => import("../../user-component-new/components/template/Layout.component"),
  { ssr: false }
);

export default function BerandaKontak(props) {
  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <Layout title="Kontak" session={session}>
          <Kontak session={session}></Kontak>
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      await store.dispatch(getDataPribadi(sessionToken));

      await store.dispatch(getAllAkademi());

      await store.dispatch(getTagBerandaBerita());

      return {
        props: {
          title: "Berita",
          data: "auth",
          session,
        },
      };
    }
);
