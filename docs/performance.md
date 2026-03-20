# Performance Guidelines

- Use React Compiler (babel-plugin-react-compiler)
- Code split with manualChunks in Vite config
- Lazy load routes with React Router
- Optimize deps: react, react-dom, zustand
- Drop console/debugger in production builds

## Landing priorities

- Optimize the above-the-fold path before secondary sections.
- Treat hero rendering, primary CTA readiness and LCP as conversion-critical.
- Avoid loading dev-only tooling or debug helpers in production bundles.
- Prefer real, optimized assets over heavy illustrative mocks in the hero.
- Keep icon, animation and font usage proportional to persuasion value.

## Checklist for marketing pages

- [ ] Largest hero asset is compressed and sized for desktop/mobile.
- [ ] Primary CTA is interactive as soon as the hero is visible.
- [ ] Non-critical sections can defer work below the fold.
- [ ] Fonts do not cause excessive layout shift or slow first render.
- [ ] Animations do not delay content visibility or input readiness.
- [ ] Any experiment added to the landing preserves performance baselines.
