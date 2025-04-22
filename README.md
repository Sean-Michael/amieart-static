# Amie Art Portfolio Website

This is a static portfolio site built with Eleventy and Netlify CMS for easy content management. The site includes dark mode support and uses Auth0 for authentication.

## Description

A static website showcasing Amie's artwork, exhibitions, and professional background. The site serves as a portfolio and point of contact for art collectors, galleries, and fans.

## Authentication Setup

This site uses Auth0 for secure authentication to the admin interface. Follow these steps to set up Auth0:

### 1. Create an Auth0 Application

1. Sign up for an [Auth0 account](https://auth0.com/) if you don't have one
2. Create a new Application in the Auth0 dashboard
3. Choose "Regular Web Application" as the application type
4. In Settings, configure the following:
   - **Allowed Callback URLs**: `https://your-site-url.netlify.app/admin/callback`
   - **Allowed Logout URLs**: `https://your-site-url.netlify.app/admin`
   - **Allowed Web Origins**: `https://your-site-url.netlify.app`
   - Replace `your-site-url.netlify.app` with your actual Netlify domain

### 2. Configure Environment Variables in Netlify

In your Netlify site dashboard, go to Site Settings > Build & Deploy > Environment:

Add the following environment variables:
```
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
GITHUB_ACCESS_TOKEN=your-github-personal-access-token
```

- The Auth0 values come from your Auth0 application settings
- For the GitHub token, create a [Personal Access Token](https://github.com/settings/tokens) with `repo` scope

### 3. Configure GitHub Repository

1. Update the `repo` field in `src/admin/config.yml` to match your GitHub repository:
   ```
   repo: your-github-username/amieart-static
   ```

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

[![Netlify Status](https://api.netlify.com/api/v1/badges/project-id/deploy-status)](https://app.netlify.com/sites/amieart/deploys)


## Content Management

### Accessing the CMS

1. Go to `https://your-site-url.netlify.app/admin/`
2. Log in using Auth0
3. Use the admin interface to manage your content

### Managing Content

The CMS provides interfaces for editing:

- **Projects**: Add or edit portfolio projects, including images and descriptions
- **Pages**: Edit content for the Home, Bio, Resume, Contact, and Shop pages
- **Media**: Upload and manage images for use in content

## Features

- Responsive design with dark mode support
- Portfolio project showcase
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
