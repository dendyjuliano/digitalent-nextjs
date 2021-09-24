// import Layout from "../../../../components/templates/layout.component";
// import Hasil from "../../../../components/content/partnership/user/hasil";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const Hasil = dynamic(
  () => import("../../../../components/content/partnership/user/hasil"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function PembahasanPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Hasil kerjasama - Partnership"> */}
        <Hasil />
        {/* </Layout> */}
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Hasil kerjasama - Partnership" },
      };
    }
);