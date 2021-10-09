import React, { useState } from "react";
import { Col } from "react-bootstrap";
import StepListPelatihan from "../components/StepListPelatihan";
import Berjalan from "./berjalan";
import Selesai from "./selesai";

const ListPelatihan = () => {
  const [step, setStep] = useState(1);

  const handleViewParticipant = () => {
    switch (step) {
      case 1:
        return <Berjalan />;
        break;
      case 2:
        return <Selesai />;
        break;

      default:
        return <Berjalan />;
        break;
    }
  };
  return (
    <>
      <div className="container-fluid p-6">
        <StepListPelatihan
          step={step}
          title1="Sedang Berjalan"
          title2="Selesai"
          setStepProps={(val) => setStep(val)}
        />
        <Col lg={12} className="order-1 px-0">
          {handleViewParticipant()}
        </Col>
      </div>
    </>
  );
};

export default ListPelatihan;