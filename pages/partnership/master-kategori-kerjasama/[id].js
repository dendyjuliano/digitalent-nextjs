import Layout from "../../../components/templates/layout.component";
// import Edit from "../../../components/content/partnership/master-kategori-kerjasama/edit";

import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";

const Edit = dynamic(
  () =>
    import(
      "../../../components/content/partnership/master-kategori-kerjasama/edit"
    ),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Ubah Master Kategori Kerjasama - Partnership">
          <Edit />
        </Layout>
      </div>
    </>
  );
}

// TambahPage.displayName = "TambahPage";
