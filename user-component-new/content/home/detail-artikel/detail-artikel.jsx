import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import styles from "../detail-artikel/detail-artikel.module.css";
import { useRouter } from "next/router";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";
import ShareOverlay from "../../../components/global/ShareOverlay.component";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";

const DetailArtikel = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;

  const { detail, loading: loadingDetail } = useSelector(
    (state) => state.detailBerandaArtikel
  );
  const { tags } = useSelector((state) => state.allTagBerandaArtikel);

  const [keyword, setKeyword] = useState(null);
  const [resultText, setResultText] = useState(null);
  const [detailContent, setDetailContent] = useState("");
  const [tagArtikel, setTagArtikel] = useState([]);

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState({});

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [detail]);

  useEffect(() => {}, [windowDimensions]);

  useEffect(() => {
    handleLinkContent();
  }, [detail]);

  useEffect(() => {
    handleEmptyTag();
  }, []);

  const handleLinkContent = () => {
    if (detail) {
      let text = detail?.isi_artikel;

      let result = "";

      if (text.includes("<a")) {
        result = text.replace("<a", `<a target="_blank"`);
      } else {
        result = text;
      }

      setDetailContent(result);
    }
  };

  // Handle Empty Tag
  const handleEmptyTag = () => {
    if (tags) {
      let arr = tags?.tag;
      let temps = [];
      let result = [];

      for (let i = 0; i < arr?.length; i++) {
        if (
          arr[i].length !== 0 &&
          arr[i] !== null &&
          arr[i] !== undefined &&
          arr[i] !== " " &&
          arr[i] !== ""
        ) {
          temps.push(arr[i].toUpperCase());
        }
      }

      for (let k = 0; k < temps.length; k++) {
        if (k === 0) {
          result.push(temps[k].toUpperCase());
        } else {
          if (result.includes(temps[k].toUpperCase()) === false) {
            result.push(temps[k].toUpperCase());
          }
        }
      }

      if (result.length <= 8) {
        setTagArtikel(result);
      } else {
        let tagResult = result.slice(0, 8);
        setTagArtikel(tagResult);
      }
    }
  };

  const handleFilterTag = (str) => {
    router.push(`/artikel?tag=${str}`);
  };

  const handleHighlightWords = (e, text) => {
    e.preventDefault();

    let result = "";
    let splitWords = keyword.split(" ");
    let splitText = text.split(" ");

    for (let i = 0; i < splitWords.length; i++) {
      for (let j = 0; j < splitText.length; j++) {
        if (splitWords[i].toLowerCase() === splitText[j].toLowerCase()) {
          result += `<mark>` + splitText[j] + `</mark>` + " ";
          window.scrollTo (0, 1200)
          
        } else {
          result += " " + splitText[j] + " ";
        }
      }
    }

    setResultText(result);
  };

  return (
    <HomeWrapper>
      {/* BreadCrumb */}
      <SubHeaderComponent
        data={[
          { link: "/artikel", name: "Artikel" },
          { link: router.asPath, name: "Detail Artikel" },
        ]}
      />

      {/* Header */}
      {detail ? (
        <div className="row my-5 d-flex flex-column ml-1">
          <div>
            <div className="badge badge-light mr-2">
              <div className="text-primary">{detail?.nama_kategori}</div>
            </div>
          </div>
          <div className="mt-5">
            <h1 
              className={`${styles.fontTitle} font-weight-bolder`}
            >
              {/* Insert Title Here */}
              {detail?.judul}
            </h1>
          </div>

          <div className="mt-5 d-flex flex-row align-items-center">
            <span className="font-weight-bolder" style={{fontSize:"14px", color:"#6C6C6C", fontFamily:"Poppins"}}>
              {/* Insert Akademi Here */}
              {detail?.kategori_akademi}
            </span>
            <span className="mr-1 ml-3">
              <i className="ri-eye-line"></i>
            </span>
            <span className="text-muted" style={{fontSize:"14px", color:"#6C6C6C", fontFamily:"Poppins"}}>
              {/* Insert Views Here */}
              Dibaca {detail?.dibaca}
            </span>
          </div>

          <div className="mt-5 d-flex flex-row align-items-center justify-content-between col-12 col-md-12">
            <div className="row">
              <div className="">
                {/* Insert Logo Image Here */}
                <Image
                  src={
                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                    "publikasi/images/" +
                    detail.foto
                  }
                  width={40}
                  height={40}
                  alt="Logo Image"
                  className="border rounded-circle"
                />
              </div>
              <div className="d-flex flex-column ml-3">
                <div className="font-weight-bolder mb-2">
                  {/* Insert Admin Here */}
                  {detail?.dibuat}
                </div>
                <div className="text-muted" style={{fontSize:"14px", fontFamily:"Poppins", color:"#6C6C6C"}}>
                  {moment(detail.tanggal_publish).format("DD MMMM YYYY")}
                </div>
              </div>
            </div>

            <div className="row ml-1">
              <div className="mr-3">
                {/* SHAREOVERLAY */}
                <ShareOverlay
                  url={`${process.env.NEXTAUTH_URL}/artikel/detail/${id}`}
                  quote={detail?.judul}
                >
                  <button className="btn btn-sm btn-outline-light rounded-circle">
                    <i className="ri-share-line px-0 py-1"></i>
                  </button>
                </ShareOverlay>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* End of Header */}

      {/* Content */}
      {detail ? (
        <div className="row mt-10">
          {/* Left Side */}
          <div
          // className="image-thumbnail-detail"
            className={
              windowDimensions &&
              windowDimensions.width &&
              windowDimensions.width > 770
                ? "col-12 col-lg-8 pr-11 "
                : "col-12 col-lg-8 "
            }
          >
            
            {/* Image */}
            <div className={`${styles.image_thumbnail} rounded-lg`}>
              <Image
                src={
                  process.env.END_POINT_API_IMAGE_PUBLIKASI +
                  "publikasi/images/" +
                  detail.gambar
                }
                layout="fill"
                objectFit="cover"
                alt="Detail Image"
                className={`rounded-lg img-fluid `}
              />
            </div>
            

              {/* Artikel */}
              <div 
                className="border rounded-lg mb-5 mt-15"
              >
                <div
                  className="row"
                  style={{wordBreak: "break-word" }}
                >
                  {detailContent ? (
                    resultText ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: resultText }}
                        className={`${styles.detailArtikel} my-5 mx-10 text-justify`}
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: detailContent }}
                        className={`${styles.detailArtikel} my-5 mx-10 text-justify`}
                      />
                    )
                  ) : null}
                </div>

                <div className="row m-3 d-flex justify-content-between pb-5">
                  <div className="row d-flex justify-content-between ml-1">
                    {detail && detail.tag && detail.tag.length !== 0
                      ? detail?.tag?.map((el, i) => {
                          return (
                            <div
                              className="mr-3 border p-3 rounded mb-3"
                              key={i}
                              style={{ height: "38px" }}
                            >
                              #{el.toString().toUpperCase()}
                            </div>
                          );
                        })
                      : null}
                  </div>

                  <div className="row ml-1">
                    <div className="mr-3">
                      <ShareOverlay
                        url={`${process.env.NEXTAUTH_URL}/artikel/detail/${id}`}
                        quote={detail.judul}
                      >
                        <button className="btn btn-sm btn-outline-light rounded-circle">
                          <i className="ri-share-line px-0 py-1"></i>
                        </button>
                      </ShareOverlay>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          {/* End of Left Side */}

          {/* Right Side */}
          {windowDimensions &&
          windowDimensions.width &&
          windowDimensions.width > 770 ? (
            <div className="col-12 col-lg-4">
              {/* Search */}
              <div className="border rounded-lg">
                <div className="row mt-10 mb-5">
                  <div className="col-2 my-auto ml-5">
                    <Image
                      src={`/assets/media/logo-filter.svg`}
                      width={40}
                      height={40}
                      alt="Logo filter"
                    />
                  </div>
                  <div className="col-9 my-auto">
                    <h4 className=" font-weight-bolder" style={{fontSize:"20px", fontFamily:"Poppins"}}>Pencarian</h4>
                  </div>
                </div>

                <form className="mb-10 mx-5">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div
                        className="input-group-text bg-light border-right-0 pr-1"
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
                      placeholder="Cari Artikel"
                      onChange={(e) => setKeyword(e.target.value)}
                    />

                    {detailContent ? (
                      <div>
                        <button
                          className="btn btn-primary-dashboard"
                          onClick={(e) =>
                            handleHighlightWords(e, detailContent)
                          }
                          style={{
                            borderTopRightRadius: "150px",
                            borderBottomRightRadius: "150px",
                          }}
                          type="submit"
                        >
                          Cari
                        </button>
                      </div>
                    ) : null}
                  </div>
                </form>
              </div>

              {/* Tag */}
              <div className="row mt-10 d-flex flex-column mx-10">
                <h3 className="font-weight-bolder" style={{fontSize:"20px", fontFamily:"Poppins"}}>
                  TEMUKAN LEBIH BANYAK APA YANG PENTING BAGI ANDA
                </h3>
                <div className=" d-flex flex-wrap flex-row">
                  {tagArtikel && tagArtikel.length !== 0 ? (
                    tagArtikel?.map((el, i) => {
                      return (
                        <div
                          className="border px-2 py-1 rounded my-3 mr-3 text-center d-flex align-items-center justify-content-center"
                          key={i}
                          onClick={() => handleFilterTag(el)}
                          style={{
                            cursor: "pointer",
                            height: "38px",
                            fontSize: "14px",
                          }}
                        >
                          #{el.toString().toUpperCase()}
                        </div>
                      );
                    })
                  ) : (
                    <div className="row d-flex justify-content-center  text-center">
                      <h3 className="text-muted ml-3">
                        <em>Tag Belum Tersedia</em>
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {/* End of Right Side */}
        </div>
      ) : (
        <div className="row d-flex justify-content-center my-5">
          <h1 className="font-weight-bolder">Artikel Tidak Tersedia</h1>
        </div>
      )}

      {/* End of Content */}
    </HomeWrapper>
  );
};

export default DetailArtikel;
