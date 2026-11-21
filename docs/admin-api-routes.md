# BEET Admin API

The admin API must never return secret keys or token values.

## Routes

- GET /api/admin/providers
- POST /api/admin/providers
- PATCH /api/admin/providers/:id
- DELETE /api/admin/providers/:id
- POST /api/admin/providers/:id/test
- POST /api/admin/providers/:id/rotate

## Required Admin Roles

- super_admin
- api_admin

## Server-side Rules

- Authenticate every route.
- Verify the admin role server-side.
- Re-authenticate sensitive API credential updates.
- Encrypt credentials before database storage.
- Mask credentials in list and detail responses.
- Log provider ID, admin ID, action and timestamp.
- Never log raw secrets, request headers or OAuth callbacks containing tokens.
