import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
const EditDetailKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/kerjasama/editDokumentKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function editDokumenKerjasama(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditDetailKerjasama token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req }) => {
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
      // if (!session) {
      //   return {
      //     redirect: {
      //       destination: "http://dts-dev.majapahit.id/login/admin",
      //       permanent: false,
      //     },
      //   };
      // }

      return {
        props: { session, title: "Ubah Kerjasama - Partnership" },
      };
    }
);
