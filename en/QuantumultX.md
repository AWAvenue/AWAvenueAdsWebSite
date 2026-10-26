---
lastVerified: 2026-10-26
verificationScope: docs
---

# Quantumult X guide

Applies to Quantumult X 1.x with remote filter resources. Documentation and published file checked: 2026-10-26. The iOS interface has not been tested in this update; labels may vary by version.

## Import the selected profile

1. Open the [subscription generator](./Sub.html?tool=quantumultX), choose your blocking preferences, and copy the Quantumult X `.list` URL. Keep that exact URL to retain your chosen profile.
2. Open Quantumult X settings, then **Filter → Remote Resources**. Add a remote filter resource; do not add it as a server subscription or rewrite resource.
3. Paste the URL, name it **AWAvenue-Ads-Rule**, and enable it. Set the policy to **reject**. Alternatively, select a custom policy group and make sure that group currently selects **reject**.
4. Leave the resource parser disabled: the file is already in the required format. Enable periodic updates, save, and download the resource.
5. Select rule-based/filter mode and enable Quantumult X.

For manual configuration, add the following under the existing `[filter_remote]` section. This example uses the full profile; replace only its URL with your generated URL if you chose a different profile.

```ini
[filter_remote]
https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-QuantumultX.list, tag=AWAvenue-Ads-Rule, force-policy=reject, update-interval=86400, opt-parser=false, enabled=true
```

This is a configuration fragment, not a complete proxy configuration. Preserve your existing servers, policies, and other rules.

## Confirm that it works

- Refresh the resource and check that it contains rules rather than an HTML error page.
- Choose a domain present in the downloaded profile. Trigger a request through Quantumult X, then check its activity/request log for that domain and the **reject** policy. A failed connection alone does not prove which rule blocked it.
- If it is allowed, check the selected operating mode, earlier matching rules, and any policy override. If it is still cached, restart the connection and test again.
- To change profiles, replace this resource URL and refresh it. Avoid enabling multiple profiles of the same list at once.

Syntax reference: [Quantumult X official sample configuration](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf).

Adapted from the Chinese guide by 过去式 (2024-06-02), with import and verification instructions updated.

## Updates and rollback

For a false positive, first identify the matching domain and rule source in the log, then add a narrow allow exception. During troubleshooting, disable the rule or resource added in this guide and reload the configuration; re-enable it after isolating the cause. Keep a backup of your previous configuration.
