import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { TagsInput } from 'react-tag-input-component';

import { updateBerita, clearErrors } from '../../../../redux/actions/publikasi/berita.actions'
import { NEW_BERITA_RESET, UPDATE_BERITA_RESET } from '../../../../redux/types/publikasi/berita.type'
import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';

const EditBerita = () => {
    const editorRef = useRef()
    const dispatch = useDispatch()
    const router = useRouter();

    const importSwitch = () => import('bootstrap-switch-button-react')
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor, Base64UploadAdapter } = editorRef.current || {}
    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

    const { berita } = useSelector(state => state.detailBerita)
    const { error, success, loading } = useSelector(state => state.updatedBerita)
    useEffect(() => {

        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
            // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
        }

        setEditorLoaded(true)
        if (success) {
            // setJudulBerita('')
            // setIsiBerita('')
            // setGambar('')
            // setGambarPreview('/assets/media/default.jpg')
            // setKategoriId('')
            // setTag([])

            router.push({
                pathname: `/publikasi/berita`,
                query: { success: true }
            })
        }

    }, [dispatch, error, success, loading]);

    const [id, setId] = useState(berita.id)
    const [judul_berita, setJudulBerita] = useState(berita.judul_berita)
    const [isi_berita, setIsiBerita] = useState(berita.isi_berita);
    const [gambar, setGambar] = useState(berita.gambar)
    const [gambarPreview, setGambarPreview] = useState('/assets/media/default.jpg') //belum
    const [kategori_id, setKategoriId] = useState(1) //belum
    const [users_id, setUserId] = useState(berita.users_id)
    const [tag, setTag] = useState(berita.tag)
    const [publish, setPublish] = useState(berita.publish === 1 ? true : false)
    const [_method, setMethod] = useState("put")

    const onChangeGambar = (e) => {
        if (e.target.name === 'gambar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setGambar(reader.result)
                    setGambarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (error) {
            dispatch(clearErrors())
        }

        // if (success) {
        //     dispatch({
        //         // type: NEW_BERITA_RESET
        //         type: UPDATE_BERITA_RESET
        //     })
        // }

        const data = {
            judul_berita,
            isi_berita,
            gambar,
            kategori_id,
            users_id,
            tag,
            publish,
            id,
            _method
        }

        dispatch(updateBerita(data))
        // console.log(data)
    }

    const onNewReset = () => {
        dispatch({ 
            // type: NEW_BERITA_RESET 
            type: UPDATE_BERITA_RESET
        })
    }

    return (
        <>
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
                    : ""
                }
                {success ?
                    <div className="alert alert-custom alert-light-success fade show mb-5" role="alert">
                        <div className="alert-icon"><i className="flaticon2-checkmark"></i></div>
                        <div className="alert-text">{success}</div>
                        <div className="alert-close">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onNewReset} >
                                <span aria-hidden="true"><i className="ki ki-close"></i></span>
                            </button>
                        </div>
                    </div>
                    : ''
                }

                <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
                    {
                        loading ?
                            <LoadingPage loading={loading} />
                            : ''
                    }
                    <div className="card card-custom card-stretch gutter-b">
                        <div className="card-header border-0">
                            <h3 className="card-title font-weight-bolder text-dark">Update Berita</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Judul</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" placeholder="Isi Judul disini" value={judul_berita} onChange={(e) => setJudulBerita(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Berita</label>
                                    <div className="col-sm-10">
                                        <div className="ckeditor">
                                            {editorLoaded ? <CKEditor
                                                editor={ClassicEditor}
                                                data={isi_berita}
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    console.log('Editor is ready to use!', editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData()
                                                    setIsiBerita(data);
                                                    console.log({ event, editor, data })
                                                }}
                                            /> : <p>Tunggu Sebentar</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload Thumbnail</label>
                                    <div className="col-sm-1">
                                        <figure className='avatar item-rtl' data-toggle="modal" data-target="#exampleModalCenter">
                                            <Image
                                                src={gambarPreview}
                                                alt='image'
                                                width={60}
                                                height={60}
                                            />
                                        </figure>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" name='gambar' className="custom-file-input" id="inputGroupFile04" onChange={onChangeGambar} />
                                                <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Kategori</label>
                                    <div className="col-sm-10">
                                        <select name="" id="" className='form-control' value={kategori_id} onChange={e => setKategoriId(e.target.value)} onBlur={e => setKategoriId(e.target.value)} >
                                            <option value="1">Kategori</option>
                                            <option value="2">Kategori 2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Tag</label>
                                    <div className="col-sm-10">
                                    <TagsInput
                                        value={tag}
                                        onChange={setTag}
                                        name="tag"
                                        placeHolder="Isi Tag disini"
                                    />
                                        {/* <input type="text" className="form-control" placeholder="Isi Tag disini" value={tag} onChange={e => setTag(e.target.value)} /> */}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Publish ?</label>
                                    <div className="col-sm-1">
                                        <SwitchButton
                                            checked={publish}
                                            onlabel=' '
                                            onstyle='primary'
                                            offlabel=' '
                                            offstyle='danger'
                                            size='sm'
                                            width={30}
                                            onChange={(checked) => setPublish(checked)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-10">
                                        <Link href='/publikasi/berita'>
                                            <a className='btn btn-outline-primary mr-2 btn-sm'>Kembali</a>
                                        </Link>
                                        <button className='btn btn-primary btn-sm'>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Image Preview</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center" style={{ height: '400px' }}>
                                <Image
                                    src={gambarPreview}
                                    alt='image'
                                    layout='fill'
                                    objectFit='cover'
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    )
}


export default EditBerita