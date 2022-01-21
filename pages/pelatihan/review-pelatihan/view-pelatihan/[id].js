import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

import {
	getListRevisi,
	getReviewStep1Revisi,
} from "../../../../redux/actions/pelatihan/review.actions";

const ViewReviewTraining = dynamic(
	() =>
		import(
			"../../../../components/content/pelatihan/review/view/view-data-training"
		),
	{
		loading: function loadingNow() {
			return <LoadingSkeleton />;
		},
		ssr: false,
	}
);

export default function ViewReviewTrainingPage(props) {
	const session = props.session.user.user.data;
	return (
		<>
			<div className="d-flex flex-column flex-root">
				<ViewReviewTraining token={session.token} />
			</div>
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ query, req, params }) => {
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
				getListRevisi(session.user.user.data.token, params.id, token_permission)
			);
			await store.dispatch(
				getReviewStep1Revisi(
					session.user.user.data.token,
					params.id,
					token_permission
				)
			);

			return {
				props: { session, title: "View Data Pelatihan - Pelatihan" },
			};
		}
);
