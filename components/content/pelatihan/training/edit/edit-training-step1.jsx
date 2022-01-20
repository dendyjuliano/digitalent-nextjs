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
import { SweatAlert } from "../../../../../utils/middleware/helper";
import Cookies from "js-cookie";

import {
  putTrainingStep1,
  updateTrainingStep1,
  getEditTrainingStep1,
  getEditTrainingStep2,
  clearErrors,
} from "../../../../../redux/actions/pelatihan/training.actions";
import { UPDATE_TRAINING_STEP1_RESET } from "../../../../../redux/types/pelatihan/training.type";
import {
  dropdownAkademi,
  dropdownLevelPelatihan,
  dropdownMitra,
  dropdownPenyelenggara,
  dropdownProvinsi,
  dropdownTemabyAkademi,
  dropdownKabupaten,
} from "../../../../../redux/actions/pelatihan/function.actions";

import { useQuill } from "react-quilljs";

const EditTrainingStep1 = ({ propsStep, token }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const today = new Date();
  const token_permission = Cookies.get("token_permission");

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const { quill, quillRef } = useQuill();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const { data: getEditTraining } = useSelector(
    (state) => state.getEditTraining
  );

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateTraining
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
    dataMitra &&
      dataMitra?.data
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
  const [startDateRegistration, setStartDateRegistration] = useState(
    new Date(
      getEditTraining.pendaftaran_mulai.slice(
        0,
        getEditTraining.pendaftaran_mulai.length - 1
      )
    )
  );
  const [endDateRegistration, setEndDateRegistration] = useState(
    new Date(
      getEditTraining.pendaftaran_selesai.slice(
        0,
        getEditTraining.pendaftaran_selesai.length - 1
      )
    )
  );
  //tanggal pelatihan
  const [startDateTraining, setStartDateTraining] = useState(
    new Date(
      getEditTraining.pelatihan_mulai.slice(
        0,
        getEditTraining.pelatihan_mulai.length - 1
      )
    )
  );
  const [endDateTraining, setEndDateTraining] = useState(
    new Date(
      getEditTraining.pelatihan_selesai.slice(
        0,
        getEditTraining.pelatihan_selesai.length - 1
      )
    )
  );
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

    if (isUpdated) {
      // propsStep(2);
      dispatch({ type: UPDATE_TRAINING_STEP1_RESET });
      router.push(
        `/pelatihan/pelatihan/edit-pelatihan/edit-registrasi?id=${router.query.id}`
      );
    }

    if (error) {
      SweatAlert("Gagal", error, "error");
      dispatch(clearErrors());
    }
  }, [dispatch, router.query.id, token, academy.value, isUpdated, error]);

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(description);
      quill.on("text-change", (delta, oldDelta, source) => {
        setDescription(quill.root.innerHTML);
      });
    }
    setEditorLoaded(true);
  }, [quill]);

  const optionsLevelPelatihan = [];
  if (dataLevelPelatihan) {
    for (let index = 0; index < dataLevelPelatihan.data.length; index++) {
      let val = {
        value: dataLevelPelatihan.data[index].id,
        label: dataLevelPelatihan.data[index].label,
      };
      optionsLevelPelatihan.push(val);
    }
  }

  let optionsPenyelenggara = [];
  if (dataPenyelenggara) {
    for (let index = 0; index < dataPenyelenggara.data.length; index++) {
      let val = {
        value: dataPenyelenggara.data[index].id,
        label: dataPenyelenggara.data[index].label,
      };
      optionsPenyelenggara.push(val);
    }
  }

  const optionsMitra = [];
  if (dataMitra) {
    for (let index = 0; index < dataMitra?.data.length; index++) {
      let val = {
        value: dataMitra?.data[index].id,
        label: dataMitra?.data[index].name,
      };
      optionsMitra.push(val);
    }
  }

  const optionsZonasi = [];
  if (dataZonasi) {
    for (let index = 0; index < dataZonasi.data.zonasi.length; index++) {
      let val = {
        value: dataZonasi.data.zonasi[index].value,
        label: dataZonasi.data.zonasi[index].label,
      };
      optionsZonasi.push(val);
    }
  }

  const optionsProvinsi = [];
  if (dataProvinsi) {
    for (let index = 0; index < dataProvinsi.data.length; index++) {
      let val = {
        value: dataProvinsi.data[index].id,
        label: dataProvinsi.data[index].label,
      };
      optionsProvinsi.push(val);
    }
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
      // if (e.target.files[0].size > 2000000) {
      //   e.target.value = null;
      //   Swal.fire("Oops !", "Data yang bisa dimasukkan hanya 2 MB.", "error");
      // } else {
      // }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setLogoBase(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setLogoFile(e.target.files[0]);
      setLogoName(e.target.files[0].name);
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
      // if (e.target.files[0].size > 2000000) {
      //   e.target.value = null;
      //   Swal.fire("Oops !", "Data yang bisa dimasukkan hanya 2 MB.", "error");
      // } else {
      // }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setThumbnailBase(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setThumbnailFile(e.target.files[0]);
      setThumbnailName(e.target.files[0].name);
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
        setLogoBase("Belum ada file");
        setLogoName("Belum ada file");
        break;
      case "THUMBNAIL":
        setThumbnailFile("");
        setThumbnailBase("Belum ada file");
        setThumbnailName("Belum ada file");
        break;
      case "SILABUS":
        setSilabusFile("");
        setSilabusBase("Belum ada file");
        setSilabusName("Belum ada file");
        break;
      default:
        break;
    }
  };

  const onSilabusHandler = (e) => {
    const type = ["application/pdf"];
    if (type.includes(e.target.files[0].type)) {
      // if (e.target.files[0].size > 2000000) {
      //   e.target.value = null;
      //   Swal.fire("Oops !", "Data yang bisa dimasukkan hanya 2 MB.", "error");
      // } else {
      // }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSilabusBase(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setSilabusFile(e.target.files[0]);
      setSilabusName(e.target.files[0].name);
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

  const submitHandler = (e) => {
    e.preventDefault();
    // router.push("/pelatihan/pelatihan/tambah-pelatihan/tambah-registrasi");
    if (metodeTraining === "Online") {
      simpleValidator.current.fields.alamat = true;
      simpleValidator.current.fields.provinsi = true;
      simpleValidator.current.fields["kota/kabupaten"] = true;
    }
    if (simpleValidator.current.allValid()) {
      if (!umum && !tuna_daksa && !tuna_netra && !tuna_rungu) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Disabilitas tidak boleh kosong !",
        });
        return;
      }
      const data = {
        program_dts: program,
        ketentuan_peserta: ketentuan,
        name,
        level_pelatihan: level.label,
        akademi_id: academy.value,
        tema_id: theme.value,
        logoFile,
        logo: logoBase,
        thumbnailFile,
        thumbnail: thumbnailBase,
        silabusFile,
        silabus: silabusBase,
        metode_pelaksanaan: metodeImplementation,
        penyelenggara: organizer.label,
        mitra: mitra ? mitra.value.toString() || mitra.id.toString() : "",
        pendaftaran_mulai: moment(startDateRegistration).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        pendaftaran_selesai: moment(endDateRegistration).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        pelatihan_mulai: moment(startDateTraining).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        pelatihan_selesai: moment(endDateTraining).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        deskripsi: description,
        kuota_pendaftar: parseInt(targetKuotaRegister),
        kuota_peserta: parseInt(targetKuotaUser),
        status_kuota: statusKuota,
        alur_pendaftaran: plotRegistration,
        sertifikasi: sertification,
        lpj_peserta: lpjUser,
        zonasi: zonasi.label,
        batch: batch.value.toString(),
        metode_pelatihan: metodeTraining,
        alamat: address,
        provinsi: province !== "" ? province.label.toString() : "",
        kabupaten: city !== "" ? city.label.toString() : "",
        umum,
        tuna_netra,
        tuna_rungu,
        tuna_daksa,
        pelatian_id: parseInt(router.query.id),
      };
      // dispatch(getEditTrainingStep2(router.query.id, token));
      dispatch(updateTrainingStep1(data, token, token_permission));
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
    <PageWrapper>
      <StepInputPelatihan
        step={1}
        title1="Edit Pelatihan"
        title2="Edit Form Pendaftaran"
        title3="Edit Form Komitmen"
      />
      <div className="col-lg-12 order-1 px-0">
        <div className="col-lg-12 order-1 px-0">
          {loading && <LoadingPage loading={loading} />}
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-body py-4">
              <form onSubmit={submitHandler}>
                <h3 className="font-weight-bolder pb-5 pt-4">Data Pelatihan</h3>

                <div className="form-group row mb-4">
                  <label className="col-form-label font-weight-bold col-sm-2">
                    Program DTS
                  </label>
                  <div className="col-sm-10 my-auto">
                    <div className="form-check form-check-inline">
                      <input
                        disabled
                        type="radio"
                        name="program"
                        className="form-check-input"
                        value="1"
                        checked={program === "1"}
                        onClick={(e) => {
                          setProgram("1");
                        }}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("program dts")
                        }
                      />
                      <label className="form-check-label">Ya</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        disabled
                        type="radio"
                        name="program"
                        value="0"
                        checked={program === "0"}
                        onClick={() => {
                          setProgram("0");
                        }}
                        className="form-check-input"
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("program dts")
                        }
                      />
                      <label className="form-check-label">Tidak</label>
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
                      options={optionsLevelPelatihan}
                      defaultValue={level}
                      onChange={(e) =>
                        setLevel({ value: e?.value, label: e?.label })
                      }
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "level pelatihan"
                        )
                      }
                    />
                  </div>
                  {simpleValidator.current.message(
                    "level pelatihan",
                    level,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>

                <div className="form-group mb-4">
                  <label className="col-form-label font-weight-bold">
                    Akademi
                  </label>
                  <div className="position-relative" style={{ zIndex: "5" }}>
                    <Select
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
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("akademi")
                      }
                    />
                  </div>
                  {simpleValidator.current.message(
                    "akademi",
                    academy,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>

                <div className="form-group mb-4">
                  <label className="col-form-label font-weight-bold">
                    Tema
                  </label>
                  <div className="position-relative" style={{ zIndex: "4" }}>
                    <Select
                      placeholder="Silahkan Pilih Tema"
                      options={drowpdownTemabyAkademi.data.data}
                      defaultValue={theme}
                      value={theme}
                      onChange={(e) =>
                        setTheme({ value: e?.value, label: e?.label })
                      }
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("tema")
                      }
                    />
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
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            "logo reference"
                          )
                        }
                        id="logoReference"
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {logoName.includes("logo")
                          ? logoName.split("/")[2]
                          : logoName}
                      </label>
                      <label style={{ marginTop: "15px" }}>
                        {simpleValidator.current.message(
                          "logo reference",
                          logoFile,
                          "",
                          { className: "text-danger" }
                        )}
                      </label>
                    </div>
                    <button
                      className="btn btn-link-action bg-danger text-white ml-3"
                      type="button"
                      onClick={() => onDeleteHandler("LOGO")}
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
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("thumbnail")
                        }
                        id="uploadThumbnail"
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {thumbnailName.includes("thumbnail")
                          ? thumbnailName.split("/")[2]
                          : thumbnailName}
                      </label>
                      <label style={{ marginTop: "15px" }}>
                        {simpleValidator.current.message(
                          "thumbnail",
                          thumbnailFile,
                          "",
                          { className: "text-danger" }
                        )}
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
                          simpleValidator.current.showMessageFor(
                            "upload silabus"
                          )
                        }
                        id="uploadSilabus"
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {silabusName.includes("silabus")
                          ? silabusName.split("/")[2]
                          : silabusName}
                      </label>
                      <label style={{ marginTop: "15px" }}></label>
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
                        type="radio"
                        name="metode"
                        value="Swakelola"
                        checked={metodeImplementation === "Swakelola"}
                        onClick={() => setMetodeImplementation("Swakelola")}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            "metode pelaksanaan"
                          )
                        }
                        className="form-check-input"
                      />
                      <label className="form-check-label">Swakelola</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="metode"
                        className="form-check-input"
                        value="Mitra"
                        checked={metodeImplementation === "Mitra"}
                        onClick={() => setMetodeImplementation("Mitra")}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            "metode pelaksanaan"
                          )
                        }
                      />
                      <label className="form-check-label">Mitra</label>
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
                    organizer,
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
                    options={optionsMitra}
                    defaultValue={mitra}
                    onChange={(e) =>
                      setMitra({ value: e?.value, label: e?.label })
                    }
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("mitra")
                    }
                  />
                  {simpleValidator.current.message(
                    "mitra",
                    mitra,
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
                    <DatePicker
                      selected={startDateRegistration}
                      value={startDateRegistration}
                      onChange={(date) => setStartDateRegistration(date)}
                      showTimeSelect
                      minDate={today}
                      locale="pt-BR"
                      timeFormat="HH:mm"
                      dateFormat="d MMMM yyyy - HH:mm"
                      className="form-control w-100 d-block"
                      placeholderText="Silahkan Pilih Tanggal Dari"
                    />
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
                    <DatePicker
                      selected={
                        startDateRegistration > endDateRegistration
                          ? ""
                          : endDateRegistration
                      }
                      value={
                        startDateRegistration > endDateRegistration
                          ? ""
                          : endDateRegistration
                      }
                      onChange={(date) => setEndDateRegistration(date)}
                      minDate={startDateRegistration}
                      showTimeSelect
                      className="form-control w-100 d-block"
                      locale="pt-BR"
                      timeFormat="HH:mm"
                      dateFormat="d MMMM yyyy - HH:mm"
                      placeholderText="Silahkan Pilih Tanggal Sampai"
                    />
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
                    <DatePicker
                      selected={startDateTraining}
                      onChange={(date) => setStartDateTraining(date)}
                      minDate={endDateRegistration}
                      showTimeSelect
                      value={startDateTraining}
                      className="form-control w-100 d-block"
                      locale="pt-BR"
                      timeFormat="HH:mm"
                      dateFormat="d MMMM yyyy - HH:mm"
                      placeholderText="Silahkan Pilih Tanggal Dari"
                    />
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
                    <DatePicker
                      onChange={(date) => setEndDateTraining(date)}
                      minDate={startDateTraining}
                      selected={
                        startDateTraining > endDateTraining
                          ? ""
                          : endDateTraining
                      }
                      value={
                        startDateTraining > endDateTraining
                          ? ""
                          : endDateTraining
                      }
                      showTimeSelect
                      className="form-control w-100 d-block"
                      locale="pt-BR"
                      timeFormat="HH:mm"
                      dateFormat="d MMMM yyyy - HH:mm"
                      placeholderText="Silahkan Pilih Tanggal Sampai"
                    />
                    {simpleValidator.current.message(
                      "tanggal sampai",
                      endDateTraining,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label className="col-form-label font-weight-bold">
                    Deskripsi
                  </label>
                  <div className="ckeditor">
                    {editorLoaded ? (
                      // <CKEditor
                      //   editor={ClassicEditor}
                      //   data={description}
                      //   onReady={(editor) => {
                      //     // You can store the "editor" and use when it is needed.
                      //   }}
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
                    <input
                      type="number"
                      value={targetKuotaRegister}
                      onChange={(e) => setTargetKuotaRegister(e.target.value)}
                      className="form-control"
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "kuota target pendaftar"
                        )
                      }
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
                      type="number"
                      value={targetKuotaUser}
                      onChange={(e) => setTargetKuotaUser(e.target.value)}
                      className="form-control"
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "kuota target peserta"
                        )
                      }
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
                      <label className="form-check-label">Available</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
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
                      <label className="form-check-label">Full</label>
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
                        type="radio"
                        name="plotRegistration"
                        disabled
                        className="form-check-input"
                        value="Administrasi - Test Substansi"
                        checked={
                          plotRegistration === "Administrasi - Test Substansi"
                        }
                        onClick={() =>
                          setPlotRegistration("Administrasi - Test Substansi")
                        }
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            "alur pendaftaran"
                          )
                        }
                      />
                      <label className="form-check-label">
                        Administrasi - Test Substansi
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="plotRegistration"
                        disabled
                        className="form-check-input"
                        value="Tes Substansi - Administrasi"
                        checked={
                          plotRegistration === "Tes Substansi - Administrasi"
                        }
                        onClick={() =>
                          setPlotRegistration("Tes Substansi - Administrasi")
                        }
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            "alur pendaftaran"
                          )
                        }
                      />
                      <label className="form-check-label">
                        Tes Substansi - Administrasi
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="plotRegistration"
                        disabled
                        className="form-check-input"
                        value="Administrasi"
                        checked={plotRegistration === "Administrasi"}
                        onClick={() => setPlotRegistration("Administrasi")}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            "alur pendaftaran"
                          )
                        }
                      />
                      <label className="form-check-label">Administrasi</label>
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
                      <label
                        className="form-check-label"
                        htmlFor="sertification1"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="sertification2"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="sertification3"
                      >
                        Industri
                      </label>
                    </div>
                    {/* <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="sertification"
                    className="form-check-input"
                    value="Ya"
                    checked={sertification === "1"}
                    onClick={() => setSertification("1")}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("sertifikasi")
                    }
                  />
                  <label className="form-check-label">Ya</label>
                </div> */}
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="sertification"
                        className="form-check-input"
                        value="Tidak"
                        checked={sertification === "0"}
                        onClick={() => setSertification("0")}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("sertifikasi")
                        }
                      />
                      <label className="form-check-label">Tidak</label>
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
                        type="radio"
                        name="lpjPeserta"
                        className="form-check-input"
                        value="Ya"
                        checked={lpjUser === "1"}
                        onClick={() => setLpjUser("1")}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("lpj peserta")
                        }
                      />
                      <label className="form-check-label">Ya</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="lpjPeserta"
                        className="form-check-input"
                        value="Tidak"
                        checked={lpjUser === "0"}
                        onClick={() => setLpjUser("0")}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("lpj peserta")
                        }
                      />
                      <label className="form-check-label">Tidak</label>
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
                    <label className="col-form-label font-weight-bold">
                      Zonasi
                    </label>
                    <Select
                      options={optionsZonasi}
                      defaultValue={zonasi}
                      onChange={(e) =>
                        setZonasi({ value: e?.value, label: e?.label })
                      }
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("zonasi")
                      }
                    />
                    {simpleValidator.current.message(
                      "zonasi",
                      zonasi,
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <label className="col-form-label font-weight-bold">
                      Batch
                    </label>
                    <Select
                      options={optionBatch}
                      defaultValue={batch}
                      onChange={(e) =>
                        setBatch({ value: e?.value, label: e?.label })
                      }
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("batch")
                      }
                    />
                    {simpleValidator.current.message(
                      "batch",
                      batch,
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
                          simpleValidator.current.showMessageFor(
                            "metode pelatihan"
                          )
                        }
                      />
                      <label className="form-check-label">Offline</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="metodeTraining"
                        className="form-check-input"
                        value="Online"
                        checked={metodeTraining === "Online"}
                        onClick={() => setMetodeTraining("Online")}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            "metode pelatihan"
                          )
                        }
                      />
                      <label className="form-check-label">Online</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="metodeTraining"
                        className="form-check-input"
                        value="Online&Offline"
                        checked={metodeTraining === "Online dan Offline"}
                        onClick={() => {
                          setMetodeTraining("Online dan Offline");
                          setAddress("");
                          setProvince("");
                          setCity("");
                        }}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            "metode pelatihan"
                          )
                        }
                      />
                      <label className="form-check-label">
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
                    <h3 className="font-weight-bolder pt-3">
                      Lokasi Pelatihan
                    </h3>

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
                        metodeTraining !== "Online" ? "required" : "",
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
                          options={optionsProvinsi}
                          defaultValue={province}
                          onChange={(e) => {
                            setProvince({ label: e?.label, value: e?.value });
                            setCity(null);
                            dispatch(dropdownKabupaten(token, e.value));
                          }}
                          onBlur={() =>
                            simpleValidator.current.showMessageFor("provinsi")
                          }
                        />
                        {simpleValidator.current.message(
                          "provinsi",
                          province,
                          metodeTraining !== "Online" ? "required" : "",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <label className="col-form-label font-weight-bold">
                          Kota / Kabupaten
                        </label>
                        <Select
                          ref={(ref) => (selectRefKabupaten = ref)}
                          options={optionsKabupaten}
                          defaultValue={city}
                          value={city}
                          onChange={(e) =>
                            setCity({ value: e?.value, label: e?.label })
                          }
                          onBlur={() =>
                            simpleValidator.current.showMessageFor(
                              "kota/kabupaten"
                            )
                          }
                        />
                        {simpleValidator.current.message(
                          "kota/kabupaten",
                          city,
                          metodeTraining !== "Online" ? "required" : "",
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
                        onChange={(e) => {
                          setUmum(e.target.checked === true ? "1" : "0");
                        }}
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
                        onClick={(e) => {
                          setTunaNetra(e.target.checked === true ? "1" : "0");
                        }}
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
                        onClick={(e) =>
                          setTunaRungu(e.target.checked === true ? "1" : "0")
                        }
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
                        onClick={(e) =>
                          setTunaDaksa(e.target.checked === true ? "1" : "0")
                        }
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
                      onClick={() => router.back()}
                    >
                      Batal
                    </button>
                    <button
                      className="btn btn-primary-rounded-full"
                      type="submit"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditTrainingStep1;
