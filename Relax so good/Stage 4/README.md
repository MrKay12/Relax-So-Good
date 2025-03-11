# Relax So Good

## Sprint Plan

**Sprint Duration:** 6 Weeks

**Goals**

- Develop core functionality for user accounts and product management.
- Ensure intuitive navigation and usability.
- Implement feedback tracking features for users and admins.

### Prioritized Tasks (MoSCoW Methodology)

#### Must Have:

- User Account Creation

    - Task 1: Design UI for registration page

    - Task 2: Implement backend for user registration

    - Task 3: Set up authentication and authorization

    - Task 4: Database integration for user storage

    - Task 5: Test and debug user registration

- Admin Product Management

    - Task 1: Design UI for product management dashboard

    - Task 2: Implement backend for adding, removing, and viewing products

    - Task 3: Ensure database connectivity and CRUD operations

    - Task 4: Test and refine product management functionality

- Intuitive User Interface

    - Task 1: Define user navigation flow

    - Task 2: Develop front-end components for a clean and simple UI

    - Task 3: Conduct usability testing and improvements

#### Should Have:

- User Feedback History

    - Task 1: Create UI for viewing past feedback

    - Task 2: Implement backend logic to retrieve stored feedback

    - Task 3: Ensure database schema supports feedback storage

- Admin Feedback Viewing

    - Task 1: Design UI for feedback analytics

    - Task 2: Implement backend for filtering and displaying feedback

    - Task 3: Integrate data visualization tools if necessary

#### Could Have:

- Feedback Submission Confirmation

    - Task 1: Design and develop confirmation message modal/pop-up

    - Task 2: Implement notification system (email or in-app)

    - Task 3: Conduct testing for feedback submission acknowledgment

#### Won’t Have:

- AI-generated feedback suggestions (Deferred)

### Task Dependencies and Assignments

| Task                              | Dependency            | Assigned To   |
| --------------------------------- |:---------------------:| -------------:|
| User Account Creation             | None                  | Jakob         |
| Admin Product Management          | None                  | Quentin       |
| Intuitive UI                      | None                  | Jakob         |
| User Feedback History             | User Account Creation | Quentin       |
| Admin Feedback Viewing            | User Feedback History | Jakob         |
| Feedback Submission Confirmation  | User Feedback History | Quentin       |


### Sprint Timeline

| Week     | Task                             | Expected Completion   |
| -------- |:--------------------------------:| ---------------------:|
| 1-2      | User Account Creation            | End of Week 2         |
| 1-2      | Admin Product Management         | End of Week 2         |
| 1-2      | Intuitive UI                     | End of Week 2         |
| 3-4      | User Feedback History            | End of Week 4         |
| 3-4      | Admin Feedback Viewing           | End of Week 4         |
| 5-6      | Feedback Submission Confirmation | End of Week 6         |


## Execute Development Tasks

### User Account Creation

- Designing of the registration page UI with fields for email and password.

- Backend logic is implemented using Node.js and Express for handling user sign-up requests.

- Authentication is set up using Flask-Login for secure login sessions.

- A SQLAlchemy database is integrated to store user credentials securely.

- QA runs tests using Postman and Cypress to verify registration flow and fix identified bugs.

### Admin Product Management

- Creation of an admin dashboard with options to add, edit, and remove products.

- CRUD operations are developed using REST APIs and a database schema for product storage.

- Git branching is used for feature development, and pull requests are reviewed before merging.

- QA tests product management features using test scripts and reports issues found.

### Intuitive User Interface

- Definition of the user flow, ensuring seamless navigation across pages.

- React components are developed to ensure consistency in UI design.

- A/B testing is conducted to gather feedback and refine the interface for usability.

### User Feedback History

- Designing a feedback history page where users can view their past submissions.

- Backend logic retrieves and displays user-specific feedback from the database.

- QA verifies that all past feedback entries appear correctly and no data is lost.

### Admin Feedback Viewing

- Building a dashboard for viewing user feedback, allowing sorting and filtering.

### Feedback Submission Confirmation

- Implementing a success pop-up after feedback submission.

- QA verifies that messages are sent successfully and no duplicates occur.

## Monitor Progress and Adjust

- **Daily Stand-ups:**
  - Conduct daily stand-up meetings to discuss progress, blockers, and plans for the day.
  - Ensure all team members are aligned and aware of their tasks.

- **Sprint Reviews:**
  - Hold sprint review meetings at the end of each sprint to demonstrate completed work.
  - Gather feedback from stakeholders and make necessary adjustments.

- **Sprint Retrospectives:**
  - Conduct sprint retrospectives to reflect on the sprint process.
  - Identify what went well, what didn't, and how to improve in the next sprint.

- **Task Tracking:**
  - Update task statuses regularly to reflect current progress.

- **Progress Reports:**
  - Generate weekly progress reports to summarize completed tasks and upcoming work.
  - Share reports with stakeholders to keep them informed.

- **Adjustments:**
  - Make adjustments to the sprint plan based on feedback and progress.
  - Reassign tasks or adjust priorities as needed to ensure project goals are met.

- **Quality Assurance:**
  - Continuously test and review the work to ensure it meets quality standards.
  - Address any issues or bugs promptly to maintain project quality.

- **Communication:**
  - Maintain open and transparent communication within the team and with stakeholders.
  - Use communication tools (e.g. Discord) to facilitate discussions and updates.

## Sprint Reviews and Retrospectives

#### Sprint Review:

**Date:** 09/03/2025

**Attendees:** Quentin Lepoutre, Jakob Stein

**Completed Features:**
- User Account Creation
  - Designed and implemented the registration page UI.
  - Set up backend logic for user sign-up using Node.js and Express.
  - Integrated SQLAlchemy database for secure user credential storage.
  - Implemented Flask-Login for authentication and secure login sessions.
  - QA tested the registration flow using Postman and Cypress.

- Admin Product Management
  - Created an admin dashboard for product management.
  - Developed CRUD operations for products using REST APIs.
  - Ensured database connectivity and CRUD operations.
  - QA tested product management features and reported issues.

- Intuitive User Interface
  - Defined user navigation flow.
  - Developed front-end components for a clean and simple UI.
  - Conducted usability testing and made improvements based on feedback.

#### Sprint Retrospective:

**Date:** 09/03/2025

**Attendees:** Quentin Lepoutre, Jakob Stein

**What worked well:**
- The team successfully completed all planned tasks for the sprint.
- Effective communication and collaboration among team members.
- QA testing identified and resolved critical issues early.

**Challenges faced:**
- Some delays in backend development due to unexpected technical issues.
- Difficulty in coordinating schedules for in-person meetings.

**Improvements for next sprint:**
- Allocate more time for backend development to account for potential issues.
- Schedule in-person meetings in advance to ensure full team participation.
- Enhance communication tools to facilitate remote collaboration.

## Final Integration and QA Testing

**Integration Testing:** Ensures all components work cohesively across the full stack.

**End-to-End Testing:** Verifies user flows from account creation to feedback submission.

**Performance Testing:** Identifies bottlenecks in API calls, database queries, and UI rendering.

**Regression Testing:** Ensures new changes do not break existing functionality.

**Bug Fixes:** Critical bugs are addressed before deployment.

## 🙌 Contributors
- [Quentin Lepoutre](https://github.com/MrKay12)
- [Jakob Stein](https://github.com/SeasonofBeaver)

## 📧 Contact
For any questions or suggestions, feel free to reach out via [quentin.lepoutre12@gmail.com]().

## Next step ##
Finalizing the project and testing the websites for bugs.

