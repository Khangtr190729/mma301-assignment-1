# Profile & Activity App (MMA301 Assignment 1)

## Overview
This is the Phase 3 implementation of the MMA301 Assignment 1 project. It currently includes the project foundation and navigation skeleton.

## Setup and Run Instructions
1. Navigate to the project directory:
   ```bash
   cd TruongHoangKhang_CE190729
   ```
2. Install dependencies (already done if you used the provided setup):
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```
   Or to run on web directly:
   ```bash
   npm run web
   ```

## Workflow Map (Current Implementation)
- **Home Screen** -> Navigates to Profile, Activity, and Settings.
- **Profile Screen** -> Navigates to Edit Profile.
- **Edit Profile Screen** -> Can Go Back (Save/Cancel placeholders).
- **Activity/Interests Screen** -> Placeholder.
- **Settings Screen** -> Placeholder.

## Limitations (Phase 3)
- No persistence logic (`AsyncStorage` is not yet implemented).
- No form validation.
- No activity logic or theming logic.
- UI is minimal and acts purely as a placeholder to verify navigation.

## AI Usage
AI was used to bootstrap the Expo app, configure `@react-navigation/native-stack`, and generate placeholder screens in alignment with the Phase 2 Architecture Design.
