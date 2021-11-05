import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { TagsInput } from "react-tag-input-component";
import DatePicker from 'react-datepicker'
import Select from 'react-select'

import {
  newArtikel,
  clearErrors,
} from "../../../../redux/actions/publikasi/artikel.actions";
// import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { NEW_ARTIKEL_RESET } from "../../../../redux/types/publikasi/artikel.type";
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

const TambahArtikel = ({ token, id }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const importSwitch = () => import("bootstrap-switch-button-react");
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const { loading, error, success } = useSelector((state) => state.newArtikel);
  const { setting } = useSelector(state => state.allSettingPublikasi)
  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(state => state.drowpdownAkademi);
  const {
    loading: allLoading,
    error: allError,
    kategori,
  } = useSelector((state) => state.allKategori);


  useEffect(() => {

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    setEditorLoaded(true);
    if (success) {
      router.push({
        pathname: `/publikasi/artikel`,
        query: { success: true },
      });
    }
  }, [dispatch, error, success, simpleValidator, router]);

  const [judul_artikel, setJudulArtikel] = useState("");
  const [isi_artikel, setIsiArtikel] = useState("");
  const [gambar, setGambar] = useState("");
  const [gambarPreview, setGambarPreview] = useState(
    "/assets/media/default.jpg"
  );
  const [iconPlus, setIconPlus] = useState(
    "/assets/icon/Add.svg"
  );
  const [gambarName, setGambarName] = useState(null)
  const [kategori_id, setKategoriId] = useState("");
  const [users_id, setUserId] = useState(id);
  const [tag, setTag] = useState([]);
  const [publish, setPublish] = useState(0);
  const [publishDate, setPublishDate] = useState(null);
  const [disablePublishDate, setDisablePublishDate] = useState(true)
  const [disableTag, setDisableTag] = useState(false)
  const [kategori_akademi, setKategoriAkademi]=useState("");

  const onChangeGambar = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"]

    if (type.includes(e.target.files[0].type)) {
      if (e.target.files[0].size > parseInt(setting[0].max_size) + '000000') {
        e.target.value = null;
        Swal.fire("Oops !", "Data Image Melebihi Ketentuan", "error");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setGambar(reader.result);
            setGambarPreview(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0])
        setGambarName(e.target.files[0].name)
      }
    }
    else {
      e.target.value = null
      Swal.fire(
        'Oops !',
        'Thumbnail harus berupa data gambar.',
        'error'
      )
    }
  };

  const handleChangePublish = (e) => {
    setDisablePublishDate(!disablePublishDate)

    if (e.target.checked === false) {
      setPublishDate(null)
      setPublish(0)
    } else {
      setPublish(1)
    }
  };

  const handlePublishDate = (date) => {
    if (disablePublishDate === false) {
      setPublishDate(date)
    }
  }

  function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }

  const handleTag = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (hasWhiteSpace(data[i])) {
        data.splice([i], 1);
      }
    }
    setTag(data);
  }

  const onSubmit = (e) => {

    e.preventDefault();
    if (simpleValidator.current.allValid() && disableTag === false) {
      if (error) {
        dispatch(clearErrors());
      }

      if (success) {
        dispatch({
          type: NEW_ARTIKEL_RESET,
        });
      }

      if (publish === true) {
        setPublish(1)

      } else if (publish === false) {
        setPublish(0)

      }

      if (publishDate === null) {
        let today = new Date

        const data = {
          judul_artikel,
          isi_artikel,
          gambar,
          kategori_akademi,
          kategori_id,
          users_id,
          tag,
          publish,
          tanggal_publish: moment(today).format("YYYY-MM-DD")
        };

        Swal.fire({
          title: "Apakah anda yakin ?",
          text: "Data ini akan ditambahkan !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya !",
          cancelButtonText: "Batal",
        })
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(newArtikel(data, token));
            }
          });

      } else {

        const data = {
          judul_artikel,
          isi_artikel,
          gambar,
          kategori_akademi,
          kategori_id,
          users_id,
          tag,
          publish,
          tanggal_publish: moment(publishDate).format("YYYY-MM-DD")
        };


        Swal.fire({
          title: "Apakah anda yakin ?",
          text: "Data ini akan ditambahkan !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya !",
          cancelButtonText: "Batal",
        })
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(newArtikel(data, token));
            }
          });
      }

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

  return (
    <>
      <PageWrapper>
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
          {loading ? <LoadingPage loading={loading} /> : ""}
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header">
              <h3 className="card-title font-weight-bolder text-dark">
                Tambah Artikel
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Judul
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Judul Disini"
                      value={judul_artikel}
                      onChange={(e) => setJudulArtikel(e.target.value)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("judul_artikel")
                      }
                    />
                    {simpleValidator.current.message(
                      "judul_artikel",
                      judul_artikel,
                      "required|min:5|max:200",
                      { className: "text-danger" }
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label font-weight-bolder"
                  >
                    Isi Artikel
                  </label>
                  <div className="col-sm-12">
                    <div className="ckeditor">
                      {editorLoaded ? (
                        <CKEditor
                          editor={ClassicEditor}
                          data={isi_artikel}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setIsiArtikel(data);
                          }}
                          onBlur={() =>
                            simpleValidator.current.showMessageFor(
                              "isi_artikel"
                            )
                          }
                          config={{
                            placeholder: "Tulis Deskripsi",
                          }}
                        />

                      ) : (
                        <p>Tunggu Sebentar</p>
                      )}
                      {simpleValidator.current.message(
                        "isi_artikel",
                        isi_artikel,
                        "required|min:100|max:12000",
                        { className: "text-danger" }
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label font-weight-bolder"
                  >
                    Upload Thumbnail
                  </label>
                  <div className="ml-3 row">
                    <figure
                      className="avatar item-rtl position-relative"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <Image
                        src={gambarPreview}
                        alt="image"
                        width={160}
                        height={160}
                        objectFit="cover"
                      />
                    </figure>
                    <div className="position-relative">
                      <label className="circle-top" htmlFor="inputGroupFile04">
                        <i className="ri-add-line text-dark"></i>
                      </label>
                      <input
                        type="file"
                        name="gambar"
                        className="custom-file-input"
                        id="inputGroupFile04"
                        onChange={onChangeGambar}
                        accept="image/*"
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("gambar")
                        }
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <div className="ml-3">
                    {simpleValidator.current.message(
                      "gambar",
                      gambar,
                      "required",
                      { className: "text-danger" }
                    )}
                    {
                      gambarName !== null ?
                        <small className="text-danger">{gambarName}</small>
                        :
                        null
                    }
                  </div>

                  <div className="mt-3 col-sm-6 col-md-6 col-lg-7 col-xl-3 text-muted">
                    <p>
                      Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                    </p>
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Akademi
                  </label>
                  <div className="col-sm-12">
                    <select
                      name=""
                      id=""
                      className="form-control dropdownArt"
                      value={kategori_akademi}
                      onChange={(e) => setKategoriAkademi(e.target.value)}
                      onBlur={(e) => {
                        setKategoriAkademi(e.target.value);
                        simpleValidator.current.showMessageFor("akademi");
                      }}
                    >
                      <option selected disabled value="">
                        -- Akademi --
                      </option>
                      {!dataAkademi || (dataAkademi && dataAkademi.length === 0) ? (
                        <option value="">Data Tidak Ditemukan</option>
                      ) : (
                        dataAkademi &&
                        dataAkademi.data &&
                        dataAkademi.data.map((row) => {
                          return (
                            // row.jenis_kategori == "Artikel" ?
                              <option key={row.value} value={row.label}>
                                {row.label}
                              </option>
                              // :
                              // null
                          );
                        })
                      )}
                    </select>
                    {simpleValidator.current.message(
                      "akademi",
                      kategori_akademi,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Kategori
                  </label>
                  <div className="col-sm-12">
                    <select
                      name=""
                      id=""
                      className="form-control dropdownArt"
                      value={kategori_id}
                      onChange={(e) => setKategoriId(e.target.value)}
                      onBlur={(e) => {
                        setKategoriId(e.target.value);
                        simpleValidator.current.showMessageFor("kategori_id");
                      }}
                    >
                      <option selected disabled value="">
                        -- Artikel --
                      </option>
                      {!kategori || (kategori && kategori.length === 0) ? (
                        <option value="">Data Tidak Ditemukan</option>
                      ) : (
                        kategori &&
                        kategori.kategori &&
                        kategori.kategori.map((row) => {
                          return (
                            row.jenis_kategori == "Artikel" ?
                              <option key={row.id} value={row.id}>
                                {row.nama_kategori}
                              </option>
                              :
                              null
                          );
                        })
                      )}
                    </select>
                    {simpleValidator.current.message(
                      "kategori_id",
                      kategori_id,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Tag
                  </label>
                  <div className="col-sm-12">
                    <TagsInput
                      value={tag}
                      onChange={(data) => handleTag(data)}
                      name="fruits"
                      placeHolder="Isi Tag disini"
                      // onBlur={() => simpleValidator.current.showMessageFor('tag')}
                      seprators={["Enter", "Tab"]}
                    />
                    {/* {simpleValidator.current.message('tag', tag, 'required', { className: 'text-danger' })} */}
                    {
                      disableTag === true ?
                        <p className="text-danger">
                          Tag tidak bisa terdiri dari "SPACE" character saja
                        </p>
                        :
                        null
                    }
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="ml-5 pl-4 font-weight-bolder"
                  >
                    Publish
                  </label>
                  <div className="col-sm-1 ml-4">
                    <div className="">
                      <label className="switches">
                        <input
                          // required
                          className="checkbox"
                          checked={publish}
                          type="checkbox"
                          onChange={(e) => handleChangePublish(e)}
                        />
                        <span
                          className={`sliders round ${publish ? "text-white" : "pl-2"
                            }`}
                        >
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {
                  disablePublishDate === false ?
                    <div className="form-group">
                      <label className='col-sm-5 col-form-label font-weight-bolder'>Set Tanggal Publish</label>
                      <div className="col-sm-12">
                        <div className="input-group">
                          <DatePicker
                            className="form-search-date form-control-sm form-control"
                            selected={publishDate}
                            onChange={(date) => handlePublishDate(date)}
                            selectsStart
                            startDate={publishDate}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Silahkan Isi Tanggal Publish"
                            wrapperClassName="col-12 col-lg-12 col-xl-12"
                            disabled={disablePublishDate === true || disablePublishDate === null}
                          />
                        </div>
                      </div>
                    </div>
                    :
                    null

                }


                <div className="form-group row">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-10 text-right">
                    <Link href="/publikasi/artikel">
                      <a className="btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm">
                        Kembali
                      </a>
                    </Link>
                    <button className="btn btn-primary-rounded-full rounded-pill btn-sm">Simpan</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Pratinjau Gambar
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
                className="modal-body text-center"
                style={{ height: "400px" }}
              >
                <Image
                  src={gambarPreview}
                  alt="image"
                  layout="fill"
                  objectFit="cover"
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
      </PageWrapper>
    </>
  );
};


export default TambahArtikel;
