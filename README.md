# 차트로드

차트로드는 투자 추천이 아닌 교육용 차트 학습 로드맵 진단 사이트입니다.

## Stack

- Astro static site
- Cloudflare Pages target
- Client-side 28-question diagnostic test
- No login, no server-side personal data storage

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: latest LTS

## GitHub Workflow

1. Create a GitHub repository.
2. Push this project to the repository.
3. Connect the repository to Cloudflare Pages.
4. Use the build settings above.

This repository also includes `.github/workflows/build.yml`, so GitHub can verify `npm run build` on pushes and pull requests.

## Content Policy

All result and learning copy must stay educational. Avoid direct buy/sell recommendations, profit guarantees, or wording that implies investment advice.
