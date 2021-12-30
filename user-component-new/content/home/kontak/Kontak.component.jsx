import React from "react";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";

import { Container, Card, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

import HomeWrapper from "../../../components/wrapper/Home.wrapper";

export default function Kontak() {
  const router = useRouter();
  return (
    <>
      <HomeWrapper>
        <BreadcrumbComponent data={[{ link: router.asPath, name: "Kontak" }]} />
        <Row>
          <Col md={12}>
            <div className="mb-3 title-pelatihan">
              <h1 className="fw-700 fz-40">Kontak</h1>

              <div className="mt-5 mt-md-1">
                <p className="mr-6 fz-18 text-muted fw-400">
                  Layanan Pusat Informasi Digitalent Scholarship
                </p>
              </div>
            </div>
          </Col>
        </Row>
        {/* <div className="mt-5">
          <h1 className="fw-700 fz-40">Kontak</h1>
          <p className="mr-6 fz-18 text-muted fw-400">
            Layanan Pusat Informasi Digitalent Scholarship
          </p>
        </div> */}
        <div className="my-10 w-100">
          <Card className="rounded-xl">
            <Row>
              <Col lg={6}>
                <div className="p-15">
                  <p className="fw-600 fz-20">Alamat</p>
                  <p className="mb-0 fz-16">
                    Kementrian Komunikasi dan Informatika RI
                  </p>
                  <p className="mb-0 fz-16">Jl. Medan Merdeka Barat No. 9</p>
                  <p className="mb-0 fz-16">Jakarta Pusat, 10110</p>
                  <br />
                  <p className="mb-0 fz-16">digitalent@mail.kominfo.go.id</p>
                </div>
              </Col>
              <Col lg={6} className="align-self-center">
                <div className="d-flex align-item-center">
                  <iframe
                    width="100%"
                    height="270px"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=kementrian%20komunikasi%20dan%20informatika&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    scrolling="no"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="-"
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </HomeWrapper>
    </>
  );
}
