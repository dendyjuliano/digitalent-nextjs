import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getDetailSertifikat } from "../../../redux/actions/sertifikat/kelola-sertifikat.action";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getDetailPelatihan } from "../../../redux/actions/beranda/detail-pelatihan.actions";

const AddSertifikat = dynamic(
	() =>
		import(
			"../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/id/add-sertifikat"
		),
	{
		loading: function loadingNow() {
			return <LoadingSkeleton />;
		},
		ssr: false,
	}
);

export default function AddSertifikatPage(props) {
	const session = props.session.user.user.data;

	return (
		<>
			<div className="d-flex flex-column flex-root">
				<AddSertifikat token={session} />
			</div>
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ query, req }) => {
			const session = await getSession({ req });

			// certificate builder pake theme id
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
				getDetailSertifikat(
					query.theme_id,
					query.page,
					query.keyword,
					100,
					query.status,
					session.user.user.data.token
				)
			);

			const data = await store.dispatch(
				getDetailPelatihan(query.id, session?.token, "sertifikat")
			);

			return {
				props: { session, title: "Certificate Builder - Sertifikat" },
			};
		}
);
