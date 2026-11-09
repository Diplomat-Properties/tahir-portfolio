# Muhammad Tahir — Executive Portfolio

A complete, standalone portfolio in HTML, CSS and JavaScript. Open `index.html` to preview it. Upload the same files to GitHub Pages to publish it. No Lovable account, npm installation, paid hosting or backend is required for the website.

## Publish on GitHub Pages — simplest method

1. Extract this ZIP on your computer.
2. Create a **public** GitHub repository named `tahir-leadership-portfolio`, or open your existing repository with that name.
3. Upload the **contents** of this project folder, including `index.html`, `style.css`, `script.js` and the entire `assets` folder. `index.html` must appear at the repository’s top level, not inside an extra folder. Upload extracted files, not the ZIP itself.
4. Open **Settings → Pages** in the repository.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Choose **main** and **/(root)**, then click **Save**.
7. Wait for GitHub’s deployment to complete. The **Visit site** button on the Pages screen shows your actual published URL. Publishing can take up to 10 minutes.

If you use the account **Diplomat-Properties** and the repository **tahir-leadership-portfolio**, the expected address after a successful deployment is:

`https://diplomat-properties.github.io/tahir-leadership-portfolio/`

That is the expected deployment address, not a claim that this new version is already uploaded or live. For a different account or repository, GitHub uses `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

If replacing an older app in the same repository, use the root-level `index.html` from this package and the branch publishing setting above. The old React/Lovable build setup is not needed by this standalone site. Review old files before removing them.

Official instructions:

- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Publish using Git commands

For a **new empty repository**, run these commands from the extracted project folder. Replace `YOUR-USERNAME` with your GitHub username or organization:

```bash
git init
git add .
git commit -m "Add Muhammad Tahir executive portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/tahir-leadership-portfolio.git
git push -u origin main
```

Then enable **Settings → Pages → Deploy from a branch → main → /(root)**.

For an **existing repository**, clone it first, copy the project files into that checkout, review `git diff`, then commit and push normally. Do not force-push or reinitialize an existing checkout.

## Optional GitHub Actions deployment

The included `.github/workflows/pages.yml` is a manual alternative. It does not run automatically or interfere with the simple branch method.

To use it, set **Settings → Pages → Source → GitHub Actions**, then open **Actions → Deploy portfolio to GitHub Pages → Run workflow**. The workflow deploys only the actual website files, not this README. Run it again after future updates. If you later want automatic Actions deployment, add a `push` trigger for the `main` branch.

## What is included

| File / folder | Purpose |
| --- | --- |
| `index.html` | Complete page content, navigation, structured metadata and accessible HTML |
| `style.css` | Responsive layout, typography, colours, 3D layers and print styling |
| `script.js` | Company filters, detail dialogs, mobile menu, portrait tilt and motion control |
| `assets/images/` | Supplied portrait, preserved as provided |
| `assets/logos/` | All four supplied logos; Rise’s logo also identifies its branch |
| `assets/documents/Muhammad_Tahir_Executive_Profile.pdf` | One-page executive profile without education or certifications |
| `assets/documents/Muhammad_Tahir.vcf` | Downloadable contact card |
| `assets/favicon.svg` | MT browser icon |
| `.nojekyll` | Enables straightforward static file hosting |
| `.github/workflows/pages.yml` | Optional manual GitHub Pages deployment |
| `CONTENT_NOTES.md` | Content mapping and details carried over from the supplied CV |

## Features

- Layered 3D portrait with pointer-responsive tilt, animated metallic orbit and subtle scroll reveals.
- Responsive layout from small phones through desktop monitors.
- Five current company entries, including separate Rise Properties and Rise Properties branch entries.
- Faiza Saqlain displayed alongside Business Link and Diplomat in the first company row on desktop.
- Sector filters and accessible company detail dialogs.
- Full career timeline and expandable earlier ventures.
- Email, telephone and WhatsApp links, contact-card download, copy-email control and PDF profile download.
- Keyboard navigation, skip link, native dialog focus handling and reduced-motion support.
- User-controlled motion preference. Device-level reduced-motion settings are respected.
- No analytics, cookies, externally loaded fonts, trackers or runtime third-party libraries.

Email and phone buttons open the visitor’s configured apps. WhatsApp opens a conversation addressed to the CV phone number; it does not send a message automatically. Whether that number has an active WhatsApp account has not been independently confirmed. The site does not collect enquiries on a server or pretend to submit a form.

## Editing the site

Edit visible copy, dates, role titles and contact links in `index.html`. The additional company detail descriptions live in the `companyData` object in `script.js`; update that object when changing company details. Colours and font choices are defined at the top of `style.css`.

Replace images at their existing paths to preserve the links. Keep original image proportions. A filename change must also be reflected in `index.html` and, for logos, `script.js`.

When changing contact details, also update the structured metadata in `index.html`, the email-copy value in `script.js`, the `.vcf` file and the profile PDF. The PDF is a separate downloadable document; HTML edits do not modify it automatically.

After confirming the final public URL, set `og:image` in `index.html` to the full HTTPS URL of `assets/images/muhammad-tahir.jpg` at your published site. This improves compatibility with social sharing services that require an absolute image URL. You can also add a canonical link and `og:url` using that confirmed address. No guessed canonical URL is embedded in this package.

## Local preview

Double-click `index.html`. For a local HTTP preview, Python users can run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. No package install or compilation is needed. All asset references are relative so the site works inside a GitHub project subdirectory.

## Asset ownership

The portrait, company names and logos were supplied for this portfolio. They remain the property of their respective owners. The decorative MT monogram is a text-based portfolio mark and is not a substitute for any company’s official branding.

## Verification

The completed layout was inspected in Chromium at desktop width and in 320px, 390px and 768px responsive preview frames. Company filters, detail dialogs, Escape dismissal, mobile navigation, motion preference and the clipboard fallback were exercised. Local asset links, anchor targets, structured metadata, JavaScript syntax and the profile PDF were checked. The profile PDF was visually reviewed. This package has not been uploaded to GitHub or deployed, and external email, phone and WhatsApp messages were not sent.
