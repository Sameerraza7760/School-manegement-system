import { Drawer, Menu } from "antd";

import React, { useState } from "react";
// import { toast } from "react-toastify";
// import useAuth from "./../../../hooks/useAuth";
// import "./style.css";
import {
  AppstoreOutlined,
  LogoutOutlined,
  ShopOutlined,
} from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
interface SidebarProps {
  visible: boolean;
  onClosed: () => void;
}
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC<SidebarProps> = ({ visible, onClosed }) => {
  const navigate = useNavigate();
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);
  const [defaultSelectedKey, setDefaultSelectedKey] = useState<string | null>(
    null
  );

  const Route = (key: string) => {
    setDefaultSelectedKey(key);
    // navigate(`/${key}`);
  };

  return (
    <Drawer
      title="Menu"
      placement="left"
      onClose={onClosed}
      className="custom-drawer"
      open={visible}
      style={{ backgroundColor: "#001529", color: "white" }}
    >
      <Menu
        selectedKeys={defaultSelectedKey ? [defaultSelectedKey] : []}
        defaultOpenKeys={defaultSelectedKey ? [defaultSelectedKey] : []}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        style={{ height: "100%" }}
      >
        <Menu.Item
          key="AdminDashboard"
          onClick={() => Route("AdminDashboard")}
          icon={<AppstoreOutlined />}
          style={{ fontSize: "20px" }}
        >
          DashBoard
        </Menu.Item>
        <Menu.Item
          key="CreateOrder"
          onClick={() => Route("CreateOrder")}
          icon={<ShopOutlined />}
          style={{ fontSize: "20px" }}
        >
          Create Product
        </Menu.Item>
        <Menu.Item
          key="ManegeOrder"
          onClick={() => Route("ManegeOrder")}
          icon={<AppstoreOutlined />}
          style={{ fontSize: "20px" }}
        >
          Manage Order
        </Menu.Item>
        <Menu.Item
          key="AdminProfile"
          onClick={() => Route("AdminProfile")}
          icon={<AppstoreOutlined />}
          style={{ fontSize: "20px" }}
        >
          Setting
        </Menu.Item>

        <Menu.Item
          key="6"
          icon={<LogoutOutlined />}
          style={{ fontSize: "20px" }}
          onClick={() => navigate("/logout")}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};

export default Sidebar;
