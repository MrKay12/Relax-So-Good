# Relax So Good (RSG) - Comprehensive Project Plan

## Team Members
- Quentin Lepoutre (Project Manager)
- Jakob Stein

### Collaboration Strategy
We will work collaboratively on all aspects of the project, maintaining regular communication through Slack and Discord. Responsibilities will be divided based on workload balance and necessity.

---

## Project Overview
### Project Name: Relax So Good (RSG)
### Purpose & Description
RSG is an e-commerce platform that enables users to browse, search, and purchase products online. It features user registration, a shopping cart, secure payment processing, and real-time stock management to ensure an intuitive shopping experience and accurate inventory tracking.

---

## Objectives
- Develop a fully functional and scalable e-commerce website.
- Implement real-time stock tracking to prevent out-of-stock purchases.
- Ensure security, usability, and accessibility.
- Provide notification alerts for product availability changes.
- Gather user feedback for continuous improvement.

---

## Scope
### In-Scope
- Development of a web-based platform.
- Core features including:
  - User registration and authentication.
  - Product browsing, searching, and purchasing.
  - Feedback submission system.
- Real-time inventory management.
- An intuitive and user-friendly UI/UX design.

### Out-of-Scope
- Advanced AI-based recommendations.
- Mobile application development.
- Integration with third-party external APIs.

---

## Roles & Responsibilities
### Internal Team
- **Quentin Lepoutre:** Project management, frontend & backend development.
- **Jakob Stein:** Backend development, database management, quality assurance.

### External Stakeholders
- Potential users and testers for feedback collection.

---

## Risks & Mitigation Strategies
| Risk | Mitigation Strategy |
|------|---------------------|
| Tight timelines | Break down tasks and prioritize essential features. |
| Communication issues | Schedule frequent check-ins and reviews. |
| Technical challenges | Allocate time for debugging and troubleshooting. |
| Limited experience with some technologies | Conduct research and self-training. |
| Team burnout | Distribute workload evenly and reassess regularly. |

---

## Development Plan
### Timeline & Key Milestones
| Stage | Description | Timeline | Key Milestones |
|-------|------------|----------|---------------|
| Stage 1 | Idea Development | Weeks 1-2 | Finalized project idea. |
| Stage 2 | Project Charter Development | Weeks 3-4 | Completed project charter. |
| Stage 3 | Technical Documentation | Weeks 5-6 | Finalized technical specifications. |
| Stage 4 | MVP Development | Weeks 7-10 | Built and tested MVP. |
| Stage 5 | Project Closure | Weeks 11-12 | Collected feedback and finalized project. |

---

## System Architecture
### High-Level System Workflow
#### User Interaction
1. User browses products, registers, or logs in.
2. User adds products to the shopping cart.
3. System validates stock availability.
4. User proceeds to checkout and makes a payment.
5. Order confirmation is generated.

#### Feedback System Workflow
1. User submits feedback.
2. Backend processes and stores feedback.
3. Admin reviews feedback for improvements.

---

## Technical Specifications
### Backend: Flask
- Handles authentication, product management, and order processing.

### Frontend: HTML, CSS, JavaScript
- Provides a responsive UI for user interaction.

### Database: MongoDB
- Stores user data, products, orders, and feedback.

### API Endpoints
| Endpoint | HTTP Method | Description | Input Format | Output Format |
|----------|------------|-------------|--------------|--------------|
| /api/login | POST | Authenticates a user | { "email": "user@example.com", "password": "******" } | { "token": "abcd1234" } |
| /api/register | POST | Creates a new user account | { "name": "John Doe", "email": "user@example.com", "password": "******" } | { "message": "User registered successfully" } |
| /api/feedback | POST | Submits user feedback | { "user_id": 1, "category": "UI", "content": "Make the button bigger." } | { "message": "Feedback submitted successfully" } |
| /api/feedback/{user_id} | GET | Retrieves user feedback | N/A (Path Parameter) | { "feedback": [{ "category": "UI", "content": "Improve colors." }] } |

---

## Core Classes
```python
class User(BaseModel):
    def __init__(self, first_name, last_name, email, is_admin):
        super().__init__()
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.is_admin = is_admin
        self.validate()
    
    def validate(self):
        if not self.first_name or len(self.first_name) > 50:
            raise ValueError("First name is required and must be under 50 characters.")
        if not self.last_name or len(self.last_name) > 50:
            raise ValueError("Last name is required and must be under 50 characters.")
        if not re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", self.email):
            raise ValueError("Invalid email format.")
```

```python
class Product:
    def __init__(self, id, name, description, price):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
```

```python
class Review(BaseModel):
    def __init__(self, text, rating, user_id, product_id):
        super().__init__()
        self.text = text
        self.rating = rating
        self.user_id = user_id
        self.product_id = product_id
        self.validate()
    
    def validate(self):
        if not self.text:
            raise ValueError("Review text is required.")
        if not (1 <= self.rating <= 5):
            raise ValueError("Rating must be between 1 and 5.")
```

---

## Software Configuration Management (SCM) & Quality Assurance (QA)
### SCM Strategy
- **Branching:** Feature branches for development, merged into the main branch upon completion.
- **Version Control:** GitHub repository with regular commits and documentation.
- **Code Reviews:** Peer reviews before merging PRs.

### QA Strategy
- **Testing Tools:** Jest (unit tests), Postman (API tests), Cypress (UI tests).
- **Types of Testing:**
  - Unit tests for individual functions.
  - Integration tests for API endpoints.
  - End-to-end tests for full workflow validation.
  - Smoke testing before deployments.

---

## Success Criteria
- A user-friendly and responsive e-commerce platform.
- Completion within the planned timeline.
- Positive feedback from test users.

---

## Documentation Plan
- Maintain codebase documentation.
- Develop a final project report detailing the development process and key findings.

---

## Conclusion
Relax So Good aims to deliver a seamless online shopping experience with real-time inventory tracking. With structured development, testing, and stakeholder feedback, we aim to build a robust and user-friendly e-commerce platform.

