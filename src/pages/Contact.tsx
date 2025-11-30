import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-24">
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-center">Na Kontaktoni</h1>
            <p className="text-muted-foreground text-center">Për pyetje ose kërkesa specifike, na dërgoni një mesazh dhe ne do t'ju kontaktojmë sa më shpejt.</p>

            <div className="p-6 rounded-lg border bg-card">
              <form className="space-y-4">
                <Input placeholder="Emri juaj" className="h-11" />
                <Input type="email" placeholder="Email" className="h-11" />
                <Input placeholder="Numri i telefonit" className="h-11" />
                <Textarea placeholder="Mesazhi" className="min-h-[140px]" />
                <Button variant="hero">Dërgo Mesazhin</Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
