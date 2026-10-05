# Requirement Traceability Matrix (RTM)

| ID  | Requirement | UI Evidence | Code Area | Test Case | Expected Evidence |
| --- | --- | --- | --- | --- | --- |
| **R01** | Expo/React Native project runs correctly | Cold start | `package.json`, App config | Start app from terminal | App launches without fatal errors |
| **R02** | Navigation between ≥5 screens | Screen transition / Back button | Navigation config (`App.js` or `navigation/`) | Open each screen & navigate back | Smooth transition; no missing screens |
| **R03** | Display Profile Data | ProfileScreen with default/persisted data | `ProfileScreen.js` | Read profile on startup | Correct name/bio/avatar shown |
| **R04** | Edit Profile + Validation | Valid/Invalid/Cancel flows | Form component / state logic | Submit empty name, submit valid name, cancel edits | Error on invalid; Update on valid; No change on cancel |
| **R05** | Shared Theme/Preference | Theme toggle works across screens | `ThemeContext.js` | Toggle Dark/Light mode in Settings | UI updates app-wide immediately |
| **R06** | FlatList/SectionList | Activity/Interests screen | `ActivityScreen.js` (FlatList/SectionList) | View list with items; view empty list | List renders correctly; shows empty state if 0 items |
| **R07** | Persistence (AsyncStorage) | First-run and restart persistence | Storage helper, `useEffect` | Restart app after saving profile/theme | Data is restored from storage |
| **R08** | Reusable Components | Render/reuse components (e.g., ProfileCard) | `components/` folder | Check UI for repeated elements | Components are imported and reused cleanly |
| **R09** | Responsive Flexbox/Style | Portrait layouts, basic sizing | Stylesheets within screens/components | Run on different screen sizes (simulator) | UI aligns correctly using flex properties |
| **R10** | Error/Fallback State | Invalid local data or no item | Storage parsing / Validation | Manually corrupt storage / clear data | App falls back to default values without crashing |
