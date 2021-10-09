import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Row, Col, Card, Figure, Button } from "react-bootstrap";
import style from "../../../../styles/peserta/dashboard.module.css";

import CardPage from "../../../../components/CardPage";

const Dashboard = () => {
  const handlePublish = (val) => {};
  return (
    <>
      <div className="container-fluid p-6">
        <Row>
          <Col lg={12} xs={12} className="order-1 order-xxl-2 pb-0">
            <Card className="card-custom bg-primary gutter-b mt-5">
              <Card.Body
                className="pt-2"
                style={{
                  backgroundPosition: "left bottom",
                  backgroundImage: "url('/assets/media/jukut.svg')",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="d-flex align-items-center mb-10">
                  <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                    <Row>
                      <Col md={6}>
                        <Col md={12} className="mt-5">
                          <h3 className="font-weight-bolder text-white">
                            Selamat Datang User
                          </h3>
                        </Col>
                        <Col md={12}>
                          <p className="font-weight-bold text-white">
                            Sudah Makan Hari ini? <br /> Kalau sudah yuk dicheck
                            verifikasi Test untuk hari ini :)
                          </p>
                        </Col>
                      </Col>

                      <Col md={6}>
                        <div
                          className="ml-auto float-right ilustrator-dashboard"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "-50px",
                          }}
                        >
                          <Image
                            src="/assets/media/ilustrator-1.svg"
                            width={300}
                            height={200}
                            alt="ilustrator-1"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Col lg={12} md={12} sm={12}>
          <Row>
            <CardPage
              background="bg-extras"
              icon="new/block-white.svg"
              color="#FFFFFF"
              value={0}
              titleValue=""
              title="Lulus Pelatihan"
              publishedVal=""
              routePublish={() => handlePublish("")}
            />

            <CardPage
              background="bg-success"
              icon="new/open-book.svg"
              color="#FFFFFF"
              value={0}
              titleValue=""
              title="Sedang Berjalan"
              publishedVal=""
              routePublish={() => handlePublish("")}
            />
            <CardPage
              background="bg-warning"
              icon="new/mail-white.svg"
              color="#FFFFFF"
              value={0}
              titleValue=""
              title="Menunggu Selesai"
              publishedVal=""
              routePublish={() => handlePublish("")}
            />
            <CardPage
              background="bg-danger"
              icon="new/done-circle.svg"
              color="#FFFFFF"
              value={0}
              titleValue=""
              title="Tidak Lulus Pelatihan"
              publishedVal=""
              routePublish={() => handlePublish("")}
            />
          </Row>
        </Col>

        <Col lg={12} className="order-1 px-0">
          <Card className="card-custom card-stretch gutter-b">
            <Card.Header className="border-0 mt-3">
              <div className="card-title">
                <Image
                  src="/assets/media/image-30.svg"
                  width={83}
                  height={60}
                />
                <h1
                  className="text-dark mt-2 ml-5"
                  style={{ fontSize: "24px" }}
                >
                  Pelatihan yang Sedang Berjalan
                </h1>
              </div>
              <div className="card-toolbar">
                <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                  {"Lihat Selengkapnya >"}
                </Link>
              </div>
            </Card.Header>

            <Card.Body>
              <Card className="shadow">
                <Card.Body className="pb-0 pt-6">
                  <Row>
                    <Col md={3} className="py-6">
                      <Figure>
                        <Image
                          width={234}
                          height={218}
                          src="/assets/media/mitra-icon/laravel-1.svg"
                          objectFit="cover"
                          className={style.figure_img}
                        />
                      </Figure>
                    </Col>
                    <Col md={9} className="py-6">
                      <div className="d-flex flex-row justify-content-start align-items-center">
                        <Image
                          width={77}
                          height={77}
                          className={style.figure_img}
                          objectFit="cover"
                          src="/assets/media/mitra-icon/bukalapak-1.svg"
                        />
                        <div className="penyelenggara flex-column align-items-start ml-8">
                          <h5 className="font-weight-bold">
                            Intermediate Multimedia Designer
                          </h5>
                          <p>Bukapalak</p>
                        </div>
                      </div>

                      <Row className="mt-10">
                        <Col md={6}>
                          <div className="date d-flex align-items-center align-middle">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="19"
                              height="19"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path
                                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
                                fill="rgba(76,189,226,1)"
                              />
                            </svg>
                            <span
                              className={`${style.text_date_register} pl-2`}
                            >
                              05 Jul 21 - 31 Jul 21
                            </span>
                          </div>
                          <div className="date d-flex align-items-center align-middle">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="19"
                              height="19"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path
                                d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zm6 2H4.003L4 20h11V9zm-6.497 9l-3.536-3.536 1.414-1.414 2.122 2.122 4.242-4.243 1.414 1.414L8.503 18z"
                                fill="rgba(76,189,226,1)"
                              />
                            </svg>
                            <span
                              className={`${style.text_date_register} pl-2`}
                            >
                              Test Substansi
                            </span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <Button
                            variant="primary"
                            className="btn-rounded-full ml-auto"
                            size="sm"
                          >
                            Kerjakan Test Substansi
                            <i className="ri-arrow-right-s-line ml-2"></i>
                          </Button>
                        </Col>
                      </Row>
                      <hr />
                      <Button
                        variant="primary"
                        className="btn-rounded-full ml-auto bg-blue-primary"
                        size="sm"
                      >
                        <i className="ri-download-cloud-2-fill mr-2"></i>
                        Download Bukti Pendaftaran
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12} className="order-1 px-0">
          <Card
            bg="transparent"
            border="transparent"
            className="card-custom card-stretch gutter-b"
          >
            <Card.Header
              bg="transparent"
              border="transparent"
              className="bg-transparent border-0 mt-3"
            >
              <div className="card-title">
                <Image
                  src="/assets/media/mitra-icon/bg-beasiswa-1.svg"
                  width={83}
                  height={60}
                />
                <h1
                  className="text-dark mt-2 ml-5"
                  style={{ fontSize: "24px" }}
                >
                  Beasiswa yang tersedia
                </h1>
              </div>
              <div className="card-toolbar">
                <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                  {"Lihat Selengkapnya >"}
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col style={{ width: "230px" }}>
                  <Card className="shadow mb-3">
                    <Card.Body className="text-center">
                      <Image
                        src="/assets/media/mitra-icon/logo-ui-1.svg"
                        width={200}
                        height={110}
                      />
                      <p className="" className={style.text_link}>
                        <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                          Lihat Beasiswa
                        </Link>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col style={{ width: "230px" }}>
                  <Card className="shadow mb-3">
                    <Card.Body className="text-center">
                      <Image
                        src="/assets/media/mitra-icon/logo-itb-1.svg"
                        width={200}
                        height={110}
                      />
                      <p className="" className={style.text_link}>
                        <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                          Lihat Beasiswa
                        </Link>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col style={{ width: "230px" }}>
                  <Card className="shadow mb-3">
                    <Card.Body className="text-center">
                      <Image
                        src="/assets/media/mitra-icon/logo-ui-1.svg"
                        width={200}
                        height={110}
                      />
                      <p className="" className={style.text_link}>
                        <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                          Lihat Beasiswa
                        </Link>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col style={{ width: "230px" }}>
                  <Card className="shadow mb-3">
                    <Card.Body className="text-center">
                      <Image
                        src="/assets/media/mitra-icon/logo-itb-1.svg"
                        width={200}
                        height={110}
                      />
                      <p className="" className={style.text_link}>
                        <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                          Lihat Beasiswa
                        </Link>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col style={{ width: "230px" }}>
                  <Card className="shadow mb-3">
                    <Card.Body className="text-center">
                      <Image
                        src="/assets/media/mitra-icon/logo-itb-1.svg"
                        width={200}
                        height={110}
                      />
                      <p className="" className={style.text_link}>
                        <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                          Lihat Beasiswa
                        </Link>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12} className="order-1 px-0">
          <Card className="card-custom card-stretch gutter-b">
            <Card.Header className="border-0 mt-3">
              <div className="card-title">
                <Image
                  src="/assets/media/mitra-icon/simonas-1.svg"
                  width={83}
                  height={60}
                />
                <h1
                  className="text-dark mt-2 ml-5"
                  style={{ fontSize: "24px" }}
                >
                  Rekomendasi Pekerjaan
                </h1>
              </div>
              <div className="card-toolbar">
                <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                  {"Lihat Selengkapnya >"}
                </Link>
              </div>
            </Card.Header>

            <Card.Body className="pt-3">
              <div className="position-relative overflow-hidden mb-5">
                <i className="ri-search-line left-center-absolute ml-2"></i>
                <input
                  type="text"
                  className="form-control pl-10"
                  placeholder="Ketik disini untuk Pencarian..."
                  //   onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn bg-blue-primary text-white right-center-absolute"
                  style={{
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                  }}
                  //   onClick={handleSearch}
                >
                  Cari
                </button>
              </div>
              <Card className="shadow mb-4">
                <Card.Body className="pb-0 pt-6">
                  <Row>
                    <Col md={2} className="py-6 text-center">
                      <Figure>
                        <Image
                          width={131}
                          height={99}
                          src="/assets/media/mitra-icon/telkom-1.svg"
                          objectFit="cover"
                          className={style.figure_img}
                        />
                      </Figure>
                    </Col>
                    <Col md={10} className="py-6">
                      <div className="d-flex flex-row justify-content-start align-items-center mb-3">
                        <div className="penyelenggara flex-column align-items-start">
                          <p className="my-0">
                            PT. Telkom Indonesia (Persero) Tbk
                          </p>
                          <h5 className="font-weight-bold mt-2">
                            Data Science
                          </h5>
                        </div>
                      </div>

                      <Row>
                        <Col md={6} className="my-auto">
                          <span className="label label-inline label-light-danger font-weight-bold">
                            Salary Undisclosed
                          </span>
                          <span className="label label-inline label-light-danger font-weight-bold ml-2">
                            Deadline 30 September 2021
                          </span>
                          <div className="worker d-flex mt-5">
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M21 19h2v2H1v-2h2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15h4v-8h-2V9h3a1 1 0 0 1 1 1v9zM5 5v14h8V5H5zm2 6h4v2H7v-2zm0-4h4v2H7V7z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                IT & Telco
                              </span>
                            </div>
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Jakarta Selatan
                              </span>
                            </div>
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zM4 16v3h16v-3H4zm0-2h16V7H4v7zM9 3v2h6V3H9zm2 8h2v2h-2v-2z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Permanent Employees
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <Button
                            variant="primary"
                            className="btn-rounded-full ml-auto bg-blue-primary"
                            size="sm"
                          >
                            Apply Now
                            <i className="ri-arrow-right-s-line ml-2"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="shadow mb-4">
                <Card.Body className="pb-0 pt-6">
                  <Row>
                    <Col md={2} className="py-6 text-center">
                      <Figure>
                        <Image
                          width={131}
                          height={99}
                          src="/assets/media/mitra-icon/telkom-1.svg"
                          objectFit="cover"
                          className={style.figure_img}
                        />
                      </Figure>
                    </Col>
                    <Col md={10} className="py-6">
                      <div className="d-flex flex-row justify-content-start align-items-center mb-3">
                        <div className="penyelenggara flex-column align-items-start">
                          <p className="my-0">
                            PT. Telkom Indonesia (Persero) Tbk
                          </p>
                          <h5 className="font-weight-bold mt-2">
                            Data Science
                          </h5>
                        </div>
                      </div>

                      <Row>
                        <Col md={6} className="my-auto">
                          <span className="label label-inline label-light-danger font-weight-bold">
                            Salary Undisclosed
                          </span>
                          <span className="label label-inline label-light-danger font-weight-bold ml-2">
                            Deadline 30 September 2021
                          </span>
                          <div className="worker d-flex mt-5">
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M21 19h2v2H1v-2h2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15h4v-8h-2V9h3a1 1 0 0 1 1 1v9zM5 5v14h8V5H5zm2 6h4v2H7v-2zm0-4h4v2H7V7z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                IT & Telco
                              </span>
                            </div>
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Jakarta Selatan
                              </span>
                            </div>
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zM4 16v3h16v-3H4zm0-2h16V7H4v7zM9 3v2h6V3H9zm2 8h2v2h-2v-2z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Permanent Employees
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <Button
                            variant="primary"
                            className="btn-rounded-full ml-auto bg-blue-primary"
                            size="sm"
                          >
                            Apply Now
                            <i className="ri-arrow-right-s-line ml-2"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default Dashboard;