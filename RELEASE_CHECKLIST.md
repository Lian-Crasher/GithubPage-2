# Release Checklist

Use this checklist before publishing changes to GitHub Pages.

## 1. Local State

```bash
git status -sb
git log --oneline --decorate -5
```

Expected:

- Working tree only contains intended changes.
- `main` is based on the latest known `origin/main`.

## 2. Static Checks

```bash
node --check scripts/common.js
node --check scripts/quiz.js
node --check scripts/chapter1-motion.js
node --check scripts/chapter2-sound.js
node --check scripts/chapter3-states.js
node --check scripts/chapter4-light.js
node --check scripts/chapter5-lenses.js
node --check scripts/chapter6-density.js
node --check scripts/final-check.js
node --check scripts/chapter-volume2.js
node --check scripts/final-check-volume2.js
```

Confirm that every HTML page includes a description and favicon:

```bash
rg --files-without-match '<meta name="description"' index.html chapters/*.html
rg --files-without-match 'rel="icon"' index.html chapters/*.html
```

Both commands should return no files.

## 3. Local Browser QA

```bash
python3 -m http.server 8000
```

Open:

- `http://localhost:8000/index.html`
- `http://localhost:8000/chapters/chapter3-states.html#boiling-exam`
- `http://localhost:8000/chapters/chapter4-light.html#ray-drawing`
- `http://localhost:8000/chapters/chapter5-lenses.html#lens-practice`
- `http://localhost:8000/chapters/chapter6-density.html#density-errors`
- `http://localhost:8000/chapters/final-check.html`
- `http://localhost:8000/chapters/chapter9-pressure.html`
- `http://localhost:8000/chapters/chapter10-buoyancy.html`
- `http://localhost:8000/chapters/chapter11-work-energy.html`
- `http://localhost:8000/chapters/chapter12-simple-machines.html`
- `http://localhost:8000/chapters/final-check-volume2.html`

Check:

- No unexpected horizontal page overflow at mobile width.
- Home progress badges and next-step recommendations update after quiz attempts.
- Wrong answers show useful feedback and review links.
- Drawing and ordering interactions still respond on mobile.
- Browser console has no missing favicon, image, stylesheet, or script requests.
- Home semester switch, chapter map, and both final-check entries show the correct volume.
- Force arrows use thin shafts and pointed heads; their directions and points of application are physically meaningful.
- Chapter 9 pressure interactions keep depth, pressure, valve state, water level, and airflow direction consistent.
- Chapter 10 buoyancy interactions keep spring-scale readings, displaced liquid, buoyancy, and floating state consistent.
- Chapter 11 height baselines, rope connections, cart contact, and energy values remain synchronized.

## 4. Commit

```bash
git add <changed-files>
git commit -m "<concise message>"
```

## 5. Push

Try the normal push first:

```bash
git push origin main
```

If it fails with `Error in the HTTP2 framing layer`, use:

```bash
git -c http.version=HTTP/1.1 push origin main
```

If it fails because the remote has moved:

```bash
git fetch origin main
git log --oneline --decorate --graph --max-count=8 main origin/main
```

Do not force-push unless the user explicitly approves it.

## 6. After Push

Verify alignment:

```bash
git status -sb
git rev-parse HEAD
git rev-parse origin/main
git rev-parse HEAD^{tree}
```

Open GitHub Pages after it refreshes:

- `https://lian-crasher.github.io/GithubPage-2/`
- `https://lian-crasher.github.io/GithubPage-2/chapters/final-check.html`
- `https://lian-crasher.github.io/GithubPage-2/chapters/chapter9-pressure.html`
- `https://lian-crasher.github.io/GithubPage-2/chapters/chapter10-buoyancy.html`
- `https://lian-crasher.github.io/GithubPage-2/chapters/final-check-volume2.html`

If CSS or JavaScript changes do not appear online, bump the query string version in HTML references.
