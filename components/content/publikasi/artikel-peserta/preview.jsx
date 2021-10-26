import React, { useState, useRef, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux'
import Image from "next/image";
import moment from "moment";
import IconFilter from "../../../assets/icon/Filter";

import PreviewWrapper from "../../../wrapper/preview.wrapper";
import Backdrop from "../../../../public/assets/media/backdrop.svg"
import styles from "../../../../styles/preview.module.css";

const Preview = () => {


    useEffect(() => {
        // editorRef.current = {
        //     CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
        //     ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        //     // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
        //   };

        // dispatch (decodeHTML(artikel.isi_artikel))

    },[])

    const { artikel_peserta } = useSelector(state => state.detailArtikelPeserta)

    const [judul_artikel, setJudulArtikel] = useState(artikel_peserta.judul_artikel)
    const [jenis_kategori, setJenisKategori] = useState(artikel_peserta.jenis_kategori)
    const [created_at, setCreatedAt] = useState(new Date (artikel_peserta.created_at).toLocaleDateString("en-IN"))
    const [nama, setNamaKategori] = useState(artikel_peserta.nama)  
    const [gambar, setGambar] = useState(artikel_peserta.gambar)
    const [user, setUser] = useState(artikel_peserta.dibuat)
    const [isi_artikel, setIsiArtikel] = useState(artikel_peserta.isi_artikel)
    const [tags, setTags] = useState(artikel_peserta.tag)

    return (
        <>
            <PreviewWrapper title="Pratinjau Artikel Peserta - Publikasi">

                <div className="col-lg-12 order-1 px-0 position-relative">
                    <div className="" style={{ height: '100%' }}>
                        <div className="container">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-transparent my-5 ps-5" style={{ border: '1px solid gray', borderRadius: '20px' }}>
                                    <li className="breadcrumb-item" style={{ color: 'blue' }}>Beranda</li>
                                    <li className="breadcrumb-item" style={{ color: 'blue' }}>Artikel Peserta</li>
                                    <li className="breadcrumb-item" aria-current="page">Detail Artikel Peserta</li>
                                </ol>
                            </nav>

                            <div className="ml-0">
                                <h1 className={`${styles.titlePratinjau} font-weight-bold my-5`}>
                                    {judul_artikel}
                                </h1>

                                <div className="row mb-4">
                                    <div className="rounded mt-1" style={{ marginLeft: '25px' }}>
                                        <div className={styles['titleSubMenu-2']}>
                                            {/* <i className="ri-dashboard-line"></i> */}
                                            <span className="label label-inline label-light-success font-weight-bold">
                                                {(jenis_kategori).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="rounded mt-1" style={{ marginLeft: '25px' }}>
                                        <div className={styles['titleSubMenu-2']}>
                                            <i className="flaticon-eye"></i>
                                            <span className="ml-2 mr-5 text-muted">
                                                Dibaca 120
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-8 col-md-10 col-11 mt-4 d-flex align-items-center">
                                        <div className={styles['titleSubMenu']}>
                                            <h5 className="font-weight-bold">Admin Pokja</h5>
                                            <span className="text-muted">{moment({ created_at }).format('LL')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="pt-0" style={{ height: '100%' }}>
                                    <div className="d-flex justify-content-center my-3">
                                        <Image
                                            src={process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + gambar}
                                            alt="gambar-artikel"
                                            objectFit="fill"
                                            width="1200vh"
                                            height="500vh"
                                            className="mt-5 pt-5"
                                        />
                                    </div>

                                    <div className="text-justify my-5 p-3" style={{ border: '1px solid #d7e1ea', borderRadius: '10px' }}>
                                        {/* To render html Tag */}
                                        <div dangerouslySetInnerHTML={{ __html: isi_artikel }} style={{ overflowWrap: 'break-word' }}></div>
                                        <div className="row">
                                            <div className="col-sm-8 col-md-10 col-11">
                                                <div className="row my-3 ml-0">
                                                    <div className={styles['listTag']}>
                                                        {
                                                            (tags === null) ? null :
                                                                tags.map((el, i) => {
                                                                    return (
                                                                        <div style={{ background: "#fff", border: '1px solid #d7e1ea' }}
                                                                            className="mr-5 px-3 py-1 rounded"
                                                                            key={i}>
                                                                            <div className="text-center">
                                                                                #{(el).toUpperCase()}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </PreviewWrapper>
        </>
    )
}

export default Preview;