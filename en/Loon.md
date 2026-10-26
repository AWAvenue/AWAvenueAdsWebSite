# Loon guide

Applies to Loon 3.x with plugin support. Official documentation and published file checked: 2026-10-26. This update did not test the iOS interface or establish the minimum version supporting every optional rule parameter.

## Import the plugin

1. Open the [subscription generator](./Sub.html?tool=loon), select a profile, and copy the **Loon `.module`** URL.
2. In Loon's configuration area, open **Plugins**, add a remote plugin, paste the URL, download it, and enable it. Menu labels may vary by version.
3. Select rule-based routing and start Loon. Although its filename ends in `.module`, this resource contains plugin metadata and a `[Rule]` section. Import it as a plugin, not as a remote rule list or node subscription.
4. Refresh the plugin and check its downloaded content/update information. These domain rejection rules do not require a CA certificate or HTTPS decryption.

## Alternative: a rule subscription

If the plugin cannot be parsed, choose **Surge / Surfboard RULE-SET** in the [generator](./Sub.html?tool=surgeRuleSet) and select the same blocking preferences again. In Loon, add that `.list` URL as a **rule subscription**, assign `REJECT`, and enable it. Disable the previous plugin.

If you use a custom policy group, ensure it selects `REJECT`. Selecting `DIRECT` allows the matched requests. Avoid adding a raw DOMAIN-SET as though it were a RULE-SET.

## Confirm that it works

- Refresh the resource and confirm that it contains rules, with no download or parsing errors.
- Choose a domain present in the downloaded profile. Make a request through Loon and inspect its request details for the matching rule and `REJECT` result.
- Check local rules if it is unexpectedly allowed: Loon documents local rules as taking precedence over plugin rules, and plugin rules over subscription rules.
- Changing profiles requires replacing the URL and refreshing the resource. Avoid leaving multiple copies enabled.

References: Loon's [plugin documentation](https://nsloon.app/en/docs/Plugin/) and [rule priority](https://nsloon.app/en/docs/Rule/); [the project's published Loon module](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Loon.module).

The earlier Chinese guide was contributed by ink_hitori (2025-03-22). This guide follows the plugin format now supplied by the generator.
