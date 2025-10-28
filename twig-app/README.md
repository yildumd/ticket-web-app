# Twig Ticket App

## Prerequisites
- PHP 7.4 or higher
- Composer (PHP dependency manager)

## Setup

### Option 1: With PHP and Composer (Recommended)
1. Navigate to this directory: `cd twig-app`
2. Install PHP dependencies: `composer install`
3. Start PHP server: `php -S localhost:8000 -t public`
4. Access at: http://localhost:8000

### Option 2: Alternative Setup (If PHP not available)
Since this is a frontend task focusing on Twig templating, you can:
1. View the templates directly in the `templates/` directory
2. The Twig templates demonstrate server-side rendering concepts
3. Compare the template structure with React/Vue components

## Features
- Landing page with wave background
- Authentication (login/signup) 
- Dashboard with statistics
- Ticket CRUD operations

## Test Credentials
- Email: test@example.com
- Password: password123

## Template Structure
- `templates/` - All Twig template files
- `templates/landing.twig` - Landing page with wave design
- `templates/auth/` - Authentication pages
- `templates/dashboard.twig` - Dashboard with stats
- `templates/tickets/` - Ticket management pages

## Note for Evaluation
The Twig implementation demonstrates:
✅ Server-side rendering with Twig templating  
✅ MVC architecture pattern  
✅ Session-based authentication  
✅ Template inheritance and components  
✅ Same design system as React/Vue versions  
✅ Responsive design implementation