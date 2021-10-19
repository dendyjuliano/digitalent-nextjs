import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import IconLogin from "../../../components/assets/icon-dashboard-peserta/Login";
import { Card, Carousel, Badge } from "react-bootstrap";

// import Slider from "react-slick";
// import CarouselMulti from "react-multi-carousel";

import ImagetronCarousel from "../../components/ImagetronCarousel";
// import AkademiCarousel from "../../components/AkademiCarousel";
import BerandaWrapper from "../../../components/wrapper/beranda.wrapper";

import "../../../styles/beranda.module.css";
// import "react-multi-carousel/lib/styles.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import IconArrow from "../../../components/assets/icon/Arrow2";
import Cardss from "./card";
import StepRegister from "./step-register";
import RilisMedia from "./rilis-media";
import GaleryUpdate from "./galery-update";
import InfoVideo from "./info-videos";
import ComeJoin from "./come-join";
import Footer from "./footer";

const Navigationbar = dynamic(
  () => import("../../../components/templates/navbar.component"),
  {
    ssr: false,
  }
);

const Beranda = () => {
  const { akademi } = useSelector((state) => state.allAkademi);

  const { tema } = useSelector((state) => state.temaByAkademi);

  const { pelatihan } = useSelector((state) => state.pelatihanByTema);

  const [activeTab, setActiveTab] = useState("VSGA");
  const [indexTab, setIndexTab] = useState(0);
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [akademiItem, setAkademiItem] = useState(null);
  const [trainingItem, setTrainingItem] = useState(null);
  const [slideAkademiToShow, setSlideAkademiToShow] = useState(4);
  const [slideTrainingToShow, setSlideTrainingToShow] = useState(3);

    const renderButton = (status, daftar_mulai, daftar_selesai, quota, id) => {
        if (status === true){
            return (
                <div>
                    <Link href={`/detail/kategori/${id}`}>
                        <Button className="btn btn-outline-info rounded-pill col-12">
                            Quick View
                        </Button>
                    </Link>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="d-flex align-content-center">
                        <i className="ri-time-line mr-2"></i>
                        <span className="mt-1">Registrasi: {moment (daftar_mulai).format("DD MMMM YYYY")} - {moment (daftar_selesai).format("DD MMMM YYYY")}</span>
                    </div>
                    <div className="d-flex align-content-center">
                        <i className="ri-group-line mr-2"></i>
                        <span className="mt-1">Kuota {quota} Peserta</span>
                    </div> 
                </div>
            )
        }
    }

  const handleDragStart = (e) => e.preventDefault();

  const handleAkademiCarousel = () => {
    let arr = [];

    if (akademi.length !== 0) {
      for (let i = 0; i < akademi.length; i += slideAkademiToShow) {
        arr.push(akademi.slice(i, i + slideAkademiToShow));
      }

      setAkademiItem(arr);
    }
    // console.log (arr)
  };

  const handleTrainingCarousel = () => {
    let arr = [];

    if (training.length !== 0) {
      for (let i = 0; i < training.length; i += slideTrainingToShow) {
        arr.push(training.slice(i, i + slideTrainingToShow));
      }

      setTrainingItem(arr);
    }
    // console.log (arr)
  };

  const handleIndexShow = () => {
    let arrPelatihan = [];

    if (pelatihan?.length !== 0) {
      for (let i = 0; i < pelatihan?.length; i++) {
        let obj = {
          id: pelatihan[i].id,
          name: pelatihan[i].name,
          showButton: false,
          showDetail: false,
        };
        arrPelatihan.push(obj);
      }
    }

    setShow(arrPelatihan);
    // console.log (arrPelatihan)
  };

  const handleMouseEnter = (index) => {
    let obj = show;

    for (let i = 0; i < obj.length; i++) {
      if (i == index) {
        obj[i].showButton = true;
      }
    }

    setShow(obj);
    // console.log ("mouseOver")
  };

  const handleMouseLeave = (index) => {
    let obj = show;

    for (let i = 0; i < obj.length; i++) {
      if (i == index) {
        obj[i].showButton = false;
      }
    }
    setShow(obj);
    // console.log ("mouseOut")
  };

  const handleActive = (tab, index) => {
    setActiveTab(tab);
    setIndexTab(index);
  };

  const handleQuickView = () => {
    setShowDetail(true);
    // console.log ("open")
  };

  const handleCloseQuickView = () => {
    setShowDetail(false);
    // console.log ("close")
  };

  return (
    <BerandaWrapper title="Digitalent">
      <div style={{ backgroundColor: "white" }}>
        <Navigationbar />

        {/* <ImagetronCarousel /> */}

        {/* Carousel 1 */}
        <div className="container-fluid max-container">
          <div className="carousel-primarys">
            <Splide
              options={{
                type: "loop",
                gap: "1rem",
                autoplay: true,
                padding: "5rem",
                height: "600px",
                breakpoints: {
                  1669: {
                    height: "500px",
                  },
                  1262: {
                    height: "400px",
                  },
                  1062: {
                    height: "300px",
                  },
                  833: {
                    height: "270px",
                  },
                  726: {
                    height: "230px",
                  },
                  629: {
                    height: "210px",
                  },
                  590: {
                    height: "180px",
                    padding: "0",
                    gap: "0",
                  },
                  514: {
                    height: "160px",
                    padding: "0",
                    gap: "0",
                  },
                  450: {
                    height: "160px",
                    padding: "0",
                    gap: "0",
                  },
                  425: {
                    height: "160px",
                    padding: "0",
                    gap: "0",
                  },
                  320: {
                    height: "150px",
                    padding: "0",
                    gap: "0",
                  },
                },
              }}
              hasSliderWrapper
            >
              <SplideSlide>
                <Image
                  layout="fill"
                  objectFit="fill"
                  src={`/assets/media/carousel-01.svg`}
                  alt="First slide"
                  className="mx-5"
                />
              </SplideSlide>
              <SplideSlide>
                <Image
                  layout="fill"
                  objectFit="fill"
                  src={`/assets/media/carousel-01.svg`}
                  alt="First slide"
                  className="mx-5"
                />
              </SplideSlide>
              <SplideSlide>
                <Image
                  layout="fill"
                  objectFit="fill"
                  src={`/assets/media/carousel-01.svg`}
                  alt="First slide"
                  className="mx-5"
                />
              </SplideSlide>
            </Splide>
          </div>
        </div>

        {/* Carousel 2 */}
        <div className="container-fluid max-container">
          <div className="carousel-secondarys">
            <Splide
              options={{
                gap: "1rem",
                drag: "free",
                perPage: 4,
                height: "200px",
                type: "loop",
                breakpoints: {
                  1262: {
                    height: "200px",
                  },
                  1062: {
                    height: "200px",
                    perPage: 3,
                  },
                  833: {
                    height: "150px",
                    perPage: 2,
                  },
                  726: {
                    height: "150px",
                    perPage: 2,
                  },
                  629: {
                    height: "130px",
                    perPage: 1,
                  },
                  590: {
                    height: "180px",
                    padding: "0",
                    gap: "0",
                  },
                  514: {
                    height: "160px",
                    padding: "0",
                    gap: "0",
                    perPage: 1,
                  },
                  450: {
                    height: "150px",
                    padding: "0",
                    gap: "0",
                    perPage: 1,
                  },
                  425: {
                    height: "150px",
                    padding: "0",
                    gap: "0",
                    perPage: 1,
                  },
                  320: {
                    height: "100px",
                    padding: "0",
                    gap: "0",
                    perPage: 1,
                  },
                },
              }}
              hasSliderWrapper
              // hasAutoplayControls
              // hasAutoplayProgress
            >
              <SplideSlide>
                <div className="d-flex align-items-center h-100">
                  <div className="card-1">
                    <h1 className="mb-0 mr-2 fw-700">VSGA</h1>
                    <div>
                      <p className="mb-0" style={{ whiteSpace: "nowrap" }}>
                        Vocational School
                        <br />
                        Graduate Academy
                      </p>
                    </div>
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className="d-flex align-items-center h-100">
                  <div className="card-1 active-card-1">
                    <h1 className="mb-0 mr-2 fw-700">VSGA</h1>
                    <div>
                      <p className="mb-0" style={{ whiteSpace: "nowrap" }}>
                        Vocational School
                        <br />
                        Graduate Academy
                      </p>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            </Splide>
          </div>
        </div>

        <div className="container-fluid max-container">
          {/* Card row */}
          <div className="card-rows">
            {/*  */}
            <div className="d-flex align-items-center justify-content-between px-10">
              <h1 className="mb-0 fw-600 fz-20">Multimedia Designer</h1>
              <div className="d-flex align-items-center">
                <p className="mb-0 fz-14 fw-600" style={{ color: "#0063CC" }}>
                  Lihat Semua
                </p>
                <IconArrow
                  width="8"
                  height="10"
                  fill="#0063CC"
                  className="ml-2"
                  style={{ transform: "rotate(0)" }}
                />
              </div>
            </div>
            {/* card  */}
            <div className="container-fluid">
              <div className="row mt-10">
                <div className="col-12 col-sm-6 col-xl-4">
                  <Cardss label={<label>PELATIHAN ONLINE</label>}>
                    <div className="rounded"></div>
                    <div className="d-flex align-items-center justify-content-between pl-24">
                      <p className="fw-600" style={{ color: "#6C6C6C" }}>
                        Gojek
                      </p>
                      <button className="btn btn-green-rounded">OPEN</button>
                    </div>
                    <h1
                      className="fz-18 fw-600 mt-4"
                      style={{ color: "#1F1F1F" }}
                    >
                      Intermediate Multimedia Designer
                    </h1>
                    <h3
                      className="mb-0 fz-18 fw-400 mt-4"
                      style={{ color: "#6C6C6C" }}
                    >
                      Vocational School Graduate Academy
                    </h3>
                    <hr />

                    <div className="mt-2">
                      <div className="d-flex align-items-center">
                        {/* <IconTime className="mr-2" /> */}
                        Registrasi: 05 Juli 2021 - 21 Juli 2021
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        {/* <IconPeserta className="mr-2" /> */}
                        Kuota: 1000 Peserta
                      </div>
                    </div>
                  </Cardss>
                </div>
                <div className="col-12 col-sm-6 col-xl-4">
                  <Cardss />
                </div>
                <div className="col-12 col-sm-6 col-xl-4">
                  <Cardss />
                </div>
                <div className="col-12 col-sm-6 col-xl-4">
                  <Cardss />
                </div>
                <div className="col-12 col-sm-6 col-xl-4">
                  <Cardss />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-10">
              <Link href="/login">
                <a>
                  <button className="btn btn-sm btn-login-peserta px-12 py-3">
                    Lebih Banyak Tema
                    <IconArrow
                      width="8"
                      height="10"
                      fill="#0063CC"
                      className="ml-2"
                      style={{ transform: "rotate(0)" }}
                    />
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* tahapan pendaftaran */}

        <StepRegister />

        {/* Rilis Media & Informasi Terbaru */}
        <RilisMedia />

        {/* Galeri Terupdate dan Terkini */}

        <GaleryUpdate />

        {/* Informasi Dalam Video Terkini */}
        <InfoVideo />

        {/* Ayo Bergabung, Jadi Jagoan Digital! */}
        <ComeJoin />

        {/* Footer */}
        <Footer />
      </div>
    </BerandaWrapper>
  );
};

export default Beranda;
