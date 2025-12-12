# Changelog

## [1.6.0](https://github.com/odest/tauri-nextjs-template/compare/v1.5.0...v1.6.0) (2025-12-12)


### Features

* add contributing and funding docs, improve README, and enhance UI with skeletons and sidebar variant selector ([0a34782](https://github.com/odest/tauri-nextjs-template/commit/0a34782cbca29d2f858d8f85f293e3370c57f3ec))
* add init scripts, svg assets, improve README ([21d6de5](https://github.com/odest/tauri-nextjs-template/commit/21d6de5834dda0bcf7f90f80dc1984b1b5c234dc))
* add skeleton loading placeholders for mode-card and themes-list ([eaf937c](https://github.com/odest/tauri-nextjs-template/commit/eaf937ccbe750f155dcc2c8209ba9cee4f9b028b))
* **i18n:** add internationalization support for web and native apps ([2e9da4f](https://github.com/odest/tauri-nextjs-template/commit/2e9da4f3fe853a818426de083d816a67f9e9d0ea))
* **i18n:** add support for 10 languages ([7f0a219](https://github.com/odest/tauri-nextjs-template/commit/7f0a219d85d78dca056b65dcf31fe776c708cfef))
* **i18n:** add translation texts for pages and components ([27017ba](https://github.com/odest/tauri-nextjs-template/commit/27017bac3976ace273635faf72f10a465cd12fc0))
* improve sidebar and theme handling ([44016ab](https://github.com/odest/tauri-nextjs-template/commit/44016ab602045cc41a5a61ecfa744ab265c45fbb))
* **language:** Add language card and switcher hook ([05f7a23](https://github.com/odest/tauri-nextjs-template/commit/05f7a23959d259d9c359c70fab40ac801240660e))
* **select:** Add search and sort to ThemesList with new Select component ([cf54e6f](https://github.com/odest/tauri-nextjs-template/commit/cf54e6f8326081e21093b6726978d141fc3c9e21))
* **sidebar:** add sidebar variant selector UI and persistent store ([f6b7bb3](https://github.com/odest/tauri-nextjs-template/commit/f6b7bb31d34ae847fe4cf933c688fd79865ef01e))
* **sidebar:** close mobile sidebar on link click ([19cd438](https://github.com/odest/tauri-nextjs-template/commit/19cd43888df4324b3f88d3dd1f62fd3d9461aaf6))
* **theme:** add view transition on theme change and system mode support ([d942b57](https://github.com/odest/tauri-nextjs-template/commit/d942b57313c93aa2db442f589af92c82497e146b))
* **ui:** add language toggle and locale config ([60d1e56](https://github.com/odest/tauri-nextjs-template/commit/60d1e56b4375a872340093e1644cb8689acedc61))
* **ui:** improve mode toggle with view transitions ([fabc024](https://github.com/odest/tauri-nextjs-template/commit/fabc0243a5ead607a157b350dabffcb196c8dc0b))


### Bug Fixes

* appearance settings are not responsive on mobile view (close [#8](https://github.com/odest/tauri-nextjs-template/issues/8)) ([1fe1b69](https://github.com/odest/tauri-nextjs-template/commit/1fe1b698eeec5794316d83ab8a698874ddd88b23))
* **common/greet:** add error handling and clear input after greet ([e954c0f](https://github.com/odest/tauri-nextjs-template/commit/e954c0fff9441c0913e47f6bd93ea6c8eed6675d))


### Code Refactoring

* Refactor theme card to reusable themes list component ([4018b8b](https://github.com/odest/tauri-nextjs-template/commit/4018b8b5c8c2cd2cb8d1ca4702f1cbd92ddebc55))
* **theme-store:** move sortOption to store and update ThemesList ([dab3012](https://github.com/odest/tauri-nextjs-template/commit/dab301269bb8ab0fe60e224bd57c5cbb62a3c2e8))
* **ui:** extract theme init script to shared module ([0e51547](https://github.com/odest/tauri-nextjs-template/commit/0e515474305715b54bb05ccde1111499cfcf8eb5))
* **ui:** replace mounting with useMounted hook skeleton component ([c5366b6](https://github.com/odest/tauri-nextjs-template/commit/c5366b6d1600a71025a17eeef5cd179d99dea5d6))
* **ui:** replace mounting with useMounted hook skeleton component ([cd9faa3](https://github.com/odest/tauri-nextjs-template/commit/cd9faa318c847dafbd018804db456210e2cf275e))
* update LinkComponent types and use LucideIcon for nav icons ([7ed51cd](https://github.com/odest/tauri-nextjs-template/commit/7ed51cdb4f8e32150b931f4f1c33e19018be3a41))
* use sidebar state for grid layout in mode and variant cards ([e7e84af](https://github.com/odest/tauri-nextjs-template/commit/e7e84af7268a997f6bafe670a588c8903e2e41ec))
* **utils:** Extract storage retrieval to utility and use it in stores ([af79486](https://github.com/odest/tauri-nextjs-template/commit/af794864c2b67f2f245818ddaf8b85577c768d50))

## [1.5.0](https://github.com/odest/tauri-nextjs-template/compare/v1.4.0...v1.5.0) (2025-09-02)


### Features

* improve sidebar and theme handling ([44016ab](https://github.com/odest/tauri-nextjs-template/commit/44016ab602045cc41a5a61ecfa744ab265c45fbb))
* **select:** Add search and sort to ThemesList with new Select component ([cf54e6f](https://github.com/odest/tauri-nextjs-template/commit/cf54e6f8326081e21093b6726978d141fc3c9e21))
* **sidebar:** close mobile sidebar on link click ([19cd438](https://github.com/odest/tauri-nextjs-template/commit/19cd43888df4324b3f88d3dd1f62fd3d9461aaf6))
* **theme:** add view transition on theme change and system mode support ([d942b57](https://github.com/odest/tauri-nextjs-template/commit/d942b57313c93aa2db442f589af92c82497e146b))
* **ui:** improve mode toggle with view transitions ([fabc024](https://github.com/odest/tauri-nextjs-template/commit/fabc0243a5ead607a157b350dabffcb196c8dc0b))


### Code Refactoring

* Refactor theme card to reusable themes list component ([4018b8b](https://github.com/odest/tauri-nextjs-template/commit/4018b8b5c8c2cd2cb8d1ca4702f1cbd92ddebc55))
* **theme-store:** move sortOption to store and update ThemesList ([dab3012](https://github.com/odest/tauri-nextjs-template/commit/dab301269bb8ab0fe60e224bd57c5cbb62a3c2e8))

## [1.4.0](https://github.com/odest/tauri-nextjs-template/compare/v1.3.0...v1.4.0) (2025-09-02)


### Features

* improve sidebar and theme handling ([44016ab](https://github.com/odest/tauri-nextjs-template/commit/44016ab602045cc41a5a61ecfa744ab265c45fbb))
* **select:** Add search and sort to ThemesList with new Select component ([cf54e6f](https://github.com/odest/tauri-nextjs-template/commit/cf54e6f8326081e21093b6726978d141fc3c9e21))
* **sidebar:** close mobile sidebar on link click ([19cd438](https://github.com/odest/tauri-nextjs-template/commit/19cd43888df4324b3f88d3dd1f62fd3d9461aaf6))
* **theme:** add view transition on theme change and system mode support ([d942b57](https://github.com/odest/tauri-nextjs-template/commit/d942b57313c93aa2db442f589af92c82497e146b))
* **ui:** improve mode toggle with view transitions ([fabc024](https://github.com/odest/tauri-nextjs-template/commit/fabc0243a5ead607a157b350dabffcb196c8dc0b))


### Code Refactoring

* Refactor theme card to reusable themes list component ([4018b8b](https://github.com/odest/tauri-nextjs-template/commit/4018b8b5c8c2cd2cb8d1ca4702f1cbd92ddebc55))
* **theme-store:** move sortOption to store and update ThemesList ([dab3012](https://github.com/odest/tauri-nextjs-template/commit/dab301269bb8ab0fe60e224bd57c5cbb62a3c2e8))

## [1.3.0](https://github.com/odest/tauri-nextjs-template/compare/v1.2.0...v1.3.0) (2025-09-02)


### Features

* improve sidebar and theme handling ([44016ab](https://github.com/odest/tauri-nextjs-template/commit/44016ab602045cc41a5a61ecfa744ab265c45fbb))
* **select:** Add search and sort to ThemesList with new Select component ([cf54e6f](https://github.com/odest/tauri-nextjs-template/commit/cf54e6f8326081e21093b6726978d141fc3c9e21))
* **sidebar:** close mobile sidebar on link click ([19cd438](https://github.com/odest/tauri-nextjs-template/commit/19cd43888df4324b3f88d3dd1f62fd3d9461aaf6))
* **theme:** add view transition on theme change and system mode support ([d942b57](https://github.com/odest/tauri-nextjs-template/commit/d942b57313c93aa2db442f589af92c82497e146b))
* **ui:** improve mode toggle with view transitions ([fabc024](https://github.com/odest/tauri-nextjs-template/commit/fabc0243a5ead607a157b350dabffcb196c8dc0b))


### Code Refactoring

* Refactor theme card to reusable themes list component ([4018b8b](https://github.com/odest/tauri-nextjs-template/commit/4018b8b5c8c2cd2cb8d1ca4702f1cbd92ddebc55))
* **theme-store:** move sortOption to store and update ThemesList ([dab3012](https://github.com/odest/tauri-nextjs-template/commit/dab301269bb8ab0fe60e224bd57c5cbb62a3c2e8))
