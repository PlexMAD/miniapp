import type { ReactNode } from "react";
import styles from "./DefaultLayout.module.scss";
export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  
  return <div className={styles.container}>{children}</div>;
};

export default DefaultLayout;
