import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../LoadingTable";
import IconEye from "../../../assets/icon/Eye";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";
import IconSearch from "../../../assets/icon/Search";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const [array, setArray] = useState([]);
  console.log("array", array);

  const firstPush = () => {
    let _temp = [...array];

    _temp.push({
      name: "",
      link: "",
      child: [],
    });
    setArray(_temp);
  };

  const handleCreate = (index) => {
    let _temp = [...array];

    _temp.forEach((item, i) => {
      if (i === index) {
        item.child.push({
          name: "",
          link: "",
          child: [],
        });
      }
    });

    setArray(_temp);
  };

  const handleCreate2 = (index, j) => {
    let _temp = [...array];
    _temp[index].child[j].child.push({
      name: "",
      link: "",
    });
    setArray(_temp);
  };

  const handleDeletechild = (i, j, k) => {
    let _temp = [...array];
    _temp[i].child[j].child.splice(k, 1);
    setArray(_temp);
  };

  const handleDeleteChild = (i, j) => {
    let _temp = [...array];
    _temp[i].child.splice(j, 1);
    setArray(_temp);
  };

  const handleDeleteMenu = (i) => {
    let _temp = [...array];
    _temp.splice(i, 1);
    setArray(_temp);
  };

  const handleChangeInput = (e, i) => {
    console.log("e.target.value,i");
    console.log(e.target.value, i);

    let _temp = [...array];
    if (e.target.name === "inputName") {
      _temp[i].name = e.target.value;
    } else {
      _temp[i].link = e.target.value;
    }

    console.log("_temp", _temp);
    setArray(_temp);
  };

  const handleChangeInput1 = (e, i, j) => {
    console.log("e.target.value,i");
    console.log(e.target.value, i);

    let _temp = [...array];
    if (e.target.name === "inputName") {
      _temp[i].child[j].name = e.target.value;
    } else {
      _temp[i].child[j].link = e.target.value;
    }

    console.log("_temp", _temp);
    setArray(_temp);
  };

  const handleChangeInput2 = (e, i, j, k) => {
    console.log("e.target.value,i");
    console.log(e.target.value, i);

    let _temp = [...array];
    if (e.target.name === "inputName") {
      _temp[i].child[j].child[k].name = e.target.value;
    } else {
      _temp[i].child[j].child[k].link = e.target.value;
    }

    console.log("_temp", _temp);
    setArray(_temp);
  };

  // function delete
  const apiDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        // dispatch delete
      }
    });
  };

  const onNewReset = () => {
    router.replace("/site-management/setting/api", undefined, {
      shallow: true,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const sendData = { menu: array };
    // console.log("sendData",sendData)

    try {
      // const sendData = {menu:array};

      let { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-menu/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("Berhasil Simpan data", "", "success")
    } catch (error) {
      notify(error.response.data.message);
    }
  };

  const notify = (value) =>
    toast.info(`🦄 ${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


  
  useEffect(() => {
      async function getDataMenu(token) {
        try {
          let { data } = await axios.get(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-menu/all`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          setArray(data.data)
          console.log("response data berhasil",data)
        } catch (error) {
          notify(error.response.data.message);
        }
      }

      getDataMenu(token);
    }, []);
  return (
    <PageWrapper>
      <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-b">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Menu
            </h3>
            <div className="card-toolbar">
              <button
                className="btn btn-rounded-full bg-blue-primary text-white"
                onClick={() => firstPush()}
              >
                <IconAdd className="mr-3" width="14" height="14" />
                Tambah Menu
              </button>
            </div>
          </div>
          <div className="card-body pt-0 mt-10">
            <form onSubmit={submit}>
              {array.map((parrent, i) => {
                return (
                  <div key={i}>
                    <div>
                      <div className="row">
                        <div className="col-md-12 col-xl-5">
                          <div className="form-group">
                            <label>Menu {i + 1}</label>
                            <input
                            value={parrent.name}
                              name="inputName"
                              onChange={(e) => handleChangeInput(e, i)}
                              type="text"
                              className="form-control"
                              placeholder="Masukan Menu"
                            />
                            {/* <span className="form-text text-muted">
                            Please enter your full name
                          </span> */}
                          </div>
                        </div>
                        <div className="col-md-12 col-xl-5">
                          <div className="form-group">
                            <label>Link {i + 1}</label>
                            <input
                            value={parrent.link}
                              name="inputLink"
                              onChange={(e) => handleChangeInput(e, i)}
                              type="text"
                              className="form-control"
                              placeholder="Masukan link"
                            />
                            {/* <span className="form-text text-muted">
                            Please enter your full name
                          </span> */}
                          </div>
                        </div>
                        <div className="col-md-12 col-xl-2">
                          <div className="d-flex align-items-center h-100">
                            <button
                              type="button"
                              className="btn mr-4 mb-5"
                              style={{ backgroundColor: "#4299E1" }}
                              onClick={() => handleCreate(i)}
                            >
                              <IconAdd />
                            </button>
                            <button
                              type="button"
                              className="btn mr-4 mb-5 minimal-image"
                              style={{ backgroundColor: "#4299E1" }}
                              onClick={() => handleCreate(i)}
                            >
                              <Image
                                src="/assets/icon/link.svg"
                                alt="link"
                                width={16}
                                height={16}
                              />
                            </button>
                            <button
                              type="button"
                              className="btn mb-5"
                              style={{ backgroundColor: "#EE2D41" }}
                              onClick={() => handleDeleteMenu(i)}
                            >
                              <IconDelete />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {parrent.child.map((child, j) => {
                      return (
                        <div key={j}>
                          <div className="row pl-10">
                            <div className="col-md-12 col-xl-5">
                              <div className="form-group">
                                <label>Sub Menu{j + 1}</label>
                                <input
                                  onChange={(e) => handleChangeInput1(e, i, j)}
                                  name="inputName"
                                  type="text"
                                  value={child.name}
                                  className="form-control"
                                  placeholder="Masukan sub menu"
                                />
                                {/* <span className="form-text text-muted">
                                Please enter your full name
                              </span> */}
                              </div>
                            </div>
                            <div className="col-md-12 col-xl-5">
                              <div className="form-group">
                                <label>Sub Link {j + 1}</label>
                                <input
                                value={child.link}
                                  onChange={(e) => handleChangeInput1(e, i, j)}
                                  name="inputLink"
                                  type="text"
                                  className="form-control"
                                  placeholder="Masukan sub link"
                                />
                                {/* <span className="form-text text-muted">
                                Please enter your full name
                              </span> */}
                              </div>
                            </div>
                            <div className="col-md-12 col-xl-2">
                              <div className="d-flex align-items-center h-100">
                                <button
                                  type="button"
                                  className="btn mr-4 mb-5"
                                  style={{ backgroundColor: "#4299E1" }}
                                  onClick={() => handleCreate2(i, j)}
                                >
                                  <IconAdd />
                                </button>
                                <button
                                  type="button"
                                  className="btn mb-5"
                                  style={{ backgroundColor: "#EE2D41" }}
                                  onClick={() => handleDeleteChild(i, j)}
                                >
                                  <IconDelete />
                                </button>
                              </div>
                            </div>
                          </div>

                          {child.child.map((child, k) => {
                            return (
                              <div className="row pl-20" key={k}>
                                <div className="col-md-12 col-xl-5">
                                  <div className="form-group">
                                    <label>Sub Sub Menu {k + 1}</label>
                                    <input
                                      onChange={(e) =>
                                        handleChangeInput2(e, i, j, k)
                                      }
                                      name="inputName"
                                      type="text"
                                      className="form-control"
                                      placeholder="Masukan sub sub menu"
                                    />
                                    {/* <span className="form-text text-muted">
                                    Please enter your full name
                                  </span> */}
                                  </div>
                                </div>
                                <div className="col-md-12 col-xl-5">
                                  <div className="form-group">
                                    <label>Sub Sub Link {k + 1}</label>
                                    <input
                                      onChange={(e) =>
                                        handleChangeInput2(e, i, j, k)
                                      }
                                      name="inputLink"
                                      type="text"
                                      className="form-control"
                                      placeholder="Masukan sub sub link"
                                    />
                                    {/* <span className="form-text text-muted">
                                    Please enter your full name
                                  </span> */}
                                  </div>
                                </div>
                                <div className="col-md-12 col-xl-2">
                                  <div className="d-flex align-items-center h-100">
                                    <button
                                      type="button"
                                      className="btn mb-5"
                                      style={{ backgroundColor: "#EE2D41" }}
                                      onClick={() => handleDeletechild(i, j, k)}
                                    >
                                      <IconDelete />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/setting">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    // onClick={(e) => handleSubmit(e)}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;