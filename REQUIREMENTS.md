# Requirements Specification

## 1. Functional Requirements
- **Welcome & Navigation**: The app must have a Home screen that welcomes the user and allows navigation to other areas.
- **Profile Display**: A Profile screen must display user information including name, bio, and avatar.
- **Profile Editing**: An Edit Profile screen must allow the user to modify their profile data using a form.
- **Form Validation**: The profile edit form must validate input before saving (e.g., name cannot be empty).
- **Activity/Interests Tracking**: An Activity or Interests screen must list items using a scrolling list. Users must be able to interact with the list (e.g., select, mark, or filter items).
- **Settings & Preferences**: A Settings screen must allow users to toggle app-wide preferences such as a Light/Dark theme.
- **Data Persistence**: Profile data, theme settings, and other app-wide preferences must be saved locally so they persist across app restarts.

## 2. Technical Requirements
- **Framework**: React Native with Expo.
- **Language**: JavaScript.
- **Navigation**: Stack Navigation (or equivalent class configuration) connecting at least 5 screens.
- **State Management**: `useState` for local state and Context API for global state.
- **Forms**: Controlled inputs for forms (Formik/Yup or custom class-based validation is allowed).
- **Lists**: `FlatList` or `SectionList` to render collections of data.
- **Storage**: `AsyncStorage` for local data persistence.
- **Styling**: `StyleSheet` or Styled Components utilizing Flexbox.
- **UI Components**: Must include custom reusable components.

## 3. Constraints
- The project must be named according to the convention `StudentName_ClassCode` or class rules.
- State mutation must be avoided (do not mutate objects/arrays directly).
- Clean folder structure separating screens, components, and services.

## 4. Out-of-Scope Requirements
- **Backend & APIs**: No real Firebase, backend, or real APIs are required.
- **Authentication**: No production-ready login/authentication system.
- **Advanced State Management**: Redux is not required (Context API is sufficient).
- **TypeScript**: Not required for this assignment.
- **Complex Animations**: High-end animations or external libraries outside core evidence are not expected or highly rewarded.

## 5. Failure & Edge Cases
- **First Run**: When `AsyncStorage` has no data, the app must load safely with sensible defaults and not crash.
- **Data Corruption**: If local data is missing or JSON parsing fails (corrupt data), the app must gracefully fallback to default values without crashing.
- **Validation Errors**: Submitting an empty or invalid name must prevent saving and display a clear error message.
- **Cancel Editing**: Modifying the profile but pressing 'Cancel' must discard changes and revert to the previously saved state without affecting the persistent storage.
- **Empty Lists**: If the activity/interests list is empty, a user-friendly "empty state" message must be rendered.
