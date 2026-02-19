import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import type { ReactNode } from "react";

export default function CustomersLayout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="container max-w-4xl mx-auto px-4 py-10">{children}</div>
    </HomeLayout>
  );
}
