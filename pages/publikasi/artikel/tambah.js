import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

// import Layout from "../../../components/templates/layout.component";
// import Tambah from "../../../components/content/publikasi/artikel/tambah";

import { getAllKategori } from '../../../redux/actions/publikasi/kategori.actions'
import { wrapper } from '../../../redux/store'

import LoadingPage from "../../../components/LoadingPage";

const Tambah = dynamic(
    () => import("../../../components/content/publikasi/artikel/tambah"),
    { 
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow () {return <LoadingPage /> }, 
        ssr: false
    }
);

export default function TambahPage(props) {
    const session = props.session.user.user.data;
    // console.log (session)
    return (
        <>
            <div className="d-flex flex-column flex-root">
                {/* <Layout title='Tambah Artikel - Publikasi'>
                    <Tambah />
                </Layout> */}
                <Tambah token={session.token}/>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params, req }) => {
    
    const session = await getSession({ req });
    console.log (`from artikel create ${session}`)

    if (!session) {
        return {
            redirect: {
            destination: "/",
            permanent: false,
            },
        };
    }
    await store.dispatch(getAllKategori(session.user.user.data.token))

    return {
        props: { session, title: "Tambah Artikel - Publikasi" },
    };
})

// export default function TambahPage() {
//     return (
//         <>
//             <div className="d-flex flex-column flex-root">
//                 <Layout title='Tambah Artikel - Publikasi'>
//                     <Tambah />
//                 </Layout>
//             </div>
//         </>
//     )
// }