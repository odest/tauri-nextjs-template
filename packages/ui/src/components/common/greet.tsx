"use client";

import { isTauri, invoke } from "@tauri-apps/api/core";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useGreetStore } from "@workspace/ui/stores/greet-store";
import { useTranslations } from "@workspace/i18n";

export const Greet = () => {
  const { name, greetMsg, setName, setGreetMsg } = useGreetStore();
  const t = useTranslations("Greet");

  const handleGreet = async () => {
    try {
      if (isTauri()) {
        const message = await invoke("greet", { name });
        setGreetMsg(message as string);
      } else {
        const response = await fetch("/api/greet", {
          method: "POST",
          body: JSON.stringify({ name }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setGreetMsg(data.greeting);
      }
      setName("");
    } catch (error) {
      console.error("Greet error:", error);
      setGreetMsg(t("error"));
    }
  };

  return (
    <div>
      <form
        className="flex space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleGreet();
        }}
      >
        <Input
          id="greet-input"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder={t("placeholder")}
        />
        <Button type="submit">{t("button")}</Button>
      </form>
      <p className="mt-4">{greetMsg}</p>
    </div>
  );
};
