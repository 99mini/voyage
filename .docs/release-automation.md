# Release Automation

This document describes the automated release process for the Voyage monorepo.

## Overview

The release automation workflow automatically creates GitHub releases and tags when package versions are updated in `package.json` files.

## How It Works

1. **Trigger**: The workflow runs on every push to:
   - `main` branch
   - Release branches (`*/release/**`)
   - Dev release branches (`*/dev-release`)

2. **Detection**: The workflow detects changes in `package.json` files within:
   - `apps/frontend/*`
   - `apps/server/*`
   - `apps/cli/*`
   - `packages/*`

3. **Tag Creation**: When a version change is detected, a tag is created with the format:
   - Apps: `@apps/<category>/<app-name>@x.y.z`
   - Packages: `@packages/<package-name>@x.y.z`

4. **Release Notes**: Automatically generates release notes containing:
   - Commit history since the last release
   - Package information (name, version, path)
   - Release date

## Tag Format Examples

### Frontend Apps
- `@apps/frontend/tool@0.3.1`
- `@apps/frontend/admin@0.1.1`
- `@apps/frontend/awesome@0.2.2`
- `@apps/frontend/about@1.0.1`
- `@apps/frontend/tech@0.4.1`

### Server Apps
- `@apps/server/rest@1.4.3`
- `@apps/server/functions@1.1.1`

### Packages
- `@packages/vds@0.1.3`
- `@packages/api-client@0.1.1`
- `@packages/pb-api@0.1.1`

## Creating a Release

To create a new release:

1. **Update the version** in the appropriate `package.json`:
   ```bash
   # For example, updating the tool app
   cd apps/frontend/tool
   npm version patch  # or minor, major
   ```

2. **Commit the change**:
   ```bash
   git add package.json
   git commit -m "chore: bump tool version to 0.3.1"
   ```

3. **Push to a release branch or main**:
   ```bash
   git push origin main
   # or
   git push origin tool/release/0.3.1
   ```

4. **Automated steps** (handled by GitHub Actions):
   - Workflow detects the version change
   - Creates a tag (e.g., `@apps/frontend/tool@0.3.1`)
   - Generates release notes
   - Creates a GitHub release

## Release Notes Content

Release notes include:

- **Title**: `Release <package-name>@<version>`
- **Changes**: List of commits since the last release
- **Package Information**:
  - Package name
  - Version
  - Path in repository
  - Release date (UTC)

## Workflow File

The workflow is defined in `.github/workflows/release-automation.yml`.

## Requirements

- The workflow requires push access to create tags
- Uses the default `GITHUB_TOKEN` for authentication
- Requires `gh` CLI (pre-installed on GitHub Actions runners)

## Troubleshooting

### No release created
- Verify that the version in `package.json` actually changed
- Check that the push was to a monitored branch (main or release branches)
- Review workflow logs in the Actions tab

### Tag already exists
- The workflow will skip creating a tag if it already exists
- Delete the existing tag if you need to recreate it:
  ```bash
  git tag -d @apps/frontend/tool@0.3.1
  git push origin :refs/tags/@apps/frontend/tool@0.3.1
  ```

### Release notes are empty
- This may occur for new packages with no previous tags
- The workflow will show recent commits instead

## Best Practices

1. **Follow semantic versioning** (major.minor.patch)
2. **Update versions in release branches** before merging to main
3. **Write meaningful commit messages** - they appear in release notes
4. **Test changes** before bumping versions
5. **Keep package.json version in sync** with actual released features

## Manual Release Creation

If you need to create a release manually:

```bash
# Create tag
git tag -a @apps/frontend/tool@0.3.1 -m "Release tool@0.3.1"
git push origin @apps/frontend/tool@0.3.1

# Create release using gh CLI
gh release create @apps/frontend/tool@0.3.1 \
  --title "Release tool@0.3.1" \
  --notes "Release notes here"
```

## Related Documentation

- [Contributing Guide](../README.MD#contributing)
- [Git Flow](../README.MD#git-flow)
