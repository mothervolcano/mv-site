import "./globals.css";
import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import '@mantine/core/styles.css';

import { ColorSchemeScript } from '@mantine/core';

export const metadata: Metadata = {
  title: "Mother Volcano",
  description: "Creative Coder and Developer",
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
        {children}
      </body>
    </html>
  );
}
