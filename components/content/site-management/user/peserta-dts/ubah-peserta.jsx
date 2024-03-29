import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import Select from "react-select";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import ReactCrop from "react-image-crop";
import Swal from "sweetalert2";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import {
  dropdownKabupaten,
  dropdownProvinsiToDesa,
  dropdownKecamatanToDesa,
} from "../../../../../redux/actions/pelatihan/function.actions";
import { updatePesertaDts } from "../../../../../redux/actions/site-management/user/peserta-dts";
import ListPelatihan from "./list-peserta-pelatihan";
import Tables from "./detail-list-peserta-pelatihan";
import UbahPelatihan from "./ubah-list-peserta-pelatihan";
import SimpleReactValidator from "simple-react-validator";
import Cookies from 'js-cookie'

import Image from "next/image";
const TambahPage = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
  };

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const allDetailPeserta = useSelector((state) => state.allDetailPeserta);
  const { error: dropdownErrorProvinsi, data: dataProvinsi } = useSelector(
    (state) => state.drowpdownProvinsi
  );

  const { pendidikanReference } = useSelector((state) => state.allPendidikan);

  const { error: dropdownErrorKabupaten, data: dataKabupaten } = useSelector(
    (state) => state.drowpdownKabupaten
  );

  const { error: errorKecamatan, data: dataKecamatan } = useSelector(
    (state) => state.drowpdownProvinsiToDesa.data
  );

  const { error: errorKelurahan, data: dataKelurahan } = useSelector(
    (state) => state.drowpdownKecamatanToDesa.data
  );

  const [name, setName] = useState(allDetailPeserta.data?.data.name);
  const [email, setEmail] = useState(allDetailPeserta.data?.data.email);
  const [nik, setNik] = useState(allDetailPeserta.data?.data.nik);
  const [pendidikan, setPendidikan] = useState(allDetailPeserta.data?.data.jenjang)
  const [namaDarurat, setNamaDarurat] = useState(allDetailPeserta.data?.data.Nama_kontak_darurat)
  const [nomorDarurat, setNomorDarurat] = useState(allDetailPeserta.data?.data.nomor_handphone_darurat)
  const [tempatLahir, setTempatLahir] = useState(
    allDetailPeserta.data?.data.tempat_lahir
  );
  const [jenisKelamin, setJenisKelamin] = useState(
    allDetailPeserta.data?.data.jenis_kelamin
  );
  const [nomorHandphone, setNomorHandphone] = useState(
    allDetailPeserta.data?.data.nomor_handphone
  );
  const [tanggalLahir, setTanggalLahir] = useState(
    moment(allDetailPeserta.data?.data.tanggal_lahir).format("YYYY-MM-DD")
  );
  const [alamatKtp, setAlamatKtp] = useState(
    allDetailPeserta.data?.data.address_ktp
  );
  const [provinsiKtp, setProvinsiKtp] = useState(
    allDetailPeserta.data?.data.provinsi_ktp
  );
  const [kotaKtp, setKotaKtp] = useState(allDetailPeserta.data?.data.kota_ktp);
  const [kodePostKtp, setKodePostKtp] = useState(
    allDetailPeserta.data?.data.kode_pos_ktp
  );

  const [fotoProfil, setFotoProfil] = useState(
    allDetailPeserta.data?.data.file_path + allDetailPeserta.data?.data.foto
  );
  const [, forceUpdate] = useState();
  const [alamat, setAlamat] = useState(allDetailPeserta.data?.data.address);
  const [provinsi, setProvinsi] = useState(allDetailPeserta.data?.data.provinsi);
  const [kota, setKota] = useState(allDetailPeserta.data?.data.kota);
  const [kodePost, setKodePost] = useState(allDetailPeserta.data?.data.kode_pos);
  const [ktpName, setKtpName] = useState(allDetailPeserta.data?.data.File_ktp);
  const [ktpBase, setKtpBase] = useState(allDetailPeserta.data?.data.File_ktp);
  const [ijazahName, setIjazahName] = useState(
    allDetailPeserta.data?.data.ijasah === ""
      ? null
      : allDetailPeserta.data?.data.ijasah
  );
  const [ijazahBase, setIjazahBase] = useState(
    allDetailPeserta.data?.data.ijasah
  );
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showEditImage, setShowEditImage] = useState(false);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 9 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const previewCanvasRef = useRef(null);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirmConfirm] = useState(true);
  const [sideBar, setSideBar] = useState(true);
  const [kecamatan, setKecamatan] = useState(
    allDetailPeserta.data?.data.kecamatan
  );
  const [kelurahan, setKelurahan] = useState(
    allDetailPeserta.data?.data.kelurahan || allDetailPeserta.data?.data.kecamatan
  );
  const [kelurahanKtp, setKelurahanKtp] = useState(
    allDetailPeserta.data?.data.kelurahan_ktp ||
    allDetailPeserta.data?.data.kecamatan
  );
  const [kecamatanKtp, setKecamatanKtp] = useState(
    allDetailPeserta.data?.data.kecamatan_ktp
  );

  const optionProvinsi = dataProvinsi?.data.map((item) => {
    return {
      label: item.label,
      value: item.id,
    };
  });

  const optionPendidikan = pendidikanReference

  const handleDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;

    document.getElementById("setTodaysDate")?.setAttribute("max", today);
  };

  const optionKabupaten = dataKabupaten.data?.map((item) => {
    return {
      label: item.value,
      value: item.id,
    };
  });

  const optionKelurahan = dataKelurahan?.map((item) => {
    return { label: item.value, value: item.id };
  });

  const optionKecamatan = dataKecamatan?.map((item) => {
    return { label: item.value, value: item.id };
  });

  const handlerShowPassword = (value) => {
    setHidePassword(value);
    var input = document.getElementById("input-password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };
  const handlerShowPasswordConfirm = (value) => {
    setHidePasswordConfirmConfirm(value);
    var input = document.getElementById("input-password-confirm");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const onKtpHandler = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 2000000) {
          e.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang bisa dimasukkan maksimal hanya 2 MB.",
            "error"
          );
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setKtpBase(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setKtpName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa gambar.",
          "error"
        );
      }
    }
  };

  const generateImage = async (canvas, crops) => {
    if (!crops || !canvas) {
      return;
    }

    const base64Image = canvas.toDataURL("image/jpeg");

    const data = {
      foto: base64Image,
      user_id: allDetailPeserta.data?.data.user_id
    }

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    await axios
      .post(
        process.env.END_POINT_API_PELATIHAN + "api/v1/auth/update-foto",
        data,
        config
      )
      .then((res) => {
        toast.success("Berhasil Update");
        setShowEditImage(false);
        window.location.reload()
      })
      .catch((err) => {
        toast.error("gagal");
      });
    
  }

  // const onFotoHandler = (e) => {
  //   const type = ["image/jpg", "image/png", "image/jpeg"];
  //   if (e.target.files[0]) {
  //     if (type.includes(e.target.files[0].type)) {
  //       if (e.target.files[0].size > 2000000) {
  //         e.target.value = null;
  //         Swal.fire(
  //           "Oops !",
  //           "Data yang bisa dimasukkan maksimal hanya 2 MB.",
  //           "error"
  //         );
  //       } else {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           if (reader.readyState === 2) {
  //             setFotoProfil(reader.result);
  //             const datas = {
  //               foto: reader.result,
  //               user_id: allDetailPeserta.data?.data.user_id,
  //             };

  //             const config = {
  //               headers: {
  //                 Authorization: "Bearer " + token,
  //               },
  //             };
  //             axios
  //               .post(
  //                 process.env.END_POINT_API_PELATIHAN +
  //                 "api/v1/auth/update-foto",
  //                 datas,
  //                 config
  //               )
  //               .then((res) => {
  //                 toast.success("Berhasil Update");
  //               })
  //               .catch((err) => {
  //                 toast.error("gagal");
  //               });
  //           }
  //         };
  //         reader.readAsDataURL(e.target.files[0]);
  //       }
  //     } else {
  //       e.target.value = null;
  //       Swal.fire(
  //         "Oops !",
  //         "Data yang bisa dimasukkan hanya berupa gambar.",
  //         "error"
  //       );
  //     }
  //   }
  // };

  const onIjasahHandler = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 5000000) {
          e.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang bisa dimasukkan maksimal hanya 2 MB.",
            "error"
          );
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setIjazahBase(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setIjazahName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa gambar.",
          "error"
        );
      }
    }
  };

  const onSubmit = () => {
    const data = {
      user_id: allDetailPeserta.data?.data.user_id,
      nik: nik,
      name: name,
      jenis_kelamin: jenisKelamin,
      agama: allDetailPeserta.data?.data.agama,
      tempat_lahir: tempatLahir,
      tanggal_lahir: moment(tanggalLahir).format("YYYY-MM-DD"),
      email: email,
      nomor_handphone: nomorHandphone,
      file_ktp: ktpBase,
      ijasah: ijazahBase,
      address: alamat,
      provinsi: provinsi?.label ? provinsi?.label : provinsi,
      kota: kota?.label ? kota?.label : kota,
      kode_pos: kodePost,
      address_ktp: alamatKtp,
      provinsi_ktp: provinsiKtp?.label ? provinsiKtp?.label : provinsiKtp,
      kota_ktp: kota?.label ? kota?.label : kota,
      kode_pos_ktp: kodePostKtp,
      user_id: allDetailPeserta.data?.data.user_id,
      kecamatan_ktp:
        typeof kecamatanKtp === "object" ? kecamatanKtp.label : kecamatanKtp,
      kelurahan_ktp:
        typeof kelurahanKtp === "object" ? kelurahanKtp.label : kelurahanKtp,
      password: password,
      konfirmasi_password: passwordConfirm,
      kecamatan: typeof kecamatan === "object" ? kecamatan.label : kecamatan,
      kelurahan: typeof kelurahan === "object" ? kelurahan.label : kelurahan,
      jenjang: pendidikan,
      Nama_kontak_darurat: namaDarurat,
      nomor_handphone_darurat: nomorDarurat,
    };
    if (simpleValidator.current.allValid()) {
      dispatch(updatePesertaDts(token, data, Cookies.get("token_permission")));
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const colorText = {
    color: "#6C6C6C",
  };
  const listUl = {
    listStyle: "none",
    padding: "0",
    margin: "0",
    marginTop: "1rem",
  };

  const listLi = {};

  useEffect(() => {
    handleDate();
  }, []);


  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  const onSelectFile = (e) => {
    if (e.target.files[0].size > "2000000") {
      e.target.value = null;
      Swal.fire("Oops !", "Data Image Melebihi Ketentuan", "error");
    } else if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onHandleHideModal = () => {
    setShowEditImage(false)
  };

  const onSubmitEditImage = () => {
    setShowEditImage(false)
  }

  return (
    <PageWrapper>
      <div className="row">
        {!router.query.ubah_pelatihan_id && (
          <div className="col-12 col-lg-12 col-xl-3">
            <div
              className="card card-custom card-stretch gutter-b px-10 py-12"
              style={{ height: "480px" }}
            >
              <div className="form-group" style={{ maxWidth: "19rem" }}>
                <div>
                  <div
                    className="image-input image-input-outline w-100"
                    style={{ height: "15rem" }}
                  >
                    <div
                      className="image-input-wrapper w-100"
                      style={{ height: "13.5rem" }}
                    >
                      <Image
                        src={
                          fotoProfil
                            ? fotoProfil
                            : "/assets/media/logos/default.png"
                        }
                        width="1000"
                        height="1000"
                        alt="user2"
                      />
                    </div>
                    <div>
                      <label
                        className="btn btn-xs btn-icon btn-circle btn-primary btn-hover-text-primary btn-shadow bg-blue-primary"
                        data-action="change"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Change avatar"
                        onClick={() =>
                          setShowEditImage(true)
                        }
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa fa-pen icon-sm text-muted text-white"></i>
                        {/* <input
                        type="file"
                        name="profile_avatar"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                          onFotoHandler(e);
                        }}
                      />
                      <input type="hidden" name="profile_avatar_remove" /> */}
                      </label>
                    </div>

                    <span
                      className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                      data-action="cancel"
                      data-toggle="tooltip"
                      title="Cancel avatar"
                    >
                      <i className="ki ki-bold-close icon-xs text-muted"></i>
                    </span>
                  </div>
                  <div className="mt-4 w-100">
                    <ul style={listUl}>
                      <li
                        className={
                          sideBar
                            ? "p-4 listDTS isactive mb-2"
                            : "p-4 listDTS mb-2"
                        }
                        style={{ fontSize: "15px" }}
                        onClick={() => {
                          setSideBar(true);
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <Image
                            src={
                              sideBar
                                ? "/assets/icon/user2.svg"
                                : "/assets/icon/useract.svg"
                            }
                            width="20"
                            height="20"
                            alt="user2"
                          />
                          <p className="m-0 ml-4 mt-1">
                            Informasi Data Pribadi
                          </p>
                        </div>
                      </li>
                      <li
                        className={
                          sideBar ? "p-4 listDTS" : "p-4 listDTS isactive"
                        }
                        style={{ fontSize: "15px" }}
                        onClick={() => {
                          setSideBar(false);
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <Image
                            src={
                              sideBar
                                ? "/assets/icon/Briefcase.svg"
                                : "/assets/icon/BriefcaseAct.svg"
                            }
                            width="20"
                            height="20"
                            alt="user2"
                          />
                          <p className="m-0 ml-4 mt-1">Data Pelatihan</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Edit Image  */}
        <Modal
          show={showEditImage}
          onHide={() => onHandleHideModal()}
          centered
        // dialogClassName="mx-10 mx-sm-auto rounded-lg"
        >
          <Modal.Header>
            <Modal.Title>Ganti Foto Profil</Modal.Title>

            <button
              type="button"
              className="close"
              onClick={() => onHandleHideModal()}
            >
              <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
            </button>
          </Modal.Header>

          <Modal.Body>
            <div>Foto</div>

            <div className="my-5">
              <button
                className="btn btn-rounded-full btn-sm bg-blue-primary text-white d-flex justify-content-center"
                onClick={() => {
                  document.getElementById("edit-image").click();
                }}
              >
                <i className="ri-upload-2-fill text-white"></i> Pilih Foto
              </button>

              <input
                type="file"
                name="gambar"
                className="custom-file-input"
                id="edit-image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onSelectFile}
              />

              <div className="row mt-5">
                <div className="col-12 col-md-6">
                  <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  {upImg ? (
                    <div>
                      <div>Preview</div>
                      <canvas
                        ref={previewCanvasRef}
                        style={{
                          width: Math.round(completedCrop?.width ?? 0),
                          height: Math.round(completedCrop?.height ?? 0),
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <div className="row">
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5 d-flex justify-content-center"
                  onClick={() => onHandleHideModal()}
                >
                  Batal
                </button>
                <button
                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white d-flex justify-content-center"
                  onClick={() => generateImage(previewCanvasRef.current,completedCrop)}
                >
                  Simpan
                </button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
        {/* End of Modal Edit Image */}

        {sideBar && !router.query.ubah_pelatihan_id && (
          <div className="col-12 col-lg-9 col-xl-9">
            <div className="card card-custom card-stretch gutter-b">
              <div className="">
                <h3 className="card-title font-weight-bolder text-dark w-100 pl-7 pt-5 mb-5 mt-5 titles-1">
                  Data Pribadi
                </h3>

                <div className="card-body pt-0 px-4 px-sm-8 py-4">
                  <div className="form-group">

                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Nama Lengkap</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Nama Lengkap"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("name");
                          }}
                        />
                        {simpleValidator.current.message("name", name, "required", {
                          className: "text-danger",
                        })}
                      </div>
                      <div className="form-group">
                        <label>NIK</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan NIK"
                          maxLength={16}
                          value={nik}
                          onChange={(e) => {
                            if (e.target.value.length === 17) {
                              setNik(nik);
                            } else {
                              setNik(e.target.value.replace(/[^0-9]/g, ""));
                            }
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("nik");
                          }}
                        />
                        {simpleValidator.current.message(
                          "nik",
                          nik,
                          "required|max:17",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                      <div className="form-group">
                        <label>Nomor Handphone</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Nomor Handphone"
                          value={nomorHandphone}
                          onChange={(e) => {
                            if (e.target.value.length === 15) {
                              setNomorHandphone(nomorHandphone);
                            } else {
                              setNomorHandphone(
                                e.target.value.replace(/[^0-9]/g, "")
                              );
                            }
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor(
                              "nomorHandphone"
                            );
                          }}
                        />
                        {simpleValidator.current.message(
                          "nomorHandphone",
                          nomorHandphone,
                          "required|max:14",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                      <div className="form-group">
                        <label>Tempat Lahir</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Tempat Lahir"
                          value={tempatLahir}
                          onChange={(e) => {
                            setTempatLahir(e.target.value);
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor(
                              "tempatLahir"
                            );
                          }}
                        />
                        {simpleValidator.current.message(
                          "tempatLahir",
                          tempatLahir,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                      <div className="form-group">
                        <label>Nama Kontak Darurat</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Nama Kontak Darurat"
                          value={namaDarurat}
                          onChange={(e) => {
                            setNamaDarurat(e.target.value);
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("nama kontak darurat");
                          }}
                        />
                        {simpleValidator.current.message("nama kontak darurat", namaDarurat, "required", {
                          className: "text-danger",
                        })}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Masukkan Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("email");
                          }}
                        />
                        {simpleValidator.current.message(
                          "email",
                          email,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleSelect1">Jenis Kelamin</label>
                        <select
                          className="form-control"
                          placeholder="Pilih Jenis Kelamin"
                          id="exampleSelect1"
                          value={jenisKelamin}
                          onChange={(e) => {
                            setJenisKelamin(e.target.value);
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor(
                              "jenisKelamin"
                            );
                          }}
                        >
                          <option value="" disabled hidden>
                            Pilih Jenis Kelamin
                          </option>
                          <option value="Perempuan">Perempuan</option>
                          <option value="Laki - Laki">Laki-Laki</option>
                        </select>

                        {simpleValidator.current.message(
                          "jenisKelamin",
                          jenisKelamin,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                      <div className="form-group">
                        <label>Pendidikan</label>
                        <select
                          className="form-control"
                          placeholder="Pilih Pendidikan"
                          id="exampleSelect1"
                          value={pendidikan}
                          onChange={(e) => setPendidikan(e.target.value)}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor(
                              "pendidikan"
                            );
                          }}
                        >
                          <option value="" disabled hidden>
                            Pilih Pendidikan
                          </option>
                          {
                            optionPendidikan.map((row, i) => {
                              return (
                                <option
                                  key={row.id}
                                  value={row.label}
                                  selected={pendidikan === row.label ? true : false}
                                >
                                  {row.label}
                                </option>
                              )
                            })
                          }
                        </select>
                        {simpleValidator.current.message("pendidikan", pendidikan, "required", {
                          className: "text-danger",
                        })}
                      </div>
                      <div className="form-group">
                        <label>Tanggal Lahir</label>
                        <input
                          type="date"
                          id="setTodaysDate"
                          className="form-control"
                          placeholder="Masukkan Tanggal Lahir"
                          value={tanggalLahir}
                          onChange={(e) => {
                            if (
                              e.target.value < formatDate(new Date(Date.now()))
                            ) {
                              setTanggalLahir(e.target.value);
                            } else if (e.target.value) {
                              setTanggalLahir(formatDate(new Date(Date.now())));
                            }
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor(
                              "tanggalLahir"
                            );
                          }}
                          max={moment()
                            .subtract(1, "year")
                            .format("YYYY-MM-DD")}
                        />
                        {simpleValidator.current.message(
                          "tanggalLahir",
                          tanggalLahir,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                      <div className="form-group">
                        <label>Nomor Kontak Darurat</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Nomor Kontak Darurat"
                          value={nomorDarurat}
                          onChange={(e) => {
                            setNomorDarurat(e.target.value);
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("nomor kontak darurat");
                          }}
                        />
                        {simpleValidator.current.message("nomor kontak darurat", nomorDarurat, "required", {
                          className: "text-danger",
                        })}
                      </div>
                    </div>
                  </div>
                  <h3 className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1">
                    Alamat
                  </h3>
                  <div className="form-group">
                    <label>Alamat (Sesuai KTP)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Alamat KTP"
                      value={alamatKtp}
                      onChange={(e) => {
                        setAlamatKtp(e.target.value);
                      }}
                      onBlur={(e) => {
                        simpleValidator.current.showMessageFor("alamatKtp");
                      }}
                    />
                    {simpleValidator.current.message(
                      "alamatKtp",
                      alamatKtp,
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Provinsi</label>
                        <Select
                          placeholder="Pilih Provinsi"
                          defaultValue={{
                            label: provinsiKtp,
                            value: provinsiKtp,
                          }}
                          onChange={(e) => {
                            dispatch(dropdownKabupaten(token, e.value));
                            setProvinsiKtp({
                              label: e?.label,
                              value: e?.value,
                            });
                          }}
                          options={optionProvinsi}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor(
                              "provinsiKtp"
                            );
                          }}
                        />
                        {simpleValidator.current.message(
                          "provinsiKtp",
                          provinsiKtp,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="exampleSelect1">Kota</label>
                        <Select
                          placeholder="Pilih Kota"
                          options={optionKabupaten}
                          defaultValue={{ label: kotaKtp, value: kotaKtp }}
                          onChange={(e) => {
                            dispatch(dropdownProvinsiToDesa(token, e.value));
                            setKotaKtp({ label: e?.label, value: e?.value });
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("kotaKtp");
                          }}
                        />
                        {simpleValidator.current.message(
                          "kotaKtp",
                          kotaKtp,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Kecamatan</label>
                        <Select
                          placeholder="Pilih Provinsi"
                          defaultValue={{
                            label: kecamatanKtp,
                            value: kecamatanKtp,
                          }}
                          onChange={(e) => {
                            setKecamatanKtp({
                              label: e?.label,
                              value: e?.value,
                            });
                            dispatch(dropdownKecamatanToDesa(token, e.value));
                          }}
                          options={optionKecamatan}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor(
                              "kecamatanKtp"
                            );
                          }}
                        />
                        {simpleValidator.current.message(
                          "kecamatanKtp",
                          kecamatanKtp,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                      <div className="form-group">
                        <label>Kode Pos</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Kode Pos KTP"
                          value={kodePostKtp}
                          onChange={(e) => {
                            if (e.target.value.length === 6) {
                              setKodePostKtp(kodePostKtp);
                            } else {
                              setKodePostKtp(e.target.value.replace(/[^0-9]/g));
                            }
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor(
                              "kodePostKtp"
                            );
                          }}
                        />
                        {simpleValidator.current.message(
                          "kodePostKtp",
                          kodePostKtp,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="exampleSelect1">Kelurahan</label>
                        <Select
                          placeholder="Pilih Kota"
                          options={optionKelurahan}
                          defaultValue={{
                            label: kelurahanKtp,
                            value: kelurahanKtp,
                          }}
                          onChange={(e) => {
                            setKelurahanKtp({
                              label: e?.label,
                              value: e?.value,
                            });
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor(
                              "kelurahanKtp"
                            );
                          }}
                        />
                        {simpleValidator.current.message(
                          "kelurahanKtp",
                          kelurahanKtp,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Alamat Domisili</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Alamat Domisili"
                      value={alamat}
                      onChange={(e) => {
                        setAlamat(e.target.value);
                      }}
                      onBlur={(e) => {
                        simpleValidator.current.showMessageFor("alamat");
                      }}
                    />
                    {simpleValidator.current.message(
                      "alamat",
                      alamat,
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Provinsi</label>
                        <Select
                          placeholder="Pilih Provinsi"
                          defaultValue={{ label: provinsi, value: provinsi }}
                          onChange={(e) => {
                            dispatch(dropdownKabupaten(token, e.value));
                            setProvinsi({ label: e?.label, value: e?.value });
                          }}
                          options={optionProvinsi}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("provinsi");
                          }}
                        />
                        {simpleValidator.current.message(
                          "provinsi",
                          provinsi,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="exampleSelect1">Kota</label>
                        <Select
                          placeholder="Pilih Kota"
                          options={optionKabupaten}
                          defaultValue={{ label: kota, value: kota }}
                          onChange={(e) => {
                            dispatch(dropdownProvinsiToDesa(token, e.value));
                            setKota({ label: e?.label, value: e?.value });
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("kota");
                          }}
                        />
                        {simpleValidator.current.message(
                          "kota",
                          kota,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Kecamatan</label>
                        <Select
                          placeholder="Pilih Provinsi"
                          defaultValue={{ label: kecamatan, value: kecamatan }}
                          onChange={(e) => {
                            dispatch(dropdownKecamatanToDesa(token, e.value));
                            setKecamatan({ label: e?.label, value: e?.value });
                          }}
                          options={optionKecamatan}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("kecamatan");
                          }}
                        />
                        {simpleValidator.current.message(
                          "kecamatan",
                          kecamatan,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                      <div className="form-group">
                        <label>Kode Pos</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Kode Pos Domisili"
                          value={kodePost}
                          onChange={(e) => {
                            if (e.target.value.length === 6) {
                              setKodePost(kodePost);
                            } else {
                              setKodePost(e.target.value.replace(/[^0-9]/g));
                            }
                          }}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("kodePost");
                          }}
                        />
                        {simpleValidator.current.message(
                          "kodePost",
                          kodePost,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="exampleSelect1">Kelurahan</label>
                        <Select
                          placeholder="Pilih Kota"
                          defaultValue={{ label: kelurahan, value: kelurahan }}
                          onChange={(e) => {
                            setKelurahan({ label: e?.label, value: e?.value });
                          }}
                          options={optionKelurahan}
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("kelurahan");
                          }}
                        />
                        {simpleValidator.current.message(
                          "kelurahan",
                          kelurahan,
                          "required",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1">
                    Upload Berkas Pribadi
                  </h3>
                  <div className="form-group">
                    <label>KTP</label>
                    <div className="d-flex">
                      <div className="custom-file" style={{zIndex:'0'}}>
                        <input
                          // onFocus={() => setError({ ...error, agency_logo: "" })}
                          onChange={(e) => onKtpHandler(e)}
                          type="file"
                          name="logo"
                          className="custom-file-input cursor-pointer"
                          id="inputGroupFile04"
                          accept="image/png,image/jpg"
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("ktpName");
                          }}
                        />
                        {simpleValidator.current.message(
                          "ktpName",
                          ktpName,
                          "required",
                          {
                            className: "text-danger mt-6",
                          }
                        )}

                        <label
                          className="custom-file-label"
                          htmlFor="inputGroupFile04"
                        >
                          {ktpName}
                        </label>
                      </div>
                    </div>
                    <p className="text-muted">*JPG/JPEG/PNG.</p>
                  </div>
                  <div className="form-group">
                    <label>Ijazah</label>
                    <div className="d-flex">
                      <div className="custom-file" style={{zIndex:'0'}}>
                        <input
                          onChange={(e) => onIjasahHandler(e)}
                          type="file"
                          name="logo"
                          className="custom-file-input"
                          accept="image/png,image/jpg"
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor(
                              "ijazahName"
                            );
                          }}
                        />

                        <label
                          className="custom-file-label"
                          htmlFor="inputGroupFile04"
                        >
                          {ijazahName}
                        </label>
                        <label style={{ marginTop: "15px" }}>
                          {simpleValidator.current.message(
                            "Ijasah",
                            ijazahName,
                            "required",
                            { className: "text-danger" }
                          )}
                        </label>
                      </div>
                    </div>
                    <p className="text-muted">*JPG/JPEG/PNG.</p>
                  </div>

                  <h3 className="card-title font-weight-bolder text-dark w-100 pt-5 mb-5 mt-5 titles-1">
                    Ganti Kata Sandi
                  </h3>
                  <div className="form-group">
                    <label>Kata Sandi Baru</label>
                    <div className="position-relative">
                      <input
                        id="input-password"
                        type="password"
                        className="form-control"
                        placeholder="Silahkan Masukkan Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      {hidePassword === true ? (
                        <i
                          className="ri-eye-fill right-center-absolute cursor-pointer"
                          style={{ right: "10px" }}
                          onClick={() => handlerShowPassword(false)}
                        />
                      ) : (
                        <i
                          className="ri-eye-off-fill right-center-absolute cursor-pointer"
                          style={{ right: "10px" }}
                          onClick={() => handlerShowPassword(true)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Konfirmasi Kata Sandi Baru</label>
                    <div className="position-relative">
                      <input
                        id="input-password-confirm"
                        type="password"
                        className="form-control"
                        placeholder="Silahkan Masukkan Konfirmasi Password"
                        onChange={(e) => {
                          setPasswordConfirm(e.target.value);
                        }}
                      />

                      {hidePasswordConfirm === true ? (
                        <i
                          className="ri-eye-fill right-center-absolute cursor-pointer"
                          style={{ right: "10px" }}
                          onClick={() => handlerShowPasswordConfirm(false)}
                        />
                      ) : (
                        <i
                          className="ri-eye-off-fill right-center-absolute cursor-pointer"
                          style={{ right: "10px" }}
                          onClick={() => handlerShowPasswordConfirm(true)}
                        />
                      )}
                    </div>
                  </div>

                  <div className="form-group row mt-6">
                    <div className="col-sm-12 d-flex justify-content-end">
                      <Link href="/site-management/user/user-dts" passHref>
                        <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                          Kembali
                        </a>
                      </Link>
                      <button
                        type="button"
                        onClick={onSubmit}
                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!sideBar &&
          !router.query.pelatihan_id &&
          !router.query.ubah_pelatihan_id ? (
          <ListPelatihan token={token} />
        ) : null}
        {!sideBar && router.query.pelatihan_id ? (
          <Tables token={token} />
        ) : null}
        {router.query.ubah_pelatihan_id ? (
          <UbahPelatihan token={token} />
        ) : null}
      </div>
    </PageWrapper >
  );
};

export default TambahPage;
