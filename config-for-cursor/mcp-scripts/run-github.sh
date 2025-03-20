#!/bin/bash

if [ -f .env ]; then
    source .env
fi

# Check if GITHUB_MCP_FINE_GRAINED_TOKEN is set
if [ -z "$GITHUB_MCP_FINE_GRAINED_TOKEN" ]; then
    echo "Error: GITHUB_MCP_FINE_GRAINED_TOKEN environment variable is not set"
    echo "Please set it with: export GITHUB_MCP_FINE_GRAINED_TOKEN=your_token"
    exit 1
fi

npx -y @smithery/cli@latest run @smithery-ai/github --config "{\"githubPersonalAccessToken\":\"$GITHUB_MCP_FINE_GRAINED_TOKEN\"}"
