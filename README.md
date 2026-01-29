# Supabase Auth Demo

A minimal Next.js project demonstrating Supabase authentication with email/password and Google OAuth.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project** and fill in the details

### 3. Get your API keys

1. In your Supabase project, go to **Project Settings** > **API**
2. Copy the **Project URL** and **anon public** key

### 4. Configure environment variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Configure redirect URLs

1. Go to **Authentication** > **URL Configuration**
2. Add to **Redirect URLs**:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)

### 6. (Optional) Disable email confirmation for testing

1. Go to **Authentication** > **Providers** > **Email**
2. Turn off **Confirm email**

## Google OAuth Setup

### 1. Create Google OAuth credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Web application**
6. Add authorized redirect URI:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```
7. Copy the **Client ID** and **Client Secret**

### 2. Enable Google in Supabase

1. In Supabase, go to **Authentication** > **Providers**
2. Find **Google** and enable it
3. Paste your **Client ID** and **Client Secret**
4. Save

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
