import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Style from "../../../../styles/progressbar.module.css";
import axios from "axios";

function Pembahasan() {
  const router = useRouter();
  const { id } = router.query;

  console.log("id", id);

  const [status, setStatus] = useState("");
  const cekProgresStatus = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/cek-progres/${id}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN_PARTNERSHIP_TEMP}`,
          },
        }
      );

      console.log("data a a a ssss", data.data.status_migrates_id.status);
      setStatus(data.data.status_migrates_id.status);
    } catch (error) {
      console.log("gagal get province", error);
    }
  };

  useEffect(() => {
    // api cek progress
    console.log("router.query.id", router.query.id);
    cekProgresStatus(router.query.id);
  }, [router.query.id]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">Pembahasan</h3>
          </div>
          <div className="card-body pb-28">
            <div className="row mt-8 mb-10">
              <div className="col-2 p-0">
                <div className="progress-items">
                  {/* <div className="line-progress"></div> */}
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Submit Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Review Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Pembahasan</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">
                      Submit Dokumen Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">
                      Review Dokumen Kerjasama
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

            <div className={`row my-10 ${Style.clearRow}`}>
              <div className="col-12 col-sm-6">
                <Image
                  src="/assets/media/hubungi-kami-1.svg"
                  height={300}
                  width={400}
                  alt="hubungi-kami"
                />
              </div>
              <div className="col-12 col-sm-6">
                <div className="d-flex flex-column align-items-start justify-content-center h-100">
                  <h1 className="fz-40 fw-700" style={{ color: "#6C6C6C" }}>
                    Pengajuan Anda Telah Diterima
                  </h1>
                  <p className="mt-5 fz-16">
                    Selamat! Pengajuan anda telah diterima.
                  </p>
                  <p className="fz-16">
                    Selanjutnya proses pembahasan detail kerjasama akan di
                    infokan ke kontak PIC anda
                  </p>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <Link href="/partnership/user/tanda-tangan-digital" passHref>
                      <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                        Input Tanda Tangan Digital
                      </a>
                    </Link>

                    {status === "" ? (
                      ""
                    ) : status === "pengajuan-selesai" ? (
                      <Link
                        href={{
                          pathname: "/partnership/user/kerjasama/submit-dokumen-kerjasama",
                          query: { id: router.query.id },
                        }}
                        passHref
                      >
                        <a className="btn btn-sm btn-rounded-full bg-blue-primary text-white">
                          Submit Dokumen Kerjasama
                        </a>
                      </Link>
                    ) : (
                      // <button
                      //   type="submit"
                      //   className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                      // >

                      // </button>

                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Pembahasan;
