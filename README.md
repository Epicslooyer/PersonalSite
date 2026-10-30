# Sajan Senghera — personal site

Vim-style portfolio at [wowepicsite.vercel.app](https://wowepicsite.vercel.app).

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Commands: `:help` `:about` `:experience` `:projects` `:lab` `:resume` `:contact`.

CNN weights are regenerated with:

```bash
python scripts/train_tiny_cnn.py
```

## Deploy

Pushes to `main` on [Epicslooyer/PersonalSite](https://github.com/Epicslooyer/PersonalSite) deploy to Vercel.

Optional env:

- `GITHUB_TOKEN` — contribution heatmap
- `EMAIL_USER` / `EMAIL_PASS` — unused; contact uses mailto
