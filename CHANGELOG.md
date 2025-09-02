# Changelog

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
