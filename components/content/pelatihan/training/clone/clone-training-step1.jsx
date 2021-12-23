import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import moment from "moment";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";
import LoadingPage from "../../../../LoadingPage";

import {
  putTrainingStep1,
  getEditTrainingStep1,
} from "../../../../../redux/actions/pelatihan/training.actions";
import {
  dropdownAkademi,
  dropdownLevelPelatihan,
  dropdownMitra,
  dropdownPenyelenggara,
  dropdownProvinsi,
  dropdownTemabyAkademi,
  dropdownKabupaten,
  storeTrainingStep1,
} from "../../../../../redux/actions/pelatihan/function.actions";
import { useQuill } from "react-quilljs";
import { helperRemoveZeroFromIndex0 } from "../../../../../utils/middleware/helper";

const EditTrainingStep1 = ({ propsStep, token }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const today = new Date();

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const { quill, quillRef } = useQuill();

  const { data: getEditTraining } = useSelector(
    (state) => state.getEditTraining
  );
  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );

  const optionsAkademi = dataAkademi.data;

  const { error: dropdownErrorLevelPelatihan, data: dataLevelPelatihan } =
    useSelector((state) => state.drowpdownLevelPelatihan);

  const drowpdownTemabyAkademi = useSelector(
    (state) => state.drowpdownTemabyAkademi
  );

  const { error: dropdownErrorPenyelenggara, data: dataPenyelenggara } =
    useSelector((state) => state.drowpdownPenyelenggara);

  const { error: dropdownErrorMitra, data: dataMitra } = useSelector(
    (state) => state.drowpdownMitra
  );

  const { error: dropdownErrorZonasi, data: dataZonasi } = useSelector(
    (state) => state.drowpdownZonasi
  );

  const { error: dropdownErrorProvinsi, data: dataProvinsi } = useSelector(
    (state) => state.drowpdownProvinsi
  );

  const { error: dropdownErrorKabupaten, data: dataKabupaten } = useSelector(
    (state) => state.drowpdownKabupaten
  );

  //data pelatihan
  const [program, setProgram] = useState(
    (getEditTraining && getEditTraining.program_dts) || ""
  );
  const [ketentuan, setKetentuan] = useState(
    (getEditTraining && getEditTraining.ketentuan_peserta) || ""
  );

  const [name, setName] = useState(
    (getEditTraining && getEditTraining.name) || ""
  );
  const [level, setLevel] = useState({
    label: getEditTraining.level_pelatihan,
    value: getEditTraining.level_pelatihan,
  });
  const [academy, setAcademy] = useState({
    label: getEditTraining.akademi,
    value: getEditTraining.akademi_id,
  });
  const [theme, setTheme] = useState({
    label: getEditTraining.tema,
    value: getEditTraining.tema_id,
  });
  const [logoFile, setLogoFile] = useState("");
  const [logoBase, setLogoBase] = useState(getEditTraining.logo);
  const [logoName, setLogoName] = useState(
    getEditTraining.logo.length > 0 ? getEditTraining.logo : "Belum ada file"
  );
  const [thumbnailFile, setThumbnailFile] = useState("");
  const [thumbnailBase, setThumbnailBase] = useState(getEditTraining.thumbnail);
  const [thumbnailName, setThumbnailName] = useState(
    getEditTraining.thumbnail.length > 0
      ? getEditTraining.thumbnail
      : "Belum ada file"
  );
  const [silabusFile, setSilabusFile] = useState("");
  const [silabusBase, setSilabusBase] = useState(getEditTraining.silabus);
  const [silabusName, setSilabusName] = useState(
    getEditTraining.silabus.length > 0
      ? getEditTraining.silabus
      : "Belum ada file"
  );
  const [metodeImplementation, setMetodeImplementation] = useState(
    getEditTraining.metode_pelaksanaan
  );
  const [organizer, setOrganizer] = useState({
    label: getEditTraining.penyelenggara,
    value: getEditTraining.penyelenggara,
  });
  const [mitra, setMitra] = useState(
    dataMitra.data
      .filter((item) => {
        return item.name === getEditTraining.mitra_nama;
      })
      .map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      })[0]
  );

  //tanggal pendaftaran
  const [startDateRegistration, setStartDateRegistration] = useState(null);
  const [endDateRegistration, setEndDateRegistration] = useState(null);
  //tanggal pelatihan
  const [startDateTraining, setStartDateTraining] = useState(null);
  const [endDateTraining, setEndDateTraining] = useState(null);
  const [description, setDescription] = useState(getEditTraining.deskripsi);
  //kuota
  const [targetKuotaRegister, setTargetKuotaRegister] = useState(
    getEditTraining.kuota_pendaftar
  );
  const [targetKuotaUser, setTargetKuotaUser] = useState(
    getEditTraining.kuota_peserta
  );
  const [statusKuota, setStatusKuota] = useState(getEditTraining.status_kuota);
  const [plotRegistration, setPlotRegistration] = useState(
    getEditTraining.alur_pendaftaran
  );
  const [sertification, setSertification] = useState(
    getEditTraining.sertifikasi
  );
  const [lpjUser, setLpjUser] = useState(getEditTraining.lpj_peserta);
  const [zonasi, setZonasi] = useState({
    label: getEditTraining.zonasi,
    value: getEditTraining.zonasi,
  });

  const [batch, setBatch] = useState({
    label: getEditTraining.batch,
    value: getEditTraining.batch,
  });
  const [metodeTraining, setMetodeTraining] = useState(
    getEditTraining.metode_pelatihan
  );
  //location
  const [address, setAddress] = useState(getEditTraining.alamat);
  const [province, setProvince] = useState({
    label: getEditTraining.provinsi,
    value: getEditTraining.provinsi,
  });
  const [city, setCity] = useState({
    label: getEditTraining.kabupaten,
    value: getEditTraining.kabupaten,
  });
  const [umum, setUmum] = useState(getEditTraining.umum);
  const [tuna_netra, setTunaNetra] = useState(getEditTraining.tuna_netra);
  const [tuna_rungu, setTunaRungu] = useState(getEditTraining.tuna_rungu);
  const [tuna_daksa, setTunaDaksa] = useState(getEditTraining.tuna_daksa);

  useEffect(() => {
    dispatch(dropdownTemabyAkademi(academy.value, token));

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
    };

    setEditorLoaded(true);
  }, [dispatch, router.query.id, token, academy.value]);

  useEffect(() => {
    if (quill) {
      if (description) {
        quill.clipboard.dangerouslyPasteHTML(description);
      }
      quill.on("text-change", (delta, oldDelta, source) => {
        setDescription(quill.root.innerHTML);
      });
      // const { ops } = delta;
      // let updatedOps;
      // if (ops.length === 1) {
      //   updatedOps = [{ delete: ops[0].insert.length }];
      // } else {
      //   updatedOps = [ops[0], { delete: ops[1].insert.length }];
      // }
      // quill.updateContents({ ops: updatedOps });
    }
    setEditorLoaded(true);
  }, [quill]);

  const optionsLevelPelatihan = [];
  for (let index = 0; index < dataLevelPelatihan.data.length; index++) {
    let val = {
      value: dataLevelPelatihan.data[index].id,
      label: dataLevelPelatihan.data[index].label,
    };
    optionsLevelPelatihan.push(val);
  }

  let optionsPenyelenggara = [];
  for (let index = 0; index < dataPenyelenggara.data.length; index++) {
    let val = {
      value: dataPenyelenggara.data[index].id,
      label: dataPenyelenggara.data[index].label,
    };
    optionsPenyelenggara.push(val);
  }

  const optionsMitra = [];
  for (let index = 0; index < dataMitra.data.length; index++) {
    let val = {
      value: dataMitra.data[index].id,
      label: dataMitra.data[index].name,
    };
    optionsMitra.push(val);
  }

  const optionsZonasi = [];
  for (let index = 0; index < dataZonasi.data.zonasi.length; index++) {
    let val = {
      value: dataZonasi.data.zonasi[index].value,
      label: dataZonasi.data.zonasi[index].label,
    };
    optionsZonasi.push(val);
  }

  const optionsProvinsi = [];
  for (let index = 0; index < dataProvinsi.data.length; index++) {
    let val = {
      value: dataProvinsi.data[index].id,
      label: dataProvinsi.data[index].label,
    };
    optionsProvinsi.push(val);
  }

  let selectRefKabupaten = null;
  const optionsKabupaten = [];
  if (dataKabupaten.length !== 0) {
    for (let index = 0; index < dataKabupaten.data.length; index++) {
      let val = {
        value: dataKabupaten.data[index].id,
        label: dataKabupaten.data[index].value,
      };
      optionsKabupaten.push(val);
    }
  }

  let optionBatch = [];
  for (let index = 0; index < 20; index++) {
    const val = { value: index + 1, label: index + 1 };
    optionBatch.push(val);
  }

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const onLogoHandler = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (type.includes(e.target.files[0].type)) {
      if (e.target.files[0].size > 2000000) {
        e.target.value = null;
        Swal.fire("Oops !", "Data yang bisa dimasukkan hanya 2 MB.", "error");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setLogoBase(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        setLogoFile(e.target.files[0]);
        setLogoName(e.target.files[0].name);
      }
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa data gambar.",
        "error"
      );
    }
  };

  const onThumbnailHandler = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (type.includes(e.target.files[0].type)) {
      if (e.target.files[0].size > 2000000) {
        e.target.value = null;
        Swal.fire("Oops !", "Data yang bisa dimasukkan hanya 2 MB.", "error");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setThumbnailBase(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        setThumbnailFile(e.target.files[0]);
        setThumbnailName(e.target.files[0].name);
      }
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa data gambar.",
        "error"
      );
    }
  };

  const onDeleteHandler = (type) => {
    switch (type) {
      case "LOGO":
        setLogoFile("");
        setLogoBase("");
        setLogoName("Belum ada file");
        break;
      case "THUMBNAIL":
        setThumbnailFile("");
        setThumbnailBase("");
        setThumbnailName("Belum ada file");
        break;
      case "SILABUS":
        setSilabusFile("");
        setSilabusBase("");
        setSilabusName("Belum ada file");
        break;
      default:
        break;
    }
  };

  const onSilabusHandler = (e) => {
    const type = ["application/pdf"];
    if (type.includes(e.target.files[0].type)) {
      if (e.target.files[0].size > 2000000) {
        e.target.value = null;
        Swal.fire("Oops !", "Data yang bisa dimasukkan hanya 2 MB.", "error");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setSilabusBase(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        setSilabusFile(e.target.files[0]);
        setSilabusName(e.target.files[0].name);
      }
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa file pdf.",
        "error"
      );
    }
  };

  const disabilitasHandler = (value) => {
    if (disabilitas.some((res) => res === value)) {
      setDisabilitas(disabilitas.filter((res) => res !== value));
      return;
    }
    setDisabilitas([...disabilitas, value]);
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterPassedTime2 = (time) => {
    const currentDate = new Date(startDateRegistration);
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterPassedTime3 = (time) => {
    const currentDate = new Date(endDateRegistration);
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterPassedTime4 = (time) => {
    const currentDate = new Date(startDateTraining);
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // router.push("/pelatihan/pelatihan/tambah-pelatihan/tambah-registrasi");
    if (simpleValidator.current.allValid()) {
      const data = {
        program_dts: program,
        ketentuan_peserta: ketentuan,
        name,
        level_pelatihan: level,
        akademi_id: academy,
        tema_id: theme,
        logoFile,
        logo: logoBase,
        logoName,
        thumbnailFile,
        thumbnail: thumbnailBase,
        thumbnailName,
        silabusFile,
        silabus: silabusBase,
        silabusName,
        metode_pelaksanaan: metodeImplementation,
        penyelenggara: organizer,
        mitra,
        pendaftaran_mulai: startDateRegistration,
        pendaftaran_selesai: endDateRegistration,
        pelatihan_mulai: startDateTraining,
        pelatihan_selesai: endDateTraining,
        deskripsi: description,
        kuota_pendaftar: +targetKuotaRegister,
        kuota_peserta: +targetKuotaUser,
        status_kuota: statusKuota,
        alur_pendaftaran: plotRegistration,
        sertifikasi: sertification,
        lpj_peserta: lpjUser,
        zonasi_id: zonasi,
        batch: batch.label,
        metode_pelatihan: metodeTraining,
        alamat: address,
        provinsi: province,
        kabupaten: city,
        umum,
        tuna_netra,
        tuna_rungu,
        tuna_daksa,
      };
      dispatch(storeTrainingStep1(data));
      propsStep(2);
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar!",
      });
    }
  };

  const [errorMessageKuota, setErrorMessageKuota] = useState(false);
  useEffect(() => {
    if (targetKuotaUser < targetKuotaRegister) {
      setErrorMessageKuota(false);
    }
    if (+targetKuotaUser > +targetKuotaRegister) {
      setErrorMessageKuota(true);
      setTargetKuotaUser(+targetKuotaRegister);
    }
  }, [targetKuotaRegister, targetKuotaUser]);

  return (
    <div className="card card-custom card-stretch gutter-b">
      <div className="card-body py-4">
        <form onSubmit={submitHandler}>
          <h3 className="font-weight-bolder pb-5 pt-4">Data Pelatihan</h3>

          <div className="form-group row mb-2">
            <label className="col-form-label font-weight-bold col-sm-2">
              Program DTS
            </label>
            <div className="col-sm-10 my-auto">
              <div className="form-check form-check-inline">
                <input
                  id="programYa"
                  type="radio"
                  name="program"
                  className="form-check-input"
                  value="1"
                  checked={program === "1"}
                  onClick={() => setProgram("1")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program dts")
                  }
                />
                <label className="form-check-label" htmlFor="programYa">
                  Ya
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="programTidak"
                  type="radio"
                  name="program"
                  value="0"
                  className="form-check-input"
                  checked={program === "0"}
                  onClick={() => setProgram("0")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program dts")
                  }
                />
                <label className="form-check-label" htmlFor="programTidak">
                  Tidak
                </label>
              </div>
              {simpleValidator.current.message(
                "program dts",
                program,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="col-form-label font-weight-bold">
              Nama Pelatihan
            </label>
            <input
              type="text"
              placeholder="Silahkan Masukkan Nama Pelatihan"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("nama pelatihan")
              }
            />
            {simpleValidator.current.message(
              "nama pelatihan",
              name,
              "required|max:100",
              { className: "text-danger" }
            )}
          </div>

          <div className="form-group mb-4">
            <label className="col-form-label font-weight-bold">
              Level Pelatihan
            </label>
            <div className="position-relative" style={{ zIndex: "6" }}>
              <Select
                placeholder="Silahkan Pilih Level Pelatihan"
                options={optionsLevelPelatihan}
                defaultValue={level}
                onChange={(e) => setLevel({ value: e?.value, label: e?.label })}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("level pelatihan")
                }
              />
            </div>
            {simpleValidator.current.message(
              "level pelatihan",
              level.value,
              "required",
              { className: "text-danger" }
            )}
          </div>

          <div className="form-group mb-4">
            <label className="col-form-label font-weight-bold">Akademi</label>
            <div className="position-relative" style={{ zIndex: "5" }}>
              <Select
                placeholder="Silahkan Pilih Akademi"
                options={optionsAkademi}
                defaultValue={academy}
                onChange={(e) => {
                  setAcademy({ value: e?.value, label: e?.label });
                  if (e?.value === academy.value) {
                    return;
                  } else {
                    setTheme(null);
                  }
                }}
                onBlur={() => simpleValidator.current.showMessageFor("akademi")}
              />
            </div>
            {simpleValidator.current.message(
              "akademi",
              academy.value,
              "required",
              {
                className: "text-danger",
              }
            )}
          </div>

          <div className="form-group mb-4">
            <label className="col-form-label font-weight-bold">Tema</label>
            <div className="position-relative" style={{ zIndex: "4" }}>
              <div className={!academy ? "cursor-notallowed" : ""}>
                <Select
                  placeholder="Silahkan Pilih Tema"
                  options={drowpdownTemabyAkademi.data.data}
                  defaultValue={theme}
                  value={theme}
                  onChange={(e) =>
                    setTheme({ value: e?.value, label: e?.label })
                  }
                  onBlur={() => simpleValidator.current.showMessageFor("tema")}
                  isDisabled={academy ? false : true}
                />
              </div>
            </div>
            {simpleValidator.current.message("tema", theme, "required", {
              className: "text-danger",
            })}
          </div>

          <div className="form-group mb-3">
            <label className="col-form-label font-weight-bold">
              Logo Reference (Optional)
            </label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  accept="image/png, image/jpeg , image/jpg"
                  onChange={onLogoHandler}
                  name="logo-reference"
                  id="logoReference"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {logoName}
                </label>
              </div>
              <button
                className="btn btn-link-action bg-danger text-white ml-3"
                type="button"
                onClick={() => {
                  onDeleteHandler("LOGO");
                }}
              >
                <i className="ri-delete-bin-fill p-0 text-white"></i>
              </button>
            </div>
            <small className="text-muted">
              Format Image (.png/.jpg), Rekomendasi 1024x1024
            </small>
          </div>

          <div className="form-group mb-3">
            <label className="col-form-label font-weight-bold">
              Upload Thumbnail (Optional)
            </label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  accept="image/png, image/jpeg , image/jpg"
                  onChange={onThumbnailHandler}
                  id="uploadThumbnail"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {thumbnailName}
                </label>
              </div>
              <button
                className="btn btn-link-action bg-danger text-white ml-3"
                type="button"
                onClick={() => onDeleteHandler("THUMBNAIL")}
              >
                <i className="ri-delete-bin-fill p-0 text-white"></i>
              </button>
            </div>
            <small className="text-muted">
              Format Image (.png/.jpg), Rekomendasi 837 x 380
            </small>
          </div>

          <div className="form-group mb-3">
            <label className="col-form-label font-weight-bold">
              Upload Silabus
            </label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  accept="application/pdf"
                  onChange={onSilabusHandler}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("upload silabus")
                  }
                  id="uploadSilabus"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {silabusName}
                </label>
                <label style={{ marginTop: "15px" }}>
                  {simpleValidator.current.message(
                    "upload silabus",
                    silabusName,
                    "required",
                    { className: "text-danger" }
                  )}
                </label>
              </div>
              <button
                className="btn btn-link-action bg-danger text-white ml-3"
                type="button"
                onClick={() => onDeleteHandler("SILABUS")}
              >
                <i className="ri-delete-bin-fill p-0 text-white"></i>
              </button>
            </div>
            <small className="text-muted">Format File (.pdf)</small>
          </div>

          <div className="form-group row mb-0 pt-2">
            <label className="col-form-label font-weight-bold col-sm-2">
              Metode Pelaksanaan
            </label>
            <div className="col-sm-10 my-auto">
              <div className="form-check form-check-inline">
                <input
                  id="metodeSwakelola"
                  type="radio"
                  name="metode"
                  value="Swakelola"
                  checked={metodeImplementation === "Swakelola"}
                  onClick={() => setMetodeImplementation("Swakelola")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("metode pelaksanaan")
                  }
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="metodeSwakelola">
                  Swakelola
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="metodeMitra"
                  type="radio"
                  name="metode"
                  className="form-check-input"
                  value="Mitra"
                  checked={metodeImplementation === "Mitra"}
                  onClick={() => setMetodeImplementation("Mitra")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("metode pelaksanaan")
                  }
                />
                <label className="form-check-label" htmlFor="metodeMitra">
                  Mitra
                </label>
              </div>
              {simpleValidator.current.message(
                "metode pelaksanaan",
                metodeImplementation,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="col-form-label font-weight-bold">
              Penyelenggara
            </label>
            <Select
              placeholder="Silahkan Pilih Penyelenggara"
              options={optionsPenyelenggara}
              defaultValue={organizer}
              onChange={(e) =>
                setOrganizer({ value: e?.value, label: e?.label })
              }
              onBlur={() =>
                simpleValidator.current.showMessageFor("penyelenggara")
              }
            />
            {simpleValidator.current.message(
              "penyelenggara",
              organizer.value,
              "required",
              {
                className: "text-danger",
              }
            )}
          </div>

          <div className="form-group mb-4">
            <label className="col-form-label font-weight-bold">
              Pilih Mitra
            </label>
            <Select
              placeholder="Silahkan Pilih Mitra"
              options={optionsMitra}
              defaultValue={mitra}
              onChange={(e) => setMitra({ value: e?.value, label: e?.label })}
              onBlur={() => simpleValidator.current.showMessageFor("mitra")}
            />
            {simpleValidator.current.message(
              "mitra",
              mitra ? mitra.value : mitra,
              metodeImplementation === "Swakelola" ? "" : "required",
              {
                className: "text-danger",
              }
            )}
          </div>

          <h3 className="font-weight-bolder pt-3">Tanggal Pendaftaran</h3>

          <div className="form-group row mb-2">
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">
                Tanggal Mulai
              </label>
              <div className="position-relative">
                <DatePicker
                  selected={startDateRegistration}
                  onChange={(date) => {
                    setEndDateRegistration(null);
                    setStartDateTraining(null);
                    setEndDateTraining(null);
                    setStartDateRegistration(date);
                  }}
                  showTimeSelect
                  minDate={today}
                  locale="id"
                  timeFormat="HH:mm"
                  dateFormat="d MMMM yyyy - HH:mm"
                  className="form-control w-100 d-block"
                  placeholderText="Silahkan Pilih Tanggal Dari"
                  filterTime={filterPassedTime}
                />
                <i className="ri-calendar-line right-center-absolute pr-3"></i>
              </div>
              {simpleValidator.current.message(
                "tanggal mulai",
                startDateRegistration,
                "required",
                { className: "text-danger" }
              )}
            </div>
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">
                Tanggal Sampai
              </label>
              <div className="position-relative">
                <DatePicker
                  selected={endDateRegistration}
                  value={endDateRegistration}
                  onChange={(date) => {
                    setStartDateTraining(null);
                    setEndDateTraining(null);
                    setEndDateRegistration(date);
                  }}
                  minDate={
                    startDateRegistration ? startDateRegistration : today
                  }
                  showTimeSelect
                  className={`form-control w-100 d-block ${
                    !startDateRegistration ? `cursor-notallowed` : ""
                  }`}
                  locale="id"
                  timeFormat="HH:mm"
                  dateFormat="d MMMM yyyy - HH:mm"
                  placeholderText="Silahkan Pilih Tanggal Sampai"
                  filterTime={filterPassedTime2}
                  disabled={startDateRegistration ? false : true}
                />
                <i className="ri-calendar-line right-center-absolute pr-3"></i>
              </div>
              {simpleValidator.current.message(
                "tanggal sampai",
                endDateRegistration,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <h3 className="font-weight-bolder pt-3">Tanggal Pelatihan</h3>

          <div className="form-group row mb-2">
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">
                Tanggal Mulai
              </label>
              <div className="position-relative">
                <DatePicker
                  selected={startDateTraining}
                  value={startDateTraining}
                  onChange={(date) => {
                    setEndDateTraining(null);
                    setStartDateTraining(date);
                  }}
                  minDate={endDateRegistration ? endDateRegistration : today}
                  showTimeSelect
                  className="form-control w-100 d-block"
                  locale="id"
                  timeFormat="HH:mm"
                  dateFormat="d MMMM yyyy - HH:mm"
                  placeholderText="Silahkan Pilih Tanggal Dari"
                  filterTime={filterPassedTime3}
                />
                <i className="ri-calendar-line right-center-absolute pr-3"></i>
              </div>
              {simpleValidator.current.message(
                "tanggal mulai",
                startDateTraining,
                "required",
                { className: "text-danger" }
              )}
            </div>
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">
                Tanggal Sampai
              </label>
              <div className="position-relative">
                <DatePicker
                  onChange={(date) => setEndDateTraining(date)}
                  minDate={startDateTraining ? startDateTraining : today}
                  selected={endDateTraining}
                  value={endDateTraining}
                  filterTime={filterPassedTime4}
                  showTimeSelect
                  className={`form-control w-100 d-block ${
                    !startDateRegistration ? `cursor-notallowed` : ""
                  }`}
                  locale="id"
                  timeFormat="HH:mm"
                  dateFormat="d MMMM yyyy - HH:mm"
                  placeholderText="Silahkan Pilih Tanggal Sampai"
                  disabled={startDateTraining ? false : true}
                />
                <i className="ri-calendar-line right-center-absolute pr-3"></i>
              </div>
              {simpleValidator.current.message(
                "tanggal sampai",
                endDateTraining,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="col-form-label font-weight-bold">Deskripsi</label>
            <div className="ckeditor">
              {editorLoaded ? (
                // <CKEditor
                //   editor={ClassicEditor}
                //   data={description}
                //   onChange={(event, editor) => {
                //     const data = editor.getData();
                //     setDescription(data);
                //   }}
                //   onBlur={() =>
                //     simpleValidator.current.showMessageFor("deskripsi")
                //   }
                //   config={{
                //     placeholder: "Silahkan Masukan Deskripsi Detail",
                //   }}
                // />
                <div style={{ width: "100%", height: "250px" }}>
                  <div ref={quillRef} style={{ fontFamily: "Poppins" }} />
                </div>
              ) : (
                <p>Tunggu Sebentar</p>
              )}
              {simpleValidator.current.message(
                "deskripsi",
                description,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <h3 className="font-weight-bolder style-quill-margin">Kuota</h3>

          <div className="form-group row mb-2">
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">
                Kuota Target Pendaftar
              </label>
              {/* <CustomNumberInput
                state={targetKuotaUser}
                placeholder="Silahkan Masukan Kuota Target Pendaftar"
                onChange={handleOnChange}
              /> */}
              <input
                placeholder="Silahkan Masukan Kuota Target Pendaftar"
                type="number"
                value={targetKuotaRegister}
                onChange={(e) => {
                  helperRemoveZeroFromIndex0(
                    e.target.value,
                    setTargetKuotaRegister
                  );
                }}
                className="form-control"
                min="1"
                onBlur={() =>
                  simpleValidator.current.showMessageFor(
                    "kuota target pendaftar"
                  )
                }
                id="number1"
              />
              {simpleValidator.current.message(
                "kuota target pendaftar",
                targetKuotaRegister,
                "required|integer",
                { className: "text-danger" }
              )}
            </div>
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">
                Kuota Target Peserta
              </label>
              <input
                placeholder="Silahkan Masukan Kuota Target Peserta"
                type="number"
                min="1"
                value={targetKuotaUser}
                onChange={(e) => {
                  helperRemoveZeroFromIndex0(
                    e.target.value,
                    setTargetKuotaUser
                  );
                }}
                className="form-control"
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kuota target peserta")
                }
                id="number2"
              />
              {errorMessageKuota && (
                <p className="text-danger">
                  Kuota user tidak boleh lebih dari kuota register
                </p>
              )}
              {simpleValidator.current.message(
                "kuota target peserta",
                targetKuotaUser,
                "required|integer",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <div className="form-group row mb-0">
            <label className="col-form-label font-weight-bold col-sm-2">
              Status Kuota
            </label>
            <div className="col-sm-10 my-auto">
              <div className="form-check form-check-inline">
                <input
                  id="statusAvailable"
                  type="radio"
                  name="statusKuota"
                  className="form-check-input"
                  value="Available"
                  checked={statusKuota === "Available"}
                  onClick={() => setStatusKuota("Available")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("status kuota")
                  }
                />
                <label className="form-check-label" htmlFor="statusAvailable">
                  Available
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="statusFull"
                  type="radio"
                  name="statusKuota"
                  className="form-check-input"
                  value="Full"
                  checked={statusKuota === "Full"}
                  onClick={() => setStatusKuota("Full")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("status kuota")
                  }
                />
                <label className="form-check-label" htmlFor="statusFull">
                  Full
                </label>
              </div>
              {simpleValidator.current.message(
                "status kuota",
                statusKuota,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <div className="form-group row mb-0">
            <label className="col-form-label font-weight-bold col-sm-2">
              Alur Pendaftaran
            </label>
            <div className="col-sm-10">
              <div className="form-check mt-3">
                <input
                  id="plotRegistration1"
                  type="radio"
                  name="plotRegistration"
                  className="form-check-input"
                  value="Administrasi - Test Substansi"
                  checked={plotRegistration === "Administrasi - Test Substansi"}
                  onClick={() =>
                    setPlotRegistration("Administrasi - Test Substansi")
                  }
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("alur pendaftaran")
                  }
                />
                <label className="form-check-label" htmlFor="plotRegistration1">
                  Administrasi - Test Substansi
                </label>
              </div>
              <div className="form-check">
                <input
                  id="plotRegistration2"
                  type="radio"
                  name="plotRegistration"
                  className="form-check-input"
                  value="Tes Substansi - Administrasi"
                  checked={plotRegistration === "Tes Substansi - Administrasi"}
                  onClick={() =>
                    setPlotRegistration("Tes Substansi - Administrasi")
                  }
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("alur pendaftaran")
                  }
                />
                <label className="form-check-label" htmlFor="plotRegistration2">
                  Tes Substansi - Administrasi
                </label>
              </div>
              <div className="form-check">
                <input
                  id="plotRegistration3"
                  type="radio"
                  name="plotRegistration"
                  className="form-check-input"
                  value="Administrasi"
                  checked={plotRegistration === "Administrasi"}
                  onClick={() => setPlotRegistration("Administrasi")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("alur pendaftaran")
                  }
                />
                <label className="form-check-label" htmlFor="plotRegistration3">
                  Tanpa Tes Substansi & Administrasi
                </label>
              </div>
              {simpleValidator.current.message(
                "alur pendaftaran",
                plotRegistration,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <div className="form-group row mb-0 mt-2">
            <label className="col-form-label font-weight-bold col-sm-2">
              Sertifikasi
            </label>
            <div className="col-sm-10 my-auto">
              <div className="form-check form-check-inline">
                <input
                  id="sertification1"
                  type="radio"
                  name="sertification"
                  className="form-check-input"
                  value="global"
                  checked={sertification === "global"}
                  onClick={() => setSertification("global")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("sertifikasi")
                  }
                />
                <label className="form-check-label" htmlFor="sertification1">
                  Global
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="sertification2"
                  type="radio"
                  name="sertification"
                  className="form-check-input"
                  value="skkni"
                  checked={sertification === "skkni"}
                  onClick={() => setSertification("skkni")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("sertifikasi")
                  }
                />
                <label className="form-check-label" htmlFor="sertification2">
                  SKKNI (Nasional)
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="sertification3"
                  type="radio"
                  name="sertification"
                  className="form-check-input"
                  value="industri"
                  checked={sertification === "industri"}
                  onClick={() => setSertification("industri")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("sertifikasi")
                  }
                />
                <label className="form-check-label" htmlFor="sertification3">
                  Industri
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="sertification0"
                  type="radio"
                  name="sertification"
                  className="form-check-input"
                  value="0"
                  checked={sertification === "0"}
                  onClick={() => setSertification("0")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("sertifikasi")
                  }
                />
                <label className="form-check-label" htmlFor="sertification0">
                  Tidak
                </label>
              </div>
              {simpleValidator.current.message(
                "sertifikasi",
                sertification,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <div className="form-group row mb-0">
            <label className="col-form-label font-weight-bold col-sm-2">
              LPJ Peserta
            </label>
            <div className="col-sm-10 my-auto">
              <div className="form-check form-check-inline">
                <input
                  id="lpjPeserta1"
                  type="radio"
                  name="lpjPeserta"
                  className="form-check-input"
                  value="1"
                  checked={lpjUser === "1"}
                  onClick={() => setLpjUser("1")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("lpj peserta")
                  }
                />
                <label className="form-check-label" htmlFor="lpjPeserta1">
                  Ya
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="lpjPeserta0"
                  type="radio"
                  name="lpjPeserta"
                  className="form-check-input"
                  value="0"
                  checked={lpjUser === "0"}
                  onClick={() => setLpjUser("0")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("lpj peserta")
                  }
                />
                <label className="form-check-label" htmlFor="lpjPeserta0">
                  Tidak
                </label>
              </div>
              {simpleValidator.current.message(
                "lpj peserta",
                lpjUser,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <div className="form-group row mb-2">
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">Zonasi</label>
              <Select
                placeholder="Silahkan Pilih Level Zonasi"
                options={optionsZonasi}
                defaultValue={zonasi}
                onChange={(e) =>
                  setZonasi({ value: e?.value, label: e?.label })
                }
                onBlur={() => simpleValidator.current.showMessageFor("zonasi")}
              />
              {simpleValidator.current.message(
                "zonasi",
                zonasi.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </div>
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">Batch</label>
              <Select
                placeholder="Silahkan Pilih Batch"
                options={optionBatch}
                defaultValue={batch}
                onChange={(e) => setBatch({ value: e?.value, label: e?.label })}
                onBlur={() => simpleValidator.current.showMessageFor("batch")}
              />
              {simpleValidator.current.message(
                "batch",
                batch.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </div>
          </div>

          <div className="form-group row mb-0 mt-3">
            <label className="col-form-label font-weight-bold col-sm-2">
              Metode Pelatihan
            </label>
            <div className="col-sm-10 my-auto">
              <div className="form-check form-check-inline">
                <input
                  id="metodeTraining1"
                  type="radio"
                  name="metodeTraining"
                  className="form-check-input"
                  value="Offline"
                  checked={metodeTraining === "Offline"}
                  onClick={() => {
                    setMetodeTraining("Offline");
                    setAddress("");
                    setProvince("");
                    setCity("");
                  }}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("metode pelatihan")
                  }
                />
                <label className="form-check-label" htmlFor="metodeTraining1">
                  Offline
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="metodeTraining2"
                  type="radio"
                  name="metodeTraining"
                  className="form-check-input"
                  value="Online"
                  checked={metodeTraining === "Online"}
                  onClick={() => setMetodeTraining("Online")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("metode pelatihan")
                  }
                />
                <label className="form-check-label" htmlFor="metodeTraining2">
                  Online
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="metodeTraining3"
                  type="radio"
                  name="metodeTraining"
                  className="form-check-input"
                  value="Online dan Offline"
                  checked={metodeTraining === "Online dan Offline"}
                  onClick={() => {
                    setMetodeTraining("Online dan Offline");
                    setAddress("");
                    setProvince("");
                    setCity("");
                  }}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("metode pelatihan")
                  }
                />
                <label className="form-check-label" htmlFor="metodeTraining3">
                  Online & Offline
                </label>
              </div>
              {simpleValidator.current.message(
                "metode pelatihan",
                metodeTraining,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </div>
          </div>

          {metodeTraining !== "Online" && (
            <>
              <h3 className="font-weight-bolder pt-3">Lokasi Pelatihan</h3>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Alamat
                </label>
                <textarea
                  value={address}
                  rows="6"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("alamat")
                  }
                  placeholder="Silahkan Masukan Alamat Disini"
                />
                {simpleValidator.current.message(
                  "alamat",
                  address,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </div>

              <div className="form-group row mb-2">
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Provinsi
                  </label>
                  <Select
                    placeholder="Silahkan Pilih Provinsi"
                    options={optionsProvinsi}
                    defaultValue={province}
                    onChange={(e) => {
                      selectRefKabupaten.select.clearValue();
                      setProvince({ label: e?.label, value: e?.value });
                      dispatch(dropdownKabupaten(token, e.value));
                    }}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("provinsi")
                    }
                  />
                  {simpleValidator.current.message(
                    "provinsi",
                    province.value,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Kota / Kabupaten
                  </label>
                  <div className={!province ? "cursor-notallowed" : ""}>
                    <Select
                      ref={(ref) => (selectRefKabupaten = ref)}
                      placeholder="Silahkan Pilih Kota / Kabupaten"
                      options={optionsKabupaten}
                      defaultValue={city}
                      onChange={(e) =>
                        setCity({ value: e?.value, label: e?.label })
                      }
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("kota/kabupaten")
                      }
                      isDisabled={province ? false : true}
                    />
                  </div>
                  {simpleValidator.current.message(
                    "kota/kabupaten",
                    city.value,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
              </div>
            </>
          )}

          <div className="form-group row mb-0">
            <label className="col-form-label font-weight-bold col-sm-2">
              Disabilitas
            </label>
            <div className="col-sm-10">
              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  name="plotRegistration"
                  className="form-check-input"
                  defaultChecked={umum === "1"}
                  value={umum}
                  onClick={() => setUmum(!umum)}
                />
                <label className="form-check-label">Umum</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="plotRegistration"
                  className="form-check-input"
                  defaultChecked={tuna_netra === "1"}
                  value={tuna_netra}
                  onClick={() => setTunaNetra(!tuna_netra)}
                />
                <label className="form-check-label">Tuna Netra</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="plotRegistration"
                  className="form-check-input"
                  defaultChecked={tuna_rungu === "1"}
                  value={tuna_rungu}
                  onClick={() => setTunaRungu(!tuna_rungu)}
                />
                <label className="form-check-label">Tuna Rungu</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="plotRegistration"
                  className="form-check-input"
                  defaultChecked={tuna_daksa === "1"}
                  value={tuna_daksa}
                  onClick={() => setTunaDaksa(!tuna_daksa)}
                />
                <label className="form-check-label">Tuna Daksa</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="text-right">
              <button
                className="btn btn-light-ghost-rounded-full mr-2"
                type="button"
                onClick={() => router.push("/pelatihan/pelatihan")}
              >
                Batal
              </button>
              <button className="btn btn-primary-rounded-full" type="submit">
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrainingStep1;
