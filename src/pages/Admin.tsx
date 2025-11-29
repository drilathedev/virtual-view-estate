import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listProperties, createProperty, updateProperty, deleteProperty, Property, CreatePropertyInput } from '@/lib/properties';
import { uploadFile } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Building2,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  LogOut,
  Loader2
} from 'lucide-react';

interface FormState extends Omit<CreatePropertyInput, 'mediaType'> {
  mediaType: 'photo' | 'video' | '3d';
  description?: string;
  videoUrl?: string;
  gallery?: string[];
}

const emptyForm: FormState = {
  title: '',
  location: '',
  price: '',
  beds: 0,
  baths: 0,
  area: 0,
  mediaType: 'photo',
  forRent: false,
  image: '',
  description: '',
  videoUrl: '',
  gallery: []
};

export default function Admin() {
  const { isAdmin, loading, logout } = useAuth();
  const qc = useQueryClient();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: listProperties
  });

  const createMut = useMutation({
    mutationFn: (data: CreatePropertyInput) => createProperty(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['properties'] });
      setForm(emptyForm);
    }
  });

  const updateMut = useMutation({
    mutationFn: (vars: { id: string; data: Partial<CreatePropertyInput> }) => updateProperty(vars.id, vars.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['properties'] });
      setForm(emptyForm);
      setEditingId(null);
    }
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteProperty(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['properties'] })
  });

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function startEdit(p: Property) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      location: p.location,
      price: p.price,
      beds: p.beds,
      baths: p.baths,
      area: p.area,
      mediaType: p.mediaType,
      forRent: p.forRent || false,
      image: p.image,
      description: p.description || '',
      videoUrl: p.videoUrl || '',
      gallery: p.gallery || []
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // Prepare payload without transient fields
    const payload: CreatePropertyInput = {
      title: form.title,
      location: form.location,
      price: form.price,
      beds: form.beds,
      baths: form.baths,
      area: form.area,
      mediaType: form.mediaType,
      forRent: form.forRent,
      image: form.image,
      description: form.description,
      videoUrl: form.videoUrl,
      gallery: form.gallery || []
    };
    if (editingId) {
      await updateMut.mutateAsync({ id: editingId, data: payload });
    } else {
      await createMut.mutateAsync(payload);
    }
  }

  // Upload handlers
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  async function handleImageFile(file?: File) {
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadFile(file, 'property-images');
      handleChange('image', url);
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleVideoFile(file?: File) {
    if (!file) return;
    setUploadingVideo(true);
    try {
      const url = await uploadFile(file, 'property-videos');
      handleChange('videoUrl', url);
      handleChange('mediaType', 'video');
    } finally {
      setUploadingVideo(false);
    }
  }

  if (!loading && !isAdmin) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col">
      <Header />
      <main className="flex-1 container-custom py-8 md:py-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-muted-foreground">Menaxho pronat dhe listingjet</p>
          </div>
          <Button variant="secondary" onClick={() => logout()} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Form */}
        <Card className="shadow-medium hover:shadow-hard transition-shadow">
          <CardHeader className="border-b bg-muted/50">
            <CardTitle className="flex items-center gap-3">
              {editingId ? (
                <>
                  <Edit2 className="h-6 w-6 text-accent" />
                  Edit Property
                </>
              ) : (
                <>
                  <Plus className="h-6 w-6 text-accent" />
                  Create New Property
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                    <Building2 className="h-5 w-5 text-accent" />
                    Basic Information
                  </h3>
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Property Title *</label>
                      <Input 
                        placeholder="e.g., Luxury 2-Bedroom Apartment in City Center" 
                        value={form.title} 
                        onChange={e => handleChange('title', e.target.value)} 
                        className="h-11"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Description</label>
                      <Textarea 
                        placeholder="Detailed description of the property, amenities, and neighborhood..." 
                        value={form.description} 
                        onChange={e => handleChange('description', e.target.value)} 
                        className="min-h-[140px] resize-none" 
                      />
                    </div>
                  </div>
                </div>
                {/* Property Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                    <MapPin className="h-5 w-5 text-accent" />
                    Property Details
                  </h3>
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          Location *
                        </label>
                        <Input 
                          placeholder="Prishtinë, Kosovë" 
                          value={form.location} 
                          onChange={e => handleChange('location', e.target.value)} 
                          className="h-11"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          Price *
                        </label>
                        <Input 
                          placeholder="€120,000 or €800/month" 
                          value={form.price} 
                          onChange={e => handleChange('price', e.target.value)} 
                          className="h-11"
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          Bedrooms *
                        </label>
                        <Input 
                          type="number" 
                          min={0} 
                          placeholder="2" 
                          value={form.beds} 
                          onChange={e => handleChange('beds', Number(e.target.value))} 
                          className="h-11"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Bath className="h-4 w-4 text-muted-foreground" />
                          Bathrooms *
                        </label>
                        <Input 
                          type="number" 
                          min={0} 
                          placeholder="1" 
                          value={form.baths} 
                          onChange={e => handleChange('baths', Number(e.target.value))} 
                          className="h-11"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Square className="h-4 w-4 text-muted-foreground" />
                          Area (m²) *
                        </label>
                        <Input 
                          type="number" 
                          min={0} 
                          placeholder="85" 
                          value={form.area} 
                          onChange={e => handleChange('area', Number(e.target.value))} 
                          className="h-11"
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Status *</label>
                        <Select 
                          value={form.forRent ? 'yes' : 'no'} 
                          onValueChange={(value) => handleChange('forRent', value === 'yes')}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">For Sale (Në Shitje)</SelectItem>
                            <SelectItem value="yes">For Rent (Me Qira)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Media Type *</label>
                        <Select 
                          value={form.mediaType} 
                          onValueChange={(value) => handleChange('mediaType', value as FormState['mediaType'])}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select media type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="photo">📷 Photo</SelectItem>
                            <SelectItem value="video">🎥 Video</SelectItem>
                            <SelectItem value="3d">🎮 3D Tour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Gallery URLs (comma-separated)</label>
                      <Input
                        placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                        value={form.gallery?.join(', ') || ''}
                        onChange={e => handleChange('gallery', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Media Upload Section */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                    <ImageIcon className="h-5 w-5 text-accent" />
                    Media & Assets
                  </h3>
                  
                  {/* Main Image */}
                  <div className="space-y-3 p-4 rounded-lg border bg-card">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      Main Image *
                    </label>
                    <Input 
                      placeholder="Image URL" 
                      value={form.image} 
                      onChange={e => handleChange('image', e.target.value)} 
                      className="h-11"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex-1">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={e => handleImageFile(e.target.files?.[0])} 
                          className="hidden"
                          id="image-upload"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full gap-2" 
                          onClick={() => document.getElementById('image-upload')?.click()}
                          disabled={uploadingImage}
                        >
                          {uploadingImage ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4" />
                              Upload Image
                            </>
                          )}
                        </Button>
                      </label>
                    </div>
                    {form.image && (
                      <div className="relative group">
                        <img 
                          src={form.image} 
                          alt="preview" 
                          className="w-full h-48 object-cover rounded-lg border-2 border-accent/20" 
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Badge className="bg-green-500">Preview</Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Video */}
                  <div className="space-y-3 p-4 rounded-lg border bg-card">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      Video (Optional)
                    </label>
                    <Input 
                      placeholder="Video URL" 
                      value={form.videoUrl} 
                      onChange={e => handleChange('videoUrl', e.target.value)} 
                      className="h-11"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex-1">
                        <input 
                          type="file" 
                          accept="video/*" 
                          onChange={e => handleVideoFile(e.target.files?.[0])} 
                          className="hidden"
                          id="video-upload"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full gap-2" 
                          onClick={() => document.getElementById('video-upload')?.click()}
                          disabled={uploadingVideo}
                        >
                          {uploadingVideo ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4" />
                              Upload Video
                            </>
                          )}
                        </Button>
                      </label>
                    </div>
                    {form.videoUrl && form.mediaType === 'video' && (
                      <video 
                        src={form.videoUrl} 
                        className="w-full h-48 object-cover rounded-lg border-2 border-accent/20" 
                        controls 
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button 
                type="submit" 
                variant="hero" 
                size="lg"
                disabled={createMut.isPending || updateMut.isPending}
                className="gap-2 flex-1 sm:flex-initial"
              >
                {createMut.isPending || updateMut.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {editingId ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    {editingId ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {editingId ? 'Update Property' : 'Create Property'}
                  </>
                )}
              </Button>
              {editingId && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  onClick={() => { setEditingId(null); setForm(emptyForm); }}
                  className="flex-1 sm:flex-initial"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
          </CardContent>
        </Card>

        {/* Properties List */}
        <Card className="shadow-medium hover:shadow-hard transition-shadow">
          <CardHeader className="border-b bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-accent" />
                Properties ({properties.length})
              </CardTitle>
              {properties.length > 0 && (
                <Badge variant="secondary" className="text-sm">
                  {properties.filter(p => p.forRent).length} for rent · {properties.filter(p => !p.forRent).length} for sale
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <p className="text-muted-foreground">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Building2 className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No properties yet</h3>
                <p className="text-muted-foreground max-w-sm">
                  Get started by creating your first property listing above.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b-2 bg-muted/30">
                    <th className="py-3 px-4 font-semibold">Image</th>
                    <th className="py-3 px-4 font-semibold">Property</th>
                    <th className="py-3 px-4 font-semibold">Location</th>
                    <th className="py-3 px-4 font-semibold">Price</th>
                    <th className="py-3 px-4 font-semibold text-center">Details</th>
                    <th className="py-3 px-4 font-semibold">Type</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p, idx) => (
                    <tr 
                      key={p.id} 
                      className="border-b hover:bg-muted/50 transition-colors"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <td className="py-4 px-4">
                        <div className="relative group">
                          <img 
                            src={p.image} 
                            alt={p.title} 
                            className="w-24 h-16 object-cover rounded-lg border-2 border-muted group-hover:border-accent transition-colors" 
                          />
                          {p.forRent && (
                            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5">
                              Rent
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 max-w-[200px]">
                        <div className="font-semibold text-foreground line-clamp-1 mb-1">{p.title}</div>
                        {p.description && (
                          <div className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                            {p.description}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="text-sm">{p.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-accent">{p.price}</div>
                        {p.forRent && <div className="text-xs text-muted-foreground">per month</div>}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Bed className="h-3 w-3" />
                            {p.beds}
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="h-3 w-3" />
                            {p.baths}
                          </div>
                          <div className="flex items-center gap-1">
                            <Square className="h-3 w-3" />
                            {p.area}m²
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant="outline" 
                          className={
                            p.mediaType === '3d' 
                              ? 'border-accent text-accent' 
                              : p.mediaType === 'video'
                              ? 'border-purple-500 text-purple-500'
                              : 'border-blue-500 text-blue-500'
                          }
                        >
                          {p.mediaType === 'photo' && '📷'}
                          {p.mediaType === 'video' && '🎥'}
                          {p.mediaType === '3d' && '🎮'}
                          {' '}{p.mediaType.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => startEdit(p)}
                            className="gap-1 hover:bg-accent hover:text-accent-foreground"
                          >
                            <Edit2 className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => deleteMut.mutate(p.id)} 
                            disabled={deleteMut.isPending}
                            className="gap-1"
                          >
                            {deleteMut.isPending ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
