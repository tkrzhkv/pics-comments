# Pics comments Application

## Description

This project is a frontend application for manage comments. The application allows users to add and delete comments.


### Prerequisites

Before running the project, make sure you have the following tools installed:

- Node.js (version 19.x or higher)
- pnpm (version 6.x or higher)

## ��  Install & Use

```
pnpm install
pnpm  dev # For development
pnpm build && pnpm preview # For production preview
```

### Project Structure

```sh
pics-comments/
├── public/                     # Static assets
├── src/                        # Source code
│   index.css
│   main.tsx
│   sum.test.ts
│   vite-env.d.ts
│
├───app
│   │   App.tsx
│   │   appStore.ts
│   │   rootReducer.ts
│   │
│   ├───providers
│   │       index.ts
│   │       providers.tsx
│   │
│   └───router
│           appRouter.tsx
│           index.ts
│
├───entities
│   └───comment
│       └───ui
│               CommentCard.tsx
│               index.ts
│
├───features
│   └───comment
│       ├───commentForm
│       │   ├───model
│       │   │       schema.ts
│       │   │
│       │   └───ui
│       │       └───CommentForm
│       │               CommentForm.tsx
│       │               index.ts
│       │
│       ├───createComment
│       │   ├───api
│       │   │       postComment.ts
│       │   │       usePostComment.ts
│       │   │
│       │   └───model
│       │           types.ts
│       │
│       ├───deleteComment
│       │   ├───api
│       │   │       deleteComment.ts
│       │   │       index.ts
│       │   │       useDeleteComment.ts
│       │   │
│       │   └───model
│       ├───persistedComment
│       │   └───model
│       │           commentSlice.ts
│       │
│       └───persistedScroll
│           └───model
│                   scrollSlice.ts
│
├───pages
│   ├───home
│   │   └───ui
│   │           HomePage.tsx
│   │           index.ts
│   │
│   ├───login
│   │   └───ui
│   │           index.ts
│   │           LoginPage.tsx
│   │
│   └───notFoundPage
│       └───ui
│               index.ts
│               NotFoundPage.tsx
│
├───shared
│   ├───config
│   │   └───routes
│   │           index.ts
│   │           routes.ts
│   │
│   ├───hooks
│   │       useConfirmation.ts
│   │
│   ├───types
│   │   │   errorTypes.ts
│   │   │   index.ts
│   │   │
│   │   └───comments
│   │           getCommentsTypes.ts
│   │
│   ├───ui
│   │   ├───buttons
│   │   │   └───delete
│   │   │           DeleteButton.tsx
│   │   │           index.ts
│   │   │
│   │   ├───confirm-modal
│   │   │       index.ts
│   │   │       ModalConfirmation.tsx
│   │   │
│   │   ├───fallback
│   │   │       fallback.tsx
│   │   │       index.ts
│   │   │
│   │   ├───form
│   │   │   │   index.ts
│   │   │   │
│   │   │   ├───input
│   │   │   │       index.ts
│   │   │   │       Input.tsx
│   │   │   │
│   │   │   ├───submit-button
│   │   │   │       index.ts
│   │   │   │       SubmitButton.tsx
│   │   │   │
│   │   │   └───textarea
│   │   │           index.ts
│   │   │           Textarea.tsx
│   │   │
│   │   ├───layouts
│   │   │       index.ts
│   │   │       SuspenseLayout.tsx
│   │   │
│   │   └───spinner
│   │           FullSizeSpinner.tsx
│   │           index.ts
│   │
│   └───utils
│           handleMutationError.ts
│           removeScrollBarStyles.ts
│
├───widgets
│   ├───CommentFormContainer
│   │   │   index.ts
│   │   │
│   │   └───ui
│   │           CommentFormContainer.tsx
│   │
│   ├───CommentsListContainer
│   │   │   index.ts
│   │   │
│   │   ├───api
│   │   │       getComment.ts
│   │   │       useCommentsRetrieve.ts
│   │   │
│   │   └───ui
│   │           CommentsListContainer.tsx
│   │
│   └───CommentsVirtualizedList
│       │   index.ts
│       │
│       └───ui
│               CommentsVirtualizedList.tsx
│
└───__tests__          # TypeScript configuration

```

##  ��  Architectural Decision Document

### Introduction

This document outlines the architectural decisions made for the Pics comments application.

## Technology Stack
- React: For building the user interface.
- TypeScript: For static type checking.
- Vite: As the build tool.
- Redux: For state management.
- Chakra UI: For styling.
- Tanstack Query: For api calls
- Tanstack Virtual: For virtualize list.
- Vitest: For unit tests.
- BiomeJS: in separate branch "feat/biome-js" for fastest linting and formatting.
- pnpm: For package management.

## Key Architectural Decisions
- Component-Based Architecture: The application is structured around reusable components to promote modularity and maintainability.

## Feature-Sliced Design (FSD):

### Why FSD?
- Feature-Sliced Design (FSD) was chosen as the architectural pattern for organizing the project's structure. FSD helps in structuring a project by feature rather than by technical concern. This makes the project more scalable, maintainable, and easier to navigate.

### Benefits of FSD:
- Modularity: Features are encapsulated, making it easy to understand and work on individual parts of the application without affecting others.
- Scalability: As the application grows, new features can be added with minimal impact on existing code.
- Maintainability: Clear separation of concerns allows for easier updates and debugging.
- Team Collaboration: Different teams or developers can work on separate features simultaneously without much conflict.
- Improved Code Reusability: Components, hooks, and logic specific to a feature are grouped together, facilitating reuse across the project.
- State Management with Recoil: Recoil is used for state management to handle the global state of employees and other shared states. This allows for easy sharing of state across components.
- React Hook Form for Forms: React Hook Form, integrated with zod for schema validation, is used for handling form state and validation. This simplifies form handling and ensures data integrity.
- Vite for Building: Vite is chosen as the build tool for its performance benefits and seamless integration with modern front-end frameworks.
- Persisting State with Recoil Persist: To ensure that changes made by the user are saved and reflected upon subsequent page loads, Recoil Persist is used to persist the state in local storage.
- Custom Hooks for Separation of Concerns: Custom hooks such as useEmployees are used to encapsulate logic related to specific functionality, promoting separation of concerns and reusability
