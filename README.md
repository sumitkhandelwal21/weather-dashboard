# Weather Dashboard App 🌤️

The **Weather Dashboard App** is a responsive and interactive web application that allows users to view historical weather data for a specific location and date range. Built with **Next.js** and styled using **Tailwind CSS**, the app is deployed on **Vercel** for seamless and fast performance.

## Live Demo  
🌐 [Weather Dashboard on Vercel](https://weather-dashboard-app-self.vercel.app/)  

---

## Features

### 🔍 **Dashboard Inputs**  
- **Latitude & Longitude**: User-friendly input boxes with validation for accurate coordinates.  
- **Date Range**: Intuitive date pickers for selecting the start and end dates.  

### 🌐 **API Integration**  
- Uses the **Open-Meteo Historical Weather API** to fetch daily weather data based on user inputs.  
- **Weather Variables**:
  - Maximum Temperature (2 m)
  - Minimum Temperature (2 m)
  - Mean Temperature (2 m)
  - Maximum Apparent Temperature (2 m)
  - Minimum Apparent Temperature (2 m)
  - Mean Apparent Temperature (2 m)

### 📊 **Data Display**  
- **Graph View**: Interactive charts showing trends over the selected period (powered by Chart.js).  
- **Table View**: A paginated table to display weather data with options for 10/20/50 rows per page.

### 🎨 **UI Expectations**  
- Fully responsive design ensuring compatibility across desktop, tablet, and mobile devices.  
- Elegant, creative styling powered by **Tailwind CSS**.  

### ⚡ **Additional Features**  
- Loading state while fetching data for better user experience.  
- Error handling for invalid inputs or null data.  
- Optimized API calls to minimize excessive requests.

---

## Tech Stack  

### 🖥️ **Frontend**  
- **Framework**: Next.js  
- **Styling**: Tailwind CSS  

### 🔧 **Tools & Libraries**  
- **Chart.js**: For graphical representation of weather data.  
- **Open-Meteo API**: To fetch historical weather data.  

### 🚀 **Deployment**  
- Hosted on **Vercel** for fast and reliable performance.

---

## Installation & Setup  

Clone the repository:

```bash
git clone https://github.com/your-repo/weather-dashboard.git
cd weather-dashboard
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```