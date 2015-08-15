#### Installing
```bash
# Clone the git repo
git clone git@github.com:nverba/core.git

# Install the packages
npm install

# Generate the development build
gulp build --all

# Generate the production build
gulp build --production 

# Start the server, set environment variable to development to serve build folder
development=true node server.js
```

#### Gulp tasks

```bash
# Compiles css from scss
gulp build:css
		
# Builds index html with correct links to assets & injects immediate css for responsive loading
gulp build:index
		
# Builds external JavaScript libs
gulp build:libs
		
# Builds all internal client JavaScript, auto-detects further canges and builds with Watchify
gulp build:main
		
# Creates template cache
gulp build:templates
		
# Moves static assets such as images and json lang files to build or public folders
gulp build:static

# Watch css, index & templates for changes and build automatically. NOTE: Needs restart after adding new files
gulp watch:html
    
# Create fully compressed public build with hash signed urls
gulp build:all --production
```

__TODO:__ 
Before production, change back port num & remove switch default for the process.env.development variable.
