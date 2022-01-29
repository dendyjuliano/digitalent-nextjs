import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";

const ProfileUser = ({ profile }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="card card-custom card-stretch gutter-b">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <div className="">
                <figure
                  className="avatar item-rtl"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <Image
                    src={
                      (profile.foto &&
                        process.env.END_POINT_API_IMAGE_PELATIHAN +
                          profile.foto) ||
                      "/assets/media/default.jpg"
                    }
                    alt="image"
                    width={256}
                    height={256}
                    objectFit="cover"
                  />
                </figure>
              </div>
            </div>
            <div className="col-md-9">
              <div className="data-pribadi">
                <h3 className="font-weight-bolder mb-4">Data Pribadi</h3>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Nama Lengkap</p>
                    <p className="text-dark">{profile.name}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Email</p>
                    <p className="text-dark">{profile.email}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">
                      Nomor Identitas (KTP)
                    </p>
                    <p className="text-dark">{profile.nik}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Jenis Kelamin</p>
                    <p className="text-dark">{profile.jenis_kelamin}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">No Handphone</p>
                    <p className="text-dark">{profile.nomor_handphone}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Pendidikan</p>
                    <p className="text-dark">{profile.asal_pendidikan}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">
                      Nama Kontak Darurat
                    </p>
                    <p className="text-dark">{profile.Nama_kontak_darurat}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">
                      Nomor Kontak Darurat
                    </p>
                    <p className="text-dark">
                      {profile.nomor_handphone_darurat}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Tempat Lahir</p>
                    <p className="text-dark">{profile.tempat_lahir}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Tanggal Lahir</p>
                    <p className="text-dark">
                      {moment(profile.tanggal_lahir).format("DD MMMM YYYY")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="data-alamat">
                <h3 className="font-weight-bolder mb-4">Alamat</h3>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p className="text-neutral-body my-0">
                      Alamat (Sesuai KTP)
                    </p>
                    <p className="text-dark">{profile.address_ktp || "-"}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Provinsi</p>
                    <p className="text-dark">{profile.provinsi_ktp || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Kota</p>
                    <p className="text-dark">{profile.kota_ktp || "-"}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Kecamatan</p>
                    <p className="text-dark">{profile.kecamatan_ktp || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Pendidikan</p>
                    <p className="text-dark">{profile.kode_pos_ktp || "-"}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <p className="text-neutral-body my-0">
                      Alamat Domisili (Sesuai KTP)
                    </p>
                    <p className="text-dark">{profile.address || "-"}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Provinsi</p>
                    <p className="text-dark">{profile.provinsi || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Kota</p>
                    <p className="text-dark">{profile.kota || "-"}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Kecamatan</p>
                    <p className="text-dark">{profile.kecamatan || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-neutral-body my-0">Pendidikan</p>
                    <p className="text-dark">{profile.kode_pos || "-"}</p>
                  </div>
                </div>
              </div>
              <div className="data-berkas">
                <h3 className="font-weight-bolder mb-4">Berkas</h3>
                <div className="row">
                  <div className="col-md-12">
                    <p className="text-neutral-body my-0">Scan KTP</p>
                    <Image
                      objectFit="cover"
                      alt="file-ktp"
                      width={320}
                      height={200}
                      src={
                        (profile.File_ktp &&
                          process.env.END_POINT_API_IMAGE_PELATIHAN +
                            profile.File_ktp) ||
                        "/assets/media/default.jpg"
                      }
                      onClick={() => setShow(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {profile?.File_ktp}
            <button
              type="button"
              className="close"
              onClick={() => setShow(false)}
            >
              <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={
              (profile.File_ktp &&
                process.env.END_POINT_API_IMAGE_PELATIHAN + profile.File_ktp) ||
              "/assets/media/default.jpg"
            }
            objectFit="cover"
            height={200}
            width={400}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Kembali</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileUser;
