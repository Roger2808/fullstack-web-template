import { apiFetch } from "@/shared/api/config";
import { ContactMessageInput } from "./types";

export const contactApi = {
  submit: (input: ContactMessageInput) =>
    apiFetch<{ id: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(input),
    }),
};
