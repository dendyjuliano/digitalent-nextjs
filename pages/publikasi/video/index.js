import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

// import Layout from "../../../components/templates/layout.component";
// import Vidio from "../../../components/content/publikasi/vidio/vidio";

import { filterCard, getAllVideo } from "../../../redux/actions/publikasi/video.actions";
import { wrapper } from "../../../redux/store";

// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const Vidio = dynamic(
  () => import("../../../components/content/publikasi/vidio/vidio"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function VidioPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title='Video - Publikasi'>
                    <Vidio />
                </Layout> */}
        <Vidio token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      // await store.dispatch(getAllArtikel(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
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

      await store.dispatch(
        getAllVideo(
          query.page,
          query.keyword,
          query.limit,
          query.publish,
          query.startdate,
          query.enddate,
          session.user.user.data.token
        )
      );
      // await store.dispatch(filterCard(session.user.user.data.token))
      // await store.dispatch(getAllKategori(session.user.user.data.token))
      return {
        props: { session, title: "Video - Publikasi" },
      };
    }
);

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
//     await store.dispatch(getAllVideo(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
// })
