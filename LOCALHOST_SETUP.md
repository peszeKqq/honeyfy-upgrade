# Localhost Setup Guide for Multilingual Honeyfy

This guide explains how to run the multilingual Honeyfy website on localhost for development.

## 🚀 Quick Start

### 1. Start the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 2. Access Your Localized Pages

Once the server is running, you can access the different language versions:

- **English (default)**: http://localhost:3000/
- **Dutch**: http://localhost:3000/nl/
- **Polish**: http://localhost:3000/pl/


## 🌐 How It Works

### Automatic Language Detection
The middleware automatically detects the user's browser language and redirects them to the appropriate localized version:

- Users with Dutch browser → http://localhost:3000/nl/
- Users with Polish browser → http://localhost:3000/pl/

- Users with English/other browsers → http://localhost:3000/

### Manual Language Switching
Users can manually switch languages using the language switcher in the header (🇺🇸 🇳🇱 🇵🇱).

## 🔧 Configuration

### Environment-Based URLs
The system automatically uses the correct URLs based on the environment:

- **Development**: `http://localhost:3000`
- **Production**: `https://honeyfy.nl`

### Configuration File
All URLs are managed in `src/lib/config.ts`:

```typescript
export const config = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://honeyfy.nl' 
    : 'http://localhost:3000',
  // ... other config
};
```

## 📁 File Structure

```
src/
├── app/
│   ├── page.tsx              # English homepage
│   ├── nl/
│   │   └── page.tsx         # Dutch homepage
│   ├── pl/
│   │   └── page.tsx         # Polish homepage


├── lib/
│   ├── config.ts            # Environment configuration
│   ├── hreflang.ts          # Hreflang utilities
│   └── translations.ts      # Translation system
├── components/
│   ├── LanguageSwitcher.tsx # Language switcher UI
│   └── HreflangTagsServer.tsx # Hreflang tags
└── middleware.ts            # Language detection
```

## 🧪 Testing

### Test Language Detection
1. Change your browser language settings
2. Visit http://localhost:3000/
3. You should be automatically redirected to the appropriate language

### Test Language Switcher
1. Visit any page
2. Click the language switcher in the header
3. Verify you're redirected to the correct localized URL

### Test Hreflang Tags
1. View page source on any page
2. Look for hreflang tags in the `<head>` section
3. Verify all language versions are properly linked

## 🔍 Development Features

### Hot Reload
- Changes to translation files will hot reload
- Changes to localized pages will hot reload
- Middleware changes require server restart

### Validation
- Hreflang validation runs in development mode
- Check browser console for any validation errors
- All URLs are validated for proper structure

### SEO Testing
- All pages include proper meta tags
- Canonical URLs are set correctly
- Open Graph tags are localized

## 🚨 Common Issues

### Port Already in Use
If port 3000 is busy, you can change it:
```bash
npm run dev -- -p 3001
```

### Middleware Not Working
- Ensure `src/middleware.ts` exists
- Check that the matcher configuration is correct
- Restart the development server

### Hreflang Errors
- Check browser console for validation errors
- Verify all localized pages exist
- Ensure URLs are properly formatted

## 📊 Monitoring

### Development Console
- Hreflang validation errors appear in console
- Language detection logs (if enabled)
- Translation missing warnings

### Network Tab
- Check that redirects work properly
- Verify hreflang tags are loaded
- Monitor for any 404 errors

## 🚀 Production Deployment

When deploying to production:

1. **Environment Variables**: Set `NODE_ENV=production`
2. **URLs**: Will automatically switch to production URLs
3. **Hreflang**: Will use production domain
4. **Sitemap**: Will include production URLs

## 📝 Next Steps

1. **Add More Pages**: Create localized versions of other pages (products, about, contact, etc.)
2. **Add More Translations**: Expand the translation system
3. **Add Language-Specific Content**: Customize content for each market
4. **Add Analytics**: Track language preferences and usage

## 🆘 Troubleshooting

### Language Not Detecting
- Check browser language settings
- Verify middleware is running
- Check Accept-Language header

### Broken Links
- Ensure all localized pages exist
- Check URL structure in hreflang config
- Verify middleware redirects

### Translation Issues
- Check translation keys exist
- Verify locale codes match
- Check for typos in translation files

The multilingual setup is now ready for localhost development! 🎉
