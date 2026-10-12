import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sendToTelegram } from '@/lib/telegram';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to Telegram
      const telegramSent = await sendToTelegram({
        name,
        email,
        phone,
        subject: 'Contact Form Inquiry',
        message,
        date: new Date().toISOString(),
      });

      if (telegramSent) {
        toast({
          title: "Thank you!",
          description: "Your message has been sent successfully. We will get back to you shortly.",
        });
      } else {
        toast({
          title: "Message sent",
          description: "We will get in touch with you soon.",
        });
      }
      
      // Reset form after a short delay
      setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />
      <main className="pb-20">
        {/* Hero Section */}
        <div className="border-b border-border/70 bg-secondary/40 py-14 lg:py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="chip bg-primary/10 text-primary">Get in Touch</span>
              <h1 className="text-foreground">Contact Us</h1>
              <p className="text-lg text-muted-foreground">
                We're here to help. Reach out to our team with any questions or listing inquiries.
              </p>
            </div>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="lg:col-span-1 space-y-6">
                <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-shadow hover:shadow-medium">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Phone</h3>
                  <a href="tel:+38349295636" className="text-primary hover:underline">
                    +383 49 295 636
                  </a>
                </div>

                <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-shadow hover:shadow-medium">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Email</h3>
                  <a href="mailto:prona360rks@gmail.com" className="text-primary hover:underline break-all">
                    prona360rks@gmail.com
                  </a>
                </div>

                <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-shadow hover:shadow-medium">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground">
                    Drenas, Kosovo
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-soft">
                  <h2 className="mb-6 text-2xl font-bold text-foreground">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground/80">
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          placeholder="Your full name"
                          className="h-11 rounded-2xl bg-secondary/60 border-input focus-visible:ring-primary"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground/80">
                          Email <span className="text-destructive">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          className="h-11 rounded-2xl bg-secondary/60 border-input focus-visible:ring-primary"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground/80">
                        Phone Number
                      </label>
                      <Input
                        placeholder="+383 49 123 456"
                        className="h-11 rounded-2xl bg-secondary/60 border-input focus-visible:ring-primary"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground/80">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        placeholder="How can we help you?"
                        className="min-h-[150px] rounded-2xl bg-secondary/60 border-input focus-visible:ring-primary"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 w-full rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90 shadow-glow disabled:opacity-50 md:w-auto"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>

                {/* Info Box */}
                <div className="mt-6 rounded-3xl border border-primary/20 bg-primary/5 p-6">
                  <h3 className="mb-2 font-semibold text-foreground">Looking to list a property?</h3>
                  <p className="text-sm text-muted-foreground">
                    If you would like to feature your property on our platform with 360° virtual tours, reach out directly by email or phone. Our team will guide you through the entire process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Contact;
