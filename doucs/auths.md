# 🔐 Authentication & Authorization in the MERN Stack  
### Using **bcrypt** & **JSON Web Token (JWT)**

**Stack Context:**  
MongoDB • Express • React • Node.js  

**Focus Area:** Backend (Node + Express)

---

## 🎯 Why This Topic Matters

Almost every real application must answer two critical questions:

1. **Who are you?**
2. **What are you allowed to do?**

Without secure answers to these, your system is vulnerable.

**Examples:**
- Only logged-in users can register for events
- Only admins can create or delete events
- Users must not access other users’ data

👉 This is where **Authentication** and **Authorization** come in.

---

## 🧠 Core Concepts (Plain Language)

### 🔑 Authentication
**Authentication = Verifying identity**

It answers:
> “Are you really who you say you are?”

**Example:**
- User logs in with email and password
- Backend checks if:
  - User exists
  - Password is correct

If valid → user is authenticated ✅

---

### 🛂 Authorization
**Authorization = Checking permissions**

It answers:
> “What are you allowed to do?”

**Example:**
- Is this user allowed to create an event?
- Is this user an admin?

📌 Authentication comes **first**, authorization comes **after**.

---

## 🔁 Real-Life Analogy

Think of an event gate:

- **Authentication** → Checking your ticket
- **Authorization** → Checking if your ticket gives:
  - VIP access
  - Backstage access
  - General access

---

## 🧱 Authentication Flow in a MERN App

1. User registers
2. Password is hashed with **bcrypt**
3. Hashed password is stored in MongoDB
4. User logs in
5. Password is verified using bcrypt
6. Backend generates a **JWT**
7. JWT is sent to frontend
8. Frontend sends JWT on protected requests
9. Backend verifies JWT before granting access

---

## 🔐 Password Security with bcrypt

### ❌ Why Plain Passwords Are Dangerous

```txt
password: "123456"
```

If database leaks → users are exposed.

✅ Secure Approach (Hashed Password)
password: "$2b$10$XkF8..."


Passwords must always be hashed, never stored directly.

🔧 What is bcrypt?

Library for hashing passwords

One-way encryption

Automatically adds salt for extra security

📌 Even identical passwords produce different hashes.

📝 Hashing a Password (Signup)
import bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash(password, 10);


10 = salt rounds

Higher = more secure but slower

🔍 Comparing Passwords (Login)
const isMatch = await bcrypt.compare(password, user.password);


Compares plain password with hashed password

Returns true or false

🪪 JSON Web Token (JWT)
🔐 What is JWT?

JWT = A secure digital identity token

Created by backend

Sent to frontend

Used to prove identity

Contains:

User ID

Optional role

Expiration time

🚀 Why JWT Is Important

Without JWT:

User must log in for every request ❌

With JWT:

Login once

Stay authenticated until token expires ✅

🧾 Creating a JWT (After Login)
import jwt from "jsonwebtoken";

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

📦 Where JWT Is Stored

Commonly sent in headers:

Authorization: Bearer <token>


Or stored securely in cookies.

🛡️ Protecting Routes (Authentication Middleware)
🧩 Why Middleware?

Middleware runs before route logic and decides:

Allow access

Deny access

🔐 Auth Middleware Example
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;

  next();
};

🔒 Using Protected Routes
app.get("/profile", protect, (req, res) => {
  res.json({ userId: req.user.id });
});


Only authenticated users can access this route.

🛂 Authorization (Role-Based Access)
🧑‍💼 Adding Roles to Users
role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
}

🚫 Authorization Middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

🔗 Combining Auth & Authorization
app.post("/events", protect, isAdmin, createEvent);


✔ Logged-in user
✔ Admin only

⚠️ Common Beginner Mistakes

Storing plain passwords

Exposing JWT secrets

Forgetting token expiration

Trusting frontend validation only

Not protecting sensitive routes

🎯 Real Project Connection

In an Event Management System:

Users authenticate to register

Admins create and manage events

Attendance is tied to verified users

Payments link to authenticated identities

🏁 Key Takeaways

Authentication = Who you are

Authorization = What you can do

bcrypt secures passwords

JWT manages sessions

Middleware protects routes

Security is mandatory, not optional



