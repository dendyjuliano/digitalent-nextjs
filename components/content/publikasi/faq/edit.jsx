import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from "simple-react-validator"
import Swal from 'sweetalert2'
import moment from "moment";
import DatePicker from 'react-datepicker'

import styles from "../../../../styles/previewGaleri.module.css";

import { updateFaq, clearErrors } from '../../../../redux/actions/publikasi/faq.actions'
import { UPDATE_FAQ_RESET } from '../../../../redux/types/publikasi/faq.type'
import { getAllKategori } from '../../../../redux/actions/publikasi/kategori.actions'

import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';
import Cookies from 'js-cookie'

import "../../../../styles/publikasi.module.css"

const EditFaq = ({ token }) => {
    const editorRef = useRef();
    const dispatch = useDispatch()
    const router = useRouter()
    const permission = Cookies.get("token_permission")

    const importSwitch = () => import('bootstrap-switch-button-react')
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor, Base64UploadAdapter } =
        editorRef.current || {};
    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

    const { loading, error, isUpdated } = useSelector(state => state.updateFaq)
    const { faq } = useSelector(state => state.detailFaq)
    const { loading: allLoading, error: allError, kategori } = useSelector(state => state.allKategori)
    const { role_permission } = useSelector((state) => state.allRolePermission);
    const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

    useEffect(() => {

        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        };

        setEditorLoaded(true);
        if (isUpdated) {
            router.push({
                pathname: `/publikasi/faq`,
                query: { success: true },
            });
        }
    }, [dispatch, error, isUpdated, simpleValidator, router]);

    useEffect(() => {
        if (isUpdated) {
            dispatch({
                type: UPDATE_FAQ_RESET
            })
            router.push({
                pathname: `/publikasi/faq`,
                query: { success: true },
            });
        }

    }, [dispatch, error, isUpdated, router]);


    const [judul, setJudulPertanyaan] = useState(faq?.judul)
    const [jawaban, setJawaban] = useState(faq?.jawaban);
    const [kategori_id, setKategoriId] = useState(faq?.kategori_id)
    const [users_id, setUsersId] = useState(faq?.users_id)
    const [pinned, setPinnedFaq] = useState(faq?.pinned)
    const [publish, setPublish] = useState(faq?.publish)
    const [publishDate, setPublishDate] = useState(faq?.tanggal_publish ? new Date(faq?.tanggal_publish) : null);
    const [disablePublishDate, setDisablePublishDate] = useState(faq?.publish === 0 ? true : false)
    const [, forceUpdate] = useState();

    const handleChangePinned = (e) => {
        setPinnedFaq(e.target.checked);

    };

    const handleChangePublish = (e) => {
        setDisablePublishDate(!disablePublishDate)
        setPublishDate(null)

        if (e.target.checked === false) {
            setPublishDate(null)
            setPublish(0)
        } else {
            setPublish(1)
        }
    };

    const handlePublishDate = (date) => {
        if (disablePublishDate === false) {
            setPublishDate(date)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (simpleValidator.current.allValid()) {
            if (error) {
                dispatch(clearErrors())
            }

            if (publish === true) {
                setPublish(1)

            } else if (publish === false) {
                setPublish(0)

            }

            if (pinned === true) {
                setPinnedFaq(1)

            } else if (pinned === false) {
                setPinnedFaq(0)

            }

            if (publishDate === null) {
                let today = new Date

                const data = {
                    kategori_id,
                    judul,
                    jawaban,
                    users_id,
                    publish,
                    pinned,
                    _method: 'put',
                    tanggal_publish: moment(today).format("YYYY-MM-DD")
                }
                Swal.fire({
                    title: "Apakah anda yakin ?",
                    text: "Data ini akan diedit !",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ya !",
                    cancelButtonText: "Batal",
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            dispatch(updateFaq(data, faq.id, token, permission))
                        }
                    });

            } else {
                const data = {
                    kategori_id,
                    judul,
                    jawaban,
                    users_id,
                    publish,
                    pinned,
                    _method: 'put',
                    tanggal_publish: moment(publishDate).format("YYYY-MM-DD")
                }
                Swal.fire({
                    title: "Apakah anda yakin ?",
                    text: "Data ini akan diedit !",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ya !",
                    cancelButtonText: "Batal",
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            dispatch(updateFaq(data, faq.id, token, permission))
                        }
                    });
            }

        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
            // forceUpdate;
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Isi data dengan benar !",
            });
        }
    }

    return (
        <PageWrapper>
            {error ?
                <div className="alert alert-custom alert-light-danger fade show mb-5" role="alert">
                    <div className="alert-icon"><i className="flaticon-warning"></i></div>
                    <div className="alert-text">{error}</div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true"><i className="ki ki-close"></i></span>
                        </button>
                    </div>
                </div>
                : ''
            }

            <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
                {loading ? <LoadingPage loading={loading} /> : ""}
                {
                    faq ?
                        <div className="card card-custom card-stretch gutter-b">
                            <div className="card-header">
                                <h3 className="col-sm-4 card-title font-weight-bolder text-dark">Ubah FAQ</h3>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label font-weight-bolder">Judul Pertanyaan</label>
                                        <div className={`${styles.judulTambah} col-sm-12`}>
                                            <input
                                                type="text"
                                                className={`${styles.judulTambah} form-control`}
                                                placeholder="Isi Judul disini"
                                                value={judul}
                                                onChange={(e) => setJudulPertanyaan(e.target.value)}
                                                onBlur={() => simpleValidator.current.showMessageFor("judul pertanyaan")}
                                            />
                                            {simpleValidator.current.message("judul pertanyaan", judul, "required|min:5|max:200", { className: "text-danger" })}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Jawaban</label>
                                        <div className={`col-sm-12`}>
                                            <div className="ckeditor">
                                                {editorLoaded ? (
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={jawaban}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            setJawaban(data);
                                                        }}
                                                        onBlur={() =>
                                                            simpleValidator.current.showMessageFor(
                                                                "jawaban"
                                                            )
                                                        }
                                                        config={{
                                                            placeholder: "Tulis Deskripsi",
                                                        }}
                                                    />

                                                ) : (
                                                    <p>Tunggu Sebentar</p>
                                                )}
                                                <div className={`${styles.validFaq}`}>
                                                    {simpleValidator.current.message(
                                                        "jawaban",
                                                        jawaban,
                                                        "required|min:100|max:7000",
                                                        { className: "text-danger" }
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Kategori</label>
                                        <div className={`${styles.selectKategori} col-sm-12`}>
                                            <select
                                                className={`${styles.selectKategori} form-control`}
                                                value={kategori_id}
                                                onChange={e => setKategoriId(e.target.value)}
                                                onBlur={e => { setKategoriId(e.target.value); simpleValidator.current.showMessageFor("kategori") }}
                                            >
                                                <option value="" disabled selected>-- FAQ --</option>
                                                {!kategori || (kategori && kategori.length === 0) ? (
                                                    <option value="">Data Kosong</option>
                                                ) : (
                                                    kategori &&
                                                    kategori?.kategori &&
                                                    kategori?.kategori?.map((row) => {
                                                        return (
                                                            row.jenis_kategori == "Faq" ?
                                                                <option key={row.id} value={row.id} selected={kategori_id === row.id ? true : false}>
                                                                    {row.nama_kategori}
                                                                </option>
                                                                :
                                                                null
                                                        );
                                                    })
                                                )}
                                            </select>
                                            {simpleValidator.current.message("kategori", kategori_id, "required", { className: "text-danger" })}
                                        </div>
                                    </div>

                                    {
                                        role_permission.roles.includes("Super Admin") ?
                                            <div className="form-group row">
                                                <label
                                                    htmlFor="staticEmail"
                                                    className="ml-5 pl-4 font-weight-bolder"
                                                >
                                                    Publish
                                                </label>
                                                <div className="col-sm-1 ml-4">
                                                    <div className="">
                                                        <label className="switches">
                                                            <input
                                                                // required
                                                                className="checkbox"
                                                                checked={publish}
                                                                type="checkbox"
                                                                onChange={(e) => handleChangePublish(e)}
                                                            />
                                                            <span
                                                                className={`sliders round ${pinned ? "text-white" : "pl-2"
                                                                    }`}
                                                            >
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                    }

                                    {
                                        role_permission?.roles.includes("Super Admin") ?
                                            disablePublishDate === false ?
                                                <div className="form-group">
                                                    <label className='col-sm-5 col-form-label font-weight-bolder'>Set Tanggal Publish</label>
                                                    <div className="col-sm-12">
                                                        <div className="input-group">
                                                            <DatePicker
                                                                className={`${styles.setPublish} form-search-date form-control-sm form-control`}
                                                                selected={publishDate}
                                                                onChange={(date) => handlePublishDate(date)}
                                                                selectsStart
                                                                startDate={publishDate}
                                                                dateFormat="dd/MM/yyyy"
                                                                placeholderText="Silahkan Isi Tanggal Publish"
                                                                wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                                disabled={disablePublishDate === true || disablePublishDate === null}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                null : null
                                    }

                                    <div className="form-group row">
                                        <label
                                            htmlFor="staticEmail"
                                            className="ml-5 pl-4 font-weight-bolder"
                                        >
                                            Pin FAQ
                                        </label>
                                        <div className="col-sm-1 ml-4">
                                            <div className="">
                                                <label className="switches">
                                                    <input
                                                        // required
                                                        className="checkbox"
                                                        checked={pinned}
                                                        type="checkbox"
                                                        onChange={(e) => handleChangePinned(e)}
                                                    />
                                                    <span
                                                        className={`sliders round ${publish ? "text-white" : "pl-2"
                                                            }`}
                                                    >
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row mr-0">
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-10 text-right">
                                            <Link href='/publikasi/faq'>
                                                <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm`}>Kembali</a>
                                            </Link>
                                            <button onClick={onSubmit} className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill btn-sm`}>Simpan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }

            </div>
        </PageWrapper>
    )
}

export default EditFaq