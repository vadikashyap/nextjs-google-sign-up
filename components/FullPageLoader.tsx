"use client";

import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme } from "@mui/material/styles";

export default function FullPageLoader(): JSX.Element {
  const boxStyles: SxProps<Theme> = {
    position: "fixed",
    inset: 0,
    background: "#fff",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Box sx={boxStyles}>
      <CircularProgress size={56} thickness={4} color='primary' />
    </Box>
  );
}
