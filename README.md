# Skillway API

This is a simple REST API for retrieving data about users and courses.

**Base URL**
*http://localhost:8000*

## Endpoints
### 1. Get Users

Retrieve a list of all users.

Endpoint:
GET /api/accounts/users/

Response Example:

[
    {
        "id": 1,
        "username": "sultan",
        "email": "sultanbaibolov1@gmail.com",
        "first_name": "",
        "last_name": "",
        "date_joined": "2025-09-27T07:43:11.126139Z"
    },
    {
        "id": 2,
        "username": "solitary",
        "email": "hello@gmail.com",
        "first_name": "Dave",
        "last_name": "Jhonson",
        "date_joined": "2025-10-16T09:21:06.194966Z"
    },
    ...
]

### 2. Get Courses

Retrieve a list of all available courses.

Endpoint:
GET /api/courses/courses/

Response Example:

[
    {
        "id": 1,
        "name": "Python Beginner",
        "description": "A Python beginner course teaches the fundamental concepts of programming, starting with basic syntax, variables, and data types, and progressing to control flow (loops and conditionals), data structures like lists, and functions.",
        "image_url": "src/assets/imgs/python_logo.svg",
        "category": "Programming",
        "difficulty_level": "E",
        "created_at": "2025-10-16T09:39:33.995395Z",
        "author": 3
    },
    {
        "id": 2,
        "name": "Python Intermediate",
        "description": "This short, intermediate Python course aims to elevate participants from foundational Python knowledge to a more advanced understanding, enabling them to write more complex, efficient, and well-structured code. The course focuses on practical application and problem-solving, building upon core programming concepts.",
        "image_url": "src/assets/imgs/python_logo.svg",
        "category": "Programming",
        "difficulty_level": "M",
        "created_at": "2025-10-16T09:41:29.559051Z",
        "author": 3
    },
    ...
]

## Notes

All responses are returned in JSON format.
Only GET requests are currently supported.
No authentication is required for these endpoints.

*Author: Sultan sultanbaibolov1@gmail.com*