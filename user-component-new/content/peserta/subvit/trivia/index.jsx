import {
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Button,
  ModalBody,
} from "react-bootstrap";
import styles from "./content.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/dist/client/image";
import Dot from "../../../../../public/assets/media/logos/dot.png";
import { useSelector } from "react-redux";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

import { postResultTrivia } from "../../../../../redux/actions/subvit/trivia-question-detail.action";

import defaultImage from "../../../../../public/assets/media/logos/Gambar.png";
import { useDispatch } from "react-redux";
import { parseInt } from "lodash";

const SubtansiUser = ({ token }) => {
  const dispatch = useDispatch();
  const { error, random_trivia } = useSelector((state) => state.randomTrivia);

  const router = useRouter();

  const initialData = {
    training: "Postgre",
    academy: "Digital Entrepreneurship Academy",
    theme: "Wirasusaha Digital",
    total_questions: 3,
    time_left: 30000,
    list_questions: [
      {
        id: 23,
        trivia_question_bank_id: 12,
        question: "fill in the blnk",
        type: "fill_in_the_blank",
        question_image: "",
        answer:
          '[{"key":"A","type":"Percis","value":"5","option":"fill in the blank","image":"","color":false},{"key":"B","type":"Mengandung","value":"3","option":"fill","image":"","color":false},{"key":"C","type":"Sama Dengan","value":"1","option":"fill in the blank","image":"","color":false}]',
        duration: 1000,
      },
      {
        id: 22,
        trivia_question_bank_id: 12,
        question: "chcbx",
        type: "checkbox",
        question_image: "",
        answer:
          '[{"key":"A","type":"","value":"5","option":"a","image":"","color":false},{"key":"B","type":"","value":"4","option":"b","image":"","color":false},{"key":"C","type":"","value":"3","option":"c","image":"","color":false},{"key":"D","type":"","value":"2","option":"d","image":"","color":false}]',
        duration: 1000,
      },
      {
        id: 21,
        trivia_question_bank_id: 12,
        question: "polling",
        type: "polling",
        question_image: "",
        answer:
          '[{"key":"A","type":"","value":"","option":"a","image":"","color":false},{"key":"B","type":"","value":"","option":"b","image":"","color":false},{"key":"C","type":"","value":"","option":"c","image":"","color":false},{"key":"D","type":"","value":"","option":"d","image":"","color":false}]',
      },
    ],
  };

  const [data, setData] = useState();
  const [answer, setAnswer] = useState("");
  const [listAnswer, setListAnswer] = useState([]);
  const [no, setNo] = useState(0);

  const [modalSoal, setModalSoal] = useState(false);
  const [modalNext, setModalNext] = useState(false);
  const [modalResponsive, setModalResponsive] = useState(false);
  const [count, setCount] = useState(random_trivia && random_trivia.time_left);

  const [alert, setAlert] = useState(true);

  let tt = [];

  random_trivia?.list_questions.map((it) => {
    tt.push(it.duration / 1000);
  });

  $(window).on("popstate", function (event) {
    router.push("/peserta/done-trivia");
  });

  const [times, setTimes] = useState(
    tt[parseInt(router.query.id) - 1] > 1
      ? tt[parseInt(router.query.id) - 1]
      : 3000
  );

  const [modalDone, setModalDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const [zoom, setZoom] = useState(false);
  const [zoomJawab, setZoomJawab] = useState(false);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const [hour2, setHour2] = useState(0);
  const [minute2, setMinute2] = useState(0);
  const [second2, setSecond2] = useState(0);

  useEffect(() => {
    // Handle Error akan langsung ke done
    if (error) {
      router.push(`/peserta/done-trivia`);
    }

    // Hitung Waktu Mundur
    if (count >= 0) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
        let timeLeftVar = secondsToTime(count);
        setHour(timeLeftVar.h);
        setMinute(timeLeftVar.m);
        setSecond(timeLeftVar.s);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      localStorage.clear();
      router.push(`/peserta/done-trivia`);
    }
  }, [count, router, error]);

  useEffect(() => {
    // window.location.reload();
    setData(random_trivia);
    // setData(initialData);
  }, [data, random_trivia]);

  const handleModalSoal = () => {
    setModalSoal(true);
  };

  const handleAnswerText = (e) => {
    sessionStorage.setItem(`${parseInt(router.query.id)}`, e.target.value);
    if (sessionStorage.getItem(`${parseInt(router.query.id)}`) === "") {
      setAnswer("");
    } else {
      setAnswer(e.target.value);
    }
  };

  const handleModalResponsive = () => {
    setModalResponsive(true);
  };

  const handleNext = () => {
    setModalNext(true);
  };

  const handleCloseModal = () => {
    setModalSoal(false);
  };

  const handleCloseModalResponsive = () => {
    setModalResponsive(false);
  };

  const handleNumber = (val) => {
    if (val.target.innerHTML === router.query.id) {
      router.push(
        `/peserta/subvit/trivia/${parseInt(val.target.innerHTML)}?theme_id=${
          router.query.theme_id
        }&training_id=${router.query.training_id}`
      );
    } else {
    }
  };

  const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  const ToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  let list = [];

  const handleAnswer = (e) => {
    if (type === "checkbox") {
      if (multi.includes(e.key)) {
        multi.splice(multi.indexOf(e.key), 1);
        sessionStorage.setItem(router.query.id, JSON.stringify(multi));
      } else {
        multi.push(e.key);
        sessionStorage.setItem(router.query.id, JSON.stringify(multi));
      }
    } else {
      setAnswer(e.key);

      sessionStorage.setItem(`${router.query.id}`, e.key);

      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        list.push(key);
        setListAnswer(key);
      }
    }
  };

  let number = [];

  for (let i = 0; i < data?.total_questions; i++) {
    number.push(i);
  }
  const handleDone = () => {
    setModalDone(true);
  };

  const handlePage = () => {
    const setData = {
      list: JSON.stringify(
        data.list_questions.map((item, index) => {
          return {
            ...item,
            participant_answer: sessionStorage.getItem(index + 1),
          };
        })
      ),
      training_id: router.query.training_id,
      type: "trivia",
    };
    dispatch(postResultTrivia(setData, token));
    localStorage.clear();
    sessionStorage.clear();
    router.push(`/peserta/done-trivia`);
  };

  const handleCloseModalDone = () => {
    setModalDone(false);
  };

  let multi = [];

  const handleAnswerCheckbox = (e) => {
    if (multi.includes(e.key)) {
      multi.splice(multi.indexOf(e.key), 1);
      sessionStorage.setItem(router.query.id, JSON.stringify(multi));
    } else {
      multi.push(e.key);
      sessionStorage.setItem(router.query.id, JSON.stringify(multi));
    }
  };

  const handlePageNext = () => {
    setTimes(tt[router.query.id]);
    const page = parseInt(router.query.id) + 1;
    router.push(
      `${router.pathname.slice(0, 23)}/${page}?theme_id=${
        router.query.theme_id
      }&training_id=${router.query.training_id}`
    );
    setModalNext(false);

    if (
      data &&
      data.list_questions &&
      data.list_questions[parseInt(router.query.id) - 1].type === "checkbox"
    ) {
      sessionStorage.setItem(router.query.id, multi);
    } else if (
      data &&
      data.list_questions &&
      data.list_questions[parseInt(router.query.id) - 1].type === "polling"
    ) {
      sessionStorage.setItem(router.query.id, answer);
    } else if (
      data &&
      data.list_questions &&
      data.list_questions[parseInt(router.query.id) - 1].type ===
        "fill_in_the_blank"
    ) {
      sessionStorage.setItem(router.query.id, answer);
    }
  };
  let listCheckbox = [];

  useEffect(() => {
    // Hitung Waktu Mundur
    if (times >= 0) {
      const secondsLeft = setInterval(() => {
        setTimes((c) => c - 1);
        let timeLeftVar = ToTime(times);
        setHour2(timeLeftVar.h);
        setMinute2(timeLeftVar.m);
        setSecond2(timeLeftVar.s);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      localStorage.clear();
      setOpen(true);
      handleNext();
    }
  }, [times, data, router]);

  return (
    <>
      <Container className={styles.baseAll} fluid>
        <Card className={styles.cardTop}>
          <Row>
            <Col xs={12} sm={6} style={{ marginTop: "8px" }}>
              <div className={styles.titleResponsive}>
                <p className={styles.academy2}>
                  {(data && data.academy) || "-"}
                </p>
                <p className={styles.training2}>
                  {(data && data.theme) || "-"}
                </p>
              </div>
              <table>
                <tr>
                  <td className={styles.academy}>
                    {(data && data.academy) || "-"}
                  </td>

                  <td>&nbsp;</td>
                  <td className={styles.training}>
                    {(data && data.theme) || "-"}
                  </td>
                </tr>
              </table>
            </Col>
            <Col xs={12} sm={6} style={{ textAlign: "right" }}>
              <Button
                className={styles.btnHelp}
                variant="link"
                onClick={handleModalSoal}
              >
                <div className="d-flex flex-row">
                  <div className="p-2">
                    <i
                      className="ri-error-warning-fill"
                      style={{ color: "#FFA800" }}
                    ></i>
                  </div>
                  <div className={`${styles.bantuan} p-2`}>Bantuan</div>
                </div>
              </Button>
              <Card className={styles.time} id="time">
                {hour < 9 ? "0" + hour : hour}:
                {minute < 9 ? "0" + minute : minute}:
                {second < 9 ? "0" + second : second}
              </Card>
            </Col>
          </Row>
        </Card>
        <Row style={{ marginTop: "20px" }}>
          <Col sm={9}>
            <Card className={styles.cardSoal}>
              <Row>
                <Col>
                  {" "}
                  <p className={styles.totalSoal}>
                    Soal {parseInt(router.query.id)} dari{" "}
                    {data && data.total_questions}
                  </p>
                </Col>
                <Col className={styles.align}>
                  {(data &&
                    data.list_questions &&
                    data.list_questions[parseInt(router.query.id) - 1].type ===
                      "checkbox") ||
                  (data &&
                    data.list_questions &&
                    data.list_questions[parseInt(router.query.id) - 1].type ===
                      "fill_in_the_blank") ? (
                    <p className={styles.totalSoal2} id="time2">
                      {hour2 < 9 ? "0" + hour2 : hour2}:
                      {minute2 < 9 ? "0" + minute2 : minute2}:
                      {second2 < 9 ? "0" + second2 : second2}
                    </p>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>

              <Row className={styles.soalResponsive}>
                <Col sm={12} xs={12}>
                  <p className={styles.total}>
                    Soal {parseInt(router.query.id)} dari{" "}
                    {data && data.total_questions}
                    <span
                      className={styles.clickSoal}
                      onClick={handleModalResponsive}
                    >
                      Daftar Soal
                    </span>
                  </p>
                </Col>
              </Row>

              <h1 className={styles.soal}>
                {data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1]
                  .question_image !== null &&
                data &&
                data.list_questions[parseInt(router.query.id) - 1]
                  .question_image !== "" ? (
                  <div className="d-flex flex-row">
                    <div className="p-2">
                      <Image
                        src={
                          process.env.END_POINT_API_IMAGE_SUBVIT +
                            data.list_questions[parseInt(router.query.id) - 1]
                              ?.question_image || defaultImage
                        }
                        alt=""
                        width={150}
                        onClick={() => setZoom(true)}
                        height={150}
                      />
                    </div>
                    <Modal show={zoom} onHide={() => setZoom(false)}>
                      <Image
                        src={
                          process.env.END_POINT_API_IMAGE_SUBVIT +
                            data.list_questions[parseInt(router.query.id) - 1]
                              ?.question_image || defaultImage
                        }
                        alt=""
                        width={500}
                        height={800}
                      />
                    </Modal>
                    <div className="p-5">
                      {data &&
                        data.list_questions[parseInt(router.query.id) - 1]
                          ?.question}
                    </div>
                  </div>
                ) : (
                  data &&
                  data.list_questions &&
                  data.list_questions[parseInt(router.query.id) - 1].question
                )}
              </h1>
              <hr />
              {data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1].type ===
                  "polling" &&
                data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1].answer &&
                JSON.parse(
                  data.list_questions[parseInt(router.query.id) - 1].answer
                ).map((item, index) => {
                  return (
                    <>
                      {item.image !== null && item.image !== "" ? (
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  item.image || defaultImage
                              }
                              alt=""
                              width={70}
                              onClick={() => setZoomJawab(true)}
                              height={70}
                            />
                          </div>
                          <Modal
                            show={zoomJawab}
                            onHide={() => setZoomJawab(false)}
                          >
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  item.image || defaultImage
                              }
                              alt=""
                              width={500}
                              height={800}
                            />
                          </Modal>
                          <div
                            className="p-4"
                            style={{ width: "100%", height: "100%" }}
                          >
                            <Card
                              className={
                                sessionStorage.getItem(router.query.id) ===
                                item.key
                                  ? styles.answer
                                  : styles.boxAnswer
                              }
                              key={index}
                              onClick={() => handleAnswer(item)}
                            >
                              <table>
                                <tr>
                                  <td style={{ width: "5px" }}>{item.key}</td>
                                  <td style={{ width: "15px" }}>.</td>
                                  <td>{item.option}</td>
                                </tr>
                              </table>
                            </Card>
                          </div>
                        </div>
                      ) : (
                        <Card
                          className={
                            sessionStorage.getItem(router.query.id) === item.key
                              ? styles.answer
                              : styles.boxAnswer
                          }
                          key={index}
                          onClick={() => handleAnswer(item)}
                        >
                          <table>
                            <tr>
                              <td style={{ width: "5px" }}>{item.key}</td>
                              <td style={{ width: "15px" }}>.</td>
                              <td>{item.option}</td>
                            </tr>
                          </table>
                        </Card>
                      )}
                    </>
                  );
                })}

              {data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1].type ===
                  "fill_in_the_blank" && (
                  <Form>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Jelaskan jawaban Anda di sini..."
                      className={styles.textArea}
                      onChange={(event) => handleAnswerText(event)}
                      value={sessionStorage.getItem(`${router.query.id}`)}
                    />
                  </Form>
                )}

              {data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1].type ===
                  "checkbox" &&
                data &&
                data.list_questions &&
                data.list_questions[parseInt(router.query.id) - 1].answer &&
                JSON.parse(
                  data.list_questions[parseInt(router.query.id) - 1].answer
                ).map((item, index) => {
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(index);
                    listCheckbox.push(key);
                  }

                  return (
                    <>
                      {item.image !== null && item.image !== "" ? (
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  item.image || defaultImage
                              }
                              alt=""
                              width={70}
                              height={70}
                              onClick={() => setZoomJawab(true)}
                            />
                          </div>
                          <Modal
                            show={zoomJawab}
                            onHide={() => setZoomJawab(false)}
                          >
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_SUBVIT +
                                  item.image || defaultImage
                              }
                              alt=""
                              width={500}
                              height={800}
                            />
                          </Modal>
                          <div
                            className="p-4"
                            style={{ width: "100%", height: "100%" }}
                          >
                            <div className="quiz_card_area">
                              <input
                                className="quiz_checkbox"
                                type="checkbox"
                                onChange={() => handleAnswerCheckbox(item)}
                              />
                              <div className="single_quiz_card">
                                <div className="quiz_card_content">
                                  <div className="quiz_card_title">
                                    <p>
                                      {item.key}.{item.option}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="quiz_card_area">
                          <input
                            className="quiz_checkbox"
                            type="checkbox"
                            onChange={() => handleAnswerCheckbox(item)}
                          />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_title">
                                <p>
                                  {item.key}.{item.option}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}

              <Row style={{ marginTop: "20px" }}>
                <Col className={styles.btnBackResponsive}></Col>

                <Col
                  className={styles.btnBottom}
                  style={{ textAlign: "right", margin: "10px " }}
                >
                  {parseInt(router.query.id) === data?.total_questions ? (
                    <Button
                      className={styles.btnNext}
                      onClick={handleDone}
                      // disabled={listAnswer.includes(data?.total_questions)}
                      // MASIH DIPAKE
                    >
                      Selesai
                    </Button>
                  ) : (
                    <Button
                      className={styles.btnNext}
                      onClick={handleNext}
                      disabled={
                        parseInt(router.query.id) === data &&
                        data.total_questions
                      }
                    >
                      <div className="d-flex flex-row">
                        <div className="p-1">Lanjut</div>
                        <div className="p-1">
                          <i className="ri-arrow-right-s-line"></i>
                        </div>
                      </div>
                    </Button>
                  )}
                </Col>
                <Col xs={12} className={styles.btnBottomResponsive}>
                  <Row>
                    <Col xs={6} style={{ textAlign: "center" }}></Col>

                    <Col xs={6} style={{ textAlign: "center" }}>
                      {parseInt(router.query.id) === data?.total_questions ? (
                        <Button
                          className={styles.btnNext}
                          onClick={handleDone}
                          // disabled={!listAnswer.includes(data?.total_questions)}
                          // MASIH DIPAKE
                        >
                          Selesai
                        </Button>
                      ) : (
                        <Button
                          className={styles.btnNext}
                          onClick={handleNext}
                          disabled={
                            parseInt(router.query.id) === data &&
                            data.total_questions
                          }
                        >
                          Lanjut
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={3}>
            <Card className={styles.cardNumber}>
              <h1 className={styles.daftarSoal}>Daftar Soal</h1>
              <Row>
                {number.map((item, index) => {
                  let list = [];
                  for (let i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i);
                    list.push(key);
                  }

                  return (
                    <>
                      {list.includes(JSON.stringify(item + 1)) ? (
                        <Col key={index} style={{ width: "20%" }}>
                          <Card
                            className={styles.numberAnswer}
                            // onClick={(event) => handleNumber(event)}
                          >
                            {item + 1}
                          </Card>
                        </Col>
                      ) : (
                        <Col key={index} style={{ width: "20%" }}>
                          <Card
                            className={
                              item + 1 === parseInt(router.query.id)
                                ? styles.cardChoosed
                                : styles.cardChoose
                            }
                            // onClick={(event) => handleNumber(event)}
                          >
                            {item + 1}
                          </Card>
                        </Col>
                      )}
                    </>
                  );
                })}
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal bantuan */}
      <Modal show={modalSoal} onHide={handleCloseModal} centered size="lg">
        <ModalHeader className={styles.headerModal}>
          Panduan{" "}
          {router.pathname.includes("substansi")
            ? "Test Substansi"
            : router.pathname.includes("survey")
            ? "Survey"
            : router.pathname.includes("trivia")
            ? "TRIVIA"
            : "Test"}
          <button type="button" className="close" onClick={handleCloseModal}>
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody>
          {router.pathname.includes("substansi") ? (
            <Card className={styles.cardPanduan}>
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
                        akses download 374 kbps ke atas). Cek hal ini melalui{" "}
                        <a href="https://www.speedtest.net/">
                          https://www.speedtest.net/
                        </a>
                      </li>
                      <li>
                        Gunakan browser : Mozilla Firefox atau Google Chrome
                        versi terbaru
                      </li>
                      <li>
                        Pastikan Javascript ACTIVE/ENABLED. Cek hal ini melalui{" "}
                        <a href="https://www.whatismybrowser.com/detect/is-javascript-enabled">
                          https://www.whatismybrowser.com/detect/is-javascript-enabled
                        </a>{" "}
                        atau baca terlebih dahulu Panduan Pengaktifan Javascript
                        pada{" "}
                        <a href="https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo">
                          https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo
                        </a>
                      </li>
                      <li>
                        Pastikan Cookies ACTIVE/ENABLED. Baca Panduan
                        Pengaktifan Cookie pada{" "}
                        <a href="https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo">
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
                    Alokasi waktu yang diberikan untuk mengerjakan Test
                    Substansi sesuai dengan masing-masing tema pelatihan.
                    Informasi tersebut dapat di akses pada dashboard Test
                    Substansi.
                  </td>
                </tr>
                <tr>
                  <td style={{ position: "absolute" }}>3.</td>
                  <td>&nbsp;</td>
                  <td>
                    Peserta wajib menjawab seluruh soal Test Substansi dan
                    jumlah soal sesuai dengan masing-masing tema pelatihan.
                    Tidak ada nilai negatif untuk jawaban yang salah.
                  </td>
                </tr>
                <tr>
                  <td style={{ position: "absolute" }}>4.</td>
                  <td>&nbsp;</td>
                  <td>
                    Setelah Test Substansi dimulai, waktu tes tidak dapat
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
            </Card>
          ) : router.pathname.includes("survey") ? (
            <Card className={styles.cardPanduan}>
              <table>
                <tr>
                  <td style={{ verticalAlign: "top" }}>1.</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    Lakukan pengisian survey hingga seluruh pertanyaan terjawab
                    dengan tuntas.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>2.</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    Peserta wajib menjawab seluruh survey yang berjumlah 50
                    pertanyaan.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>3.</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    Peserta WAJIB mengisi jawaban dengan jujur sebagai bahan
                    evaluasi bagi manajemen pelaksana pelatihan Digital Talent
                    Scholarship 2022.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>4.</td>
                  <td>&nbsp;</td>
                  <td> Waktu yang tersedia untuk mengisi survey ini 1 Jam.</td>
                </tr>
              </table>
            </Card>
          ) : router.pathname.includes("trivia") ? (
            <Card className={styles.cardPanduan}>
              <table>
                <tr>
                  <td style={{ verticalAlign: "top" }}>1.</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    Lakukan pengisian TRIVIA hingga seluruh pertanyaan terjawab
                    dengan tuntas.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>2.</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    Peserta wajib menjawab seluruh TRIVIA yang berjumlah 50
                    pertanyaan.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>3.</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    Peserta WAJIB mengisi jawaban dengan jujur sebagai bahan
                    evaluasi bagi manajemen pelaksana pelatihan Digital Talent
                    Scholarship 2022.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>4.</td>
                  <td>&nbsp;</td>
                  <td> Waktu yang tersedia untuk mengisi TRIVIA ini 1 Jam.</td>
                </tr>
              </table>
            </Card>
          ) : (
            "Test"
          )}
        </ModalBody>
      </Modal>

      {/* Modal Konfirmasi */}
      <Modal show={modalDone} onHide={handleCloseModalDone} size="lg">
        <ModalHeader className={styles.headerKonfirmasi}>
          Selesai TRIVIA
          <button
            type="button"
            className="close"
            onClick={handleCloseModalDone}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody className={styles.bodyKonfirmasi}>
          Apakah anda ingin menyelesaikan TRIVIA dan mengirim semua hasil
          jawaban anda?Jika “Selesai” maka anda sudah dinyatakan selesai
          mengikuti TRIVIA, dan anda tidak dapat memperbaiki jawaban anda.{" "}
          <br />
          <br />
          Dengan ini saya menyatakan sudah menyelesaikan TRIVIA dengan tidak
          melakukan kecurangan dalam bentuk apapun. Saya bersedia menerima
          segala keputusan penyelengara terkait hasil TRIVIA.
          <br />
          <br />
          <div style={{ textAlign: "right" }}>
            <Button
              variant="link"
              onClick={handleCloseModalDone}
              className={styles.btnBatal}
            >
              Batal
            </Button>
            <Button onClick={handlePage} className={styles.btnMulai}>
              Selesai
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {/* Modal Soal Responsive */}
      <Modal show={modalResponsive} onHide={handleCloseModalResponsive}>
        <ModalHeader className={styles.headerModal}>
          Daftar Soal
          <button
            type="button"
            className="close"
            onClick={handleCloseModalResponsive}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody>
          <Row>
            {number.map((item, index) => {
              let list = [];
              for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                list.push(key);
              }

              return (
                <>
                  {list.includes(JSON.stringify(item + 1)) ? (
                    <Col key={index} style={{ width: "20%" }}>
                      <Card
                        className={styles.numberAnswer}
                        onClick={(event) => handleNumber(event)}
                      >
                        {item + 1}
                      </Card>
                    </Col>
                  ) : (
                    <Col key={index} style={{ width: "20%" }}>
                      <Card
                        className={
                          item + 1 === parseInt(router.query.id)
                            ? styles.cardChoosed
                            : styles.cardChoose
                        }
                        onClick={(event) => handleNumber(event)}
                      >
                        {item + 1}
                      </Card>
                    </Col>
                  )}
                </>
              );
            })}
          </Row>
        </ModalBody>
      </Modal>

      {/* Modal Lanjut */}
      <Modal show={modalNext} onHide={() => !open && setModalNext(false)}>
        <ModalHeader className={styles.headerModal}>
          Konfirmasi Jawaban{" "}
        </ModalHeader>
        <ModalBody className={styles.bodyKonfirmasi}>
          Apakah Anda yakin lanjut ke soal selanjutnya? Karena{" "}
          <b>Anda tidak dapat kembali</b> ke soal trivia sebelumnya
        </ModalBody>
        <div style={{ textAlign: "right", padding: "20px" }}>
          <Button
            variant="link"
            onClick={() => setModalNext(false)}
            className={styles.btnBatal}
            hidden={open}
          >
            Batal
          </Button>
          <Button onClick={handlePageNext} className={styles.btnMulai}>
            Ya
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SubtansiUser;
