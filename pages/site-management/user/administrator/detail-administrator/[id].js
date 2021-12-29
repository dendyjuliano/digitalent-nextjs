import React from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";
import { getDetailAdminSite, getEditAdminSite } from "../../../../../redux/actions/site-management/user/admin-site.action";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

const DetailAdmin = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/user/administrator/detail-administrator"
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
        <DetailAdmin token={session.token} />
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
      //   getDetailAdminSite(query.id, session.user.user.data.token)
      // );
      await store.dispatch(
        getDetailAdminSite(query.id, session.user.user.data.token, req.cookies.token_permission)
      );

      return {
        props: {
          session,
          title: "Detail data administrator - Site Management",
        },
      };
    }
);
