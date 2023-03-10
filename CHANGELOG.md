# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.1.0]

### Changed
- `_settings.scss` - Changed main `font-family` stack to Arial for consistency across OSs. By removing Helvetica, it makes designing in Sketch more accurately reflect what most visitors will see

## [3.0.0]

### Changed
- `config.yml` - Begin importing jquery via `bower_components`. The discontinued use of Google's jQuery CDN is what merits a major version bump

### Removed
- `default.html` - Removed both `<script>` lines regarding the use of the Google jQuery CDN
- `/js/vendor/` - Deleted directory which contained local fallback jQuery file

## [2.1.0]

### Changed
- `meta-viewport.yml` - Changed which `{{ meta-viewport }}` is used to remove `shrink-to-fit=no` since that has been obsolete since iOS 9.3
- `app.scss` - Now import all `motion-ui` partials since those styles will be purged upon production


## [2.0.0]

### Added
- Resuming a changelog following semver standards

### Changed
- Updated Foundation 6 from 6.7.4 to 6.7.5
