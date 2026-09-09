# Test the built public site with Playwright

End-to-end tests will use Playwright to exercise the site from a user's perspective after Astro has generated the static `dist/` output, with Astro Preview serving that output locally. The initial acceptance journey will navigate from Home to the Blog and then to a post, testing the built artifact rather than coupling browser tests to Astro's development server.
