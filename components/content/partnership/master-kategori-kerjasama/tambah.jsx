import React, { useState } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";

const Tambah = ({ token }) => {
  const [valueCreateCooporations, setValueCreateCooporations] = useState([""]);

  const router = useRouter();

  const [categoryCooporation, setCategoryCooporation] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...valueCreateCooporations];
    list[index] = value;
    setValueCreateCooporations(list);
  };

  const handleDelete = (i) => {
    let filterResult = valueCreateCooporations.filter(
      (items, index) => index !== i
    );
    setValueCreateCooporations(filterResult);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.checked);
  };

  const handleAddInput = () => {
    setValueCreateCooporations([...valueCreateCooporations, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Apakah anda yakin ingin tambah data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        let statusPro = status ? 1 : 0;

        let formData = new FormData();
        formData.append("cooperation_categories", categoryCooporation);
        formData.append("status", statusPro);

        valueCreateCooporations.forEach((item, i) => {
          formData.append(`cooperation_form[${i}]`, item);
        });
        try {
          let { data } = await axios.post(
            `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/create`,
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          Swal.fire("Berhasil", "Data berhasil tersimpan", "success").then(
              () => {
                router.push({
                  pathname: "/partnership/master-kategori-kerjasama",
                  query: { success: true },
                });
              }
            );
        } catch (error) {
          Swal.fire("Gagal", `${error.response.data.message}`, "error");
        }
      }
    });
  };



  return (
    <PageWrapper>
     
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              Tambah Master Kategori Kerjasama
            </h3>
          </div>
          <form>
            <div className="card-body pt-0">
              <div className="form-group mb-0 mb-sm-4">
                <label htmlFor="staticEmail" className="col-form-label">
                  Kategori Kerjasama
                </label>
                <input
                  required
                  placeholder="Masukkan Kategori Kerjasama"
                  type="text"
                  name="category_cooperation"
                  className="form-control"
                  onChange={(e) => setCategoryCooporation(e.target.value)}
                />
              </div>

              {valueCreateCooporations.map((valueCreateCooporation, index) => {
                return (
                  <div className="form-group" key={index}>
                    {index === 0 ? (
                      <label htmlFor="staticEmail" className="col-form-label">
                        Judul Form Isian Kerjasama
                      </label>
                    ) : (
                      ""
                    )}
                    <div className="position-relative d-flex align-items-center">
                      <input
                        required
                        placeholder={
                          index === 0
                            ? `Form Kerjasama ${index + 1}`
                            : `Form Kerjasama ${index + 1}`
                        }
                        name={`cooperation${index}`}
                        type="text"
                        onChange={(e) => handleChange(e, index)}
                        className="form-control"
                        value={valueCreateCooporation}
                      />
                      {index === 0 ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="btn ml-5"
                          style={{ backgroundColor: "#EE2D41" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              d="M17 4h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5V2h10v2zM9 9v8h2V9H9zm4 0v8h2V9h-2z"
                              fill="rgba(255,255,255,1)"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="form-group d-flex justify-content-center justify-content-md-start">
                <label htmlFor="staticEmail" className="col-form-label"></label>

                <p
                  className="btn btn-rounded-full bg-blue-primary text-white"
                  style={{
                    backgroundColor: "#40A9FF",
                    color: "#FFFFFF",
                    width: "max-content",
                  }}
                  onClick={() => handleAddInput()}
                >
                  <div className="text-truncate d-block">
                    Tambah Form Kerjasama
                  </div>
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Status kerjasama
                </label>
                <div className="row mt-5">
                  <div className="col-12 d-flex align-items-center">
                    <label className="switches mr-5">
                      <input
                        required
                        className="checkbox"
                        checked={status}
                        type="checkbox"
                        onChange={(e) => handleChangeStatus(e)}
                      />
                      <span
                        className={`sliders round ${
                          status ? "text-white" : "pl-2"
                        }`}
                      ></span>
                    </label>
                    <p
                      className="position-relative mb-0"
                      style={{ bottom: "5px" }}
                    >
                      {status ? "Aktif" : "Tidak aktif"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="d-flex flex-md-row flex-column justify-content-end">
                  <Link href="/partnership/master-kategori-kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5 d-flex justify-content-center">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white d-flex justify-content-center"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Tambah;
