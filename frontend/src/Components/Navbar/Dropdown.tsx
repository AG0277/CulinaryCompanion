import React from "react";
import "./Dropdown.css";
interface MenuItem {
  title: string;
  subMenu: any;
}

interface Props {
  config: MenuItem[];
  subMenu?: boolean;
}

class DropdownMenu extends React.Component<Props> {
  getMenuItemTitle = (
    menuItem: MenuItem,
    index: number,
    depthLevel: number
  ) => {
    return menuItem.title;
  };

  getMenuItem = (menuItem: MenuItem, depthLevel: number, index: number) => {
    let title = this.getMenuItemTitle(menuItem, index, depthLevel);

    if (menuItem.subMenu && menuItem.subMenu.length > 0) {
      return (
        <li key={index}>
          {title}
          <DropdownMenu config={menuItem.subMenu} subMenu={true} />
        </li>
      );
    } else {
      return <li key={index}>{title}</li>;
    }
  };

  render() {
    let { config, subMenu } = this.props;

    let options = config.map((item, index) => {
      return this.getMenuItem(item, 0, index);
    });

    if (subMenu && subMenu === true) {
      return <ul>{options}</ul>;
    }

    return <ul className="dropdown-menu">{options}</ul>;
  }
}
export default DropdownMenu;
