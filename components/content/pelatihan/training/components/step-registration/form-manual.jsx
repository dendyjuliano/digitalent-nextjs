import React, { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";

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

  const inputChangeHandler = (e, index) => {
    const { value, name, checked } = e.target;
    const list = [...formBuilder];
    list[index][name] = value;
    if (name === "required") {
      let check = checked === true ? "1" : "0";
      list[index]["required"] = check;
    }
    funcFormBuilder(list);
  };

  const removeFieldHandler = (index) => {
    const list = [...formBuilder];
    list.splice(index, 1);
    list.forEach((row, i) => {
      let key = i + 1;
      list[i]["key"] = key;
    });
    funcFormBuilder(list);
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
              onChange={(e) => inputChangeHandler(e, i)}
              required
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

  const showPreviewHandler = () => {
    let list = [...formBuilder];
    list.forEach((row, i) => {
      if (row.option === "manual") {
        let dataOption = row.dataOption.split(";");
        row.dataOption = dataOption;
      }
    });
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
        required: "0",
      },
    ]);
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
                onChange={(e) => inputChangeHandler(e, i)}
                required
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
              <label className="col-form-label font-weight-bold">Size</label>
              <select
                className="form-control"
                name="size"
                value={row.size}
                onChange={(e) => inputChangeHandler(e, i)}
                required
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
            <label className="col-form-label font-weight-bold ml-md-10">
              Required
            </label>
            <div className="d-flex align-items-end justify-content-between">
              <div className="form-group ml-md-10">
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    name="required"
                    checked={row.required === "1" ? true : false}
                    className="form-check-input"
                    onChange={(e) => inputChangeHandler(e, i)}
                  />
                </div>
              </div>
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
          <div className="col-md-12">
            <hr />
          </div>
        </div>
      ))}

      <div className="form-group mb-9 mt-10">
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
    </>
  );
};

export default FormManual;
