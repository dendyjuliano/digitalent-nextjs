import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { getDetailRoles } from "../../../../redux/actions/site-management/role.actions";
import { wrapper } from "../../../../redux/store";
import LoadingPage from "../../../../components/LoadingPage";

const UbahRole = dynamic(
  () => import("../../../../components/content/site-management/role/ubah-role"),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function UbahRoles(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <UbahRole token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      await store.dispatch(getDetailRoles(query.id, session.user.user.data.token));
      return {
        props: { session, title: "Ubah Role - Site Management" },
      };
    }
);