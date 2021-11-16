import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";

import { wrapper } from "../redux/store";
import { getAllAkademi } from "../redux/actions/beranda/beranda.actions";
import { getTemaByAkademi } from "../redux/actions/beranda/beranda.actions";
import { getAllPublikasi } from "../redux/actions/beranda/beranda.actions";
import { getDataPribadi } from "../redux/actions/pelatihan/function.actions";
import React, { useState } from "react";
import LoadingLanding from "../user-component/components/loader/LandingLoader";

const Beranda = dynamic(
  () => import("../user-component/content/beranda/beranda-new"),
  {
    loading: function loadingNow() {
      return <LoadingLanding />;
    },
    ssr: false,
  }
);
const Layout = dynamic(() => import("../components/wrapper/beranda.wrapper"), {
  ssr: false,
});

export default function HomePage(props) {
  let session = null;
  if (props.session) {
    session = props.session.user.user.data.user;
  }
  const [otpEmail, setOtpEmail] = useState("");
  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <Layout title="Digitalent" session={session}>
          <Beranda session={session} />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      if (session) {
        await store.dispatch(
          getDataPribadi(session?.user.user.data.user.token)
        );
      }

      await store.dispatch(getAllAkademi());

      await store.dispatch(getTemaByAkademi());

      await store.dispatch(getAllPublikasi());

      return {
        props: {
          data: "auth",
          session,
        },
      };
    }
);
