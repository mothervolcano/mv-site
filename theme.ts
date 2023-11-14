"use client";
import { camptonBook, camptonBold } from "./app/styles/fonts";
import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  fontFamily: camptonBook.style.fontFamily,
  headings: {
    fontFamily: camptonBold.style.fontFamily,
    sizes: { h1: { fontSize: rem(36) }, h2: { fontSize: rem(30) } },
  },
});
