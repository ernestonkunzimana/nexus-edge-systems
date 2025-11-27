# Contributing

Thanks for contributing! Please follow these steps:

1. Fork the repo and create a branch for your change.
2. Run the test suite locally (`.\scripts\run-all-tests.ps1 -StartDb`).
3. Add tests for new features or bug fixes.
4. Open a pull request and fill the template.

See `README_QUICKSTART.md` for quick local setup.
# Contributing

Branching strategy
- Protect `main` for releases; use `develop` for integration and `feat/*` for features.

PRs
- Open PRs against `develop` for feature work. Require at least one review and passing CI before merge.

Commit messages
- Use Conventional Commits (feat/, fix/, chore/, docs/).

Code of conduct and other policies should be added as needed.
