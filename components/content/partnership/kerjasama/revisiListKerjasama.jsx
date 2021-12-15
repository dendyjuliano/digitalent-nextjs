import React, { useState, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
function RevisiList({ token }) {
  const router = useRouter();

  const labelStyle = {
    color: "#E69700",
    fontSize: "14px",
    fontWeight: "600",
    background: "#FFF6E6",
    borderRadius: "4px",
    padding: "4px 10px",
    width: "max-content",
  };

  const styleList = {
    listStyle: "none",
    margin: "0",
    padding: "0",
  };

  const [listCardREvisi, setListCardREvisi] = useState([]);

  useEffect(() => {
    async function getCardREviewList(id, token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/card-review/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setListCardREvisi(data.data);
      } catch (error) {
        Swal.fire("Gagal", `${error?.response?.data?.message}`, "error");
      }
    }
    getCardREviewList(router.query.id, token);
  }, [router.query.id, token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title titles-1 fw-500 text-dark mb-0">
              Review Kerjasama
            </h3>
          </div>

          <div className="card-body pb-28 pt-0">
            <ul style={styleList}>
              {listCardREvisi.length === 0
                ? ""
                : listCardREvisi?.map((items, index) => {
                    return (
                      <li key={index} className="mt-5">
                        <div className="row  cardContainer">
                          <div className="col-12 col-sm-6">
                            <h1
                              className="fw-500 titles-1"
                              style={{ color: "#6C6C6C" }}
                            >
                              {items?.title}
                            </h1>
                            <p className="mt-4" style={{ color: "#ADB5BD" }}>
                              {items?.information1}
                            </p>
                            <p style={{ color: "red" }}>
                              Versi.{items?.version}
                            </p>
                          </div>
                          <div className="col-12 col-sm-6 d-flex justify-content-sm-end justify-content-start">
                            {items?.information2 === "Menunggu Mitra" ? (
                              <a className="mt-3 mb-3 mt-sm-10" style={labelStyle}>
                                {items?.information2}
                              </a>
                            ) : (
                              <Link
                                href={{
                                  pathname:
                                    "/partnership/kerjasama/review-kerjasama",
                                  query: {
                                    id: router.query.id,
                                    version: items?.version,
                                    statusInfo: items?.information2,
                                  },
                                }}
                              >
                                <a className="btn btn-sm btn-rounded-full bg-blue-primary text-white mt-3 mb-3 mt-sm-10">
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

            <div className="form-group row mt-10">
              <div className="col-sm-12 d-flex justify-content-md-end justify-content-center">
                <Link
                  href={{
                    pathname: `/partnership/kerjasama`,
                  }}
                >
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default RevisiList;
