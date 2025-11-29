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
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id # optional
VITE_ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

The app reads config in `src/lib/firebase.ts`. Admin access is currently determined by the `VITE_ADMIN_EMAILS` allowlist.

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
