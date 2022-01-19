import React, { useState } from "react";
import styles from "../step-2/step2-trivia.module.css";

const PollingComponent = ({ answer, props_answer }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answer];
    list[index][name] = value;
    if (name === "image") {
      list[index]["imageName"] = e.target.files[0].name;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          list[index]["image"] = reader.result;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    props_answer(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...answer];
    list.splice(index, 1);
    list.forEach((row, i) => {
      let key = String.fromCharCode(65 + i);
      list[i]["key"] = key;
    });
    props_answer(list);
  };

  const handleAddClick = () => {
    const lastobj = answer[answer.length - 1];
    const keyindex = lastobj.key.charCodeAt(0);
    const newKey = String.fromCharCode(keyindex + 1);

    props_answer([
      ...answer,
      {
        key: newKey,
        option: "",
        image: "",
        imageName: "Pilih Gambar",
        is_right: false,
      },
    ]);
  };

  return (
    <>
      <div className="form-group row mt-5">
        {answer.map((x, i) => {
          return (
            <>
              <div className="col-sm-12 col-md-5">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold pb-0"
                >
                  Jawaban {x.key}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="option"
                  value={x.option}
                  placeholder={`Isi Jawaban ${x.key}`}
                  onChange={(e) => handleInputChange(e, i)}
                  autoComplete="off"
                />
              </div>
              <div className="col-sm-12 col-md-5">
                <label
                  htmlFor="staticEmail"
                  className=" col-form-label font-weight-bold pb-0"
                >
                  Input Gambar (Optional)
                </label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="image"
                    onChange={(e) => handleInputChange(e, i)}
                    accept="image/png, image/gif, image/jpeg , image/jpg"
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {x.imageName}
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-2 d-flex align-items-end ">
                {answer.length !== 1 && x.key !== "A" ? (
                  <button
                    className="btn btn-link-action bg-danger text-white mt-2"
                    type="button"
                    onClick={() => handleRemoveClick(i)}
                  >
                    <i className="ri-delete-bin-fill p-0 text-white"></i>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          );
        })}
      </div>

      <div className="form-group ">
        <div>
          {answer.length < 6 ? (
            <button
              type="button"
              className={`${styles.btnAddAnswer} btn btn-secondary-rounded-full bg-blue-secondary text-white`}
              onClick={() => handleAddClick()}
            >
              <i className={`${styles.iconTambah} ri-add-fill text-white`}></i>{" "}
              <span>Tambah Jawaban</span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default PollingComponent;
