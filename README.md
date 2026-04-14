# ComplianceHub: Automated Violation Detection for Data Processing Agreements

**ComplianceHub** is a web-based system designed to automate the management of Data Processing Agreements (DPAs) for software providers like UNIwise. It addresses the risks of manual verification by utilizing a model-driven approach to detect contractual violations automatically].

---

## 🚀 Key Features (MVP)

* **Entity Management**: Provides full create, read, and delete capabilities for managing data processors and DPAs.
* **Algorithmic Violation Detection**: Automatically identifies conflicts regarding geographical data hosting (e.g., EU vs. non-EU).
* **Two-Way Validation**: Flags violations when adding a new data processor against existing DPAs, or when a new DPA is added against the current processor setup.
* **Centralized Dashboard**: Offers a consolidated view where users can see all DPAs, data processors, and active violations at a glance.
* **Actionable Insights**: Translates detected violations into specific tasks for the user, such as "Request Approval" or "Notify Customer".

---

## 🛠️ Technology Stack



### Frontend
* **Framework**: React with TypeScript for type safety and modularity.
* **Styling**: Tailwind CSS for rapid UI development.
* **Build Tool**: Vite.
* **Optimization**: Utilizes Lazy Loading and Code Splitting via React Router to reduce initial bundle size.

### Backend
* **Framework**: Java Spring Boot (RESTful API).
* **Security**: Spring Security with BCrypt password hashing and stateless JWT authentication stored in HttpOnly cookies.
* **Persistence**: PostgreSQL database managed via Java Persistence API (JPA) and Spring Data.

---

## 🏗️ System Architecture & Design

The application follows a **3-tier architecture** (Presentation, Logic, and Data) to ensure global Separation of Concerns (SoC).

### Core Design Patterns
* **Strategy Pattern**: Used to handle the variable logic required for different contract clauses and action generation.
* **Factory Pattern**: Manages the creation of specific compliance checkers within the compliance engine.
* **Builder Pattern**: Ensures that complex DPA objects are always created in a valid state.
* **Adapter Pattern**: Applied through Data Transfer Objects (DTOs) to decouple internal database entities from the external API.

---

## 🧪 Testing & Quality Assurance

* **Unit Testing**: Implemented using JUnit 5 and Mockito to verify core logic independently of the database.
* **Integration Testing**: Utilizes Docker Compose to run tests against a real PostgreSQL environment.
* **Test Coverage**: The project achieved 73% overall line coverage, with 100% coverage in critical packages like `strategy` and `repository`.
* **CI/CD**: A GitHub Actions workflow automatically compiles the backend and runs unit tests on every Pull Request.

---

## 🔮 Future Work

* **Archiving Capabilities**: Implementing a "Soft Delete" mechanism to maintain mandatory legal audit trails.
* **Automated Document Parsing**: Integrating Natural Language Processing (NLP) to extract metadata directly from uploaded PDF documents.
* **Granular Access Control**: Moving beyond simple authentication to implement fine-grained role-based access (e.g., read-only users vs. editors).
* **Single Sign-On (SSO)**: Implementing OAuth2 or OpenID Connect for enterprise authentication.

---

## 👥 Contributors (Group 1)
* **Asbjørn Flarup Gosvig** 
* **Jakob Michaelsen**
* **Rohan Atik** 
* **Marcus Hørup Linde** 
* **Nichlas Christiansen**
* **Ryan Niaina Zachariasen**

**Supervisors**: Carla Florencia Griggio & Xinyuan Liu 
**Institution**: Aalborg University Copenhagen, Department of Computer Science
