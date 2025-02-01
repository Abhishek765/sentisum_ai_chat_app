# SentiSum AI Chat App

A modern chat app interacting with AI, built with React and TypeScript. The application supports multiple conversations, conversation feedback, and sharing capabilities.

## Features

- Multiple chat conversations
- Persistent conversation storage
- Light/Dark theme support
- Message formatting (bold/italic)
- Conversation feedback system
- Shareable conversation links
- Individual message reactions

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn
```

### Running the Application

Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Technical Choices

### Core Technologies

- **React + TypeScript**: Provides type safety and better developer experience
- **Redux Toolkit**: State management
- **Material-UI**: Provides consistent, customizable components with accessibility support

### State Management

- **Redux** was chosen for:
  - Centralized state management
  - Predictable state updates
  - Easy persistence with localStorage
  - Simplified sharing of conversation state

### Design System

- **Material-UI (MUI)** was selected because it:
  - Provides a comprehensive component library
  - Supports theming and customization
  - Includes built-in dark mode support
  - Offers excellent accessibility features

## Design Choices

### User Interface

1. **Sidebar Layout**

   - Provides easy access to all conversations
   - Allows quick switching between chats
   - Shows conversation status **(active/ended)**

2. **Message Display**

   - Clear visual distinction between user and AI messages
   - Feedback buttons appear on hover for clean UI
   - Support for text formatting (bold/italic)

3. **Feedback System**
   - Two-tier feedback:
     - Quick reactions for individual messages
     - Detailed feedback for entire conversations
   - Rating and optional comment support

### User Experience

1. **Progressive Disclosure**

   - Share button appears only after feedback
   - Feedback form shown automatically when ending conversation
   - Smooth scrolling to new elements

2. **Persistent State**
   - Conversations saved automatically
   - Theme preference remembered
   - No data loss between sessions

## Trade-offs and Future Improvements

### Current Trade-offs

1. **Local Storage**

   - Pro: Works offline, no backend needed
   - Con: Limited storage space, no cross-device sync

2. **Mock AI Responses**

   - Pro: Demonstrates UI without API dependency
   - Con: Limited interaction capabilities

3. **Share Implementation**
   - Pro: Simple URL-based sharing
   - Con: Relies on local storage, not suitable for production

### Future Improvements

1. **Backend Integration**

   - Real database storage
   - User authentication
   - Real-time updates

2. **Enhanced Features**

   - File attachment support
   - Code snippet formatting
   - Voice input/output
   - Conversation search
   - Export conversations

3. **Performance Optimizations**

   - Message virtualization for long conversations
   - Image lazy loading
   - Service worker for offline support (Optional)

4. **Additional UI Features**
   - Conversation folders/tags
   - Custom themes
   - Keyboard shortcuts
   - Mobile app version
