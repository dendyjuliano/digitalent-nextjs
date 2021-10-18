import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
const SubmitKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/user/kerjasama/submitKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function DetailKerjasamaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <SubmitKerjasama token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination:
              "http://dts-dev.majapahit.id/partnership/user/auth/login",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Submit Kerjsama - Partnership" },
      };
    }
);
