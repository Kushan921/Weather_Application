# 🌤️ Weather Application

A modern, responsive weather application built with React, TypeScript, and Vite. This application allows users to view weather information for multiple cities, search for new cities, and manage their favorite cities.


### Core Functionality
- **Multi-City Weather Display**: View weather information for up to 8 initial cities loaded from a JSON file
- **City Search**: Search for cities worldwide using OpenWeatherMap Geocoding API with real-time suggestions
- **Favorites Management**: Add/remove cities to/from favorites with persistent storage using localStorage
- **Weather c**: Display comprehensive weather information including:
  - Current temperature
  - Weather condition with icons
  - Humidity percentage
  - Wind speed
  - Weather description

### User Experience
- **Debounced Search**: 300ms debounce on search input to optimize API calls
- **Smart Caching**: React Query caching with 5-minute stale time and 10-minute garbage collection
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Smooth Animations**: CSS animations and transitions for enhanced user experience
- **Loading States**: Clear loading indicators during data fetching
- **Error Handling**: User-friendly error messages for failed API requests

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Query**: Efficient data fetching, caching, and state management
- **Context API**: Global state management for favorites and theme
- **Custom Hooks**: Reusable hooks for weather data and geocoding
- **PWA Support**: Progressive Web App capabilities with Vite PWA plugin
- **Docker Support**: Containerized deployment with multi-stage Docker build
- **Testing Setup**: Unit testing with Vitest and React Testing Library

## 🛠️ Tech Stack

### Core Technologies
- **React 19.2.0**: Latest React with modern features
- **TypeScript 5.9.3**: Type-safe development
- **Vite 7.2.4**: Fast build tool and dev server

### Key Libraries
- **@tanstack/react-query 5.90.12**: Data fetching and caching
- **axios 1.13.2**: HTTP client for API requests
- **React DOM 19.2.0**: React rendering

### Development Tools
- **ESLint**: Code linting and quality checks
- **Vitest**: Unit testing framework
- **MSW (Mock Service Worker)**: API mocking for tests
- **@testing-library/react**: React component testing utilities

### Build & Deployment
- **Docker**: Containerization support
- **Nginx**: Production web server (in Docker)
- **Vite PWA Plugin**: Progressive Web App support


## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kushan921/Weather_Application.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and paste the below envirenement variables in .env.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## ⚙️ Configuration

### Environment Variables
- `VITE_OPENWEATHER_API_KEY`: e584d2b1161b90463736fa10f6fb6438
- `VITE_OPENWEATHER_API_URL`: https://api.openweathermap.org/data/2.5
- `VITE_OPENWEATHER_GEO_API_URL`: https://api.openweathermap.org/geo/1.0

### API Configuration
The application uses two OpenWeatherMap API endpoints:
- **Weather API** (`https://api.openweathermap.org/data/2.5`): Current weather data
- **Geocoding API** (`https://api.openweathermap.org/geo/1.0`): City search and location data

Both APIs are configured in `src/api/client.ts` with automatic API key injection.

### React Query Configuration
- **Stale Time**: 5 minutes (data considered fresh for 5 minutes)
- **Garbage Collection Time**: 10 minutes (cached data kept for 10 minutes)
- **Retry**: 1 attempt on failure

## 🎯 Key Features & Implementation

### 1. Multi-City Weather Display
- **Implementation**: `useWeatherForCityIds` hook fetches weather for multiple cities
- **Data Source**: Initial cities loaded from `cities.json` (up to 20 cities)
- **API Strategy**: Individual API calls for each city (free tier compatible)
- **Caching**: React Query caches responses to minimize API calls

### 2. City Search with Geocoding
- **Implementation**: `useGeocodingSearch` hook with debounced input
- **Debounce**: 300ms delay to reduce API calls
- **Results**: Up to 5 city suggestions displayed in dropdown
- **Selection**: Clicking a suggestion fetches weather and adds to favorites

### 3. Favorites System
- **Storage**: localStorage persistence (`weather:favorites` key)
- **Context**: `FavoritesContext` provides global favorites state
- **Hook**: `useFavorites` hook for easy access
- **Auto-favorite**: Searched cities are automatically added to favorites
- **Filtering**: Only favorited searched cities appear in the main list

### 4. Smart Data Management
- **Deduplication**: Cities are deduplicated by ID
- **Cache Utilization**: React Query cache is checked before making new requests
- **State Management**: 
  - Initial cities always displayed
  - Searched cities only shown if favorited
  - Efficient re-renders with React.memo and useMemo

### 5. Responsive Design
- **Grid Layout**: CSS Grid with `auto-fill` for responsive columns
- **Breakpoints**: Mobile-first approach with media queries
- **Touch-Friendly**: Large clickable areas for mobile devices

### 6. Error Handling
- **API Errors**: Graceful error messages displayed to users
- **Retry Logic**: Automatic retry on failed requests (1 attempt)
- **Loading States**: Clear loading indicators during data fetching

## 🏗️ Architecture

### Component Architecture
- **App.tsx**: Main container component managing state and data flow
- **SearchBar**: Presentational component with search logic
- **CityCard**: Presentational component displaying weather information

### State Management
- **React Query**: Server state (weather data, geocoding results)
- **Context API**: Client state (favorites, theme)
- **Local State**: Component-specific state (search term, debounced term)

### Data Flow
1. App loads initial cities from JSON
2. `useWeatherForCityIds` fetches weather for initial cities
3. User searches for city → `useGeocodingSearch` fetches suggestions
4. User selects city → Weather fetched via coordinates
5. City added to searched cities and favorites
6. City appears in main grid if favorited

### Custom Hooks
- **useWeatherForCityIds**: Fetches weather for multiple city IDs
- **useWeatherByCoordinates**: Fetches weather using latitude/longitude
- **useGeocodingSearch**: Searches for cities by name
- **useFavorites**: Accesses favorites context

## 🧪 Testing

### Test Setup
- **Framework**: Vitest
- **Utilities**: React Testing Library
- **Mocking**: MSW (Mock Service Worker) for API mocking

### Running Tests
```bash
npm test
```

### Test Coverage
- **SearchBar Component**: Tests for search functionality and suggestions display
- **API Mocking**: MSW intercepts API calls for isolated testing

### Example Test
The `SearchBar.test.tsx` demonstrates:
- Component rendering
- User input simulation
- API response handling
- Async behavior testing

## 🐳 Deployment

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t weather-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 80:80 weather-app
   ```

3. **Access the application**
   Navigate to `http://localhost`

### Docker Configuration
- **Multi-stage build**: Optimized production build
- **Base image**: Node.js 18 Alpine for build, Nginx Alpine for serving
- **Port**: Exposes port 80
- **Static files**: Served via Nginx

### Production Build
```bash
npm run build
```
Outputs optimized production build to `dist/` directory.

## 📜 Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build production bundle
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint to check code quality
- `npm test`: Run test suite


### CSS Architecture
- **Global Styles**: `index.css` for base styles
- **Component Styles**: `App.css` for component-specific styles
- **CSS Variables**: Theme colors defined as CSS custom properties
- **Responsive**: Mobile-first responsive design

## 🔧 Development Notes

### API Rate Limits
The application is designed to work with OpenWeatherMap's free tier:
- Individual API calls instead of batch endpoints
- Caching to minimize API calls
- Debounced search to reduce requests

### Performance Optimizations
- **React.memo**: CityCard memoized to prevent unnecessary re-renders
- **useMemo**: Expensive computations memoized
- **useCallback**: Event handlers memoized
- **Code Splitting**: Vite handles automatic code splitting

### Browser Support
- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- localStorage support for favorites persistence


**Note**: Make sure to set your OpenWeatherMap API key in the `.env` file before running the application.