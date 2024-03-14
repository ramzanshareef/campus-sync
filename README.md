# 📢 Campus Sync SaaS Platform

Campus Sync is a student and faculty management system aimed at streamlining campus operations. This repository extends the original <a href="https://github.com/ramzanshareef/campus-sync-dev">Campus Sync Project</a> into a full-fledged Software as a Service (SaaS) platform.

## ⭐ Introduction

Campus Sync SaaS Platform is built upon the foundations of the original Campus Sync project, enhancing it with scalable features for broader institutional use. It provides tools for student management, faculty collaboration, and administrative tasks.

This repository serves as the core engine for the SaaS deployment model of Campus Sync, allowing educational institutions to manage their operations efficiently.

## 🚀 Features

- **Student Management**: Track student profiles, academic progress, and communication channels.
- **Faculty Collaboration**: Facilitate collaboration among faculty members through shared resources and schedules.
- **Administrative Tools**: Automate administrative tasks such as attendance tracking, scheduling, and reporting.
- **Integration Capabilities**: Easily integrate with existing campus systems for seamless data flow.
- **Scalable Architecture**: Designed for scalability to accommodate growing user bases and data volumes.
- **Secure Access**: Role-based access control (RBAC) ensures data security and privacy.

For a comprehensive list of features, refer to the [original Campus Sync repository](https://github.com/ramzanshareef/campus-sync-dev).

## ⬇️ Getting Started

### Prerequisites

- Node.js (version >= 19.0)
- MongoDB 

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ramzanshareef/campus-sync.git
cd campus-sync
npm install
```

### Configuration

1. **Set up environment variables**: Ensure you have configured the following environment variables for proper functionality:

   - `DATABASE_URL`
   - `AUTH_TOKEN_SECRET`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
   - `WEBHOOK_SECRET`
   - `DB_URL`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_CLOUDINARY_API_KEY`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_SECRET`

2. **Configure API keys and endpoints**: If your application integrates with external services (e.g., email services, analytics platforms), ensure you have configured the necessary API keys and endpoints in your environment variables.

### Usage

To run Campus Sync SaaS Platform locally, follow these steps:

1. Install dependencies:
```bash
npm install
```
or
```bash
yarn
```
2. Start the development server
```bash
npm run dev
```
or
```bash
yarn run dev
```
3. Accessing the Application
You can now access the application in your web browser at http://localhost:3000.

## 📝 Usage
1. **User Registration**: Students and faculty can sign up using their email addresses.
2. **Subscription Plans**: Choose from Lite, Standard, or Premium plans with varying access to AI quizzes and other features, managed through Stripe payments.
3. **Course Management**: Faculty can create new courses, upload videos, and manage student enrollments.
4. **Quiz Experience**: Students can attempt AI-powered quizzes where question difficulty adapts based on their responses.
5. **Community Interaction**: Join and participate in community forums to discuss academic topics and collaborate with peers.
6. **Real-time Chat**: Communicate with other students in real-time for project collaboration and study groups.
7. **Profile Management**: Update user profiles and view academic progress and quiz results.

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (git checkout -b feature/YourFeature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature/YourFeature)
5. Open a pull request

## 👉 Contact

For any inquiries or feedback, please reach out to:
- **Name**: Mohd Ramzan Shareef
- **Email**: mail.ramzanshareef@gmail.com
- **GitHub**: [ramzanshareef](https://github.com/ramzanshareef)