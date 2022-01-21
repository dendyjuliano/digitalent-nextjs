import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { getDetailPelatihan } from "../../../redux/actions/beranda/detail-pelatihan.actions";
import { getAllTemaOriginal } from "../../../redux/actions/beranda/beranda.actions";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import LoadingDetailPelatihan from "../../../user-component-new/components/loader/LoadingDetailPelatihan";

const DetailPelatihan = dynamic(
  () =>
    import(
      "../../../user-component-new/content/home/detail-pelatihan/DetailPelatihan.component"
    ),
  {
    loading: function loadingNow() {
      return <LoadingDetailPelatihan />;
    },
    ssr: false,
  }
);
const Layout = dynamic(
  () =>
    import("../../../user-component-new/components/template/Layout.component"),
  { ssr: false }
);

export default function DetailKategori(props) {
  let session = null;

  if (props.session) {
    session = props.session.user.user.data.user;
  }
  return (
    <div style={{ backgroundColor: "white" }}>
      <Layout title="Detail Pelatihan" session={session}>
        <DetailPelatihan session={session} />
      </Layout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req, query }) => {
      const session = await getSession({ req });

      let sessionToken = session?.user.user.data.user.token;

      await store.dispatch(getDataPribadi(sessionToken));

      await store.dispatch(getAllTemaOriginal(query.akademiId));

      await store.dispatch(getDetailPelatihan(params.id, sessionToken));
      return {
        props: {
          title: "Detail Pelatihan",
          data: "auth",
          session,
        },
      };
    }
);
