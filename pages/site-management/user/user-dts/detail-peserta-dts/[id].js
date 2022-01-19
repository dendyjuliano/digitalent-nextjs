import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../../redux/store";
import {getDetailPesertaManage, getPelatihanByPeserta, getPelatihanWithPagination} from '../../../../../redux/actions/site-management/user/peserta-dts'
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

const PageDetail = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/user/peserta-dts/detail-peserta-dts"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function DetailPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <PageDetail token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
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
          getDetailPesertaManage(
            session.user.user.data.token,
            query.id,
            req.cookies.token_permission
          )
        );

        await store.dispatch(
          getPelatihanByPeserta(
            session.user.user.data.token,
            query.id,
            req.cookies.token_permission
          )
        );

        await store.dispatch(
          getPelatihanWithPagination(
            session.user.user.data.token,
            query.id,
            null,
            null,
            null,
            req.cookies.token_permission
          )
        );

      return {
        props: {
          session,
          title: "Detail Peserta DTS - Site Management",
        },
      };
    }
);
