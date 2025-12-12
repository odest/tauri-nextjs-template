# Changelog

## [0.0.4](https://github.com/odest/tauri-nextjs-template/compare/v0.0.3...v0.0.4) (2025-12-12)


### Features

* add contributing and funding docs, improve README, and enhance UI with skeletons and sidebar variant selector ([0a34782](https://github.com/odest/tauri-nextjs-template/commit/0a34782cbca29d2f858d8f85f293e3370c57f3ec))
* add init scripts, svg assets, improve README ([21d6de5](https://github.com/odest/tauri-nextjs-template/commit/21d6de5834dda0bcf7f90f80dc1984b1b5c234dc))
* add skeleton loading placeholders for mode-card and themes-list ([eaf937c](https://github.com/odest/tauri-nextjs-template/commit/eaf937ccbe750f155dcc2c8209ba9cee4f9b028b))
* **i18n:** add internationalization support for web and native apps ([2e9da4f](https://github.com/odest/tauri-nextjs-template/commit/2e9da4f3fe853a818426de083d816a67f9e9d0ea))
* **i18n:** add support for 10 languages ([7f0a219](https://github.com/odest/tauri-nextjs-template/commit/7f0a219d85d78dca056b65dcf31fe776c708cfef))
* **i18n:** add translation texts for pages and components ([27017ba](https://github.com/odest/tauri-nextjs-template/commit/27017bac3976ace273635faf72f10a465cd12fc0))
* **language:** Add language card and switcher hook ([05f7a23](https://github.com/odest/tauri-nextjs-template/commit/05f7a23959d259d9c359c70fab40ac801240660e))
* **sidebar:** add sidebar variant selector UI and persistent store ([f6b7bb3](https://github.com/odest/tauri-nextjs-template/commit/f6b7bb31d34ae847fe4cf933c688fd79865ef01e))
* **ui:** add language toggle and locale config ([60d1e56](https://github.com/odest/tauri-nextjs-template/commit/60d1e56b4375a872340093e1644cb8689acedc61))


### Bug Fixes

* appearance settings are not responsive on mobile view (close [#8](https://github.com/odest/tauri-nextjs-template/issues/8)) ([1fe1b69](https://github.com/odest/tauri-nextjs-template/commit/1fe1b698eeec5794316d83ab8a698874ddd88b23))
* **common/greet:** add error handling and clear input after greet ([e954c0f](https://github.com/odest/tauri-nextjs-template/commit/e954c0fff9441c0913e47f6bd93ea6c8eed6675d))
* **greet:** handle invalid input and sanitize name ([201a5d0](https://github.com/odest/tauri-nextjs-template/commit/201a5d06fb477c5a6ad51098dbda258838387499))


### Documentation

* add CONTRIBUTING.md, FUNDING.yml, overhaul README ([8e9a878](https://github.com/odest/tauri-nextjs-template/commit/8e9a878df6dbddc9ab7710fafafa913cf7c3a11e))
* fix formatting of README warning block ([7a5cb63](https://github.com/odest/tauri-nextjs-template/commit/7a5cb63c5fddf95036eefb5d66422c9de98def28))
* **README:** add required Android signing notes and guide ([a06dba1](https://github.com/odest/tauri-nextjs-template/commit/a06dba1fa0fb8d3374afe682156ab920a24fb59c))


### Code Refactoring

* **ui:** extract theme init script to shared module ([0e51547](https://github.com/odest/tauri-nextjs-template/commit/0e515474305715b54bb05ccde1111499cfcf8eb5))
* **ui:** replace mounting with useMounted hook skeleton component ([c5366b6](https://github.com/odest/tauri-nextjs-template/commit/c5366b6d1600a71025a17eeef5cd179d99dea5d6))
* **ui:** replace mounting with useMounted hook skeleton component ([cd9faa3](https://github.com/odest/tauri-nextjs-template/commit/cd9faa318c847dafbd018804db456210e2cf275e))
* update LinkComponent types and use LucideIcon for nav icons ([7ed51cd](https://github.com/odest/tauri-nextjs-template/commit/7ed51cdb4f8e32150b931f4f1c33e19018be3a41))
* use sidebar state for grid layout in mode and variant cards ([e7e84af](https://github.com/odest/tauri-nextjs-template/commit/e7e84af7268a997f6bafe670a588c8903e2e41ec))
* **utils:** Extract storage retrieval to utility and use it in stores ([af79486](https://github.com/odest/tauri-nextjs-template/commit/af794864c2b67f2f245818ddaf8b85577c768d50))


### Build System

* **deps:** bump next from 15.5.0 to 15.5.9 ([c17477c](https://github.com/odest/tauri-nextjs-template/commit/c17477c72416240f3520d30d594b72843c06eb5e))
* **deps:** bump next from 15.5.0 to 15.5.9 ([33ee5cd](https://github.com/odest/tauri-nextjs-template/commit/33ee5cd2591eb70d31ce4db7814c723dd1dade5d))
* Exclude src-tauri from tsconfig and add Android .gitignore in scripts ([a2c8a89](https://github.com/odest/tauri-nextjs-template/commit/a2c8a89bdb3608ab98fb5152321de8deee8a0216))

## [0.0.3](https://github.com/odest/tauri-nextjs-template/compare/v0.0.2...v0.0.3) (2025-09-02)


### Features

* **android:** add Android build configuration and resources ([ec04ee7](https://github.com/odest/tauri-nextjs-template/commit/ec04ee706b02bbc815e4d45d2e48fffee57b8122))
* improve sidebar and theme handling ([44016ab](https://github.com/odest/tauri-nextjs-template/commit/44016ab602045cc41a5a61ecfa744ab265c45fbb))
* **select:** Add search and sort to ThemesList with new Select component ([cf54e6f](https://github.com/odest/tauri-nextjs-template/commit/cf54e6f8326081e21093b6726978d141fc3c9e21))
* **sidebar:** close mobile sidebar on link click ([19cd438](https://github.com/odest/tauri-nextjs-template/commit/19cd43888df4324b3f88d3dd1f62fd3d9461aaf6))
* **theme:** add view transition on theme change and system mode support ([d942b57](https://github.com/odest/tauri-nextjs-template/commit/d942b57313c93aa2db442f589af92c82497e146b))
* **ui:** improve mode toggle with view transitions ([fabc024](https://github.com/odest/tauri-nextjs-template/commit/fabc0243a5ead607a157b350dabffcb196c8dc0b))


### Code Refactoring

* Refactor theme card to reusable themes list component ([4018b8b](https://github.com/odest/tauri-nextjs-template/commit/4018b8b5c8c2cd2cb8d1ca4702f1cbd92ddebc55))
* **release:** split release workflow into modular reusable workflows ([23d2ff6](https://github.com/odest/tauri-nextjs-template/commit/23d2ff613d35a088fdda3accae963025971e3740))
* **theme-store:** move sortOption to store and update ThemesList ([dab3012](https://github.com/odest/tauri-nextjs-template/commit/dab301269bb8ab0fe60e224bd57c5cbb62a3c2e8))


### Build System

* **android:** add keystore signing config for release builds ([a203803](https://github.com/odest/tauri-nextjs-template/commit/a203803b0d4286019ab0f072910ddfd64d4c8e6f))
* **android:** Move signing config to signingConfigs block and update keys ([1b19d2a](https://github.com/odest/tauri-nextjs-template/commit/1b19d2af51bc0262d39c7954921f6e2216239c9e))


### Continuous Integration

* add Android/desktop build workflows, drop old release-please ([9bf3f34](https://github.com/odest/tauri-nextjs-template/commit/9bf3f3400e6312c6dcf08d9d6d2857e189dcd344))
* add publish-tauri job to android-build and remove desktop-build ([39fae4f](https://github.com/odest/tauri-nextjs-template/commit/39fae4fd1a756987804bbd02b69bbf17eb04a3f2))
* **release-please:** add Release Please workflow and config ([da6c6dc](https://github.com/odest/tauri-nextjs-template/commit/da6c6dc69943800a480943d103e1831dd6a5dec4))
* standardize secret name to github_token across workflows ([3f6b434](https://github.com/odest/tauri-nextjs-template/commit/3f6b434a4c46d7cfb250fda3e566402099d99cca))
* Update android build workflow, add split-APK upload and rename job ([3d09a38](https://github.com/odest/tauri-nextjs-template/commit/3d09a384a1123a206dc7fe32e873fbf35e0e5b58))
* **workflow:** Add Rust and Node cache to Android build workflow ([3a9c510](https://github.com/odest/tauri-nextjs-template/commit/3a9c5101df691da1f34b21cbc7b3ad1a8acf413b))
* **workflows:** Update CI workflows to use secrets.GITHUB_TOKEN ([96130d5](https://github.com/odest/tauri-nextjs-template/commit/96130d5a53fe0298c8a184a64f3d5d6aae7450d1))
* **workflows:** update NDK, rename artifacts, fix lockfile cache ([841e1e4](https://github.com/odest/tauri-nextjs-template/commit/841e1e430fb69164908a3823ebaa70317cd25919))
