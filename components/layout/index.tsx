import React from "react";
import Nav from "./Nav";
import Meta from "./Meta";

export default function Layout({ children }: { children: React.ReactChild }) {
  return (
    <React.Fragment>
      <Meta />
      <Nav />
      {children}
    </React.Fragment>
  );
}
