import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy, DocumentSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export type MediaType = 'photo' | 'video' | '3d';

export interface Property {
  id: string;
  title: string;
  location: string;
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
}

const propertiesCol = collection(db, 'properties');

function mapDoc(d: DocumentSnapshot): Property {
  const data = d.data();
  return {
    id: d.id,
    title: data.title,
    location: data.location,
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
    order: data.order ?? 999
  };
}

export async function listProperties(): Promise<Property[]> {
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
