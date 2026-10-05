# Activity / Interest Model Definition

This document defines the structure for the collections rendered in the `Activity/Interests` screen.

## 1. Data Structure

The collection will be an array of objects. Each object represents a single activity or interest.

```javascript
const ActivityItemModel = {
  id: "String",         // Unique identifier
  title: "String",      // Name of the activity/interest
  description: "String",// Short detail about the item
  isFavorite: "Boolean",// State indicating user interaction/preference
  category: "String",   // (Optional) Useful if grouping by SectionList
}
```

**Example Data Set:**
```javascript
const initialActivities = [
  {
    id: "a1",
    title: "React Native Development",
    description: "Building cross-platform mobile applications.",
    isFavorite: true,
    category: "Tech"
  },
  {
    id: "a2",
    title: "Reading Sci-Fi",
    description: "Exploring futuristic concepts through literature.",
    isFavorite: false,
    category: "Hobby"
  },
  // ... more items
];
```

## 2. Item Identity and Key Strategy

- **Key Strategy**: React Native's `FlatList` and `SectionList` require unique keys for performance and state consistency during re-renders.
- **Implementation**: The `id` field (e.g., `"a1"`, `"a2"`) will be used as the unique key. 
- **Code Usage**: The `keyExtractor` prop on the list component will map to this ID: 
  `keyExtractor={(item) => item.id}`
- **Why?**: Using unique IDs instead of array indices prevents rendering bugs when items are reordered, filtered, or mutated (e.g., toggling `isFavorite`).

## 3. State Interaction
- If a user marks an item as a favorite, a function will map over the array, find the item by `id`, and toggle its `isFavorite` boolean.
- **Immutability rule**: We will create a *new* array with the updated object rather than mutating the existing array directly, ensuring React Native detects the state change and triggers a re-render.
