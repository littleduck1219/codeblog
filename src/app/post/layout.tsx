import { ReactNode } from "react";
import "./layout.css";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return <div className="main">{children}</div>;
}
