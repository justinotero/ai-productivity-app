# AI Productivity - Example app

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Cursor MCP Setup

This project uses Cursor's Model Context Protocol (MCP) for enhanced development features. Follow these steps carefully to set up your environment securely:

### 1. Create a GitHub Token

1. Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens) page
2. Click "Generate new token (classic)"
3. Name it something recognizable (e.g., "Cursor MCP Integration")
4. Select these scopes:
   - `repo` (Full control of private repositories)
   - `read:org` (Read org and team membership)
5. Copy your token (you won't see it again!)

### 2. Set Up Your Token (Choose ONE method)

#### Option A: Environment Variable (Recommended)
Add to your shell configuration (`~/.zshrc`, `~/.bashrc`, or equivalent):
```bash
export GITHUB_PAT_CURSOR=your_token_here
```
Then reload your shell:
```bash
source ~/.zshrc  # or ~/.bashrc
```

#### Option B: Project .env File
1. The project includes a `.env` file template
2. Add your token:
```bash
GITHUB_PAT_CURSOR=your_token_here
```

⚠️ Security Notes:
- NEVER commit tokens to Git
- NEVER share your tokens in chat logs or screenshots
- The `.env` file is git-ignored for your security
- Each developer should set up their own token
- Regularly rotate your tokens for better security

### 3. Configuration
- The MCP configuration is in `.cursor/mcp.json`
- It uses `${GITHUB_PAT_CURSOR}` to reference your token securely
- No modifications needed - just set up your token using one of the methods above

### 4. Final Steps
1. Restart Cursor
2. Enable GitHub MCP server in Cursor settings
