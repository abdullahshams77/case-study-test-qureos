import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Study",
  description: "Case Study",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
