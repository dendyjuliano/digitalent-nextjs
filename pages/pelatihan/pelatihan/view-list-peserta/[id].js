import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

import {
  getStatusPendaftar,
  getAkademiByPelatihan,
  getPendaftaranPeserta,
} from "../../../../redux/actions/pelatihan/summary.actions";

const DetailSummary = dynamic(
  () =>
    import("../../../../components/content/pelatihan/training/view-list-peserta"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DetailSummaryPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailSummary token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, params }) => {
      const session = await getSession({ req });

      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getStatusPendaftar(session.user.user.data.token, params.id)
      );
      await store.dispatch(
        getAkademiByPelatihan(session.user.user.data.token, params.id)
      );
      await store.dispatch(
        getPendaftaranPeserta(session.user.user.data.token, params.id)
      );

      return {
        props: { session, title: "View List Peserta - Pelatihan" },
      };
    }
);