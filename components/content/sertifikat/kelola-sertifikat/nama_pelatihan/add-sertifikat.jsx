// #Next & React
import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// #Page, Component & Library
import Image from "next/image";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SignaturePad from "react-signature-pad-wrapper";
import SimpleReactValidator from "simple-react-validator";
import { useSelector } from "react-redux";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { toPng } from "html-to-image";
import { useDispatch } from "react-redux";
import { newSertifikat } from "../../../../../redux/actions/sertifikat/kelola-sertifikat.action";

export default function TambahMasterSertifikat({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();
  // #Div Reference Lembar 1
  const divReference = useRef(null);
  const divReferenceSilabus = useRef(null);
  const [divImage, setDivImage] = useState(null);

  // #Redux state
  const { loading, error, certificate } = useSelector(
    state => state.detailCertificates
  );
  // #Redux state
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  // #START FORM DATA
  const [certificate_type, setCertificate_type] = useState(1);
  const [number_of_signatures, setNumber_of_signatures] = useState(1);
  const [
    signature_certificate_set_position,
    setSignature_certificate_set_position,
  ] = useState([]);

  const [signature_certificate_name, setSignature_certificate_name] = useState(
    []
  );
  const [signature_certificate_image, setSignature_certificate_image] =
    useState([]);

  const [signature_certificate_position, setSignature_ceritifcate_position] =
    useState([]);

  const [certificate_result, setCertificate_result] = useState();

  // START SYLLABUS
  const [certificate_result_syllabus, setCertificate_result_syllabus] =
    useState();

  const [
    signature_certificate_name_syllabus,
    setSignature_ceritficate_name_syllabus,
  ] = useState([]);
  const [
    signature_certificate_image_syllabus,
    setSignature_certificate_image_syllabus,
  ] = useState([]);
  const [
    signature_certificate_position_syllabus,
    setSignature_certificate_position_syllabus,
  ] = useState([]);

  const [
    signature_certificate_set_position_syllabus,
    setSignature_certificate_set_position_syllabus,
  ] = useState([]);
  // END SYLLABUS
  // #END FORM DATA

  // RESET TTD
  useEffect(() => {
    setSignature_certificate_set_position([0, 0, 0, 0]);
  }, [number_of_signatures]);

  useEffect(() => {
    setSignature_certificate_set_position_syllabus([0, 0, 0, 0]);
  }, [number_of_signature_syllabus]);

  // #START MODAL
  const [tandaTanganType, setTandaTanganType] = useState([1, 1, 1, 1]);
  const [tandaTangan, setTandaTangan] = useState("");

  const signCanvas = useRef({});
  const handleImageTandaTangan = (e, index) => {
    console.log(e.target.name, "INI TARGET NAME", typeof e.target.name);
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          let newArr = [...signature_certificate_image];
          newArr[index] = reader.result;
          setSignature_certificate_image(newArr);
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };
  const handleCanvasTandaTangan = (e, i) => {
    const data = signCanvas.current.toDataURL();
    let newArr = [...signature_certificate_image];
    newArr[i] = data;
    setSignature_certificate_image(newArr);
  };
  const handleClearCanvasTandaTangan = (e, i) => {
    let newArr = [...signature_certificate_image];
    newArr[i] = "";
    setSignature_certificate_image(newArr);
    signCanvas.current.clear();
  };
  // #END MODAL

  // #START LEMBAR 2
  const [tandaTanganSyllabusType, setTandaTanganSyllabusType] = useState([
    1, 1, 1, 1,
  ]);

  const [number_of_signature_syllabus, setNumber_of_signature_syllabus] =
    useState(1);

  const handleImageTandaTanganSyllabus = (e, index) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          let newArr = [...signature_certificate_image_syllabus];
          newArr[index] = reader.result;
          setSignature_certificate_image_syllabus(newArr);
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };
  const handleCanvasTandaTanganSyllabus = (e, i) => {
    const data = signCanvas.current.toDataURL();
    let newArr = [...signature_certificate_image_syllabus];
    newArr[i] = data;
    setSignature_certificate_image_syllabus(newArr);
  };

  const handleClearCanvasTandaTanganSyllabus = (e, i) => {
    let newArr = [...signature_certificate_image_syllabus];
    newArr[i] = "";
    setSignature_certificate_image_syllabus(newArr);
    signCanvas.current.clear();
  };
  // #END SECTION 2

  // # START BACKGROUND IMAGE 1
  const [background, setBackground] = useState("");
  const onChangeBackground = e => {
    const type = ["image/jpg", "image/png", "image/jpeg"];

    if (type.includes(e.target.files[0].type)) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setBackground(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa data background.",
        "error"
      );
    }
  };
  // # END BACKGROUND IMAGE 1

  // # START BACKGROUND IMAGE 2
  const [background_syllabus, setBackground_syllabus] = useState("");
  const onChangeBackgroundLembar2 = e => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (type.includes(e.target.files[0].type)) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setBackground_syllabus(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa data background.",
        "error"
      );
    }
  };

  // # END IMAGE

  const handleDraft = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", certificate.data.list_certificate[0].name);
    formData.append("certificate_type", certificate_type);
    formData.append("background", background);

    signature_certificate_name.forEach((item, i) => {
      formData.append(`signature_certificate_name[${i}]`, item);
    });
    signature_certificate_image.forEach((item, i) => {
      formData.append(`signature_certificate_image[${i}]`, item);
    });
    signature_certificate_position.forEach((item, i) => {
      formData.append(`signature_certificate_position[${i}]`, item);
    });
    signature_certificate_position.forEach((item, i) => {
      formData.append(`signature_certificate_position[${i}]`, item);
    });
    signature_certificate_set_position.forEach((item, i) => {
      formData.append(`signature_certificate_set_position[${i}]`, item);
    });

    formData.append("background_syllabus", background_syllabus);
    signature_certificate_name_syllabus.forEach((item, i) => {
      formData.append(`signature_certificate_name[${i}]`, item);
    });
    signature_certificate_image_syllabus.forEach((item, i) => {
      formData.append(`signature_certificate_image[${i}]`, item);
    });
    signature_certificate_position_syllabus.forEach((item, i) => {
      formData.append(`signature_certificate_position[${i}]`, item);
    });
    signature_certificate_position_syllabus.forEach((item, i) => {
      formData.append(`signature_certificate_position[${i}]`, item);
    });
    signature_certificate_set_position_syllabus.forEach((item, i) => {
      formData.append(`signature_certificate_set_position[${i}]`, item);
    });

    certificate.data.list_certificate[0].syllabus.forEach((item, i) => {
      formData.append(`$syllabus[${i}]`, item);
    });
  };

  const [isPublish, setIsPublish] = useState(false);
  const handlePublish = useCallback(() => {
    if (divReference.current === null) {
      return;
    }
    toPng(divReferenceSilabus.current, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
    })
      .then(image => {
        const link = document.createElement("a");
        link.download = "my-image-name2.png";
        link.href = image;
        link.click();
        // console.log("ini imagenya", image); //dari sini gw post pokoknya namanya gatau
        // setDivImage(divReference.current);
      })
      .catch(err => {
        console.log(err);
      });

    toPng(divReference.current, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
    })
      .then(image => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = image;
        link.click();
        setDivImage(divReference.current);
      })
      .catch(err => {
        console.log(err);
      });
  }, [divReference, divReferenceSilabus]);

  return (
    <PageWrapper>
      {/* error START */}
      {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetError}
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
      {/* error END */}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          {/* START HEADER */}
          <div className="card-header border-0 d-flex justify-content-lg-between row my-auto py-10">
            <div className="card-title d-flex">
              <div className="text-dark">Nama Sertifikat :</div>
              <div className="mx-6">
                <div
                  type="text"
                  className="form-control "
                  placeholder="Masukan Nama Sertifikat"
                  // onChange={e => setSearch(e.target.value)}
                >
                  {certificate.data.list_certificate[0].name}
                </div>
              </div>
            </div>
            <div className="card-toolbar">
              <Link href="/sertifikat/master-sertifikat/tambah">
                <a
                  className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3"
                  onClick={() => {
                    console.log("klik batal");
                  }}
                >
                  Batal
                </a>
              </Link>
              {/* <Link href="/sertifikat/master-sertifikat/tambah"> */}
              <a
                className="btn btn-outline-primary-rounded-full px-6 font-weight-bolder px-6 py-3 mx-5"
                onClick={e => {
                  handleDraft(e);
                }}
              >
                Simpan Draft
              </a>
              <a
                className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3"
                onClick={() => {
                  handlePublish();
                }}
              >
                Simpan
              </a>
              {/* </Link> */}
            </div>
          </div>
          {/* END HEADER */}
          {/* START BODY */}
          <div className="card-body border-top">
            <div className="row p-0">
              {/* START COL */}
              <div
                className="border-primary border col-8 h-500px"
                // style={{ width: "842px" }}
              >
                <div className="p-0" ref={divReference}>
                  {background ? (
                    <Image
                      src={background}
                      alt="fitur"
                      // height={495}
                      // width={1400}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    ""
                  )}
                  <div className="row align-items-center zindex-1">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="m-6 text-center"
                        placeholder="Nomor Sertifikat"
                        style={{
                          borderStyle: "dashed",
                        }}
                      />
                    </div>
                    <div
                      className="col-12 text-center font-weight-normal p-0 justify-content-center"
                      style={{ marginTop: "-20px", width: "100%" }}
                    >
                      <label className="font-weight-boldest display-4 w-100">
                        SERTIFIKAT
                      </label>
                      <div className="w-100">Diberikan kepada</div>
                      <div className="my-2">
                        <span
                          className="mx-2 px-2 font-size-h6 px-10 w-100"
                          // style={{ borderStyle: "dashed" }}
                        >
                          Nama Peserta
                        </span>
                      </div>
                      <div className="w-100">Atas Partisipasi sebagai</div>
                      <div className="font-weight-normal font-size-h2 w-100">
                        Peserta
                      </div>
                      <div className="w-100">Nama Pelatihan</div>
                      <div
                        className="text-center font-weight-bolder border-2 w-100"
                        style={{
                          fontSize: "20px",
                          textAlign: "center",
                          // fontWeight: "bold",
                        }}
                      >
                        {certificate.theme}
                      </div>
                      <div className="mt-2 w-100">
                        <span className="w-100">
                          Program{" "}
                          <span className="font-size-h6 font-weight-bold w-100">
                            {certificate.data.list_certificate[0].academy.name}
                          </span>{" "}
                          Selama
                        </span>
                        <span
                          className="mx-2 px-2 border-2 w-100"
                          style={{ borderStyle: "dashed" }}
                        >
                          Waktu Pelatihan
                        </span>
                      </div>
                      <div className="mt-2 w-100">
                        <span>Digital Talent Scholarship</span>
                        <span
                          className="mx-2 px-2 border-2"
                          style={{ borderStyle: "dashed" }}
                        >
                          Tahun
                        </span>
                      </div>
                      <div className="my-4 w-100 text-center">
                        <span
                          className="mx-2 px-2 border-2"
                          style={{ borderStyle: "dashed" }}
                        >
                          Jakarta, DD/MM/YYYY
                        </span>
                      </div>
                      <div
                        className={
                          number_of_signatures < 3
                            ? " justify-content-center m-0 p-0 d-flex w-100"
                            : " justify-content-around  m-0 p-0 d-flex w-100"
                        }
                      >
                        {/* START MAP TTD */}
                        {[...Array(number_of_signatures)].map((el, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                transform: `translateX(${signature_certificate_set_position[i]}%)`,
                                // left: `${signature_certificate_set_position[i]}px`,
                                width: "156px",
                                height: "150px",
                              }}
                              className="col-3 p-0"
                            >
                              <div className="col">
                                <div
                                  className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                  style={{
                                    borderStyle: signature_certificate_image[i]
                                      ? ""
                                      : "dashed",
                                    height: "100px",
                                  }}
                                >
                                  {signature_certificate_image[i] ? (
                                    <Image
                                      src={signature_certificate_image[i]}
                                      layout="fill"
                                      alt={`Tanda tangan ${i + 1} `}
                                    />
                                  ) : (
                                    "TTD"
                                  )}
                                </div>
                                <div
                                  className="border-2 text-center w-100"
                                  style={{
                                    borderStyle: signature_certificate_name[i]
                                      ? ""
                                      : "dashed",
                                  }}
                                  //   placeholder="Nama Lengkap"
                                >
                                  {signature_certificate_name[i] ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: signature_certificate_name[i],
                                      }}
                                      className="my-auto m-0 p-0 test"
                                      style={{ margin: "0px" }}
                                    ></div>
                                  ) : (
                                    "Nama"
                                  )}
                                </div>
                                <div
                                  className="border-2 text-center w-100"
                                  style={{
                                    borderStyle: signature_certificate_position[
                                      i
                                    ]
                                      ? ""
                                      : "dashed",
                                  }}
                                >
                                  {signature_certificate_position[i] ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          signature_certificate_position[i],
                                      }}
                                      className="my-auto m-0 p-0"
                                      style={{ margin: "0px" }}
                                    ></div>
                                  ) : (
                                    "Jabatan"
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* END COL */}
              {/* START FORM Jenis Sertifikat */}
              <div className="col-4 font-weight-normal overflow-auto">
                <div className="form-group">
                  <label
                    htmlFor="Jenis Sertifikat"
                    className="font-weight-bold font-size-h5"
                  >
                    Jenis Sertifikat
                  </label>
                  <div className="d-flex justify-content-start">
                    <div className="col-6 form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="method"
                        value="1"
                        checked={certificate_type === 1}
                        onClick={() => setCertificate_type(1)}
                      />
                      <label className="form-check-label">1 Lembar</label>
                    </div>
                    <div className="col-6 form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="method"
                        value="2"
                        checked={certificate_type === 2}
                        onClick={() => setCertificate_type(2)}
                      />
                      <label className="form-check-label">2 Lembar</label>
                    </div>
                  </div>
                </div>
                {/* END FORM Jenis Sertifikat */}
                {/* START FORM Tanda tangan */}
                <div className="form-group mb-2">
                  <label className=" col-form-label font-weight-bold">
                    Jumlah Tanda Tangan
                  </label>
                  <div>
                    <select
                      name="jumlah_tandatangan"
                      onChange={e =>
                        setNumber_of_signatures(Number(e.target.value))
                      }
                      className="form-control"
                    >
                      <option selected value={1}>
                        1 Tanda Tangan
                      </option>
                      <option value={2}>2 Tanda Tangan</option>
                      <option value={3}>3 Tanda Tangan</option>
                      <option value={4}>4 Tanda Tangan</option>
                    </select>
                  </div>
                </div>
                {/* END FORM Tanda Tangan */}
                {/* START TANDA TANGAN SLIDER */}
                <div className="justify-content-center h-100px align-items-center">
                  {/* START MAP TTD */}
                  {[...Array(number_of_signatures)].map((el, i) => {
                    return (
                      <div key={i} className="d-flex justify-content-start">
                        <div className="col-12">
                          <div className="py-5">
                            {`Atur Tanda tangan - ${i + 1}`}
                          </div>
                          <div
                            className="card-toolbar"
                            data-target={`#modalTTD${i}`}
                            data-toggle="modal"
                          >
                            <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-15 py-3">
                              <i className="ri-pencil-fill text-white"></i>
                              Atur Tanda Tangan
                            </a>
                          </div>

                          {/* START MODAL */}
                          <div
                            className="modal fade"
                            id={`modalTTD${i}`}
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-dialog-centered"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLongTitle"
                                  >
                                    Tanda Tangan - {i + 1}
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div
                                  className="modal-body"
                                  //   style={{
                                  //     height: "400px",
                                  //   }}
                                >
                                  <div className="font-size-h5 mb-5">
                                    Penanda Tangan
                                  </div>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    config={{
                                      toolbar: ["bold", "italic", "underline"],
                                    }}
                                    onReady={editor => {
                                      // You can store the "editor" and use when it is needed.
                                    }}
                                    data={signature_certificate_name[i]}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      let newArr = [
                                        ...signature_certificate_name,
                                      ];
                                      newArr[i] = data;
                                      setSignature_certificate_name(newArr);
                                    }}
                                    className="h-25"
                                  />
                                  <div className="font-size-h5 my-5">
                                    Tanda Tangan
                                  </div>
                                  <div className="d-flex justify-content-start">
                                    <div className="col-6 form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`tandaTanganType${i}`}
                                        value="1"
                                        checked={tandaTanganType[i] == 1}
                                        onClick={() => {
                                          let newArr = [...tandaTanganType];
                                          newArr[i] = 1;
                                          setTandaTanganType(newArr);
                                        }}
                                      />
                                      <label className="form-check-label">
                                        Manual
                                      </label>
                                    </div>
                                    <div className="col-6 form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`tandaTanganType${i}`}
                                        value="2"
                                        checked={tandaTanganType[i] == 2}
                                        onClick={() => {
                                          let newArr = [...tandaTanganType];
                                          newArr[i] = 2;
                                          setTandaTanganType(newArr);
                                        }}
                                      />
                                      <label className="form-check-label">
                                        Digital
                                      </label>
                                    </div>
                                  </div>
                                  {tandaTanganType[i] == 1 ? (
                                    <div className="custom-file my-5">
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        name="image"
                                        onChange={e =>
                                          handleImageTandaTangan(e, i)
                                        }
                                        accept="image/png, image/jpeg , image/jpg"
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="customFile"
                                      >
                                        Choose file
                                      </label>
                                    </div>
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          background: "#FFFFFF",
                                          boxShadow:
                                            "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <SignaturePad
                                          ref={signCanvas}
                                          options={{
                                            minWidth: 1,
                                            maxWidth: 3,
                                            penColor: "rgb(66, 133, 244)",
                                          }}
                                          onBlur={() =>
                                            simpleValidator.current.showMessageFor(
                                              "tandaTangan"
                                            )
                                          }
                                        />
                                        {simpleValidator.current.message(
                                          "tandaTangan",
                                          tandaTangan,
                                          "required",
                                          { className: "text-danger" }
                                        )}
                                      </div>
                                      <div className="d-flex align-items-center my-5">
                                        <a
                                          className="btn btn-sm btn-rounded-full text-blue-primary border-primary mr-5"
                                          onClick={e =>
                                            handleCanvasTandaTangan(e, i)
                                          }
                                        >
                                          Buat Tanda Tangan
                                        </a>
                                        <button
                                          type="button"
                                          onClick={e => {
                                            handleClearCanvasTandaTangan(e, i);
                                          }}
                                          className="btn btn-sm btn-rounded-full bg-yellow-primary text-white"
                                        >
                                          Buat Ulang Tanda Tangan
                                        </button>
                                      </div>
                                    </>
                                  )}
                                  <div className="font-size-h5 mb-5">
                                    Jabatan Penanda Tangan
                                  </div>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    // config={editorConfig}
                                    onReady={editor => {
                                      // You can store the "editor" and use when it is needed.
                                    }}
                                    data={signature_certificate_position[i]}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      let newArr = [
                                        ...signature_certificate_position,
                                      ];
                                      newArr[i] = data;
                                      setSignature_ceritifcate_position(newArr);
                                    }}
                                    className="h-25"
                                  />
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Tutup
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* END MODAL */}
                          <div className="row align-items-center py-5 justify-content-center">
                            <div className="col-12">Atur Posisi</div>
                            <div className="col-12 d-flex py-5 px-4 ">
                              <input
                                type="number"
                                min={
                                  number_of_signatures == 1
                                    ? -156
                                    : number_of_signatures == 2
                                    ? -106
                                    : number_of_signatures == 3
                                    ? -22
                                    : -14
                                }
                                max={
                                  number_of_signatures == 1
                                    ? 156
                                    : number_of_signatures == 2
                                    ? 106
                                    : number_of_signatures == 3
                                    ? 22
                                    : 14
                                }
                                className="form-control"
                                placeholder={
                                  signature_certificate_set_position[i]
                                }
                                value={signature_certificate_set_position[i]}
                                onChange={e => {
                                  let newArr = [
                                    ...signature_certificate_set_position,
                                  ];
                                  newArr[i] = +e.target.value;
                                  setSignature_certificate_set_position(newArr);
                                }}
                              />

                              <input
                                type="range"
                                min={
                                  number_of_signatures == 1
                                    ? -156
                                    : number_of_signatures == 2
                                    ? -106
                                    : number_of_signatures == 3
                                    ? -22
                                    : -14
                                }
                                max={
                                  number_of_signatures == 1
                                    ? 156
                                    : number_of_signatures == 2
                                    ? 106
                                    : number_of_signatures == 3
                                    ? 22
                                    : 14
                                }
                                value={signature_certificate_set_position[i]}
                                className="text-white form-range form-control mx-5"
                                style={{
                                  cursor: "pointer",
                                  width: "100%",
                                }}
                                onChange={e => {
                                  let newArr = [
                                    ...signature_certificate_set_position,
                                  ];
                                  newArr[i] = +e.target.value;
                                  setSignature_certificate_set_position(newArr);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* {signature_certificate_set_position} */}
                      </div>
                    );
                  })}
                </div>
                {/* END TANDA TANGAN SLIDER */}
              </div>
              <div className="row mt-10 col-12">
                <div className="position-relative">
                  <label htmlFor="InputFile">
                    <div className="mr-5">
                      <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4">
                        Unggah Background
                      </a>
                    </div>
                  </label>
                  <input
                    type="file"
                    name="background"
                    className="custom-file-input"
                    id="InputFile"
                    onChange={e => onChangeBackground(e)}
                    // onChange={(e) => onChangeBackground(e)}
                    accept="image/*"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("background")
                    }
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* END BODY */}
        </div>
        {/* START SECTION 2 */}
        {certificate_type == 2 ? (
          <div className="card card-custom card-stretch gutter-b">
            {/* START BODY */}
            <div className="card-body border-top">
              <div className="row p-0">
                {/* START COL */}
                <div className="border-primary border col-8 h-500px h-100">
                  <div className="p-0" ref={divReferenceSilabus}>
                    {background_syllabus ? (
                      <Image
                        src={background_syllabus}
                        alt="fitur"
                        // height={495}
                        // width={700}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      ""
                    )}
                    <div
                      className="row align-items-center"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="p-19 zindex-1 col-12"
                        style={{ height: "370px" }}
                      >
                        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                          Silabus yang di dapat
                        </div>
                        <div>
                          <ol className="col mt-4">
                            {certificate.data.list_certificate[0].syllabus &&
                              certificate.data.list_certificate[0].syllabus.map(
                                (e, i) => {
                                  return (
                                    <li
                                      className="p-0"
                                      key={i}
                                      style={{
                                        fontSize:
                                          certificate.data.list_certificate[0]
                                            .syllabus.length >= 15
                                            ? "8px"
                                            : "12px",
                                      }}
                                    >
                                      {e}
                                    </li>
                                  );
                                }
                              )}
                          </ol>
                        </div>
                      </div>
                      <div
                        className="col-12 text-center font-weight-normal p-0 justify-content-center"
                        style={{
                          marginTop: "-20px",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div
                          className={
                            number_of_signature_syllabus < 3
                              ? " justify-content-center m-0 p-0 d-flex w-100"
                              : " justify-content-around  m-0 p-0 d-flex w-100"
                          }
                        >
                          {/* START MAP TTD */}
                          {[...Array(number_of_signature_syllabus)].map(
                            (el, i) => {
                              return (
                                <div
                                  key={i}
                                  style={{
                                    transform: `translateX(${signature_certificate_set_position_syllabus[i]}%)`,
                                    // left: `${signature_certificate_set_position[i]}px`,
                                    width: "156px",
                                    height: "150px",
                                  }}
                                  className="col-3 p-0"
                                >
                                  <div className="col">
                                    <div
                                      className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                      style={{
                                        borderStyle:
                                          signature_certificate_image_syllabus[
                                            i
                                          ]
                                            ? ""
                                            : "dashed",
                                        height: "100px",
                                      }}
                                    >
                                      {signature_certificate_image_syllabus[
                                        i
                                      ] ? (
                                        <Image
                                          src={
                                            signature_certificate_image_syllabus[
                                              i
                                            ]
                                          }
                                          layout="fill"
                                          alt={`Tanda tangan ${i + 1} `}
                                        />
                                      ) : (
                                        "TTD"
                                      )}
                                    </div>
                                    <div
                                      className="border-2 text-center w-100"
                                      style={{
                                        borderStyle:
                                          signature_certificate_name_syllabus[i]
                                            ? ""
                                            : "dashed",
                                      }}
                                      //   placeholder="Nama Lengkap"
                                    >
                                      {signature_certificate_name_syllabus[
                                        i
                                      ] ? (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              signature_certificate_name_syllabus[
                                                i
                                              ],
                                          }}
                                          className="my-auto m-0 p-0 test"
                                          style={{ margin: "0px" }}
                                        ></div>
                                      ) : (
                                        "Nama"
                                      )}
                                    </div>
                                    <div
                                      className="border-2 text-center w-100"
                                      style={{
                                        borderStyle:
                                          signature_certificate_position_syllabus[
                                            i
                                          ]
                                            ? ""
                                            : "dashed",
                                      }}
                                    >
                                      {signature_certificate_position_syllabus[
                                        i
                                      ] ? (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              signature_certificate_position_syllabus[
                                                i
                                              ],
                                          }}
                                          className="my-auto m-0 p-0"
                                          style={{ margin: "0px" }}
                                        ></div>
                                      ) : (
                                        "Jabatan"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* END COL */}
                {/* START FORM Jenis Sertifikat */}
                <div className="col-4 font-weight-normal overflow-auto">
                  {/* END FORM Jenis Sertifikat */}
                  {/* START FORM Tanda tangan */}
                  <div className="form-group mb-2">
                    <label className=" col-form-label font-weight-bold">
                      Jumlah Tanda Tangan
                    </label>
                    <div>
                      <select
                        name="jumlah_tandatangan"
                        onChange={e =>
                          setNumber_of_signature_syllabus(
                            Number(e.target.value)
                          )
                        }
                        className="form-control"
                      >
                        <option selected value={1}>
                          1 Tanda Tangan
                        </option>
                        <option value={2}>2 Tanda Tangan</option>
                        <option value={3}>3 Tanda Tangan</option>
                        <option value={4}>4 Tanda Tangan</option>
                      </select>
                    </div>
                  </div>
                  {/* END FORM Tanda Tangan */}
                  {/* START TANDA TANGAN SLIDER */}
                  <div className="justify-content-center h-100px align-items-center">
                    {/* START MAP TTD */}
                    {[...Array(number_of_signature_syllabus)].map((el, i) => {
                      return (
                        <div key={i} className="d-flex justify-content-start">
                          <div className="col-12">
                            <div className="py-5">
                              {`Atur Tanda tangan - ${i + 1}`}
                            </div>
                            <div
                              className="card-toolbar"
                              data-target={`#modalTTDSyllabus${i}`}
                              data-toggle="modal"
                            >
                              <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-15 py-3">
                                <i className="ri-pencil-fill text-white"></i>
                                Atur Tanda Tangan
                              </a>
                            </div>

                            {/* START MODAL */}
                            <div
                              className="modal fade"
                              id={`modalTTDSyllabus${i}`}
                              tabIndex="-1"
                              role="dialog"
                              aria-labelledby="exampleModalCenterTitle"
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLongTitle"
                                    >
                                      Tanda Tangan - {i + 1}
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div
                                    className="modal-body"
                                    //   style={{
                                    //     height: "400px",
                                    //   }}
                                  >
                                    <div className="font-size-h5 mb-5">
                                      Penanda Tangan
                                    </div>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      config={{
                                        toolbar: [
                                          "bold",
                                          "italic",
                                          "underline",
                                        ],
                                      }}
                                      onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                      }}
                                      data={
                                        signature_certificate_name_syllabus[i]
                                      }
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        let newArr = [
                                          ...signature_certificate_name_syllabus,
                                        ];
                                        newArr[i] = data;
                                        setSignature_ceritficate_name_syllabus(
                                          newArr
                                        );
                                      }}
                                      className="h-25"
                                    />
                                    <div className="font-size-h5 my-5">
                                      Tanda Tangan
                                    </div>
                                    <div className="d-flex justify-content-start">
                                      <div className="col-6 form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name={`tandaTanganSyllabusType${i}`}
                                          value="1"
                                          checked={
                                            tandaTanganSyllabusType[i] == 1
                                          }
                                          onClick={() => {
                                            let newArr = [
                                              ...tandaTanganSyllabusType,
                                            ];
                                            newArr[i] = 1;
                                            setTandaTanganSyllabusType(newArr);
                                          }}
                                        />
                                        <label className="form-check-label">
                                          Manual
                                        </label>
                                      </div>
                                      <div className="col-6 form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name={`tandaTanganSyllabusType${i}`}
                                          value="2"
                                          checked={
                                            tandaTanganSyllabusType[i] == 2
                                          }
                                          onClick={() => {
                                            let newArr = [
                                              ...tandaTanganSyllabusType,
                                            ];
                                            newArr[i] = 2;
                                            setTandaTanganSyllabusType(newArr);
                                          }}
                                        />
                                        <label className="form-check-label">
                                          Digital
                                        </label>
                                      </div>
                                    </div>
                                    {tandaTanganSyllabusType[i] == 1 ? (
                                      <div className="custom-file my-5">
                                        <input
                                          type="file"
                                          className="custom-file-input"
                                          name="image"
                                          onChange={e =>
                                            handleImageTandaTanganSyllabus(e, i)
                                          }
                                          accept="image/png, image/jpeg , image/jpg"
                                        />
                                        <label
                                          className="custom-file-label"
                                          htmlFor="customFile"
                                        >
                                          Choose file
                                        </label>
                                      </div>
                                    ) : (
                                      <>
                                        <div
                                          style={{
                                            background: "#FFFFFF",
                                            boxShadow:
                                              "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
                                            borderRadius: "10px",
                                          }}
                                        >
                                          <SignaturePad
                                            ref={signCanvas}
                                            options={{
                                              minWidth: 1,
                                              maxWidth: 3,
                                              penColor: "rgb(66, 133, 244)",
                                            }}
                                            onBlur={() =>
                                              simpleValidator.current.showMessageFor(
                                                "tandaTangan"
                                              )
                                            }
                                          />
                                          {simpleValidator.current.message(
                                            "tandaTangan",
                                            tandaTangan,
                                            "required",
                                            { className: "text-danger" }
                                          )}
                                        </div>
                                        <div className="d-flex align-items-center my-5">
                                          <a
                                            className="btn btn-sm btn-rounded-full text-blue-primary border-primary mr-5"
                                            onClick={e =>
                                              handleCanvasTandaTanganSyllabus(
                                                e,
                                                i
                                              )
                                            }
                                          >
                                            Buat Tanda Tangan
                                          </a>
                                          <button
                                            type="button"
                                            onClick={e => {
                                              handleClearCanvasTandaTanganSyllabus(
                                                e,
                                                i
                                              );
                                            }}
                                            className="btn btn-sm btn-rounded-full bg-yellow-primary text-white"
                                          >
                                            Buat Ulang Tanda Tangan
                                          </button>
                                        </div>
                                      </>
                                    )}
                                    <div className="font-size-h5 mb-5">
                                      Jabatan Penanda Tangan
                                    </div>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      // config={editorConfig}
                                      onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                      }}
                                      data={
                                        signature_certificate_position_syllabus[
                                          i
                                        ]
                                      }
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        let newArr = [
                                          ...signature_certificate_position_syllabus,
                                        ];
                                        newArr[i] = data;
                                        setSignature_certificate_position_syllabus(
                                          newArr
                                        );
                                      }}
                                      className="h-25"
                                    />
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Tutup
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* END MODAL */}
                            <div className="row align-items-center py-5 justify-content-center">
                              <div className="col-12">Atur Posisi</div>
                              <div className="col-12 d-flex py-5 px-4 ">
                                <input
                                  type="number"
                                  min={
                                    number_of_signature_syllabus == 1
                                      ? -156
                                      : number_of_signature_syllabus == 2
                                      ? -106
                                      : number_of_signature_syllabus == 3
                                      ? -22
                                      : -14
                                  }
                                  max={
                                    number_of_signature_syllabus == 1
                                      ? 156
                                      : number_of_signature_syllabus == 2
                                      ? 106
                                      : number_of_signature_syllabus == 3
                                      ? 22
                                      : 14
                                  }
                                  className="form-control"
                                  value={
                                    signature_certificate_set_position_syllabus[
                                      i
                                    ]
                                  }
                                  onChange={e => {
                                    let newArr = [
                                      ...signature_certificate_set_position_syllabus,
                                    ];
                                    newArr[i] = +e.target.value;
                                    setSignature_certificate_set_position_syllabus(
                                      newArr
                                    );
                                  }}
                                />

                                <input
                                  type="range"
                                  min={
                                    number_of_signature_syllabus == 1
                                      ? -156
                                      : number_of_signature_syllabus == 2
                                      ? -106
                                      : number_of_signature_syllabus == 3
                                      ? -22
                                      : -14
                                  }
                                  max={
                                    number_of_signature_syllabus == 1
                                      ? 156
                                      : number_of_signature_syllabus == 2
                                      ? 106
                                      : number_of_signature_syllabus == 3
                                      ? 22
                                      : 14
                                  }
                                  value={
                                    signature_certificate_set_position_syllabus[
                                      i
                                    ]
                                  }
                                  className="text-white form-range form-control mx-5"
                                  style={{
                                    cursor: "pointer",
                                    width: "100%",
                                  }}
                                  onChange={e => {
                                    let newArr = [
                                      ...signature_certificate_set_position_syllabus,
                                    ];
                                    newArr[i] = +e.target.value;
                                    setSignature_certificate_set_position_syllabus(
                                      newArr
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* {signature_certificate_set_position} */}
                        </div>
                      );
                    })}
                  </div>
                  {/* END TANDA TANGAN SLIDER */}
                </div>
                <div className="row mt-10 col-12">
                  <div className="position-relative">
                    <label htmlFor="InputFile2">
                      <div className="mr-5">
                        <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4">
                          Unggah Background
                        </a>
                      </div>
                    </label>
                    <input
                      type="file"
                      name="background2"
                      id="InputFile2"
                      className="custom-file-input"
                      onChange={e => onChangeBackgroundLembar2(e)}
                      accept="image/*"
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("background")
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* END BODY */}
          </div>
        ) : (
          <div></div>
        )}

        {/* START MODAL TANDA TANGAN  1*/}

        {/* END MODAL TANDA TANGAN */}
      </div>
    </PageWrapper>
  );
}
