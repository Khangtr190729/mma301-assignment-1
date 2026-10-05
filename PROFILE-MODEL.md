# Profile Model Definition

This document outlines the data structure and validation rules for the User Profile.

## 1. Data Structure

The Profile data will be represented as a plain JavaScript object.

```javascript
const ProfileModel = {
  id: "uuid-or-fixed-string", // Optional: useful if we expand to multi-user later
  name: "String",             // User's display name
  bio: "String",              // Short biography or description
  avatarUrl: "String",        // URI to an image (local asset or remote URL)
  location: "String",         // (Optional/Transfer task) User's location
}
```

**Default / Fallback State:**
```javascript
const defaultProfile = {
  name: "Guest User",
  bio: "Hello, I am using the Profile & Activity App!",
  avatarUrl: "default_avatar_path", // Path to a local fallback image
}
```

## 2. Validation Rules

When the user attempts to save changes in the `EditProfileScreen`, the following validation rules must be enforced before updating state or persistent storage.

| Field | Rule | Error Message (if failed) |
| :--- | :--- | :--- |
| `name` | **Required**. Cannot be empty, null, or only whitespace. | "Name is required." |
| `name` | **Length constraint**. Must be at least 2 characters long. | "Name must be at least 2 characters." |
| `bio` | **Length constraint**. Maximum of 150 characters. (Optional rule, but good practice). | "Bio cannot exceed 150 characters." |

## 3. Storage Strategy
- The object will be serialized using `JSON.stringify(profile)` before saving to `AsyncStorage`.
- Upon retrieval, it will be parsed using `JSON.parse()`. 
- If parsing fails, the `defaultProfile` object will be used.
