# CDG - Chip Designers Guild

CDG is a React + TypeScript website for the Chip Designers Guild at VIT Chennai. The site presents the club's identity, technical departments, leadership, flagship projects, events, and recruitment information in a polished, engineering-focused experience.

## Highlights

- Built with React 19, TypeScript, Vite, Tailwind CSS, Motion, and React Three Fiber
- Includes sections for hero content, who we are, departments, board members, projects, event timeline, and recruitment
- Uses animated transitions, lazy-loaded sections, and a custom loading screen for a smoother landing experience
- Ships with structured content in `src/constants.ts` for projects, events, departments, board roles, and open positions
- Includes a lightweight admin mode for managing events locally during runtime

## Project Structure

```text
.
|-- src/components/          Main homepage sections and shared UI building blocks
|-- src/context/             Admin context and local event management helpers
|-- src/constants.ts         Club data for stats, departments, projects, events, and recruitment
|-- src/types.ts             Shared TypeScript models
|-- src/App.tsx              Main page composition and section flow
|-- src/main.tsx             Application entry point
|-- public/                  Public assets such as club logos
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The development server runs on port `3000` and is configured to listen on `0.0.0.0`.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run TypeScript checks without emitting files
npm run clean    # Remove the dist folder
```

## Environment Variables

The project includes an `.env.example` file with the variables expected by the current setup:

```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=your_app_url
```

`vite.config.ts` exposes `GEMINI_API_KEY` to the client bundle through `process.env.GEMINI_API_KEY`. At the moment, the app structure is mostly content-driven and there is no obvious active Gemini feature in `src/`, but the environment hook is still present in the build configuration.

## Content and Admin Flow

Most of the website content is defined directly in `src/constants.ts`, including:

- department descriptions
- board structure
- project cards and technical specs
- event timeline entries
- recruitment roles and configuration

The admin context in `src/context/AdminContext.tsx` manages event data in local state and exposes a hidden admin toggle through `Ctrl + Shift + A`.

## Build Notes

- Styling is powered by Tailwind CSS v4 through the Vite plugin
- Several homepage sections are lazy-loaded to reduce upfront rendering cost
- The site uses Vercel SPA rewrites via `vercel.json`
- `metadata.json` identifies the project as the official website for the Chip Designers Guild at VIT Chennai

## License

This repository does not currently declare a license.
