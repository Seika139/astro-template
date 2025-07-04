#!/bin/bash
# ホストのgit設定をdevcontainer内に反映

# VS Code Remote-Containersは、ホストの~/.gitconfigを /workspaces/.gitconfig などにマウントすることがある
if [ -f /workspaces/.gitconfig ]; then
  USERNAME=$(grep 'name = ' /workspaces/.gitconfig | head -n1 | sed 's/.*= //')
  EMAIL=$(grep 'email = ' /workspaces/.gitconfig | head -n1 | sed 's/.*= //')
fi

if [ -z "$USERNAME" ] || [ -z "$EMAIL" ]; then
  USERNAME=$(git config --global user.name)
  EMAIL=$(git config --global user.email)
fi

if [ -z "$USERNAME" ] || [ -z "$EMAIL" ]; then
  USERNAME=$(git config --local user.name)
  EMAIL=$(git config --local user.email)
fi

if [ -n "$USERNAME" ] && [ -n "$EMAIL" ]; then
  git config --global user.name "$USERNAME"
  git config --global user.email "$EMAIL"
  echo "Git user.name/email を devcontainer に設定しました: $USERNAME <$EMAIL>"
else
  echo "ホストのgit設定が見つかりませんでした。手動で設定してください。"
fi 
