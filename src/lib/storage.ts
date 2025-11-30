import { storage, STORAGE_BUCKET_URL } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL, UploadTask, UploadMetadata } from 'firebase/storage';

/**
 * Upload a file to the configured Firebase Storage bucket.
 * - Uses resumable uploads which are better for larger files (videos)
 * - Sets content-type metadata so the stored file has correct MIME
 * - Returns the download URL for immediate use in the app
 */
export async function uploadFile(file: File, folder: string): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const path = `${folder}/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);

  const metadata: UploadMetadata = {};
  if (file.type) metadata.contentType = file.type;

  // Debug: show which bucket we will upload to (helps verify runtime config)
  // eslint-disable-next-line no-console
  console.debug('[uploadFile] storage bucket URL:', STORAGE_BUCKET_URL, 'path:', path);

  // Use resumable upload so larger files (videos) won't fail midway.
  // Wrap status in a Promise for simpler async/await flow.
  await new Promise<void>((resolve, reject) => {
    const task: UploadTask = uploadBytesResumable(storageRef, file, metadata);

    task.on('state_changed',
      () => undefined, // progress can be added here if needed
      (err) => reject(err),
      () => resolve()
    );
  });

  try {
    // Return a public download URL (if your rules permit).
    return await getDownloadURL(storageRef);
  } catch (err: any) {
    // Wrap common permission denied error to give clearer guidance to the UI.
    if (err?.code === 'storage/unauthorized' || (err?.message && /permission/i.test(err.message))) {
      throw new Error('Permission denied while uploading to Storage. Check your Firebase Storage rules and ensure the client is properly authenticated (or use a secure server-side upload).');
    }
    throw err;
  }
}
