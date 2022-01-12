import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import IconSearch from "../../../../assets/icon/Search";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import {
  getDetailAdminSite,
  getListRoles,
  getListUnitWorks,
  getListAcademy,
  getAllListPelatihan,
} from "../../../../../redux/actions/site-management/user/admin-site.action";
import SimpleReactValidator from "simple-react-validator";
import Cookies from "js-cookie";

const TambahApi = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const allUnitWorkList = useSelector((state) => state.allUnitWorkList);

  const allRolesList = useSelector((state) => state.allRolesList);

  const allAcademyList = useSelector((state) => state.allAcademyList);

  const allListPelatihan = useSelector((state) => state.allListPelatihan);

  const editAdminSite = useSelector((state) => state.editAdminSite);

  const [trainings, setTrainings] = useState(
    editAdminSite?.adminSite?.data.training_access.filter((item) => {
      return item.manage === 1;
    })
  );
  const [name, setName] = useState(editAdminSite?.adminSite?.data?.name);
  const [email, setEmail] = useState(editAdminSite?.adminSite?.data?.email);
  const [search, setSearch] = useState(null);
  const [status, setStatus] = useState(editAdminSite?.adminSite?.data?.status);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleOption, setRoleOption] = useState(
    editAdminSite?.adminSite?.data?.roles.map((items) => {
      return { value: items.id, label: items.name, id: items.id };
    })
  );
  const [role, setRole] = useState(
    editAdminSite?.adminSite?.data?.roles?.map((items) => {
      return items.id;
    })
  );
  const [unitWork, setUnitWork] = useState(
    editAdminSite?.adminSite?.data?.unit_works?.map((items) => {
      return items.id;
    })
  );
  const [unitWorkOption, setUnitWorkOption] = useState(
    editAdminSite?.adminSite?.data?.unit_works?.map((items) => {
      return { value: items.id, label: items.name, id: items.id };
    })
  );

  const [akademi, setAkademi] = useState(
    editAdminSite?.adminSite?.data?.training_access?.map((items) => {
      return items.id;
    })
  );

  const [akademiAkses, setAkademiAkses] = useState(
    editAdminSite?.adminSite?.data?.type_access === "akademi"
      ? editAdminSite?.adminSite?.data?.training_access?.map((items) => {
        return { value: items.id, label: items.name, id: items.id };
      })
      : null
  );
  const [statusAcademy, setStatusAcademy] = useState([]);
  const [typeAccess, setTypeAccess] = useState(
    editAdminSite?.adminSite?.data?.type_access
  );
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  const [formData, setFormData] = useState({
    name: editAdminSite?.adminSite?.data?.name,
    email: editAdminSite?.adminSite?.data?.email,
    status: editAdminSite?.adminSite?.data?.status,
    password: "",
    confirmPassword: "",
    roleOption: allRolesList?.data?.list_role?.map((items) => {
      return { ...items, label: items.name, value: items.name };
    }),
    role: editAdminSite?.adminSite?.data?.roles?.map((items) => {
      return { ...items, value: items.name, label: items.name };
    }),
    unitWorkOption: allUnitWorkList?.data?.unit_work?.map((items) => {
      return { ...items, label: items.name, value: items.name };
    }),
    unitWorksIds: editAdminSite?.adminSite?.data?.unit_work_ids,
    typeAcces: editAdminSite?.adminSite?.data?.type_access,
    trainingAccess: editAdminSite?.adminSite?.data?.training_access,
    academyIds: editAdminSite?.adminSite?.data?.academy_ids,
  });

  const sortListPelatihan = allListPelatihan.data
    .map((items) => {
      return {
        ...items,
        manage: false,
        view: false,
        allSelect: false,
      };
    })
    .map((item) => {
      trainings?.filter((filter) => {
        if (filter.id === item.value) {
          item.manage = true
          item.view = true
          item.allSelect = true
        }
      });
      return {
        ...item,
      };
    })

  // const [sortListPelatihan, setSortListPelatihan] = useState(
  //   allListPelatihan.data
  //     .map((items) => {
  //       return {
  //         ...items,
  //         manage: false,
  //         view: false,
  //         allSelect: false,
  //       };
  //     })
  //     .map((item) => {
  //       trainings?.filter((filter) => {
  //         if (filter.id === item.value) {
  //           item.manage = true
  //           item.view = true
  //           item.allSelect = true
  //         }
  //       });
  //       return {
  //         ...item,
  //       };
  //     })
  // );
  const [, forceUpdate] = useState();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const handleChangeRole = (e) => {
    let data = e.map((items) => {
      return items.id;
    });
    setRole(data);
    setRoleOption(e);
  };
  const handleChangeUnitWork = (e) => {
    let data = e.map((items) => {
      return items.id;
    });
    setUnitWork(data);
    setUnitWorkOption(e);
  };

  const changeListAcademy = (e) => {
    let data = e.map((items) => {
      return items.value;
    });
    setAkademi(data);
    setAkademiAkses(e);
  };

  useEffect(() => {
    // dispatch(getDetailAdminSite(router.query.id, token));
    // dispatch(getListRoles(token));
    dispatch(getListUnitWorks(token));
    dispatch(getListAcademy(token));
    dispatch(getAllListPelatihan(token));
  }, [router.query.id, token, dispatch]);

  const handlerShowPassword = (value) => {
    setHidePassword(value);
    var input = document.getElementById("input-password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const handlerShowPasswordConfirm = (value) => {
    setHidePasswordConfirm(value);
    var input = document.getElementById("confirm-input-password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const handleChangePelatihan = (e, index) => {
    let _temp = [...sortListPelatihan];
    if (e.target.name === "select-all") {
      if (_temp[index].allSelect) {
        _temp[index] = {
          ..._temp[index],
          allSelect: false,
          view: false,
          manage: false,
        };
      } else {
        _temp[index] = {
          ..._temp[index],
          allSelect: true,
          view: true,
          manage: true,
        };
      }
    } else if (e.target.name === "select-manage") {
      if (_temp[index].manage) {
        _temp[index] = { ..._temp[index], manage: false };
      } else {
        _temp[index] = { ..._temp[index], manage: true };
      }
    } else {
      if (_temp[index].view) {
        _temp[index] = { ..._temp[index], view: false };
      } else {
        _temp[index] = { ..._temp[index], view: true };
      }
    }
    setSortListPelatihan(_temp);
  };

  const handleSubmit = async () => {
    let newData = sortListPelatihan?.map((items) => {
      return { ...items, training_id: items.value };
    });

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password harus sama dengan Confirmation Password !",
      });
    } else {
      if (simpleValidator.current.allValid()) {
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
            if (typeAccess === "akademi") {
              const sendData = {
                id: router.query.id,
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
                role: role,
                unit_work_ids: unitWork,
                type_access: typeAccess,

                academy_ids: akademi,
                status: status,
              };
              try {
                let { data } = await axios.post(
                  `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/user/update`,
                  sendData,
                  {
                    headers: {
                      authorization: `Bearer ${token}`,
                      Permission: Cookies.get("token_permission"),
                    },
                  }
                );

                Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(
                  () => {
                    router.push(`/site-management/user/administrator`);
                  }
                );
              } catch (error) {
                Swal.fire(
                  "Gagal simpan",
                  `${error.response.data.message}`,
                  "error"
                );
              }
            } else {
              const trainings = newData.map((item) => {
                return {
                  id: item.value,
                  view: item.view === true ? 1 : 0,
                  manage: item.manage === true ? 1 : 0,
                };
              });

              const sendData = {
                id: router.query.id,
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
                role: role,
                unit_work_ids: unitWork,
                type_access: typeAccess,
                training_access: trainings,
                status: 1,
              };
              try {
                let { data } = await axios.post(
                  `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/user/update`,
                  sendData,
                  {
                    headers: {
                      authorization: `Bearer ${token}`,
                      Permission: Cookies.get("token_permission"),
                    },
                  }
                );

                Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(
                  () => {
                    router.push(`/site-management/user/administrator`);
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
          }
        });
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data dengan benar !",
        });
      }
    }
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
              Edit Data Administrator
            </h3>
          </div>
          <div className="card-body pt-0">
            {/* <form> */}
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="form-control"
                placeholder="Masukkan nama lengkap"
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("name");
                }}
              />
              {simpleValidator.current.message("name", name, "required", {
                className: "text-danger",
              })}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
                placeholder="Masukkan email"
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("email");
                }}
              />
              {simpleValidator.current.message("email", email, "required", {
                className: "text-danger",
              })}
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                value={status}
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("status");
                }}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="" selected disabled hidden>
                  Pilih status
                </option>
                <option value="1">Aktif</option>
                <option value="0">Tidak Aktif</option>
              </select>
              {simpleValidator.current.message("status", status, "required", {
                className: "text-danger",
              })}
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="position-relative">
                <input
                  type="password"
                  id="input-password"
                  className="form-control"
                  placeholder="Masukkan password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {hidePassword === true ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => handlerShowPassword(false)}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => handlerShowPassword(true)}
                  />
                )}
              </div>
              <p style={{ color: "#b7b5cf" }}>
                Min 8 Karakter,
                <br />
                Case Sensitivity (min t.d 1 Uppercase, 1 lowercase)
                <br />
                Min 1 Simbol dan Angka
              </p>
            </div>
            <div className="form-group">
              <label>Konfirmasi Password</label>
              <div className="position-relative">
                <input
                  type="password"
                  className="form-control"
                  id="confirm-input-password"
                  placeholder="Masukkan konfirmasi password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {hidePasswordConfirm === true ? (
                  <i
                    className="ri-eye-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => handlerShowPasswordConfirm(false)}
                  />
                ) : (
                  <i
                    className="ri-eye-off-fill right-center-absolute cursor-pointer"
                    style={{ right: "10px" }}
                    onClick={() => handlerShowPasswordConfirm(true)}
                  />
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Role</label>
              <Select
                value={roleOption}
                className="basic-single"
                classNamePrefix="select"
                placeholder="Pilih data role"
                isDisabled={false}
                isLoading={false}
                isMulti
                // defaultInputValue={}
                isClearable={false}
                isRtl={false}
                isSearchable={true}
                name="color"
                onChange={(e) => {
                  handleChangeRole(e);
                }}
                options={allRolesList?.data?.list_role
                  ?.filter((items) => {
                    if (items.status === 1) {
                      return {
                        ...items,
                        label: items.name,
                        value: items.name,
                      };
                    }
                  })
                  .map((item) => {
                    return { ...item, label: item.name, value: item.name };
                  })
                  .filter((item) => {
                    return !roleOption?.some((filter) => {
                      return item.label === filter.label;
                    });
                  })}
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("roleOption");
                }}
              />
              {simpleValidator.current.message(
                "roleOption",
                roleOption,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleSelect1">Satuan Kerja</label>
              <Select
                value={unitWorkOption}
                className="basic-single"
                classNamePrefix="select"
                placeholder="Pilih data satuan kerja"
                isDisabled={false}
                isLoading={false}
                isMulti
                // defaultInputValue={}
                isClearable={false}
                isRtl={false}
                isSearchable={true}
                name="color"
                onChange={(e) => handleChangeUnitWork(e)}
                options={allUnitWorkList?.data?.unit_work
                  ?.filter((items) => {
                    if (items.status === "1") {
                      return {
                        ...items,
                        label: items.name,
                        value: items.name,
                      };
                    }
                  })
                  .map((item) => {
                    return { ...item, label: item.name, value: item.name };
                  })
                  .filter((item) => {
                    return !unitWorkOption?.some((filter) => {
                      return item.label === filter.label;
                    });
                  })}
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("unitWorkOption");
                }}
              />
              {simpleValidator.current.message(
                "unitWorkOption",
                unitWorkOption,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </div>{" "}
            {/* hak akses disini */}
            <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
              Hak Akses Pelatihan
            </h3>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li
                className="nav-item"
                role="presentation"
                onClick={() => setTypeAccess("akademi")}
              >
                <a
                  className={`nav-link ${editAdminSite?.adminSite?.data?.type_access === "akademi"
                    ? "active"
                    : ""
                    }`}
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  By Akademi
                </a>
              </li>
              <li
                className="nav-item"
                role="presentation"
                onClick={() => setTypeAccess("pelatihan")}
              >
                <a
                  className={`nav-link ${editAdminSite?.adminSite?.data?.type_access ===
                    "pelatihan"
                    ? "active"
                    : ""
                    }`}
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  By Pelatihan
                </a>
              </li>
            </ul>
            { }
            <div className="tab-content" id="myTabContent">
              <div
                className={
                  editAdminSite?.adminSite?.data?.type_access === "akademi"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="form-group mt-6">
                  <label htmlFor="exampleSelect1">Akademi</label>
                  <Select
                    value={akademiAkses}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Pilih Akademi"
                    isMulti
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={true}
                    name="color"
                    onChange={(e) => changeListAcademy(e)}
                    options={allAcademyList.data.data}
                  />
                </div>
              </div>
              <div
                className={
                  editAdminSite?.adminSite?.data?.type_access === "pelatihan"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="table-page mt-5">
                  <div className="table-responsive">
                    <div className="table-filter">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-xl-12">
                          <div className="d-flex align-items-center w-100">
                            <div className="row w-100">
                              <div className="col-12 col-sm-6">
                                <div className="position-relative overflow-hidden w-100">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      dispatch(
                                        getAllListPelatihan(token, search)
                                      );
                                    }}
                                  >
                                    <IconSearch
                                      style={{ left: "10" }}
                                      className="left-center-absolute"
                                    />
                                    <input
                                      id="kt_datatable_search_query"
                                      type="text"
                                      value={search}
                                      className="form-control pl-10"
                                      placeholder="Ketik disini untuk Pencarian..."
                                      onChange={(e) =>
                                        setSearch(e.target.value)
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="btn bg-blue-primary text-white right-center-absolute"
                                      style={{
                                        borderTopLeftRadius: "0",
                                        borderBottomLeftRadius: "0",
                                      }}
                                      onClick={(e) => {
                                        dispatch(
                                          getAllListPelatihan(token, search)
                                        );
                                      }}
                                    >
                                      Cari
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <table className="table table-separate table-head-custom table-checkable mt-5">
                      <thead style={{ backgroundColor: "#F2F7FC" }}>
                        <tr>
                          <th className="align-middle fz-16 fw-600">No</th>
                          <th className="align-middle fz-16 fw-600">
                            ID Pelatihan
                          </th>
                          <th className="align-middle fz-16 fw-600">
                            Nama Pelatihan
                          </th>
                          <th className="align-middle text-center fz-16 fw-600">
                            Access
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortListPelatihan && sortListPelatihan.length === 0 ?
                          <tr>
                            <td className='align-middle text-center' colSpan={4}>Data Kosong</td>
                          </tr>
                          : sortListPelatihan.map((items, index) => {
                            return (
                              <tr key={index}>
                                <td className="py-8 border-bottom">
                                  {index + 1}
                                </td>

                                <td className="py-8 border-bottom">
                                  {items.value}
                                </td>
                                <td className="py-8 border-bottom">
                                  {items.label}
                                </td>
                                <td className="text-center py-8 border-bottom">
                                  <label className="checkbox d-flex justify-content-center">
                                    <input
                                      type="checkbox"
                                      checked={items.allSelect}
                                      name="select-all"
                                      onChange={(e) =>
                                        handleChangePelatihan(e, index)
                                      }
                                    />
                                    <span></span>
                                  </label>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* </form> */}
            <div className="form-group row mt-8">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user/administrator" passHref>
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  onClick={handleSubmit}
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

export default TambahApi;
