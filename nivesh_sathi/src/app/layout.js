import Navbar from "../components/navbar/Navbar";
import "./globals.css"
export const metadata = {
  title: "AI Mutual Fund Advisor",
  description: "AI-powered wealth management for Indian middle-class investors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Navbar />
      <body>{children}</body>
    </html>
  );
}
