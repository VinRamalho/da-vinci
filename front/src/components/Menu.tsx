import React from "react";
import {
  BookOutlined,
  FileAddOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Divider, Menu as MenuAntd } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Pedidos", "2", <BookOutlined />),
  getItem("Clientes", "3", <TeamOutlined />),
  getItem("Configurações", "4", <SettingOutlined />),
];

export const Menu = () => {
  const asdasd: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <>
      <div style={{ backgroundColor: "#fdfdf5" }}>
        <Button
          type="text"
          icon={<FileAddOutlined />}
          size={"large"}
          style={{ width: "100%", backgroundColor: "#4f4f4f", color: "#fff" }}
        >
          Novo Cadastro
        </Button>

        <Divider />
        <MenuAntd
          onClick={asdasd}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </div>
    </>
  );
};
