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
import {
  deletePage,
  getAllPage
} from "../../../../../redux/actions/site-management/settings/page.actions";

import { DELETE_PAGE_RESET } from "../../../../../redux/types/site-management/settings/page.type";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  

  const {
    loading: allLoading,
    error,
    pages,
  } = useSelector((state) => state.allPage);

  console.log("pages",pages)

  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.deletePage);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  let loading = false;
  let { page = 1, cari, success } = router.query;
  if (allLoading) {
    loading = allLoading;
  }
  // else if (deleteLoading) {
  //   loading = deleteLoading;
  // }
  page = Number(page);

  const onNewReset = () => {
    router.replace("site-management/setting/page", undefined, {
      shallow: true,
    });
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
        dispatch(deletePage(id, token));
      }
    });
  };

  const handleChangeLimit = (limit,token) => {
    dispatch(getAllPage(page,cari,limit,token))
  }

  useEffect(() => {
    if (isDeleted) {
      Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then(
        (result) => {
          if (result.isConfirmed) {
            dispatch(getAllPage(page,cari,limit,token))
          }
        }
      );
      dispatch({
        type: DELETE_PAGE_RESET,
      });
    }
  }, [limit, isDeleted, dispatch, cari]);


  const handleSearch = () => {
    dispatch(getAllPage(page,search,5,token))
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              List Page
            </h3>
            <div className="card-toolbar">
              <Link href="/site-management/setting/tambah-page" passHref>
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd className="mr-3" width="14" height="14" />
                  Tambah Page
                </a>
              </Link>
            </div>
          </div>
          <div className="card-body pt-0">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                    <div className="row w-100">
                      <div className="col-12 col-sm-6">
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
                            onChange={(e) => setSearch(e.target.value)}
                          />
                          <button
                            type="submit"
                            className="btn bg-blue-primary text-white right-center-absolute"
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
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">Page Name</th>
                        <th className="text-left align-middle">Link Url</th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!pages || (pages && pages.artikel.length === 0) ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h4>Data tidak ditemukan</h4>
                          </td>
                        </tr>
                      ) : (
                        pages &&
                        pages.artikel.map((items, i) => {
                          return (
                            <tr key={i}>
                              <td className="align-middle text-left">
                                {limit === null
                                  ? i + 1 * (page * 5) - (5 - 1)
                                  : i + 1 * (page * limit) - (limit - 1)}
                              </td>
                              <td className="align-middle text-left">
                                {items.name}
                              </td>
                              <td className="align-middle text-left">
                                {items.url}
                              </td>
                              <td className="align-middle text-left">
                                <p
                                  className="status-div-red mb-0"
                                  style={{ width: "max-content" }}
                                >
                                  {items.status}
                                </p>
                              </td>
                              <td className="align-middle text-left">
                                <div className="d-flex align-items-center">
                                  <Link href={`/site-management/setting/ubah-page/${items.id}`}>
                                  <a
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                  >
                                    <IconPencil width="16" height="16" />
                                    <div className="text-hover-show-hapus">
                                      Ubah
                                    </div>
                                  </a>
                                  </Link>
                                  <Link href={`/site-management/setting/preview-page/${items.id}`}>
                                  <a
                                    className="btn btn-link-action bg-blue-secondary mx-3 position-relative btn-delete"
                                  >
                                    <IconEye width="16" height="16" />
                                    <div className="text-hover-show-hapus">
                                      Preview
                                    </div>
                                  </a>
                                  </Link>

                                  <button
                                    className="btn btn-link-action bg-blue-secondary position-relative btn-delete"
                                    onClick={() =>
                                      handleDelete(items.id)
                                    }
                                  >
                                    <IconDelete width="16" height="16" />
                                    <div className="text-hover-show-hapus">
                                      Hapus
                                    </div>
                                  </button>
                                </div>
                              </td>
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
                <div className="table-pagination paginate-cs">
                  {pages && pages.perPage < pages.total && (
                  <div className="table-pagination">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={pages.perPage}
                      totalItemsCount={pages.total}
                      pageRangeDisplayed={3}
                      onChange={(page) => dispatch(getAllPage(page))}

                      nextPageText={">"}
                      prevPageText={"<"}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
                </div>

                <div className="table-total ml-auto">
                  <div className="row">
                    <div className="col-4 mr-0 p-0">
                      <select
                        className="form-control mr-5 cursor-pointer"
                        id="exampleFormControlSelect2"
                        defaultValue=""
                        style={{
                          width: "63px",
                          background: "#F3F6F9",
                          borderColor: "#F3F6F9",
                          color: "#9E9E9E",
                        }}
                        onChange={(e) =>
                          handleChangeLimit(e.target.value,token)
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
                        Total Data 9 List Data
                      </p>
                    </div>
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

export default Table;
