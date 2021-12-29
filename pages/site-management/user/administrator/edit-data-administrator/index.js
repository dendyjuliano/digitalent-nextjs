import React from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";
import {
  getDetailAdminSite,
  getListRoles,
  getListUnitWorks,
  getListAcademy,
  getAllListPelatihan,
  getEditAdminSite,
} from "../../../../../redux/actions/site-management/user/admin-site.action";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

const ListUser = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/user/administrator/edit-data-administrator"
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
    async ({ params, req, query }) => {
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

      await store.dispatch(getListRoles(session.user.user.data.token));
      await store.dispatch(getAllListPelatihan(session.user.user.data.token));
      await store.dispatch(getListUnitWorks(session.user.user.data.token));
      await store.dispatch(getListAcademy(session.user.user.data.token));
      // await store.dispatch(
      //   getDetailAdminSite(query.id, session.user.user.data.token)
      // );
      await store.dispatch(
<<<<<<< HEAD
        getDetailAdminSite(query.id, session.user.user.data.token, req.cookies.token_permission)
=======
        getEditAdminSite(query.id, session.user.user.data.token)
>>>>>>> e2501ad03ffd611af2845cd2cbb4bd4ecc585293
      );

      return {
        props: {
          session,
          title: "Edit data administrator - Site Management",
        },
      };
    }
);
