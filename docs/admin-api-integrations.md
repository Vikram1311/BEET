# BEET Admin Panel — API Configuration

The Super Admin panel should manage all external integrations without exposing secret values in public code.

## Planned API Providers

- AI text and chat
- Realistic avatar and lip-sync video
- Image generation and editing
- Speech-to-text and text-to-speech
- Google Maps / geocoding
- SMS and WhatsApp notifications
- Email and OTP
- Cloud storage and CDN
- Facebook, Instagram, LinkedIn, Telegram and other authorized sources
- Payment and subscription gateways
- Jobs feeds and third-party job APIs
- Analytics and moderation

## Admin API Form Fields

Each provider should contain:

- Provider name
- Enabled / disabled status
- Environment: Development, Staging or Production
- API key
- API secret
- Access token
- OAuth client ID
- OAuth client secret
- Base URL
- Webhook URL
- Monthly budget limit
- Usage alert limit
- Permissions / scopes
- Notes

## Security Requirements

- Encrypt secrets at rest.
- Never return secret values through public API responses.
- Store values in server-side environment variables or a secrets vault.
- Display only a masked value after saving.
- Use separate keys for development and production.
- Require Super Admin plus recent authentication for changes.
- Log every API configuration change without logging secret values.
- Provide Test Connection and usage monitoring actions.
- Allow rotating and revoking credentials.

## Suggested Workflow

1. Super Admin opens Settings → API Providers.
2. Selects a provider and adds the credentials.
3. Saves the configuration.
4. BEET tests the connection.
5. Admin enables the provider for the required services.
6. Usage limits and alerts are set.
