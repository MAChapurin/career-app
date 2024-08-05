import { cn } from "../../utils";
import styles from "./skeleton.module.css";

const Skeleton = ({ className }) => {
  return <div className={cn(styles.skeleton, className)}></div>;
};

export default Skeleton;
