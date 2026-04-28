import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "@/components/icons";

const contactInfo = [
  {
    icon: Mail,
    label: "E-mail",
    waarde: "info@emergo.nl",
    href: "mailto:info@emergo.nl",
  },
  {
    icon: Phone,
    label: "Telefoon",
    waarde: "+31 (0)6 00 00 00 00",
    href: "tel:+31600000000",
  },
  {
    icon: MapPin,
    label: "Regio",
    waarde: "Heel Nederland",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-secondary/40 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Contact</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Interesse in een EMERGO verblijf? Stuur ons een bericht en wij nemen binnen één
              werkdag contact met u op voor een vrijblijvende offerte.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-8">Stuur ons een bericht</h2>
              <ContactForm />
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Contactgegevens</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-2.5 mt-0.5">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.waarde}
                        </a>
                      ) : (
                        <p className="font-medium">{item.waarde}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-secondary/50 rounded-xl">
                <h3 className="font-bold mb-2">Levertijd</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Na het plaatsen van een bestelling bedraagt de levertijd gemiddeld 4 tot 6 weken.
                  Wij nemen na ontvangst van uw aanvraag contact op om alles te bespreken.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
