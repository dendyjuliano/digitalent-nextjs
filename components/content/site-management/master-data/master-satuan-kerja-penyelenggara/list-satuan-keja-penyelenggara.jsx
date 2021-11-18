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
  getAllUnitWork,
  setPage,
  searchCooporation,
  limitCooporation,
} from "../../../../../redux/actions/site-management/unit-work.actions";
const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allUnitWork = useSelector((state) => state.allUnitWork);
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
    dispatch(getAllUnitWork(token));

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [dispatch, allUnitWork.cari, allUnitWork.page, allUnitWork.limit, token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 px-2 px-sm-6">
            <h3 className="card-title font-weight-bolder text-dark titles-1 pl-2 pl-sm-0">
              List Satuan Kerja Penyelenggara
            </h3>
            <div className="card-toolbar">
              <Link
                href="/site-management/master-data/master-satuan-kerja-penyelenggara/tambah-satuan-kerja-penyelenggara"
                passHref
              >
                <a className="btn btn-rounded-full bg-blue-primary text-white">
                  <IconAdd className="mr-3" width="14" height="14" />
                  Master Satuan Kerja
                </a>
              </Link>
            </div>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <div className="table-filter">
              <div className="row align-items-center">
                <div className="col-lg-12 col-xl-12">
                  <div className="d-flex align-items-center w-100">
                    <div className="row w-100">
                      <div className="col-12 col-xl-4">
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
                            onClick={handleSubmit}
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
                {allUnitWork.status === "process" ? (
                  <LoadingTable />
                ) : (
                  <table className="table table-separate table-head-custom table-checkable">
                    <thead style={{ background: "#F3F6F9" }}>
                      <tr>
                        <th className="text-left">No</th>
                        <th className="text-left align-middle">
                          Nama Satuan Kerja
                        </th>
                        <th className="text-left align-middle">Status</th>
                        <th className="text-left align-middle">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUnitWork.data.unit_work.length === 0 ? (
                        <td className="align-middle text-center" colSpan="4">
                          Data Kosong
                        </td>
                      ) : (
                        allUnitWork.data.unit_work.map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-left">
                                {allUnitWork.page === 1
                                  ? index + 1
                                  : (allUnitWork.page - 1) * allUnitWork.limit +
                                    (index + 1)}
                              </td>
                              <td className="align-middle text-left p-part-t text-overflow-ens">
                                {items.name}
                              </td>
                              <td className="align-middle text-left">
                                {items.status == 1 ? (
                                  <p
                                    className="status-div-green mb-0"
                                    style={{ width: "max-content" }}
                                  >
                                    Aktif
                                  </p>
                                ) : (
                                  <p
                                    className="status-div-red mb-0"
                                    style={{ width: "max-content" }}
                                  >
                                    Tidak Aktif
                                  </p>
                                )}
                              </td>
                              <td className="align-middle text-left">
                                <div className="d-flex align-items-center">
                                  <Link
                                    href={`/site-management/master-data/master-satuan-kerja-penyelenggara/ubah-satuan-kerja-penyelenggara/${items.id}`}
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary position-relative btn-delete">
                                      <IconPencil width="16" height="16" />
                                      <div className="text-hover-show-hapus">
                                        Ubah
                                      </div>
                                    </a>
                                  </Link>

                                  <Link
                                    href={`/site-management/master-data/master-satuan-kerja-penyelenggara/detail-satuan-kerja-penyelenggara/${items.id}`}
                                  >
                                    <a className="btn btn-link-action bg-blue-secondary ml-3 position-relative btn-delete">
                                      <IconEye width="16" height="16" />
                                      <div className="text-hover-show-hapus">
                                        Detail
                                      </div>
                                    </a>
                                  </Link>
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

              <div className="row px-4">
                <div className="table-pagination">
                  <Pagination
                    activePage={allUnitWork.page}
                    itemsCountPerPage={allUnitWork.data.perPage}
                    totalItemsCount={allUnitWork.data.total}
                    pageRangeDisplayed={windowDimensions.width > 300 ? 3 : 1}
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
                        className="form-control cursor-pointer pr-2"
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
                        Total Data {allUnitWork.data && allUnitWork.data.total}{" "}
                        List Data
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
