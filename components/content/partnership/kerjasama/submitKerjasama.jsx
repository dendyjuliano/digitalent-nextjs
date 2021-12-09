import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
import IconCalender from "../../../assets/icon/Calender";

import moment from "moment";
import Cookies from "js-cookie"

const SubmitKerjasama = ({ token }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // pdf file
  // Create new plugin instance
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [viewPDF, setViewPDF] = useState(null);
  const [error, setError] = useState({
    period_date_start: "",
    agreement_number_partner: "",
    agreement_number_kemkominfo: "",
    signing_date: "",
    document: "",
  });

  const router = useRouter();
  const [period_date_start, setPeriod_date_start] = useState("");
  const [agreement_number_partner, setAgreement_number_partner] = useState("");
  const [agreement_number_kemkominfo, setAgreement_number_kemkominfo] =
    useState("");
  const [signing_date, setSigning_date] = useState("");
  const [document, setDocument] = useState("");
  // form data send

  const [NamePDF, setNamePDF] = useState(null);
  // onchange pdf

  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    setDocument(selectedFile);
    setViewPDF("");
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
          setNamePDF(selectedFile.name);
        };
      } else {
        setNamePDF(null);
        setPdfFile(null);
        setPdfFileError("Please selet valid pdf file");
      }
    } else {
      Swal.fire("Gagal", `select your file`, "error");
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (period_date_start === "") {
      setError({
        ...error,
        period_date_start: "Harus isi tanggal priode kerjasama",
      });
    } else if (agreement_number_partner === "") {
      setError({
        ...error,
        agreement_number_partner: "Harus isi nomor perjanjian lembaga",
      });
    } else if (agreement_number_kemkominfo === "") {
      setError({
        ...error,
        agreement_number_kemkominfo: "Harus isi nomor perjanjian kemkominfo",
      });
    } else if (signing_date === "") {
      setError({ ...error, signing_date: "Harus isi tanggal penandatanganan" });
    } else if (document === "") {
      setError({ ...error, document: "Harus unggah file" });
    } else {
      Swal.fire({
        title: "Apakah anda yakin ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          let formData = new FormData();
          formData.append("institution_name", institution_name);
          formData.append("date", date);
          formData.append("title", title);
          formData.append("period", period);
          formData.append("period_unit", periodUnit);
          formData.append("cooperation_category_id", cooperationC_id);

          formData.append("period_date_start", period_date_start);
          formData.append("period_date_end", newDate);
          formData.append("agreement_number_partner", agreement_number_partner);
          formData.append(
            "agreement_number_kemkominfo",
            agreement_number_kemkominfo
          );
          formData.append("signing_date", signing_date);
          formData.append("document", document);
          let parseAllCooperation = AllCooperation;
          let dataee = parseAllCooperation.map((items, i) => {
            return items.cooperation;
          });
          dataee.forEach((item, i) => {
            formData.append(`cooperation_form_content[${i}]`, item);
          });

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal`,
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                  Permission: Cookies.get("token_permission")
                },
              }
            );
            sessionStorage.removeItem("dataBefore");
            router.push({
              pathname: `/partnership/kerjasama/detail-kerjasama`,
              query: { id: data.data.id, success: true },
            });
          } catch (error) {
            Swal.fire("Gagal", `${error.response.data.message}`, "error");
          }
        }
      });
    }
  };

  const [newDate, setNewDate] = useState("");

  const [periodValue, setPeriodValue] = useState("");
  const [periodUnitValue, setPeriodUnitValue] = useState("");

  const checkPeriod = (dateNow) => {
    if (periodUnitValue === "bulan") {
      let futureMonth = moment(dateNow)
        .add(parseInt(periodValue), "M")
        .format("YYYY-MM-DD");

      setNewDate(futureMonth);
    }
    // jika tahun
    else {
      let futureYear = moment(dateNow)
        .add(parseInt(periodValue), "y")
        .format("YYYY-MM-DD");

      setNewDate(futureYear);
    }
  };

  const onChangePeriodeDateStart = (date) => {
    setPeriod_date_start(moment(date).format("YYYY-MM-DD"));
    checkPeriod(moment(date).format("YYYY-MM-DD"));
  };

  const [institution_name, setInstituion_name] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("");
  const [cooperationC_id, setCooperationC_id] = useState("");
  const [AllCooperation, setAllCooperation] = useState("");

  useEffect(() => {
    let datas = JSON.parse(sessionStorage.getItem("dataBefore"));

    setInstituion_name(datas[0].institution_name);
    setDate(datas[0].date);
    setTitle(datas[0].title);
    setPeriod(datas[0].period);
    setPeriodUnit(datas[0].periodUnit);
    setCooperationC_id(datas[0].cooperationC_id);
    setAllCooperation(datas[0].AllCooperation);
    setPeriodValue(datas[0].period);
    setPeriodUnitValue(datas[0].periodUnit);
  }, []);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              Dokumen Kerjasama
            </h3>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode Kerjasama
                </label>
                <div className="row">
                  <div className="col-12 col-xl-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                      <DatePicker
                        onFocus={() =>
                          setError({ ...error, period_date_start: "" })
                        }
                        className="form-search-date form-control cursor-pointer"
                        selected={startDate}
                        onChange={(date) => onChangePeriodeDateStart(date)}
                        selectsStart
                        value={period_date_start}
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="YYYY-MM-DD"
                        placeholderText="Mulai Tanggal"
                        // minDate={moment().toDate()}
                      />
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                    {error.period_date_start ? (
                      <p className="error-text">{error.period_date_start}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-12 col-xl-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-10 mt-xl-2 ">
                      <DatePicker
                        className="form-search-date form-control cursor-pointer"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        disabled
                        selectsEnd
                        value={newDate}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={moment().toDate()}
                        maxDate={addDays(startDate, 20)}
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

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nomor Perjanjian Lembaga
                </label>
                <input
                  onFocus={() =>
                    setError({ ...error, agreement_number_partner: "" })
                  }
                  onChange={(e) => setAgreement_number_partner(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nomor Perjanjian Lembaga"
                />
                {error.agreement_number_partner ? (
                  <p className="error-text">{error.agreement_number_partner}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nomor Perjanjian Kemkominfo
                </label>
                <input
                  onFocus={() =>
                    setError({ ...error, agreement_number_kemkominfo: "" })
                  }
                  onChange={(e) =>
                    setAgreement_number_kemkominfo(e.target.value)
                  }
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nomor Perjanjian Kemkominfo"
                />
                {error.agreement_number_kemkominfo ? (
                  <p className="error-text">
                    {error.agreement_number_kemkominfo}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Tanggal Tanda Tangan
                </label>
                <div className="d-flex align-items-center position-relative datepicker-w w-100" style={{zIndex: "10"}}>
                  <DatePicker
                    className="form-search-date form-control-sm form-control cursor-pointer"
                    selected={endDate}
                    onFocus={() => setError({ ...error, signing_date: "" })}
                    onChange={(date) =>
                      setSigning_date(moment(date).format("YYYY-MM-DD"))
                    }
                    value={signing_date}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    // minDate={moment().toDate()}
                    maxDate={addDays(startDate, 20)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Pilih Tanggal"
                  />
                  <IconCalender
                    className="right-center-absolute"
                    style={{ right: "10px" }}
                  />
                </div>
                {error.signing_date ? (
                  <p className="error-text">{error.signing_date}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Unggah Dokumen Kerjasama
                </label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      onFocus={() => setError({ ...error, document: "" })}
                      type="file"
                      name="gambar"
                      className="custom-file-input cursor-pointer"
                      id="inputGroupFile04"
                      accept=".pdf"
                      onChange={handlePdfFileChange}
                    />
                    <label
                      className="custom-file-label text-muted"
                      htmlFor="inputGroupFile04"
                    >
                      {NamePDF ? NamePDF : "Belum ada file"}
                    </label>
                  </div>
                </div>
                {error.document ? (
                  <p className="error-text">{error.document}</p>
                ) : (
                  ""
                )}
              </div>
              {pdfFileError && <div>{pdfFileError}</div>}

              <div
                className={`${
                  viewPDF ? "pdf-container" : "pdf-container d-none"
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

              <div className="form-group mt-6">
                <div className="flex-column flex-sm-row d-flex justify-content-end">
                  <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5 d-flex justify-content-center">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white d-flex justify-content-center"
                  >
                    Kirim
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

export default SubmitKerjasama;
