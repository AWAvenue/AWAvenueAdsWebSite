---
lastVerified: 2026-10-26
verificationScope: docs
---

# Shadowrocket guide

Applies to the module import workflow in Shadowrocket 2.x. Published file and developer product information checked: 2026-10-26. This update did not test an iOS device or establish the minimum version supporting every optional rule parameter.

## Import the module

1. Use the [subscription generator](./Sub.html?tool=shadowrocket) to select a profile and copy its **Shadowrocket `.module`** URL.
2. In Shadowrocket, open **Config → Modules**, add a URL, paste the copied link, and download it. Enable the downloaded module for your active configuration. Menu labels may vary by version.
3. Use **Config** for global routing, then enable the connection. The module already assigns its domain rules to `REJECT`; it is not a server subscription or a plain `RULE-SET` file.
4. Refresh the module and check its update information. Do not assume a module refreshes merely because the main configuration does; check the update options offered by your installed version.

The published module contains domain rejection rules. It does not require installing a CA certificate or enabling HTTPS decryption.

## Alternative: a remote rule set

If your client rejects the module or its optional parameters, choose **Surge / Surfboard RULE-SET** in the [generator](./Sub.html?tool=surgeRuleSet), select the same blocking preferences again, and add a `RULE-SET` rule using that `.list` URL and the `REJECT` policy. Place it before broad allow rules and the final rule. Disable the previous module to avoid duplicate imports.

## Confirm that it works

- Check that the resource downloaded successfully and contains the expected domain rules.
- Pick a domain actually present in your selected file, trigger a request through Shadowrocket, and inspect the connection log for a matching rule and `REJECT` result.
- If the request is allowed, check the active configuration, global routing mode, enabled module, and other matching rules. A timeout alone is not proof of a match.
- To change profiles, replace the module URL and refresh it rather than adding another enabled copy.

References: [developer's App Store description](https://apps.apple.com/us/app/shadowrocket/id932747118) for URL imports and request logging; [the project's published Shadowrocket module](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Shadowrocket.module) for its actual format. The menu workflow follows this site's existing guide and still needs device verification.

## Updates and rollback

To change profiles, replace the existing URL and refresh. For troubleshooting, disable this module or its RULE-SET entry, depending on the import method you chose, then reload the active configuration and reconnect. Use the logged domain to add a narrow allow exception for a confirmed false positive, or restore your previous configuration backup.
