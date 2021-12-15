import React from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getAllDataReference } from "../../../redux/actions/site-management/data-reference.actions";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

const ListRole = dynamic(
  () =>
    import(
      "../../../components/content/site-management/data-refrence/list-data-refrence"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function RoleList(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListRole token={session.token} />
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

      // await store.dispatch(
      //   getAllRoles(
      //     query.page,
      //     query.keyword,
      //     query.limit,
      //     session.user.user.data.token
      //   )
      // );
      await store.dispatch(getAllDataReference(session.user.user.data.token));
      return {
        props: { session, title: "List Refrence - Site Management" },
      };
    }
);
