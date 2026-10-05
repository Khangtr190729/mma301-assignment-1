# End-to-End Workflow

This document outlines the complete user journey and data flow for the application.

## 1. Startup & Hydration
- **Trigger**: User opens the app.
- **Action**: App attempts to read `profile`, `theme`, and other preferences from `AsyncStorage`.
- **Outcome**: 
  - If data exists and is valid, the app state is hydrated with the stored values.
  - If data is missing (first-run) or corrupted (JSON parse error), the app safely falls back to hardcoded default values.
- **Next**: App renders the `HomeScreen`.

## 2. Profile Read
- **Trigger**: User navigates to the `ProfileScreen` from Home.
- **Action**: The screen reads the shared global state (from Context or similar mechanism) containing the user's profile data.
- **Outcome**: Profile information (name, bio, avatar) is rendered.

## 3. Profile Edit & Validation
- **Trigger**: User taps the "Edit" button on the `ProfileScreen`.
- **Action**: App navigates to `EditProfileScreen`. Form is populated with the current profile state.
- **User Input**: User modifies text fields (e.g., name, bio).
- **Validation**: On submission, the form validates the input (e.g., name must not be empty).
  - If **Invalid**: An error message is displayed on the UI. The state is NOT saved.
  - If **Valid**: Proceed to save.

## 4. Save Changes
- **Trigger**: User submits a valid form.
- **Action**: 
  1. The shared profile state is immediately updated with the new data.
  2. The new profile object is serialized to JSON and saved to `AsyncStorage`.
- **Outcome**: App navigates back to `ProfileScreen`. The UI instantly reflects the new data without requiring a restart.

## 5. Cancel Edit
- **Trigger**: User taps "Cancel" or the back button while editing.
- **Action**: The local form state is discarded. Global state and `AsyncStorage` remain untouched.
- **Outcome**: App returns to `ProfileScreen` showing the original profile data.

## 6. Activity / Interests Interaction
- **Trigger**: User navigates to the `Activity/Interests` screen.
- **Action**: The screen fetches the collection data (from state or hardcoded source) and renders it using a `FlatList` or `SectionList`.
- **Interaction**: User interacts with an item (e.g., marks it as favorite, deletes, or filters the list).
- **Outcome**: The list state is updated, triggering a re-render of the list UI to reflect the user's action.

## 7. Settings & Theme Toggle
- **Trigger**: User navigates to the `SettingsScreen`.
- **Action**: User toggles the app theme (Light/Dark mode) or another preference.
- **Outcome**: 
  1. The shared `ThemeContext` updates immediately.
  2. The entire app's UI responds to the theme change.
  3. The new preference is asynchronously saved to `AsyncStorage`.

## 8. Restart Persistence
- **Trigger**: User forcefully closes and restarts the app.
- **Outcome**: During the Startup phase, the newly saved Profile and Theme preferences are fetched from `AsyncStorage`. The app launches directly into the state customized by the user prior to closing.

## 9. Missing / Corrupted Storage Fallback
- **Trigger**: During hydration, the `AsyncStorage.getItem()` returns null, or `JSON.parse()` throws an error.
- **Outcome**: A `try-catch` block catches the error. The hydration function returns a standard fallback object (e.g., `defaultProfile = { name: "Guest", bio: "" }`). The app continues to load normally, preventing a fatal crash.
