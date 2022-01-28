import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getAllAkademi } from "../../../redux/actions/beranda/beranda.actions";

const Keterampilan = dynamic(
  () =>
    import(
      "../../../user-component-new/content/peserta/profile/keterampilan/index"
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
    "../../../user-component-new/components/template/Layout-peserta.component"
  )
);

export default function KeterampilanPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Keterampilan Peserta - Pelatihan" session={session}>
        <Keterampilan session={session} />
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: process.env.PATH_URL,
            permanent: false,
          },
        };
      }
      const data = session.user.user.data;
      if (data.user.roles[0] !== "user") {
        return {
          redirect: {
            destination: process.env.PATH_URL,
            permanent: false,
          },
        };
      }
      await store.dispatch(getAllAkademi());
      return {
        props: { data: "auth", session, title: "Profile - Peserta" },
      };
    }
);
