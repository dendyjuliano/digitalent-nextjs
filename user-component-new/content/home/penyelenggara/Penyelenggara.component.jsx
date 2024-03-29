import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Pagination from "react-js-pagination";
import { getAllPenyeleggaraPage } from "../../../../redux/actions/beranda/beranda.actions";
import { SweatAlert } from "../../../../utils/middleware/helper/index";
import PulseLoaderRender from "../../../components/loader/PulseLoader";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";

const Penyelenggara = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { penyelenggara, loading, error } = useSelector(
    (state) => state.allPenyelenggaraPage
  );

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    if (error) {
      SweatAlert("Error", error, "error");
    }
  }, [error]);

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
    dispatch(getAllPenyeleggaraPage(pageNumber, 24, search, order));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(getAllPenyeleggaraPage(1, 24, search, order));
  };

  const handleOrder = (value) => {
    setPage(1);
    setOrder(value);
    dispatch(getAllPenyeleggaraPage(1, 24, search, value));
  };

  return (
    <>
      <HomeWrapper>
        <BreadcrumbComponent
          data={[{ link: router.asPath, name: "Mitra Pelatihan" }]}
        />

        <section className="penyelenggara-title-filter">
          <h1 className="mb-4 fz-40">Mitra Pelatihan</h1>
          <p className="mr-6 fz-18 text-muted fw-400">
            Memiliki Lembaga Pelatihan dan ingin menjadi bagian dari Program
            Digitalent? tanya saja{" "}
            <span
              onClick={() => {
                router.push("/helpdesk/live-chat");
              }}
              className="text-primary fw-500"
              style={{ cursor: "pointer" }}
            >
              di sini
            </span>
          </p>

          <div className="filter my-15">
            <Row>
              <Col md={7} className="my-auto">
                <form className="mb-3" onSubmit={handleSearch}>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div
                        className="input-group-text bg-light border-right-0 pr-5"
                        style={{
                          borderTopLeftRadius: "150px",
                          borderBottomLeftRadius: "150px",
                        }}
                      >
                        <i className="ri-search-line"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control border-left-0 border p-0 bg-light"
                      placeholder="Cari Mitra.."
                      style={{ height: "46px" }}
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                    <div>
                      <button
                        className="btn btn-primary-dashboard"
                        style={{
                          borderTopRightRadius: "150px",
                          borderBottomRightRadius: "150px",
                          height: "46px",
                        }}
                        type="submit"
                      >
                        Cari
                      </button>
                    </div>
                  </div>
                </form>
              </Col>
              <Col md={2} className="my-auto ">
                <p className="mb-3 mb-md-0 float-md-right">
                  Urutkan berdasarkan :
                </p>
              </Col>
              <Col md={3} className="my-auto">
                <div className="d-flex filter-action">
                  <Button
                    variant="transparent"
                    className={
                      order === "asc"
                        ? `bg-penyelenggara-primary btn-penyelenggara-rounded btn-block  mr-3`
                        : `bg-penyelenggara-light btn-penyelenggara-rounded btn-block  mr-3`
                    }
                    onClick={() => handleOrder("asc")}
                  >
                    A - Z
                  </Button>
                  <Button
                    variant="transparent"
                    className={
                      order === "desc"
                        ? `bg-penyelenggara-primary btn-penyelenggara-rounded btn-block mt-0`
                        : `bg-penyelenggara-light btn-penyelenggara-rounded btn-block mt-0`
                    }
                    onClick={() => handleOrder("desc")}
                  >
                    Z - A
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        <section className="penyelenggara-content">
          <Row className="d-flex justify-content-start">
            {loading && <PulseLoaderRender />}
            {!penyelenggara ||
              (penyelenggara && penyelenggara.data.list_mitras.length === 0 ? (
                <Col md={12} className="text-center mb-10 mt-11">
                  <Image
                    src="/assets/media/empty-akademi-pelatihan.png"
                    width={525}
                    height={350}
                  />
                  <h1
                    className="fw-600 fz-24 mt-14"
                    style={{ color: "#1f1f1f" }}
                  >
                    Tidak ada Mitra terkait {`"${search}"`}
                  </h1>
                </Col>
              ) : (
                penyelenggara.data.list_mitras.map((row, i) => (
                  <Col
                    md={4}
                    lg={3}
                    xl={2}
                    sm={6}
                    xs={6}
                    className="text-center mb-10"
                    key={i}
                  >
                    <div className="penyelenggara-mitra">
                      <div className="penyelenggara-wrapper mx-auto d-flex align-items-center justify-content-center">
                        <Image
                          src={
                            (row.agency_logo &&
                              process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                                row.agency_logo) ||
                            `/assets/media/image-404.png`
                          }
                          width={90}
                          height={90}
                          objectFit="contain"
                        />
                      </div>
                      <p className="my-5 d-flex mx-auto justify-content-center">
                        {row.name.substring(0, 10)}
                      </p>
                    </div>
                  </Col>
                ))
              ))}
          </Row>
          <Row className="my-5 d-flex justify-content-center">
            {penyelenggara &&
              penyelenggara.data.perPage < penyelenggara.data.total && (
                <div className="table-pagination">
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={penyelenggara.data.perPage}
                    totalItemsCount={penyelenggara.data.total}
                    pageRangeDisplayed={3}
                    onChange={handlePagination}
                    nextPageText={">"}
                    prevPageText={"<"}
                    firstPageText={"<<"}
                    lastPageText={">>"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              )}
          </Row>
        </section>
      </HomeWrapper>
    </>
  );
};

export default Penyelenggara;
