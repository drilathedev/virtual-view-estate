import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
        title: "Gabim",
        description: "Ju lutem plotësoni të gjitha fushat e nevojshme.",
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

      // Create email body
      const emailBody = `
Emri: ${name}
Email: ${email}
Telefon: ${phone || 'Nuk është dhënë'}

Mesazhi:
${message}
      `.trim();

      // Create mailto link
      const mailtoLink = `mailto:prona360rks@gmail.com?subject=Mesazh nga ${encodeURIComponent(name)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      if (telegramSent) {
        toast({
          title: "Faleminderit!",
          description: "Mesazhi juaj u dërgua me sukses. Do të kontaktoheni shpejt.",
        });
      } else {
        toast({
          title: "Mesazhi u dërgua",
          description: "Do të kontaktoheni shpejt.",
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
        title: "Gabim",
        description: "Diçka shkoi gabim. Ju lutem provoni përsëri.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Na Kontaktoni</h1>
              <p className="text-lg text-gray-600">
                Jemi këtu për t'ju ndihmuar. Kontaktoni ekipin tonë për çdo pyetje ose kërkesë.
              </p>
            </div>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Telefon</h3>
                  <a href="tel:+38349295636" className="text-blue-600 hover:underline">
                    +383 49 295 636
                  </a>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <a href="mailto:prona360rks@gmail.com" className="text-blue-600 hover:underline break-all">
                    prona360rks@gmail.com
                  </a>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Lokacioni</h3>
                  <p className="text-gray-600">
                    Drenas, Kosovë
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Dërgoni një mesazh</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emri <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          placeholder="Emri juaj" 
                          className="h-11 border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          type="email" 
                          placeholder="email@example.com" 
                          className="h-11 border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <Input 
                        placeholder="Numri i telefonit" 
                        className="h-11 border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mesazhi <span className="text-red-500">*</span>
                      </label>
                      <Textarea 
                        placeholder="Si mund t'ju ndihmojmë?" 
                        className="min-h-[150px] border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Duke dërguar...' : 'Dërgo Mesazhin'}
                    </Button>
                  </form>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Për të listuar një pronë</h3>
                  <p className="text-gray-700 text-sm">
                    Nëse dëshironi të shtoni pronën tuaj në platformën tonë, na kontaktoni drejtpërdrejt në email ose telefon. Ekipi ynë do t'ju ndihmojë me të gjithë procesin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
