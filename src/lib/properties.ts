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
    features: data.features ?? []
  };
}

export async function listProperties(): Promise<Property[]> {
  const q = query(propertiesCol, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(mapDoc);
}

export async function getProperty(id: string): Promise<Property | null> {
  const ref = doc(db, 'properties', id);
  const snap = await getDoc(ref);
  return snap.exists() ? mapDoc(snap) : null;
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
    console.log('[lib/properties] createProperty succeeded', { id: docRef.id });
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
    console.log('[lib/properties] updateProperty succeeded', { id });
  } catch (err: unknown) {
    console.error('[lib/properties] updateProperty failed', err, JSON.stringify(err, Object.getOwnPropertyNames(err as object), 2));
    throw err;
  }
}

export async function deleteProperty(id: string): Promise<void> {
  try {
    const ref = doc(db, 'properties', id);
    await withTimeout(deleteDoc(ref), 15000);
    console.log('[lib/properties] deleteProperty succeeded', { id });
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
