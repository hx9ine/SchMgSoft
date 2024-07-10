
# SchMgSoft - A School Management Software

SchMgSoft is a comprehensive school management software (SaaS) designed to handle various administrative tasks within educational institutions. It offers features like multi-user authentication, attendance tracking, class scheduling, payroll management, and more, providing a unified platform for managing school operations efficiently.

## Features
- **Role-Based Multi-User Authentication:** Secure login for different user roles (admins, teachers, students).
- **Dashboard:** An overview of important metrics and notifications.
- **Student & Staff Management:** Manage profiles, classes, and personal details.
- **Attendance Tracking:** Record and monitor student attendance.
- **Payroll Management:** Handle staff salaries and payments.
- **Notifications:** Send and receive messages within the system.
- **Class Scheduling:** Organize and manage class schedules.
- **Exams & Results:** Schedule exams and record results.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Django
- **Database:** SQLite (development), PostgreSQL (production)
- **Version Control:** Git

## Installation

### Prerequisites
- Python 3.x
- pip (Python package installer)
- PostgreSQL (for production)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/hx9ine/SchMgSoft.git
   cd SchMgSoft
   ```

   2. **Create a virtual environment:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate   #On Windows: venv\Scripts\activate
   ```

   3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

   4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

   5. **Create a superuser:**
   ```bash
   python manage.py createsuperuser
   ```

   6. **Start the development server:**
   ```bash
   python manage.py runserver
   ```


## Usage/Examples
Access the application at `http://127.0.0.1:8000` and log in using the superuser credentials. You can then start adding users, managing classes, tracking attendance, and using other features of the system.

## Folder Structure
```
School-MS/
├── app/
├── media/
├── productionfiles/
├── static/
├── templates/
├── manage.py
├── requirements.txt
└── db.sqlite3
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For any inquiries, please reach out to [info.hxn@gmail.com](mailto:info.hxn@gmail.com).