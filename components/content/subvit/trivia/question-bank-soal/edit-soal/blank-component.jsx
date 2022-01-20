import React, { useState } from "react";
import Image from "next/image";
import {
  helperRegexNumber,
  helperTextLimitMax,
} from "../../../../../../utils/middleware/helper";

const BlankComponent = ({
  propsAnswer,
  propsStatus,
  propsDuration,
  sendPropsAnswer,
  sendPropsStatus,
  sendPropsDuration,
}) => {
  const [answer, setAnswer] = useState(propsAnswer);
  const [status, setStatus] = useState(propsStatus);
  const [duration, setDuration] = useState(propsDuration);

  const handleRemoveClick = (index) => {
    const list = [...answer];
    list.splice(index, 1);
    setAnswer(list);
    sendPropsAnswer(list);
  };

  const handleAddClick = () => {
    const lastobj = answer[answer.length - 1];
    const keyindex = lastobj.key.charCodeAt(0);
    const newKey = String.fromCharCode(keyindex + 1);
    setAnswer([
      ...answer,
      { key: newKey, question: "", image: "", is_right: false },
    ]);
    sendPropsAnswer([
      ...answer,
      { key: newKey, question: "", image: "", is_right: false },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answer];
    list[index][name] = value;
    if (name === "question_image") {
      if (e.target.files[0]) {
        list[index]["image_preview"] = URL.createObjectURL(e.target.files[0]);
        list[index]["image_name"] = e.target.files[0].name;
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            list[index]["image"] = reader.result;
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
    setAnswer(list);
    sendPropsAnswer(list);
  };

  const handleDuration = (e) => {
    if (e.target.value === "" || helperRegexNumber.test(e.target.value)) {
      e.target.value = Math.max(
        Number(e.target.min),
        Math.min(Number(e.target.max), Number(e.target.value))
      );
      if (e.target.value < 30) {
        setDuration(e.target.value);
        sendPropsDuration(30);
      } else {
        setDuration(e.target.value);
        sendPropsDuration(e.target.value);
      }
    }
  };

  return (
    <>
      <div className="answer mt-5">
        {answer &&
          answer.map((row, i) => {
            return (
              <>
                <div className="title row">
                  {row.image != "" ? (
                    <div className="col-md-2 p-0 pl-3">
                      <Image
                        src={
                          row.image_preview.includes("blob")
                            ? row.image_preview
                            : process.env.END_POINT_API_IMAGE_SUBVIT +
                              row.image_preview
                        }
                        alt="logo"
                        width={148}
                        height={90}
                        objectFit="cover"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-md-7 pt-2">
                    <select
                      name="type"
                      className="form-control"
                      value={row.type}
                      placeholder={row.key}
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      <option value="" disabled selected>
                        -- PILIHAN TIPE --
                      </option>
                      <option value="Percis">Percis</option>
                      <option value="Mengandung">Mengandung</option>
                      <option value="Sama Dengan">Sama Dengan</option>
                    </select>
                    <input
                      type="text"
                      name="option"
                      className="form-control mt-2"
                      placeholder={`Jawaban ` + row.key}
                      value={row.option}
                      onChange={(e) => handleInputChange(e, i)}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-md-3 d-flex align-items-end mb-3">
                    <div className="col-md-4">
                      <span className="font-weight-bold">Nilai</span>
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        name="value"
                        value={row.value}
                        onChange={(e) => handleInputChange(e, i)}
                        autoComplete="off"
                      />
                    </div>
                    <button
                      className="btn btn-link-action bg-danger text-white ml-3"
                      type="button"
                      onClick={() => handleRemoveClick(i)}
                    >
                      <i className="ri-delete-bin-fill p-0 text-white"></i>
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>

      {answer.length < 6 ? (
        <div className="button-add my-4">
          <button
            type="button"
            className="btn btn-rounded-full bg-blue-secondary text-white btn-sm"
            onClick={() => handleAddClick()}
          >
            <i className="ri-add-fill text-white"></i> Tambah Jawaban
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="form-group">
        <div className="col-sm-12 col-md-12">
          <span className="font-weight-bold">Durasi (Detik)</span>
          <input
            type="text"
            min="0"
            max="300"
            value={duration}
            onChange={(e) => {
              handleDuration(e);
            }}
            className="form-control"
          />
          {duration < 30 && duration > 0 && (
            <span className="text-danger">
              Jika waktu kurang dari 30 detik, Waktu akan otomatis 30 detik
            </span>
          )}
        </div>
        <div className="col-sm-12 col-md-12 mt-4">
          <span className="font-weight-bold">Status</span>
          <select
            name="training_id"
            className="form-control"
            onChange={(e) => {
              setStatus(e.target.value);
              sendPropsStatus(e.target.value);
            }}
            onBlur={(e) => {
              setStatus(e.target.value);
              sendPropsStatus(e.target.value);
            }}
            value={status}
          >
            <option selected disabled value="">
              -- Status --
            </option>
            <option value={1}>Publish</option>
            <option value={0}>Draft</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default BlankComponent;
