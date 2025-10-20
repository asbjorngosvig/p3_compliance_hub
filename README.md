# Compliance Hub (for Uniwise)

## Project Overview

Managing GDPR compliance across multiple products and data processors is complex and error-prone.  
Uniwise, a Danish company offering **WISEflow**, a digital platform used by universities for project submissions and grading, faced a key challenge:

> **When adding or changing data processors, Uniwise did not know which Data Processing Agreements (DPAs) would be violated.**  

Our system solves this by giving users a **clear, real-time overview of potential DPA violations** whenever a new data processor is considered, helping ensure GDPR compliance across all products.

---

## Team & Academic Context

We are a team of **7 students at Aalborg University, Copenhagen**, working on our **3rd-semester project**.  
The project is grounded in our courses on **Object-Oriented Programming, User Interface Design, and Software Development & Engineering**, including UML modeling and backend architecture.  
This project combines **real-world problem-solving** with academic rigor for a real company.

---

## Key Features

- **Customer & Product Management**: Link customers to products and automatically assign standard DPAs.  
- **DPA & Requirement Tracking**: Manage standard and custom clauses, and track which DPAs include which requirements.  
- **Data Processor & Safeguard Management**: Associate data processors with products and manage safeguards (SCC, TIA, etc.).  
- **Compliance Pre-Check**: Preview potential violations **before adding or changing a data processor**, preventing inadvertent breaches.  
- **User-Friendly Frontend**: Designed in **Figma** and implemented in **React** for smooth interaction.  

---

## Technical Overview

- **Frontend:** React + Figma (UI/UX)  
- **Backend:** Java Spring Boot (JDBC)  
- **Database:** PostgreSQL in Neon (relational, normalized)  
- **Testing:** Postman, jUnit, Github Actions

The database models customers, products, DPAs, requirements, data processors, and safeguards, supporting backend logic that drives the **violation detection system**.

---

## Why It Matters

By focusing on the **exact pain point of unknown DPA violations when changing data processors**, this system reduces manual review, prevents GDPR breaches, and gives Uniwise employees confidence in managing compliance.  
It demonstrates how thoughtful software design — combining frontend usability, backend logic, and structured data modeling — can solve a **real-world problem in digital assessment management**.
