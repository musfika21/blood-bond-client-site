# Blood Connect - Frontend

**Live Site**: [https://live-link-f0539.web.app/]
**Admin Email**: admin@gmail.com  
**Admin Password**: admin123

---

## 🔥 Features

1. Role-based dashboards for Donor, Admin, and Volunteer
2. Responsive design for all devices including dashboard layout
3. JWT-protected private routes with persistent login
4. CRUD functionalities with toast notifications
5. Stripe integration for secure funding
6. Profile update with image upload via imageBB
7. Blog management with rich text editor and status control
8. Donor search by blood group, district, and upazila
9. SweetAlert2 for feedback messages
10. Pagination and filtering in donation and user tables

---

## 🧩 Technology and Implementation

- **React**: Main frontend library
- **Tailwind CSS**: Utility-first CSS framework for fast UI styling
- **Firebase Authentication**: Used for user login, registration, and status management
- **TanStack Query**: Efficient data fetching and caching for all `GET` requests
- **React Router**: Route handling for public and private (protected) pages
- **React Hook Form**: Simplified form handling and validation
- **Jodit React**: Rich text editor for blog content creation and editing
- **Axios**: API communication with backend
- **SweetAlert2 & React Hot Toast**: For elegant success/error messages during actions
- **Stripe React**: Payment gateway integration for donations
- **Framer Motion & AOS**: Smooth scroll and reveal animations for enhanced UX
- **Moment.js**: Displaying formatted dates and times
- **Lucide React Icons**: Modern and elegant icon pack
- **Recharts**: Used for optional data visualization (stats, funding charts)
- **Styled Components**: For isolated and customizable UI styling
- **React Spinners**: For displaying loading states
- **Classnames, clsx, tailwind-merge**: For efficient class handling and conditional styling

---

## 🛠 Setup Instructions

1. Clone the repo  
2. Install dependencies  
3. Configure `.env` with Firebase and API URL  
4. Run using `npm run dev`