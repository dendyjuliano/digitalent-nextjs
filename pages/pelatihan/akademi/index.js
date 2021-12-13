import React from "react";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getAllAcademy } from "../../../redux/actions/pelatihan/academy.actions";
import { getSidebar } from "../../../redux/actions/site-management/role.actions";
import { getBeasiswaPendaftarWilayah } from "../../../redux/actions/dashboard-kabadan/dashboard/beasiswa.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getAllPermission } from "../../../redux/actions/utils/utils.actions";

const ListAcademy = dynamic(
	() => import("../../../components/content/pelatihan/academy/list-academy"),
	{
		loading: function loadingNow() {
			return <LoadingSkeleton />;
		},
		ssr: false,
	}
);

export default function ListAcademyPage(props) {
	const session = props.session.user.user.data;
	return (
		<>
			<div className="d-flex flex-column flex-root">
				<ListAcademy token={session.token} />
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
			const token_permission = req.cookies.token_permission;

			await store.dispatch(
				getAllAcademy(
					query.page,
					query.keyword,
					query.limit,
					session.user.user.data.token,
					token_permission
				)
			);

			await store.dispatch(
				getBeasiswaPendaftarWilayah(session.user.user.data.token)
			);

			await store.dispatch(getAllPermission(session.user.user.data.token));

			return {
				props: { session, title: "List Akademi - Pelatihan" },
			};
		}
);
