# Admin Logo Updates Across Support Pages

## Goal
Make the logo URL saved in the Admin panel appear consistently on every generated support page, not only the generic page.

## Changes
- Pass each page's saved `logoUrl` into the shared logo display.
- Replace hardcoded header marks or static logo images in custom layouts with the shared logo display.
- Keep each platform's current automatic or static logo as the fallback when no custom logo is entered.
- Preserve existing page styling, contact links, content, and colors.

## Validation
- Confirm the project typechecks and builds.
- Verify a custom logo appears on a custom support page and the fallback returns when it is cleared.

## Technical details
The existing `PlatformAvatar` already prioritizes a manual logo URL. Each custom layout will resolve its platform and render that component with `site.logoUrl`, using layout-specific sizing only.
