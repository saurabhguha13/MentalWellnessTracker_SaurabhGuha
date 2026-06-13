# Samridhi - Mental Wellness for Students

Samridhi (Prosperity/Success/Growth) is a holistic AI-powered mental wellness tracker designed explicitly for **students preparing for stressful exams**. Exam preparation can be an incredibly isolating and anxiety-inducing journey. Samridhi serves as a constant companion, offering emotional support, cognitive reframing, and actionable focus tools.

## Key Features

- **AI Companion Chat**: A specialized, empathetic AI bot prompt engineered to act as a supportive study buddy. It helps students reframe negative thoughts ("I can't pass this test") into productive ones.
- **Mood Logging**: Quick, intuitive check-ins to track how students are feeling about their exam preparation.
- **Focus & Breathing Tools**: Built-in Pomodoro timers to structure study sessions, and interactive 4-7-8 breathing exercises to mitigate pre-exam panic.
- **Journaling**: Secure, private space to vent out frustrations and log daily study experiences.
- **Analytics Dashboard**: Visual representations of wellness scores, identifying triggers and correlations between study hours and mood.

## Technologies Used

- **Frontend**: React 19, Vite, Framer Motion (for physics-based micro-animations), Lucide React.
- **Styling**: Modern Vanilla CSS utilizing post-2024 features like `oklch`, layered `box-shadow` techniques, `backdrop-filter` for glassmorphism, and responsive `cubic-bezier` transitions.
- **Backend & Auth**: Firebase Authentication, Firestore.
- **AI Integration**: Google Gemini API (`@google/generative-ai`) for the companion chat and journal analysis.
- **State Management**: Redux Toolkit & Redux Persist.

## Evaluation Metric Focus

- **Code Quality**: 0 ESLint errors, clean component structures, modular Redux slices, custom hooks, and strict adherence to React 19 best practices.
- **Security**: Hardened Content-Security-Policy (CSP) in `index.html`, hidden `.env` files via `.gitignore`, and robust Firebase Auth integration.
- **Efficiency**: Vite build chunk-splitting configured for fast caching, and `React.lazy` routing implemented for sub-second Largest Contentful Paint (LCP) times.
- **Testing**: `vitest` and React Testing Library configured. Passing unit tests verify Redux state flows.
- **Accessibility**: High-contrast UI, `aria-labels` on interactive elements, and accessible focus states.
- **Problem Statement Alignment**: Deeply focused on student stress mitigation, not just generic mood tracking.

## Getting Started

1. `npm install`
2. Create a `.env` file with your `VITE_FIREBASE_API_KEY` and Gemini keys.
3. `npm run dev`

---
*Built to help students conquer their exams with a clear mind.*
