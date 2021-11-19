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
import Dot from "../../../../public/assets/media/logos/dot.png";
import { useSelector } from "react-redux";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import {
  getRandomSubtanceQuestionDetail,
  postResult,
} from "../../../../redux/actions/subvit/subtance-question-detail.action";

import defaultImage from "../../../../public/assets/media/logos/Gambar.png";
import { useDispatch } from "react-redux";
import axios from "axios";

const SubtansiUser = ({ token }) => {
  const dispatch = useDispatch();
  const { random_subtance_question_detail } = useSelector(
    (state) => state.randomSubtanceQuestionDetail
  );

  const router = useRouter();

  const initialData = [
    {
      id: 34,
      survey_question_bank_id: 14,
      question: "Apa Anda Suka Makanan Pedas?",
      question_image: null,
      type: "triggered_question",
      open: false,
      answer: [
        {
          key: "A",
          option: "Tidak",
          image: null,
          type: "choose",
          sub: [],
        },
        {
          key: "B",
          option: "Ya",
          image: null,
          type: "choose",
          sub: [
            {
              question: "Apa Makanan Pedas Yang anda sukai?",
              image: null,
              answer: [
                {
                  key: "A",
                  option: "Seblak",
                  image: null,
                  type: "choose",
                },
                {
                  key: "B",
                  option: "Baso Aci",
                  image: null,
                  type: "choose",
                },
                {
                  key: "C",
                  option: "Keripik Setan",
                  image: null,
                  type: "choose",
                },
                {
                  key: "D",
                  option: "Ayam Geprek",
                  image: null,
                  type: "choose",
                },
              ],
            },
          ],
        },
      ],
      participant_answer: '["A", "C"]',
    },
    {
      id: 30,
      survey_question_bank_id: 14,
      question: "Tumbuhan apa yang memiliki akar serabut?",
      question_image: "gambar1.png",
      type: "multiple_choice",
      open: false,
      answer: [
        {
          key: "A",
          option: "Ketela",
          image: "gambar1.png",
        },
        {
          key: "B",
          option: "Ubi",
          image: "gambar1.png",
        },
        {
          key: "C",
          option: "Kresen",
          image: "gambar1.png",
        },
      ],
      participant_answer: '["A", "C"]',
    },
    {
      id: 32,
      survey_question_bank_id: 14,
      question: "seberaoa sering anda meninggalkan kewajiban anda?",
      question_image: "gambar1.png",
      type: "pertanyaan_terbuka",
      open: false,
      answer: null,
      participant_answer: "TErlalu seri",
    },
  ];
  let multi = [];

  console.log(multi);
  // console.log(localStorage.getItem(router.query.id + index));

  const [data, setData] = useState(initialData);
  const [answer, setAnswer] = useState("");
  const [d, setD] = useState("");
  console.log(d);
  const [listAnswer, setListAnswer] = useState([]);
  const [numberPage, setNumberPage] = useState("");
  const [numberAnswer, setNumberAnswer] = useState(false);
  const [modalSoal, setModalSoal] = useState(false);
  const [modalResponsive, setModalResponsive] = useState(false);
  const [multipleAnswer, setMultipleAnswer] = useState(multi);
  const [indexSoal, setIndexSoal] = useState(0);
  // console.log("hehe", multipleAnswer);
  const [count, setCount] = useState(data && data.time_left);
  const [modalDone, setModalDone] = useState(false);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    sessionStorage.getItem("targetDate")
  );
  let keyMap = [];
  const handleMultiple = (item, index) => {
    setD(index);
    if (item.key.includes(localStorage.getItem(index))) {
      // multi.splice(multi.indexOf(item.key), 1);
      localStorage.removeItem(index, item.key);
    } else {
      // multi.push(item.key);
      localStorage.setItem(index, item.key);
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      keyMap.push(key);
    }
  };
  console.log(keyMap);

  const handleModalSoal = () => {
    setModalSoal(true);
  };

  const handleModalResponsive = () => {
    setModalResponsive(true);
  };

  const handleNext = () => {
    const page = parseInt(router.query.id) + 1;
    router.push(
      `${router.pathname.slice(0, 23)}/${page}?theme_id=${
        router.query.theme_id || 1
      }&training_id=${router.query.training_id || 1}`
    );
  };

  const handleCloseModal = () => {
    setModalSoal(false);
  };

  const handleCloseModalResponsive = () => {
    setModalResponsive(false);
  };

  const handleNumber = (val) => {
    setNumberPage(val);

    router.push(
      `/peserta/subvit/survey/${parseInt(val.target.innerHTML)}?theme_id=${
        router.query.theme_id || 1
      }&training_id=${router.query.training_id || 1}`
    );
  };

  const handleBack = () => {
    const page = parseInt(router.query.id) - 1;
    if (parseInt(router.query.id) === 1) {
      router.push(
        `${router.pathname.slice(0, 23)}/1?theme_id=${
          router.query.theme_id || 1
        }&training_id=${router.query.training_id || 1}`
      );
    } else {
      router.push(
        `${router.pathname.slice(0, 23)}/${page}?theme_id=${
          router.query.theme_id || 1
        }&training_id=${router.query.training_id || 1}`
      );
    }
  };

  useEffect(() => {
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
      // MASIH DIPAKE UNTUK TESTING
      // router.push(`/peserta/done-mid-tes`);
    }
  }, [count, data]);

  // MASIH DIPAKE UNTUK TESTING
  // useEffect(() => {
  //   axios
  //     .get("https://run.mocky.io/v3/8f420e68-c974-456f-97ff-9862330d6190")
  //     .then((res) => setData(res.data.data));
  //   console.log(JSON.parse(data[0].answer));
  //   // setData(random_subtance_question_detail);
  // }, []);

  const secondsToTime = (secs) => {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  let list = [];

  const handleAnswerText = (e) => {
    localStorage.setItem(`${parseInt(router.query.id)}`, e.target.value);
    if (localStorage.getItem(`${parseInt(router.query.id)}`) === "") {
      setAnswer("");
    } else {
      setAnswer(e.target.value);
    }
  };

  const handleAnswerTriggered = (e) => {
    localStorage.setItem(`${router.query.id}a`, e.key);
  };

  const handleAnswer = (e, id) => {
    setIndexSoal(id);
    localStorage.setItem(router.query.id, e.key);
    initialData.map((item, index) => {
      if (e.sub && e.sub.length > 0 && item.type === "triggered_question") {
        item.open = true;
      }
    });

    let dataTemp = [...initialData];
    setData(dataTemp);

    setAnswer(e.key);
    console.log(localStorage.getItem(router.query.id));

    // localStorage.setItem(`${router.query.id}`, e.key);

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      list.push(key);
      setListAnswer(key);
    }
  };

  let number = [];

  for (let i = 0; i < data.length; i++) {
    number.push(i);
  }

  const handleDone = () => {
    setModalDone(true);
  };

  const handlePage = () => {
    // const setData = {
    //   list: JSON.stringify(
    //     data.list_questions.map((item, index) => {
    //       return {
    //         ...item,
    //         participant_answer: localStorage.getItem(index + 1),
    //       };
    //     })
    //   ),
    //   training_id: router.query.training_id,
    //   type: router.query.category === "Test Substansi" && "substansi",
    // };
    // dispatch(postResult(setData, token));
    // localStorage.clear();
    router.push(`/peserta/done-survey`);
  };

  const handleCloseModalDone = () => {
    setModalDone(false);
  };

  const handleTest = (e, i, it) => {
    // console.log(i);
    if (e.target.checked === true) {
      localStorage.setItem(router.query.id + "/" + i, it.key);

      // console.log(it);
    } else {
      localStorage.removeItem(router.query.id + "/" + i);
    }
    // console.log(as);
    // console.log(e.target, i, it);
    let list22 = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      list22.push(localStorage.getItem(key));
      // console.log(key);
    }
    // console.log(list22);
  };

  // console.log(multi);

  return (
    <>
      <Container className={styles.baseAll} fluid>
        <Card className={styles.cardTop}>
          <Row>
            <Col xs={12} sm={6} style={{ marginTop: "8px" }}>
              <table>
                <tr>
                  <td className={styles.academy}>
                    {(data && data.academy) || "-"}
                  </td>
                  <td>&nbsp;</td>
                  <td style={{ position: "relative", paddingBottom: "5px" }}>
                    <Image
                      alt=""
                      src={Dot}
                      width={5}
                      height={5}
                      className={styles.dot}
                    />
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
              <p className={styles.totalSoal}>
                Soal {parseInt(router.query.id)} dari {data.length}
              </p>
              <Row className={styles.soalResponsive}>
                <Col sm={12} xs={12}>
                  <p className={styles.total}>
                    Soal {parseInt(router.query.id)} dari {data.length}
                    <span
                      className={styles.clickSoal}
                      onClick={handleModalResponsive}
                    >
                      Daftar Soal
                    </span>
                  </p>
                </Col>
              </Row>
              {data[parseInt(router.query.id) - 1].type ===
                "triggered_question" && (
                <>
                  <h1 className={styles.soal}>
                    {data &&
                    data[parseInt(router.query.id) - 1].question_image !==
                      null &&
                    data[parseInt(router.query.id) - 1].question_image !==
                      "" ? (
                      <div className="d-flex flex-row">
                        <div className="p-2">
                          {" "}
                          <Image
                            src={
                              process.env.END_POINT_API_IMAGE_SUBVIT +
                                data[parseInt(router.query.id) - 1]
                                  ?.question_image || defaultImage
                            }
                            alt=""
                            width={150}
                            ndl
                            height={150}
                          />
                        </div>
                        <div className="p-5">
                          {data &&
                            data[parseInt(router.query.id) - 1]?.question}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {data && data[parseInt(router.query.id) - 1]?.question}
                      </div>
                    )}
                  </h1>
                  <hr
                    hidden={data[parseInt(router.query.id) - 1].open === true}
                  />
                  {data &&
                  data[parseInt(router.query.id) - 1]?.answer !== null &&
                  data &&
                  data[parseInt(router.query.id) - 1].open === true
                    ? data[parseInt(router.query.id) - 1]?.answer
                        .filter(
                          (data) =>
                            data.key === localStorage.getItem(router.query.id)
                        )
                        .map((item, index) => {
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
                                    />
                                  </div>
                                  <div
                                    className="p-4"
                                    style={{ width: "100%", height: "100%" }}
                                  >
                                    <Card
                                      className={
                                        localStorage.getItem(
                                          router.query.id
                                        ) === item.key
                                          ? styles.answer
                                          : styles.boxAnswer
                                      }
                                      key={index}
                                      onClick={() => {
                                        handleAnswer(item, index);
                                        // console.log(multi);
                                      }}
                                    >
                                      <table>
                                        <tr>
                                          <td style={{ width: "5px" }}>
                                            {item.key}
                                          </td>
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
                                    localStorage.getItem(router.query.id) ===
                                    item.key
                                      ? styles.answer
                                      : styles.boxAnswer
                                  }
                                  key={index}
                                  onClick={() => {
                                    handleAnswer(item, index);
                                    // console.log(multi);
                                  }}
                                >
                                  <table>
                                    <tr>
                                      <td style={{ width: "5px" }}>
                                        {item.key}
                                      </td>
                                      <td style={{ width: "15px" }}>.</td>
                                      <td>{item.option} </td>
                                    </tr>
                                  </table>
                                </Card>
                              )}
                            </>
                          );
                        })
                    : data[parseInt(router.query.id) - 1]?.answer &&
                      data[parseInt(router.query.id) - 1]?.answer.map(
                        (item, index) => {
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
                                    />
                                  </div>
                                  <div
                                    className="p-4"
                                    style={{ width: "100%", height: "100%" }}
                                  >
                                    <Card
                                      className={
                                        localStorage.getItem(
                                          router.query.id
                                        ) === item.key
                                          ? styles.answer
                                          : styles.boxAnswer
                                      }
                                      key={index}
                                      onClick={() => {
                                        handleAnswer(item, index);
                                        // console.log(multi);
                                      }}
                                    >
                                      <table>
                                        <tr>
                                          <td style={{ width: "5px" }}>
                                            {item.key}
                                          </td>
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
                                    localStorage.getItem(router.query.id) ===
                                    item.key
                                      ? styles.answer
                                      : styles.boxAnswer
                                  }
                                  key={index}
                                  onClick={() => {
                                    handleAnswer(item, index);
                                    // console.log(multi);
                                  }}
                                >
                                  <table>
                                    <tr>
                                      <td style={{ width: "5px" }}>
                                        {item.key}
                                      </td>
                                      <td style={{ width: "15px" }}>.</td>
                                      <td>{item.option} </td>
                                    </tr>
                                  </table>
                                </Card>
                              )}
                            </>
                          );
                        }
                      )}
                </>
              )}

              {data[parseInt(router.query.id) - 1].type ===
                "multiple_choice" && (
                <>
                  <h1 className={styles.soal}>
                    {data &&
                    data[parseInt(router.query.id) - 1].question_image !==
                      null &&
                    data[parseInt(router.query.id) - 1].question_image !==
                      "" ? (
                      <div className="d-flex flex-row">
                        <div className="p-2">
                          {" "}
                          <Image
                            src={
                              process.env.END_POINT_API_IMAGE_SUBVIT +
                                data[parseInt(router.query.id) - 1]
                                  ?.question_image || defaultImage
                            }
                            alt=""
                            width={150}
                            ndl
                            height={150}
                          />
                        </div>
                        <div className="p-5">
                          {data &&
                            data[parseInt(router.query.id) - 1]?.question}
                          <br />
                          <br />
                          <span className={styles.multipleChoice}>
                            Anda dapat memilih lebih dari 1 jawaban
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {data && data[parseInt(router.query.id) - 1]?.question}
                        <br />
                        <br />
                        <span className={styles.multipleChoice}>
                          Anda dapat memilih lebih dari 1 jawaban
                        </span>
                      </div>
                    )}
                  </h1>
                  <hr />
                  {data &&
                    data[parseInt(router.query.id) - 1]?.answer !== null &&
                    data[parseInt(router.query.id) - 1]?.answer.map(
                      (item, index) => {
                        console.log(localStorage.getItem(router.query.id + d));
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
                                  />
                                </div>
                                <div
                                  className="p-4"
                                  style={{ width: "100%", height: "100%" }}
                                >
                                  <Card
                                    className={
                                      localStorage.getItem(index) === item.key
                                        ? styles.answer
                                        : styles.boxAnswer
                                    }
                                    key={index}
                                    onClick={() => {
                                      handleMultiple(item, index);
                                    }}
                                  >
                                    <table>
                                      <tr>
                                        <td style={{ width: "5px" }}>
                                          {item.key}
                                        </td>
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
                                  localStorage.getItem(index) === item.key
                                    ? styles.answer
                                    : styles.boxAnswer
                                }
                                key={index}
                                onClick={() => {
                                  handleMultiple(item, index);
                                }}
                              >
                                <table>
                                  <tr>
                                    <td style={{ width: "5px" }}>{item.key}</td>
                                    <td style={{ width: "15px" }}>.</td>
                                    <td>{item.option} </td>
                                  </tr>
                                </table>
                              </Card>
                            )}
                          </>
                        );
                      }
                    )}
                </>
              )}

              {data[parseInt(router.query.id) - 1].type ===
                "pertanyaan_terbuka" && (
                <>
                  <h1 className={styles.soal}>
                    {data &&
                    data[parseInt(router.query.id) - 1].question_image !==
                      null &&
                    data[parseInt(router.query.id) - 1].question_image !==
                      "" ? (
                      <div className="d-flex flex-row">
                        <div className="p-2">
                          {" "}
                          <Image
                            src={
                              process.env.END_POINT_API_IMAGE_SUBVIT +
                                data[parseInt(router.query.id) - 1]
                                  ?.question_image || defaultImage
                            }
                            alt=""
                            width={150}
                            ndl
                            height={150}
                          />
                        </div>
                        <div className="p-5">
                          {data &&
                            data[parseInt(router.query.id) - 1]?.question}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {data && data[parseInt(router.query.id) - 1]?.question}
                      </div>
                    )}
                  </h1>
                  <hr />
                  <Form>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Jelaskan jawaban Anda di sini..."
                      className={styles.textArea}
                      onChange={(event) => handleAnswerText(event)}
                      value={localStorage.getItem(`${router.query.id}`)}
                    />
                  </Form>
                </>
              )}

              {/* BEFORE REVISION */}
              {/* <h1 className={styles.soal}>
                {data &&
                data[parseInt(router.query.id) - 1].question_image !== null &&
                data[parseInt(router.query.id) - 1].question_image !== "" ? (
                  <div className="d-flex flex-row">
                    <div className="p-2">
                      <Image
                        src={
                          process.env.END_POINT_API_IMAGE_SUBVIT +
                            data[parseInt(router.query.id) - 1]
                              ?.question_image || defaultImage
                        }
                        alt=""
                        width={150}
                        ndl
                        height={150}
                      />
                    </div>
                    {data[parseInt(router.query.id) - 1].type ===
                    "multiple_choice" ? (
                      <div className="p-5">
                        {data && data[parseInt(router.query.id) - 1]?.question}
                        <br />
                        <br />
                        <span className={styles.multipleChoice}>
                          Anda dapat memilih lebih dari 1 jawaban
                        </span>
                      </div>
                    ) : (
                      <div className="p-5">
                        {data && data[parseInt(router.query.id) - 1]?.question}
                      </div>
                    )}
                  </div>
                ) : data[parseInt(router.query.id) - 1].type ===
                  "multiple_choice" ? (
                  <div>
                    {data &&
                      data &&
                      data[parseInt(router.query.id) - 1].question}
                    <br />
                    <br />
                    <span className={styles.multipleChoice}>
                      Anda dapat memilih lebih dari 1 jawaban
                    </span>
                  </div>
                ) : (
                  data && data && data[parseInt(router.query.id) - 1].question
                )}
              </h1> */}
              {/* <hr hidden={data[parseInt(router.query.id) - 1].open === true} /> */}
              {/* {data &&
              data[parseInt(router.query.id) - 1]?.answer !== null &&
              data &&
              data[parseInt(router.query.id) - 1].open === true
                ? data[parseInt(router.query.id) - 1]?.answer
                    .filter(
                      (data) =>
                        data.key === localStorage.getItem(router.query.id)
                    )
                    .map((item, index) => {
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
                                />
                              </div>
                              <div
                                className="p-4"
                                style={{ width: "100%", height: "100%" }}
                              >
                                <Card
                                  className={
                                    multipleAnswer.includes(item.key)
                                      ? styles.answer
                                      : styles.boxAnswer
                                  }
                                  key={index}
                                  onClick={() => {
                                    if (multi.includes(item.key)) {
                                      multi.splice(multi.indexOf(item.key), 1);
                                    } else {
                                      multi.push(item.key);
                                    }
                                    // console.log(multi);
                                  }}
                                >
                                  <table>
                                    <tr>
                                      <td style={{ width: "5px" }}>
                                        {item.key}
                                      </td>
                                      <td style={{ width: "15px" }}>.</td>
                                      <td>{item.option}</td>
                                    </tr>
                                  </table>
                                </Card>
                              </div>
                            </div>
                          ) : data[parseInt(router.query.id) - 1].type ===
                            "multiple_choice" ? (
                            <p>TEst</p>
                          ) : (
                            <Card
                              className={
                                multipleAnswer.includes(item.key)
                                  ? styles.answer
                                  : styles.boxAnswer
                              }
                              key={index}
                              onClick={() => {
                                if (multi.includes(item.key)) {
                                  multi.splice(multi.indexOf(item.key), 1);
                                } else {
                                  multi.push(item.key);
                                }
                                // console.log(multi);
                              }}
                            >
                              <table>
                                <tr>
                                  <td style={{ width: "5px" }}>{item.key}</td>
                                  <td style={{ width: "15px" }}>.</td>
                                  <td>{item.option} </td>
                                </tr>
                              </table>
                            </Card>
                          )}
                        </>
                      );
                    })
                : data[parseInt(router.query.id) - 1]?.answer &&
                  data[parseInt(router.query.id) - 1]?.answer.map(
                    (item, index) => {
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
                                />
                              </div>
                              <div
                                className="p-4"
                                style={{ width: "100%", height: "100%" }}
                              >
                                <Card
                                  className={
                                    multipleAnswer.includes(item.key)
                                      ? styles.answer
                                      : styles.boxAnswer
                                  }
                                  key={index}
                                  onClick={() => {
                                    if (multi.includes(item.key)) {
                                      multi.splice(multi.indexOf(item.key), 1);
                                    } else {
                                      multi.push(item.key);
                                    }
                                    // console.log(multi);
                                  }}
                                >
                                  <table>
                                    <tr>
                                      <td style={{ width: "5px" }}>
                                        {item.key}
                                      </td>
                                      <td style={{ width: "15px" }}>.</td>
                                      <td>{item.option}</td>
                                    </tr>
                                  </table>
                                </Card>
                              </div>
                            </div>
                          ) : data[parseInt(router.query.id) - 1]?.answer &&
                            data[parseInt(router.query.id) - 1].type ===
                              "multiple_choice" ? (
                            <p>TEST</p>
                          ) : (
                            <Card
                              className={
                                multipleAnswer.includes(item.key)
                                  ? styles.answer
                                  : styles.boxAnswer
                              }
                              key={index}
                              onClick={() => {
                                if (multi.includes(item.key)) {
                                  multi.splice(multi.indexOf(item.key), 1);
                                } else {
                                  multi.push(item.key);
                                }
                                // console.log(multi);
                              }}
                            >
                              <table>
                                <tr>
                                  <td style={{ width: "5px" }}>{item.key}</td>
                                  <td style={{ width: "15px" }}>.</td>
                                  <td>{item.option} </td>
                                </tr>
                              </table>
                            </Card>
                          )}
                        </>
                      );
                    }
                  )} */}
              {/* {data[parseInt(router.query.id) - 1].type === "multiple_choice" &&
                data[parseInt(router.query.id) - 1]?.answer &&
                data[parseInt(router.query.id) - 1]?.answer.map(
                  (item, index) => {
                    return (
                      <>
                        <Form.Check
                          className={styles.check}
                          inline
                          label={item.key + "." + item.option}
                          onClick={(event) => handleTest(event, index, item)}
                        />
                      </>
                    );
                  }
                )} */}

              {data[parseInt(router.query.id) - 1].open === true && (
                <>
                  <hr />
                  <h1 className={styles.soal} style={{ margin: "20px 0px" }}>
                    {data[parseInt(router.query.id) - 1].answer[indexSoal]
                      .sub[0] &&
                      data[parseInt(router.query.id) - 1].answer[indexSoal]
                        .sub[0].question}
                  </h1>
                  {data[parseInt(router.query.id) - 1].answer[indexSoal]
                    .sub[0] &&
                    data[parseInt(router.query.id) - 1].answer[
                      indexSoal
                    ].sub[0].answer.map((item, index) => {
                      return (
                        <Card
                          className={
                            localStorage.getItem(`${router.query.id}a`) ===
                            item.key
                              ? styles.answer
                              : styles.boxAnswer
                          }
                          key={index}
                          onClick={() => handleAnswerTriggered(item)}
                        >
                          <table>
                            <tr>
                              <td style={{ width: "5px" }}>{item.key}</td>
                              <td style={{ width: "15px" }}>.</td>
                              <td>{item.option} </td>
                            </tr>
                          </table>
                        </Card>
                      );
                    })}
                </>
              )}

              <Row style={{ marginTop: "20px" }}>
                <Col className={styles.btnBackResponsive}>
                  <Button
                    variant="link"
                    className={styles.btnBack}
                    onClick={handleBack}
                    disabled={parseInt(router.query.id) === 1}
                  >
                    <div className="d-flex flex-row">
                      <div
                        className="p-2"
                        aria-disabled={parseInt(router.query.id) === 1}
                      >
                        <i
                          className="ri-arrow-left-s-line"
                          style={
                            parseInt(router.query.id) === 1
                              ? {
                                  color: "#d3d3d3",
                                }
                              : { color: "#007CFF", cursor: "pointer" }
                          }
                        ></i>
                      </div>
                      <div className={` p-2`}>Kembali</div>
                    </div>
                  </Button>
                </Col>
                <Col
                  className={styles.btnBottom}
                  style={{ textAlign: "right", margin: "10px " }}
                >
                  {parseInt(router.query.id) === data.length ? (
                    <Button
                      className={styles.btnNext}
                      onClick={handleDone}
                      // disabled={!listAnswer.includes(data?.total_questions)}
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
                    <Col xs={6} style={{ textAlign: "center" }}>
                      <Button
                        variant="link"
                        className={styles.btnBack}
                        onClick={handleBack}
                        disabled={parseInt(router.query.id) === 1}
                      >
                        Kembali
                      </Button>
                    </Col>

                    <Col xs={6} style={{ textAlign: "center" }}>
                      {parseInt(router.query.id) === data.length ? (
                        <Button
                          className={styles.btnNext}
                          onClick={handleDone}
                          // disabled={!listAnswer.includes(data?.total_questions)}
                          // MASIH DIPAKE UNTUK TESTING
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
            : router.pathname.includes("mid-test")
            ? "Mid Test"
            : "Test"}
          <button type="button" className="close" onClick={handleCloseModal}>
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody>
          {router.pathname.includes("mid-test") ? (
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
            "TRIVIA"
          ) : (
            "Test"
          )}
        </ModalBody>
      </Modal>

      {/* Modal Konfirmasi */}
      <Modal show={modalDone} onHide={handleCloseModalDone} size="lg">
        <ModalHeader className={styles.headerKonfirmasi}>
          Selesai Mid Test
          <button
            type="button"
            className="close"
            onClick={handleCloseModalDone}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody className={styles.bodyKonfirmasi}>
          Apakah anda ingin menyelesaikan Mid Test dan mengirim semua hasil
          jawaban anda?Jika “Ya” maka anda sudah dinyatakan selesai mengikuti
          Mid Test, dan anda tidak dapat memperbaiki jawaban anda. <br />
          <br />
          Dengan ini saya menyatakan sudah menyelesaikan Mid Test dengan tidak
          melakukan kecurangan dalam bentuk apapun. Saya bersedia menerima
          segala keputusan penyelengara terkait hasil Mid Test.
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
    </>
  );
};

export default SubtansiUser;
