import React from "react";
import { Col } from "react-bootstrap";
import styles from "./pesertaWrapper.module.css";

const PesertaWrapper = ({ children, padding }) => {
  return (
    <>
      <Col
        md={12}
        lg={9}
        // style={{ marginTop: "-5%" }}
        className={`${styles.responsive} ${
          padding ? "pt-10 pt-lg-0 position-relative" : "position-relative"
        }`}
      >
        {children}
      </Col>
    </>
  );
};

export default PesertaWrapper;
