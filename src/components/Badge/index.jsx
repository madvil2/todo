import React from "react";
import classNames from "classnames";

import styles from "./Badge.module.scss";

const Badge = ({ color, onClick, className }) => (
  <div
    onClick={onClick}
    className={classNames(
      styles.badge,
      { [styles[`badge__${color}`]]: color },
      className
    )}
  />
);

export default Badge;
