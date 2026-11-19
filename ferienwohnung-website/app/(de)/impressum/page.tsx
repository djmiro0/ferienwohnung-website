import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getMessages } from "@/lib/i18n";
import { createLegalMetadata } from "@/lib/metadata";

const messages = getMessages("de");

export const metadata: Metadata = createLegalMetadata("de", messages, "imprint");

export default function GermanImprintPage() {
  return <LegalPage locale="de" messages={messages} page="imprint" />;
}
