# Google Security and SEO Checks

## Google Search Console

1. Open Google Search Console: https://search.google.com/search-console
2. Add the production property for `https://eceexamguide.vercel.app`.
3. Choose the HTML meta tag verification method.
4. Copy only the token from the meta tag content value.
5. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel project environment variables.
6. Redeploy the site.
7. Click Verify in Search Console.
8. Submit the sitemap URL: `https://eceexamguide.vercel.app/sitemap.xml`.

The app already emits:

```html
<meta name="google-site-verification" content="..." />
```

## Google Safe Browsing Transparency Report

Check the deployed site here:

https://transparencyreport.google.com/safe-browsing/search?url=https:%2F%2Feceexamguide.vercel.app

Use this after deployment and after any security-sensitive change, especially uploads,
third-party scripts, redirects, or generated HTML/SVG rendering.

## Ongoing Review

- Review Search Console Security Issues monthly.
- Review Search Console Manual Actions monthly.
- Check Safe Browsing after adding upload, ad, analytics, or embed features.
- Keep `sitemap.xml` submitted after major route changes.
- Treat malware, deceptive-page, or hacked-content warnings as launch blockers.
