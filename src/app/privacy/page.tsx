export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacybeleid</h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-foreground">
            EMERGO hecht veel waarde aan de bescherming van uw persoonsgegevens. In dit
            privacybeleid willen we heldere en transparante informatie geven over hoe wij omgaan
            met persoonsgegevens.
          </p>
          <h2 className="text-xl font-bold text-foreground mt-8">Welke gegevens verzamelen wij?</h2>
          <p>
            Via ons contactformulier verzamelen wij: naam, e-mailadres, telefoonnummer (optioneel),
            hondenras (optioneel) en uw bericht/wensen.
          </p>
          <h2 className="text-xl font-bold text-foreground mt-8">Waarvoor gebruiken wij uw gegevens?</h2>
          <p>
            Uw gegevens worden uitsluitend gebruikt om uw offerte-aanvraag te verwerken en contact
            met u op te nemen. Wij delen uw gegevens nooit met derden.
          </p>
          <h2 className="text-xl font-bold text-foreground mt-8">Contact</h2>
          <p>
            Heeft u vragen over ons privacybeleid? Neem dan contact op via info@emergo.nl.
          </p>
        </div>
      </div>
    </section>
  );
}
