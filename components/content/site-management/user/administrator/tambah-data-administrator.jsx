import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import Image from "next/image";
import IconPlus from "../../../../../public/assets/icon/Plus.svg";
import IconMinus from "../../../../../public/assets/icon/Minus.svg";
import Select from "react-select";


const TambahApi = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [unitWork, setUnitWork] = useState("");
  const [statusAcademy, setStatusAcademy] = useState([]);
  console.log("statusAcademy",statusAcademy)
  const [typeAccess, setTypeAccess] = useState("")
  const [pelatihan, setPelatihan] = useState([]);
  const allUnitWorkList = useSelector((state) => state.allUnitWorkList);
  console.log("allUnitWorkList", allUnitWorkList);
  const allRolesList = useSelector((state) => state.allRolesList);
  console.log("allRolesList", allRolesList);
  const allAcademyList = useSelector((state) => state.allAcademyList);
  console.log("allAcademyList", allAcademyList);

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

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

  const changeListAcademy = (e)=>{
    console.log("e,index",e)
    setStatusAcademy(e)
  }

   const handleSubmit = () => {
    
    if (name === "") {
      Swal.fire(
        "Gagal simpan",
        "Nama lengkap tidak boleh kosong",
        "error"
      );
    } else if (email === "") {
      Swal.fire("Gagal simpan", "Email tidak boleh kosong", "error");
    } 
    else if (status === "") {
      Swal.fire("Gagal simpan", "Status tidak boleh kosong", "error");
    } 
    else if (password === "") {
      Swal.fire("Gagal simpan", "Password tidak boleh kosong", "error");
    } 
    else if (confirmPassword === "") {
      Swal.fire("Gagal simpan", "Konfirmasi password tidak boleh kosong", "error");
    } 
    else if (role === "") {
      Swal.fire("Gagal simpan", "Role  tidak boleh kosong", "error");
    } 
    else if (unitWork === "") {
      Swal.fire("Gagal simpan", "Satuan kerja tidak boleh kosong", "error");
    } 
    else {
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
            name: nameZonation,
            status: status,
            data: valueSend,
          };
          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_SITE_MANAGEMENT}api/zonasi/store`,
              sendData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(
              () => {
                router.push(
                  `/site-management/master-data/master-zonasi`
                );
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
              Tambah Data Administrator
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <form>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={() => setName(e.target.value)}
                  className="form-control"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Masukkan email"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={status}
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="position-relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="input-password"
                    className="form-control"
                    placeholder="Masukkan password"
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
              </div>
              <div className="form-group mb-2">
                <label>Konfirmasi Password</label>
                 <div className="position-relative">
                  <input
                    id="confirm-input-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="Masukkan konfirmasi password"
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
              <p style={{color:"#b7b5cf"}}>
                Min 8 Karakter,<br/>
                Case Sensitivity (min t.d 1 Uppercase, 1 lowercase)<br/>
                Min 1 Symbol/angka
              </p>
              <div className="form-group">
                <label>Role</label>
                <select onChange={(e)=>setRole(e.target.value)} className="form-control">
                  <option value="">Pilih Roles</option>
                  {allRolesList.data.list_role.map((items, index) => {
                    return (
                      <option key={index} value={items.id}>
                        {items.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label>Satuan Kerja</label>
                <select onChange={(e)=>setUnitWork(e.target.value)} className="form-control">
                  <option value="">Pilih Satuan Kerja</option>
                  {allUnitWorkList.data.unit_work.map((items, index) => {
                    return <option key={index} value={items.id}>{items.name}</option>;
                  })}
                </select>
              </div>{" "}
              {/* hak akses disini */}
              <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
                Hak Akses Pelatihan
              </h3>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation" onClick={()=>setTypeAccess("akademi")}>
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Akademi
                  </a>
                </li>
                <li className="nav-item" role="presentation" onClick={()=>setTypeAccess("pelatihan")}>
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Pelatihan
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="form-group mt-6">
                    <label >Status</label>
                    <Select 
                              value={statusAcademy}
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder="Pilih status"
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
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="table-page mt-5">
                    <div className="table-responsive">
                      <div className="table-filter">
                        <div className="row align-items-center">
                          <div className="col-lg-12 col-xl-12">
                            <form
                              className="d-flex align-items-center w-100"
                            >
                              <div className="row w-100">
                                <div className="col-12 col-sm-6">
                                  <div className="position-relative overflow-hidden w-100">
                                    <IconSearch
                                      style={{ left: "10" }}
                                      className="left-center-absolute"
                                    />
                                    <input
                                      id="kt_datatable_search_query"
                                      type="text"
                                      className="form-control pl-10"
                                      placeholder="Ketik disini untuk Pencarian..."
                                      // onChange={(e) =>
                                      //   handleChangeValueSearch(e.target.value)
                                      // }
                                    />
                                    <button
                                      type="handleSubmit"
                                      className="btn bg-blue-primary text-white right-center-absolute"
                                      style={{
                                        borderTopLeftRadius: "0",
                                        borderBottomLeftRadius: "0",
                                      }}
                                    >
                                      Cari
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                      <table className="table table-separate table-head-custom table-checkable mt-5">
                        <thead style={{ background: "#F3F6F9" }}>
                          <tr>
                            <th
                              colSpan="6"
                              className="text-left permision"
                              style={{ textAlignLast: "right" }}
                            >
                              Permission
                            </th>
                          </tr>
                          <tr>
                            <th className="text-left">No</th>
                            <th className="text-left">ID Pelatihan</th>
                            <th className="text-left">Nama Pelatihan</th>
                            <th className="text-left">Accsess</th>
                            <th
                              className="text-right child-permission align-middle"
                              style={{ width: "10rem" }}
                            >
                              Manage
                            </th>
                            <th
                              className="text-right child-permission align-middle"
                              style={{ width: "0" }}
                            >
                              View
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-left">1</td>

                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td
                              className="text-right child-permission align-middle"
                              style={{ width: "10rem" }}
                            >
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  checked="checked"
                                  name="Checkboxes1"
                                />
                                <span></span>
                              </label>
                            </td>
                            <td
                              className="text-right child-permission align-middle"
                              style={{ width: "0" }}
                            >
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  checked="checked"
                                  name="Checkboxes1"
                                />
                                <span></span>
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left">1</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td
                              className="text-right child-permission align-middle"
                              style={{ width: "10rem" }}
                            >
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  checked="checked"
                                  name="Checkboxes1"
                                />
                                <span></span>
                              </label>
                            </td>
                            <td
                              className="text-right child-permission align-middle"
                              style={{ width: "0" }}
                            >
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  checked="checked"
                                  name="Checkboxes1"
                                />
                                <span></span>
                              </label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
