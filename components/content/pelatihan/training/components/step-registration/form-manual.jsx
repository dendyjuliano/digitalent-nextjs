import React, { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  helperChangeInputFormBuilder,
  helperAddFieldTriggered,
  helperRemoveField,
} from "../../../../../../utils/middleware/helper";

const FormManual = ({
  title,
  formBuilder,
  funcTitle,
  funcFormBuilder,
  funcModalShow,
  element,
  size,
  options,
  dataOptions,
}) => {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const renderDataOptionHandler = (
    row,
    i,
    parentIndex,
    j = null,
    childrenIndex,
    k = null,
    indexIndex,
    l = null
  ) => {
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
              onChange={(e) =>
                inputChangeParentHandler(
                  e,
                  i,
                  parentIndex,
                  j,
                  childrenIndex,
                  k,
                  indexIndex,
                  l
                )
              }
              required
            >
              <option value="" disabled selected>
                -- PILIH --
              </option>
              {dataOptions.map((datOpt, i) => (
                <option key={i} value={datOpt.id}>
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
              onChange={(e) =>
                inputChangeParentHandler(
                  e,
                  i,
                  parentIndex,
                  j,
                  childrenIndex,
                  k,
                  indexIndex,
                  l
                )
              }
              required
            />
          </div>
        </div>
      );
    }
  };

  const renderMultipleHandler = (
    row,
    i,
    parentIndex,
    j = null,
    childrenIndex,
    k = null,
    indexIndex,
    l = null
  ) => {
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
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
                required
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
          {renderDataOptionHandler(
            row,
            i,
            parentIndex,
            j,
            childrenIndex,
            k,
            indexIndex,
            l
          )}
        </>
      );
    } else if (row.element === "triggered") {
      return (
        <>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">Option</label>
              <select
                className="form-control"
                name="option"
                value={row.option}
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {options.map(
                  (opt, i) =>
                    opt.value !== "select_reference" && (
                      <option key={i} value={opt.value}>
                        {opt.name}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
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
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
                required
                disabled={row.triggered === "1" ? true : false}
              />
            </div>
          </div>
        </>
      );
    } else if (row.element === "upload_document") {
      return (
        <div className="col-sm-12 col-md-4">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">
              Upload Document
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                name="upload-document"
                accept="image/png, image/jpeg , image/jpg, application/pdf"
                id="uploadThumbnail"
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName}
              </label>
            </div>
          </div>
        </div>
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
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
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
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
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

  const showPreviewHandler = () => {
    let list = [...formBuilder];
    funcFormBuilder(list);
    funcModalShow(true);
  };

  const addFieldHandler = () => {
    const newKey = formBuilder[formBuilder.length - 1].key + 1;
    funcFormBuilder([
      ...formBuilder,
      {
        key: newKey,
        name: "",
        element: "",
        size: "",
        option: "",
        dataOption: "",
        fileName: "Belum ada file",
        required: "0",
        triggered: "0",
        triggered_parent: [],
        value: "",
      },
    ]);
  };

  const addFieldTriggeredHandler = (
    alfa = null,
    parentIndex = null,
    beta = null,
    childrenIndex = null,
    gamma = null,
    indexIndex = null,
    delta = null
  ) => {
    const valueForm = helperAddFieldTriggered(
      formBuilder,
      alfa,
      parentIndex,
      beta,
      childrenIndex,
      gamma,
      indexIndex,
      delta
    );
    funcFormBuilder(valueForm);
  };

  const removeFieldHandler = (
    alfa = null,
    parentIndex = null,
    beta = null,
    childrenIndex = null,
    gamma = null,
    indexIndex = null,
    delta = null
  ) => {
    const valueForm = helperRemoveField(
      formBuilder,
      alfa,
      parentIndex,
      beta,
      childrenIndex,
      gamma,
      indexIndex,
      delta
    );
    funcFormBuilder(valueForm);
  };

  const inputChangeParentHandler = (
    event,
    alfa = null,
    parentIndex = null,
    beta = null,
    childrenIndex = null,
    gamma = null,
    indexIndex = null,
    delta = null
  ) => {
    const valueForm = helperChangeInputFormBuilder(
      event,
      formBuilder,
      alfa,
      parentIndex,
      beta,
      childrenIndex,
      gamma,
      indexIndex,
      delta
    );
    funcFormBuilder(valueForm);
  };

  return (
    <>
      <div className="form-group mb-4">
        <label className="col-form-label font-weight-bold">Judul Form</label>
        <input
          type="text"
          placeholder="Silahkan Masukan Judul Form"
          className="form-control"
          value={title}
          onChange={(e) => funcTitle(e.target.value)}
          onBlur={() => simpleValidator.current.showMessageFor("judul form")}
          autoComplete="off"
          maxLength={100}
          required
        />

        {simpleValidator.current.message(
          "judul form",
          title,
          "required|max:100",
          {
            className: "text-danger",
          }
        )}
      </div>

      <div className="row justify-content-end">
        {formBuilder.map((row, i) => (
          <>
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
                  onChange={(e) => inputChangeParentHandler(e, i)}
                  required
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
                  onChange={(e) => inputChangeParentHandler(e, i)}
                  required
                  disabled={row.triggered === "1" ? true : false}
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
                  Ukuran Form
                </label>
                <select
                  className="form-control"
                  name="size"
                  value={row.size}
                  onChange={(e) => inputChangeParentHandler(e, i)}
                  required
                  disabled={row.element === "triggered" ? true : false}
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
              <label className="col-form-label font-weight-bold ">
                Required
              </label>
              {row.element === "triggered" && (
                <label className="col-form-label font-weight-bold ml-3">
                  Triggered
                </label>
              )}
              <div className="d-flex align-items-end justify-content-between">
                <div className="form-group mr-15">
                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      name="required"
                      checked={row.required === "1" ? true : false}
                      className="form-check-input"
                      onChange={(e) => inputChangeParentHandler(e, i)}
                    />
                  </div>
                </div>
                {row.element === "triggered" && (
                  <div className="">
                    <label className="switches">
                      <input
                        className="checkbox"
                        name="triggered"
                        checked={row.triggered === "1" ? true : false}
                        type="checkbox"
                        onChange={(e) => inputChangeParentHandler(e, i)}
                      />
                      <span className={`sliders round pl-2`}></span>
                    </label>
                  </div>
                )}
                {formBuilder.length !== 1 && row.key !== 1 ? (
                  <button
                    className="btn btn-link-action bg-danger text-white mb-3 "
                    type="button"
                    onClick={() => removeFieldHandler(i)}
                  >
                    <i className="ri-delete-bin-fill p-0 text-white"></i>
                  </button>
                ) : (
                  <button
                    className="btn btn-link-action bg-danger text-white mb-3  invisible"
                    type="button"
                    onClick={() => removeFieldHandler(i)}
                  >
                    <i className="ri-delete-bin-fill p-0 text-white"></i>
                  </button>
                )}
              </div>
            </div>
            {row.triggered_parent &&
              row.triggered_parent.length > 0 &&
              row.triggered_parent.map((titleParent, parentTitle) => (
                <>
                  <div
                    className="col-md-12"
                    key={parentTitle}
                    style={{ maxWidth: "97%" }}
                  >
                    <p className="mb-0 mt-3 fw-600 fz-16">
                      Opsi : {titleParent.triggeredName}
                    </p>
                  </div>

                  {titleParent.triggeredForm &&
                    titleParent.triggeredForm.length > 0 &&
                    titleParent.triggeredForm.map((rowParent, j) => (
                      <>
                        <div className="col-md-12" style={{ maxWidth: "97%" }}>
                          <div className="row">
                            <div className="col-sm-12 col-md-2">
                              <div className="form-group mb-2">
                                <label className="col-form-label font-weight-bold">
                                  Nama Field
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  value={rowParent.name}
                                  placeholder="Field"
                                  autoComplete="off"
                                  onChange={(e) =>
                                    inputChangeParentHandler(
                                      e,
                                      i,
                                      parentTitle,
                                      j
                                    )
                                  }
                                  required
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
                                  value={rowParent.element}
                                  onChange={(e) =>
                                    inputChangeParentHandler(
                                      e,
                                      i,
                                      parentTitle,
                                      j
                                    )
                                  }
                                  required
                                  disabled={
                                    rowParent.triggered === "1" ? true : false
                                  }
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
                                  Ukuran Form
                                </label>
                                <select
                                  className="form-control"
                                  name="size"
                                  value={rowParent.size}
                                  onChange={(e) =>
                                    inputChangeParentHandler(
                                      e,
                                      i,
                                      parentTitle,
                                      j
                                    )
                                  }
                                  required
                                  disabled
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

                            {renderMultipleHandler(
                              rowParent,
                              i,
                              parentTitle,
                              j
                            )}
                            <div className="col-sm-6 col-md-2">
                              <label className="col-form-label font-weight-bold ">
                                Req
                              </label>
                              {rowParent.element === "triggered" && (
                                <label className="col-form-label font-weight-bold ml-3">
                                  Triggered
                                </label>
                              )}
                              <div className="d-flex align-items-end justify-content-between">
                                <div className="form-group ">
                                  <div className="form-check mb-4">
                                    <input
                                      type="checkbox"
                                      name="required"
                                      checked={
                                        rowParent.required === "1"
                                          ? true
                                          : false
                                      }
                                      className="form-check-input"
                                      onChange={(e) =>
                                        inputChangeParentHandler(
                                          e,
                                          i,
                                          parentTitle,
                                          j
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                {rowParent.element === "triggered" && (
                                  <div className="">
                                    <label className="switches">
                                      <input
                                        className="checkbox"
                                        name="triggered"
                                        checked={
                                          rowParent.triggered === "1"
                                            ? true
                                            : false
                                        }
                                        type="checkbox"
                                        onChange={(e) =>
                                          inputChangeParentHandler(
                                            e,
                                            i,
                                            parentTitle,
                                            j
                                          )
                                        }
                                      />
                                      <span
                                        className={`sliders round pl-2`}
                                      ></span>
                                    </label>
                                  </div>
                                )}
                                <button
                                  className="btn btn-link-action bg-danger text-white mb-3 "
                                  type="button"
                                  onClick={() =>
                                    removeFieldHandler(i, parentTitle, j)
                                  }
                                >
                                  <i className="ri-delete-bin-fill p-0 text-white"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {rowParent.triggered_children &&
                          rowParent.triggered_children.length > 0 &&
                          rowParent.triggered_children.map(
                            (titleChildren, childrenTitle) => (
                              <>
                                <div
                                  className="col-md-12"
                                  key={childrenTitle}
                                  style={{ maxWidth: "94%" }}
                                >
                                  <p className="mb-0 mt-3 fw-600 fz-16">
                                    Opsi : {titleChildren.triggeredName}
                                  </p>
                                </div>

                                {titleChildren.triggeredForm &&
                                  titleChildren.triggeredForm.length > 0 &&
                                  titleChildren.triggeredForm.map(
                                    (rowChildren, k) => (
                                      <>
                                        <div
                                          className="col-md-12"
                                          style={{ maxWidth: "94%" }}
                                        >
                                          <div className="row">
                                            <div className="col-sm-12 col-md-2">
                                              <div className="form-group mb-2">
                                                <label className="col-form-label font-weight-bold">
                                                  Nama Field
                                                </label>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  name="name"
                                                  value={rowChildren.name}
                                                  placeholder="Field"
                                                  autoComplete="off"
                                                  onChange={(e) =>
                                                    inputChangeParentHandler(
                                                      e,
                                                      i,
                                                      parentTitle,
                                                      j,
                                                      childrenTitle,
                                                      k
                                                    )
                                                  }
                                                  required
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
                                                  value={rowChildren.element}
                                                  onChange={(e) =>
                                                    inputChangeParentHandler(
                                                      e,
                                                      i,
                                                      parentTitle,
                                                      j,
                                                      childrenTitle,
                                                      k
                                                    )
                                                  }
                                                  required
                                                  disabled={
                                                    rowChildren.triggered ===
                                                    "1"
                                                      ? true
                                                      : false
                                                  }
                                                >
                                                  <option
                                                    value=""
                                                    disabled
                                                    selected
                                                  >
                                                    -- PILIH --
                                                  </option>
                                                  {element.map((el, i) => (
                                                    <option
                                                      key={i}
                                                      value={el.value}
                                                    >
                                                      {el.name}
                                                    </option>
                                                  ))}
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-sm-12 col-md-2">
                                              <div className="form-group mb-2">
                                                <label className="col-form-label font-weight-bold">
                                                  Ukuran Form
                                                </label>
                                                <select
                                                  className="form-control"
                                                  name="size"
                                                  value={rowChildren.size}
                                                  onChange={(e) =>
                                                    inputChangeParentHandler(
                                                      e,
                                                      i,
                                                      parentTitle,
                                                      j,
                                                      childrenTitle,
                                                      k
                                                    )
                                                  }
                                                  required
                                                  disabled
                                                >
                                                  <option
                                                    value=""
                                                    disabled
                                                    selected
                                                  >
                                                    -- PILIH --
                                                  </option>
                                                  {size.map((siz, i) => (
                                                    <option
                                                      key={i}
                                                      value={siz.value}
                                                    >
                                                      {siz.name}
                                                    </option>
                                                  ))}
                                                </select>
                                              </div>
                                            </div>

                                            {renderMultipleHandler(
                                              rowChildren,
                                              i,
                                              parentTitle,
                                              j,
                                              childrenTitle,
                                              k
                                            )}
                                            <div className="col-sm-6 col-md-2">
                                              <label className="col-form-label font-weight-bold ">
                                                Req
                                              </label>
                                              {rowChildren.element ===
                                                "triggered" && (
                                                <label className="col-form-label font-weight-bold ml-3">
                                                  Triggered
                                                </label>
                                              )}
                                              <div className="d-flex align-items-end justify-content-between">
                                                <div className="form-group ">
                                                  <div className="form-check mb-4">
                                                    <input
                                                      type="checkbox"
                                                      name="required"
                                                      checked={
                                                        rowChildren.required ===
                                                        "1"
                                                          ? true
                                                          : false
                                                      }
                                                      className="form-check-input"
                                                      onChange={(e) =>
                                                        inputChangeParentHandler(
                                                          e,
                                                          i,
                                                          parentTitle,
                                                          j,
                                                          childrenTitle,
                                                          k
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                                {rowChildren.element ===
                                                  "triggered" && (
                                                  <div className="">
                                                    <label className="switches">
                                                      <input
                                                        className="checkbox"
                                                        name="triggered"
                                                        checked={
                                                          rowChildren.triggered ===
                                                          "1"
                                                            ? true
                                                            : false
                                                        }
                                                        type="checkbox"
                                                        onChange={(e) =>
                                                          inputChangeParentHandler(
                                                            e,
                                                            i,
                                                            parentTitle,
                                                            j,
                                                            childrenTitle,
                                                            k
                                                          )
                                                        }
                                                      />
                                                      <span
                                                        className={`sliders round pl-2`}
                                                      ></span>
                                                    </label>
                                                  </div>
                                                )}
                                                <button
                                                  className="btn btn-link-action bg-danger text-white mb-3 "
                                                  type="button"
                                                  onClick={() =>
                                                    removeFieldHandler(
                                                      i,
                                                      parentTitle,
                                                      j,
                                                      childrenTitle,
                                                      k
                                                    )
                                                  }
                                                >
                                                  <i className="ri-delete-bin-fill p-0 text-white"></i>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {rowChildren.triggered_index &&
                                          rowChildren.triggered_index.length >
                                            0 &&
                                          rowChildren.triggered_index.map(
                                            (titleIndex, indexTitle) => (
                                              <>
                                                <div
                                                  className="col-md-12"
                                                  key={indexTitle}
                                                  style={{ maxWidth: "91%" }}
                                                >
                                                  <p className="mb-0 mt-3 fw-600 fz-16">
                                                    Opsi :{" "}
                                                    {titleIndex.triggeredName}
                                                  </p>
                                                </div>

                                                {titleIndex.triggeredForm &&
                                                  titleIndex.triggeredForm
                                                    .length > 0 &&
                                                  titleIndex.triggeredForm.map(
                                                    (rowIndex, l) => (
                                                      <>
                                                        <div
                                                          className="col-md-12"
                                                          style={{
                                                            maxWidth: "91%",
                                                          }}
                                                        >
                                                          <div className="row ">
                                                            <div className="col-sm-12 col-md-2">
                                                              <div className="form-group mb-2">
                                                                <label className="col-form-label font-weight-bold">
                                                                  Nama Field
                                                                </label>
                                                                <input
                                                                  type="text"
                                                                  className="form-control"
                                                                  name="name"
                                                                  value={
                                                                    rowIndex.name
                                                                  }
                                                                  placeholder="Field"
                                                                  autoComplete="off"
                                                                  onChange={(
                                                                    e
                                                                  ) =>
                                                                    inputChangeParentHandler(
                                                                      e,
                                                                      i,
                                                                      parentTitle,
                                                                      j,
                                                                      childrenTitle,
                                                                      k,
                                                                      indexTitle,
                                                                      l
                                                                    )
                                                                  }
                                                                  required
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
                                                                  value={
                                                                    rowIndex.element
                                                                  }
                                                                  onChange={(
                                                                    e
                                                                  ) =>
                                                                    inputChangeParentHandler(
                                                                      e,
                                                                      i,
                                                                      parentTitle,
                                                                      j,
                                                                      childrenTitle,
                                                                      k,
                                                                      indexTitle,
                                                                      l
                                                                    )
                                                                  }
                                                                  required
                                                                  disabled={
                                                                    rowIndex.triggered ===
                                                                    "1"
                                                                      ? true
                                                                      : false
                                                                  }
                                                                >
                                                                  <option
                                                                    value=""
                                                                    disabled
                                                                    selected
                                                                  >
                                                                    -- PILIH --
                                                                  </option>
                                                                  {element.map(
                                                                    (el, i) =>
                                                                      el.value !==
                                                                        "triggered" && (
                                                                        <option
                                                                          key={
                                                                            i
                                                                          }
                                                                          value={
                                                                            el.value
                                                                          }
                                                                        >
                                                                          {
                                                                            el.name
                                                                          }
                                                                        </option>
                                                                      )
                                                                  )}
                                                                </select>
                                                              </div>
                                                            </div>
                                                            <div className="col-sm-12 col-md-2">
                                                              <div className="form-group mb-2">
                                                                <label className="col-form-label font-weight-bold">
                                                                  Ukuran Form
                                                                </label>
                                                                <select
                                                                  className="form-control"
                                                                  name="size"
                                                                  value={
                                                                    rowIndex.size
                                                                  }
                                                                  onChange={(
                                                                    e
                                                                  ) =>
                                                                    inputChangeParentHandler(
                                                                      e,
                                                                      i,
                                                                      parentTitle,
                                                                      j,
                                                                      childrenTitle,
                                                                      k,
                                                                      indexTitle,
                                                                      l
                                                                    )
                                                                  }
                                                                  required
                                                                  disabled
                                                                >
                                                                  <option
                                                                    value=""
                                                                    disabled
                                                                    selected
                                                                  >
                                                                    -- PILIH --
                                                                  </option>
                                                                  {size.map(
                                                                    (
                                                                      siz,
                                                                      i
                                                                    ) => (
                                                                      <option
                                                                        key={i}
                                                                        value={
                                                                          siz.value
                                                                        }
                                                                      >
                                                                        {
                                                                          siz.name
                                                                        }
                                                                      </option>
                                                                    )
                                                                  )}
                                                                </select>
                                                              </div>
                                                            </div>

                                                            {renderMultipleHandler(
                                                              rowIndex,
                                                              i,
                                                              parentTitle,
                                                              j,
                                                              childrenTitle,
                                                              k,
                                                              indexTitle,
                                                              l
                                                            )}
                                                            <div className="col-sm-6 col-md-2">
                                                              <label className="col-form-label font-weight-bold ml-md-10">
                                                                Req
                                                              </label>
                                                              <div className="d-flex align-items-end justify-content-between">
                                                                <div className="form-group ml-md-10">
                                                                  <div className="form-check form-check-inline">
                                                                    <input
                                                                      type="checkbox"
                                                                      name="required"
                                                                      checked={
                                                                        rowIndex.required ===
                                                                        "1"
                                                                          ? true
                                                                          : false
                                                                      }
                                                                      className="form-check-input"
                                                                      onChange={(
                                                                        e
                                                                      ) =>
                                                                        inputChangeParentHandler(
                                                                          e,
                                                                          i,
                                                                          parentTitle,
                                                                          j,
                                                                          childrenTitle,
                                                                          k,
                                                                          indexTitle,
                                                                          l
                                                                        )
                                                                      }
                                                                    />
                                                                  </div>
                                                                </div>
                                                                <button
                                                                  className="btn btn-link-action bg-danger text-white mb-3 "
                                                                  type="button"
                                                                  onClick={() =>
                                                                    removeFieldHandler(
                                                                      i,
                                                                      parentTitle,
                                                                      j,
                                                                      childrenTitle,
                                                                      k,
                                                                      indexTitle,
                                                                      l
                                                                    )
                                                                  }
                                                                >
                                                                  <i className="ri-delete-bin-fill p-0 text-white"></i>
                                                                </button>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </>
                                                    )
                                                  )}
                                                <div
                                                  className="col-md-12 my-2"
                                                  style={{ maxWidth: "91%" }}
                                                >
                                                  <button
                                                    className="btn btn-outline-primary px-10 btn-sm rounded-xl font-weight-bolder"
                                                    type="button"
                                                    onClick={() =>
                                                      addFieldTriggeredHandler(
                                                        i,
                                                        parentTitle,
                                                        j,
                                                        childrenTitle,
                                                        k,
                                                        indexTitle
                                                      )
                                                    }
                                                  >
                                                    <i className="ri-add-line"></i>{" "}
                                                    Tambah Field
                                                  </button>
                                                </div>
                                              </>
                                            )
                                          )}
                                      </>
                                    )
                                  )}

                                <div
                                  className="col-md-12 my-2"
                                  style={{ maxWidth: "94%" }}
                                >
                                  <button
                                    className="btn btn-outline-primary px-10 btn-sm rounded-xl font-weight-bolder"
                                    type="button"
                                    onClick={() =>
                                      addFieldTriggeredHandler(
                                        i,
                                        parentTitle,
                                        j,
                                        childrenTitle
                                      )
                                    }
                                  >
                                    <i className="ri-add-line"></i> Tambah Field
                                  </button>
                                </div>
                              </>
                            )
                          )}
                      </>
                    ))}

                  <div className="col-md-12 my-2" style={{ maxWidth: "97%" }}>
                    <button
                      className="btn btn-outline-primary px-10 btn-sm rounded-xl font-weight-bolder"
                      type="button"
                      onClick={() => addFieldTriggeredHandler(i, parentTitle)}
                    >
                      <i className="ri-add-line"></i> Tambah Field
                    </button>
                  </div>
                </>
              ))}

            <div className="col-md-12">
              <hr />
            </div>
          </>
        ))}
      </div>

      <div className="form-group mb-9 mt-10">
        <div className="text-right">
          <button
            className="btn btn-light-success mr-2"
            type="button"
            style={{ borderRadius: "30px", fontWeight: "600" }}
            onClick={showPreviewHandler}
          >
            Preview
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
    </>
  );
};

export default FormManual;
