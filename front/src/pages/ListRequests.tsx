import { Row, Col } from "antd";
import { Menu } from "../components/Menu";

export const ListRequests = () => {
  return (
    <>
      <Row>
        <Col flex={2}>
          <Menu />
        </Col>
        <Col flex={3}>
          <h1>Lista de Pedidos</h1>
        </Col>
      </Row>
    </>
  );
};
