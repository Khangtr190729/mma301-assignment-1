# State and Data Mapping

Proper state management is a core requirement. This document classifies every piece of state used in the app to avoid unnecessary global re-renders and tight coupling.

## 1. Local UI State
- **Definition**: State that only matters to a single component and doesn't need to be shared.
- **Examples**:
  - `isDropdownOpen` (boolean)
  - `isModalVisible` (boolean)
  - `isLoading` (boolean - per screen)
- **Why it belongs here**: Keeping UI state local prevents the entire application from re-rendering just because a minor visual element changed. It should live inside the specific component using `useState`.

## 2. Screen State (Form State)
- **Definition**: State bound to the lifecycle of a specific screen, primarily used for data entry before submission.
- **Examples**:
  - `editName` (string - in Edit Profile)
  - `editBio` (string - in Edit Profile)
  - `validationErrors` (object/string)
- **Why it belongs here**: Form inputs should not mutate the global state on every keystroke. They are held in the `EditProfileScreen` locally. The global profile is only updated upon a successful "Save" action.

## 3. Shared State
- **Definition**: State that needs to be accessed or modified by multiple screens across different branches of the navigation stack.
- **Examples**:
  - `profileObject` (name, bio, avatar)
  - `themeMode` ('light' | 'dark')
- **Why it belongs here**: The `ProfileScreen` needs to display the profile, and `EditProfileScreen` needs to update it. Similarly, every screen in the app needs to know the current theme to render correct styles. This state should live in a Context Provider (e.g., `ProfileContext`, `ThemeContext`) wrapping the root component.

## 4. Persistent State
- **Definition**: State that must survive application restarts.
- **Examples**:
  - `profileObject` (JSON string in AsyncStorage)
  - `themeMode` (string in AsyncStorage)
- **Why it belongs here**: To provide a seamless user experience, user data should not be lost when the app closes. This data is synchronized with the Shared State during the "Save" action, and read back during the app's "Startup/Hydration" phase.

## State Ownership Map Summary

| State Item | Location / Implementation | Justification |
| :--- | :--- | :--- |
| **Input focus, dropdowns** | Local Component (`useState`) | Only relevant to immediate UI. No need to share. |
| **Form data / errors** | `EditProfileScreen` (`useState` / Formik) | Bound to the form's lifecycle. Prevents premature global updates. |
| **Shared Profile Data** | `ProfileContext` | Multiple screens (Profile, Home, Edit) need to read/write it. |
| **Theme / Preferences** | `ThemeContext` | Required app-wide for consistent styling. |
| **Persistent Profile/Theme**| `AsyncStorage` + Hydration logic | Must survive restarts. Hydrated into Context on app launch. |
| **Activities / Interests** | `ActivityScreen` (or specific Context) | Close to consumer. If only one screen uses it, local state is fine; if shared, move to Context. |
