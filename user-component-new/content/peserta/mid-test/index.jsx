import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card, Button, Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import styles from "./testSubstansi.module.css";

const TestSubstansi = () => {
  const router = useRouter();

  const routerTraining = router.query.id_pelatihan;
  const routerTema = router.query.id_tema;

  const handlePage = () => {
    router.push(
      `/peserta/subvit/mid-test/1?theme_id=${routerTema}&training_id=${routerTraining}&category=Mid Test`
    );
  };

  const [show, setShow] = useState(false);

  const handleModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <PesertaWrapper>
        <Card className={styles.cardBase}>
          <h1 className={styles.title}>Panduan Mid Test</h1>
          <Card className={styles.cardPanduan}>
            <div className="table-responsive">
              <table>
                <tr>
                  <td style={{ position: "absolute" }}>1.</td>
                  <td>&nbsp;</td>
                  <td>
                    Sebelum mengerjakan test, harap perhatikan dan lakukan
                    hal-hal berikut :
                    <ul>
                      <li>
                        Pastikan koneksi internet stabil (sangat disarankan
                        menggunakan koneksi internet broadband dengan kecepatan
                        akses download 384 kbps ke atas). Cek hal ini melalui{" "}
                        <a
                          href="#"
                          onClick={() =>
                            window.open("https://www.speedtest.net/", "_blank")
                          }
                        >
                          https://www.speedtest.net/
                        </a>
                      </li>
                      <li>
                        Gunakan browser : Mozilla Firefox atau Google Chrome
                        versi terbaru
                      </li>
                      <li>
                        Pastikan Javascript ACTIVE/ENABLED. Cek hal ini melalui{" "}
                        <a
                          href="#"
                          onClick={() =>
                            window.open(
                              "https://www.whatismybrowser.com/detect/is-javascript-enabled",
                              "_blank"
                            )
                          }
                        >
                          https://www.whatismybrowser.com/detect/is-javascript-enabled
                        </a>{" "}
                        atau baca terlebih dahulu Panduan Pengaktifan Javascript
                        pada{" "}
                        <a
                          href="#"
                          onClick={() =>
                            window.open(
                              "https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo",
                              "_blank"
                            )
                          }
                        >
                          https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo
                        </a>
                      </li>
                      <li>
                        Pastikan Cookies ACTIVE/ENABLED. Baca Panduan
                        Pengaktifan Cookie pada{" "}
                        <a
                          href="#"
                          onClick={() =>
                            window.open(
                              "https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo",
                              "_blank"
                            )
                          }
                        >
                          https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo
                        </a>
                      </li>
                      <li>
                        Pastikan keyboard dan mouse/trackpad Anda dalam keadaan
                        baik.
                      </li>
                      <li>
                        Siapkan kertas dan pensil/pulpen untuk mencoret-coret
                        jika diperlukan.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td style={{ position: "absolute" }}>2.</td>
                  <td>&nbsp;</td>
                  <td>
                    Alokasi waktu yang diberikan untuk mengerjakan Mid Test
                    sesuai dengan masing-masing tema pelatihan. Informasi
                    tersebut dapat di akses pada dashboard Mid Test.
                  </td>
                </tr>
                <tr>
                  <td style={{ position: "absolute" }}>3.</td>
                  <td>&nbsp;</td>
                  <td>
                    Peserta wajib menjawab seluruh soal Mid Test dan jumlah soal
                    sesuai dengan masing-masing tema pelatihan. Tidak ada nilai
                    negatif untuk jawaban yang salah.
                  </td>
                </tr>
                <tr>
                  <td style={{ position: "absolute" }}>4.</td>
                  <td>&nbsp;</td>
                  <td>
                    Setelah Mid Test dimulai, waktu tes tidak dapat
                    diberhentikan dan tes tidak dapat diulang. Setelah waktu
                    habis, halaman soal akan tertutup secara otomatis.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>5.</td>
                  <td>&nbsp;</td>
                  <td>
                    Skor untuk soal yang sudah dijawab tetap terhitung walaupun
                    peserta belum menekan tombol submit atau peserta mengalami
                    force majeure.
                  </td>
                </tr>
              </table>
            </div>
          </Card>
          <div
            style={{
              textAlign: "right",
              marginTop: "30px",
            }}
          >
            <Button className={styles.btnStart} onClick={handleModal}>
              <div className="d-flex flex-row">
                <div className="p-2">Kerjakan Test</div>
                <div className="p-2">
                  <i className="ri-arrow-right-s-line"></i>
                </div>
              </div>
            </Button>
          </div>
        </Card>
      </PesertaWrapper>

      {/* MODAL KONFIRMASI */}
      <Modal show={show} onHide={closeModal} size="lg">
        <ModalHeader className={styles.headerKonfirmasi}>
          Konfirmasi Mid Test
          <button type="button" className="close" onClick={closeModal}>
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody className={styles.bodyKonfirmasi}>
          Peserta wajib membaca panduan Mid Test dengan seksama.
          <br /> Dengan ini saya menyatakan sudah membaca semua ketentuan yang
          berlaku, siap <br /> mengikuti Mid Test, dan tidak melakukan
          kecurangan dalam bentuk apapun.
          <br />
          <br /> Jika sudah siap, silahkan klik tombol “Mulai Test” untuk
          memulai Mid Test.
          <br />
          <br />
          <div style={{ textAlign: "right" }}>
            <Button
              variant="link"
              onClick={closeModal}
              className={styles.btnBatal}
            >
              Batal
            </Button>
            <Button onClick={handlePage} className={styles.btnMulai}>
              Mulai Test
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default TestSubstansi;
