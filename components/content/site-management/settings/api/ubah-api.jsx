import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import axios from "axios";
import IconCalender from "../../../../assets/icon/Calender";
import Select from "react-select";

const UbahApi = ({ token }) => {
  const router = useRouter();
  let selectRefListApi = null;
  let selectRefListField = null;

  const detailApi = useSelector((state) => state.detailApi);

  const [optionListField, setOptionListField] = useState([]);
  const listApi = useSelector((state) => state.listApi);
  const [optionListApi, setOptionListApi] = useState(
    listApi.listApi.map((items) => {
      return { label: items.api_url, value: items.api_url, id: items.id };
    })
  );
  const [valueFieldDefault, setValueFieldDefault] = useState(
    detailApi.apies.data.fields.map((items, index) => {
      return { label: items, value: items };
    })
  );
  const [nameApi, setNameApi] = useState(detailApi.apies.data.api_name);
  const [nameUser, setNameUser] = useState(detailApi.apies.data.username);
  const [status, setStatus] = useState(detailApi.apies.data.status);
  const [apiChoice, setApiChoice] = useState(detailApi.apies.data.id_api);
  const [defaultOptionListApi, setDefaultOptionListApi] = useState({
    label: detailApi.apies.data.api_url,
    value: detailApi.apies.data.api_url,
  });
  const [defaultValueListField, setDefaultValueListField] = useState(
    detailApi.apies.data.fields.map((items) => {
      return { label: items, value: items };
    })
  );

  const [valueField, setValueField] = useState([]);
  const [from, setFrom] = useState(detailApi.apies.data.from_date);
  const [to, setTo] = useState(detailApi.apies.data.to_date);
  const [field, setField] = useState(detailApi.apies.data.fields);

  const onChangePeriodeDateStart = (date) => {
    setFrom(moment(date).format("YYYY-MM-DD"));
  };
  const onChangePeriodeDateEnd = (date) => {
    setTo(moment(date).format("YYYY-MM-DD"));
  };

  const changeListApi = (e) => {
    setApiChoice(e.id);
    setDefaultValueListField([]);
  };

  const changeListField = (e) => {
    let resultSelect = e.map((items) => {
      return items.field_name;
    });
    setValueField(resultSelect);
    setDefaultValueListField(e);
  };

  useEffect(() => {
    if (apiChoice) {
      async function getListField(id, token) {
        try {
          let { data } = await axios.get(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/api-list/fields/${id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          let optionListFieldResult = data.data.map((items) => {
            return {
              ...items,
              label: items.field_name,
              value: items.field_name,
            };
          });

          setOptionListField(optionListFieldResult);
        } catch (error) {
          return;
        }
      }

      getListField(apiChoice, token);
    }
  }, [apiChoice, token]);

  const submit = (e) => {
    e.preventDefault();

    if (nameApi === "") {
      Swal.fire("Gagal simpan", "Nama api tidak boleh kosong", "error");
    } else if (nameUser === "") {
      Swal.fire("Gagal simpan", "Status tidak boleh kosong", "error");
    } else if (apiChoice === "") {
      Swal.fire("Gagal simpan", "Api tidak boleh kosong", "error");
    } else if (!defaultValueListField.length) {
      Swal.fire("Gagal simpan", "Field tidak boleh kosong", "error");
    } else if (!from) {
      Swal.fire("Gagal simpan", "Field From tidak boleh kosong", "error");
    } else if (!to) {
      Swal.fire("Gagal simpan", "Field To tidak boleh kosong", "error");
    } else {
      Swal.fire({
        title: "Apakah anda yakin simpan ?",
        // text: "Data ini tidak bisa dikembalikan !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          const sendData = {
            api_name: nameApi,
            username: nameUser,
            id_api: apiChoice,
            from_date: from,
            to_date: to,
            status: status,
            fields: valueField.length === 0 ? field : valueField,
          };
          console.log("sendData", sendData);

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-api/update/${router.query.id}`,
              sendData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(
              () => {
                router.push(`/site-management/setting/api`);
              }
            );
          } catch (error) {
            Swal.fire(
              "Gagal simpan",
              `${error.response.data.message}`,
              "error"
            );
          }
        }
      });
    }
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
              Ubah API
            </h3>
          </div>
          <div className="card-body pt-0">
            <form>
              <div className="form-group">
                <label>Nama API</label>
                <input
                  value={nameApi}
                  onChange={(e) => setNameApi(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Masukan nama api"
                />
              </div>
              <div className="form-group">
                <label>Nama Pengguna</label>
                <input
                  value={nameUser}
                  onChange={(e) => setNameUser(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Masukan nama user"
                />
              </div>

              {status == "1" ? (
                <div className="form-group">
                  <label>Status</label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Nonaktif</option>
                  </select>
                </div>
              ) : (
                <div className="form-group">
                  <label>Status</label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                  >
                    <option value="0">Nonaktif</option>
                    <option value="1">Aktif</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Pilih API</label>
                <Select
                  ref={(ref) => (selectRefListApi = ref)}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
                  defaultValue={defaultOptionListApi}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  onChange={(e) => changeListApi(e)}
                  name="color"
                  options={optionListApi}
                />
              </div>

              <div className="form-group">
                <label>Field</label>
                <Select
                  value={defaultValueListField}
                  isMulti
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
                  defaultValue={defaultValueListField}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListField(e)}
                  options={optionListField}
                />
              </div>
              <div className="form-group row">
                <div className="col-12 col-sm-6">
                  <label>From</label>
                  <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                    <DatePicker
                      className="form-search-date form-control cursor-pointer"
                      onChange={(date) => onChangePeriodeDateStart(date)}
                      value={from}
                      dateFormat="YYYY-MM-DD"
                      placeholderText="From"
                      minDate={moment().toDate()}
                    />
                    <IconCalender
                      className="right-center-absolute"
                      style={{ right: "10px" }}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <label>To</label>
                  <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                    <DatePicker
                      className="form-search-date form-control cursor-pointer"
                      onChange={(date) => onChangePeriodeDateEnd(date)}
                      value={to}
                      disabled={!from}
                      dateFormat="YYYY-MM-DD"
                      placeholderText="To"
                      minDate={moment(from).toDate()}
                    />
                    <IconCalender
                      className="right-center-absolute"
                      style={{ right: "10px" }}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/setting/api">
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  onClick={(e) => submit(e)}
                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UbahApi;
