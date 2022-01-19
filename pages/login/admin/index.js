import dynamic from "next/dynamic";
// import LoginAdmin from "../../../components/content/auth/admin/login";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const LoginAdmin = dynamic(
  () => import("../../../components/content/auth/admin/login"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function LoginAdminPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <LoginAdmin />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    const data = session.user.user.data;

    if (data.user.roles[0] === "user") {
      return {
        redirect: {
          destination: "/peserta",
          permanent: false,
        },
      };
    }
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: "auth",
    },
  };
}
