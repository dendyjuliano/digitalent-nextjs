import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../LoadingTable";
import IconEye from "../../../assets/icon/Eye";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";
import IconSearch from "../../../assets/icon/Search";
import AlertBar from "../../partnership/components/BarAlert";
import Image from "next/image";
import moment from "moment";
import Swal from "sweetalert2";
import Cookies from 'js-cookie'

import {
  getAllExportData,
  setPage,
  limitCooporation,
  searchCooporation,
  exportFileCSV,
  deleteExportDataAction,
} from "../../../../redux/actions/site-management/export-data.actions";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allExportData = useSelector((state) => state.allExportData);
  const deleteExportData = useSelector((state) => state.deleteExportData);

  const handleDelete = (e, id) => {
    e.preventDefault();
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
        dispatch(deleteExportDataAction(id, token, Cookies.get("token_permission")));
        dispatch(getAllExportData(token, Cookies.get("token_permission")));
      }
    });
  };

  const [valueSearch, setValueSearch] = useState("");
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  useEffect(() => {
    dispatch(getAllExportData(token, Cookies.get("token_permission")));
    // if (deleteExportData?.isDeleted) {
    //   Swal.fire("Berhasil", "Data berhasil dihapus", "success").then(() => {
    //     dispatch(getAllExportData(token, Cookies.get("token_permission")));
    //   });
    // }
  }, [
    dispatch,
    allExportData.cari,
    allExportData.page,
    allExportData.limit,
    token,
    deleteExportData.isDeleted,
  ]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              Export Data
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <div className="table-filter">
              <div className="row">
                <div className="col-12 col-sm-4">
                  <div className="d-flex align-items-center w-100 mt-4">
                    <div className="position-relative overflow-hidden w-100">
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <IconSearch
                          style={{ left: "10" }}
                          className="left-center-absolute"
                        />
                        <input
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
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 ml-auto">
                  {localStorage
                    .getItem("permissions")
                    .includes("site_management.export_data.manage") && (
                      <div className="d-flex justify-content-end mt-4">
                        <Link
                          href="/site-management/export-data/filter-export-data"
                          passHref
                        >
                          <a className="btn btn-rounded-full bg-blue-secondary text-white">
                            Filter Data
                          </a>
                        </Link>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                {allExportData.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">
                          Histori Filter Data
                        </th>
                        <th className="text-left align-middle">
                          Tanggal Filter Data
                        </th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allExportData?.data?.total === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center">
                            Data Kosong
                          </td>
                        </tr>
                      ) : (
                        allExportData?.data?.exports?.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-left">
                                {allExportData.page === 1
                                  ? index + 1
                                  : (allExportData.page - 1) *
                                  allExportData.limit +
                                  (index + 1)}
                              </td>
                              <td className="align-middle text-left">
                                {items?.user?.name || "-"}
                              </td>
                              <td className="align-middle text-left">
                                {moment(items.filtered_at).format(
                                  "DD MMMM YYYY"
                                )}
                              </td>
                              <td className="align-middle text-left">
                                <div className="d-flex align-items-center">
                                  {localStorage
                                    .getItem("permissions")
                                    .includes(
                                      "site_management.export_data.manage"
                                    ) && (
                                      <button
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3"
                                        onClick={() =>
                                          dispatch(exportFileCSV(items.id, token, Cookies.get("token_permission")))
                                        }
                                      >
                                        <Image
                                          src="/assets/icon/download.svg"
                                          width={16}
                                          height={16}
                                          alt="download"
                                        />
                                        <div className="text-hover-show-hapus">
                                          Unduh
                                        </div>
                                      </button>
                                    )}

                                  {/* <button
                            className="btn btn-link-action bg-blue-secondary mx-3 position-relative btn-delete"
                            onClick={() =>
                              router.push(
                                `/site-management/export-data/detail-data`
                              )
                            }
                          >
                            <IconEye width="16" height="16" />
                            <div className="text-hover-show-hapus">Detail</div>
                          </button> */}
                                  {localStorage
                                    .getItem("permissions")
                                    .includes(
                                      "site_management.export_data.view"
                                    ) && (
                                      <Link
                                        href={`/site-management/export-data/detail-data/${items.id}`}
                                      >
                                        <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete mr-3">
                                          <IconEye width="16" height="16" />
                                          <div className="text-hover-show-hapus">
                                            Detail
                                          </div>
                                        </a>
                                      </Link>
                                    )}

                                  {localStorage
                                    .getItem("permissions")
                                    .includes(
                                      "site_management.export_data.manage"
                                    ) && (
                                      <button
                                        className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                        onClick={(e) => handleDelete(e, items.id)}
                                      >
                                        <IconDelete width="16" height="16" />
                                        <div className="text-hover-show-hapus">
                                          Hapus
                                        </div>
                                      </button>
                                    )}
                                </div>
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
                {allExportData?.data?.perPage < allExportData?.data?.total && (
                  <div className="row px-4">
                    <div className="table-pagination pagination-custom col-12 col-md-6">
                      <Pagination
                        activePage={allExportData.page}
                        itemsCountPerPage={allExportData.data.perPage}
                        totalItemsCount={allExportData.data.total}
                        pageRangeDisplayed={3}
                        onChange={(page) => dispatch(setPage(page))}
                        nextPageText={">"}
                        prevPageText={"<"}
                        firstPageText={"<<"}
                        lastPageText={">>"}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                  </div>
                )}
                {
                  allExportData ? (
                    <div className="table-total ml-auto mr-4">
                      <div className="row mt-4">
                        <div className="col-4 p-0">
                          <select
                            className="form-control cursor-pointer pr-2"
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
                            className="align-middle mt-3"
                            style={{ color: "#B5B5C3", whiteSpace: "nowrap" }}
                          >
                            Total Data{" "}
                            {allExportData.data && allExportData.data.total} List
                            Data
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
