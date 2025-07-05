## 🎬 MovieFlix

A modern movie explorer built with **Next.js**, styled with **Tailwind CSS**, powered by the **TMDB API**, and designed for an immersive, dynamic user experience 🍿

---

## 🌟 Key Features

🚀 **Dynamic Home Page** with categorized movies:

* 🎞️ Now Playing
* 🔥 Popular
* 🏆 Top Rated
* ⏳ Upcoming

🧠 **Detailed Movie Info**

* Poster, Title, Rating, Overview, Cast, Director
* 🎯 Similar Movies section
* ➕ Add/Remove to/from "My List"

🧾 **My List Section**

* Persistent via `localStorage`
* Simple, responsive display

🔁 **Fallback Support**

* Mock JSONs for seamless experience even if TMDB fails

---

## 🔧 Tech Stack

| Layer       | Stack                        |
| ----------- | ---------------------------- |
| ⚛️ Frontend | Next.js + React + TypeScript |
| 🎨 Styling  | Tailwind CSS + MUI           |
| 🎬 API      | TMDB API                     |
| 💾 Storage  | LocalStorage + useReducer    |

---

## 🗂️ Folder Architecture

```shell
📁 app                → Pages/routes
📁 components         → UI blocks & modals
📁 context            → Global state (MyList)
📁 hooks              → Custom hooks
📁 lib                → Utility & API handlers
📁 public             → Static assets
📁 styles             → Tailwind + Custom CSS

📄 .env               → API Key config
📄 package.json       → Project meta
📄 tailwind.config.ts → Styling config
```

---

## 🔑 TMDB API Setup

1. Visit [TMDB API Portal](https://developer.themoviedb.org/reference/intro/getting-started)
2. Apply for an API Key
3. Store it securely in your `.env`:

```env
REACT_APP_TMDB_API_KEY=your_actual_key_here
```

✅ Fallback API Key (in case of error):

```env
REACT_APP_TMDB_API_KEY=eec8ca18da6c9523e3f50a8c6f69c633
```

---

## 🔍 Movie Endpoints Used

| Feature           | TMDB Endpoint               |
| ----------------- | --------------------------- |
| 🎥 Now Playing    | `/movie/now_playing`        |
| 🔥 Popular        | `/movie/popular`            |
| 🌟 Top Rated      | `/movie/top_rated`          |
| 📅 Upcoming       | `/movie/upcoming`           |
| 🧾 Movie Details  | `/movie/{movie_id}`         |
| 👥 Cast & Crew    | `/movie/{movie_id}/credits` |
| 🎬 Similar Movies | `/movie/{movie_id}/similar` |

---

## 🛠️ Running Locally

```bash
git clone https://github.com/<your-username>/movieflix.git
cd movieflix
pnpm install  # or npm install
yarn dev      # or pnpm dev / npm run dev
```

✅ Open: `http://localhost:3000`

---

## 🎨 UI Highlights

* 🖤 Dark mode enabled
* 🌈 Gradient overlays and card hovers
* 📱 Responsive design for all screen sizes
* 🎭 Modals, Spinners & Animation via Framer Motion

---

## 📊 Evaluation Criteria

* 📁 Clean folder structure
* 🧠 Effective state + data handling
* 🔥 UI/UX polish
* 🧪 Error handling and recovery

---

## 👨‍💻 Built By

**Nidish2**
Made with ☕ coffee & 🎨 creativity

> Inspired by Netflix. Powered by TMDB. Crafted for cinephiles 💡

---

## 📄 License

MIT © 2025 MovieFlix Project

---

<p align="center">
  <b>"Be there and be square."</b> — <i>Minecraft Movie</i> tagline 🎮
</p>
