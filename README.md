StudentSwap

Overview
StudentSwap is a web application that allows students to buy and sell new/used home goods and furniture. The application is built with a React frontend hosted on an AWS EC2 instance and a Firebase backend.

#Full Directory Structure

studentswap/
│
├── frontend/
│   ├── public/
│   │   ├── img/
│   │   ├── styles/
│   │   ├── about.html
│   │   ├── add-item.html
│   │   ├── background.webp
│   │   ├── contact.html
│   │   ├── edit-profile.css
│   │   ├── edit-profile.html
│   │   ├── edit-profile.js
│   │   ├── image.png
│   │   ├── index.html
│   │   ├── inventory.html
│   │   ├── inventorystyles.css
│   │   ├── listing.html
│   │   ├── listingstyles.css
│   │   ├── login.html
│   │   ├── logo.png
│   │   ├── profile.css
│   │   ├── profile.html
│   │   ├── profile.js
│   │   ├── reset-password.html
│   │   ├── scripts-add-item.js
│   │   ├── scripts-contact.js
│   │   ├── scripts-inventory.js
│   │   ├── scripts-login.js
│   │   ├── scripts-signup.js
│   │   ├── scripts-verify-email.js
│   │   ├── scripts.js
│   │   ├── signup.html
│   │   ├── styles-add-item.css
│   │   ├── styles-contact.css
│   │   ├── styles-login.css
│   │   ├── styles-reset-password.css
│   │   ├── styles-signup.css
│   │   ├── styles.css
│   │   └── verify-email.html
│   ├── src/
│   │   ├── App.js
│   │   └── firebase-init.js
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── .gitignore
│
├── functions/
│   ├── node_modules/
│   ├── index.js
│   ├── package.json
│   ├── firebase.json
│   └── .gitignore
│
└── README.md

## Features

- User Registration and Login with Email Verification
- Add, View, and Search Inventory Items
- Profile Management with Profile Picture Upload
- Responsive Design

## Technologies Used

- Frontend: React, HTML, CSS, JavaScript
- Backend: Firebase Functions, Firestore
- Hosting: AWS EC2, Nginx, Terraform, Jenkinsfile

## Getting Started

### Prerequisites

- Node.js and npm
- Firebase CLI
- AWS Account
- Domain registered and DNS records configured

### Setting Up the Frontend

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo/studentswap.git
   cd studentswap
