import React, { useState, useEffect } from 'react';

import Link from 'next/link'
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux'
import { newArtikel, clearErrors } from '../../../../redux/actions/publikasi/artikel.actions'
import { NEW_ARTIKEL_RESET } from '../../../../redux/types/publikasi/artikel.type'

import PageWrapper from '../../../wrapper/page.wrapper';

const TambahFaq = () => {
    const dispatch = useDispatch()

    const importSwitch = () => import('bootstrap-switch-button-react')

    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

    const { loading, error, success } = useSelector(state => state.newArtikel)

    useEffect(() => {

        // if (error) {
        //     dispatch(clearErrors())
        // }

        if (success) {
            dispatch({
                type: NEW_ARTIKEL_RESET
            })
        }

    }, [dispatch, error, success]);


    const [judul_pertanyaan, setJudulPertanyaan] = useState('')
    const [isi_vedeo, setJawaban] = useState('');
    const [kategori_id, setKategoriId] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if (error) {
            dispatch(clearErrors())
        }

        const data = {
            judul_pertanyaan,
            isi_artikel,
            gambar,
            kategori_id,
            user_id,
            tag
        }

        dispatch(newArtikel(data))
        console.log(data)
    }

    return (
        <PageWrapper>
            {error ?
                <div className="alert alert-custom alert-light-danger fade show mb-5" role="alert">
                    <div className="alert-icon"><i className="flaticon-warning"></i></div>
                    <div className="alert-text">{error}</div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true"><i className="ki ki-close"></i></span>
                        </button>
                    </div>
                </div>
                : ''
            }
            <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Tambah FAQ</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Judul Pertanyaan</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Judul disini" value={judul_pertanyaan} onChange={(e) => setJudulPertanyaan(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Jawaban</label>
                                <div className="col-sm-10">
                                    <textarea className='form-control' placeholder='isi deskripsi jawaban disini' name="jawaban" id="" rows="10" onChange={e => setJawaban(e.target.value)} value={isi_vedeo}></textarea>
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Kategori</label>
                                <div className="col-sm-10">
                                    <select name="" id="" className='form-control' onChange={e => setKategoriId(e.target.value)}>
                                        <option value="Kategori">Kategori</option>
                                    </select>
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Pin FAQ ?</label>
                                <div className="col-sm-1">
                                    <SwitchButton
                                        checked={false}
                                        onlabel=' '
                                        onstyle='primary'
                                        offlabel=' '
                                        offstyle='danger'
                                        size='sm'
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Publish ?</label>
                                <div className="col-sm-1">
                                    <SwitchButton
                                        checked={false}
                                        onlabel=' '
                                        onstyle='primary'
                                        offlabel=' '
                                        offstyle='danger'
                                        size='sm'
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <Link href='/publikasi/faq'>
                                        <a className='btn btn-outline-primary mr-2 btn-sm'>Kembali</a>
                                    </Link>
                                    <button className='btn btn-primary btn-sm'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default TambahFaq