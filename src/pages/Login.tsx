import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Navigate } from 'react-router-dom';
import { Lock, Mail, LogIn, AlertCircle, Loader2, Shield } from 'lucide-react';

export default function Login() {
  const { user, isAdmin, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Hyrja dështoi');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-3xl font-bold">Hyrje Admin</h1>
            <p className="text-muted-foreground">Hyni për të menaxhuar pronat tuaja</p>
          </div>

          {/* Login Card */}
          <Card className="shadow-medium hover:shadow-hard transition-shadow">
              <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">Mirësevini</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Adresa e Email-it
                  </label>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    Fjalëkalimi
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
                
                {error && (
                  <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  disabled={submitting} 
                  className="w-full h-11 gap-2" 
                  variant="hero"
                  size="lg"
                >
                      {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Duke u kyçur...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Hyr
                    </>
                  )}
                </Button>
              </form>

              <div className="pt-4 border-t text-center text-sm text-muted-foreground">
                <p>Zona e mbrojtur e administratorit - vetëm akses i autorizuar</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
