import { CSSProperties, HTMLAttributes, useEffect, useRef, useState } from "react";

import { useDropdown, useDropdownStyles } from "./hooks";
import { handleMenuClick } from "./utils";

import { Icon } from "@/components/Icon";

import styles from "./DropDown.module.css";

interface DropDownProps extends HTMLAttributes<HTMLElement> {
  label: string;
  menuItems: string[];
  handleMenuItemClick: (cmd: string) => void;
}

export default function DropDown({label, menuItems, handleMenuItemClick, ...props}: DropDownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  const {isDropdownOpen, setIsDropdownOpen} = useDropdown(dropdownRef, menuItemsRef);
  const {listPosition, listWidth, listHeight} = useDropdownStyles(dropdownRef, menuItemsRef);

  const defaultClass = styles.container;
  const incomingClass = props.className && props.className;
  const addShadow = isDropdownOpen && styles.shadow;
  const classes = [defaultClass, incomingClass, addShadow].filter(Boolean).join(" ");

  const menuListPosition = {
    ...{top: listPosition, width: listWidth, height: (isDropdownOpen ? listHeight : 0)}
  } as CSSProperties;

  function handleMenuClose(
    cmd: string,
    handleMenuItemClick: (cmd: string) => void,
    setIsDropdownOpen: (status: boolean) => void,
  ) {
    handleMenuItemClick(cmd);
    setIsDropdownOpen(false);
  }

  return (
    <>
      <div ref={dropdownRef} className={classes} style={props.style}>
        <span className={styles.label}>
          {label}
        </span>
      
        <Icon 
          name="arrow_drop_down"
          className={`${styles.commandIcon} ${isDropdownOpen ? styles.wind : styles.unwind}`}
          onClick={() => handleMenuClick(isDropdownOpen, setIsDropdownOpen)} />
      </div>

      <div ref={menuItemsRef} className={styles.menuList} style={menuListPosition}>
        {menuItems.map((item, idx) => (
          <span key={idx} className={styles.menuItem} onClick={() => handleMenuClose(item, handleMenuItemClick, setIsDropdownOpen)}>
            {item}
            <Icon name="arrow_outward" size="1em" />
          </span>
        ))}
      </div>
    </>
  )
}
