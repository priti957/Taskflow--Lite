# Taskflow--Lite
Architecture Decisions:

Modular Vanilla JS: The application is built using ES Modules, promoting a clean separation between state management, UI rendering, and utility logic.

Security (XSS Prevention): To ensure a secure production environment, all user-generated content is sanitized via an escapeHTML utility. This prevents Cross-Site Scripting by converting potentially malicious characters into safe HTML entities.

Performance Optimization: * Debouncing: Rapid-fire events (like window resizing or search inputs) are debounced to prevent unnecessary layout shifts and computation.

Virtual Scrolling: For large datasets, the application implements a virtual list to maintain high FPS and low memory usage by only rendering items currently in the viewport.

💾 LocalStorage Schema:

The application state is persisted in localStorage under the key app_state. This allows for data persistence without a backend.

JSON
{
  "theme": "dark",
  "items": [
   {
      "id": "1713289891",
      "content": "Example entry",
      "createdAt": "2026-04-16T17:51:45"
    }
  ],
  "lastUpdated": "2026-04-16T17:55:00"
}

🔄 Event Flow Diagram
This diagram illustrates how data flows from user interaction through sanitization and into the state/storage layers.

Code snippet
graph TD:

    A[User Input/Interaction] --> B{Process Event}
    B -->|Rapid Input| C[Debounce/Throttle]
    B -->|Direct Action| D[Sanitize Data]
    C --> D
    D --> E[Update Application State]
    E --> F[Sync to LocalStorage]
    E --> G[Update UI/Virtual List]
    
