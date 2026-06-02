# Kh1ev Next Generation

Kh1ev Next Generation is the official web portal and centralized management system for the Kh1ev ecosystem. Serving as both a public-facing hub and an administrative backend, this platform reflects the organization's growth from a standard technology community into a professional digital development entity.

## Purpose and Vision

The primary objective of this project is to provide a cohesive digital identity for the Kh1ev Organization. It consolidates three main divisions under one unified platform:
- Kh1ev Organization: The parent entity overseeing all operations.
- Kh1ev Community: A vibrant hub for networking, casual tech discussions, and gaming.
- Kh1ev Studio: A dedicated software engineering and digital development wing.

By integrating a polished, high-performance public website with a secure, custom-built administrative dashboard, this system enables seamless community management, showcases organizational milestones, and establishes a professional footprint in the technology sector.

## System Architecture and Tech Stack

This project is engineered using a modern, scalable technology stack:

- Framework: Next.js (App Router)
- Language: TypeScript
- Runtime & Package Manager: Bun
- Styling: Tailwind CSS
- Animation: GSAP (GreenSock Animation Platform)
- Database & Backend-as-a-Service: Supabase (PostgreSQL)
- Authentication: Supabase Auth with Server-Side Rendering (SSR) capabilities
- Integrations: Discord API for real-time community statistics and user data
- Deployment: Vercel

## Core Features

### Public Portal
- Dynamic Content Rendering: Real-time display of community statistics and active members using Discord API integrations.
- Corporate Identity: Dedicated sections for the organizational timeline, core values, and community rules.
- Team Roster: A highly categorized team directory managed directly from the database.
- Integrated Blog: A publishing platform for tech insights, patch notes, and community announcements.

### Administrative Dashboard
- Secure Access Control: Protected routing enforced via Next.js Middleware. Authentication strictly requires pre-approved Discord IDs cross-referenced with the Supabase database.
- Content Management System (CMS): Full Create, Read, Update, and Delete (CRUD) capabilities for managing the team roster, role assignments, and blog publications.
- Seamless State Management: Immediate UI synchronization following database mutations without requiring full page reloads.

## Development and Setup Process

### Prerequisites
- Bun (latest version recommended)
- A Supabase project instance

### Environment Variables
To run this project locally, you must create a `.env.local` file at the root of the project with the following keys:
- NEXT_PUBLIC_SUPABASE_URL: The URL of your Supabase project.
- NEXT_PUBLIC_SUPABASE_ANON_KEY: The public anonymous key for your Supabase project.
- NEXT_PUBLIC_DISCORD_SERVER_ID: The ID of the primary Discord server for fetching widget data.

### Installation Steps

1. Install dependencies:
   bun install

2. Start the development server:
   bun run dev

3. Access the application at http://localhost:3000.

## Project Structure

- /src/app: Contains all Next.js routes, API endpoints, and page components.
- /src/components: Reusable React components such as navigation bars, footers, and cards.
- /src/lib: Core library files, including the Supabase client initialization.
- /src/middleware.ts: Edge middleware for enforcing authentication on protected administrative routes.
- /public: Static assets, including images, icons, and fonts.

## Deployment Strategy

The application is optimized for deployment on Vercel. Continuous Integration and Continuous Deployment (CI/CD) are configured to automatically trigger builds upon pushes to the main branch. The build process ensures strict type-checking and statically analyzes the codebase to prevent runtime errors in production.