import React from "react";
import { Card, Col, Row, Button, Badge } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import style from "../../../../styles/peserta/dashboard.module.css";

const Selesai = () => {
  return (
    <>
      <Col lg={12} className="order-1 px-0">
        <Card className="card-custom card-stretch gutter-b">
          <Card.Body>
            <Card className="shadow mb-5">
              <Card.Body className="pb-0 pt-0 pl-0 ">
                <Row>
                  <Col md={3}>
                    <Image
                      layout="fill"
                      src="/assets/media/bg-admin-1.png"
                      objectFit="cover"
                      className={`${style.figure_img} img-fluid`}
                    />
                    <Card.ImgOverlay>
                      <Badge bg="secondary text-white text-uppercase">
                        Pelatihan Online
                      </Badge>
                    </Card.ImgOverlay>
                  </Col>
                  <Col md={9} className="px-10 pt-5">
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      <Image
                        width={64}
                        height={64}
                        className={style.figure_img_mitra}
                        objectFit="cover"
                        src="/assets/media/mitra-icon/bukalapak-1.svg"
                      />
                      <div className="penyelenggara flex-column align-items-start ml-8 pt-2">
                        <h4 className="font-weight-bolder my-0">
                          Intermediate Multimedia Designer Intermediate
                          Multimedia Designer
                        </h4>
                        <h4 className="font-weight-bolder">
                          Intermediate Multimedia Designer - Gojek Akademi
                        </h4>
                      </div>
                    </div>

                    <Row className="mt-10">
                      <Col md={6}>
                        <div className="d-flex flex-row">
                          <div className="date d-flex align-items-center align-middle mr-7">
                            <i className="ri-time-line"></i>
                            <span
                              className={`${style.text_date_register} pl-2`}
                            >
                              05 Jul 21 - 31 Jul 21
                            </span>
                          </div>
                          <div className="date d-flex align-items-center align-middle">
                            <i className="ri-group-line"></i>
                            <span
                              className={`${style.text_date_register} pl-2`}
                            >
                              Status : Lulus Pelatihan
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}></Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={6}>
                        <Button
                          variant="primary"
                          className="btn-rounded-full ml-auto bg-blue-primary btn-block d-flex justify-content-center mb-5"
                          size="sm"
                        >
                          <i className="ri-download-cloud-2-fill mr-2"></i>
                          Lihat Sertifikasi
                        </Button>
                      </Col>
                      <Col md={6}>
                        <Button
                          variant="primary"
                          className="btn-rounded-full btn-block d-flex justify-content-center mb-5"
                          size="sm"
                        >
                          Upload Sertifikasi
                          <i className="ri-upload-2-line ml-2"></i>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="shadow mb-5">
              <Card.Body className="pb-0 pt-0 pl-0 ">
                <Row>
                  <Col md={3}>
                    <Image
                      layout="fill"
                      src="/assets/media/bg-admin-1.png"
                      objectFit="cover"
                      className={`${style.figure_img} img-fluid`}
                    />
                    <Card.ImgOverlay>
                      <Badge bg="secondary text-white text-uppercase">
                        Pelatihan Online
                      </Badge>
                    </Card.ImgOverlay>
                  </Col>
                  <Col md={9} className="px-10 pt-5">
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      <Image
                        width={64}
                        height={64}
                        className={style.figure_img_mitra}
                        objectFit="cover"
                        src="/assets/media/mitra-icon/bukalapak-1.svg"
                      />
                      <div className="penyelenggara flex-column align-items-start ml-8 pt-2">
                        <h4 className="font-weight-bolder my-0">
                          Intermediate Multimedia Designer Intermediate
                          Multimedia Designer
                        </h4>
                        <h4 className="font-weight-bolder">
                          Intermediate Multimedia Designer - Gojek Akademi
                        </h4>
                      </div>
                    </div>
                    <Row className="mt-10">
                      <Col md={6}>
                        <div className="d-flex flex-row">
                          <div className="date d-flex align-items-center align-middle mr-7">
                            <i className="ri-time-line"></i>
                            <span
                              className={`${style.text_date_register} pl-2`}
                            >
                              05 Jul 21 - 31 Jul 21
                            </span>
                          </div>
                          <div className="date d-flex align-items-center align-middle">
                            <i className="ri-group-line"></i>
                            <span
                              className={`${style.text_date_register} pl-2`}
                            >
                              Status : Lulus Pelatihan
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}></Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={6} className="mb-5">
                        <Button
                          variant="primary"
                          className="btn-rounded-full ml-auto bg-blue-primary btn-block d-flex justify-content-center mb-5"
                          size="sm"
                        >
                          <i className="ri-download-cloud-2-fill mr-2"></i>
                          Lihat Sertifikasi
                        </Button>
                      </Col>
                      <Col md={6} className="mb-5">
                        <Button
                          variant="primary"
                          className="btn-rounded-full btn-block d-flex justify-content-center mb-5 invisible"
                          size="sm"
                        >
                          Upload Sertifikasi
                          <i className="ri-upload-2-line ml-2"></i>
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
    </>
  );
};

export default Selesai;
