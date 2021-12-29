import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../../styles/previewGaleri.module.css";
import stylesPag from "../../../../styles/pagination.module.css";

import Pagination from "react-js-pagination";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import Swal from "sweetalert2";
import moment from "moment";
import { Modal } from "react-bootstrap";
import Cookies from 'js-cookie'

import PageWrapper from "../../../wrapper/page.wrapper";
import CardPage from "../../../CardPage";
import ButtonAction from "../../../ButtonAction";
import LoadingTable from "../../../LoadingTable";
import IconArrow from "../../../assets/icon/Arrow";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";

import { useDispatch, useSelector } from "react-redux";
import {
    deleteGaleri,
    viewGaleri,
    clearErrors,
} from "../../../../redux/actions/publikasi/galeri.actions";

import { DELETE_GALERI_RESET } from "../../../../redux/types/publikasi/galeri.type";

const Galeri = ({ token }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const permission = Cookies.get("token_permission")

    const {
        loading: allLoading,
        error,
        galeri,
    } = useSelector(state => state.allGaleri);
    const {
        loading: deleteLoading,
        error: deleteError,
        isDeleted,
    } = useSelector(state => state.deleteGaleri);
    const {
        loading: viewLoading,
        error: viewError,
        isViewed,
    } = useSelector(state => state.viewedGaleri);
    const { role_permission } = useSelector((state) => state.allRolePermission);

    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [publishValue, setPublishValue] = useState(null);
    const [index_galleri, setIndexGalleri] = useState(null);
    const [disableEndDate, setDisableEndDate] = useState(true);
    const [previewImage, setPreviewImage] = useState(false);
    const [showModal, setShowModal] = useState(false);

    let loading = false;

    let { page = 1, keyword, success } = router.query;
    if (allLoading) {
        loading = allLoading;
    } else if (deleteLoading) {
        loading = deleteLoading;
    } else if (viewLoading) {
        loading = viewLoading;
    }

    page = Number(page);

    useEffect(() => {
        if (isDeleted) {
            Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
                result => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                }
            );
            dispatch({
                type: DELETE_GALERI_RESET,
            });
        }
    }, [isDeleted, dispatch]);

    const onNewReset = () => {
        router.replace("/publikasi/galeri", undefined, { shallow: true });
    };

    const getWindowDimensions = () => {
        // if (typeof window === 'undefined') {
        //     global.window = {}
        // }

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
    }, [galeri])

    useEffect(() => {

    }, [windowDimensions])

    const handleDelete = id => {
        Swal.fire({
            title: "Apakah anda yakin ?",
            text: "Data ini tidak bisa dikembalikan !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya !",
            cancelButtonText: "Batal",
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(deleteGaleri(id, token, permission));
            }
        });
    };

    const handlePagination = pageNumber => {
        if (
            limit !== null &&
            search === "" &&
            startDate === null &&
            endDate === null &&
            publishValue === null
        ) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`);
        } else if (
            limit !== null &&
            search !== "" &&
            startDate === null &&
            endDate === null &&
            publishValue === null
        ) {
            router.push(
                `${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}`
            );
        } else if (
            limit === null &&
            search !== "" &&
            startDate === null &&
            endDate === null &&
            publishValue === null
        ) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}`);
        } else if (
            limit !== null &&
            search === "" &&
            startDate !== null &&
            endDate !== null &&
            publishValue === null
        ) {
            router.push(
                `${router.pathname
                }?page=${pageNumber}&limit=${limit}&startdate=${moment(
                    startDate
                ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
            );
        } else if (
            limit !== null &&
            search !== "" &&
            startDate !== null &&
            endDate !== null &&
            publishValue === null
        ) {
            router.push(
                `${router.pathname
                }?page=${pageNumber}&keyword=${search}&limit=${limit}&startdate=${moment(
                    startDate
                ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
            );
        } else if (
            limit === null &&
            search !== "" &&
            startDate !== null &&
            endDate !== null &&
            publishValue === null
        ) {
            router.push(
                `${router.pathname
                }?page=${pageNumber}&keyword=${search}&startdate=${moment(
                    startDate
                ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
            );
        } else if (
            limit !== null &&
            search === "" &&
            startDate === null &&
            endDate === null &&
            publishValue !== null
        ) {
            router.push(
                `${router.pathname}?page=${pageNumber}&limit=${limit}&publish=${publishValue}`
            );
        } else if (
            limit !== null &&
            search !== "" &&
            startDate === null &&
            endDate === null &&
            publishValue !== null
        ) {
            router.push(
                `${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&publish=${publishValue}`
            );
        } else if (
            limit === null &&
            search !== "" &&
            startDate === null &&
            endDate === null &&
            publishValue !== null
        ) {
            router.push(
                `${router.pathname}?page=${pageNumber}&keyword=${search}&publish=${publishValue}`
            );
        } else if (
            limit === null &&
            search === "" &&
            startDate === null &&
            endDate === null &&
            publishValue !== null
        ) {
            router.push(
                `${router.pathname}?page=${pageNumber}&publish=${publishValue}`
            );
        } else if (
            limit !== null &&
            search === "" &&
            startDate !== null &&
            endDate !== null &&
            publishValue !== null
        ) {
            router.push(
                `${router.pathname
                }?page=${pageNumber}&limit=${limit}&publish=${publishValue}&startdate=${moment(
                    startDate
                ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
            );
        } else if (
            limit !== null &&
            search !== "" &&
            startDate !== null &&
            endDate !== null &&
            publishValue !== null
        ) {
            router.push(
                `${router.pathname
                }?page=${pageNumber}&keyword=${search}&limit=${limit}&publish=${publishValue}&startdate=${moment(
                    startDate
                ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
            );
        } else if (
            limit === null &&
            search !== "" &&
            startDate !== null &&
            endDate !== null &&
            publishValue !== null
        ) {
            router.push(
                `${router.pathname
                }?page=${pageNumber}&keyword=${search}&publish=${publishValue}&startdate=${moment(
                    startDate
                ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
            );
        } else {
            router.push(`${router.pathname}?page=${pageNumber}`);
        }
    };

    const handleSearch = () => {
        if (limit != null && startDate === null && endDate === null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`);

        } else if (limit !== null && startDate !== null && endDate !== null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
            );
        } else {
            router.push(`${router.pathname}?page=1&keyword=${search}`);
        }
    };

    const handleSearchDate = () => {
        if (
            moment(startDate).format("YYYY-MM-DD") >
            moment(endDate).format("YYYY-MM-DD")
        ) {
            Swal.fire(
                "Oops !",
                "Tanggal sebelum tidak boleh melebihi tanggal sesudah.",
                "error"
            );
            setStartDate(null);
            setEndDate(null);
        } else if (startDate === null && endDate !== null) {
            Swal.fire("Oops !", "Tanggal sebelum tidak boleh kosong", "error");
            setStartDate(null);
            setEndDate(null);
        } else if (startDate !== null && endDate === null) {
            Swal.fire("Oops !", "Tanggal sesudah tidak boleh kosong", "error");
            setStartDate(null);
            setEndDate(null);
        } else if (startDate === null && endDate === null) {
            Swal.fire("Oops !", "Harap mengisi tanggal terlebih dahulu.", "error");
            setStartDate(null);
            setEndDate(null);
        } else {
            if (
                limit !== null &&
                search !== null &&
                startDate !== null &&
                endDate !== null
            ) {
                router.push(
                    `${router.pathname}?page=1&keyword=${search}startdate=${moment(
                        startDate
                    ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format(
                        "YYYY-MM-DD"
                    )}&limit=${limit}`
                );
                setShowModal(false)
            } else if (
                limit !== null &&
                search === null &&
                startDate !== null &&
                endDate !== null
            ) {
                router.push(
                    `${router.pathname}?page=1&startdate=${moment(startDate).format(
                        "YYYY-MM-DD"
                    )}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
                );
                setShowModal(false)
            } else if (
                limit !== null &&
                search === null &&
                startDate === null &&
                endDate === null
            ) {
                router.push(`${router.pathname}?page=1&limit=${limit}`);
                setShowModal(false)
            } else if (
                limit !== null &&
                search !== null &&
                startDate === null &&
                endDate === null
            ) {
                router.push(
                    `${router.pathname}?page=1&limit=${limit}&keyword=${search}`
                );
                setShowModal(false)
            } else {
                router.push(
                    `${router.pathname}?page=1&startdate=${moment(startDate).format(
                        "YYYY-MM-DD"
                    )}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
                );
                setShowModal(false)
            }
        }
    };

    const handleLimit = val => {
        setLimit(val);
        if (search === "" && publishValue === null) {
            router.push(`${router.pathname}?page=1&limit=${val}`);

        } else if (search !== "" && publishValue === null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${val}`);

        } else if (search === "" && publishValue === "1") {
            router.push(
                `${router.pathname}?page=1&publish=${publishValue}&limit=${val}`
            );
        } else if (search !== "" && publishValue === "1") {
            router.push(
                `${router.pathname}?page=1&publish=${publishValue}&limit=${val}`
            );
        } else if (search === "" && publishValue === "0") {
            router.push(
                `${router.pathname}?page=1&publish=${publishValue}&limit=${val}`
            );
        } else if (search !== "" && publishValue === "0") {
            router.push(
                `${router.pathname}?page=1&publish=${publishValue}&limit=${val}`
            );
        }
    };

    const handlePublish = val => {
        if (val !== null || val !== "") {
            setPublishValue(val);

            if (
                startDate === null &&
                endDate === null &&
                limit === null &&
                search === null
            ) {
                router.push(`${router.pathname}?publish=${val}`);
            } else if (
                startDate !== null &&
                endDate !== null &&
                limit === null &&
                search === null
            ) {
                router.push(
                    `${router.pathname}?publish=${val}&startdate=${moment(
                        startDate
                    ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format(
                        "YYYY-MM-DD"
                    )}`
                );
            } else if (
                startDate !== null &&
                endDate !== null &&
                limit !== null &&
                search === null
            ) {
                router.push(
                    `${router.pathname}?publish=${val}&startdate=${moment(
                        startDate
                    ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format(
                        "YYYY-MM-DD"
                    )}&limit=${limit}`
                );
            } else if (
                startDate !== null &&
                endDate !== null &&
                limit === null &&
                search !== null
            ) {
                router.push(`${router.pathname}?publish=${val}`)
                setSearch("")
            } else if (
                startDate === null &&
                endDate === null &&
                limit !== null &&
                search === null
            ) {
                router.push(`${router.pathname}?publish=${val}&limit=${limit}`);
            } else if (
                startDate === null &&
                endDate === null &&
                limit === null &&
                search !== null
            ) {
                router.push(`${router.pathname}?publish=${val}`);
                setSearch("")
            } else if (
                startDate === null &&
                endDate === null &&
                limit !== null &&
                search !== null
            ) {
                router.push(
                    `${router.pathname}?publish=${val}&limit=${limit}&keyword=${search}`
                );
            } else if (
                startDate !== null &&
                endDate !== null &&
                limit !== null &&
                search !== null
            ) {
                router.push(
                    `${router.pathname}?publish=${val}&startdate=${moment(
                        startDate
                    ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format(
                        "YYYY-MM-DD"
                    )}&limit=${limit}&keyword=${search}`
                );
            }
        }
    };

    const handlePreview = (i, id) => {
        const data = {
            id,
        };
        dispatch(viewGaleri(data, token, permission));
        setIndexGalleri(i);
    };

    const printImage = () => {
        return galeri && galeri.gallery.length !== 0 && index_galleri !== null ? (
            <>
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel"
                >
                    <div
                        className="carousel-inner"
                    >
                        {isViewed && isViewed.length !== 0
                            ? isViewed?.gambar?.map((row, i) => {
                                return (
                                    <div className={i === 0 ? "carousel-item active" : "carousel-item"} key={i}>

                                        <div
                                            className={`${styles.modals} position-relative`}
                                        >
                                            <Image
                                                src={
                                                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                    "publikasi/images/" + row.gambar
                                                }
                                                alt="Slider"
                                                objectFit="fill"
                                                layout="fill"
                                            />
                                        </div>
                                    </div>
                                );
                            })
                            : null}
                    </div>
                    {
                        isViewed?.gambar.length === 1 ? null :
                            <div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-target="#carouselExampleIndicators"
                                    data-slide="prev"
                                    style={{
                                        position: "absolute",
                                        left: "-14px",
                                        border: "none",
                                        background: "none",
                                    }}
                                >
                                    <span
                                        className="carousel-control-prev-icon"
                                        aria-hidden="true"
                                    ></span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-target="#carouselExampleIndicators"
                                    data-slide="next"
                                    style={{
                                        position: "absolute",
                                        right: "-12px",
                                        border: "none",
                                        background: "none",
                                    }}
                                >
                                    <span
                                        className="carousel-control-next-icon"
                                        aria-hidden="true"
                                    ></span>
                                </button>
                            </div>
                    }
                </div>
            </>
        ) : null;
    };

    const resetValueSort = () => {
        setStartDate(null);
        setEndDate(null);
        setDisableEndDate(true);
        setLimit(null)
        setPublishValue(null)
        setSearch("")
        setShowModal(false)
        router.replace("/publikasi/galeri", undefined, { shallow: false });
    };

    const handleStartDate = date => {
        setStartDate(date);
        setDisableEndDate(false);
    };

    return (
        <PageWrapper>
            {error ? (
                <div
                    className="alert alert-custom alert-light-danger fade show mb-5"
                    role="alert"
                >
                    <div className="alert-icon">
                        <i className="flaticon-warning"></i>
                    </div>
                    <div className="alert-text">{error}</div>
                    <div className="alert-close">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
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
                        background="bg-light-info"
                        icon="new/open-book.svg"
                        color="#ffffff"
                        value={galeri && galeri.publish != "" ? galeri.publish : 0}
                        titleValue="Galeri"
                        title="Total Publish"
                        publishedVal="1"
                        routePublish={() => handlePublish("1")}
                    />
                    <CardPage
                        background="bg-light-warning"
                        icon="new/mail-white.svg"
                        color="#ffffff"
                        value={galeri.total_author === "" || galeri.total_author === undefined ? 0 : galeri.total_author}
                        titleValue="Orang"
                        title="Total Author"
                        publishedVal=""
                        routePublish={() => handlePublish("")}
                    />
                    <CardPage
                        background="bg-light-success"
                        icon="user-white.svg"
                        color="#ffffff"
                        value={galeri && galeri.total_pembaca != "" ? galeri.total_pembaca : 0}
                        titleValue="Orang"
                        title="Total Dilihat"
                        publishedVal=""
                        routePublish={() => handlePublish("")}
                    />
                    <CardPage
                        background="bg-light-danger"
                        icon="Library.svg"
                        color="#ffffff"
                        value={galeri && galeri.unpublish != "" ? galeri.unpublish : 0}
                        titleValue="Galeri"
                        title="Total Belum Dipublish"
                        publishedVal="0"
                        routePublish={() => handlePublish("0")}
                    />
                </div>
            </div>

            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header row border-0">
                        <h3 className={`${styles.headTitle} col-12 col-sm-8 col-md-8 col-lg-8 col-xl-9`}>Galeri</h3>
                        {
                            role_permission?.permissions.includes("publikasi.gallery.manage") || role_permission?.roles.includes("Super Admin") ?
                                <div className="card-toolbar col-12 col-sm-4 col-md-4 col-lg-4 col-xl-3">
                                    <Link href="/publikasi/galeri/tambah-galeri">
                                        <a className={`${styles.btnTambah} btn btn-primary-rounded-full px-6 font-weight-bold btn-block`}>
                                            <i className="ri-add-fill pb-1 text-white mr-2 "></i>
                                            Tambah Galeri
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
                                    <div className="position-relative overflow-hidden mt-3"
                                        style={{ maxWidth: "330px" }}
                                    >
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSearch
                                        }}
                                        >
                                            <i className="ri-search-line left-center-absolute ml-2"></i>
                                            <input
                                                type="text"
                                                className={`${styles.cari} form-control pl-10`}
                                                placeholder="Ketik disini untuk Pencarian..."
                                                value={search}
                                                onChange={e => setSearch(e.target.value)}
                                            />
                                            <button
                                                className={`${styles.fontCari} btn bg-blue-primary text-white right-center-absolute`}
                                                style={{
                                                    borderTopLeftRadius: "0",
                                                    borderBottomLeftRadius: "0",
                                                }}
                                                onClick={handleSearch}
                                            >
                                                Cari
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className={`${styles.filterDate} col-sm-6 col-md-6 col-lg-6 col-xl-6`}>
                                    <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                                        {/* sortir by modal */}
                                        <button
                                            className="col-sm-12 col-md-6 avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
                                            onClick={() => setShowModal(true)}
                                            style={{ color: "#464646" }}
                                        >
                                            <div className={`${styles.filter} d-flex align-items-center`}>
                                                <IconFilter className="mr-3" />
                                                Pilih Filter
                                            </div>
                                            <IconArrow fill="#E4E6EF" width="11" height="11" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-page mt-5">
                            <div className="table-responsive">
                                <LoadingTable loading={loading} />

                                {loading === false ? (
                                    <table className="table table-separate table-head-custom table-checkable">
                                        <thead style={{ background: "#F3F6F9" }}>
                                            <tr>
                                                <th className="text-center">No</th>
                                                <th className="text-center">Thumbnail</th>
                                                <th>Kategori</th>
                                                <th>Judul</th>
                                                <th>Tanggal Publish</th>
                                                <th>Dibuat</th>
                                                <th>Status</th>
                                                <th>Role</th>
                                                {
                                                    role_permission?.permissions.includes("publikasi.gallery.manage") || role_permission?.roles.includes("Super Admin") ?
                                                        <th style={{ width: '9.7vw' }}>Aksi</th>
                                                        : null
                                                }
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {!galeri || (galeri && galeri?.gallery.length === 0) ? (
                                                <td className="align-middle text-center" colSpan={9}>
                                                    Data Kosong
                                                </td>
                                            ) : (
                                                galeri &&
                                                galeri?.gallery?.map((row, i) => {
                                                    return (
                                                        <tr key={row.id}>
                                                            <td className="align-middle text-center">
                                                                {limit === null ? (
                                                                    // <span className="badge badge-secondary text-muted">
                                                                    <span>{i + 1 * (page * 5) - (5 - 1)}</span>
                                                                ) : (
                                                                    <span>
                                                                        {i + 1 * (page * limit) - (limit - 1)}
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="text-center">
                                                                <Image
                                                                    key={row.id_gallery}
                                                                    alt={row.judul}
                                                                    unoptimized={
                                                                        process.env.ENVIRONMENT !== "PRODUCTION"
                                                                    }
                                                                    loader={() =>
                                                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                        "publikasi/images/" +
                                                                        row.gambar
                                                                    }
                                                                    src={
                                                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                        "publikasi/images/" +
                                                                        row.gambar
                                                                    }
                                                                    width={80}
                                                                    height={50}
                                                                />
                                                            </td>
                                                            <td className="align-middle">
                                                                {row.nama_kategori}
                                                            </td>
                                                            <td className="align-middle" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '11rem' }}>{row.judul}</td>
                                                            <td className="align-middle">
                                                                {row.publish === 1 ? (
                                                                    row.tanggal_publish
                                                                ) : (
                                                                    <span className="label label-inline label-light-danger font-weight-bold">
                                                                        Belum dipublish
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="align-middle">
                                                                {row.name}
                                                            </td>
                                                            <td className="align-middle">
                                                                {row.publish === 1 ? (
                                                                    <span className="label label-inline label-light-success font-weight-bold">
                                                                        Publish
                                                                    </span>
                                                                ) : (
                                                                    <span className="label label-inline label-light-warning font-weight-bold">
                                                                        Belum di publish
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="align-middle">{row.role[0].name}</td>
                                                            {
                                                                role_permission?.permissions.includes("publikasi.gallery.manage") || role_permission?.roles.includes("Super Admin") ?
                                                                    <td className="align-middle d-flex">
                                                                        <button
                                                                            onClick={() =>
                                                                                handlePreview(i, row.id_gallery)
                                                                            }
                                                                            className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative btn-delete"
                                                                            data-target="#galleryModalPreview"
                                                                            data-toggle="modal"
                                                                        >
                                                                            <i className="ri-todo-fill p-0 text-white"></i>
                                                                            <div className="text-hover-show-hapus">
                                                                                Pratinjau
                                                                            </div>
                                                                        </button>

                                                                        <Link
                                                                            href={`/publikasi/galeri/ubah-galeri?id=${row.id_gallery}`}
                                                                        >
                                                                            <a className="btn btn-link-action bg-blue-secondary text-white mr-2 my-5 position-relative btn-delete">
                                                                                <i className="ri-pencil-fill p-0 text-white"></i>
                                                                                <div className="text-hover-show-hapus">
                                                                                    Ubah
                                                                                </div>
                                                                            </a>
                                                                        </Link>

                                                                        <button
                                                                            className="btn btn-link-action bg-blue-secondary text-white my-5 position-relative btn-delete"
                                                                            onClick={() => handleDelete(row.id_gallery)}
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
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="row">
                                {galeri && galeri?.perPage < galeri?.total && (
                                    <>
                                        <div className={`${stylesPag.pagination} table-pagination`}>
                                            <Pagination
                                                activePage={page}
                                                itemsCountPerPage={galeri?.perPage}
                                                totalItemsCount={galeri?.total}
                                                pageRangeDisplayed={windowDimensions.width > 320 ? 3 : 1}
                                                onChange={handlePagination}
                                                nextPageText={">"}
                                                prevPageText={"<"}
                                                firstPageText={"<<"}
                                                lastPageText={">>"}
                                                itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        </div>
                                    </>
                                )}
                                {galeri ? (
                                    <div className={`${stylesPag.rightPag} table-total ml-auto`}>
                                        <div className="row">
                                            <div className="col-4 mr-0 mt-3">
                                                <select
                                                    className="form-control"
                                                    id="exampleFormControlSelect2"
                                                    style={{
                                                        width: "70px",
                                                        background: "#F3F6F9",
                                                        borderColor: "#F3F6F9",
                                                        color: "#9E9E9E",
                                                    }}
                                                    onChange={e => handleLimit(e.target.value)}
                                                    onBlur={e => handleLimit(e.target.value)}
                                                >
                                                    <option
                                                        value="5"
                                                        selected={limit == "5" ? true : false}
                                                    >
                                                        5
                                                    </option>
                                                    <option
                                                        value="10"
                                                        selected={limit == "10" ? true : false}
                                                    >
                                                        10
                                                    </option>
                                                    <option
                                                        value="30"
                                                        selected={limit == "30" ? true : false}
                                                    >
                                                        30
                                                    </option>
                                                    <option
                                                        value="40"
                                                        selected={limit == "40" ? true : false}
                                                    >
                                                        40
                                                    </option>
                                                    <option
                                                        value="50"
                                                        selected={limit == "50" ? true : false}
                                                    >
                                                        50
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-8 my-auto">
                                                <p
                                                    className="align-middle mt-5 pt-1"
                                                    style={{ color: "#B5B5C3" }}
                                                >
                                                    Total Data {galeri.total} List Data
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <Modal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header>
                                <Modal.Title>Filter</Modal.Title>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
                                </button>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
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
                                                    minDate={startDate}
                                                    maxDate={addDays(startDate, 20)}
                                                    placeholderText="Silahkan Isi Tanggal Sampai"
                                                    wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                    disabled={disableEndDate === true || disableEndDate === null}
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
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    className="btn btn-white-ghost-rounded-full"
                                    type="button"
                                    onClick={() => resetValueSort()}
                                >
                                    Reset
                                </button>
                                <button
                                    className="btn btn-primary-rounded-full"
                                    type="button"
                                    onClick={() => handleSearchDate()}
                                >
                                    Terapkan
                                </button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div
                className="modal fade"
                id="galleryModalPreview"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="">
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6">
                                    {
                                        isViewed &&
                                        <>
                                            {printImage()}
                                        </>
                                    }
                                </div>
                                <div className={`${styles.modalsRight} col-sm-12 col-md-6 col-lg-6`}>
                                    <div className={`${styles.rightSide}`}>
                                        {galeri &&
                                            galeri.gallery.length !== 0 &&
                                            index_galleri !== null ? (
                                            <>

                                                <div
                                                    className="mb-1 justify-content-between"
                                                    style={{ marginLeft: "-12px" }}
                                                >
                                                    <div className="mb-5" style={{}}>
                                                        <span className="label label-inline label-light-success font-weight-bold">
                                                            {(galeri.gallery[index_galleri].nama_kategori).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <h3
                                                        className="col-10"
                                                        style={{
                                                            fontWeight: "bold",
                                                            textAlign: "left",
                                                            marginLeft: "-12px",
                                                        }}
                                                    >
                                                        {galeri.gallery[index_galleri].judul}
                                                    </h3>
                                                </div>
                                                <div className="row mb-4 p-1">
                                                    <div className={styles["subMenuPreview"]}>
                                                        {
                                                            galeri.gallery[index_galleri].publish === 0 ?
                                                                <div className="mb-1 p-0 d-flex align-items-center">
                                                                    <div className={styles["iconPreview"]}>
                                                                        <i className="flaticon2-calendar-4"></i>
                                                                    </div>
                                                                    <span className="ml-2">
                                                                        Publish : Belum dipublish
                                                                    </span>
                                                                </div>
                                                                :
                                                                <div className="mb-1 p-0 d-flex align-items-center">
                                                                    <div className={styles["iconPreview"]}>
                                                                        <i className="flaticon2-calendar-4"></i>
                                                                    </div>
                                                                    <span className="ml-2">
                                                                        Publish:{" "}
                                                                        {moment(galeri.gallery[index_galleri].tanggal_publish).format("LL")}
                                                                    </span>
                                                                </div>
                                                        }

                                                    </div>

                                                    <div className={styles["subMenuPreview"]}>
                                                        {
                                                            galeri.gallery[index_galleri].dibaca === undefined ?
                                                                <span className="mb-1 p-0 d-flex align-items-center">
                                                                    <div className={`${styles.iconPreview} mr-1 ml-8`}>
                                                                        <i className="ri-eye-line"></i>
                                                                    </div>
                                                                    <span className="ml-2">
                                                                        Dibaca 0
                                                                    </span>
                                                                </span>
                                                                :
                                                                <span className="mb-1 p-0 d-flex align-items-center">
                                                                    <div className={`${styles.iconPreview} mr-1 ml-8`}>
                                                                        <i className="ri-eye-line"></i>
                                                                    </div>
                                                                    <span className="ml-2">
                                                                        Dibaca {galeri.gallery[index_galleri].dibaca}
                                                                    </span>
                                                                </span>
                                                        }
                                                    </div>
                                                </div>
                                                <hr className={styles["strip"]} />
                                                <div className="row mb-1">
                                                    <p
                                                        className={styles["description-img"]}
                                                        dangerouslySetInnerHTML={{
                                                            __html: galeri.gallery[index_galleri].isi_galleri,
                                                        }}
                                                    ></p>
                                                    <div className="row justify-content-between align-items-center" style={{ width: '100%' }}>
                                                        <div className="col-sm-12 col-md-12 col-12" style={{ display: 'flex', flexWrap: 'wrap', overflowWrap: 'break-word' }}>
                                                            {galeri.gallery[index_galleri].tag !== null
                                                                ? galeri.gallery[index_galleri].tag.map((row, i) => {
                                                                    return (
                                                                        <span
                                                                            style={{ background: "#fff", border: '1px solid #d7e1ea' }}
                                                                            className="mr-3 px-3 py-1 rounded mb-1"
                                                                            key={i}
                                                                        >
                                                                            <div className={styles["tagModal"]}>
                                                                                #{row.toUpperCase()}
                                                                            </div>
                                                                        </span>
                                                                    );
                                                                })
                                                                : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div>Data Tidak Ditemukan</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Galeri;
