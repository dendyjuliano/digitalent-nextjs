import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListAcademy from "../../../components/content/pelatihan/academy/list-academy";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function ListAcademyPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListAcademy />
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
        props: { session, title: "List Akademi - Pelatihan" },
      };
    }
);
