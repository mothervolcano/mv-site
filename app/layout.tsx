import "./globals.css";
import styles from "./page.module.css";
import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import '@mantine/core/styles.css';

import { ColorSchemeScript } from '@mantine/core';
import Logo from "./components/logo";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Eduardo Barbosa",
  description: "Creative Technologist and Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
