# Setup `xcodegen` GitHub Action

A GitHub Action Wrapper for the delightful [`xcodegen`][xcodegen] CLI tool.

## Inputs

These correspond to the [`xcodegen generate` options][options]

All parameters are optional:

* `enable-cache`:
  Cache or not the installation, `true` by default

* `version`:
  The version of xcodegen to be used. Check <https://github.com/yonaskolb/XcodeGen/releases> for valid options.
  Omit this input or use 'latest' to use the latest version.

## Example usage

```yaml
uses: nightstory/setup-xcodegen@1.0.0
with:
  enable-cache: true
  version: latest
```

[xcodegen]: https://github.com/yonaskolb/XcodeGen
[options]: https://github.com/yonaskolb/XcodeGen#usage
