# Contributing to The Agency

Thank you for your interest in contributing! We appreciate your help in making this project better.

## How to Contribute

### Adding New Agents

1. Create a new markdown file in the `content/agents/` directory
2. Follow the agent template with proper frontmatter
3. Run validation: `pnpm run validate:agents`
4. Submit a pull request

### Bug Reports

- Use GitHub Issues to report bugs
- Include clear descriptions and reproduction steps
- Add screenshots/videos if applicable

### Feature Requests

- Open a GitHub Issue with your suggestion
- Explain the use case and benefits
- Be open to discussion and feedback

## Development Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/agency-platform
cd agency-platform

# Install dependencies
pnpm install

# Start dev server
pnpm run dev
```

## Code Style

- Follow the existing code conventions
- Use TypeScript for type safety
- Run linting: `pnpm run lint`

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes with clear messages
4. Push to your branch
5. Open a Pull Request with a clear description

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Attribution

This contributing guide is part of The Agency project, which builds upon [agency-agents](https://github.com/msitarzewski/agency-agents) by Mateusz Sitarzewski.
