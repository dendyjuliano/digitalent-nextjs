import React, { useEffect, useState } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import IconUser from "../../../assets/icon/User";
import IconDoc from "../../../assets/icon/Doc";
import ImageHero from "../../../../public/assets/media/logos/hero1.png";
import ImagePlants from "../../../../public//assets/media/logos/Plants1.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboard
} from "../../../../redux/actions/partnership/dashboard.action";
import IconCompalation from '../../../../public/assets/icon/Compilation.svg'
import IconFoldercheck from '../../../../public/assets/icon/Foldercheck.svg'
import IconFolderLine from '../../../../public/assets/icon/folder-forbid-line.svg'
import IconLoading from '../../../../public/assets/icon/Loading.svg'
import IconWarningCircle from '../../../../public/assets/icon/Warningcircle.svg'
import IconStop from '../../../../public/assets/icon/Stop.svg'
import Image from "next/image";
import { BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import axios from "axios";

export default function DashboardPage() {
  let dispatch = useDispatch();
  const allDashboard = useSelector(state => state.allDashboard)
  console.log("allDashboard",allDashboard)

  const colors = ["#215480", "#4299E1","#357AB4"]
  const [ dataPieChartStatusPengajuan, setDataPieChartStatusPengajuan ] = useState ([])
  console.log("dataPieChartStatusPengajuan",dataPieChartStatusPengajuan)
  const [ dataPieChartPengajuanDisetujui, setDataPieChartPengajuanDisetujui ] = useState ([])
  console.log("dataPieChartPengajuanDisetujui",dataPieChartPengajuanDisetujui)
    

    const [errorGetData, setErrorGetData] = useState("")
    console.log("errorGetData",errorGetData)

    const fetchDashboards = async () => {
      try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/dashbord`
      );
      setDataPieChartPengajuanDisetujui([
        {
          name:"Akan Berakhir",value:data.data.cooperation_will_expired
        },
        {
          name:"Ditolak",value:data.data.cooperation_rejected
        }
      ])
      setDataPieChartStatusPengajuan([
        {
          name:"Aktif",value:data.data.cooperation_active
        },
        {
          name:"Disetujui",value:data.data.cooperation_approved
        }
      ])

    } catch (error) {
        setErrorGetData(error)
    }

    }

  useEffect(() => {
    fetchDashboards()
    dispatch(fetchDashboard())
  }, [dispatch])
  return (
    <PageWrapper>
      {/* head content */}

      <div
        className="position-relative br-12 bg-neutral py-10 px-6 overflow-hidden"
        style={{ height: "197px", maxHeight: "197px" }}
      >

        <div className="right-center-absolute">
          <Image src={ImageHero} alt="imagehero" />
        </div>

        <div className="left-bottom-absolute">
          <Image src={ImagePlants} alt="imagehero" />
        </div>

        <h5 className="text-blue-secondary fw-600 fz-18">Hallo Admin A</h5>
        <p className="text-gray-primary fw-600 fz-12">
          Sudah Makan Hari ini?
          <br />
          Kalau sudah yuk dicheck verifikasi Test untuk hari ini :)
        </p>
      </div>
      {/* sec 1 */}
      <div className="row mt-8">
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-blue-primary p-10 text-white mt-2">
            <IconUser />
            <h5 className="mt-4 fw-700 fz-24">{allDashboard.data_dashboard.data?.mitra}</h5>
            <h5 className="fw-500 fz-14">Total Mitra</h5>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-blue-dark p-10 text-white mt-2">
            <IconDoc />
            <h5 className="mt-4 fw-700 fz-24">{allDashboard.data_dashboard.data?.cooperation}</h5>
            <h5 className="fw-500 fz-14">Total Kerjasama</h5>
          </div>
        </div>
      </div>
      {/* sec 2 */}
      <div className="row mt-8">
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-white px-10 py-6 mt-2">
            <h5 className="mt-4 fw-600 fz-16 text-blue-thirty">
              Berdasarkan Pengajuan aktif dan disetujui
            </h5>
            <h5 className="fw-500 fz-14 text-gray-secondary">
              {allDashboard.data_dashboard.data?.cooperation_active + allDashboard.data_dashboard.data?.cooperation_approved } Total Aktif dan Disetujui
            </h5>
            <div className="wrapper-chart-pie">
              <span className="center-absolute fw-700 fz-24">{!allDashboard.data_dashboard.data?.cooperation_active ? 0 :allDashboard.data_dashboard.data?.cooperation_active + allDashboard.data_dashboard.data?.cooperation_approved }</span>

              <PieChart width={450} height={350}>
                                        <Pie 
                                            data={dataPieChartStatusPengajuan}
                                            // dataKey="value"
                                            // nameKey="name"
                                            cx="50%" 
                                            cy="50%" 
                                            innerRadius={60} 
                                            outerRadius={80} 
                                            paddingAngle={-10}
                                            cornerRadius={30}
                                            // cornerRadius={10}
                                            // fill="#215480"
                                        >
                                            {
                                                dataPieChartStatusPengajuan && dataPieChartStatusPengajuan.map ((el, i) => {
                                                    return(
                                                        <Cell key={i} fill={colors[i]}/>
                                                    )
                                                })
                                            } 
                                        </Pie>
                                        
                                    </PieChart>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="d-flex align-items-center justify-content-start justify-content-sm-center">
                <div className="d-flex align-items-center">
                  <div
                    className="br-5 bg-blue-primary d-flex justify-content-center align-items-center"
                    style={{ minWidth: "44px", height: "44px" }}
                  >
                    <Image src={IconCompalation} alt="IconCompalation" />
                  </div>

                  <div className="ml-4">
                    <p className="mb-0 fz-16 fw-600 text-blue-primary">{allDashboard.data_dashboard.data?.cooperation_active}</p>
                    <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                      Aktif
                    </p>
                  </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="d-flex align-items-center justify-content-start justify-content-sm-center">
                <div className="d-flex align-items-center">
                  <div
                    className="br-5 bg-blue-extras d-flex justify-content-center align-items-center"
                    style={{ minWidth: "44px", height: "44px" }}
                  >
                    <Image src={IconFoldercheck} alt="IconFoldercheck" />
                  </div>

                  <div className="ml-4">
                    <p className="mb-0 fz-16 fw-600 text-blue-primary">{allDashboard.data_dashboard.data?.cooperation_approved}</p>
                    <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                      Disetujui
                    </p>
                  </div>
                </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="br-12 bg-white px-10 py-6 mt-2">
            <h5 className="mt-4 fw-600 fz-16 text-blue-thirty">
              Berdasarkan Pengajuan Akan Berakhir & Ditolak    
            </h5>
            <h5 className="fw-500 fz-14 text-gray-secondary">
              {allDashboard.data_dashboard.data?.cooperation_will_expired + allDashboard.data_dashboard.data?.cooperation_rejected} Akan Berakhir & Ditolak
            </h5>
            <div className="wrapper-chart-pie">
              <span className="center-absolute fw-700 fz-24">{!allDashboard.data_dashboard.data?.cooperation_will_expired ? 0 :allDashboard.data_dashboard.data?.cooperation_will_expired + allDashboard.data_dashboard.data?.cooperation_rejected}</span>

              <PieChart width={450} height={350}>
                                        <Pie 
                                            data={dataPieChartPengajuanDisetujui}
                                            // dataKey="value"
                                            // nameKey="name"
                                            cx="50%" 
                                            cy="50%" 
                                            innerRadius={60} 
                                            outerRadius={80} 
                                            paddingAngle={-10}
                                            cornerRadius={30}
                                            // fill="#215480"
                                        >
                                            {
                                                dataPieChartPengajuanDisetujui && dataPieChartPengajuanDisetujui.map ((el, i) => {
                                                    return(
                                                        <Cell key={i} fill={colors[i]}/>
                                                    )
                                                })
                                            } 
                                        </Pie>
                                        
                                    </PieChart>
                                    </div>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="d-flex align-items-center justify-content-start justify-content-sm-center">
                <div className="d-flex align-items-center">
                  <div
                    className="br-5 bg-blue-primary d-flex justify-content-center align-items-center"
                    style={{ minWidth: "44px", height: "44px" }}
                  >
                    {/* <Image src={IconLoading} alt="IconLoading" /> */}
                    <Image src={IconWarningCircle} alt="IconWarningCircle" />
                  </div>

                  <div className="ml-4">
                    <p className="mb-0 fz-16 fw-600 text-blue-primary">{allDashboard.data_dashboard.data?.cooperation_will_expired}</p>
                    <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                      Akan Berakhir
                    </p>
                  </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="d-flex align-items-center justify-content-start justify-content-sm-center">
                <div className="d-flex align-items-center">
                  <div
                    className="br-5 bg-blue-secondary d-flex justify-content-center align-items-center"
                    style={{ minWidth: "44px", height: "44px" }}
                  >
                    <Image src={IconStop} alt="IconStop" />
                  </div>

                  <div className="ml-4">
                    <p className="mb-0 fz-16 fw-600 text-blue-primary">{allDashboard.data_dashboard.data?.cooperation_rejected}</p>
                    <p className="mb-0 mt-2 text-gray-secondary fw-500 fz-12">
                      Ditolak
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
