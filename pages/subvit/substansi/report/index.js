import Layout from "/components/templates/layout.component";
import Report from "../../../../components/content/subvit/substansi/report";
import { allReportSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

export default function ReportPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Report token={session.token} tokenPermission={props.permission} />
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
      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      const permission = req.cookies.token_permission;

      await store.dispatch(
        allReportSubtanceQuestionBanks(
          query.id,
          query.page,
          query.keyword,
          query.limit,
          query.pelatihan,
          query.status,
          query.nilai,
          query.card,
          session.user.user.data.token,
          permission
        )
      );
      return {
        props: {
          session,
          title: "Report Bank Soal Test Substansi - Subvit",
          permission,
        },
      };
    }
);
