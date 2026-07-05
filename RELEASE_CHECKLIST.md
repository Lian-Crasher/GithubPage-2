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
```

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
- `http://localhost:8000/chapters/chapter6-density.html#final-check`

Check:

- No unexpected horizontal page overflow at mobile width.
- Home progress badges and next-step recommendations update after quiz attempts.
- Wrong answers show useful feedback and review links.
- Drawing and ordering interactions still respond on mobile.

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
- `https://lian-crasher.github.io/GithubPage-2/chapters/chapter6-density.html#final-check`

If CSS or JavaScript changes do not appear online, bump the query string version in HTML references.
