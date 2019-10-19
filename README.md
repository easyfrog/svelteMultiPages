## SvelteMultiPages Template

The template-project for svelte to create multiple pages in one svelte project.

## install

**use git** to get the template-project

```bash

# in your project folder
# open terminal

git clone https://github.com/easyfrog/svelteMultiPages.git your-project-name

cd your-project-name

npm i

```


## create page

```bash 
# create a svelte page
# 1. create pageName.js & PageName.svelte to src/pages
# 2. create pageName.html to public/
npm run cp -- -n pageName -t title
```

## remove page

```bash 
# remove a svelte page
# 1. remove pageName.js & PageName.svelte from src/pages
# 2. remove pageName.html from public/
npm run rp -- -n pageName
```

## dev & build

```bash 
# dev & build is same as default svelte script
npm run dev

# this command will build all the pages
npm run build
```

## build one file

```bash 
# build one file, NO EXTENSION
npm run files fs:filename
```

## build multiple files

```bash 
# build multiple files, split by '/'
npm run files fs:filename1/filename2/filename3

```


