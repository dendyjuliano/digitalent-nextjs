import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
// import EditTheme from "../../../components/content/pelatihan/theme/edit-theme";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getDetailTheme } from "../../../redux/actions/pelatihan/theme.actions";
import { dropdownAkademi } from "../../../redux/actions/pelatihan/function.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

const EditTheme = dynamic(
	() => import("../../../components/content/pelatihan/theme/edit-theme"),
	{
		loading: function loadingNow() {
			return <LoadingSkeleton />;
		},
		ssr: false,
	}
);

export default function EditThemePage(props) {
	const session = props.session.user.user.data;
	return (
		<>
			<div className="d-flex flex-column flex-root">
				<EditTheme token={session.token} />
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
				getDetailTheme(query.id, session.user.user.data.token, token_permission)
			);
			await store.dispatch(dropdownAkademi(session.user.user.data.token));

			return {
				props: { session, title: "Edit Theme - Pelatihan" },
			};
		}
);
