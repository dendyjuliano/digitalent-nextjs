import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";
// import DashboardSimonas from "../../components/content/dashboard-kabadan/simonas/dashboard-simonas";
import {
  getSimonasCompanyTotal,
  getSimonasProjectTotal,
  getSimonasCompanyAmount,
  getSimonasProjectAmount,
  getSimonasApplierTotal,
  getSimonasApplierTotalActive,
  getSimonasApplierAmountJob,
  getSimonasApplierAmountProject,
  getSimonasApplierAge,
  getSimonasApplierGender,
  getSimonasApplierEducationJob,
  getSimonasApplierEducationProject,
  getSimonasRegionApplier,
  getSimonasFilterYear,
  getSimonasFilterStatus,
  getSimonasProvinsiApplier,
  getSimonasProvinsiApplierRequired,
} from "../../redux/actions/dashboard-kabadan/dashboard/simonas.actions";
import { getDigitalentTotalPengguna } from "../../redux/actions/dashboard-kabadan/dashboard/digitalent.actions";
import LoadingSkeleton from "../../components/LoadingSkeleton";

export default function DashboardSimonasPage(props) {
  const DashboardSimonas = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/simonas/dashboard-simonas"
      ),
    {
      loading: function loadingNow() {
        return <LoadingSkeleton />;
      },
      ssr: false,
    }
  );
  const MyMap = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/component/map-simonas.component"
      ),
    { ssr: false }
  );
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div id="map" style={{ display: "none" }}>
          <MyMap />
        </div>
        <DashboardSimonas token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      const middleware = middlewareAuthAdminSession(session);
      const token_permission = req.cookies.token_permission;
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDigitalentTotalPengguna(
          session.user.user.data.token,
          token_permission
        )
      );

      await store.dispatch(
        getSimonasCompanyTotal(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasProjectTotal(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasCompanyAmount(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasProjectAmount(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierTotal(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierTotalActive(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierAmountJob(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierAmountProject(session.user.user.data.token)
      );
      await store.dispatch(getSimonasApplierAge(session.user.user.data.token));
      await store.dispatch(
        getSimonasApplierGender(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierEducationJob(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasApplierEducationProject(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasRegionApplier(session.user.user.data.token)
      );
      await store.dispatch(getSimonasFilterYear(session.user.user.data.token));
      await store.dispatch(
        getSimonasFilterStatus(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasProvinsiApplier(session.user.user.data.token)
      );
      await store.dispatch(
        getSimonasProvinsiApplierRequired(session.user.user.data.token)
      );

      return {
        props: { session, title: "Dashboard - Simonas" },
      };
    }
);
