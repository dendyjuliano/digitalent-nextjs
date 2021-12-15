import React from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { getAllListsPeserta } from "../../../../redux/actions/site-management/user/peserta-dts";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

const ListUser = dynamic(
  () =>
    import(
      "../../../../components/content/site-management/user/peserta-dts/list-peserta"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function UserList(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListUser token={session.token} />
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

      await store.dispatch(getAllListsPeserta(session.user.user.data.token));

      return {
        props: { session, title: "List User Peserta DTS - Site Management" },
      };
    }
);
