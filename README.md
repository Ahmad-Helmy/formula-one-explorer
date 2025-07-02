# Formula One Explorer

## How to Run

```bash
npm i
npm run dev

```

---

## Technical Approach and Architectural Decisions

The main approach is based on two system components:

### 1. MainLayout
- Adds pagination
- Handles loading and error display
- Handles card/list view toggle

### 2. useFetch
- Responsible for fetching data from the server with a given service function and params
- Refetches when pagination changes
- Memoizes responses according to the offset to avoid fetching data for the same page multiple times

Every page uses `MainLayout`, which takes data from `useFetch` and informs `useFetch` when pagination changes.

---

- Built with TypeScript using generic interfaces to handle response types and mapping
- Card/list view toggle is handled with Context API to pass the toggle from `MainLayout` to `DataLayout`
- Pinned races are handled with `localStorage` to persist data after refresh  
  - Format: JSON  
    - **Key:** `"round;season"`  
    - **Value:** `IRacesDetails`  
  - This key-value format allows for easy O(1) access for filters
- Used TailwindCSS for simple styling

---

## The Power of This Approach

When you want to add another page that fetches other data, all you have to do is:

1. Create a service that fetches data with Axios
2. Add a component with `useFetch` that takes this service as input
3. Add `MainLayout` with `DataLayout` for your data

That's it!  
Now you have loading/error handling, data displayed with card/list view, pagination, and memoized fetched data with just the three steps above.
