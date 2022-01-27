import React, { useState, useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import Image from "next/image";
import ShareOverlay from "../global/ShareOverlay.component";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";
import { SweatAlert } from "../../../utils/middleware/helper";
import { getAllPelatihanByAkademi } from "../../../redux/actions/beranda/detail-akademi.actions";
import { useDispatch } from "react-redux";

const CardPelatihanOpen = ({
  funcMouseEnter,
  funcMouseLeave,
  funcQuickView,
  show,
  row,
  i,
  session,
  akademi = null,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

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
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    if (!pelatihan.bookmart) {
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
          dispatch(
            getAllPelatihanByAkademi(
              router.query.id,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              session.token
            )
          );
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
          dispatch(
            getAllPelatihanByAkademi(
              router.query.id,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              session.token
            )
          );
        }
      } catch (e) {
        SweatAlert("Gagal", e.message, "error");
      }
    }
  };
  return (
    <>
      <div
        onMouseEnter={() => {
          windowDimensions.width > 770 ? funcMouseEnter(i) : null;
        }}
        onMouseLeave={() => {
          windowDimensions.width > 770 ? funcMouseLeave(i) : null;
        }}
        onClick={() => {
          windowDimensions.width > 770
            ? null
            : router.push(
                `/detail/pelatihan/${row.id}?akademiId=${akademi.id}`
              );
        }}
      >
        <div
          className={
            row.status === "Dibuka"
              ? show[i] !== true
                ? `parent-image-pelatihan-new`
                : `parent-image-pelatihan-new-hover`
              : `parent-image-pelatihan-new-close`
          }
        >
          <Image
            className={`image-list-pelatihan-new`}
            src={
              (row.gambar &&
                row.gambar !== "Belum ada file" &&
                process.env.END_POINT_API_IMAGE_BEASISWA + row.gambar) ||
              "/assets/media/default-card.png"
            }
            layout="fill"
            objectFit="cover"
            alt="Image Thumbnail"
          />
        </div>
        <Card.ImgOverlay>
          <div className="d-flex justify-content-between">
            <div className="align-self-start">
              <Badge
                bg={`py-3 px-4 ${
                  row.status === "Dibuka"
                    ? "badge-card-pelatihan-new"
                    : "badge-card-pelatihan-new-close"
                }`}
                className="d-flex "
              >
                Pelatihan {row.metode_pelatihan}
              </Badge>
            </div>
            {show[i] && (
              <div className="whishlist align-self-end float-right">
                <Button
                  variant="light"
                  disabled={row.status !== "Dibuka" && true}
                  className={`float-right d-flex justify-content-center align-items-center wishlist-card-new`}
                  onClick={() => {
                    if (!session) {
                      router.push("/peserta");
                    } else {
                      handleBookmark(row);
                    }
                  }}
                >
                  <i
                    className={
                      !row.bookmart
                        ? `ri-heart-line p-0`
                        : `ri-heart-fill p-0 text-danger`
                    }
                    style={{
                      color: "#6C6C6C",
                    }}
                  ></i>
                </Button>
                {/* SHAREOVERLAY */}
                <ShareOverlay
                  url={`http://dts-dev.majapahit.id/detail/pelatihan/${row.id}`}
                  quote={row.name}
                >
                  <Button
                    variant="light"
                    disabled={row.status !== "Dibuka" && true}
                    className={`float-right d-flex justify-content-center align-items-center mr-2 wishlist-card-new`}
                  >
                    <i
                      className="ri-share-line p-0"
                      style={{
                        color: "#6C6C6C",
                      }}
                    ></i>
                  </Button>
                </ShareOverlay>
              </div>
            )}
          </div>
        </Card.ImgOverlay>
        <Card.Body className="position-relative">
          <div className="mitra-pelatihan-new">
            <Image
              src={
                (row.gambar_mitra &&
                  row.gambar_mitra !== "Belum ada file" &&
                  row.file_path + row.gambar_mitra) ||
                "/assets/media/mitra-default.png"
              }
              width={60}
              height={60}
              objectFit="cover"
              thumbnail
              roundedCircle
              className={
                row.status === "Dibuka"
                  ? `mitra-pelatihan-image-new`
                  : `mitra-pelatihan-image-new-close`
              }
              alt="Image Mitra"
            />
          </div>
          <div
            className="d-flex justify-content-between position-relative pb-0 mb-0"
            style={{ top: "-15px" }}
          >
            <div className="module-pelatihan-mitra">
              <p className={`pl-18 my-0 text-mitra-new`}>{row.mitra}</p>
            </div>
            <div className="status align-self-center">
              <p
                className={`${
                  row.status === "Dibuka"
                    ? "status-mitra-open-new"
                    : "status-mitra-close-new"
                } text-uppercase my-0`}
              >
                {row.status}
              </p>
            </div>
          </div>
          <div className="module-pelatihan-name">
            <p className={`my-0 title-card-new`}>{row.name}</p>
          </div>
          <div className="module-pelatihan-name">
            <p
              style={{
                fontSize: "14px",
                color: "#6C6C6C",
              }}
            >
              {row.akademi}
            </p>
          </div>
          <hr />
          {show[i] !== true ? (
            <div className="d-flex flex-column">
              <div className="date d-flex align-items-center align-middle">
                <i className="ri-time-line"></i>
                <span className={`text-date-register-new pl-2`}>
                  Registrasi:{" "}
                  {moment(row.pendaftaran_mulai).utc().format("DD MMM YYYY")} -{" "}
                  {moment(row.pendaftaran_selesai).utc().format("DD MMM YYYY")}
                </span>
              </div>
              <div className="date d-flex align-items-center align-middle">
                <i className="ri-group-line"></i>
                <span className={`text-date-register-new pl-2`}>
                  Kuota: {row.kuota_peserta} Peserta
                </span>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "21px" }}>
              <Button
                className={`btn-block rounded-xl my-auto btn-quick-view-new`}
                onClick={() => funcQuickView(i)}
              >
                LIHAT
              </Button>
            </div>
          )}
        </Card.Body>
      </div>
    </>
  );
};

export default CardPelatihanOpen;
