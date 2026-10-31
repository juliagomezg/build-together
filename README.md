# BuildTogether

BuildTogether helps community organizers plan welcoming, hands-on sessions where beginners can explore AI by making something useful. It turns a few event details into a timed workshop outline with practical activities and tangible outcomes.

## Project status

The MVP is implemented and the production build has been validated with `npm run build`. There is no public live demo yet.

## The problem

Organizers often have a community need and a group of curious people, but may not know how to turn that into an accessible, practical AI-building event. BuildTogether provides a simple starting agenda that moves participants from identifying a real-world problem to sketching, building, testing, and sharing a small prototype.

## Who it is for

BuildTogether is for community organizers, facilitators, educators, and volunteer groups planning beginner-friendly AI build sessions. The activities are framed for people with different levels of experience and use collaborative, hands-on exercises.

## Features

- Set an event name, session length (one to six hours), group size (four to forty people), experience level, and a proposed challenge.
- Generate a deterministic, four-part agenda: identify a real-life problem, sketch a solution, prototype and test an AI-powered solution, and present the result.
- See timed activity descriptions and an intended outcome for each activity.
- View suggested materials and a summary of the session length and participant count.
- Switch the interface and generated agenda between English and Spanish.
- Print the generated plan using the browser’s print dialog.
- Use a responsive layout designed for desktop and smaller screens, with semantic form labels and visible keyboard focus styles.

The agenda uses a built-in template and apportions the selected session time across the four activities. It does not call an AI API. The event name, group size, experience level, and challenge are collected by the form; currently, only the event name, group size, and selected duration are reflected in the displayed plan. The proposed challenge and experience level do not customize the generated activities.

## Language support

The interface and activity copy are available in English and Spanish. Use the language selector in the header to change languages.

## Technology

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5
- [Vite](https://vite.dev/) 6
- CSS, with a system font stack and no UI framework

The agenda generation is local, deterministic application code. The app has no backend, external AI integration, account system, or paid service dependency.

## Get started

### Requirements

- Node.js (a current LTS release is recommended)
- npm

### Install and run locally

```sh
git clone https://github.com/juliagomezg/build-together
cd build-together
npm install
npm run dev
```

Vite prints the local development URL in the terminal after the server starts.

## Production build

```sh
npm run build
```

The optimized static site is written to `dist/`. To serve that build locally for a preview:

```sh
npm run preview
```

## Development process

Codex contributed to the project in four stages:

1. **MVP planning:** inspected the initially empty workspace and proposed a lightweight event-planning MVP and stack.
2. **Implementation:** scaffolded the Vite, React, and TypeScript app; built the bilingual event setup form, responsive styling, and rules-based agenda generator.
3. **Debugging:** investigated a stalled dependency installation, retried package installation with registry access, removed the hosted font dependency, and fixed a TypeScript unused-variable error.
4. **Build validation:** ran `npm run build` successfully after the fix. The local Vite development server was also started during implementation.

## Current limitations and future opportunities

- The four activities are a fixed template. The proposed challenge and experience selection do not yet tailor the agenda.
- The agenda is not editable, and plans are not saved between page visits. Printing is the available way to keep a copy.
- There is no backend, event sharing, collaboration, or account management.
- The generator does not use AI services; any AI tool used during the hands-on activity is selected and provided by the event organizer.
- Future improvements could tailor activity prompts to the submitted challenge and experience level, support editing and local draft saving, and offer shareable plan formats while keeping the app lightweight.

## Contributing

Contributions that improve beginner usability, accessibility, translations, or the practical quality of workshop activities are welcome. Please keep changes aligned with the project’s lightweight, client-side approach.
