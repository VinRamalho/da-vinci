import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import {
  Table,
  Row,
  Col,
  Divider,
  Modal,
  Input,
  Select,
  DatePicker,
  Space,
  notification,
  Badge,
} from "antd";
import { Requests } from "../Models/Request";
import { Api } from "../services/Api.ts";
import format from "date-fns/format";
import "./ListRequests.css";
import { User } from "../Models/User.ts";
import { Client } from "../Models/Client.ts";
import { BellTwoTone, FileAddTwoTone, SearchOutlined } from "@ant-design/icons";
type NotificationType = "success" | "info" | "warning" | "error";

const { Column } = Table;

const statusRequest = {
  A: "Aprovado",
  E: "Em aguardo",
  R: "Requerido",
};

interface Option {
  value: string;
  label: string;
}

export const ListRequests = () => {
  const [listRequests, setListRequests] = useState<Requests[]>([]);
  const [listUsers, setListUsers] = useState<Option[]>([]);
  const [listClient, setListClients] = useState<Option[]>([]);
  const [dtRefresh, setDtRefresh] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [request, setRequest] = useState<Requests>();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    title: string,
    message: string
  ) => {
    api[type]({
      message: title,
      description: message,
      placement: "top",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const { data } = await Api.post("/register/request", {
      request: request,
      idClient: request?.idClient,
      idUser: request?.idUser,
    });
    console.log(data);
    if (data.message === "Pedido registrado com sucesso") {
      openNotificationWithIcon("success", "Sucesso", data.message);
    } else {
      openNotificationWithIcon("error", "Erro", "Erro Interno");
    }

    setRequest({});
    getRequests();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getRequests = async () => {
    const { data } = await Api.get("/get/requests");
    setListRequests(data.requests);

    const refresh: string = format(
      new Date(data.dtRefresh),
      "dd/MM/yyyy hh:mm"
    );
    setDtRefresh(refresh);
  };

  const getUsers = async () => {
    const { data } = await Api.get("/get/users");

    const listUsers: User[] = data.users;
    const options: Option[] = [];

    listUsers.forEach((user) => {
      options.push({
        value: `${user.id}`,
        label: `${user.name}`,
      });
    });

    setListUsers(options);
  };

  const getClients = async () => {
    const { data } = await Api.get("/get/clients");

    const listClients: Client[] = data.clients;
    const options: Option[] = [];

    listClients.forEach((user) => {
      options.push({
        value: `${user.id}`,
        label: `${user.name}`,
      });
    });

    setListClients(options);
  };

  useEffect(() => {
    getRequests();
    getClients();
    getUsers();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col flex={2}>
          <Menu onClick={showModal} />
        </Col>
        <Col flex={5}>
          <div
            style={{
              margin: "20px 0",
              backgroundColor: "#fdfdf5",
              width: "100%",
              height: "50px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "60%" }}>
              <SearchOutlined style={{ color: "#333", width: "50px" }} />

              <input
                className="input-search"
                placeholder="Pesquisar por Data, Nome, Município..."
              />
            </div>
            <div>
              <Space>
                <span style={{ color: "#bdbdbd" }}>Perfil</span>
                <span style={{ color: "#333" }}>Comercial</span>
                <Badge count={5} size="small">
                  <BellTwoTone style={{}} twoToneColor="#333" />
                </Badge>
              </Space>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#333" }}>
                última atualização: {dtRefresh}
              </span>
              <strong style={{ color: "#333", fontSize: "35px" }}>
                Pedidos
              </strong>
            </div>
            <div>
              <span style={{ color: "#333", marginRight: "10px" }}>
                Exportar Dados
              </span>
              <FileAddTwoTone twoToneColor="#bbbbb6" />
            </div>
          </div>
          <Divider />

          <Table
            dataSource={listRequests}
            className="transparent-header-table"
            rowClassName={(record, index) =>
              index % 2 === 0 ? "even-row" : "odd-row"
            }
            pagination={{
              position: ["bottomCenter"],
              className: "pagination",
              pageSizeOptions: ["1", "2", "3"],
              itemRender: (page, type, originalElement) => {
                if (type === "prev") {
                  return <></>;
                }
                if (type === "next") {
                  return <></>;
                }
                return originalElement;
              },
            }}
          >
            <Column title="Nome" dataIndex={["client", "name"]} key="1" />
            <Column title="Responsável" dataIndex={["user", "name"]} key="2" />
            <Column
              title="Categoria"
              dataIndex="dt_creation"
              render={() => {
                return "Resíduos";
              }}
              key="3"
            />
            <Column title="Município" dataIndex="municipio" key="4" />
            <Column
              title="Data de Envio"
              dataIndex="dt_send"
              key="5"
              render={(date) => format(new Date(date), "dd/MM/yyyy")}
            />
            <Column
              title="Status"
              dataIndex="status"
              render={(status: "A" | "E" | "R") =>
                status ? statusRequest[status] : ""
              }
              key="6"
            />
          </Table>
        </Col>
      </Row>

      <Modal
        title="Cadastrar novo Pedido"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <div
          style={{ display: "flex", justifyContent: "center", margin: "50px" }}
        >
          <Space direction="vertical" wrap style={{ width: "80%" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <label>Responsável:</label>
              <Select
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  setRequest({ ...request, idUser: Number(e) });
                }}
                placeholder="Selecione o Responsável:"
                options={listUsers}
              />
            </div>
            <div
              style={{
                width: "100%",
              }}
            >
              <label>Cliente:</label>
              <Select
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  setRequest({ ...request, idClient: Number(e) });
                }}
                placeholder="Selecione o Cliente:"
                options={listClient}
              />
            </div>

            <div style={{ width: "100%" }}>
              <label>Município: </label>
              <Input
                onChange={(e) => {
                  const { value } = e.target;

                  setRequest({ ...request, municipio: value });
                }}
              />
            </div>

            <div
              style={{
                width: "100%",
              }}
            >
              <label>Data de Envio</label>
              <DatePicker
                style={{ width: "100%" }}
                onChange={(e) => {
                  const date = e?.format("YYYY/MM/DD");

                  setRequest({
                    ...request,
                    dt_send: new Date(date!),
                  });
                }}
                placeholder="Selecione uma data"
                format={"DD/MM/YYYY"}
              />
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
};
