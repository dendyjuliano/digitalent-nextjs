import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../../../../styles/preview.module.css'
import stylesPag from "../../../../styles/pagination.module.css";

import { Modal, ModalBody, ModalTitle } from "react-bootstrap"
import Pagination from 'react-js-pagination';
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import ReactPlayer from 'react-player';
import Swal from "sweetalert2";
import moment from "moment";
import styles2 from "../../../../styles/previewGaleri.module.css";

import PageWrapper from '../../../wrapper/page.wrapper'
import CardPage from '../../../CardPage'
import ButtonAction from '../../../ButtonAction'
import LoadingTable from '../../../LoadingTable';
import IconArrow from "../../../assets/icon/Arrow";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";

import { useDispatch, useSelector } from 'react-redux'
import { deleteVideo, playVideo, clearErrors, changeStatusCard, filterCard } from '../../../../redux/actions/publikasi/video.actions'
import { DELETE_VIDEO_RESET } from '../../../../redux/types/publikasi/video.type'
import { viewGaleri } from '../../../../redux/actions/publikasi/galeri.actions';

const Vidio = ({ token }) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading: allLoading, error, video } = useSelector(state => state.allVideo)
    const { loading: deleteLoading, error: deleteError, isDeleted } = useSelector((state) => state.deleteVideo);
    const { loading: playLoading, error: playError, isPlayed } = useSelector((state) => state.playedVideo);
    const { role_permission } = useSelector((state) => state.allRolePermission);

    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(null)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [url_video, setUrlVideo] = useState("")
    const [video_playing, setVideoPlaying] = useState(false)
    const [publishValue, setPublishValue] = useState(null)
    const [idVideo, setIdVideo] = useState(null)
    const [disableEndDate, setDisableEndDate] = useState(true)
    const [judul_video, setJudulVideo] = useState(null)
    const [total_views, setTotalViews] = useState(null)
    const [tanggal_publish, setTanggalPublish] = useState(null)
    const [kategori, setKategori] = useState(null)
    const [isiVideo, setIsiVideo] = useState(null)
    const [tag, setTag] = useState([])
    const [show, setShow] = useState(false)
    const [showDesc, setShowDesc] = useState(false)
    const descToTrim = 100;

    let loading = false
    let { page = 1, keyword, success } = router.query

    if (allLoading) {
        loading = allLoading
    } else if (deleteLoading) {
        loading = deleteLoading
    } else if (playLoading) {
        loading = playLoading
    }

    page = Number(page)

    useEffect(() => {
        if (isDeleted) {
            Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                }
            });
            dispatch({
                type: DELETE_VIDEO_RESET
            })
        }

    }, [isDeleted, dispatch]);

    const onNewReset = () => {
        router.replace('/publikasi/video', undefined, { shallow: true })
    }

    const handleDescToTrim = (str) => {
        let result = null;

        if (str.length > descToTrim) {
            result = str.slice(0, descToTrim) + "...";
        } else {
            result = str;
        }

        return result;
    };

    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    };

    const [windowDimensions, setWindowDimensions] = useState(
        // getWindowDimensions()
        {}
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        setWindowDimensions(getWindowDimensions());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [video])

    useEffect(() => {

    }, [windowDimensions])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah anda yakin ?",
            text: "Data ini tidak bisa dikembalikan !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya !",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteVideo(id, token));
            }
        });
    };

    const handlePagination = (pageNumber) => {
        if (limit !== null && search === "" && startDate === null && endDate === null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`)

        } else if (limit !== null && search !== "" && startDate === null && endDate === null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}`)

        } else if (limit === null && search !== "" && startDate === null && endDate === null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}`)

        } else if (limit !== null && search === "" && startDate !== null && endDate !== null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else if (limit !== null && search !== "" && startDate !== null && endDate !== null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else if (limit === null && search !== "" && startDate !== null && endDate !== null && publishValue === null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else if (limit !== null && search === "" && startDate === null && endDate === null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&publish=${publishValue}`)

        } else if (limit !== null && search !== "" && startDate === null && endDate === null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&publish=${publishValue}`)

        } else if (limit === null && search !== "" && startDate === null && endDate === null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&publish=${publishValue}`)

        } else if (limit === null && search === "" && startDate === null && endDate === null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&publish=${publishValue}`)

        } else if (limit !== null && search === "" && startDate !== null && endDate !== null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else if (limit !== null && search !== "" && startDate !== null && endDate !== null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else if (limit === null && search !== "" && startDate !== null && endDate !== null && publishValue !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&publish=${publishValue}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else {
            router.push(`${router.pathname}?page=${pageNumber}`)
        }
    }

    const handleSearch = () => {
        if (limit != null && startDate === null && endDate === null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`)

        } else if (limit !== null && startDate !== null && endDate !== null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

        } else {
            router.push(`${router.pathname}?page=1&keyword=${search}`)
        }

    };

    const handleSearchDate = () => {
        if (moment(startDate).format("YYYY-MM-DD") > moment(endDate).format("YYYY-MM-DD")) {
            Swal.fire(
                'Oops !',
                'Tanggal sebelum tidak boleh melebihi tanggal sesudah.',
                'error'
            )
            setStartDate(null)
            setEndDate(null)

        } else if (startDate === null && endDate !== null) {
            Swal.fire(
                'Oops !',
                'Tanggal sebelum tidak boleh kosong',
                'error'
            )
            setStartDate(null)
            setEndDate(null)

        } else if (startDate !== null && endDate === null) {
            Swal.fire(
                'Oops !',
                'Tanggal sesudah tidak boleh kosong',
                'error'
            )
            setStartDate(null)
            setEndDate(null)


        } else {
            if (limit !== null && search !== null && startDate !== null && endDate !== null) {
                router.push(
                    `${router.pathname}?page=1&keyword=${search}startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
                );

            } else if (limit !== null && search === null && startDate !== null && endDate !== null) {
                router.push(
                    `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
                )


            } else if (limit !== null && search === null && startDate === null && endDate === null) {
                router.push(
                    `${router.pathname}?page=1&limit=${limit}`
                )

            } else if (limit !== null && search !== null && startDate === null && endDate === null) {
                router.push(
                    `${router.pathname}?page=1&limit=${limit}&keyword=${search}`
                )

            } else {
                router.push(
                    `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
                );
            }
        }
    };

    const handleLimit = (val) => {
        setLimit(val)
        if (search === "" && publishValue === null) {
            router.push(`${router.pathname}?page=1&limit=${val}`);

        } else if (search !== "" && publishValue === null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${val}`)

        } else if (search === "" && publishValue === '1') {
            router.push(`${router.pathname}?page=1&publish=${publishValue}&limit=${val}`)

        } else if (search !== "" && publishValue === '1') {
            router.push(`${router.pathname}?page=1&publish=${publishValue}&limit=${val}`)

        } else if (search === "" && publishValue === '0') {
            router.push(`${router.pathname}?page=1&publish=${publishValue}&limit=${val}`)

        } else if (search !== "" && publishValue === '0') {
            router.push(`${router.pathname}?page=1&publish=${publishValue}&limit=${val}`)
        }

    };

    const handlePublish = (val) => {
        if (val !== null || val !== "") {
            setPublishValue(val)

            if (startDate === null && endDate === null && limit === null && search === null) {
                router.push(`${router.pathname}?publish=${val}`);

            } else if (startDate !== null && endDate !== null && limit === null && search === null) {
                router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)

            } else if (startDate !== null && endDate !== null && limit !== null && search === null) {
                router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`)

            } else if (startDate !== null && endDate !== null && limit === null && search !== null) {
                router.push(`${router.pathname}?publish=${val}`)
                setSearch("")
                // router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&keyword=${search}`)

            } else if (startDate === null && endDate === null && limit !== null && search === null) {
                router.push(`${router.pathname}?publish=${val}&limit=${limit}`);

            } else if (startDate === null && endDate === null && limit === null && search !== null) {
                router.push(`${router.pathname}?publish=${val}`);
                setSearch("")
                //   router.push(`${router.pathname}?publish=${val}&keyword=${search}`);

            } else if (startDate === null && endDate === null && limit !== null && search !== null) {
                router.push(`${router.pathname}?publish=${val}&limit=${limit}&keyword=${search}`);

            } else if (startDate !== null && endDate !== null && limit !== null && search !== null) {
                router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}&keyword=${search}`)
            }
        }

    }

    const handlePreview = (url, id, judul_video, tanggal_publish, total_views, kategori, isi_video, tag) => {
        setIdVideo(id)
        setVideoPlaying(true)
        setUrlVideo(url)
        setJudulVideo(judul_video)
        setTanggalPublish(tanggal_publish)
        setTotalViews(total_views)
        setKategori(kategori)
        setIsiVideo(isi_video)
        setTag(tag)
        setShow(true)
    }

    const handleIsPlayed = () => {
        const data = {
            id: idVideo,
            _method: "PUT",
            isplay: "1"
        }
        dispatch(playVideo(data, token))
    }

    const handleToggleModal = () => {
        setShow(false)
        setVideoPlaying(false)
    }

    const resetValueSort = () => {
        setStartDate(null)
        setEndDate(null)
        setDisableEndDate(true)
        setPublishValue(null)
        setSearch("")
        setLimit(null)
        router.replace('/publikasi/video', undefined, { shallow: false })
    }

    const handleStartDate = (date) => {
        setStartDate(date)
        setDisableEndDate(false)
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

            {success ? (
                <div
                    className="alert alert-custom alert-light-success fade show mb-5"
                    role="alert"
                >
                    <div className="alert-icon">
                        <i className="flaticon2-checkmark"></i>
                    </div>
                    <div className="alert-text">Berhasil Menyimpan Data !</div>
                    <div className="alert-close">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={onNewReset}
                        >
                            <span aria-hidden="true">
                                <i className="ki ki-close"></i>
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="col-lg-12 col-md-12">
                <div className="row">
                    <CardPage
                        background='bg-light-info'
                        icon="new/open-book.svg"
                        color='#ffffff'
                        value={video && video.publish != "" ? video.publish : 0}
                        titleValue='Video'
                        title='Total Publish'
                        publishedVal="1"
                        routePublish={() => handlePublish("1")}
                    />
                    <CardPage
                        background='bg-light-warning'
                        icon="new/mail-white.svg"
                        color='#ffffff'
                        value='0'
                        titleValue='Orang'
                        title='Total Author'
                        publishedVal=""
                        routePublish={() => handlePublish("")}
                    />
                    <CardPage
                        background='bg-light-success'
                        icon='user-white.svg'
                        color='#ffffff'
                        value={video && video.total_views != "" ? video.total_views : 0}
                        titleValue='Orang'
                        title='Total Dilihat'
                        publishedVal=""
                        routePublish={() => handlePublish("")}
                    />
                    <CardPage
                        background='bg-light-danger'
                        icon="Library.svg"
                        color='#ffffff'
                        value={video && video.unpublish != "" ? video.unpublish : 0}
                        titleValue='Video'
                        title='Total Belum Dipublish'
                        publishedVal="0"
                        routePublish={() => handlePublish("0")}
                    />
                </div>
            </div>


            <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header row border-0">
                        <h3 className={`${styles2.headTitle} col-12 col-sm-8 col-md-8 col-lg-8 col-xl-9`}>Video</h3>
                        {
                            role_permission.permissions.includes("publikasi.video.manage") || role_permission.roles.includes("Super Admin") ?
                                <div className="card-toolbar col-12 col-sm-4 col-md-4 col-lg-4 col-xl-3">
                                    <Link href='/publikasi/video/tambah-video'>
                                        <a className={`${styles2.btnTambah} btn btn-primary-rounded-full px-6 font-weight-bold btn-block`}>
                                            <i className="ri-add-fill pb-1 text-white mr-2 "></i>
                                            Tambah Video
                                        </a>
                                    </Link>
                                </div>
                                : null
                        }
                    </div>

                    <div className="card-body pt-0">

                        <div className="table-filter">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div
                                        className="position-relative overflow-hidden mt-3"
                                        style={{ maxWidth: "330px" }}
                                    >
                                        <i className="ri-search-line left-center-absolute ml-2"></i>
                                        <input
                                            type="text"
                                            className={`${styles2.cari} form-control pl-10`}
                                            placeholder="Ketik disini untuk Pencarian..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button
                                            className={`${styles2.fontCari} btn bg-blue-primary text-white right-center-absolute`}
                                            style={{
                                                borderTopLeftRadius: "0",
                                                borderBottomLeftRadius: "0",
                                            }}
                                            onClick={handleSearch}
                                        >
                                            Cari
                                        </button>
                                    </div>
                                </div>
                                <div className={`${styles2.filterDate} col-sm-6 col-md-6 col-lg-6 col-xl-6`}>
                                    <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                                        {/* sortir by modal */}
                                        <button
                                            className="col-sm-12 col-md-6 avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter"
                                            style={{ color: "#464646" }}
                                        >
                                            <div className={`${styles2.filter} d-flex align-items-center`}>
                                                <IconFilter className="mr-3" />
                                                Pilih Filter
                                            </div>
                                            <IconArrow fill="#E4E6EF" width="11" height="11" />
                                        </button>

                                        {/* modal */}
                                        <form
                                            // id="kt_docs_formvalidation_text"
                                            className="form text-left"
                                        // action="#"
                                        // autoComplete="off"
                                        // onSubmit={handleSubmitSearchMany}
                                        >
                                            <div
                                                className="modal fade"
                                                id="exampleModalCenter"
                                                tabIndex="-1"
                                                role="dialog"
                                                aria-labelledby="exampleModalCenterTitle"
                                                aria-hidden="true"
                                            >
                                                <div
                                                    className="modal-dialog modal-dialog-centered"
                                                    role="document"
                                                >
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5
                                                                className="modal-title font-weight-bold"
                                                                id="exampleModalLongTitle"
                                                            >
                                                                Filter
                                                            </h5>
                                                            <button
                                                                type="button"
                                                                className="close"
                                                                data-dismiss="modal"
                                                                aria-label="Close"
                                                                onClick={() => resetValueSort()}
                                                            >
                                                                <IconClose />
                                                            </button>
                                                        </div>

                                                        <div
                                                            className="modal-body text-left"
                                                            style={{ height: "200px" }}
                                                        >
                                                            <div className="mb-10 col-12">
                                                                <label className="required fw-bold fs-6 mb-2">
                                                                    Tanggal
                                                                </label>

                                                                <div>
                                                                    <DatePicker
                                                                        className="form-search-date form-control-sm form-control"
                                                                        selected={startDate}
                                                                        onChange={(date) => handleStartDate(date)}
                                                                        selectsStart
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        dateFormat="dd/MM/yyyy"
                                                                        placeholderText="Silahkan Isi Tanggal Dari"
                                                                        wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                                    // minDate={moment().toDate()}
                                                                    // minDate={addDays(new Date(), 20)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="mb-10 col-12">
                                                                <label className="required fw-bold fs-6 mb-2">
                                                                    Tanggal
                                                                </label>

                                                                <div>
                                                                    <DatePicker
                                                                        className="form-search-date form-control-sm form-control"
                                                                        selected={endDate}
                                                                        onChange={(date) => setEndDate(date)}
                                                                        selectsEnd
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        dateFormat="dd/MM/yyyy"
                                                                        // minDate={moment().toDate()}
                                                                        minDate={startDate}
                                                                        maxDate={addDays(startDate, 20)}
                                                                        placeholderText="Silahkan Isi Tanggal Sampai"
                                                                        wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                                        disabled={disableEndDate === true || disableEndDate === null}
                                                                    // minDate={addDays(new Date(), 20)}
                                                                    />
                                                                </div>
                                                                {
                                                                    disableEndDate === true || disableEndDate === null ?
                                                                        <small className="text-muted">
                                                                            Mohon isi Tanggal Dari terlebih dahulu
                                                                        </small>
                                                                        :
                                                                        null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <div className="d-flex justify-content-end align-items-center">
                                                                <button
                                                                    className="btn btn-white-ghost-rounded-full"
                                                                    type="button"
                                                                    onClick={() => resetValueSort()}
                                                                >
                                                                    Reset
                                                                </button>
                                                                <button
                                                                    className="btn btn-primary-rounded-full ml-4"
                                                                    type="button"
                                                                    data-dismiss="modal"
                                                                    onClick={() => handleSearchDate()}
                                                                >
                                                                    Terapkan
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        {/* end modal */}

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-page mt-5">
                            <div className="table-responsive">

                                <LoadingTable loading={loading} />

                                {loading === false ?
                                    <table className='table table-separate table-head-custom table-checkable'>
                                        <thead style={{ background: '#F3F6F9' }}>
                                            <tr>
                                                <th className="text-center">No</th>
                                                <th className='text-center'>Thumbnail</th>
                                                <th>Kategori</th>
                                                <th>Judul</th>
                                                <th>Tanggal Publish</th>
                                                <th>Dibuat</th>
                                                <th>Status</th>
                                                <th>Role</th>
                                                {
                                                    role_permission.permissions.includes("publikasi.video.manage") || role_permission.roles.includes("Super Admin") ?
                                                        <th style={{ width: '9.7vw' }}>Aksi</th>
                                                        : null
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !video || video && video.video.length === 0 ?
                                                    <td className='align-middle text-center' colSpan={12}>Data Kosong</td> :
                                                    video && video.video.map((row, i) => {
                                                        return <tr key={row.id}>
                                                            <td className='align-middle text-center'>
                                                                {
                                                                    limit === null ?
                                                                        <span>
                                                                            {i + 1 * (page * 5) - (5 - 1)}
                                                                        </span>
                                                                        :
                                                                        <span>
                                                                            {i + 1 * (page * limit) - (limit - 1)}
                                                                        </span>
                                                                }

                                                            </td>
                                                            <td className='text-center'>
                                                                <Image
                                                                    alt={row.judul_video}
                                                                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                                                                    loader={process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + row.gambar}
                                                                    src={process.env.END_POINT_API_IMAGE_PUBLIKASI + 'publikasi/images/' + row.gambar}
                                                                    width={80}
                                                                    height={50}
                                                                />
                                                            </td>
                                                            <td className='align-middle' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '11rem' }}>{row.kategori}</td>
                                                            <td className='align-middle' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '11rem' }}>{row.judul_video}</td>
                                                            <td className='align-middle'>
                                                                {
                                                                    row.publish === 1 ? (
                                                                        row.tanggal_publish
                                                                    ) : (
                                                                        <span className="label label-inline label-light-danger font-weight-bold">
                                                                            Belum dipublish
                                                                        </span>
                                                                    )
                                                                }
                                                            </td>
                                                            <td className='align-middle'>{row.name}</td>
                                                            <td className='align-middle'>
                                                                {row.publish === 1 ?
                                                                    <span className="label label-inline label-light-success font-weight-bold">
                                                                        Publish
                                                                    </span>
                                                                    :
                                                                    <span className="label label-inline label-light-warning font-weight-bold">
                                                                        Belum diPublish
                                                                    </span>
                                                                }

                                                            </td>
                                                            <td className='align-middle'>{row.role[0].name}</td>
                                                            {
                                                                role_permission.permissions.includes("publikasi.video.manage") || role_permission.roles.includes("Super Admin") ?
                                                                    <td className="align-middle d-flex">
                                                                        <button
                                                                            onClick={() => handlePreview(row.url_video, row.id, row.judul_video, row.tanggal_publish, row.total_views, row.kategori, row.isi_video, row.tag)}
                                                                            className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative btn-delete"
                                                                            data-target="#videoPlayerModal"
                                                                            data-toggle="modal"
                                                                        >
                                                                            <i className="ri-todo-fill p-0 text-white"></i>
                                                                            <div className="text-hover-show-hapus">
                                                                                Pratinjau
                                                                            </div>
                                                                        </button>

                                                                        <Link
                                                                            href={`/publikasi/video/ubah-video?id=${row.id}`}
                                                                        >
                                                                            <a className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative btn-delete">
                                                                                <i className="ri-pencil-fill p-0 text-white"></i>
                                                                                <div className="text-hover-show-hapus">
                                                                                    Ubah
                                                                                </div>
                                                                            </a>
                                                                        </Link>

                                                                        <button
                                                                            className="btn btn-link-action bg-blue-secondary text-white my-5 btn-delete"
                                                                            onClick={() => handleDelete(row.id)}
                                                                        >
                                                                            <i className="ri-delete-bin-fill p-0 text-white"></i>
                                                                            <div className="text-hover-show-hapus">
                                                                                Hapus
                                                                            </div>
                                                                        </button>

                                                                    </td>
                                                                    : null
                                                            }
                                                        </tr>
                                                    })
                                            }
                                        </tbody>
                                    </table> : ''
                                }
                            </div>

                            <div className="row">
                                {video && video.perPage < video.total &&
                                    <>
                                        <div className={`${stylesPag.pagination} table-pagination`}>
                                            <Pagination
                                                activePage={page}
                                                itemsCountPerPage={video.perPage}
                                                totalItemsCount={video.total}
                                                pageRangeDisplayed={windowDimensions.width > 320 ? 3 : 1}
                                                onChange={handlePagination}
                                                nextPageText={'>'}
                                                prevPageText={'<'}
                                                firstPageText={'<<'}
                                                lastPageText={'>>'}
                                                itemClass='page-item'
                                                linkClass='page-link'
                                            />
                                        </div>
                                    </>
                                }
                                {video ?
                                    <div className={`${stylesPag.rightPag} table-total ml-auto`}>
                                        <div className="row">
                                            <div className="col-4 mr-0 mt-3">
                                                <select
                                                    className="form-control"
                                                    id="exampleFormControlSelect2"
                                                    style={{ width: '70px', background: '#F3F6F9', borderColor: '#F3F6F9', color: '#9E9E9E' }}
                                                    onChange={(e) => handleLimit(e.target.value)}
                                                    onBlur={(e) => handleLimit(e.target.value)}
                                                >
                                                    <option value='5' selected={limit == "5" ? true : false}>5</option>
                                                    <option value='10' selected={limit == "10" ? true : false}>10</option>
                                                    <option value='30' selected={limit == "30" ? true : false}>30</option>
                                                    <option value='40' selected={limit == "40" ? true : false}>40</option>
                                                    <option value='50' selected={limit == "50" ? true : false}>50</option>
                                                </select>
                                            </div>
                                            <div className="col-8 my-auto">
                                                <p className='align-middle mt-5 pt-1' style={{ color: '#B5B5C3' }}>Total Data {video.total} List Data</p>
                                            </div>
                                        </div>
                                    </div> : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                size="lg"
                onHide={() => handleToggleModal()}
                show={show}
                centered
            >
                <Modal.Header>
                    <div
                        className="col-12 d-flex justify-content-end"
                    >
                        <i
                            className="ri-close-line text-dark"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleToggleModal()}
                        />
                    </div>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <ReactPlayer
                        url={url_video}
                        controls
                        width="100%"
                        height="50vh"
                        playing={video_playing}
                        onStart={handleIsPlayed}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className="col-12">
                        <h2 className="font-weight-bolder">
                            {judul_video}
                        </h2>

                        <div className={`${styles.descriptionVideo} text-break text-justify`}>
                            <span>
                                {/* {isiVideo} */}
                                {
                                    showDesc === false && isiVideo ?
                                        <div className="mx-0 px-0">
                                            {handleDescToTrim(isiVideo)}

                                            <div
                                                className="mt-1 mb-3 text-primary"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShowDesc(true)}
                                            >
                                                Lihat Selengkapnya...
                                            </div>
                                        </div>
                                        :
                                        <div className="overflow-auto">
                                            {isiVideo}
                                            {/* <div className="col-12 col-md-5 col-lg-4 my-2"> */}
                                            <div className="d-flex flex-wrap flex-row mt-2">
                                                {
                                                    tag === null ?
                                                        null
                                                        : tag.map((el, i) => {
                                                            return (
                                                                <div
                                                                    style={{
                                                                        background: "#fff",
                                                                        border: "1px solid #d7e1ea",
                                                                    }}
                                                                    className="mr-2 px-3 py-1 mb-2 rounded"
                                                                    key={i}
                                                                >
                                                                    <div
                                                                        className="text-center"
                                                                        style={{ fontSize: "10px" }}
                                                                    >
                                                                        #{el.toUpperCase()}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                }
                                            </div>
                                            {/* </div> */}

                                            <div
                                                className="mt-1 mb-3 text-primary"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShowDesc(false)}
                                            >
                                                Lihat Lebih Sedikit...
                                            </div>
                                        </div>

                                }
                            </span>
                        </div>

                        <div className="mt-10 mb-5 row justify-content-between">
                            <div className="col-12 col-md-4 col-lg-4 text-muted">
                                {
                                    tanggal_publish !== null ?
                                        `${moment(tanggal_publish).format("MMMM DD")} | ${total_views} Ditonton`
                                        :
                                        ""
                                }
                            </div>
                            <div className="col-12 col-md-3 col-lg-4 text-sm-right text-md-right text-lg-right">
                                {kategori === null ? null : (
                                    <span className="p-2 badge  badge-light font-weight-bold text-primary">
                                        {kategori}
                                    </span>
                                )}
                            </div>

                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

        </PageWrapper>
    )
}

export default Vidio;