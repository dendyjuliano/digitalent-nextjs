import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import AlertBar from "../../../partnership/components/BarAlert";
import IconArrow from "../../../../assets/icon/Arrow";
import {
  deleteAdminSite,
  getAllAdminSite,
  setPage,
  searchCooporation,
  limitCooporation,
  updateStatusAdminSite,
} from "../../../../../redux/actions/site-management/user/admin-site.action";
import {} from "../../../../../redux/actions/site-management/role.actions";

import {
  DETAIL_ADMIN_SITE_RESET,
  RESET_UPDATE_STATUS_REDUCER,
} from "../../../../../redux/types/site-management/user/admin-site.type";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allAdminSite = useSelector((state) => state.allAdminSite);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.deleteAdminSite
  );
  const updateStatusAdmin = useSelector((state) => state.updateStatusAdmin);
  const [valueSearch, setValueSearch] = useState("");
  const handleChangeValueSearch = (value) => {
    setValueSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCooporation(valueSearch));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin menghapus data ?",
      text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya !",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAdminSite(id, token));
      }
    });
  };

  useEffect(() => {
    dispatch(getAllAdminSite(token));
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            dispatch(getAllAdminSite(token));
          }
        }
      );
    }
    if (updateStatusAdmin.isUpdated) {
      Swal.fire("Berhasil ", "Status berhasil di update.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            dispatch(getAllAdminSite(token));
            dispatch({
              type: RESET_UPDATE_STATUS_REDUCER,
            });
          }
        }
      );
    }
    if (deleteError) {
      Swal.fire("Gagal", "Data gagal dihapus.", "error");
    }
    dispatch({
      type: DETAIL_ADMIN_SITE_RESET,
    });
  }, [
    dispatch,
    allAdminSite.cari,
    allAdminSite.page,
    allAdminSite.limit,
    token,
    isDeleted,
    deleteError,
    updateStatusAdmin.isUpdated,
  ]);

  useEffect(() => {
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            dispatch(getAllAdminSite(token));
            window.location.reload();
          }
        }
      );
    }
    dispatch({
      type: DETAIL_ADMIN_SITE_RESET,
    });
  }, [isDeleted, dispatch, token]);

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(searchCooporation(valueSearch));
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              List Administrator
            </h3>
            {localStorage
              .getItem("permissions")
              .includes("site_management.user.administrator.manage") && (
              <div className="card-toolbar">
                <Link
                  href="/site-management/user/administrator/tambah-data-administrator"
                  passHref
                >
                  <a className="btn btn-rounded-full bg-blue-primary text-white">
                    <IconAdd className="mr-3" width="14" height="14" />
                    Tambah Administrator
                  </a>
                </Link>
              </div>
            )}
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <div className="row w-100 ml-0 ml-sm-0">
                    <div className="col-12 col-xl-4">
                      <div className="position-relative overflow-hidden w-100">
                        <form onSubmit={e => handleSearch(e)}>
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
                            onClick={handleSubmit}
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
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                {allAdminSite.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">Nama Lengkap</th>
                        <th className="text-left align-middle">Email</th>
                        <th className="text-left align-middle">Role</th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allAdminSite?.data?.list_role?.length === 0 ? (
                        <td className="align-middle text-center" colSpan="6">
                          Data Kosong
                        </td>
                      ) : (
                        allAdminSite?.data?.list_role?.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-left">
                                {allAdminSite.page === 1
                                  ? index + 1
                                  : (allAdminSite.page - 1) *
                                      allAdminSite.limit +
                                    (index + 1)}
                              </td>
                              <td className="align-middle text-left">
                                {items.name}
                              </td>
                              <td className="align-middle text-left">
                                {items.email ? items.email : "-"}
                              </td>
                              <td className="align-middle text-left">
                                {items.roles?.length > 1
                                  ? `${items.roles[0]?.name}, ${
                                      items?.roles?.length - 1
                                    } More Role`
                                  : `${items.roles[0]?.name}`}
                              </td>
                              <td className="align-middle text-left">
                                <div className="position-relative w-max-content">
                                  <select
                                    name=""
                                    id=""
                                    className={`form-control remove-icon-default dropdown-arrows-${
                                      items.status === 1
                                        ? "green"
                                        : "red-primary"
                                    }`}
                                    key={index}
                                    onChange={(e) => {
                                      dispatch(
                                        updateStatusAdminSite(
                                          items.id,
                                          token,
                                          e.target.value
                                        )
                                      );
                                    }}
                                  >
                                    <option
                                      value="1"
                                      selected={items.status === 1}
                                    >
                                      {/* {items.status.name} */}
                                      Aktif
                                    </option>
                                    <option
                                      value="0"
                                      selected={items.status === 0}
                                    >
                                      Tidak Aktif
                                    </option>
                                  </select>
                                  <IconArrow
                                    className="right-center-absolute"
                                    style={{ right: "10px" }}
                                    width="7"
                                    height="7"
                                  />
                                </div>
                              </td>
                              <td className="align-middle text-left">
                                <div className="d-flex align-items-center">
                                  {localStorage
                                    .getItem("permissions")
                                    .includes(
                                      "site_management.user.administrator.manage"
                                    ) && (
                                    <Link
                                      href={{
                                        pathname:
                                          "/site-management/user/administrator/edit-data-administrator",
                                        query: { id: items.id },
                                      }}
                                      passHref
                                    >
                                      <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                        <IconPencil width="16" height="16" />
                                        <div className="text-hover-show-hapus">
                                          Ubah
                                        </div>
                                      </a>
                                    </Link>
                                  )}

                                  {localStorage
                                    .getItem("permissions")
                                    .includes(
                                      "site_management.user.administrator.view"
                                    ) && (
                                    <Link
                                      href={`/site-management/user/administrator/detail-administrator/${items.id}`}
                                    >
                                      <a className="btn btn-link-action bg-blue-secondary mx-3 position-relative btn-delete">
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
                                      "site_management.user.administrator.manage"
                                    ) && (
                                    <button
                                      className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                      onClick={() => handleDelete(items.id)}
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
              {allAdminSite?.data?.total > 5 && (
                <div className="row px-4">
                  <div className="table-pagination">
                    <Pagination
                      activePage={allAdminSite.page}
                      itemsCountPerPage={allAdminSite.data.perPage}
                      totalItemsCount={allAdminSite.data.total}
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

                  <div className="table-total ml-auto mr-4">
                    <div className="row mt-4">
                      <div className="col-4 mr-0 p-0">
                        <select
                          className="form-control pr-2 cursor-pointer"
                          id="exampleFormControlSelect2"
                          defaultValue=""
                          style={{
                            width: "63px",
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
                          {allAdminSite.data && allAdminSite.data.total} List
                          Data
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
