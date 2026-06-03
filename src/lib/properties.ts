import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy, DocumentSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import demo1 from '@/assets/property-1.jpg';
import demo2 from '@/assets/property-2.jpg';
import demo3 from '@/assets/property-3.jpg';

// Local preview fallback. Used when Firebase is not configured (no env vars) or
// when running against the placeholder demo project, so the design can be
// reviewed with sample data. Never triggers against a real, configured project.
const DEMO_PROJECT_ID = 'demo-prona360';
const DEMO_PROPERTIES: Property[] = [
  { id: 'demo-1', title: 'Apartament modern në qendër', location: 'Prishtinë, Qendra', price: '185,000', beds: 3, baths: 2, area: 96, mediaType: '3d', type: 'apartment', forRent: false, image: demo1, rating: 4.9, reviews: 202, latitude: 42.6629, longitude: 21.1655, features: ['Ballkon', 'Parking', 'Ngrohje qendrore'] },
  { id: 'demo-2', title: 'Vilë luksoze me oborr', location: 'Prishtinë, Veternik', price: '420,000', beds: 5, baths: 3, area: 240, mediaType: 'video', type: 'villa', forRent: false, image: demo2, rating: 5.0, reviews: 148, latitude: 42.6411, longitude: 21.1322, features: ['Kopsht', 'Garazh', 'Pamje'] },
  { id: 'demo-3', title: 'Penthouse me pamje panoramike', location: 'Prizren, Qendra', price: '2,500', beds: 2, baths: 2, area: 110, mediaType: 'photo', type: 'penthouse', forRent: true, image: demo3, rating: 4.8, reviews: 96, latitude: 42.2139, longitude: 20.7397, features: ['Tarracë', 'Lift', 'Klimë'] },
  { id: 'demo-4', title: 'Studio elegante pranë liqenit', location: 'Pejë, Qendra', price: '850', beds: 1, baths: 1, area: 48, mediaType: '3d', type: 'apartment', forRent: true, image: demo1, rating: 4.7, reviews: 64, latitude: 42.6592, longitude: 20.2887, features: ['Mobiluar', 'Internet'] },
  { id: 'demo-5', title: 'Shtëpi familjare me kopsht', location: 'Ferizaj', price: '155,000', beds: 4, baths: 2, area: 165, mediaType: 'photo', type: 'house', forRent: false, image: demo2, rating: 4.9, reviews: 121, latitude: 42.3705, longitude: 21.1553, features: ['Kopsht', 'Bodrum'] },
  { id: 'demo-6', title: 'Apartament i ri me ballkon', location: 'Gjakovë', price: '98,000', beds: 2, baths: 1, area: 72, mediaType: 'video', type: 'apartment', forRent: false, image: demo3, rating: 4.6, reviews: 53, latitude: 42.3803, longitude: 20.4308, features: ['Ballkon', 'Parking'] },
];
const useDemoData = !isFirebaseConfigured || (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) === DEMO_PROJECT_ID;

export type MediaType = 'photo' | 'video' | '3d';

export interface Property {
  id: string;
  title: string;
  location: string;
  latitude?: number; // geographic latitude for map display
  longitude?: number; // geographic longitude for map display
  price: string; // e.g. "€120,000" or "€2,500/muaj"
  beds: number;
  baths: number;
  area: number; // square meters
  mediaType: MediaType;
  type?: string; // e.g. apartment, shtepi, vile, penthouse (optional)
  forRent?: boolean;
  image: string; // main image URL
  videoUrl?: string; // optional video URL
  kuulaId?: string; // optional Kuula collection ID for 3D tours
  description?: string; // long text description
  gallery?: string[]; // additional image URLs
  createdAt?: Date;
  updatedAt?: Date;
  phone?: string; // contact number
  email?: string; // property email
  features?: string[]; // property features
  order?: number; // display order (lower = first)
  rating?: number; // average review rating (0-5)
  reviews?: number; // number of reviews
}

const propertiesCol = collection(db, 'properties');

function mapDoc(d: DocumentSnapshot): Property {
  const data = d.data();
  return {
    id: d.id,
    title: data.title,
    location: data.location,
    latitude: data.latitude,
    longitude: data.longitude,
    price: data.price,
    beds: data.beds,
    baths: data.baths,
    area: data.area,
    mediaType: data.mediaType,
    type: data.type ?? undefined,
    forRent: data.forRent,
    image: data.image,
    videoUrl: data.videoUrl,
    kuulaId: data.kuulaId,
    description: data.description,
    gallery: data.gallery,
    createdAt: data.createdAt?.toDate?.() ?? undefined,
    updatedAt: data.updatedAt?.toDate?.() ?? undefined,
    phone: data.phone ?? '',
    email: data.email ?? '',
    features: data.features ?? [],
    order: data.order ?? 999,
    rating: data.rating ?? undefined,
    reviews: data.reviews ?? undefined
  };
}

export async function listProperties(): Promise<Property[]> {
  if (useDemoData) return DEMO_PROPERTIES;
  const snap = await getDocs(propertiesCol);
  const properties = snap.docs.map(mapDoc);
  // Sort: properties without order first (newest first), then properties with order numbers
  return properties.sort((a, b) => {
    const orderA = a.order ?? -1; // -1 means no order set
    const orderB = b.order ?? -1;
    
    // Both have no order: sort by createdAt descending (newest first)
    if (orderA === -1 && orderB === -1) {
      const dateA = a.createdAt?.getTime() ?? 0;
      const dateB = b.createdAt?.getTime() ?? 0;
      return dateB - dateA;
    }
    
    // Only A has no order: A comes first
    if (orderA === -1) return -1;
    
    // Only B has no order: B comes first
    if (orderB === -1) return 1;
    
    // Both have orders: sort by order ascending
    return orderA - orderB;
  });
}

export async function getProperty(id: string): Promise<Property | null> {
  if (useDemoData) return DEMO_PROPERTIES.find(p => p.id === id) ?? null;
  try {
    const ref = doc(db, 'properties', id);
    const snap = await getDoc(ref);
    return snap.exists() ? mapDoc(snap) : null;
  } catch (error: any) {
    console.error('getProperty error:', error);
    // Check if it's a network/firewall issue
    if (error?.code === 'unavailable' || error?.message?.includes('network') || error?.message?.includes('fetch')) {
      throw new Error('Network error: Firebase may be blocked in your region');
    }
    throw error;
  }
}

export type CreatePropertyInput = Omit<Property, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePropertyInput = Partial<CreatePropertyInput>;

// Small helper to fail a slow operation after timeoutMs milliseconds.
function withTimeout<T>(p: Promise<T>, timeoutMs = 15000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let settled = false;
    p.then(v => { if (!settled) { settled = true; resolve(v); } }).catch(err => { if (!settled) { settled = true; reject(err); } });
    setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error(`operation timed out after ${timeoutMs}ms`));
      }
    }, timeoutMs);
  });
}

export async function createProperty(data: CreatePropertyInput): Promise<string> {
  try {
    const promise = addDoc(propertiesCol, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    const docRef = await withTimeout(promise, 15000);
    return docRef.id;
  } catch (err: unknown) {
    console.error('[lib/properties] createProperty failed', err, JSON.stringify(err, Object.getOwnPropertyNames(err as object), 2));
    // Rethrow so callers (mutations) receive proper rejection and can clear UI states
    throw err;
  }
}

export async function updateProperty(id: string, data: UpdatePropertyInput): Promise<void> {
  try {
    const ref = doc(db, 'properties', id);
    await withTimeout(updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp()
    }), 15000);
  } catch (err: unknown) {
    console.error('[lib/properties] updateProperty failed', err, JSON.stringify(err, Object.getOwnPropertyNames(err as object), 2));
    throw err;
  }
}

export async function deleteProperty(id: string): Promise<void> {
  try {
    const ref = doc(db, 'properties', id);
    await withTimeout(deleteDoc(ref), 15000);
  } catch (err: unknown) {
    console.error('[lib/properties] deleteProperty failed', err, JSON.stringify(err, Object.getOwnPropertyNames(err as object), 2));
    throw err;
  }
}

export interface PropertyFeature {
  id: string;
  name: string;
}

const featuresCol = collection(db, 'propertyFeatures');

function mapFeatureDoc(d: DocumentSnapshot): PropertyFeature {
  const data = d.data();
  return {
    id: d.id,
    name: data.name,
  };
}

export async function listPropertyFeatures(): Promise<PropertyFeature[]> {
  const snap = await getDocs(featuresCol);
  return snap.docs.map(mapFeatureDoc);
}

export async function createPropertyFeature(name: string): Promise<string> {
  const docRef = await addDoc(featuresCol, { name });
  return docRef.id;
}

export async function deletePropertyFeature(id: string): Promise<void> {
  const ref = doc(featuresCol, id);
  await deleteDoc(ref);
}
