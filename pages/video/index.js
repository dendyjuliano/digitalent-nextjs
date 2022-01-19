import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";

import {
  getAllVideoContent,
  getTagVideo,
  getKategoriVideoContent,
} from "../../redux/actions/beranda/video-content.actions";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";
import LoadingDetailAkademi from "../../user-component-new/components/loader/LoadingDetailAkademi";

const VideoPage = dynamic(() =>
  import("../../user-component-new/content/home/video/videoPage"),
  {
    loading: function loadingNow() {
      return <LoadingDetailAkademi />;
    },
    ssr: false,
  }
);
const Layout = dynamic(() =>
  import("../../user-component-new/components/template/Layout.component")
);

export default function VideoDetail(props) {
  let session = null;
  if (props.session) {
    session = props.session.user.user.data.user;
  }
  return (
    <div className="bg-white">
      <Layout title="Video" session={session}>
        <VideoPage session={session} />
      </Layout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      await store.dispatch(getDataPribadi(session?.user.user.data.user.token));
      await store.dispatch(
        getAllVideoContent(
          query.page,
          query.keyword,
          query.limit,
          query.filterPublish,
          query.sort,
          query.category_id,
          query.category_name,
          query.tag
        )
      );
      await store.dispatch(getTagVideo());
      await store.dispatch(getKategoriVideoContent());
      return {
        props: {
          session,
          data: "auth",
          title: "Video",
        },
      };
    }
);
