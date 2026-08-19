# AWS CLF-C02 Study Site

This folder is ready to publish as a static GitHub Pages site. There is no build
step and no package installation.

## Publish manually

Create an empty GitHub repository, then run these commands from this folder:

```bash
git init
git add .
git commit -m "Publish AWS CLF-C02 study site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

On GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select the
`main` branch and `/ (root)`, then save.

## Preview locally

Browsers may restrict local files loaded directly with `file://`. Preview through
a small local server instead:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Repository contents

- `index.html` is the complete study site and embedded PDF.
- JavaScript files in the repository root provide the practice exams, Quiz 2,
  their controllers, and the AWS services overview content.
- `assets/service-visuals/` contains the service visual guides used by the page.
- `source/` contains editable Markdown question banks and the original services
  overview JSON. These source files are retained for maintenance but are not
  loaded by the published site.

