import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
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
  description?: string; // long text description
  gallery?: string[]; // additional image URLs
  createdAt?: Date;
  updatedAt?: Date;
}

const propertiesCol = collection(db, 'properties');

function mapDoc(d: any): Property {
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
    description: data.description,
    gallery: data.gallery,
    createdAt: data.createdAt?.toDate?.() ?? undefined,
    updatedAt: data.updatedAt?.toDate?.() ?? undefined
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

export async function createProperty(data: CreatePropertyInput): Promise<string> {
  const docRef = await addDoc(propertiesCol, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
}

export async function updateProperty(id: string, data: UpdatePropertyInput): Promise<void> {
  const ref = doc(db, 'properties', id);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp()
  });
}

export async function deleteProperty(id: string): Promise<void> {
  const ref = doc(db, 'properties', id);
  await deleteDoc(ref);
}
