# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7941d311-3349-4e4d-bf3e-957bb869dbda

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7941d311-3349-4e4d-bf3e-957bb869dbda) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Firebase (Auth, Firestore, Storage)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7941d311-3349-4e4d-bf3e-957bb869dbda) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Firebase Configuration

Create a `.env` file (or `.env.local`) in the project root with your Firebase keys (do NOT commit real secrets publicly):

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket    # e.g. pronad360d.firebasestorage.app (or use the full gs:// URL)
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id # optional
VITE_ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

The app reads config in `src/lib/firebase.ts`. Admin access is currently determined by the `VITE_ADMIN_EMAILS` allowlist.

Note: the app now accepts either a plain bucket name (e.g. `prona360d.firebasestorage.app`) or a full `gs://` URL in `VITE_FIREBASE_STORAGE_BUCKET`. The SDK is initialized to target the configured bucket explicitly so uploads from the Admin UI (via `src/lib/storage.ts`) will go to that bucket.

Upload behavior:
- Files uploaded by the Admin UI use the helper `src/lib/storage.ts` and are stored under the folder you pick (e.g. `property-images` or `property-videos`).
- File names are sanitized and prefixed with a timestamp (e.g. `property-images/1691234567890_my_photo.jpg`).
- Content-type metadata is set from the uploaded file (so images/videos are stored with the correct MIME type).

403 Permission denied while uploading
-----------------------------------

If you see "403 Permission denied" (like the POST to https://firebasestorage.googleapis.com/v0/b/<your-bucket>/o returning 403), that means the client is not authorized to write to the bucket under your current Storage rules. Common causes and fixes:

- You're not signed in (or your authentication token wasn't sent). The client SDK must be used while the user is authenticated, or the Storage rules must allow unauthenticated writes (not recommended).
- Your Storage security rules disallow writes to the path you attempted to upload to — update the rules to allow authenticated writes, or restrict writes to an allowlist of admin emails / custom claims.
- You're making REST calls directly and missing the Authorization header (ID token) or CORS is blocking the request.

Suggested minimal rules for development (restrict writes to authenticated users):

```
rules_version = '2';
service firebase.storage {
	match /b/{bucket}/o {
		match /property-images/{allPaths=**} {
			allow read: if true;
			// allow create/write only if authenticated
			allow write: if request.auth != null;
		}

		match /property-videos/{allPaths=**} {
			allow read: if true;
			allow write: if request.auth != null;
		}

		// Fallback — only admins can write elsewhere. Replace these emails with your admin addresses
		match /{allPaths=**} {
			allow read: if true;
			allow write: if request.auth != null && request.auth.token.email in ['your-admin@example.com'];
		}
	}
}
```

Stronger production pattern (recommended): use custom claims for admin users and limit write access to users where `request.auth.token.admin == true`.

Deploy rules using the Firebase Console or via the Firebase CLI (firebase deploy --only storage).

If you are using direct REST calls (not the SDK), ensure the request has an Authorization header with a current ID token from Firebase Auth. The browser SDK handles this automatically if the user is signed in.

Finally, the app now surfaces friendly errors when uploads fail — the Admin UI will show a toast telling you to sign-in or that permission was denied, and the upload helper will return helpful text. If you still get 403, double-check these rules and the console logs.

Deploying rules with the Firebase CLI (example)
----------------------------------------------

If you'd like to deploy the `storage.rules` file that lives in the repository, here's a quick guide using the Firebase CLI:

1. Install the CLI (if you haven't):

```bash
npm install -g firebase-tools
firebase login
```

2. Option A — quick manual deploy from the Console:
	 - Go to the Firebase Console → Storage → Rules, paste the rules from `storage.rules` and publish.

3. Option B — deploy with the CLI (recommended if you want rules in source control):
	 - Create a `firebase.json` in your project root if you don't have one, and reference the `storage.rules` file:

```json
{
	"storage": {"rules": "storage.rules"}
}
```

	- Then run:

```bash
firebase use --add  # choose or add your 'prona360d' project id
firebase deploy --only storage
```

Notes:
- Ensure the firebase CLI is authenticated (`firebase login`) and you have permission to update rules for `prona360d`.
- After deploying, try uploading again with the Admin UI while signed in — the upload helper will log the bucket + path and show toasts for errors.

## Firestore Data Model

Collection: `properties`

Each document contains (example minimal):

```json
{
	"title": "Apartament Modern në Prishtinë",
	"location": "Prishtinë, Kosovë",
	"price": "€120,000",
	"beds": 2,
	"baths": 2,
	"area": 85,
	"mediaType": "3d",
	"forRent": false,
	"image": "https://example.com/image.jpg",
	"description": "Apartament modern me dritë natyrale.",
	"videoUrl": "https://example.com/video.mp4",
	"gallery": ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
	"createdAt": <serverTimestamp>,
	"updatedAt": <serverTimestamp>
}
```

## Firestore Security Rules (Sample)

Adjust to your needs. Allows read to anyone; write only to authenticated admin emails stored in custom list. For production you may prefer custom claims.

```firestore
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
		function isAdmin() {
			// Replace with custom claims (e.g. request.auth.token.admin == true) for stronger control
			return request.auth != null && (
				request.auth.token.email in [
					'admin1@example.com',
					'admin2@example.com'
				]
			);
		}

		match /properties/{id} {
			allow read: if true;
			allow create, update, delete: if isAdmin();
		}
	}
}
```

## Development Notes

- Property listing (`PropertyGrid`) uses React Query to load Firestore documents.
- Admin panel (`/admin`) offers CRUD (create/edit/delete) with image & video file uploads (Firebase Storage) or direct URLs.
- Property detail page now displays description, sale/rent badge, optional hero video, and gallery if provided.
- New fields: `description`, `videoUrl`, `gallery[]`.
- Upload helper: `uploadFile` in `src/lib/storage.ts` stores files under `property-images/` and `property-videos/`.

## Next Steps / Enhancements

- Migrate admin logic to custom claims for better security.
- Add field validations with Zod + UI error messages.
- Include pagination / infinite scroll using Firestore queries.
- Add optimistic updates & toast notifications on CRUD.
- Implement multi-file gallery uploader with drag-and-drop.
