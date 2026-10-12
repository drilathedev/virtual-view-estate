import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import house from "@/assets/property-3.jpg";

const faqs = [
  {
    q: "What types of properties do you offer?",
    a: "We offer a wide variety of properties — apartments, private houses, luxury villas, penthouses, and land parcels — tailored to suit every buyer's requirements. Every listing features immersive 360° virtual tours, professional photography, and detailed specifications.",
  },
  {
    q: "How do I know if a property is a sound investment?",
    a: "Our team provides comprehensive market analyses, neighborhood development data, and price appreciation trends to help you make well-informed, high-yield investment decisions.",
  },
  {
    q: "Do I need to hire a separate real estate agent?",
    a: "Not necessarily. Our platform allows you to browse listings and connect directly with listing representatives, while our licensed consulting experts are always on hand to assist you throughout the process.",
  },
  {
    q: "What is the process for acquiring a property?",
    a: "The journey begins with exploring our curated listings and 3D walkthroughs, scheduling an in-person viewing, submitting an offer, and finalizing notary and legal documentation with our team's guidance.",
  },
  {
    q: "Can I take a virtual tour before scheduling an in-person visit?",
    a: "Absolutely! Every featured property includes an interactive 360° virtual tour so you can explore every room and angle from the comfort of your home before making an on-site visit.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="max-w-xs text-foreground">
            Frequently Asked <span className="font-accent font-normal text-primary">Questions</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Our property specialists guide you through making confident, informed real estate decisions.
            Browse our curated residential and investment opportunities crafted for diverse preferences and budgets.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Accordion type="single" collapsible defaultValue="item-0" className="lg:col-span-2 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-5 data-[state=open]:bg-card"
              >
                <AccordionTrigger className="py-4 text-left text-base font-medium text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="hidden overflow-hidden rounded-[1.5rem] lg:block">
            <img src={house} alt="Interior" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
