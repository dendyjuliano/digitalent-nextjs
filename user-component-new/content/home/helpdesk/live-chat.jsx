import React from "react";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

import Sidebar from "../../../components/template/helpdesk/index";

export default function FormPengaduan() {
  const router = useRouter();

  return (
    <Container fluid className="px-md-30 px-10 py-10 bg-white">
      <SubHeaderComponent data={[{ link: router.asPath, name: "Helpdesk" }]} />
      <Sidebar>
        <h1 className={`font-weight-boldest text-blue-primary mb-15 `}>
          Live Chat
        </h1>
      </Sidebar>
    </Container>
  );
}