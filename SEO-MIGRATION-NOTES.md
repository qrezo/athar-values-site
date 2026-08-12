# Google / SEO migration notes

Official canonical domain: `https://atharalqiyam.org.sa`

Changes applied:
- Old `athar-alqym.netlify.app` host permanently redirects (301) to the matching path on `https://atharalqiyam.org.sa`.
- `robots.txt` points to the sitemap on the official domain.
- `sitemap.xml` contains only official-domain canonical URLs.
- Canonical tags were added to the main public static pages.
- Homepage now declares the site name as `جمعية أثر القيم` using `WebSite` structured data.
- Homepage title/description were strengthened for an official association result.
- A square brand favicon was generated from the existing approved fingerprint mark.
- Redirect-only pages (`join.html`, `thanks.html`) are marked `noindex,follow`.

After deployment:
1. Verify `https://athar-alqym.netlify.app/` returns a 301 to `https://atharalqiyam.org.sa/`.
2. Verify `https://atharalqiyam.org.sa/robots.txt` and `https://atharalqiyam.org.sa/sitemap.xml`.
3. In Google Search Console, add/verify the new domain property, submit `sitemap.xml`, and request indexing for the homepage.
4. If the old Netlify property is verified in Search Console and Change of Address is available for it, submit the move to `https://atharalqiyam.org.sa`.
