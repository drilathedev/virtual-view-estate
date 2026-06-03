import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import house from "@/assets/property-3.jpg";

const faqs = [
  {
    q: "Çfarë lloje pronash ofroni?",
    a: "Ne ofrojmë një gamë të gjerë opsionesh — apartamente, shtëpi, vila, penthouse dhe tokë — për t'iu përshtatur nevojave dhe preferencave të çdo blerësi. Çdo pronë vjen me tura virtuale 360°, foto profesionale dhe informacion të detajuar.",
  },
  {
    q: "Si e di nëse një pronë është investim i mirë?",
    a: "Ekipi ynë ju ofron analiza tregu, të dhëna mbi lokacionin dhe tendencat e çmimeve, që t'ju ndihmojë të merrni vendime të informuara investimi.",
  },
  {
    q: "A duhet të punësoj një agjent të patundshmërive?",
    a: "Jo domosdoshmërisht. Platforma jonë ju lejon të eksploroni dhe kontaktoni direkt, por agjentët tanë janë gjithmonë në dispozicion për t'ju udhëhequr.",
  },
  {
    q: "Cili është procesi për blerjen e një prone?",
    a: "Procesi përfshin shqyrtimin e listimeve, vizitat virtuale ose fizike, negocimin e çmimit dhe finalizimin e dokumentacionit ligjor — ne ju shoqërojmë në çdo hap.",
  },
  {
    q: "A mund ta vizitoj pronën para blerjes?",
    a: "Patjetër. Mund të rezervoni një vizitë fizike ose të eksploroni pronën përmes turit tonë virtual 360° nga komoditeti i shtëpisë suaj.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="max-w-xs text-foreground">
            Pyetjet më të <span className="font-accent font-normal">shpeshta</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Ekspertët tanë ju udhëzojnë në marrjen e vendimeve të informuara investimi bazuar në
            njohuritë e tregut. Ne ofrojmë prona rezidenciale, komerciale dhe luksoze të përshtatura
            sipas preferencave dhe buxheteve të ndryshme.
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
