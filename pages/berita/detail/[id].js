import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../../redux/store";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions"
import { getDetailBerandaBerita, getKategoriBerandaBerita,  getTagBerandaBerita} from "../../../redux/actions/beranda/berita.actions"
import LoadingDetailAkademi from "../../../user-component-new/components/loader/LoadingDetailAkademi";

const DetailBerita = dynamic (() => 
    import (
        "../../../user-component-new/content/home/detail-berita/detail-berita"
    ),
    {
      loading: function loadingNow() {
        return <LoadingDetailAkademi />;
      },
      ssr: false,
    }
)

const Layout = dynamic (() =>
    import (
        "../../../user-component-new/components/template/Layout.component"
    )
)

export default function BerandaDetailBerita(props) {
    let session = null;

    if (props.session) {
        session = props.session.user.user.data.user;
    }

    return (
        <div className="bg-white">
            <Layout title="Detail Berita" session={session}>
              <DetailBerita session={session} />  
            </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    ( store ) => 
        async ({params, req}) => {
            const session = await getSession({ req });

            let sessionToken = session?.user.user.data.user.token;

            await store.dispatch(getDataPribadi(sessionToken));

            await store.dispatch(
                getDetailBerandaBerita(params.id)
            )

            await store.dispatch (
                getKategoriBerandaBerita()
            )

            await store.dispatch(
                getTagBerandaBerita()
            )

            return {
                props: {
                  title: "Detail Berita",
                  data: "auth",
                  session,
                },
            };
        }
)