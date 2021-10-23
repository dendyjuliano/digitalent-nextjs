import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconAdd from "../../../assets/icon/Add";
import IconDelete from "../../../assets/icon/Delete";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const Tambah = ({ token }) => {
  const router = useRouter();
  let selectRefDataReference = null;
  let selectRefDataFromReference = null;

  const detailDataReference = useSelector((state) => state.detailDataReference);
  console.log("detailDataReference", detailDataReference);
  const allOptionReferenceSite = useSelector(
    (state) => state.allOptionReferenceSite
  );
  let tempOptionsReference = allOptionReferenceSite?.data;

  // console.log("allOptionReferenceSite", allOptionReferenceSite);
  const [defaultDataReference, setDefaultDataReference] = useState([
    detailDataReference.dataReference.data_reference,
  ]);

  const [nameReference, setNameReference] = useState(
    detailDataReference.dataReference.name
  );
  const [status, setStatus] = useState(
    detailDataReference.dataReference.status
  );
  // state provinsi for set in option provinsi
  const [referenceOption, setReferenceOption] = useState([]);
  const [idReference, setIdReference] = useState(
    detailDataReference.dataReference.data_references_relasi_id
  );
  const [nameListFromReference, setNameListFromReference] = useState("");
  const [optionFromReference, setOptionFromReference] = useState([]);
  const changeListDataReference = (e) => {
    console.log("data reference parents", e.key);
    setIdReference(e.key);
    setNameListFromReference(e.value);
  };

  const manipulate1 = detailDataReference.dataReference.valueReference.map(
    (items) => {
      return { ...items, value: { label: items.value, value: items.value } };
    }
  );
  console.log("manipulate1", manipulate1);
  const transformed = manipulate1.map(
    ({ data_references_id, relasi, value, relasi_id, id }) => ({
      value: relasi,
      data_references_relasi_id: data_references_id,
      relasi_id: id,
      label: value,
    })
  );
  console.log("transformed", transformed);

  const [formReferenceAndText, setFormReferenceAndText] = useState(
    transformed.map((items) => {
      return {
        ...items,
        value: items.value.map((itemx) => {
          return { ...itemx, label: itemx.value, label_old: itemx.value };
        }),
      };
    })
  );
  console.log("formReferenceAndText", formReferenceAndText);
  const [formReferenceAndTextValue, setFormReferenceAndTextValue] = useState(
    transformed.map((items) => {
      return {
        ...items,
        value: items.value.map((itemx) => {
          return { ...itemx, label: itemx.value, label_old: itemx.value };
        }),
      };
    })
  );

  const handleAddFormReferenceText = () => {
    let _temp = [...formReferenceAndText];
    let _tempValue = [...formReferenceAndTextValue];
    _temp.push({
      relasi_id: "",
      value: [
        {
          label_old: "",
          label: "",
          value: "",
        },
      ],
    });
    _tempValue.push({
      relasi_id: "",
      value: [
        {
          label_old: "",
          label: "",
          value: "",
        },
      ],
    });
    setFormReferenceAndText(_temp);
    setFormReferenceAndTextValue(_tempValue);
  };

  const handleAddInput = (idx, index) => {
    let _temp = [...formReferenceAndText];
    let _tempValue = [...formReferenceAndTextValue];
    _temp.map((items, ids) => {
      if (ids === idx) {
        items.value.push({
          label: "",
          label_old: "",
        });
      }
    });
    _tempValue.map((items, ids) => {
      if (ids === idx) {
        items.value.push({
          label: "",
          label_old: "",
        });
      }
    });

    setFormReferenceAndText(_temp);
    setFormReferenceAndTextValue(_tempValue);
  };

  const handleCHangeNameReference = (e, index) => {
    console.log("ketika pilih data reference sub", e.key);

    let _temp = [...formReferenceAndText];
    let _tempValue = [...formReferenceAndTextValue];
    _temp[index].relasi_id = e.key;
    _tempValue[index].relasi_id = e.key;
    setFormReferenceAndText(_temp);
    setFormReferenceAndTextValue(_tempValue);
  };

  const handleChangeTextForm = (e, idx, index) => {
    let _temp = [...formReferenceAndText];
    let _tempValue = [...formReferenceAndTextValue];

    _temp[idx].value[index].value = e.target.value;
    _temp[idx].value[index].label = e.target.value;

    _tempValue[idx].value[index].value = e.target.value;
    _tempValue[idx].value[index].label = e.target.value;

    setFormReferenceAndText(_temp);
    setFormReferenceAndTextValue(_tempValue);
  };

  const handleDelete = (parent, child) => {
    let _temp = [...formReferenceAndText];
    let _tempValue = [...formReferenceAndTextValue];

    if (child === 0) {
      let resultTemp = _temp.filter((items, idz) => idz !== parent);
      setFormReferenceAndText(resultTemp);
      let resultTempValue = _tempValue.filter((items, idz) => idz !== parent);
      setFormReferenceAndText(resultTemp);
      setFormReferenceAndTextValue(resultTempValue);
    } else {
      _temp.map((items, ids) => {
        if (ids === parent) {
          items.value = items.value.filter((itemx, inc) => inc !== child);
        }
      });
      _tempValue.map((items, ids) => {
        if (ids === parent) {
          items.value = items.value.filter((itemx, inc) => inc !== child);
        }
      });
      setFormReferenceAndText(_temp);
      setFormReferenceAndTextValue(_tempValue);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (nameReference === "") {
      Swal.fire("Gagal", `Nama data reference tidak boleh kosong`, "error");
    } else if (status === "") {
      Swal.fire("Gagal", `Status tidak boleh kosong`, "error");
    } else if (idReference === "") {
      Swal.fire("Gagal", `Harus pilih data reference`, "error");
    } else {
      // let sendData = {
      //   name: nameReference,
      //   status: status,
      //   data_references_relasi_id: idReference,
      //   data: formReferenceAndText,
      // };

      formReferenceAndTextValue.map((items, index) => {
        items.value.map((itemz, idx) => {
          if (!itemz.label_old) {
            formReferenceAndTextValue[index].value[idx].label_old = itemz.value;
          }
        });
      });

      const sendData = {
        id: router.query.id,
        name: nameReference,
        status: status,
        data_references_relasi_id: idReference,
        data: formReferenceAndTextValue,
      };

      // let formData = new FormData();

      // formData.append("id", router.query.id);
      // formData.append("name", nameReference);
      // formData.append("status", status);
      // formData.append("data_references_relasi_id", idReference);

      // formInput.forEach((element,i) => {
      //   formData.append(`value_old[${i}]`, element.value_old);
      // });

      // formInput.forEach((element,i) => {
      //   formData.append(`value[${i}]`, element.value);
      // });

      try {
        let { data } = await axios.post(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}api/reference/update-relasi`,
          sendData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(() => {
          router.push("/site-management/reference");
        });
      } catch (error) {
        Swal.fire("Gagal simpan", `${error.response.data.message}`, "error");
      }
    }
  };

  useEffect(() => {
    let optionReference = tempOptionsReference?.map((items) => {
      return { ...items, label: items.value };
    });
    setReferenceOption(optionReference);
  }, [tempOptionsReference]);

  useEffect(() => {
    if (idReference) {
      async function getAllDataFromIdReference(token, id) {
        try {
          let { data } = await axios.get(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/reference-choose/${id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          let resultOptionReferenceChooce = data.data.map((items) => {
            return { ...items, label: items.value };
          });
          // console.log("data sub",data)
          setOptionFromReference(resultOptionReferenceChooce);
        } catch (error) {
          console.log(
            "error get all data reference",
            error.response.data.message
          );
        }
      }

      getAllDataFromIdReference(token, idReference);
    }
  }, [token, idReference]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Ubah Reference Dengan Relasi
            </h3>
          </div>
          <form>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Data Reference
                </label>
                <input
                  placeholder="Masukan nama data reference"
                  type="text"
                  value={nameReference}
                  className="form-control"
                  onChange={(e) => setNameReference(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                {status == 1 ? (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak aktif</option>
                  </select>
                ) : (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="0">Tidak aktif</option>
                    <option value="1">Aktif</option>
                  </select>
                )}
              </div>

              <div className="form-group">
                <label>Pilih Data Reference</label>
                <Select
                  ref={(ref) => (selectRefDataReference = ref)}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
                  defaultValue={defaultDataReference.map((items) => {
                    return { ...items, label: items.name, value: items.name };
                  })}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListDataReference(e)}
                  options={referenceOption}
                />
              </div>

              {formReferenceAndText.map((itemsRef, idx) => {
                return (
                  <div className="row" key={idx}>
                    <div className="col-12 col-sm-6">
                      <div className="form-group mt-4">
                        <label>List {nameListFromReference}</label>

                        <Select
                          ref={(ref) => (selectRefDataFromReference = ref)}
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="Pilih provinsi"
                          defaultValue={itemsRef.label}
                          isDisabled={false}
                          isLoading={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name="color"
                          onChange={(e) => handleCHangeNameReference(e, idx)}
                          options={optionFromReference}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      {itemsRef.value.map((items, index) => {
                        return (
                          <div className="form-group mt-12" key={index}>
                            <div className="position-relative d-flex align-items-start w-100">
                              <div className="w-100 mr-6">
                                <input
                                  value={items.value}
                                  type="text"
                                  className="form-control"
                                  placeholder="Masukan data value"
                                  onChange={(e) =>
                                    handleChangeTextForm(e, idx, index)
                                  }
                                />
                              </div>

                              <div className="d-flex align-items-center">
                                <button
                                  type="button"
                                  className="btn mr-4"
                                  style={{ backgroundColor: "#04AA77" }}
                                  onClick={() => handleAddInput(idx, index)}
                                >
                                  <IconAdd />
                                </button>
                                {index === 0 && idx === 0 ? (
                                  ""
                                ) : (
                                  <button
                                    type="button"
                                    className="btn"
                                    style={{ backgroundColor: "#EE2D41" }}
                                    onClick={() => handleDelete(idx, index)}
                                  >
                                    <IconDelete />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="d-flex align-items-center justify-content-end">
                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label"
                  ></label>

                  <p
                    className="btn btn-rounded-full bg-blue-secondary text-white"
                    style={{
                      backgroundColor: "#40A9FF",
                      color: "#FFFFFF",
                      width: "max-content",
                    }}
                    onClick={() => handleAddFormReferenceText()}
                  >
                    <IconAdd className="mr-3" width="14" height="14" />
                    Tambah Value
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/reference/">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={(e) => submit(e)}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Tambah;
