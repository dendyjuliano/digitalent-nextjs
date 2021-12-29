import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";
import styles from "../../../../styles/previewGaleri.module.css";
import stylesPag from "../../../../styles/pagination.module.css";

import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import SimpleReactValidator from "simple-react-validator";
import { Modal } from "react-bootstrap";

import PageWrapper from "../../../wrapper/page.wrapper";
import ButtonAction from "../../../ButtonAction";
import LoadingTable from "../../../LoadingTable";
import IconArrow from "../../../assets/icon/Arrow";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteKategori,
  clearErrors,
  getAllKategori,
} from "../../../../redux/actions/publikasi/kategori.actions";
import { DELETE_KATEGORI_RESET } from "../../../../redux/types/publikasi/kategori.type";

const Kategori = ({ token, permission }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, kategori } = useSelector(state => state.allKategori);
  const { paginateKategori } = useSelector(state => state.paginationKategori);
  const { error: deleteError, isDeleted } = useSelector(
    state => state.deleteKategori
  );
  const { role_permission } = useSelector((state) => state.allRolePermission);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  let { page = 1, success } = router.query;
  page = Number(page);

  const [limit, setLimit] = useState(null);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [publishValue, setPublishValue] = useState(null);
  const [searchKategori, setSearchKategori] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
        type: DELETE_KATEGORI_RESET,
      });
    }
  }, [dispatch, isDeleted]);

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
  }, [kategori])

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
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteKategori(id, token, permission));
      }
    });
  };

  const onNewReset = () => {
    router.replace("/publikasi/kategori", undefined, { shallow: true });
  };

  const handleSearchKategori = () => {
    if (searchKategori === null) {
      Swal.fire("Oops !", "Harap memilih kategori terlebih dahulu.", "error");
    } else {
      if (searchKategori === null) {
        router.push(`${router.pathname}?page=1&limit=${limit}`);
        setShowModal(false)
      } else {
        router.push(`${router.pathname}?page=1&keyword=${searchKategori}`);
        setShowModal(false)
      }
    }
  };

  const handlePagination = pageNumber => {
    if (limit !== null && search === "" && searchKategori === null) {
      router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`);

    } else if (limit !== null && search !== "" && searchKategori === null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}`);

    } else if (limit === null && search !== "" && searchKategori === null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}`);

    } else if (limit === null && search === "" && searchKategori !== null) {
      router.push(`${router.pathname}?page=${pageNumber}&keyword=${searchKategori}`);

    } else if (limit !== null && search === "" && searchKategori !== null) {
      router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}&keyword=${searchKategori}`);

    } else {
      router.push(`${router.pathname}?page=${pageNumber}`);
    }
  };

  const handleSearch = () => {
    if (limit != null && startDate === null && endDate === null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`);
    } else if (limit !== null && startDate !== null && endDate !== null) {
      router.push(
        `${router.pathname
        }?page=1&keyword=${search}&limit=${limit}&startdate=${moment(
          startDate
        ).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
      );
    } else {
      router.push(`${router.pathname}?page=1&keyword=${search}`);
    }
  };

  const handleLimit = val => {
    setLimit(val);
    if (search === "" && searchKategori === null) {
      router.push(`${router.pathname}?page=1&limit=${val}`);
    } else if (search !== "" && searchKategori === null) {
      router.push(`${router.pathname}?page=1&keyword=${search}&limit=${val}`);
    } else if (search === "" && searchKategori !== null) {
      router.push(
        `${router.pathname}?page=1&keyword=${searchKategori}&limit=${val}`
      );
    } else if (search !== "" && searchKategori !== null) {
      router.push(
        `${router.pathname}?page=1&keyword=${searchKategori}&limit=${val}`
      );
    }
  };

  const resetValueSort = () => {
    setLimit(null)
    setSearchKategori(null);
    setSearch("")
    setShowModal(false)
    $("#selectKategori").prop("selectedIndex", 0);
    router.replace("/publikasi/kategori", undefined, { shallow: false });
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

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header row border-0">
            <h3 className={`${styles.headTitle} col-12 col-sm-8 col-md-8 col-lg-8 col-xl-9`}>
              Kategori
            </h3>
            {
              role_permission?.permissions.includes("publikasi.kategori.manage") || role_permission?.roles.includes("Super Admin") ?
                <div className="card-toolbar col-12 col-sm-4 col-md-4 col-lg-4 col-xl-3">
                  <Link href="/publikasi/kategori/tambah-kategori">
                    <a className={`${styles.btnTambah} btn btn-primary-rounded-full px-6 font-weight-bold btn-block`}>
                      <i className="ri-add-fill pb-1 text-white mr-2 "></i>
                      Tambah Kategori
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
                        <th>Nama</th>
                        <th>Jenis Kategori</th>
                        {
                          role_permission?.permissions.includes("publikasi.kategori.manage") || role_permission?.roles.includes("Super Admin") ?
                            <th className="text-center">Aksi</th>
                            : null
                        }
                      </tr>
                    </thead>

                    <tbody>
                      {!paginateKategori ||
                        (paginateKategori &&
                          paginateKategori?.kategori.length === 0) ? (
                        <td className="align-middle text-center" colSpan={4}>
                          Data Kosong
                        </td>
                      ) : (
                        paginateKategori &&
                        paginateKategori?.kategori?.map((row, i) => {
                          return (
                            <tr key={row.id}>
                              <td className="align-middle text-center">
                                {limit === null ? (
                                  <span>
                                    {i + 1 * (page * 5) - (5 - 1)}
                                  </span>
                                ) : (
                                  <span>
                                    {i + 1 * (page * limit) - (limit - 1)}
                                  </span>
                                )}
                              </td>
                              <td className="align-middle" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '11rem' }}>
                                {row.nama_kategori}
                              </td>
                              <td className="align-middle">
                                {row.jenis_kategori}
                              </td>
                              {
                                role_permission?.permissions.includes("publikasi.kategori.manage") || role_permission?.roles.includes("Super Admin") ?
                                  <td className="align-middle d-flex justify-content-center">
                                    <Link href={`/publikasi/kategori/ubah-kategori?id=${row.id}`}>
                                      <a className="btn btn-link-action bg-blue-secondary text-white mr-2 position-relative btn-delete">
                                        <i className="ri-pencil-fill p-0 text-white"></i>
                                        <div className="text-hover-show-hapus">
                                          Ubah
                                        </div>
                                      </a>
                                    </Link>

                                    <button
                                      className="btn btn-link-action bg-blue-secondary text-white position-relative btn-delete"
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
                          );
                        })
                      )}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>

              {kategori && paginateKategori ? (
                <div className="row">
                  {paginateKategori?.perPage < kategori?.total && (
                    <>
                      <div className={`${stylesPag.pagination} table-pagination`}>
                        <Pagination
                          activePage={page}
                          itemsCountPerPage={paginateKategori?.perPage}
                          totalItemsCount={paginateKategori?.total}
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
                          <option value='5' selected={limit == "5" ? true : false}>5</option>
                          <option value='10' selected={limit == "10" ? true : false}>10</option>
                          <option value='30' selected={limit == "30" ? true : false}>30</option>
                          <option value='40' selected={limit == "40" ? true : false}>40</option>
                          <option value='50' selected={limit == "50" ? true : false}>50</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-5 pt-1"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data {paginateKategori?.total} List Data
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
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
                <div
                  className="modal-body text-left"
                  style={{ height: "200px" }}
                >
                  <div className="mb-10 col-12">
                    <select
                      id="selectKategori"
                      value={searchKategori}
                      className="form-control"
                      onChange={e =>
                        setSearchKategori(e.target.value)
                      }
                      onBlur={e => {
                        setSearchKategori(e.target.value);
                        simpleValidator.current.showMessageFor(
                          "jenis kategori"
                        );
                      }}
                    >
                      <option value="" disabled selected>
                        -- Pilih Kategori --
                      </option>
                      <option value="Berita">Berita</option>
                      <option value="Artikel">Artikel</option>
                      <option value="Galeri">Galeri</option>
                      <option value="Video">Video</option>
                      <option value="Imagetron">Imagetron</option>
                      <option value="Faq">Faq</option>
                    </select>
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
                  onClick={() => handleSearchKategori()}
                >
                  Terapkan
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Kategori;
