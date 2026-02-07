import "./globals.css";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Ampup",
  description: "Some matches don’t need an introduction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={instrumentSerif.className}>
        {children}
      </body>
    </html>
  );
}
