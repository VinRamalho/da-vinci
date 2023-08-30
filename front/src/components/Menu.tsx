import React from "react";
import {
  BookOutlined,
  FileAddOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Divider, Menu as MenuAntd } from "antd";
import "./Menu.css";
import logo from "../assets/da-vinci.png";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  className?: string // Adicione esta linha
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    className,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    "Home",
    "1",
    <HomeOutlined />,
    undefined,
    undefined,
    "hover-menu-item"
  ),
  getItem(
    "Pedidos",
    "2",
    <BookOutlined />,
    undefined,
    undefined,
    "hover-menu-item"
  ),
  getItem(
    "Clientes",
    "3",
    <TeamOutlined />,
    undefined,
    undefined,
    "hover-menu-item"
  ),
  getItem(
    "Configurações",
    "4",
    <SettingOutlined />,
    undefined,
    undefined,
    "hover-menu-item"
  ),
];

export const Menu = ({
  onClick,
}: {
  onClick: (event: React.MouseEvent) => void;
}) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#fdfdf5",
          padding: "15px",
          minHeight: "94vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "10px 50px 10px 0",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              style={{
                borderRadius: "14px",
                width: "50px",
                opacity: 0.6,
                height: "35px",
                marginRight: "10px",
              }}
            />

            <h2 style={{ color: "#333" }}>Da Vinci</h2>
          </div>
          <Divider />

          <Button
            type="text"
            icon={<FileAddOutlined />}
            size={"large"}
            style={{ width: "100%", backgroundColor: "#141414", color: "#fff" }}
            onClick={onClick}
          >
            Novo Cadastro
          </Button>

          <Divider />
          <MenuAntd
            style={{ width: 256 }}
            defaultSelectedKeys={["2"]}
            mode="inline"
            items={items}
          />
        </div>

        <div>
          <Divider />

          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              width: "100%",
              height: "60px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "#050505",
                color: "#eeeeee",
                marginRight: "10px",
                alignItems: "flex-start",
                marginLeft: "20px",
              }}
            >
              C
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ color: "#333" }}>Claudia M.</strong>
              <span style={{ color: "#cccccc" }}>teste@teste.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
