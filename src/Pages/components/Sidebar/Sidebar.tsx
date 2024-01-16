import { Drawer, Menu } from "antd";

import React, { useState } from "react";
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

interface SidebarProps {
  visible: boolean;
  onClosed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ visible, onClosed }) => {
  const navigate = useNavigate();

  const [defaultSelectedKey, setDefaultSelectedKey] = useState<string | null>(
    null
  );

  const Route = (key: string) => {
    setDefaultSelectedKey(key);
    navigate(`/${key}`);
  };

  const menuItems = [
    {
      key: "AdminDashboard",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => Route("adminHome"),
    },
    {
      key: "CreateOrder",
      label: "Classes",
      icon: <BookOutlined />,
      onClick: () => Route("classAdd"),
    },
    {
      key: "Subjects",
      label: "Subjects",
      icon: <ReadOutlined />,
      onClick: () => Route("addSubject"),
    },
    {
      key: "ClassList",
      label: "Teachers",
      icon: <UserOutlined />,
      onClick: () => Route("ClassList"),
    },
    {
      key: "AllStudent",
      label: "Students",
      icon: <TeamOutlined />,
      onClick: () => Route("AllStudent"),
    },
    {
      key: "noticeAdmin",
      label: "Notices",
      icon: <NotificationOutlined />,
      onClick: () => Route("noticeAdmin"),
    },
    {
      key: "Complain",
      label: "Complain",
      icon: <MehOutlined />,
      onClick: () => Route("Complain"),
    },
    {
      key: "AdminProfile",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => Route("AdminProfile"),
    },
    {
      key: "6",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => navigate("/logout"),
    },
  ];

  return (
    <Drawer
      title="Menu"
      placement="left"
      onClose={onClosed}
      className="custom-drawer"
      open={visible} // Use the visible prop instead of open
      style={{ backgroundColor: "#001529", color: "white" }}
    >
      <Menu
        selectedKeys={defaultSelectedKey ? [defaultSelectedKey] : []}
        mode="inline"
        theme="dark"
        style={{ height: "100%" }}
        items={menuItems}
      />
    </Drawer>
  );
};

export default Sidebar;
