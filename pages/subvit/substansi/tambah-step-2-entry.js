import dynamic from "next/dynamic";
// import StepTwo from "/components/content/subvit/substansi/tambah/step-2-entry";

import { getAllSubtanceQuestionBanksType } from "../../../redux/actions/subvit/subtance-question-type.actions";
import { getOneSubtanceQuestionBanks } from "../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const StepTwo = dynamic(
  () => import("/components/content/subvit/substansi/tambah/step-2-entry"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function TambahBankSoalTesSubstansiStep2(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepTwo token={session.token} tokenPermission={props.permission} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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

      const permission = req.cookies.token_permission;

      await store.dispatch(
        getAllSubtanceQuestionBanksType(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token,
          permission
        )
      );
      await store.dispatch(
        getOneSubtanceQuestionBanks(
          query.id,
          session.user.user.data.token,
          permission
        )
      );

      return {
        props: {
          session,
          title: "Tambah Bank Soal Test Substansi - Subvit",
          permission,
        },
      };
    }
);
