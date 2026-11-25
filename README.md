# runpingzhao site

Static website. No build step: every file here is served as is.

## Pages
- `index.html`: Home
- `research.html`: Research
- `sharing.html`: Sharing
- `viewer.html`: in-site PDF viewer (opened by the CV, Paper, Slides and Introduction links)

## PDFs
Put PDFs in `files/` with exactly these names, and the links on the site will open them in the viewer:

| Link | File |
|---|---|
| CV (Home) | `files/RunpingZhao_CV.pdf` (already included) |
| Introduction (Deposit Competition) | `files/Zhao_Deposit_Competition_Introduction.pdf` |
| Paper (Refugees) | `files/Bordalo_Sequeira_Zhao_Refugees.pdf` |
| Slides (Refugees) | `files/Bordalo_Sequeira_Zhao_Refugees_Slides.pdf` |

To update a PDF later, upload a new file with the same name; the links do not change.
File names may only use letters, numbers, `.`, `_` and `-`.

## Other files
- `assets/runping-zhao.png`: photo
- `assets/site.css`, `assets/site.js`: shared style and behaviour
- `assets/viewer.js`: PDF viewer (uses PDF.js from jsDelivr)
- `assets/favicon.svg`: browser tab icon
- `.nojekyll`: tells GitHub Pages to serve files as is
