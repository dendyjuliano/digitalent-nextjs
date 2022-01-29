import React, { useState, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getSingleCooperation } from "../../../../../redux/actions/partnership/user/cooperation.actions";
import moment from "moment";
import Image from "next/image";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const DetailDokumenKerjasama = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { success } = router.query;
  const allCooperationUser = useSelector((state) => state.allCooperationUser);

  const [pdfFIle, setPdfFIle] = useState("");

  useEffect(() => {
    getSingleValue(router.query.id);
    dispatch(getSingleCooperation(router.query.id, token));
  }, [dispatch, router.query.id, token]);

  async function getSingleValue(id) {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            // Permission: Cookies.get("token_permission")
          },
        }
      );
      setPdfFIle(data?.data?.document_file);
    } catch (error) {
      Swal.fire("Gagal", `${error?.response?.data?.message}`, "error");
    }
  }

  return (
    <PageWrapper>
      {success ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Menyimpan Data</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Detail Kerjasama
            </h3>
          </div>

          <div className="card-body">
            <form>
              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Tanggal
              </label>
              <p className="fz-16">
                {allCooperationUser?.cooperationById.length === 0
                  ? ""
                  : allCooperationUser?.cooperationById?.data?.submission_date}
              </p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Judul kerjasama
              </label>
              <p className="fz-16">
                {allCooperationUser?.cooperationById.length === 0
                  ? ""
                  : allCooperationUser?.cooperationById?.data?.title}
              </p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Kategori kerjasama
              </label>
              <p className="fz-16">
                {allCooperationUser?.cooperationById.length === 0
                  ? ""
                  : allCooperationUser?.cooperationById?.data
                      ?.cooperation_category.name}
              </p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Periode Kerjasama
              </label>
              <p className="fz-16">
                {allCooperationUser?.cooperationById.length === 0
                  ? ""
                  : allCooperationUser?.cooperationById?.data?.period}
                &nbsp; Tahun (
                {allCooperationUser?.cooperationById?.length === 0
                  ? ""
                  : moment(
                      allCooperationUser?.cooperationById?.data
                        ?.period_date_start
                    ).format("DD MMMM YYYY")}
                &nbsp;-&nbsp;
                {allCooperationUser?.cooperationById.length === 0
                  ? ""
                  : moment(
                      allCooperationUser?.cooperationById?.data?.period_date_end
                    ).format("DD MMMM YYYY")}
                )
              </p>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Nomor Perjanjian Lembaga
                  </label>
                  <p className="fz-16">
                    {allCooperationUser?.cooperationById.length === 0
                      ? ""
                      : allCooperationUser?.cooperationById?.data
                          .agreement_number_partner}
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Nomor Perjanjian KemKominfo
                  </label>
                  <p className="fz-16">
                    {allCooperationUser?.cooperationById.length === 0
                      ? ""
                      : allCooperationUser?.cooperationById?.data
                          .agreement_number_kemkominfo}
                  </p>
                </div>
              </div>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Tanggal Penandatanganan
              </label>
              <p className="fz-16">
                {allCooperationUser?.cooperationById.length === 0
                  ? ""
                  : allCooperationUser?.cooperationById?.data?.signing_date}
              </p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Dokumen Kerjasama
              </label>

              <div className="border-bottom pb-6">
                <button
                  type="button"
                  className="btn bg-blue-secondary text-white rounded-full d-flex align-items-center"
                  onClick={() =>
                    window.open(
                      `https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com${pdfFIle}`
                    )
                  }
                >
                  <Image
                    src="/assets/icon/download-2-fill.svg"
                    width={16}
                    height={16}
                    alt="imagess"
                  />{" "}
                  <p className="mb-0 ml-2">Unduh</p>
                </button>
              </div>

              {/* start loop */}

              {allCooperationUser?.cooperationById.length === 0 ? (
                ""
              ) : allCooperationUser?.cooperationById?.data
                  ?.cooperation_category.data_content?.cooperation_form ===
                "-" ? (
                <h1 className="my-4">Data kerja sama tidak ada</h1>
              ) : (
                allCooperationUser?.cooperationById?.data?.cooperation_category?.data_content?.map(
                  (items, i) => {
                    return (
                      <div className="form-group" key={i}>
                        <label
                          htmlFor="staticEmail"
                          className="col-form-label fz-14"
                          style={{ color: "#6C6C6C" }}
                        >
                          {items?.cooperation_form}
                        </label>
                        <p className="fz-16">{items?.form_content}</p>
                      </div>
                    );
                  }
                )
              )}
              {/* loop end loop*/}

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/user/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary">
                      Kembali
                    </a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DetailDokumenKerjasama;
