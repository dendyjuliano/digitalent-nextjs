import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import EditCommitment from "../../../../../components/content/pelatihan/training/edit/edit-commitment-step3";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

export default function EditCommitmentPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditCommitment />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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
        props: { session, title: "Edit Form Komitmen - Pelatihan" },
      };
    }
);