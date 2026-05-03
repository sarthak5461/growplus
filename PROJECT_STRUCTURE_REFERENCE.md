# Repository Structure Reference

This repo can follow a clean **website + WordPress theme** layout similar to modern trust/NGO site repos.

## Suggested high-level structure

```text
.
├── README.md
├── PROJECT_STRUCTURE_REFERENCE.md
├── public/                         # Static preview pages (optional)
│   ├── index.html
│   ├── about.html
│   └── ...
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── main.js
│       └── layout.js
└── wp-content/
    └── themes/
        └── growplus-custom/
            ├── style.css
            ├── functions.php
            ├── front-page.php
            ├── header.php
            ├── footer.php
            ├── index.php
            ├── page.php
            ├── assets/
            │   ├── css/
            │   │   └── style.css
            │   └── js/
            │       ├── main.js
            │       └── layout.js
            └── template-parts/
                ├── hero.php
                ├── about.php
                ├── services.php
                └── ...
```

## Mapping to current repository

- Root static pages already exist and can be treated as `public/` content.
- Root `css/` and `js/` already match the `assets/` concept.
- WordPress theme already follows modular structure with `template-parts/`.

## Recommended next cleanup (optional)

1. Move root HTML files into a dedicated `public/` directory.
2. Move root `css/` + `js/` into `assets/`.
3. Keep WordPress theme as source of truth for production templates.
4. Update internal links after move.
