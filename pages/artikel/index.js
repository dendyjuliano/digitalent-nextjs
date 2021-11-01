import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions"

const Artikel  =  dynamic (() => 
    import (
        "../../user-component/content/beranda/artikel"
    )
)

const Layout = dynamic (() => 
    import (
        "../../user-component/content/wrapper/layout.wrapper"
    )
)

export default function BerandaArtikel(props) {
    let session = null;

    if (props.session) {
        session = props.session.user.user.data.user;
    }

    return (
        <>
            <Layout title="Artikel" session={session}>
                <Artikel session={session} ></Artikel>
            </Layout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    ( store ) => 
        async ({params, req}) => {
            const session = await getSession({ req });

            let sessionToken = session?.user.user.data.user.token;

            await store.dispatch(getDataPribadi(sessionToken));

            return {
                props: {
                  title: "Artikel",
                  data: "auth",
                  session,
                },
            };
        }
)
