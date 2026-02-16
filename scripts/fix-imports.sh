#!/bin/bash

set -e

echo "🔧 Fixing imports to use @ alias..."

TARGET_DIR="src"

# components
find $TARGET_DIR -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e "s#['\"]\\(\\.\\./\\)+components/#'@/components/#g" \
  -e "s#['\"]\\(\\.\\./\\)+pages/#'@/pages/#g" \
  -e "s#['\"]\\(\\.\\./\\)+context/#'@/context/#g" \
  -e "s#['\"]\\(\\.\\./\\)+services/#'@/services/#g" \
  -e "s#['\"]\\(\\.\\./\\)+hooks/#'@/hooks/#g" \
  -e "s#['\"]\\(\\.\\./\\)+utils/#'@/utils/#g" \
  {} +

echo "✅ Import paths normalized to @/"
