import type { Metadata } from "next";
import { CloudRegionSelector } from "./CloudRegionSelector";

export const metadata: Metadata = {
  title: "Select Cloud Region",
  description:
    "Select the Langfuse Cloud region and continue to your destination.",
};

export default function CloudPage() {
  return <CloudRegionSelector />;
}
