import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { sendToTelegram } from '@/lib/telegram';
import { Send, Loader2 } from 'lucide-react';

interface PropertyInquiryFormProps {
  propertyId?: string;
  propertyTitle?: string;
  onSuccess?: () => void;
}

export const PropertyInquiryForm = ({
  propertyId,
  propertyTitle,
  onSuccess,
}: PropertyInquiryFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !message) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to Telegram
      const telegramSent = await sendToTelegram({
        customer: {
          name,
          email,
          phone,
          interest,
        },
        property: {
          title: propertyTitle,
          id: propertyId,
        },
        message,
        date: new Date().toISOString(),
      });

      if (telegramSent) {
        toast({
          title: 'Thank You!',
          description:
            'Your inquiry has been sent successfully. Our team will contact you shortly.',
        });
      } else {
        toast({
          title: 'Inquiry Received',
          description: 'Our team will contact you shortly.',
        });
      }

      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setInterest('');
      setMessage('');

      // Call callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="rounded-[1.6rem] border border-border/80 shadow-soft hover:shadow-medium transition-shadow overflow-hidden">
      <CardHeader className="border-b border-border/70 bg-secondary/30 px-6 py-4">
        <CardTitle className="text-base font-semibold">Direct Property Inquiry</CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">Send a private inquiry directly to our listing agent</p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
              Full Name <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Your full name"
              className="h-11 rounded-xl bg-secondary/40 border-border/70 focus:bg-background focus-visible:ring-primary text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Email Address <span className="text-destructive">*</span>
            </label>
            <Input
              type="email"
              placeholder="email@example.com"
              className="h-11 rounded-2xl bg-secondary/60 border-input focus-visible:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="e.g. +383 49 123 456"
              className="h-11 rounded-2xl bg-secondary/60 border-input focus-visible:ring-primary"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Interest Type
            </label>
            <Input
              placeholder="Buying, Renting, Investment, etc."
              className="h-11 rounded-2xl bg-secondary/60 border-input focus-visible:ring-primary"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Message <span className="text-destructive">*</span>
            </label>
            <Textarea
              placeholder="Tell us about your requirements or questions..."
              className="min-h-[100px] rounded-2xl bg-secondary/60 border-input focus-visible:ring-primary"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending Inquiry...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Inquiry
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
