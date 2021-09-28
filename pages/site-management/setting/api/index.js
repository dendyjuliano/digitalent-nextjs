import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const API = dynamic(
  () => import("../../../../components/content/site-management/settings/api"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ArtikelPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <API token={session.token} />
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

      // await store.dispatch(
      //   getAllArtikel(
      //     query.page,
      //     query.keyword,
      //     query.limit,
      //     query.publish,
      //     query.startdate,
      //     query.enddate,
      //     session.user.user.data.token
      //   )
      // );
      return {
        props: { session, title: "API - Site Management" },
      };
    }
);