import { Drawer, Menu } from "antd";

import React, { useState } from "react";
// import { toast } from "react-toastify";
// import useAuth from "./../../../hooks/useAuth";
// import "./style.css";
import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  MehOutlined,
  NotificationOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
interface SidebarProps {
  visible: boolean;
  onClosed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ visible, onClosed }) => {
  const navigate = useNavigate();
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const [defaultSelectedKey, setDefaultSelectedKey] = useState<string | null>(
    null
  );
  const Route = (key: string) => {
    setDefaultSelectedKey(key);
    navigate(`/${key}`);
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
          onClick={() => Route("adminHome")}
          icon={<HomeOutlined />}
          style={{ fontSize: "20px" }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="CreateOrder"
          onClick={() => Route("classAdd")}
          style={{ fontSize: "20px" }}
          icon={<BookOutlined />}
        >
          Classes
        </Menu.Item>
        <Menu.Item
          key="Subjects"
          onClick={() => Route("addSubject")}
          icon={<ReadOutlined />}
          style={{ fontSize: "20px" }}
        >
          Subjects
        </Menu.Item>
        <Menu.Item
          key="AdminProfile"
          onClick={() => Route("ClassList")}
          icon={<UserOutlined />}
          style={{ fontSize: "20px" }}
        >
          Teachers
        </Menu.Item>

        <Menu.Item
          key="AdminProfile"
          onClick={() => Route("addStudents")}
          icon={<TeamOutlined />}
          style={{ fontSize: "20px" }}
        >
          Students
        </Menu.Item>

        <Menu.Item
          key="AdminProfile"
          onClick={() => Route("Notices")}
          icon={<NotificationOutlined />}
          style={{ fontSize: "20px" }}
        >
          Notices
        </Menu.Item>
        <Menu.Item
          key="AdminProfile"
          onClick={() => Route("Complain")}
          icon={<MehOutlined />}
          style={{ fontSize: "20px" }}
        >
          Complain
        </Menu.Item>
        <Menu.Item
          key="AdminProfile"
          onClick={() => Route("AdminProfile")}
          icon={<UserOutlined />}
          style={{ fontSize: "20px" }}
        >
          Profile
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
