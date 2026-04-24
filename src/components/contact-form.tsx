"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "@/components/icons";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      naam: (form.elements.namedItem("naam") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telefoon: (form.elements.namedItem("telefoon") as HTMLInputElement).value,
      ras: (form.elements.namedItem("ras") as HTMLInputElement).value,
      bericht: (form.elements.namedItem("bericht") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Verzenden mislukt");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="text-xl font-bold">Bericht ontvangen!</h3>
        <p className="text-muted-foreground max-w-sm">
          Bedankt voor uw aanvraag. Wij nemen binnen één werkdag contact met u op.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2">
          Nieuw bericht sturen
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="naam" className="block text-sm font-medium mb-1.5">
            Naam <span className="text-destructive">*</span>
          </label>
          <input
            id="naam"
            name="naam"
            type="text"
            required
            placeholder="Jan de Vries"
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors placeholder:text-muted-foreground"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            E-mail <span className="text-destructive">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jan@voorbeeld.nl"
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="telefoon" className="block text-sm font-medium mb-1.5">
            Telefoonnummer
          </label>
          <input
            id="telefoon"
            name="telefoon"
            type="tel"
            placeholder="+31 6 00 00 00 00"
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors placeholder:text-muted-foreground"
          />
        </div>
        <div>
          <label htmlFor="ras" className="block text-sm font-medium mb-1.5">
            Hondenras
          </label>
          <input
            id="ras"
            name="ras"
            type="text"
            placeholder="Bijv. Labrador Retriever"
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bericht" className="block text-sm font-medium mb-1.5">
          Uw wensen <span className="text-destructive">*</span>
        </label>
        <textarea
          id="bericht"
          name="bericht"
          required
          rows={5}
          placeholder="Vertel ons over uw hond, uw tuin en uw wensen..."
          className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors placeholder:text-muted-foreground resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Er ging iets mis. Probeer het opnieuw of stuur een e-mail naar info@emergo.nl.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {status === "loading" ? "Versturen..." : "Aanvraag versturen"}
      </Button>
    </form>
  );
}
