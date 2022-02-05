# Setup `xcodegen` GitHub Action

A GitHub Action Wrapper for the delightful [`xcodegen`][https://github.com/yonaskolb/XcodeGen] CLI tool.

## Inputs (optional)

* `enable-cache`:
  Cache or not the installation. Default: `true`

* `version`:
  The version of xcodegen to be used. Check <https://github.com/yonaskolb/XcodeGen/releases> for valid options.
  Default: `latest`

## Example usage

```yaml
uses: nightstory/setup-xcodegen@v1
with:
  enable-cache: true
  version: latest
```