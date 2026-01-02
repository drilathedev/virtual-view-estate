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
        title: 'Gabim',
        description: 'Ju lutem plotësoni të gjitha fushat e nevojshme.',
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
          title: 'Faleminderit!',
          description:
            'Kërkesa juaj u dërgua me sukses. Do të kontaktoheni shpejt.',
        });
      } else {
        toast({
          title: 'Kërkesa u pranua',
          description: 'Do të kontaktoheni shpejt.',
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
        title: 'Gabim',
        description: 'Diçka shkoi gabim. Ju lutem provoni përsëri.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-medium hover:shadow-hard transition-shadow">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Kërkesë për Pronën</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emri <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Emri juaj"
              className="h-10 border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="email@example.com"
              className="h-10 border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <Input
              type="tel"
              placeholder="Numri i telefonit"
              className="h-10 border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipi i Interesit
            </label>
            <Input
              placeholder="Shitje, Blerje, Qira, etj."
              className="h-10 border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mesazhi <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Plotëso detajet e kërkesës tuaj..."
              className="min-h-[100px] border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Duke dërguar...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Dërgo Kërkesën
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
