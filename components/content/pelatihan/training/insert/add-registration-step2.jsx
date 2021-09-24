import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";
import LoadingPage from "../../../../LoadingPage";

const AddRegistrationStep2 = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [modalShow, setModalShow] = useState(false);

  const [element] = useState([
    {
      value: "select",
      name: "Select",
    },
    {
      value: "text",
      name: "Text",
    },
    {
      value: "checkbox",
      name: "Checkbox",
    },
    {
      value: "textarea",
      name: "Text Area",
    },
    {
      value: "radio",
      name: "Radio",
    },
    {
      value: "file_image",
      name: "File Image",
    },
    {
      value: "file_doc",
      name: "File Documet",
    },
    {
      value: "date",
      name: "Input Date",
    },
  ]);

  const [size] = useState([
    { value: "col-md-6", name: "Half" },
    { value: "col-md-12", name: "Full" },
  ]);

  const [options] = useState([
    {
      name: "Manual",
      value: "manual",
    },
    {
      name: "Select Reference",
      value: "select_reference",
    },
  ]);

  const [dataOptions] = useState([
    {
      value: "status_menikah",
    },
    {
      value: "pendidikan",
    },
    {
      value: "status_pekerjaan",
    },
    {
      value: "hubungan",
    },
    {
      value: "bidang_pekerjaan",
    },
    {
      value: "level_pelatihan",
    },
    {
      value: "agama",
    },
    {
      value: "penyelengaara",
    },
    {
      value: "provinsi",
    },
    {
      value: "kota/kabupaten",
    },
    {
      value: "universitas",
    },
  ]);

  const [title, setTitle] = useState("");
  const [formBuilder, setFormBuilder] = useState([
    {
      key: 1,
      name: "",
      element: "",
      size: "",
      option: "",
      dataOption: "",
      required: false,
    },
  ]);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const inputChangeHandler = (e, index) => {
    const { value, name, checked } = e.target;
    const list = [...formBuilder];
    list[index][name] = value;
    if (name === "required") {
      list[index]["required"] = checked;
    }
    setFormBuilder(list);
  };

  const addFieldHandler = () => {
    const newKey = formBuilder[formBuilder.length - 1].key + 1;
    setFormBuilder([
      ...formBuilder,
      {
        key: newKey,
        name: "",
        element: "",
        size: "",
        option: "",
        dataOption: "",
        required: false,
      },
    ]);
  };

  const removeFieldHandler = (index) => {
    const list = [...formBuilder];
    list.splice(index, 1);
    list.forEach((row, i) => {
      let key = i + 1;
      list[i]["key"] = key;
    });
    setFormBuilder(list);
  };

  const renderDataOptionHandler = (row, i) => {
    if (row.option === "select_reference") {
      return (
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">
              Data Option
            </label>
            <select
              className="form-control"
              name="dataOption"
              value={row.dataOption}
              onChange={(e) => inputChangeHandler(e, i)}
            >
              <option value="" disabled selected>
                -- PILIH --
              </option>
              {dataOptions.map((datOpt, i) => (
                <option key={i} value={datOpt.value}>
                  {datOpt.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">
              Data Option
            </label>
            <input
              type="text"
              className="form-control"
              name="dataOption"
              value={row.dataOption}
              placeholder="data1;data2"
              autoComplete="off"
              onChange={(e) => inputChangeHandler(e, i)}
            />
          </div>
        </div>
      );
    }
  };

  const renderMultipleHandler = (row, i) => {
    if (
      row.element === "select" ||
      row.element === "checkbox" ||
      row.element === "radio"
    ) {
      return (
        <>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">Option</label>
              <select
                className="form-control"
                name="option"
                value={row.option}
                onChange={(e) => inputChangeHandler(e, i)}
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {options.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {renderDataOptionHandler(row, i)}
        </>
      );
    } else {
      return (
        <>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">Option</label>
              <select
                className="form-control"
                name="option"
                value={row.option}
                onChange={(e) => inputChangeHandler(e, i)}
                disabled
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {options.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">
                Data Option
              </label>
              <select
                className="form-control"
                name="dataOption"
                value={row.dataOption}
                onChange={(e) => inputChangeHandler(e, i)}
                disabled
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {dataOptions.map((datOpt, i) => (
                  <option key={i} value={datOpt.value}>
                    {datOpt.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      );
    }
  };

  const readerElementHandler = (row, i) => {
    switch (row.element) {
      case "text":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
            />
          </div>
        );
        break;
      case "select":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select name="" className="form-control" required={row.required}>
              {modalShow === true
                ? row.option === "manual"
                  ? row.dataOption.map((dat, i) => (
                      <option value={dat} key={i}>
                        {dat}
                      </option>
                    ))
                  : ""
                : ""}
            </select>
          </div>
        );
        break;
      case "checkbox":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {modalShow === true
                ? row.option === "manual"
                  ? row.dataOption.map((dat, i) => (
                      <div className="form-check pb-3" key={i}>
                        <input
                          type="checkbox"
                          name="plotRegistration"
                          className="form-check-input"
                          required={row.required}
                          value={dat}
                        />
                        <label className="form-check-label">{dat}</label>
                      </div>
                    ))
                  : ""
                : ""}
            </div>
          </div>
        );
        break;
      case "textarea":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <textarea
              name=""
              cols="30"
              rows="5"
              className="form-control"
              required={row.required}
            />
          </div>
        );
        break;
      case "radio":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {modalShow === true
                ? row.option === "manual"
                  ? row.dataOption.map((dat, i) => (
                      <div className="form-check pb-3" key={i}>
                        <input
                          type="radio"
                          name={row.name}
                          className="form-check-input"
                          value={dat}
                          required={row.required}
                        />
                        <label className="form-check-label">{dat}</label>
                      </div>
                    ))
                  : ""
                : ""}
            </div>
          </div>
        );
        break;
      case "file_image":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="image/png, image/jpeg , image/jpg"
                required={row.required}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Belum ada File
              </label>
            </div>
          </div>
        );
        break;
      case "file_doc":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.required}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Belum ada File
              </label>
            </div>
          </div>
        );
        break;
      case "date":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
            />
          </div>
        );
        break;
      default:
        break;
    }
  };

  const showPreviewHandler = () => {
    let list = [...formBuilder];
    list.forEach((row, i) => {
      if (row.option === "manual") {
        let dataOption = row.dataOption.split(";");
        row.dataOption = dataOption;
      }
    });
    setFormBuilder(list);
    setModalShow(true);
  };

  const closePreviewHandler = () => {
    let list = [...formBuilder];
    list.forEach((row, i) => {
      if (row.option === "manual") {
        let dataOption = row.dataOption.join(";");
        row.dataOption = dataOption;
      }
    });
    setFormBuilder(list);
    setModalShow(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push("/pelatihan/pelatihan/tambah-pelatihan/tambah-form-komitmen");
    const data = {
      title,
      formBuilder,
    };
    console.log(data);
    if (simpleValidator.current.allValid()) {
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data yang bener dong lu !",
      });
    }
  };

  return (
    <PageWrapper>
      <StepInputPelatihan step={2} />
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <form onSubmit={submitHandler}>
              <h3 className="font-weight-bolder pb-5 pt-4">Form Pendaftaran</h3>
              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Judul Form
                </label>
                <input
                  type="text"
                  placeholder="Silahkan Masukan Judul Form"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoComplete="off"
                />
              </div>

              {formBuilder.map((row, i) => (
                <div className="builder row" key={i}>
                  <div className="col-sm-12 col-md-2">
                    <div className="form-group mb-2">
                      <label className="col-form-label font-weight-bold">
                        Nama Field
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={row.name}
                        placeholder="Field"
                        autoComplete="off"
                        onChange={(e) => inputChangeHandler(e, i)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-2">
                    <div className="form-group mb-2">
                      <label className="col-form-label font-weight-bold">
                        Pilih Element
                      </label>
                      <select
                        className="form-control"
                        name="element"
                        value={row.element}
                        onChange={(e) => inputChangeHandler(e, i)}
                      >
                        <option value="" disabled selected>
                          -- PILIH --
                        </option>
                        {element.map((el, i) => (
                          <option key={i} value={el.value}>
                            {el.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-2">
                    <div className="form-group mb-2">
                      <label className="col-form-label font-weight-bold">
                        Size
                      </label>
                      <select
                        className="form-control"
                        name="size"
                        value={row.size}
                        onChange={(e) => inputChangeHandler(e, i)}
                      >
                        <option value="" disabled selected>
                          -- PILIH --
                        </option>
                        {size.map((siz, i) => (
                          <option key={i} value={siz.value}>
                            {siz.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {renderMultipleHandler(row, i)}

                  <div className="col-sm-6 col-md-2">
                    <label className="col-form-label font-weight-bold">
                      Required
                    </label>
                    <div className="d-flex align-items-end">
                      <div className="form-group mr-7">
                        <div className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            name="required"
                            checked={row.required}
                            className="form-check-input"
                            onChange={(e) => inputChangeHandler(e, i)}
                          />
                        </div>
                      </div>
                      {formBuilder.length !== 1 && row.key !== 1 ? (
                        <button
                          className="btn btn-link-action bg-danger text-white mb-3 ml-9"
                          type="button"
                          onClick={() => removeFieldHandler(i)}
                        >
                          <i className="ri-delete-bin-fill p-0 text-white"></i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-link-action bg-danger text-white mb-3 ml-9 invisible"
                          type="button"
                          onClick={() => removeFieldHandler(i)}
                        >
                          <i className="ri-delete-bin-fill p-0 text-white"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="form-group mb-9 mt-4">
                <div className="text-right">
                  <button
                    className="btn btn-light-success mr-2"
                    type="button"
                    style={{ borderRadius: "30px", fontWeight: "600" }}
                    onClick={showPreviewHandler}
                  >
                    Review
                  </button>
                  <button
                    className="btn btn-primary-rounded-full"
                    type="button"
                    onClick={addFieldHandler}
                  >
                    <i className="ri-pencil-fill"></i> Tambah Field
                  </button>
                </div>
              </div>

              <div className="form-group mt-9">
                <div className="text-right">
                  <button
                    className="btn btn-light-ghost-rounded-full mr-2"
                    type="button"
                    onClick={() => router.back()}
                  >
                    Kembali
                  </button>
                  <button
                    className="btn btn-primary-rounded-full"
                    type="submit"
                  >
                    Simpan & Lanjut
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal
        show={modalShow}
        onHide={closePreviewHandler}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
          <button type="button" className="close" onClick={closePreviewHandler}>
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {formBuilder.map((row, i) => (
              <>{readerElementHandler(row, i)}</>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="py-2">
          <div className="float-right">
            <button
              className="btn btn-warning"
              type="button"
              style={{ borderRadius: "30px", fontWeight: "600" }}
              onClick={closePreviewHandler}
            >
              Kembali
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default AddRegistrationStep2;