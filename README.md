# AWS CLF-C02 Study Site

A static study site for the AWS Certified Cloud Practitioner (CLF-C02) exam.

**Live site:** https://abdurrahman-cybersec.github.io/aws-clf-c02-github-pages/

No build step, no package installation — the site is served directly from the
`main` branch via GitHub Pages.

## Deploying changes

Push to `main` and GitHub Pages redeploys automatically:

```bash
git add .
git commit -m "Describe the change"
git push
```

## Preview locally

Browsers may restrict local files loaded directly with `file://`. Preview through
a small local server instead:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Repository contents

- `index.html` — the complete study site and embedded PDF.
- JavaScript files in the repository root — practice exams, Quiz 2, their
  controllers, and the AWS services overview content.
- `assets/service-visuals/` — the service visual guides used by the page.
- `source/` — editable Markdown question banks and the original services
  overview JSON. Retained for maintenance but not loaded by the published site.
