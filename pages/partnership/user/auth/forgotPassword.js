import ForgotPassword from "../../../../components/content/partnership/user/auth/ForgotPassword";
import { getSession } from "next-auth/client";

export default function ForgotPasswordMitra() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ForgotPassword />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: "auth",
      title: "Lupa Password - Partnership",
    },
  };
}