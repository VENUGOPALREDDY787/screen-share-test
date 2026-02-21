# 📺 Screen Share Test Application

A React-based frontend application that demonstrates browser screen-sharing permissions, media stream lifecycle management, robust success and failure handling, and proper resource cleanup using native Web APIs.

---

## 🚀 Project Overview

This project was built as part of a frontend shortlisting task. The objective was to create a clean and reliable screen-sharing test application that:

- Verifies browser support for screen sharing  
- Requests and manages screen-sharing permissions  
- Displays a live preview of the shared screen  
- Extracts and displays media stream metadata  
- Detects when screen sharing stops (manually or externally)  
- Properly cleans up media tracks to prevent memory leaks  
- Handles all states with clear UI feedback  

The application uses **React (Vite)** and native browser Web APIs without relying on any third-party screen-sharing libraries.

---

## 🏗️ Tech Stack

- React (Vite)
- JavaScript (ES6+)
- React Router
- Native Browser Web APIs (`navigator.mediaDevices.getDisplayMedia`)
- Plain CSS (No UI libraries)

---

## 📂 Project Structure

```
src/
 ├── components/
 │     └── Button.jsx
 ├── hooks/
 │     └── useScreenShare.js
 ├── pages/
 │     ├── Home.jsx
 │     └── ScreenTest.jsx
 ├── App.jsx
 └── main.jsx
```

---

## 🖥️ Application Flow

### 1️⃣ Homepage (`/`)

- Displays title: **Screen Share Test App**
- Verifies browser support for:

```javascript
navigator.mediaDevices.getDisplayMedia
```

- If unsupported → Displays browser compatibility message  
- If supported → Navigates to `/screen-test`

---

### 2️⃣ Screen Test Page (`/screen-test`)

#### 🔹 Permission Handling

When the user clicks **Start Screen Sharing**:

- App transitions to a `"requesting"` state  
- Calls:

```javascript
navigator.mediaDevices.getDisplayMedia({
  video: { frameRate: { ideal: 30 } },
  audio: false
});
```

Handles distinct states:

- `requesting`
- `granted`
- `cancelled`
- `denied`
- `error`

The UI reflects each state individually instead of using generic error handling.

---

#### 🔹 Live Screen Preview & Metadata

After permission is granted:

The `MediaStream` is attached to a `<video>` element:

```javascript
video.srcObject = stream;
```

Metadata is extracted using:

```javascript
track.getSettings();
```

Displays:

- Resolution  
- Frame rate  
- Display surface type (tab / window / monitor)  

⚠️ No recording or backend streaming is implemented — preview is local only.

---

#### 🔹 Stream Lifecycle Detection

The application listens for:

```javascript
track.onended
```

This detects when:

- The user manually stops screen sharing from the browser UI  
- The browser ends the stream unexpectedly  

When detected:

- All media tracks are stopped  
- Stream references are cleared  
- UI updates immediately  

---

### 3️⃣ End / Retry Flow

After screen sharing stops:

- Displays **"Screen sharing stopped"**
- Provides:
  - Retry Screen Test  
  - Back to Home  

Retry behavior ensures:

- A fresh `getDisplayMedia` request is initiated  
- Previous streams are not reused  
- Media tracks are properly released  

Cleanup is handled:

- On manual stop  
- On browser-triggered stop  
- On component unmount  

This prevents media leaks and ensures proper resource management.

---

## 🧠 Architecture Decision

All screen-sharing logic is isolated inside a custom hook:

```
useScreenShare()
```

This ensures:

- Separation of concerns  
- Clean and declarative UI components  
- Controlled side-effect management  
- Maintainable and scalable structure  

---

## 🛡️ Error Handling & States

Distinct UI states are implemented for:

- `idle`
- `requesting`
- `granted`
- `cancelled`
- `denied`
- `error`
- `stopped`

Each state has a clear and specific UI representation.

---

## 🌍 Browser Support

Tested in:

- Google Chrome  
- Microsoft Edge  

⚠️ Safari has limited support for `getDisplayMedia`.

---

## 📦 Setup Instructions

Clone the repository and install dependencies:

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## 📌 Known Limitations

- Safari has limited or partial support for screen sharing  
- Some systems may show a black preview when sharing the same tab due to browser security restrictions  
- Display surface type may not be available in older browser versions  

---

## 🎯 Key Requirements Covered

- Native Web API usage  
- MediaStream lifecycle management  
- Proper cleanup handling  
- Custom hook architecture  
- Retry flow without stream reuse  
- Clear state-based UI rendering  
- No third-party screen-sharing libraries  

---

## 📹 Demo

[(https://drive.google.com/file/d/1rGrGpvBzwawZMsZKuTuT2h9GwMpckbuO/view?usp=sharing)]

---

## 👨‍💻 Author

**G. Venugopal Reddy**  
Frontend Developer
