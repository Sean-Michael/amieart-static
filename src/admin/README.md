# Setting Up Netlify Identity for Your CMS

Follow these steps to enable the CMS after deploying to Netlify:

## 1. Enable Identity Service

1. Deploy your site to Netlify
2. Go to your site dashboard in Netlify
3. Navigate to **Site settings > Identity**
4. Click **Enable Identity**

## 2. Configure Registration Settings

1. Under Identity settings, scroll to **Registration preferences**
2. Set to **Invite only** (recommended for private sites)
3. Optionally, enable **Git Gateway** under **Services** to allow CMS access to your GitHub repository

## 3. Invite Users

1. Go to the **Identity** tab in your Netlify dashboard
2. Click **Invite users**
3. Enter your email address and other admin emails
4. Check your email and accept the invitation

## 4. Access the CMS

1. Go to `https://your-site-url.netlify.app/admin/`
2. Log in with the email you invited
3. You should now have access to your CMS!

## 5. Additional Identity Settings (Optional)

- **External providers**: Enable login with GitHub, Google, etc.
- **Password recovery**: Configure email templates
- **Git Gateway**: Connect your CMS to your GitHub repository

## Troubleshooting

If you can't access the CMS:

- Make sure Git Gateway is enabled
- Check that you've accepted the email invitation
- Verify your user has admin privileges
- Clear browser cache and cookies

For more information, refer to the [Netlify Identity documentation](https://docs.netlify.com/visitor-access/identity/).