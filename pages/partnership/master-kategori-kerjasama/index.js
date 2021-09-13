import Layout from "../../../components/templates/layout.component";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
// import MasterKategoriKerjasama from "../../../components/content/partnership/master-kategori-kerjasama/masterKategoriKerjasama";

// import { fetchAllMKCooporation } from "../../../redux/actions/partnership/mk_cooporation.actions";
// import { wrapper } from "../../../redux/store";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
const MasterKategoriKerjasama = dynamic(
  () =>
    import(
      "../../../components/content/partnership/master-kategori-kerjasama/masterKategoriKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);

export default function KategoriKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Master Kategori Kerjasama - Partnership">
          <MasterKategoriKerjasama />
        </Layout>
      </div>
    </>
  );
}

// KategoriKerjasama.displayName = "KategoriKerjasama";

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ query }) => {
//       await store.dispatch(
//         fetchAllMKCooporation(query.page, query.keyword, query.limit)
//       );
//     }
// );
