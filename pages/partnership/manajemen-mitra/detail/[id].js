import Layout from "../../../../components/templates/layout.component";
// import DetailDataKerjasama from "../../../../components/content/partnership/manajemen-mitra/detailDataKerjasama";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";

const DetailDataKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/manajemen-mitra/detailDataKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function DetailDataKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <DetailDataKerjasama />
        </Layout>
      </div>
    </>
  );
}

// DetailDataKerjasamaPage.displayName = "DetailDataKerjasamaPage";
