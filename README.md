<h1 align="center">🎓 EduAI</h1>
<h3 align="center">AI-Powered Study Abroad Platform</h3>

<p align="center">
  EduAI helps students discover the right university abroad with personalized, AI-driven recommendations — powered by Google's Gemini API.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini%20API-8E75B2?style=flat-square&logo=googlegemini&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
</p>

<p align="center">
  <a href="https://YOUR-LIVE-DEMO-LINK.vercel.app" target="_blank"><b>🔗 Live Demo</b></a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Setup</a>
</p>

---

## 📸 Preview

<p align="center">
  <img src="https://via.placeholder.com/800x450.png?text=EduAI+Homepage+Screenshot" width="80%" />
</p>

<p align="center">
  <img src="https://via.placeholder.com/390x250.png?text=Dashboard" width="32%" />
  <img src="https://via.placeholder.com/390x250.png?text=University+Recommendations" width="32%" />
  <img src="https://via.placeholder.com/390x250.png?text=Chat+Assistant" width="32%" />
</p>

> 💡 *Replace these placeholders with actual screenshots/GIFs of your app (homepage, dashboard, recommendation flow, chat).*

---

## 🧠 About the Project

EduAI is a full-stack platform designed to simplify the study-abroad journey. Students build a profile, and the platform uses AI-driven logic combined with Gemini API to recommend universities tailored to their academic background, budget, and preferences — along with guidance on the application and loan process.

Built end-to-end with a custom Django backend (7 modular apps) and a React + Vite frontend, with production-grade patterns like UUID-based custom user models, standardized API response envelopes, custom exception handling, and JWT authentication.

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based auth with custom UUID user model & email login
- 🎯 **Personalized Recommendations** — AI-powered university matching based on student profile
- 🤖 **AI Chat Assistant** — Gemini API integration with student-context injection for tailored guidance
- 💰 **Loan Guidance Module** — Helps students explore education loan options
- 📊 **Student Dashboard** — Centralized view of profile, recommendations, and application progress
- ⚡ **Optimized Performance** — Redis caching for faster response times
- 🧩 **Modular Architecture** — 7 independent Django apps (users, profiles, universities, recommendations, loans, chat, dashboard)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Django, Django REST Framework |
| **Frontend** | React.js, Vite |
| **Database** | PostgreSQL |
| **Caching** | Redis |
| **AI Integration** | Gemini API |
| **Auth** | JWT (JSON Web Tokens) |
| **Deployment** | Render (backend), Vercel (frontend) |

---

## 🏗️ Architecture

```
EduAI/
├── backend/
│   ├── users/            # Custom UUID-based user model, email auth
│   ├── profiles/         # Student profile management
│   ├── universities/     # University data & listings
│   ├── recommendations/  # AI-driven recommendation engine
│   ├── loans/             # Education loan guidance
│   ├── chat/              # Gemini-powered AI chat assistant
│   ├── dashboard/         # Student dashboard APIs
│   └── api/v1/             # Versioned API routes
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/        # API integration layer
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL
- Redis

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Add your DATABASE_URL, GEMINI_API_KEY, SECRET_KEY, etc.

python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
```env
SECRET_KEY=your_django_secret_key
DATABASE_URL=postgres://user:password@localhost:5432/eduai
REDIS_URL=redis://localhost:6379
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🔗 Live Demo

🌐 **[Try EduAI Live](https://YOUR-LIVE-DEMO-LINK.vercel.app)**

> 💡 *Replace with your actual Vercel/Render deployment link.*

---

## 🗺️ Roadmap

- [ ] Add application tracking system
- [ ] Multi-language support
- [ ] Mobile-responsive UI improvements
- [ ] Expand university database coverage

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Arpit Kumar Singh**
- LinkedIn: [your-linkedin-handle](https://www.linkedin.com/in/YOUR-LINKEDIN-HANDLE/)
- GitHub: [@Arpit9097](https://github.com/Arpit9097)

---

<p align="center">⭐ If you found this project interesting, consider giving it a star!</p>
