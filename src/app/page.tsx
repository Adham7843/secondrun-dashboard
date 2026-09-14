import { redirect } from "next/navigation";

// VAULT entry: no public archive here. Members land in the console;
// everyone else meets the clearance gate there.
export default function VaultHome() {
  redirect("/dashboard");
}
