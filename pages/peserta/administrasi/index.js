import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { useRouter } from "next/router";
const SeleksiAdministrasi = dynamic(
  () =>
    import(
      "../../../user-component/content/peserta/administrasi/seleksiAdmin.jsx"
    ),
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
  const router = useRouter();
  console.log(router, "ini router ");
  return (
    <>
      <Layout title="Administrasi" session={session}>
        <SeleksiAdministrasi />
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      // console.log(session.user.user.data); untuk cek role user
      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      const data = session.user.user.data;
      if (data.user.roles[0] !== "user") {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      return {
        props: { data: "auth", session, title: "Riwayat Pelatihan - Peserta" },
      };
    }
);