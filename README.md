# Dream App

A full-stack web application built with React (TypeScript) frontend and Node.js backend.

## 🚀 Features

- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express
- **API**: RESTful API endpoints
- **Security**: CORS, Helmet middleware
- **Development**: Hot reload for both frontend and backend

## 📁 Project Structure

```
dream-app/
│
├── backend/                 # Node.js backend
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env               # Environment variables
│   └── .gitignore         # Backend gitignore
│
├── frontend/               # React frontend
│   ├── public/            # Static files
│   ├── src/               # React components
│   ├── package.json       # Frontend dependencies
│   ├── tsconfig.json      # TypeScript config
│   └── .gitignore         # Frontend gitignore
│
├── package.json           # Root package.json
└── README.md             # This file
```

## 🛠 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to the project directory:**
   ```bash
   cd "d:\Desktop\node practice"
   ```

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

   Or install manually:
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Running the Application

#### Development Mode (Recommended)
Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5001
- Frontend development server on http://localhost:3000

#### Individual Services

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

**Production mode:**
```bash
# Build frontend
npm run build

# Start backend server
npm start
```

## 🔧 API Endpoints

### Health Check
- `GET /` - Welcome message
- `GET /api/health` - Server health status

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

## 🌟 Next Steps

- [ ] Add database integration (MongoDB/PostgreSQL)
- [ ] Implement user authentication
- [ ] Add more API endpoints
- [ ] Create additional React components
- [ ] Add testing (Jest, React Testing Library)
- [ ] Add styling framework (Material-UI, Tailwind CSS)
- [ ] Implement state management (Redux, Context API)
- [ ] Add form validation
- [ ] Deploy to cloud platform

## 🔒 Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5001
FRONTEND_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.