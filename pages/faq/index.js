import { getSession } from "next-auth/client"
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";

import { getAllFaq } from "../../redux/actions/beranda/faq-content.actions"

const FaqPage = dynamic(
    () => import("../../user-component-new/content/home/faq/faq")
)

const Layout = dynamic(
    () => import("../../user-component-new/components/template/Layout.component")
)

export default function FaqDetail(props) {
    let session = null;
    if (props.session) {
        session = props.session.user.user.data.Token
    }
    return (
        <div>
            <Layout title="FAQ" token={session}>
                <FaqPage token={session} />
            </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req }) => {
            const session = await getSession({ req })

            await store.dispatch(getAllFaq());
            return {
                props: {
                    session,
                    data: "auth",
                    title: "FAQ"
                }
            }
        }
)
