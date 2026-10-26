# Surge guide

Applies to remote rule sets in **Surge iOS 5.x / Mac 5.x and 6.x**. This project's module includes `pre-matching`, which requires **iOS 5.14.0+ / Mac 5.9.0+**. Documentation and published file checked: **2026-10-26**. This update did not perform imports on an Apple device; menu locations may vary.

Choose a format and profile in the [generator](./Sub.html?tool=surgeRuleSet). Use **one** method below. For a non-editable managed profile, use a module or the custom-rule mechanism permitted by your profile provider.

## RULE-SET {#rule-set}

Choose **Surge / Surfboard RULE-SET** and copy its `.list` URL. Add the following line to your existing `[Rule]` section, before broad allow rules and `FINAL`. This example is the full profile; substitute your copied URL for another profile.

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Surge-RULE-SET.list,REJECT
```

Preserve other rules, save/reload the profile, and refresh remote resources. This file contains typed entries such as `DOMAIN` and `DOMAIN-SUFFIX`; do not use a module URL here.

## DOMAIN-SET {#domain-set}

Choose **Surge / Surfboard DOMAIN-SET** and use its domain-list URL:

```ini
[Rule]
DOMAIN-SET,https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Surge.list,REJECT
```

Replace the URL for your chosen profile. DOMAIN-SET files contain bare domains; a leading dot includes subdomains. They are not interchangeable with RULE-SET files.

## Surge module {#module}

1. Select **Surge Module** in the [generator](./Sub.html?tool=surgeModule), choose your profile, and copy the `.sgmodule` URL.
2. In Surge's module manager, install from URL, download, and enable the module. Do not replace your entire configuration with it.
3. Its domain rules already use `REJECT` and are inserted before the main profile's rules. The published module does not require a CA certificate or HTTPS decryption.
4. Check the module's download/update status separately from remote rule sets. If an older version rejects its parameters, use RULE-SET instead.

## Verify the import

- Refresh the resource/module and check for download or parsing errors. Confirm the URL still matches your selected profile.
- Enable Surge in Rule mode. Choose a domain present in your downloaded list, request it through Surge, and inspect the request record for the matching rule and **REJECT** policy.
- If allowed, check earlier rules, module state, and whether traffic bypasses Surge. A connection failure from another rule is not evidence that this list matched.
- Replace and refresh the original URL when changing profiles; avoid duplicate enabled profiles.

For Surfboard, use its documented [RULE-SET](https://getsurfboard.com/docs/profile-format/rule/ruleset/) or [DOMAIN-SET](https://getsurfboard.com/docs/profile-format/rule/domainset/) workflow. Surge module instructions and version requirements do not apply to Surfboard.

Official references: [Surge rule sets](https://manual.nssurge.com/rules/ruleset.html), [domain rules and version requirements](https://manual.nssurge.com/rules/domain.html), and [modules](https://manual.nssurge.com/profile/module.html).
