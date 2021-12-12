import React, { useState, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchListCooperationSelect,
  cancelChangeCategory,
  cancelChangeNamaLembaga,
  changeCooperationSelectByID,
  fetchListCooperationSelectById,
  fetchDataEmail,
} from "../../../../redux/actions/partnership/managementCooporation.actions";
import IconCalender from "../../../assets/icon/Calender";
import moment from "moment";

import Swal from "sweetalert2";

const EditDokumentKerjasama = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const allMK = useSelector((state) => state.allMK);
  // state onchange form data
  const [isntitusiName, setIsntitusiName] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [cooperationID, setCooperationID] = useState("");
  const [cooperationC_id, setCooperationC_id] = useState("");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("tahun");
  const [periodDateStart, setPeriodDateStart] = useState("");
  const [periodDateEnd, setPeriodDateEnd] = useState("");
  const [aggrementNumber, setAggrementNumber] = useState("");
  const [aggrementNumberInfo, setAggrementNumberInfo] = useState("");
  const [signinDate, setSigninDate] = useState("");
  const [email, setEmail] = useState("");

  // pdf from api
  const [document, setDocument] = useState("");
  const [showDokument, setShowDokument] = useState(null);
  // pdf from local upload
  const [viewPDF, setViewPDF] = useState(null);
  const [documentLocal, setDocumentLocal] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [NamePDF, setNamePDF] = useState(null);
  // change state
  const [changeDokumen, setChangeDokumen] = useState(false);

  // onchange pdf

  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    setDocumentLocal(selectedFile);
    setViewPDF("");
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setNamePDF(selectedFile.name);
          setPdfFileError("");
        };
      } else {
        setNamePDF(null);
        setPdfFile(null);
        setPdfFileError("Please selet valid pdf file !!");
      }
    }
  };

  // show document
  const showDocument = () => {
    if (changeDokumen) {
      if (!viewPDF) {
        setViewPDF(pdfFile);
      } else {
        setViewPDF(null);
      }
    } else {
      setShowDokument(showDokument ? false : true);
    }
  };
  // change document batal
  const setDocumentChange = () => {
    setShowDokument(false);
    setChangeDokumen(changeDokumen ? false : true);
    setViewPDF(null);
    setPdfFile(null);
    setNamePDF(null);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak",
      confirmButtonText: "Ya",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        let formData = new FormData();
        const method = "PUT";
        formData.append("_method", method);
        formData.append("title", title);
        formData.append("date", date);
        formData.append("period", period);
        formData.append("period_unit", periodUnit);

        if (document !== "") {
          formData.append("document", documentLocal);
        }

        formData.append("period_date_start", periodDateStart);
        formData.append("period_date_end", periodDateEnd);
        formData.append("agreement_number_partner", aggrementNumber);
        formData.append("agreement_number_kemkominfo", aggrementNumberInfo);
        formData.append("signing_date", signinDate);

        if (AllCooperation === "") {
          // start data default
          formData.append("cooperation_category_id", cooperationID.id);
          let dataee = cooperationID.data_content.map((items, i) => {
            return items.form_content;
          });
          dataee.forEach((item, i) => {
            formData.append(`cooperation_form_content[${i}]`, item);
          });
          // end data default
        } else {
          // start jika tidak default
          formData.append("cooperation_category_id", cooperationC_id);
          let ez = AllCooperation.map((items, i) => {
            return items.cooperation;
          });
          ez.forEach((item, i) => {
            formData.append(`cooperation_form_content[${i}]`, item);
          });
          // end jika tidak default
        }

        try {
          let { data } = await axios.post(
            `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/${router.query.id}`,
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          router.push({
            pathname: "/partnership/kerjasama/",
            query: { update: true },
          });
        } catch (error) {
          Swal.fire("Gagal", `${error.response.data.message}`, "error");
        }
      }
    });
  };

  const changeSetCooperationC_id = (value) => {
    setCooperationC_id(value);
    dispatch(changeCooperationSelectByID(value));
  };

  const onChangePeriodeDateStart = (date) => {
    setPeriodDateStart(moment(date).format("YYYY-MM-DD"));
    checkPeriod(moment(date).format("YYYY-MM-DD"));
  };

  const checkPeriod = (dateNow) => {
    if (periodUnit === "bulan") {
      let futureMonth = moment(dateNow)
        .add(parseInt(period), "M")
        .format("YYYY-MM-DD");
      setPeriodDateEnd(futureMonth);
    }
    // jika tahun
    else {
      let futureYear = moment(dateNow)
        .add(parseInt(period), "y")
        .format("YYYY-MM-DD");
      setPeriodDateEnd(futureYear);
    }
  };
  const [AllCooperation, setAllCooperation] = useState("");
  const changeFormCooporation = (index, e) => {
    let dataaa = [...allMK.singleCooporationSelect.data.option];
    dataaa[index].cooperation = e.target.value;
    setAllCooperation(dataaa);
  };

  // onchange textarea default cooperationID
  const changeDataContentDefault = (event, i) => {
    let dataCoopertaion = { ...cooperationID };
    dataCoopertaion.data_content[i].form_content = event.target.value;
    setCooperationID(dataCoopertaion);
  };

  useEffect(() => {
    async function setDataSingle(id) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setIsntitusiName(data.data.institution_name);
        setTitle(data.data.title);
        setDate(data.data.submission_date);
        setCooperationID(data.data.cooperation_category);
        //
        setPeriod(data.data.period);
        setPeriodUnit(data.data.period_unit);
        //
        setPeriodDateStart(data.data.period_date_start);
        setPeriodDateEnd(data.data.period_date_end);
        //
        setAggrementNumber(data.data.agreement_number_partner);
        setAggrementNumberInfo(data.data.agreement_number_kemkominfo);
        setSigninDate(data.data.signing_date);
        setDocument(data.data.document_file);
        setEmail(data.data.email);
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data.message}`, "error");
      }
    }
    setDataSingle(router.query.id);
    dispatch(cancelChangeCategory());
    dispatch(cancelChangeNamaLembaga());
  }, [dispatch, router.query.id, token]);
  useEffect(() => {
    dispatch(fetchListCooperationSelectById(token, cooperationC_id));
  }, [dispatch, allMK.idCooporationSelect, cooperationC_id, token]);
  useEffect(() => {
    dispatch(fetchDataEmail(token));
  }, [dispatch, allMK.institution_name, allMK.stateListMitra, token]);

  useEffect(() => {
    function periodCheck(date) {
      setPeriodDateStart(moment(periodDateStart).format("YYYY-MM-DD"));
      if (periodUnit === "bulan") {
        let futureMonth = moment(periodDateStart)
          .add(parseInt(period), "M")
          .format("YYYY-MM-DD");
        setPeriodDateEnd(futureMonth);
      }
      // jika tahun
      else {
        let futureYear = moment(periodDateStart)
          .add(parseInt(period), "y")
          .format("YYYY-MM-DD");
        setPeriodDateEnd(futureYear);
      }
    }
    periodCheck();
  }, [period, date, periodUnit, periodDateStart]);

  const [error, setError] = useState({
    institution_name: "",
    date: "",
    title: "",
    period: "",
    periodUnit: "",
    cooperationC_id: "",
    AllCooperation: "",
  });

  const onChangePeriod = (e) => {
    setError({ ...error, period: "" });
    const regex = new RegExp(/[^0-9]/, "g");
    const val = e.target.value;
    
    if (val.match(regex)) {
      setError({ ...error, period: "Masukkan angka" });
      setPeriod("");
    }else if(e.target.value.toString().charAt(0) === "0"){
      setError({ ...error, period: "Lama Periode tidak boleh kosong atau angka nol" });
      setPeriod("");
    }else if(e.target.value.length > 5){
      setError({ ...error, period: "Lama Periode tidak boleh lebih 5 karakter" });
    }
    else {
      setPeriod(e.target.value);
    }
  };
  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark mb-0 titles-1">
              Ubah Kerjasama
            </h3>
          </div>

          <div className="card-body pt-0">
            <form>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Tanggal
                </label>

                <input
                  disabled
                  type="text"
                  value={date}
                  name="text_input"
                  className="form-control mb-3 mb-lg-0 border-0"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Judul kerjasama
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Judul Kerjasama"
                />
              </div>

              {/* start list kategory */}
              {allMK.cooperationActiveSelect.length === 0 ? (
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Kategori kerjasama
                  </label>
                  <div className="row">
                    <div className="col-12 col-sm-9">
                      <select
                        name=""
                        id=""
                        className="form-control mt-2"
                        disabled
                        value={cooperationID.id}
                      >
                        <option>{cooperationID.name}</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white w-100 d-flex justify-content-center mt-2"
                        onClick={() =>
                          dispatch(fetchListCooperationSelect(token))
                        }
                      >
                        Ubah Kategory
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Kategori kerjasama
                  </label>
                  <div className="row">
                    <div className="col-12 col-sm-9">
                      <select
                        required
                        onChange={(e) =>
                          changeSetCooperationC_id(e.target.value)
                        }
                        name=""
                        id=""
                        className="form-control mt-2"
                      >
                        <option value="">Pilih Kategory Kerjasama</option>
                        {allMK.cooperationActiveSelect.length === 0
                          ? ""
                          : allMK.cooperationActiveSelect.data.map(
                              (items, i) => {
                                return (
                                  <option key={i} value={items.id}>
                                    {items.cooperation_categories}
                                  </option>
                                );
                              }
                            )}
                      </select>
                    </div>
                    <div className="col-12 col-sm-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white w-100 d-flex justify-content-center mt-2"
                        onClick={() => dispatch(cancelChangeCategory())}
                      >
                        Batal Ubah Kategory
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* end list kategory */}
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <input
                      required
                      onFocus={() => setError({ ...error, period: "" })}
                      type="text"
                      maxLength="6"
                      className="form-control"
                      onChange={(e) => onChangePeriod(e)}
                      value={period}
                    />
                  </div>
                  
                  <div className="col-12 col-sm-6">
                    <input
                      disabled
                      type="text"
                      name="text_input"
                      className="form-control mb-3 mb-lg-0"
                      placeholder="Tahun"
                    />
                  </div>
                </div>
              </div>
              {error.period ? (
                  <p className="error-text mb-4 mt-0">{error.period}</p>
                ) : (
                  ""
                )} 
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode Kerjasama
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                      <DatePicker
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        onChange={(date) => onChangePeriodeDateStart(date)}
                        value={periodDateStart}
                        // minDate={moment().toDate()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      />
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2 disabled-form">
                      <DatePicker
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        disabled
                        onChange={(date) =>
                          setPeriodDateEnd(moment(date).format("YYYY-MM-DD"))
                        }
                        value={periodDateEnd}
                        minDate={moment().toDate()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      />
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Lembaga
                    </label>
                    <input
                      disabled
                      type="text"
                      value={isntitusiName}
                      name="text_input"
                      className="form-control mb-3 mb-lg-0 border-0"
                      placeholder="Masukan Alamat E-mail"
                      style={{ backgroundColor: "transparent" }}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Email
                    </label>
                    <input
                      disabled
                      type="text"
                      value={email}
                      name="text_input"
                      className="form-control mb-3 mb-lg-0 border-0"
                      placeholder="Masukan Alamat E-mail"
                      style={{ backgroundColor: "transparent" }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nomor Perjanjian Lembaga
                </label>
                <input
                  required
                  onChange={(e) => setAggrementNumber(e.target.value)}
                  type="text"
                  value={aggrementNumber}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nomor Perjanjian KemKominfo
                </label>
                <input
                  required
                  type="text"
                  onChange={(e) => setAggrementNumberInfo(e.target.value)}
                  value={aggrementNumberInfo}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Tanggal Penandatanganan
                </label>
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex align-items-center position-relative datepicker-w">
                      <DatePicker
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        onChange={(date) =>
                          setSigninDate(moment(date).format("YYYY-MM-DD"))
                        }
                        value={signinDate}
                        minDate={moment().toDate()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Tanggal"
                      />
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* start dokument */}
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Dokumen Kerjasama
                </label>
                {/* action show and upload */}
                {/* start action show and upload */}
                <div className="row">
                  <div className="col-sm-12">
                    <div className="d-flex flex-wrap align-items-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white mr-3 mt-2"
                        onClick={() => showDocument()}
                      >
                        {viewPDF || showDokument
                          ? "Tutup dokumen"
                          : "Lihat dokumen"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white mr-3 mt-2"
                        onClick={() => setDocumentChange()}
                      >
                        {!changeDokumen ? "Ubah dokumen" : "Batal Ubah"}
                      </button>
                    </div>

                    {changeDokumen && !viewPDF ? (
                      <div className="input-group mt-3">
                        <div className="custom-file">
                          <input
                            accept=".pdf"
                            type="file"
                            name="gambar"
                            className="custom-file-input cursor-pointer"
                            id="inputGroupFile04"
                            required
                            onChange={handlePdfFileChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile04"
                          >
                            {NamePDF ? NamePDF : "Tambah dokumen baru"}
                          </label>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {pdfFileError && (
                      <div
                        className="mt-3"
                        style={{ color: "red", fontWeight: "bold" }}
                      >
                        {pdfFileError}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`${
                    viewPDF ? "pdf-container w-100" : "pdf-container d-none"
                  }`}
                >
                  <iframe
                    src={viewPDF}
                    frameBorder="0"
                    scrolling="auto"
                    height={viewPDF ? "500px" : ""}
                    width="100%"
                  ></iframe>
                  {!viewPDF && <>No pdf file selected </>}
                </div>
                {showDokument ? (
                  <iframe
                    className="my-4 border"
                    src={`${process.env.END_POINT_API_IMAGE_PARTNERSHIP}${document}`}
                    frameBorder="0"
                    scrolling="auto"
                    height={"500px"}
                    width="100%"
                  ></iframe>
                ) : (
                  ""
                )}
                {/* start action show and upload */}
              </div>
              {/* end dokument */}

              {/* start first loop */}

              {cooperationID === ""
                ? ""
                : cooperationID.data_content.map((items, i) => {
                    return (
                      <div
                        key={i}
                        className={`form-group ${
                          allMK.cooperationActiveSelect.length !== 0
                            ? "d-none"
                            : ""
                        }`}
                      >
                        <label htmlFor="staticEmail" className="col-form-label">
                          {items.cooperation_form}
                        </label>
                        <textarea
                          onChange={(e) => changeDataContentDefault(e, i)}
                          value={items.form_content}
                          name=""
                          id={i}
                          cols="30"
                          rows="5"
                          className="form-control"
                          placeholder="Masukkan Tujuan Kerjasama disini"
                        ></textarea>
                      </div>
                    );
                  })}
              {/* loop first end loop*/}

              {/* looping second */}
              {allMK.singleCooporationSelect.length === 0
                ? ""
                : allMK.singleCooporationSelect.data.option.map(
                    (items, index) => {
                      return (
                        <div
                          key={index}
                          className={`form-group ${
                            allMK.cooperationActiveSelect.length === 0
                              ? "d-none"
                              : ""
                          }`}
                        >
                          <label
                            htmlFor="staticEmail"
                            className="col-form-label"
                          >
                            {items.cooperation_form}
                          </label>
                          <textarea
                            required
                            onChange={(e) => changeFormCooporation(index, e)}
                            name="cooperation"
                            id={index + 1}
                            cols="30"
                            rows="5"
                            className="form-control"
                            placeholder="Masukan Tujuan Kerjasama"
                          ></textarea>
                        </div>
                      );
                    }
                  )}

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={() => handleSubmit()}
                  >
                    Ubah
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditDokumentKerjasama;
