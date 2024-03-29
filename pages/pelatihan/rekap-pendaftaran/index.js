import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
// import ListSummary from "../../../components/content/pelatihan/summary/list-summary";
import { getAllSummary } from "../../../redux/actions/pelatihan/summary.actions";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import {
  dropdownAkademi,
  dropdownTema,
  dropdownPenyelenggara,
} from "../../../redux/actions/pelatihan/function.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getAllPermission } from "../../../redux/actions/utils/utils.actions";

const ListSummary = dynamic(
  () => import("../../../components/content/pelatihan/summary/list-summary"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ListSummaryPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListSummary token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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
      const token_permission = req.cookies.token_permission;

      await store.dispatch(
        getAllSummary(
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          session.user.user.data.token,
          token_permission
        )
      );

      await store.dispatch(
        dropdownAkademi(session.user.user.data.token, token_permission)
      );
      await store.dispatch(
        dropdownTema(session.user.user.data.token, token_permission)
      );
      await store.dispatch(
        dropdownPenyelenggara(session.user.user.data.token, token_permission)
      );
      await store.dispatch(getAllPermission(session.user.user.data.token));

      return {
        props: { session, title: "List Rekap Pendaftaran - Pelatihan" },
      };
    }
);
