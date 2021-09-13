import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchListSelectCooperation,
  cancelChangeCategory,
  cancelChangeNamaLembaga,
  changeCooperationSelectByID,
  fetchListCooperationSelectById,
  fetchListSelectMitra,
  getEmail,
  setNameLembaga,
  fetchDataEmail,
} from "../../../../redux/actions/partnership/managementCooporation.actions";
import IconCalender from "../../../assets/icon/Calender";
import moment from "moment";

import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDokumentKerjasamaById = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { idDetail } = router.query;

  const allMK = useSelector((state) => state.allMK);
  //
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //
  // state onchange form data
  let singleproduct = useSelector((state) => state.allMK);
  // console.log("singleproduct",singleproduct)
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
    } else {
      console.log("select your file");
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

  const changeSetCooperationC_id = (value) => {
    setCooperationC_id(value);
    dispatch(changeCooperationSelectByID(value));
  };

  const setDataSingle = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/${id}`
      );
      setIsntitusiName(data.data.institution_name);
      setTitle(data.data.title);
      setDate(data.data.submission_date);
      setCooperationID(data.data.cooperation_category);
      setPeriod(data.data.period);
      setPeriodUnit(data.data.period_unit);
      setPeriodDateStart(data.data.period_date_start);
      setPeriodDateEnd(data.data.period_date_end);
      setAggrementNumber(data.data.agreement_number_partner);
      setAggrementNumberInfo(data.data.agreement_number_kemkominfo);
      setSigninDate(data.data.signing_date);
      setDocument(data.data.document_file);
      setEmail(data.data.email);
    } catch (error) {
      console.log("action getSIngle gagal", error);
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
    // console.log("object")
    let dataCoopertaion = { ...cooperationID };
    dataCoopertaion.data_content[i].form_content = event.target.value;
    setCooperationID(dataCoopertaion);
  };

  useEffect(() => {
    setDataSingle(router.query.id);
    dispatch(cancelChangeCategory());
    dispatch(cancelChangeNamaLembaga());
  }, [dispatch, router.query.id]);
  useEffect(() => {
    dispatch(fetchListCooperationSelectById(cooperationC_id));
  }, [dispatch, allMK.idCooporationSelect, cooperationC_id]);
  useEffect(() => {
    dispatch(fetchDataEmail());
  }, [dispatch, allMK.institution_name, allMK.stateListMitra]);
  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Tanggal
                </label>
                <input
                  readOnly
                  type="date"
                  required
                  value={date}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Judul kerjasama
                </label>
                <input
                  required
                  readOnly
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Judul Kerjasama"
                />
              </div>

              {/* start list kategory */}
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Kategori kerjasama
                </label>
                <select
                  name=""
                  id=""
                  className="form-control"
                  disabled
                  value={cooperationID.id}
                >
                  <option>{cooperationID.name}</option>
                </select>
              </div>
              {/* end list kategory */}
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <input
                      required
                      readOnly
                      type="number"
                      className="form-control mt-2"
                      onChange={(e) => setPeriod(e.target.value)}
                      value={period}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    {/* {periodUnit === "bulan" ? (
                        <select
                          className="form-control"
                          onChange={(e) => setPeriodUnit(e.target.value)}
                        >
                          <option value="bulan">Bulan</option>
                          <option value="tahun">Tahun</option>
                        </select>
                      ) : (
                        <select
                          className="form-control"
                          onChange={(e) => setPeriodUnit(e.target.value)}
                        >
                          <option value="tahun">Tahun</option>
                          <option value="bulan">Bulan</option>
                        </select>
                      )} */}
                    <div className="form-control mt-2">Tahun</div>
                    {/* <input
                      required
                        type="text"
                        className="form-control"
                        value={periodUnit}
                      /> */}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode Kerjasama
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                      <DatePicker
                        readOnly
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        // selected={periodDateStart}
                        onChange={(date) =>
                          setPeriodDateStart(moment(date).format("YYYY-MM-DD"))
                        }
                        value={periodDateStart}
                        // selectsEnd
                        // startDate={startDate}
                        // endDate={endDate}
                        // minDate={startDate}
                        minDate={moment().toDate()}
                        // maxDate={addDays(startDate, 20)}
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
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                      <DatePicker
                        readOnly
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        // selected={periodDateStart}
                        onChange={(date) =>
                          setPeriodDateEnd(moment(date).format("YYYY-MM-DD"))
                        }
                        value={periodDateEnd}
                        // selectsEnd
                        // startDate={startDate}
                        // endDate={endDate}
                        // minDate={startDate}
                        minDate={moment().toDate()}
                        // maxDate={addDays(startDate, 20)}
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
                  Nama Lembaga
                </label>
                <div aria-readonly disabled className="form-control">
                  {isntitusiName}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Email
                </label>
                <p className="form-control">{email}</p>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nomor Perjanjian Lembaga
                </label>
                {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nomor Perjanjian Lembaga"
                  /> */}
                <input
                  required
                  readOnly
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
                {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nomor Perjanjian Kemkominfo"
                  /> */}
                <input
                  readOnly
                  required
                  type="text"
                  onChange={(e) => setAggrementNumberInfo(e.target.value)}
                  value={aggrementNumberInfo}
                  className="form-control"
                />
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Tanggal Penandatanganan
                    </label>
                    {/* <input
                        required
                        onChange={(e) => setSigninDate(e.target.value)}
                        value={signinDate}
                        type="date"
                        className="form-control form-control-sm"
                      /> */}

                    <div className="d-flex align-items-center position-relative datepicker-w">
                      <DatePicker
                        readOnly
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        // selected={periodDateStart}
                        onChange={(date) =>
                          setSigninDate(moment(date).format("YYYY-MM-DD"))
                        }
                        value={signinDate}
                        // selectsEnd
                        // startDate={startDate}
                        // endDate={endDate}
                        // minDate={startDate}
                        minDate={moment().toDate()}
                        // maxDate={addDays(startDate, 20)}
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
                <div className="col-12 col-sm-6">
                  {/* start dokument */}
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Dokumen Kerjasama
                    </label>
                    <div className="position-relative overflow-hidden w-100 ">
                      
                    <input
                      // id="kt_datatable_search_query"
                      disabled
                      type="text"
                      className="form-control"
                      placeholder={`${document}`}
                      // onChange={(e) =>
                      //   handleChangeValueSearch(e.target.value)
                      // }
                    />
                    <button
                      type="button"
                      className="btn right-center-absolute"
                      style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                        backgroundColor: "#D7E1EA",
                        color: "#6C6C6C",
                      }}
                      onClick={() =>
                        window.open(
                          `https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/partnership/files/document_cooperations/${document}`
                        )
                      }
                    >
                      Buka File
                    </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* action show and upload */}
              {/* start action show and upload */}

              {/* <div className="row">
                  <div className="col-12 col-sm-3">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => showDocument()}
                    >
                      {viewPDF || showDokument
                        ? "Tutup dokumen"
                        : "Lihat dokumen"}
                    </button>
                  </div>
                </div> */}

              {/* {changeDokumen && !viewPDF ? (
                  <div className="input-group mt-3">
                    <div className="custom-file">
                      <input
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
                )} */}

              {/* {pdfFileError && (
                  <div
                    className="mt-3"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {pdfFileError}
                  </div>
                )} */}

              {/* <div
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
              </div> */}
              {/* {showDokument ? (
                <iframe
                  className="my-4 border"
                  src={`http://dts-partnership-dev.majapahit.id/storage/partnership/files/document_cooperations/${document}`}
                  frameBorder="0"
                  scrolling="auto"
                  height={"500px"}
                  width="100%"
                ></iframe>
              ) : (
                ""
              )} */}
              {/* start action show and upload */}

              {/* end dokument */}

              {/* start first loop */}

              {cooperationID === ""
                ? ""
                : cooperationID.data_content.map((items, i) => {
                    return (
                      <div
                        key={i}
                        className={`form-group ${
                          allMK.stateListKerjaSama.length !== 0 ? "d-none" : ""
                        }`}
                      >
                        <label htmlFor="staticEmail" className="col-form-label">
                          {items.cooperation_form}
                        </label>
                        <textarea
                          readOnly
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
                          className={`form-group row ${
                            allMK.stateListKerjaSama.length === 0
                              ? "d-none"
                              : ""
                          }`}
                        >
                          <label
                            htmlFor="staticEmail"
                            className="col-sm-2 col-form-label"
                          >
                            {items.cooperation_form}
                          </label>
                          <div className="col-sm-10">
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
                        </div>
                      );
                    }
                  )}
              {/* end looping second */}
              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link
                    href={`/partnership/mitra/detail/${idDetail}`}
                    className="mr-2"
                  >
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

export default EditDokumentKerjasamaById;