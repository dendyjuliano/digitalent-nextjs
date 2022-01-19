import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

const IndexInsert = dynamic(
  () =>
    import(
      "../../../../components/content/pelatihan/training/insert/index-insert"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

import {
  getTrainingStep1,
  getRegistrationStep2,
  getCommitmentStep3,
  dropdownAkademi,
  dropdownTema,
  dropdownLevelPelatihan,
  dropdownMitra,
  dropdownZonasi,
  dropdownProvinsi,
  drowpdownFormBuilder,
  dropdownPenyelenggara,
} from "../../../../redux/actions/pelatihan/function.actions";
import { getAllDataReference } from "../../../../redux/actions/site-management/data-reference.actions";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function AddTrainingPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <IndexInsert token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      const middleware = middlewareAuthAdminSession(session);
      const token_permission = req.cookies.token_permission;
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(getTrainingStep1());
      await store.dispatch(getRegistrationStep2());
      await store.dispatch(getCommitmentStep3());
      await store.dispatch(dropdownAkademi(session.user.user.data.token));
      await store.dispatch(dropdownTema(session.user.user.data.token));
      await store.dispatch(
        dropdownLevelPelatihan(session.user.user.data.token)
      );
      await store.dispatch(dropdownMitra(session.user.user.data.token));
      await store.dispatch(dropdownZonasi(session.user.user.data.token));
      await store.dispatch(dropdownProvinsi(session.user.user.data.token));
      await store.dispatch(dropdownPenyelenggara(session.user.user.data.token));
      await store.dispatch(drowpdownFormBuilder(session.user.user.data.token));
      await store.dispatch(
        getAllDataReference(
          session.user.user.data.token,
          true,
          token_permission
        )
      );

      return {
        props: { session, title: "Tambah Pelatihan - Pelatihan" },
      };
    }
);
