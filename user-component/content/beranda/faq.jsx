import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../../components/template/Sidebar.module.css";

import { getAllFaq } from "../../../redux/actions/beranda/faq-content.actions"

const FaqPage = () => {

    const dispatch = useDispatch();

    const { loading, error, faq } = useSelector(state => state.allFaq)
    const [deskripsi, setDeskripsi] = useState(faq?.faq[0].nama_kategori || "")
    const [title, setTitle] = useState(faq?.faq[0].nama_kategori)
    const [disableBtn, setDisableBtn] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [disableBtnPlus, setDisableBtnPlus] = useState(null)
    const [id, setId] = useState(null)

    const handleFilterKeyword = (e) => {
        e.preventDefault();
        dispatch(getAllFaq(keyword))
    }

    let sidebar = faq?.faq.map(item => {
        return item.nama_kategori
    })

    const content = faq?.faq.map((row, i) => {
        return (
            {
                ...row, isShow: false
            }
        )
    })

    const sideBar = (sidebar?.filter((item, pos) => {
        return sidebar.indexOf(item) === pos
    }))

    return (
        <>
            <div className="row mx-1 py-3 px-8 bg-white rounded-pill d-flex align-items-center border" style={{ marginTop: '50px', marginBottom: '55px' }}>
                <span className="text-primary">
                    <Link href="/">
                        Beranda
                    </Link>
                </span>
                <span>
                    <i className="ri-arrow-right-s-line text-primary"></i>
                </span>
                <span>
                    Frequently Asked Questions
                </span>
            </div>
            <div>
                <h1 style={{ fontWeight: '800', marginTop: '40px' }}>Frequently Asked Questions</h1>
                <p className="my-5 text-muted">Ada yang bisa Kami Bantu ?</p>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="position-relative overflow-hidden my-5">
                        <i className="ri-search-line left-center-absolute ml-3"></i>
                        <input
                            type="text"
                            className="form-control pl-10"
                            placeholder="Cari Pertanyaan..."
                            style={{ borderRadius: '30px', backgroundColor: '#fafafb' }}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button
                            className="btn btn-primary text-white right-center-absolute"
                            style={{
                                borderTopLeftRadius: "0",
                                borderBottomLeftRadius: "0",
                                borderTopRightRadius: '18px',
                                borderBottomRightRadius: '18px'
                            }}
                            type="submit"
                            onClick={handleFilterKeyword}
                        >
                            Cari
                        </button>
                    </div>
                    <div className="mb-5">
                        <h4 style={{ fontWeight: '600', marginTop: '50px' }}>Kategori Pertanyaan</h4>
                        {
                            sideBar ?
                                sideBar?.map((row, i) => {
                                    return (
                                        <div style={{ marginLeft: '-35px' }} key={i}>
                                            <div className="d-flex flex-row">
                                                <div
                                                    className={`${deskripsi === row
                                                        ? styles.activeMenuFaqItem
                                                        : styles.menuItem
                                                        } d-flex align-items-center my-5`}
                                                    onClick={() => {
                                                        setDisableBtn(!disableBtn)
                                                        setDeskripsi(row)
                                                        setTitle(row)
                                                    }}
                                                >
                                                    <i className="fas fa-arrow-right mr-3"></i>
                                                    <td>
                                                        {row}
                                                    </td>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="row">
                                    <h1 className="font-weight-bolder">
                                        Kategori FAQ Tidak Tersedia
                                    </h1>
                                </div>
                        }
                        {/* {
                            faq ?
                                faq?.faq.map((row, i) => {
                                    return (
                                        <div style={{ marginLeft: '-35px' }} key={i}>
                                            <div className="d-flex flex-row">
                                                <div
                                                    className={`${deskripsi === row.id
                                                        ? styles.activeMenuFaqItem
                                                        : styles.menuItem
                                                        } d-flex align-items-center my-5`}
                                                    onClick={() => {
                                                        setDisableBtn(!disableBtn)
                                                        setDeskripsi(row.id)
                                                        setTitle(row.nama_kategori)
                                                    }}
                                                >
                                                    <i className="fas fa-arrow-right mr-3"></i>
                                                    <td>
                                                        {row.nama_kategori}
                                                    </td>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="row">
                                    <h1 className="font-weight-bolder">
                                        Kategori FAQ Tidak Tersedia
                                    </h1>
                                </div>
                        } */}
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="ml-3">
                        <h2 style={{ fontWeight: '800', marginTop: '20px', color: '#203e80' }}>{title}</h2>
                        <div style={{ marginTop: '60px', marginBottom: '40px' }}>
                            {
                                content ?
                                    content.map((row, i) => {
                                        if (row.nama_kategori === deskripsi) {

                                            return (
                                                <div className="accordion" id="selector">
                                                    <div className="accordion-item" style={{ marginTop: '30px', borderRadius: '6px', border: '1px solid black' }}>
                                                        <div className="accordion-header d-flex justify-content-between align-items-center pt-1" style={{ marginLeft: '30px' }}>
                                                            <h6 style={{ fontWeight: '700' }}>
                                                                {row.judul}
                                                            </h6>
                                                            <button className="accordion-button btn" onClick={() => {
                                                                // console.log("show :", row.isShow)
                                                                setId(row.id)
                                                                row.isShow = !row.isShow
                                                            }} type="button" data-toggle="collapse" data-target={i === 0 ? "#collapseExample" : `#collapseExample${i}`} key={i} data-parent="#selector" aria-expanded="false" aria-controls="collapseExample">
                                                                <i className={row.isShow === true ? "fas fa-minus-circle" : "fas fa-plus-circle"} style={{ color: '#3699ff' }}></i>
                                                            </button>
                                                        </div>
                                                        <div className="collapse" id={i === 0 ? "collapseExample" : `collapseExample${i}`} key={i}>
                                                            <div className="accordion-body card card-body border-0 mb-5">
                                                                {row.jawaban}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                    :
                                    <div className="row">
                                        <h1 className="font-weight-bolder">
                                            Pertanyaan FAQ Tidak Tersedia
                                        </h1>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaqPage;