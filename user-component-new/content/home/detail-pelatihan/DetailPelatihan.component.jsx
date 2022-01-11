import React, { useEffect } from "react";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { SweatAlert } from "../../../../utils/middleware/helper";

import style from "../../../../styles/peserta/dashboard.module.css";

import TrainingReminder from "../../../components/global/TrainingReminder.component";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";

import IconLove from "../../../../components/assets/icon/Love";
import IconShare from "../../../../components/assets/icon/Share";

import ShareOverlay from "../../../components/global/ShareOverlay.component";

import {
  checkRegisterPelatihan,
  getDetailPelatihan,
} from "../../../../redux/actions/beranda/detail-pelatihan.actions";
import axios from "axios";

const DetailPelatihan = ({ session }) => {
  const router = useRouter();
  const { akademiId } = router.query;

  const dispatch = useDispatch();
  const { pelatihan } = useSelector((state) => state.detailPelatihan);

  useEffect(() => {
    if (pelatihan?.Status === "Close") {
      router.back();
    }
  }, [pelatihan, router]);

  const handleCheckPelatihanReg = async (id, session) => {
    if (session) {
      const data = await dispatch(checkRegisterPelatihan(id, session.token));

      if (data.status === true) {
        // router.push(`/peserta/form-pendaftaran?id=${id}`);
        window.location.href = `/peserta/form-pendaftaran?id=${id}`;
      } else if (data.status === false) {
        let errMessage = data.message;
        SweatAlert("Gagal", errMessage, "error");
      }
    } else {
      router.push(`/login`);
    }
  };

  const handleDownloadSilabus = async () => {
    let silabus = process.env.END_POINT_API_IMAGE_BEASISWA + pelatihan.silabus;
    window.location.href = silabus;
  };

  //disini kurang
  const handleBookmark = async (pelatihan) => {
    const link = process.env.END_POINT_API_PELATIHAN;
    const config = {
      headers: {
        Authorization: "Bearer " + session?.token,
      },
    };

    const body = {
      pelatihan_id: pelatihan.id,
    };

    if (!pelatihan.bookmark) {
      try {
        const data = await axios.post(
          `${link}api/v1/bookmart-peserta/create`,
          body,
          config
        );
        if (data) {
          SweatAlert(
            "Berhasil",
            "Anda berhasil menambahkan pelatihan ke favorit",
            "success"
          );
          dispatch(getDetailPelatihan(router.query.id, session?.token));
        }
      } catch (e) {
        SweatAlert("Gagal", e.message, "error");
      }
    } else {
      try {
        const data = await axios.delete(
          `${link}api/v1/bookmart-peserta/delete?pelatihan_id=${pelatihan.id}`,
          config
        );
        if (data) {
          SweatAlert(
            "Berhasil",
            "Anda berhasil menghapus pelatihan dari favorit",
            "success"
          );

          dispatch(getDetailPelatihan(router.query.id, session?.token));
        }
      } catch (e) {
        SweatAlert("Gagal", e.message, "error");
      }
    }
  };

  return (
    <>
      <HomeWrapper>
        <BreadcrumbComponent
          data={[
            { link: `/detail/akademi/${akademiId}`, name: pelatihan?.akademi },
            { link: router.asPath, name: pelatihan?.name },
          ]}
        />
        <Row>
          <Col md={12} lg={8}>
            <div className="rounded my-5">
              <div className="ml-2 mb-3 title-pelatihan">
                <h1 className="fw-700 fz-40 text-break ">{pelatihan?.name}</h1>

                <div className="d-flex align-items-center mt-5 mt-md-1">
                  <p className="mr-6 fz-18 fw-500">{pelatihan?.akademi}</p>
                  <p
                    className={
                      pelatihan?.Status === "Dibuka"
                        ? `badgess-green`
                        : `badgess-red`
                    }
                  >
                    {pelatihan?.Status}
                  </p>
                </div>

                <Row className="mt-5">
                  <div className="col-6 col-sm-6 col-md-4">
                    <div>
                      <p className="mb-1 fz-14" style={{ color: "#6C6C6C" }}>
                        Registrasi
                      </p>
                      <p className="fz-16 fw-400">
                        {moment(pelatihan?.pendaftaran_mulai)
                          .utc()
                          .format("DD MMM YYYY")}{" "}
                        -{" "}
                        {moment(pelatihan?.pendaftaran_selesai)
                          .utc()
                          .format("DD MMM YYYY")}
                      </p>
                    </div>
                  </div>

                  <div className="col-6 col-sm-6 col-md-3">
                    <div className="">
                      <p className="mb-1 fz-14" style={{ color: "#6C6C6C" }}>
                        Pelaksanaan
                      </p>
                      <p className="fz-16 fw-400">
                        {pelatihan?.metode_pelatihan}
                      </p>
                    </div>
                  </div>

                  <div className="col-6 col-sm-6 col-md-3">
                    <div>
                      <p className="mb-1 fz-14" style={{ color: "#6C6C6C" }}>
                        Pendaftar
                      </p>
                      <p className="fz-16 fw-400">
                        {pelatihan?.kuota_pendaftar} Pendaftar
                      </p>
                    </div>
                  </div>

                  <div className="col-6 col-sm-6 col-md-2">
                    <div className="d-flex align-items-center justify-content-md-end">
                      <ShareOverlay
                        url={`http://dts-dev.majapahit.id/detail/pelatihan/${pelatihan?.id}`}
                        quote={pelatihan?.name}
                      >
                        <button
                          className="btn btn-white roundedss-border mr-4"
                          disabled={pelatihan?.Status !== "Dibuka" && true}
                        >
                          <IconShare />
                        </button>
                      </ShareOverlay>
                      <button
                        disabled={pelatihan?.Status !== "Dibuka" && true}
                        className="btn btn-white roundedss-border"
                        onClick={() => {
                          if (!session) {
                            router.push("/login");
                          } else {
                            if (!session?.roles?.includes("user")) {
                              SweatAlert(
                                "Gagal",
                                "Anda sedang login sebagai Admin",
                                "error"
                              );
                            } else {
                              const pelatihanObj = {
                                bookmark: pelatihan?.bookmart,
                                id: pelatihan?.id,
                              };
                              handleBookmark(pelatihanObj);
                            }
                          }
                        }}
                      >
                        {!pelatihan?.bookmart ? (
                          <IconLove />
                        ) : (
                          <i className="ri-heart-fill text-danger p-0 fz-16" />
                        )}
                      </button>
                    </div>
                  </div>
                </Row>
              </div>
              <div className="image-thumbnail-detail">
                <Image
                  src={
                    (pelatihan?.thumbnail &&
                      pelatihan.thumbnail !== "Belum ada file" &&
                      process.env.END_POINT_API_IMAGE_BEASISWA +
                        pelatihan?.thumbnail) ||
                    "/assets/media/default-card.png"
                  }
                  objectFit="cover"
                  layout="fill"
                  className="rounded-lg"
                />
              </div>
              <div className="p-4 border rounded-xl mt-10">
                <div
                  dangerouslySetInnerHTML={{ __html: pelatihan?.deskripsi }}
                ></div>
              </div>
            </div>
          </Col>
          <Col md={12} lg={4}>
            <div className="border rounded-xl p-6 mb-5 ikuti-pelatihan">
              <h4 className="fz-20 fw-600">Ikuti Pelatihan</h4>
              <span className="fz-16">
                {moment(pelatihan?.pelatihan_mulai).utc().format("DD MMM YYYY")}{" "}
                -{" "}
                {moment(pelatihan?.pelatihan_selesai)
                  .utc()
                  .format("DD MMM YYYY")}
              </span>
              <div className="mt-7">
                <button
                  disabled={pelatihan?.Status !== "Dibuka" && true}
                  className="btn btn-primary-dashboard rounded-pill btn-block fw-500"
                  onClick={() => {
                    if (!session) {
                      return router.push("/login");
                    } else {
                      if (!session?.roles?.includes("user")) {
                        SweatAlert(
                          "Gagal",
                          "Anda sedang login sebagai Admin",
                          "error"
                        );
                      } else {
                        handleCheckPelatihanReg(pelatihan?.id, session);
                      }
                    }
                  }}
                >
                  Daftar Pelatihan
                </button>

                <button
                  className="btn btn-outline-primary-new rounded-pill btn-block fw-500 d-flex justify-content-center align-items-center p-1"
                  onClick={() => handleDownloadSilabus()}
                >
                  <div className="ri-download-cloud-fill mr-2 fz-16"></div>
                  <span>Unduh Silabus</span>
                </button>
              </div>
              <hr className="my-7" />
              <div className="d-flex flex-wrap align-items-start">
                <div className="mt-2">
                  <Image
                    src={`/assets/icon/alamat-1.svg`}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="ml-1 col-10">
                  <p className="fw-600 fz-18 mb-2">Alamat</p>
                  {pelatihan?.metode_pelatihan !== "Online" ? (
                    <p className="fz-16">
                      {pelatihan?.alamat}, {pelatihan?.kabupaten},{" "}
                      {pelatihan?.provinsi}
                    </p>
                  ) : (
                    <p className="fz-16">Online</p>
                  )}
                </div>
              </div>
              <div className="d-flex flex-wrap align-items-start mt-4">
                <div className="mt-2">
                  <Image
                    src={`/assets/icon/jam-1.svg`}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="ml-1 col-10">
                  <p className="fw-600 fz-18 mb-2">Jadwal Pelatihan</p>
                  <p className="fz-16">
                    {moment(pelatihan?.pelatihan_mulai)
                      .utc()
                      .format("DD MMM YYYY")}{" "}
                    -{" "}
                    {moment(pelatihan?.pelatihan_selesai)
                      .utc()
                      .format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-wrap align-items-start mt-4">
                <Image
                  src={`/assets/icon/kuota-1.svg`}
                  width={30}
                  height={30}
                />

                <div className="ml-4">
                  <p className="fw-600 fz-18 mb-2">Peserta</p>
                  <p className="fz-16">{pelatihan?.kuota_peserta} Peserta</p>
                </div>
              </div>
            </div>
            {/* PEMBATAS */}
            <div className="bg-white border rounded-xl mb-5 p-6">
              <h4 className="fz-20 fw-600 mb-4">Mitra Pelatihan</h4>
              <div className="d-flex">
                <div className="dot-bullet-detail">
                  <Image
                    src={
                      (pelatihan?.gambar_mitra &&
                        pelatihan.gambar_mitra !== "Belum ada file" &&
                        pelatihan.file_path + pelatihan?.gambar_mitra) ||
                      "/assets/media/mitra-default.png"
                    }
                    width={60}
                    height={60}
                    objectFit="cover"
                    thumbnail
                    roundedCircle
                    className={`${style.image_card_pelatihan} img-fluild`}
                    alt="Image Mitra"
                  />
                </div>

                <div className="ml-5">
                  <p className="fw-600 fz-16 mb-2">
                    {pelatihan?.mitra_nama || "-"}
                  </p>
                  <p style={{ color: "#6C6C6C" }}>
                    {pelatihan?.lokasi_mitra || "-"}
                  </p>
                </div>
              </div>
            </div>
            <TrainingReminder session={session} />
          </Col>
        </Row>
      </HomeWrapper>
    </>
  );
};

export default DetailPelatihan;
