# Contributing to Vue 3 Senior Engineering Skill

Thanks for your interest in improving this Claude skill! Here's how you can contribute.

## How to Contribute

### 1. Report Issues or Suggest Improvements

Found something that doesn't work? Have an idea for improvement?

- **Check existing issues** first to avoid duplicates
- **Open a new issue** describing:
  - What the problem/suggestion is
  - Example prompts that trigger the issue
  - Current behavior vs. expected behavior
  - Any workarounds you've found

### 2. Add Examples or Patterns

Help other developers by adding:

- **New code examples** to `references/examples/`
- **Patterns or best practices** to `SKILL.md`
- **Architecture decision records (ADRs)** documenting decisions made
- **Integration examples** with other libraries (VueUse, headless UI, etc.)

Steps:
1. Fork the repo
2. Create a feature branch: `git checkout -b feature/add-composable-examples`
3. Add your examples to `references/examples/` or update relevant sections
4. Test by using the skill in Claude and verify it works as expected
5. Submit a PR with a clear description

### 3. Improve Documentation

Documentation is always welcome:

- **Clarify confusing sections** in SKILL.md
- **Add missing patterns** or use cases
- **Improve README** with better examples
- **Fix typos or grammar**

### 4. Suggest New Features

Ideas for new patterns or capabilities?

1. Open an issue with the title `[Feature Request] Your idea`
2. Describe what you'd like the skill to do
3. Explain the use case and why it matters
4. Provide example prompts that should trigger the new feature

## Development Workflow

### Before You Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/vue3-senior-engineering-skill.git
   cd vue3-senior-engineering-skill
   ```

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/description
   ```

2. **Make your changes**:
   - Edit SKILL.md for pattern/guidance changes
   - Add code examples to `references/examples/`
   - Update README if relevant
   - Keep changes focused and atomic

3. **Test with Claude**:
   - Copy your modified skill to Claude's skills directory
   - Test with several example prompts
   - Verify the skill behaves correctly and generates good code
   - Check that triggering still works as expected

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add composable validation pattern example"
   ```
   
   Use conventional commits:
   - `feat:` new feature or pattern
   - `fix:` bug fix or correction
   - `docs:` documentation only
   - `refactor:` restructuring without new features
   - `improve:` improvements to existing content

5. **Push to your fork**:
   ```bash
   git push origin feature/description
   ```

6. **Create a Pull Request**:
   - Go to GitHub and create a PR from your branch
   - Title: Clear, concise description
   - Description: 
     - What changes were made and why
     - Which use cases or issues this addresses
     - Testing notes (prompts tested, results)
     - Any breaking changes or dependencies

## PR Review Process

When you submit a PR:

1. **Automated checks** run (linting, structure validation)
2. **Manual review** happens — maintainers check:
   - Does the change fit the skill's vision?
   - Is it well-documented?
   - Does it improve the skill without adding unnecessary complexity?
   - Is the code/content clear and maintainable?

3. **Feedback** — We may ask questions or request changes
4. **Approval** — Once approved, your PR gets merged!

## Areas We Need Help With

- **More composable patterns** — Form handling, animations, data transformation
- **Advanced performance examples** — Code splitting, lazy loading, optimization
- **Nuxt patterns** — SSR considerations, middleware, server routes
- **Testing guides** — More complex testing scenarios and patterns
- **Integration examples** — VueUse, headless UI libraries, animations
- **Real-world examples** — Complete feature implementations
- **Architecture patterns** — Monorepo setup, micro-frontends, scaling

## Code Style & Conventions

- **Follow TypeScript strict mode** — No implicit `any`
- **Use clear, descriptive names** — Avoid abbreviations
- **Comment complex logic** — Explain the "why," not the "what"
- **Keep examples focused** — One pattern per example
- **Use proper Markdown** — Clear headings, code fences with language tags

## Questions?

- **Join discussions** on this repo's discussions tab
- **Ask in PRs** — maintainers respond to questions during review
- **Check existing docs** — SKILL.md covers most patterns

## Code of Conduct

- Be respectful and constructive
- Welcome diverse perspectives
- Focus on the idea, not the person
- Help others learn and grow

---

Thank you for contributing! Every improvement makes this skill better for the whole community. 🙌
