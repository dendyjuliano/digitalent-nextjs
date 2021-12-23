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
import stylesPag from "../../../../../styles/pagination.module.css";
import { getAllListsPeserta, deletePesertaDts } from "../../../../../redux/actions/site-management/user/peserta-dts";
import Swal from "sweetalert2";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allListPeserta = useSelector((state) => state.allListPeserta);
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);

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
  }, [allListPeserta])

  useEffect(() => {

  }, [windowDimensions])

  const listPeserta =
    allListPeserta?.data?.data?.list?.length > 0 ? (
      allListPeserta?.data?.data?.list?.map((item, index) => {
        return (
          <tr key={index}>
            <td className="align-middle text-left">
              {index + limit * (page - 1) + 1}
            </td>
            <td className="align-middle text-left"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "11rem",
              }}
            >
              {item.name}
            </td>
            <td className="align-middle text-left">{item.email}</td>
            <td className="align-middle text-left">{item.nomor_handphone}</td>
            <td className="align-middle text-left">
              <div className="d-flex align-items-center">
                <Link
                  href={`/site-management/user/user-dts/ubah-peserta-dts/${item.user_id}`}
                >
                  <a
                    className={`btn btn-link-action bg-blue-secondary position-relative btn-delete ${localStorage
                      .getItem("permissions")
                      .includes("site_management.user.peserta_dts.manage")}`}
                  >
                    <IconPencil width="16" height="16" />
                    <div className="text-hover-show-hapus">Ubah</div>
                  </a>
                </Link>
                <Link
                  href={`/site-management/user/user-dts/detail-peserta-dts/${item.user_id}`}
                >
                  <a
                    className={`btn btn-link-action bg-blue-secondary ml-3 position-relative btn-delete ${localStorage
                      .getItem("permissions")
                      .includes("site_management.user.peserta_dts.view")}`}
                  >
                    <IconEye width="16" height="16" />
                    <div className="text-hover-show-hapus">Detail</div>
                  </a>
                </Link>
                <button
                  className="btn btn-link-action bg-blue-secondary text-white ml-3 my-5 position-relative btn-delete"
                  onClick={() => handleDelete(item.user_id)}
                >
                  <i className="ri-delete-bin-fill p-0 text-white"></i>
                  <div className="text-hover-show-hapus">
                    Hapus
                  </div>
                </button>
              </div>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="8" className="align-middle text-center">
          Data Kosong
        </td>
      </tr>
    );

  const onNewReset = () => {
    router.replace("/site-management/role", undefined, {
      shallow: true,
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah anda yakin ?',
      text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya !",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePesertaDts(token, id))
      }
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1);
    setLimit(5);
    dispatch(getAllListsPeserta(token, 5, 1, search));
  }

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              List User DTS
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <form
                    onSubmit={(e) => handleSearch(e)}
                    className="d-flex align-items-center w-100"
                  >
                    <div className="row w-100">
                      <div className="col-12 col-sm-4">
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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPage(1);
                              setLimit(5);
                              dispatch(getAllListsPeserta(token, 5, 1, search));
                            }}
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
                  </form>
                </div>
              </div>
            </div>
            <div className="table-page mt-5">
              <div className="table-responsive">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left align-middle">Nama Lengkap</th>
                      <th className="text-left align-middle">Email</th>
                      <th className="text-left align-middle">No. Handphone</th>
                      <th className="text-left align-middle">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!allListPeserta?.loading ? (
                      listPeserta
                    ) : (
                      <tr>
                        <td colSpan="8" className="align-middle text-center">
                          <LoadingTable />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="row">
                {allListPeserta?.data?.data?.total >= 5 ? (
                  <>
                    <div
                      // className={`${stylesPag.pagination} table-pagination`}
                    className="table-pagination table-pagination pagination-custom col-12 col-md-6"
                    style={{ width: "max-content" }}
                    >
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={allListPeserta?.data?.data?.perPage}
                        totalItemsCount={allListPeserta?.data?.data?.total}
                        pageRangeDisplayed={2}
                        onChange={(e) => {
                          setPage(e);
                          dispatch(getAllListsPeserta(token, limit, e, search));
                        }}
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
                            value={limit}
                            onChange={(e) => {
                              setLimit(e.target.value);
                              dispatch(
                                getAllListsPeserta(
                                  token,
                                  e.target.value,
                                  page,
                                  search
                                )
                              );
                            }}
                            style={{
                              width: "63px",
                              background: "#F3F6F9",
                              borderColor: "#F3F6F9",
                              color: "#9E9E9E",
                            }}
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
                            Total Data {allListPeserta?.data?.data?.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
