import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
  postViaFilter,
  postViaTemplate,
} from "../../../../../redux/actions/site-management/settings/pelatihan.actions";

export default function SUBM(props) {
  let dispatch = useDispatch();

  const [via, setVia] = useState("template");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [academy, setAcademy] = useState("");
  const [theme, setTheme] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [training, setTraining] = useState("");
  const [profileStatus, setProfileStatus] = useState("");
  const [selectionStatus, setSelectionStatus] = useState("");
  const [
    participantSelectionStatusUpdate,
    setParticipantSelectionStatusUpdate,
  ] = useState(0);
  const [status, setStatus] = useState("");
  const [broadcastEmailSendNotification, setBroadcastEmailSendNotification] =
    useState(0);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [file, setFile] = useState("");
  const [link, setLink] = useState("");

  const[listYear, setListYear] = useState([])
  const[listAcademy, setListAcademy] = useState([])
  const[listTheme, setListTheme] = useState([])
  const[listOrganizer, setListOrganizer] = useState([])
  const[listTraining, setListTraining] = useState([])
  const[listProfileStatus, setListProfileStatus] = useState([])
  const[listSelectionStatus, setListSelectionStatus] = useState([])

  const handleSubmit = async (e) => {

    if (via === "filter") {
      dispatch(
        postViaFilter(
          props.token,
          title,
          year,
          academy,
          theme,
          organizer,
          training,
          profileStatus,
          selectionStatus,
          participantSelectionStatusUpdate ||
            participantSelectionStatusUpdate === 1
            ? "1"
            : "0",
          status,
          broadcastEmailSendNotification || broadcastEmailSendNotification === 1
            ? "1"
            : "0",
          emailSubject,
          emailContent,
          `via ${via}`
        )
      );
    } else {
      dispatch(postViaTemplate(props.token,title, file, participantSelectionStatusUpdate ||
        participantSelectionStatusUpdate === 1
        ? "1"
        : "0",
      status,
      broadcastEmailSendNotification || broadcastEmailSendNotification === 1
        ? "1"
        : "0",
      emailSubject,
      emailContent, `via ${via}`));
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/download-template-subm`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setLink(data.data.data);
      });

      axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/year`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListYear(data.data.data)
      });

      axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/theme`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListTheme(data.data.data)
      });

      axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/academy`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListAcademy(data.data.data)
      });

      axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/organizer`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListOrganizer(data.data.data)
      });

      axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/training`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListTraining(data.data.data)
      });

      axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/status-profile`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListProfileStatus(data.data.data)
      });

  }, [props.token]);

  const listYears = listYear.map((item, index) => {
    return (
      <option value={item.value} key={index} >{item.value}</option>
    )
  })

  const optAcademy = listAcademy.map((item, index) => {
    return (
      <option value={item.value} key={index} >{item.label}</option>
    )
  })

  const optTheme = listTheme.map((item, index) => {
    return (
      <option value={item.value} key={index} >{item.label}</option>
    )
  })

  const optOrganizer = listOrganizer.map((item, index) => {
    return (
      <option value={item.label} key={index} >{item.label}</option>
    )
  })
  
  const optTraining = listTraining.map((item, index) => {
    return (
      <option value={item.value} key={index} >{item.label}</option>
    )
  })

  const optStatusProfile = listProfileStatus.map((item, index) => {
    return (
      <option value={item.value} key={index} >{item.value}</option>
    )
  })

  return (
    <div className="col-xl-8 styling-content-pelatihan">
      <form>
        <div className="notification-title border-resnponsive mr-4">
          <h1>Status Update & Broadcast Email</h1>
        </div>
        <div className="form-group my-4 mr-4">
          <h3 className="judul">Judul</h3>
          <input
            type="text"
            name="judul"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Masukkan Judul"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <h3 className="judul my-2">Data List Peserta</h3>
        <div className="form-check d-flex pl-0 mb-4 mr-4">
          <div className="d-flex custom-control custom-radio styling-radio mr-4">
            <input
              className="form-check-input"
              type="radio"
              name="via"
              id="template"
              value="template"
              onChange={(e) => {
                setVia(e.target.value);
              }}
            />
            <h3 className="judul">Via Template</h3>
          </div>
          <div className="d-flex custom-control custom-radio styling-radio ml-4">
            <input
              className="form-check-input styling-radio"
              type="radio"
              name="via"
              id="filter"
              value="filter"
              onChange={(e) => {
                setVia(e.target.value);
              }}
            />
            <h3 className="judul pt-4">Via Filter</h3>
          </div>
        </div>

        {via === "template" && (
          <div className="mt-4">
            <div className="row">
              <div className="col mt-5">
                <div className="title-unduh mb-5">
                  <h3 className="judul">Unduh Template Data Peserta</h3>
                </div>
                <div className="justify-content-start">
                  <div
                    className="mr-4 styling-unduh d-flex"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location = link;
                    }}
                  >
                    <div className="position-relative">
                      <i
                        className="fas fa-download"
                        style={{
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                          left: "20px",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      ></i>
                      <span>Unduh</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col mt-5">
                <div className="title-unduh">
                  <h3 className="judul">Upload Data Peserta</h3>
                </div>
                <div className="justify-content-start">
                  <div className="mr-4 styling-upload d-flex">
                    <div className="position-relative">
                      <i
                        className="fas fa-upload"
                        style={{
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                          left: "20px",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      ></i>
                      <input
                        type="file"
                        required
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="border-bottom mt-4 pb-3 text-muted">
              *Isi Template Data Peserta Dengan Nomor Registrasi
            </p>
          </div>
        )}

        {via === "filter" && (
          <div className="mt-4">
            <div className="row border-bottom">
              <div className="form-group col-xl-6 mr-4">
                <h3 className="judul">Tahun</h3>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                  required
                >
                  <option disabled selected>
                    --------------- PILIH TAHUN ------------------
                  </option>
                  {listYears}
                </select>
              </div>
              <div className="form-group col-xl-6 mr-4">
                <h3 className="judul">Akademi</h3>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setAcademy(e.target.value);
                  }}
                  required
                >
                  <option disabled selected>
                    --------------- PILIH AKADEMI ------------------
                  </option>
                  {optAcademy}
                </select>
              </div>
              <div className="form-group col-xl-6 mr-4">
                <h3 className="judul">Tema</h3>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setTheme(e.target.value);
                  }}
                  required
                >
                  <option disabled selected>
                    --------------- PILIH TEMA ------------------
                  </option>
                  {optTheme}
                </select>
              </div>
              <div className="form-group col-xl-6 mr-4">
                <h3 className="judul">Penyelenggara</h3>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setOrganizer(e.target.value);
                  }}
                  required
                >
                  <option disabled selected>
                    --------------- PILIH PENYELENGGARA ------------------
                  </option>
                  {optOrganizer}
                </select>
              </div>
              <div className="form-group col-xl-6 mr-4">
                <h3 className="judul">Pelatihan</h3>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setTraining(e.target.value);
                  }}
                  required
                >
                  <option disabled selected>
                    --------------- PILIH PELATIHAN ------------------
                  </option>
                  {optTraining}
                </select>
              </div>
              <div className="form-group col-xl-6 mr-4">
                <h3 className="judul">Status Profil</h3>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setProfileStatus(e.target.value);
                  }}
                  required
                >
                  <option disabled selected>
                    --------------- PILIH STATUS PROFIL ------------------
                  </option>
                  {optStatusProfile}
                </select>
              </div>
              <div className="form-group col-xl-6 mr-4">
                <h3 className="judul">Status Seleksi</h3>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setSelectionStatus(e.target.value);
                  }}
                  required
                >
                  <option disabled selected>
                    --------------- PILIH STATUS SELEKSI ------------------
                  </option>
                  <option value="06">Lulus</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {via === "" && (
          <div className="mt-4">
            <h1>Via Template / Filter</h1>
          </div>
        )}
        <div className="update-status mt-4">
          <h3 className="judul mb-4">Update Status Seleksi Peserta</h3>
          <span className="d-flex switch switch-primary status-peserta">
            <label>
              <input
                type="checkbox"
                name="select"
                checked={participantSelectionStatusUpdate}
                onChange={(e) => {
                  setParticipantSelectionStatusUpdate(e.target.checked);
                }}
              />
              <span></span>
            </label>
            <h3 className="mt-2 judul">
              {participantSelectionStatusUpdate ? "Aktif" : "Tidak Aktif"}
            </h3>
          </span>
        </div>
        <div className="status-peserta">
          <div className="form-group mr-4">
            <h3 className="mb-4 judul">Status</h3>
            <select
              className="form-control"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              required
            >
              <option selected> 
                {" "}
                --------------- PILIH PELATIHAN ------------------
              </option>
              <option value="Menunggu">Menunggu</option>
              <option value="Tidak Lulus Administrasi">
                Tidak Lulus Administrasi
              </option>
              <option value="Tidak Substansi">Tidak Substansi</option>
              <option value="Tidak Lulus Tes Substansi">
                Tidak Lulus Tes Substansi
              </option>
              <option value="Lulus Tes Substansi">Lulus Tes Substansi</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Diterima">Diterima</option>
              <option value="Pelatihan">Pelatihan</option>
              <option value="Lulus Pelatihan">Lulus Pelatihan</option>
              <option value="Tidak Lulus Pelatihan">
                Tidak Lulus Pelatihan
              </option>
            </select>
          </div>
        </div>
        <div className="update-status mr-4">
          <h3 className="mb-4 judul">Broadcast Email & Send Notification</h3>
          <span className="d-flex switch switch-primary status-peserta">
            <label>
              <input
                type="checkbox"
                name="select"
                checked={broadcastEmailSendNotification}
                onChange={(e) => {
                  setBroadcastEmailSendNotification(e.target.checked);
                }}
                required
              />
              <span></span>
            </label>
            <h3 className="mt-2 isAktif">
              {broadcastEmailSendNotification ? "Aktif" : "Tidak Aktif"}
            </h3>
          </span>
        </div>
        <div className="form-group mr-4">
          <h3 className="judul">Subjek Email</h3>
          <input
            type="text"
            name="subjekEmail"
            className="form-control"
            id="subjekEmail"
            placeholder="Subjek Email"
            onChange={(e) => {
              setEmailSubject(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group mr-4">
          <h3 className="judul">Konten Email</h3>
          <CKEditor
            editor={ClassicEditor}
            data={emailContent}
            onChange={(event, editor) => {
              let data = editor.getData();
              setEmailContent(data);
            }}
          />
        </div>
        <div className="d-flex justify-content-end mb-4 mr-4">
          <button type="reset" className="btn btn-reset" onClick={() => {
             setVia("template");
             setTitle("");
             setYear("");
             setAcademy("");
             setTheme("");
             setOrganizer("");
             setTraining("");
             setProfileStatus("");
             setSelectionStatus("");
             setParticipantSelectionStatusUpdate(0);
             setStatus("");
             setBroadcastEmailSendNotification(0);
             setEmailSubject("");
             setEmailContent("");
             setFile("");
             setLink("");
          }}>
            Reset
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="btn btn-rounded-full bg-blue-primary text-white"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
