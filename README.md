# Amie Art Portfolio Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/f8d5e39e-a38b-44a8-bf4c-c9d884578e15/deploy-status)](https://app.netlify.com/sites/amieart/deploys)

This is a static portfolio site built with Eleventy and Netlify CMS for easy content management. The site includes dark mode support and uses Auth0 for authentication.

## Description

A static website showcasing Amie's artwork, exhibitions, and professional background. The site serves as a portfolio and point of contact for art collectors, galleries, and fans.

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/amieart-static.git

# Navigate to the project directory
cd amieart-static

# Install dependencies
npm install
```

## Local Development

```bash
# Start the development server
npm run dev
```

## Deployment

This website is hosted on Netlify, providing continuous deployment from the main branch.

## Content Management

### Accessing the CMS

1. Go to `https://your-site-url.netlify.app/admin/`
2. Log in using Auth0
3. Use the admin interface to manage your content

### Managing Content

The CMS provides interfaces for editing:

- **Projects**: Add or edit portfolio projects, including images and descriptions
- **Artworks**: Manage individual artworks, including details like medium, dimensions, and year
- **Gallery**: Browse and filter all artworks by medium and year
- **Pages**: Edit content for the Home, Bio, Resume, Contact, and Shop pages
- **Media**: Upload and manage images for use in content

## Features

- Responsive design with dark mode support
- Portfolio project showcase
- Gallery with filtering options for artworks
- Bio and resume sections
- Contact page
- Shop link integration
- CMS for easy content management
- Auth0 secure authentication

## Technologies

- HTML5
- CSS3
- JavaScript
- Eleventy static site generator
- Netlify CMS
- Netlify hosting and CDN
