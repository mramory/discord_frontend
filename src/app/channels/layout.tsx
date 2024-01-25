import { Metadata } from "next";
import { ConstantSidebar } from "./components/ConstantSidebar/ConstantSidebar";

export const metadata: Metadata = {
  title: "Main",
  description: "Main",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ widows: "100vw", height: "100vh", display: "flex" }}>
      <ConstantSidebar />
      {children}
    </main>
  );
}
