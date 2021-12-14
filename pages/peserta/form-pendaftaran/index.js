import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingContentFull from "../../../user-component-new/components/loader/LoadingContentFull";
import { useDispatch, useSelector } from "react-redux";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import {
	getFormBuilder,
	getPelatihan,
	getFormRegister,
	storeFormRegister,
} from "../../../redux/actions/pelatihan/register-training.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { getAllAkademi } from "../../../redux/actions/beranda/beranda.actions";
import { checkRegisterPelatihan } from "../../../redux/actions/beranda/detail-pelatihan.actions";

const IndexForm = dynamic(
	() =>
		import(
			"../../../user-component-new/content/peserta/form-pendaftaran/index-form"
		),
	{
		loading: function loadingNow() {
			return <LoadingContentFull />;
		},
		ssr: false,
	}
);
const Layout = dynamic(() =>
	import(
		"../../../user-component-new/components/template/Layout-peserta.component"
	)
);
export default function FormPendaftaran(props) {
	const dispatch = useDispatch();
	const session = props.session.user.user.data.user;
	const { error: errorFormBuilder, formBuilder: dataForm } = useSelector(
		(state) => state.getFormBuilder
	);
	useEffect(() => {
		let data = {
			komitmen: false,
			form_pendaftaran: [],
		};
		dataForm &&
			dataForm.FormBuilder.map((row, i) => {
				data.form_pendaftaran.push({
					key: row.key,
					name: row.name,
					type: row.element,
					size: row.size,
					option: row.option,
					dataOption: row.dataOption,
					required: row.required,
					fileName: "",
					value: "",
				});
			});
		dispatch(storeFormRegister(data));
	}, [dataForm, dispatch]);
	return (
		<>
			<IndexForm token={session.token} session={session} />
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ query, req }) => {
			const session = await getSession({ req });
			const middleware = middlewareAuthPesertaSession(session);

			if (!middleware.status) {
				//check
				return {
					redirect: {
						destination: middleware.redirect,
						permanent: false,
					},
				};
			}
			await store.dispatch(getAllAkademi());

			await store.dispatch(getDataPribadi(session?.user.user.data.user.token));
			await store.dispatch(
				getFormBuilder(session?.user.user.data.user.token, query.id)
			);
			const dataPelatihan = await store.dispatch(
				getPelatihan(session?.user.user.data.user.token, query.id)
			);

			// const check = await store.dispatch(
			// 	checkRegisterPelatihan(
			// 		dataPelatihan?.data?.id,
			// 		session?.user.user.data.user.token
			// 	)
			// );

			// if (!check.status) {
			// 	return {
			// 		redirect: {
			// 			destination: process.env.PATH_URL + "/peserta",
			// 			permanent: false,
			// 		},
			// 	};
			// }

			return {
				props: {
					data: "auth",
					session,
					title: "Form Pendaftaran Peserta - Pelatihan",
				},
			};
		}
);
