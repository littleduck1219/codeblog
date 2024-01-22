import { ReactNode } from "react";
import "./newPost.scss";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return <div className="main">{children}</div>;
}
