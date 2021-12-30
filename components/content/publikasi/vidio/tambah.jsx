import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import moment from "moment";
import { TagsInput } from "react-tag-input-component";
import DatePicker from 'react-datepicker'

import styles from "../../../../styles/previewGaleri.module.css";

import { newVideo, clearErrors } from '../../../../redux/actions/publikasi/video.actions'
import { NEW_VIDEO_RESET } from '../../../../redux/types/publikasi/video.type'
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';
import Cookies from 'js-cookie'

const TambahVidio = ({ token, id }) => {
    const editorRef = useRef()
    const dispatch = useDispatch()
    const router = useRouter();
    const permission = Cookies.get("token_permission")

    const importSwitch = () => import('bootstrap-switch-button-react')
    const [editorLoaded, setEditorLoaded] = useState(false)

    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })
    const simpleValidator = useRef(new SimpleReactValidator({
        locale: "id"
    }));
    const [, forceUpdate] = useState();

    const { loading, error, success } = useSelector(state => state.newVideo)
    const {
        loading: allLoading,
        error: allError,
        kategori,
    } = useSelector((state) => state.allKategori);
    const { setting } = useSelector(state => state.allSettingPublikasi)
    const { role_permission } = useSelector((state) => state.allRolePermission);

    useEffect(() => {
        if (success) {
            router.push({
                pathname: `/publikasi/video`,
                query: { success: true }
            })
        }

    }, [dispatch, error, success, router]);


    const [kategori_id, setKategoriId] = useState('')
    const [users_id, setUserId] = useState(id)
    const [judul_video, setJudulVideo] = useState('')
    const [isi_video, setIsiVideo] = useState('');
    const [url_video, setUrlVideo] = useState('')
    const [gambar, setGambar] = useState('')
    const [tag, setTag] = useState([])
    const [gambarPreview, setGambarPreview] = useState('/assets/media/default.jpg')
    const [iconPlus, setIconPlus] = useState(
        "/assets/icon/Add.svg"
    );
    const [gambarName, setGambarName] = useState(null)
    const [publish, setPublish] = useState(0)
    const [publishDate, setPublishDate] = useState(null);
    const [disablePublishDate, setDisablePublishDate] = useState(true)
    const [disableTag, setDisableTag] = useState(false)

    const onChangeGambar = (e) => {
        const type = ["image/jpg", "image/png", "image/jpeg"]

        if (type.includes(e.target.files[0].type)) {
            if (e.target.files[0].size > parseInt(setting[0].max_size) + '000000') {
                e.target.value = null;
                Swal.fire("Oops !", "Data Image Melebihi Ketentuan", "error");
            } else {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setGambar(reader.result);
                        setGambarPreview(reader.result);
                    }
                };
                reader.readAsDataURL(e.target.files[0])
                setGambarName(e.target.files[0].name)
            }
        }
    }

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    const handleTag = (data) => {
        for (let i = 0; i < data.length; i++) {
            if (hasWhiteSpace(data[i])) {
                data.splice([i], 1);
            }
        }
        setTag(data);
    }

    const handleChangePublish = (e) => {
        setDisablePublishDate(!disablePublishDate)

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
            if (success) {
                dispatch({
                    type: NEW_VIDEO_RESET
                })
            }

            if (publish === true) {
                setPublish(1)

            } else if (publish === false) {
                setPublish(0)

            }

            if (publishDate === null) {
                let today = new Date

                const data = {
                    kategori_id,
                    users_id,
                    judul_video,
                    isi_video,
                    url_video,
                    gambar,
                    tag,
                    publish,
                    tanggal_publish: moment(today).format("YYYY-MM-DD")
                }
                Swal.fire({
                    title: "Apakah anda yakin ?",
                    text: "Data ini akan ditambahkan !",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ya !",
                    cancelButtonText: "Batal",
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            dispatch(newVideo(data, token, permission))
                        }
                    });
            } else {

                const data = {
                    kategori_id,
                    users_id,
                    judul_video,
                    isi_video,
                    url_video,
                    gambar,
                    tag,
                    publish,
                    tanggal_publish: moment(publishDate).format("YYYY-MM-DD")
                }
                Swal.fire({
                    title: "Apakah anda yakin ?",
                    text: "Data ini akan ditambahkan !",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ya !",
                    cancelButtonText: "Batal",
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            dispatch(newVideo(data, token, permission))
                        }
                    });
            }

        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Isi data dengan benar !",
            });
        }

    }

    const onNewReset = () => {
        dispatch({ type: NEW_VIDEO_RESET })
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
                {
                    loading ?
                        <LoadingPage loading={loading} />
                        : ''
                }
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header">
                        <h3 className="col-sm-4 card-title font-weight-bolder text-dark">Tambah Video</h3>
                    </div>
                    <div className="card-body">
                        <div>
                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Judul</label>
                                <div className={`${styles.judulTambah} col-sm-12`}>
                                    <input type="text" className={`${styles.judulTambah} form-control`} placeholder="Masukkan Judul Disini" value={judul_video} onChange={(e) => setJudulVideo(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("judul_video")} />
                                    {simpleValidator.current.message(
                                        "judul_video",
                                        judul_video,
                                        "required|min:5|max:200",
                                        { className: "text-danger" }
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-4 col-form-label font-weight-bolder">Deskripsi Video</label>
                                <div className={`${styles.deskripsiTambah} col-sm-12`}>
                                    <textarea className={`${styles.deskripsiTambah} form-control`} placeholder='Tulis Deskripsi' name="deskripsi" id="" rows="10" onChange={e => setIsiVideo(e.target.value)} value={isi_video} onBlur={() => simpleValidator.current.showMessageFor("isi_video")}></textarea>
                                    {simpleValidator.current.message("isi_video", isi_video, "required|min:5|max:7000", { className: "text-danger" })}
                                </div>
                            </div>

                            <div className={`${styles.selectKategori} form-group`}>
                                <label
                                    htmlFor="staticEmail"
                                    className="col-sm-4 col-form-label font-weight-bolder"
                                >
                                    Upload Thumbnail
                                </label>
                                <div className="ml-4 row">
                                    <figure
                                        className="avatar item-rtl"
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter"
                                    >
                                        <Image
                                            src={gambarPreview}
                                            alt="image"
                                            width={160}
                                            height={160}
                                            objectFit="cover"
                                        />
                                    </figure>
                                    <div>
                                        <label htmlFor="inputGroupFile04" className="icon-plus">
                                            <Image
                                                src={iconPlus}
                                                alt="plus"
                                                width={60}
                                                height={60}
                                            />
                                        </label>

                                        <input
                                            type="file"
                                            name="gambar"
                                            className="custom-file-input"
                                            id="inputGroupFile04"
                                            onChange={onChangeGambar}
                                            accept="image/*"
                                            onBlur={() =>
                                                simpleValidator.current.showMessageFor("gambar")
                                            }
                                            style={{ display: "none" }}
                                        />
                                    </div>

                                </div>

                                <div className="ml-4">
                                    {simpleValidator.current.message(
                                        "gambar",
                                        gambar,
                                        "required",
                                        { className: "text-danger" }
                                    )}
                                    {
                                        gambarName !== null ?
                                            <small className="text-danger">{gambarName}</small>
                                            :
                                            null
                                    }
                                </div>

                                <div className={`${styles.resolusiTambah} mt-3 col-sm-6 col-md-6 col-lg-7 col-xl-3 text-muted`}>
                                    <p>
                                        Resolusi yang direkomendasikan adalah 394 * 260. Fokus visual pada bagian tengah gambar
                                    </p>

                                </div>

                            </div>

                            <div className="form-group">
                                <label className='col-sm-4 col-form-label font-weight-bolder'>Link URL Video</label>
                                <div className={`${styles.judulTambah} col-sm-12`}>
                                    <div className="input-group">
                                        <input type="text" className={`${styles.judulTambah} form-control`} value={url_video} onChange={e => setUrlVideo(e.target.value)} placeholder="https://www.example.com" onBlur={() => simpleValidator.current.showMessageFor("url video")} />

                                    </div>
                                    {simpleValidator.current.message(
                                        "url video",
                                        url_video,
                                        "required|url",
                                        { className: "text-danger" }
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="staticEmail"
                                    className="col-sm-2 col-form-label font-weight-bolder"
                                >
                                    Kategori
                                </label>
                                <div className={`${styles.selectKategori} col-sm-12`}>
                                    <select
                                        name=""
                                        id=""
                                        className={`${styles.selectKategori} form-control`}
                                        value={kategori_id}
                                        onChange={(e) => setKategoriId(e.target.value)}
                                        onBlur={(e) => {
                                            setKategoriId(e.target.value);
                                            simpleValidator.current.showMessageFor("kategori");
                                        }}
                                    >
                                        <option selected disabled value="">
                                            -- Video --
                                        </option>
                                        {!kategori || (kategori && kategori.length === 0) ? (
                                            <option value="">Data Kosong</option>
                                        ) : (
                                            kategori &&
                                            kategori?.kategori &&
                                            kategori?.kategori?.map((row) => {
                                                return (
                                                    row.jenis_kategori == "Video" ?
                                                        <option key={row.id} value={row.id}>
                                                            {row.nama_kategori}
                                                        </option>
                                                        :
                                                        null
                                                );
                                            })
                                        )}
                                    </select>
                                    {simpleValidator.current.message(
                                        "kategori",
                                        kategori_id,
                                        "required",
                                        { className: "text-danger" }
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Tag</label>
                                <div className={`${styles.tagStyle} col-sm-12`} style={{ wordBreak: 'break-word' }}>
                                    {/* <div>{tag}</div> */}
                                    <TagsInput
                                        value={tag}
                                        onChange={(data) => {
                                            handleTag(data)
                                            setDisableTag(false)
                                        }}
                                        onExisting={(data) => setDisableTag(true)}
                                        name="tag"
                                        placeHolder="Isi Tag disini dan Enter"
                                        seprators={["Enter", "Tab"]}
                                    // onBlur={() => simpleValidator.current.showMessageFor('tag')}
                                    />
                                    {
                                        (disableTag === true) ?
                                            <p className="text-danger">
                                                Tag tidak boleh sama
                                            </p>
                                            :
                                            null
                                    }
                                </div>
                            </div>

                            {
                                role_permission?.roles[0] !== "Super Admin" ? null
                                    :
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
                                                        className={`sliders round ${publish ? "text-white" : "pl-2"
                                                            }`}
                                                    >
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                            }

                            {
                                disablePublishDate === false ?
                                    <div className="form-group">
                                        <label className='col-sm-5 col-form-label font-weight-bolder'>Set Tanggal Publish</label>
                                        <div className="col-sm-12">
                                            <div className="input-group">
                                                <DatePicker
                                                    className={`${styles.setPublish} form-search-date form-control-sm form-control`}
                                                    selected={publishDate}
                                                    onChange={(date) => handlePublishDate(date)}
                                                    // onChange={(date) => setPublishDate(date)}
                                                    selectsStart
                                                    startDate={publishDate}
                                                    // endDate={endDate}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Silahkan Isi Tanggal Publish"
                                                    wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                    // minDate={moment().toDate()}
                                                    // minDate={addDays(new Date(), 20)}
                                                    disabled={disablePublishDate === true || disablePublishDate === null}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }



                            <div className="form-group row mr-0">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10 text-right">
                                    <Link href='/publikasi/video'>
                                        <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm`}>Kembali</a>
                                    </Link>
                                    <button onClick={onSubmit} className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill btn-sm`}>Simpan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Image Preview</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={`${styles.modalsPrevImage} modal-body text-center`}>
                            <Image
                                src={gambarPreview}
                                alt='image'
                                layout='fill'
                                objectFit='fill'
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Tutup</button>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default TambahVidio