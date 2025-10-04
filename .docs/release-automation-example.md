# Release Automation Example

This guide shows practical examples of creating releases using the automated workflow.

## Example 1: Releasing a Frontend App (Tool)

Let's say you've added new features to the `tool` app and want to release version `0.3.1`:

```bash
# 1. Navigate to the tool app directory
cd apps/frontend/tool

# 2. Check the current version
cat package.json | grep version
# Output: "version": "0.3.0"

# 3. Update the version
npm version patch
# This updates package.json to "version": "0.3.1"

# 4. Commit the change
git add package.json
git commit -m "chore(tool): bump version to 0.3.1"

# 5. Push to main or a release branch
git push origin main
# or
git push origin tool/release/0.3.1
```

**What happens automatically:**
1. GitHub Actions detects the version change
2. Creates tag: `@apps/frontend/tool@0.3.1`
3. Generates release notes with commit history
4. Creates GitHub release at: https://github.com/99mini/voyage/releases/tag/@apps/frontend/tool@0.3.1

## Example 2: Releasing a Package (VDS)

```bash
# 1. Navigate to the package directory
cd packages/vds

# 2. Update version for a minor release
npm version minor
# Changes version from "0.1.2" to "0.2.0"

# 3. Commit
git add package.json
git commit -m "chore(vds): release v0.2.0 with new components"

# 4. Push
git push origin main
```

**Result:**
- Tag created: `@packages/vds@0.2.0`
- Release notes include all commits to the vds package
- GitHub release created automatically

## Example 3: Releasing a Server App (REST API)

```bash
# 1. Navigate to server rest directory
cd apps/server/rest

# 2. Make a major version bump (breaking changes)
npm version major
# Changes from "1.4.2" to "2.0.0"

# 3. Commit with detailed message
git add package.json
git commit -m "chore(server-rest): release v2.0.0 with breaking API changes

BREAKING CHANGE: Updated authentication endpoints"

# 4. Push
git push origin main
```

**Result:**
- Tag: `@apps/server/rest@2.0.0`
- Release notes will include the breaking change message
- Automatically creates GitHub release

## Example 4: Multiple Package Releases in One Commit

```bash
# Update multiple packages that depend on each other
cd packages/vds
npm version patch

cd ../../apps/frontend/tool
npm version patch

# Commit all changes together
git add .
git commit -m "chore: release vds@0.1.3 and tool@0.3.1"

git push origin main
```

**Result:**
- Two tags created: `@packages/vds@0.1.3` and `@apps/frontend/tool@0.3.1`
- Two separate releases created
- Each with their own release notes

## Checking Release Status

```bash
# View all tags
git tag -l "@apps/*" "@packages/*"

# View recent releases
gh release list

# View a specific release
gh release view @apps/frontend/tool@0.3.1
```

## Release Branch Workflow

For production releases, you might want to use release branches:

```bash
# 1. Create a release branch
git checkout -b tool/release/0.3.1

# 2. Update version
cd apps/frontend/tool
npm version 0.3.1

# 3. Commit
git add package.json
git commit -m "chore(tool): prepare release 0.3.1"

# 4. Push the release branch
git push origin tool/release/0.3.1
# The workflow triggers and creates the release

# 5. Merge to main after verification
git checkout main
git merge tool/release/0.3.1
git push origin main
```

## Common Commands

```bash
# Check current version
jq -r '.version' package.json

# List all app/package versions
find apps packages -name "package.json" -exec sh -c 'echo "$1: $(jq -r .version "$1")"' _ {} \;

# Create a pre-release version
npm version prerelease --preid=beta
# e.g., 0.3.0 -> 0.3.1-beta.0

# View git history for a package
git log --oneline -- apps/frontend/tool
```

## Troubleshooting

### Release not created
1. Check if version actually changed: `git diff HEAD~1 -- package.json`
2. Verify you pushed to correct branch: `git branch -a`
3. Check workflow logs: Visit GitHub Actions tab

### Tag already exists
```bash
# Delete local tag
git tag -d @apps/frontend/tool@0.3.1

# Delete remote tag
git push origin :refs/tags/@apps/frontend/tool@0.3.1

# Push updated version
git push origin main
```

## Best Practices

1. **Always test before releasing**: Build and test your changes
2. **Follow semantic versioning**: 
   - Patch (0.0.x): Bug fixes
   - Minor (0.x.0): New features (backward compatible)
   - Major (x.0.0): Breaking changes
3. **Write clear commit messages**: They appear in release notes
4. **Use release branches** for production releases
5. **Verify the release** after it's created

## Related Documentation

- [Release Automation Guide](.docs/release-automation.md)
- [Contributing Guide](../README.MD#contributing)
- [Git Flow](../README.MD#git-flow)
