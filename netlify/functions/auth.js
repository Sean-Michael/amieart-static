// Netlify serverless function for Auth0 authentication with Netlify CMS
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

// Your Auth0 settings - store these in environment variables for security in production
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || `https://${AUTH0_DOMAIN}/api/v2/`;
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

// The handler function for the serverless function
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the request body to get the Auth0 authorization code
    const { code, state } = JSON.parse(event.body);
    
    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing authorization code' })
      };
    }

    // Exchange the authorization code for an access token with Auth0
    const tokenResponse = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI || `${event.headers.host}/admin/callback`
      })
    });

    const { access_token, id_token, error } = await tokenResponse.json();

    if (error || !access_token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: error || 'Failed to acquire token' })
      };
    }

    // Get the user info from Auth0
    const userResponse = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    
    const user = await userResponse.json();
    
    // Check if the user is authorized to use the CMS
    // You can implement custom authorization logic here
    const isAuthorized = true; // Replace with your authorization logic
    
    if (!isAuthorized) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'User not authorized to access CMS' })
      };
    }

    // Generate a GitHub compatible token for Netlify CMS
    // This allows the CMS to commit to the repository
    const gitHubToken = GITHUB_ACCESS_TOKEN;
    
    // Return success with the token for Netlify CMS
    return {
      statusCode: 200,
      body: JSON.stringify({
        token: gitHubToken,
        provider: 'github'
      })
    };

  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error during authentication' })
    };
  }
};