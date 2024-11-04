import type { Metadata } from "next";
import "./globals.css";
import { StyledEngineProvider } from "@mui/material/styles";

export const metadata: Metadata = {
  title: "Dream Cars",
  description: "Kup i sprzedawaj samochody w najlepszych cenach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledEngineProvider injectFirst>
        {children}
        </StyledEngineProvider>
      </body>
    </html>
  );
}
