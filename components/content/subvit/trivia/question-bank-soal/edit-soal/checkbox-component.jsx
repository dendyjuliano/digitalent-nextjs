import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { helperRegexNumber } from "../../../../../../utils/middleware/helper";

const CheckboxComponent = ({
  propsAnswer,
  propsStatus,
  propsDuration,
  propsAnswerKey,
  sendPropsAnswer,
  sendPropsStatus,
  sendPropsDuration,
  setPropsAnswerKey,
}) => {
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

  const [answer, setAnswer] = useState(propsAnswer);
  const [answerKey, setAnswerKey] = useState(propsAnswerKey);
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
    let values = 0;
    if (value === "" || helperRegexNumber.test(value)) {
      values = value;
    }
    const list = [...answer];
    list[index][name] = values;
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

  const handleAnswer = (value, i) => {
    const list = [...answer];
    list[i]["is_right"] = value;
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
                  {row.image_preview != "" && (
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
                  )}
                  <div className="col-md-7 pt-2">
                    <input
                      type="text"
                      name="option"
                      className="form-control"
                      placeholder={`Jawaban ` + row.key}
                      value={row.option}
                      onChange={(e) => handleInputChange(e, i)}
                      autoComplete="off"
                    />
                    <div className="custom-file mt-2">
                      <span>Gambar Pertanyaan (Opsional)</span>
                      <input
                        type="file"
                        className="custom-file-input"
                        name="question_image"
                        accept="image/png, image/gif, image/jpeg , image/jpg"
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {row.image_name || "Pilih Gambar"}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-end mb-3">
                    <div className="col-md-4 mb-0">
                      <span className="font-weight-bold">Nilai</span>
                      <input
                        type="text"
                        min={0}
                        className="form-control"
                        name="value"
                        value={row.value}
                        onChange={(e) => handleInputChange(e, i)}
                        autoComplete="off"
                      />
                    </div>
                    <button
                      className="btn btn-link-action bg-danger text-white"
                      type="button"
                      onClick={() => handleRemoveClick(i)}
                    >
                      <i className="ri-delete-bin-fill p-0 text-white"></i>
                    </button>
                    {/* <div className="ml-3">
                        <SwitchButton
                          checked={row.is_right}
                          onlabel=" "
                          onstyle="primary"
                          offlabel=" "
                          offstyle="secondary"
                          size="sm"
                          width={10}
                          height={10}
                          onChange={(checked) => handleAnswer(checked, i)}
                        />
                      </div> */}
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
        </div>
        <div className="col-sm-12 col-md-12 mt-3">
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

export default CheckboxComponent;
