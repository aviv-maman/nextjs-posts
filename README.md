A full-stack application built with Next.js, PostgreSQL, and Lucia Auth. It allows users to create, read, update, and delete posts, as well as search for posts, and upload images. The application is responsive and features infinite scrolling and pagination. Users can sign up and log in with GitHub and create posts with images.
![](https://raw.githubusercontent.com/aviv-maman/nextjs-posts/master/public/preview.jpeg)

## Features

- **Responsive Design**
- **User Authentication with GitHub & Lucia Auth**
- **CRUD Operations**
- **Server Actions**
- **Search Functionality**
- **Pagination**
- **Infinite Scrolling**
- **Image Upload**

## Built with

- [React](https://react.dev)
- [Next.js](https://nextjs.org)
- PostgreSQL via [Neon](https://neon.tech)
- [Lucia Auth](https://lucia-auth.com)
- [Cloudinary](https://cloudinary.com)
- [ShadCN/UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Vercel](https://vercel.com)

## Usage

1. Clone the repository

   ```
   git clone https://github.com/aviv-maman/nextjs-posts
   ```

2. Rename the `.env.example` file to `.env.local` and fill in the required environment variables according to the next steps.
3. Sign Up on [GitHub](https://github.com) and go to Settings => Developer Settings => OAuth Apps and click on New OAuth App. Add the following details: Name: any name, Homepage URL: http://localhost:3000, Authorization callback URL: http://localhost:3000/api/auth/callback/github. Copy your Client ID and Client Secret and paste them into `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
4. Sign Up on [Neon](https://neon.tech), create a new project, copy and paste your connection string into `DATABASE_URL`.
5. Sign Up on [Cloudinary](https://cloudinary.com) to get your Cloudinary cloud name, API key, and API secret from your Cloudinary account and add them to `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

6. Install dependencies

   ```
   npm install
   ```

7. Run the development server

   ```
   npm run dev
   ```
