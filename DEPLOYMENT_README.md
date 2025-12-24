# New Ventus - Deployment Guide

## ✅ What Was Done

Your site has been successfully updated with minimal changes:

### 1. **Updated to Nuxt 2.17.3** (from 2.14.7)
   - Last stable Nuxt 2 release
   - Compatible with Node 18

### 2. **Updated Critical Dependencies**
   - Fixed security vulnerabilities in `marked`, `lodash`, `jquery`
   - Replaced deprecated `babel-eslint` with `@babel/eslint-parser`
   - Updated ESLint and Prettier to compatible versions
   - Downgraded `css-loader` to v5 for webpack 4 compatibility
   - Downgraded `imagemin-svgo` to v9 for compatibility

### 3. **Removed Storyblok Integration**
   - Removed `storyblok-nuxt` dependency
   - Removed `@nuxtjs/dotenv` dependency
   - Commented out all Storyblok API calls in:
     - Pages (`index.vue`, `_slug.vue`, `projects/_slug.vue`)
     - Store (`store/index.js`)
     - Middleware (`middleware/setCacheVersion.js`)
   - Disabled auto-import of Storyblok components
   - All Storyblok components are preserved but commented out for future use

### 4. **Created Configuration Files**
   - **`.nvmrc`**: Specifies Node 18.19.0
   - **`netlify.toml`**: Netlify deployment configuration with:
     - Build command: `npm run generate`
     - Publish directory: `dist`
     - Node version: 18.19.0
     - Security headers
     - Caching rules
     - 404 fallback

### 5. **Commented Out Problematic Components**
   - `TheNavViewer` (requires Storyblok project data)
   - `TheAbout` (requires Storyblok about data)
   - Storyblok item components (ItemImage, ItemVideo, etc.)

---

## 🚀 How to Deploy to Netlify

### Option 1: Via Netlify UI (Recommended)

1. **Push your code to Git:**
   ```bash
   git add .
   git commit -m "Updated site for Netlify deployment"
   git push
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your Git repository
   - Netlify will automatically detect the `netlify.toml` configuration

3. **Deploy:**
   - Click "Deploy site"
   - Your site will be live in minutes!

### Option 2: Via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

---

## 🎨 Adding Your Content

Since Storyblok has been removed, you'll need to add content manually:

### 1. **Edit the Home Page**
   - File: `pages/index.vue`
   - Replace the placeholder content in the template

### 2. **Edit Other Pages**
   - File: `pages/_slug.vue` for dynamic pages
   - File: `pages/projects/_slug.vue` for project pages

### 3. **Re-enable Components (Optional)**
   - If you want to re-enable Storyblok components:
     - Uncomment code in `plugins/components.js`
     - Uncomment components in `layouts/default.vue`
     - Reinstall Storyblok: `npm install storyblok-nuxt --legacy-peer-deps`
     - Uncomment Storyblok configuration in `nuxt.config.js`

---

## 🛠️ Local Development

### Start Development Server:
```bash
# Use Node 18
nvm use 18

# Install dependencies (if needed)
npm install --legacy-peer-deps

# Run dev server
npm run dev
```

Visit: `http://localhost:3000`

### Build for Production:
```bash
npm run generate
```

Output will be in the `dist/` folder.

---

## 📁 Project Structure

```
new-ventus/
├── dist/               # Generated static site (ready for deployment)
├── pages/              # Your pages (add content here)
│   ├── index.vue       # Home page
│   ├── _slug.vue       # Dynamic pages
│   └── projects/
│       └── _slug.vue   # Project pages
├── components/         # Vue components (Storyblok ones are commented out)
├── layouts/           # Layout files
│   └── default.vue    # Main layout
├── assets/            # Images, styles, fonts
├── static/            # Static files (favicon, etc.)
├── nuxt.config.js     # Nuxt configuration
├── netlify.toml       # Netlify deployment config
├── .nvmrc             # Node version specification
└── package.json       # Dependencies

```

---

## ⚠️ Important Notes

1. **Node Version**: Always use Node 18 (specified in `.nvmrc`)
   ```bash
   nvm use
   ```

2. **Install Flag**: Always use `--legacy-peer-deps` when installing packages
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Storyblok Components**: All Storyblok code is preserved but commented out. You can re-enable it anytime by uncommenting the code.

4. **Security Vulnerabilities**: There are 79 vulnerabilities in dependencies. These are mostly from older packages that are no longer maintained but are required by Nuxt 2. For production use, consider:
   - Running `npm audit fix` (be careful, may break things)
   - Or migrating to Nuxt 3 in the future

---

## 🔧 Troubleshooting

### Build Errors?
```bash
# Clear cache and rebuild
rm -rf .nuxt node_modules/.cache
npm run generate
```

### CSS Not Loading?
- Make sure `css-loader` is version 5.x (not 6.x)

### Images Not Optimizing?
- Make sure `imagemin-svgo` is version 9.x (not 10.x)

---

## 📞 Next Steps

1. ✅ Add your content to the pages
2. ✅ Test locally with `npm run dev`
3. ✅ Push to Git
4. ✅ Deploy to Netlify
5. ✅ Set up custom domain (optional)

---

## 🎉 Your Site is Ready!

The static site has been generated in the `dist/` folder and is ready to deploy to Netlify!

- **Build Command**: `npm run generate`
- **Publish Directory**: `dist`
- **Node Version**: 18.19.0

Happy deploying! 🚀

