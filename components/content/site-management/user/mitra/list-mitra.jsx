import React, { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconPencil from "../../../../assets/icon/Pencil";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import Image from "next/image";
import {
  getAllMitraSite,
  setPage,
  searchCooporation,
  limitCooporation,
} from "../../../../../redux/actions/site-management/user/mitra-site.actions";

import styles from "../../../../../styles/previewGaleri.module.css";
import stylesPag from "../../../../../styles/pagination.module.css";

const Table = ({ token }) => {
  let dispatch = useDispatch();

  const allMitraSite = useSelector((state) => state.allMitraSite);
  const [valueSearch, setValueSearch] = useState("");
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    dispatch(getAllMitraSite(token));

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    dispatch,
    allMitraSite.keyword,
    allMitraSite.page,
    allMitraSite.limit,
    token,
  ]);
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header row border-0">
            <h3
              className={`${styles.headTitle} col-12 col-sm-8 col-md-8 col-lg-8 col-xl-9`}
            >
              List User Mitra
            </h3>
            {localStorage
              .getItem("permissions")
              .includes("site_management.user.mitra.manage") && (
              <div className="card-toolbar row col-12 col-sm-4 col-md-4 col-lg-4 col-xl-3">
                <Link href="/site-management/user/mitra/tambah-mitra" passHref>
                  <a
                    className={`${styles.btnTambah} btn btn-primary-rounded-full px-6 font-weight-bold btn-block`}
                  >
                    <IconAdd className="mr-3" width="14" height="14" />
                    Tambah Mitra
                  </a>
                </Link>
              </div>
            )}
          </div>
          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12 pr-0">
                  <div className="d-flex align-items-center w-100">
                    <div className="row w-100">
                      <div className="col-12 col-sm-12 col-md-5 col-lg-6 col-xl-5 pr-0">
                        <div className="position-relative overflow-hidden w-100">
                          <IconSearch
                            style={{ left: "10" }}
                            className="left-center-absolute"
                          />
                          <input
                            id="kt_datatable_search_query"
                            type="text"
                            className="form-control pl-10"
                            placeholder="Ketik disini untuk Pencarian..."
                            onChange={(e) =>
                              handleChangeValueSearch(e.target.value)
                            }
                          />
                          <button
                            type="button"
                            onClick={(e) => handleSubmit(e)}
                            className="btn bg-blue-primary text-white right-center-absolute"
                            style={{
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0",
                            }}
                          >
                            Cari
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                {allMitraSite.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">Logo</th>
                        <th className="text-left align-middle">Mitra</th>
                        <th className="text-left align-middle">Website</th>
                        <th className="text-left align-middle">Kerjasama</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMitraSite.data?.list_mitras.length === 0 ? (
                        <td className="align-middle text-center" colSpan="6">
                          Data Kosong
                        </td>
                      ) : (
                        allMitraSite.data?.list_mitras.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-left">
                                {allMitraSite.page === 1
                                  ? index + 1
                                  : (allMitraSite.page - 1) *
                                      allMitraSite.limit +
                                    (index + 1)}
                              </td>
                              <td className="align-middle text-left">
                                {!items.agency_logo ? (
                                  "-"
                                ) : (
                                  <Image
                                    unoptimized={
                                      process.env.ENVIRONMENT !== "PRODUCTION"
                                    }
                                    src={
                                      process.env
                                        .END_POINT_API_IMAGE_PARTNERSHIP +
                                      items.agency_logo
                                    }
                                    width={40}
                                    height={40}
                                    alt="logo"
                                  />
                                )}
                              </td>
                              <td className="align-middle text-left p-part-t text-overflow-ens">
                                {items.user.name}
                              </td>
                              <td className="align-middle text-left p-part-t text-overflow-ens">
                                {!items.website ? "-" : items.website}
                              </td>
                              <td className="align-middle text-left">
                                {items.cooperations_count}
                              </td>
                              <td className="align-middle text-left">
                                {localStorage
                                  .getItem("permissions")
                                  .includes(
                                    "site_management.user.mitra.manage"
                                  ) && (
                                  <Link
                                    href={`/site-management/user/mitra/edit-mitra/${items.id}`}
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                      <IconPencil width="16" height="16" />
                                      <div className="text-hover-show-hapus">
                                        Ubah
                                      </div>
                                    </a>
                                  </Link>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="row">
                {allMitraSite.data.total > 5 && (
                  <>
                    <div className={`${stylesPag.pagination} table-pagination`}>
                      <Pagination
                        activePage={allMitraSite.page}
                        itemsCountPerPage={allMitraSite.data?.perPage}
                        totalItemsCount={allMitraSite.data?.total}
                        pageRangeDisplayed={windowDimensions.width > 350 ? 3 : 1}
                        onChange={(page) => dispatch(setPage(page))}
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

                {allMitraSite ? (
                  <div className={`${stylesPag.rightPag} table-total ml-auto`}>
                    <div className="row">
                      <div className="col-4 mr-0 mt-3">
                        <select
                          className="form-control pr-2 cursor-pointer"
                          id="exampleFormControlSelect2"
                          defaultValue=""
                          style={{
                            width: "70px",
                            background: "#F3F6F9",
                            borderColor: "#F3F6F9",
                            color: "#9E9E9E",
                          }}
                          onChange={(e) =>
                            dispatch(limitCooporation(e.target.value, token))
                          }
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="30">30</option>
                          <option value="40">40</option>
                          <option value="50">50</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto">
                        <p
                          className="align-middle mt-5 pt-1"
                          style={{ color: "#B5B5C3"}}
                        >
                          Total Data{" "}
                          {allMitraSite.data && allMitraSite.data.total} List Data
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
