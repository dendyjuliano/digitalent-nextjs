import React, { useState, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import Cookies from "js-cookie"

function RevisiList({ token }) {
  const router = useRouter();
  const cardContainer = {
    background: "#FFFFFF",
    border: "1px solid #D7E1EA",
    borderRadius: "5px",
    padding: "16px 32px",
    borderRadius: "12px",
  };
  const labelStyle = {
    color: "#04AA77",
    fontSize: "14px",
    fontWeight: "600",
    background: "#E6F7F1",
    borderRadius: "4px",
    padding: "4px 10px",
    width: "max-content",
  };

  const styleList = {
    listStyle: "none",
    padding: "0",
    margin: "0",
  };

  const [listCardREvisi, setListCardREvisi] = useState([]);

  useEffect(() => {
    
    getCardREviewList(router.query.id);
  }, [router.query.id, router, token]);

  async function getCardREviewList(id) {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/card-review/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Permission: Cookies.get("token_permission")
          },
        }
      );
      setListCardREvisi(data?.data);
    } catch (error) {
      Swal.fire("Gagal", `${error?.response?.data?.message}`, "error");
    }
  }

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">
              Review Kerjasama
            </h3>
          </div>

          <div className="card-body pb-28">
            <div className="row mt-8 mb-10">
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Submit Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress active">
                      Review Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Pembahasan</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span
                      className="title-progress text-center"
                      style={{ top: "-4rem" }}
                    >
                      Submit Dokumen <br /> Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span
                      className="title-progress text-center"
                      style={{ top: "-4rem" }}
                    >
                      Review Dokumen <br /> Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Hasil</span>
                  </div>
                </div>
              </div>
            </div>

            <ul style={styleList}>
              {listCardREvisi.length === 0
                ? ""
                : listCardREvisi.map((items, index) => {
                    return (
                      <li key={index} className="mt-5">
                        <div
                          className="row align-items-center justify-content-between"
                          style={cardContainer}
                        >
                          <div className="col-12 col-sm-6">
                            <h1
                              className="fw-500 fz-20"
                              style={{ color: "#6C6C6C" }}
                            >
                              {items.title}
                            </h1>
                            <p className="mt-4" style={{ color: "#ADB5BD" }}>
                              {items.information1}
                            </p>
                            <p style={{ color: "#EE2D41" }}>
                              Revisi Versi.{items.version}
                            </p>
                          </div>

                          <div className="col-12 col-sm-6 d-flex justify-content-end">
                            {listCardREvisi.length - 1 === index ? (
                              <Link
                                href={{
                                  pathname:
                                    "/partnership/user/kerjasama/revisi",
                                  query: {
                                    id: router.query.id,
                                    version: items?.version,
                                    information2: items?.information2,
                                    index: index,
                                  },
                                }}
                              >
                                <a
                                  style={{ width: "max-content" }}
                                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white mt-10 mt-sm-0"
                                >
                                  Lihat Detail Revisi
                                </a>
                              </Link>
                            ) : (
                              <Link
                                href={{
                                  pathname:
                                    "/partnership/user/kerjasama/revisi",
                                  query: {
                                    id: router.query.id,
                                    version: items?.version,
                                    information2: items?.information2,
                                    index: index,
                                  },
                                }}
                              >
                                <a className="mt-10 mt-sm-0" style={labelStyle}>
                                  {items?.information2}
                                </a>
                              </Link>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default RevisiList;
