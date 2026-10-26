# AWAvenue-Ads-Rule usage and licensing

Revised: 2026-10-27

AWAvenue-Ads-Rule primarily targets advertising SDKs in Android applications and also provides rule formats for compatible tools on other platforms. This page explains the licenses for the rules and website documentation, the scope of filtering, and practical usage considerations.

## License for rule files and code {#rules-license}

The license for rule files and related code in the rule repository is determined by the `LICENSE` and any separate file notices in the version you use. The repository's current [LICENSE is GNU GPLv3](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/blob/main/LICENSE).

- Individuals and organizations may use the rules under GPLv3, including for commercial purposes.
- Copying, modification, and redistribution are permitted subject to the relevant GPLv3 conditions. These include retaining copyright, license, and warranty notices when distributing copies; and, when distributing modified versions, marking changes and meeting applicable requirements for continued GPL licensing and provision of corresponding source code.
- Uses that comply with the applicable license do not require additional written permission because of this page. Copyright remains with the respective authors and contributors.

This is a readable overview. Consult the license text for the full rights and obligations; this page does not change rights granted by GPLv3.

## License for original website documentation {#docs-license}

Unless otherwise noted, this website's original tutorials and explanatory text are licensed under [CC BY-NC-SA 4.0 (Attribution–NonCommercial–ShareAlike)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

You may share or adapt this material under that license: provide appropriate attribution, links to the original and the license, indicate whether changes were made, use it only for noncommercial purposes, and distribute adaptations under the same license. The license text governs its detailed conditions and exceptions.

This documentation license does not replace the licenses for rule files or software code. Third-party references, images, brand marks, and linked content remain subject to their respective licenses or permissions.

## Filtering scope and usage {#scope}

- These rules primarily filter domains. They cannot guarantee separation of ads from normal content on the same domain or automatically hide empty areas on web pages.
- Depending on the selected profile, filtering may cover ads, analytics and telemetry, forced updates, PCDN, push services, or remote configuration. Blocking may affect those functions. Choose a suitable profile and use logs to add necessary allow exceptions for false positives.
- A rule list requires a compatible tool; it is not a complete proxy or DNS configuration. Follow the [guides](./Knowledge.md) to choose the format, merge configuration, and verify matches. Keep a backup of your previous configuration.
- Comply with applicable laws where you use the rules and the requirements of your chosen tools.

## Results, updates, and risks {#limitations}

The rules and documentation are provided as is. They do not guarantee that every ad will be blocked, that false positives will never occur, or that every device and version will remain supported. Application, system, and network changes can affect results. Warranty and liability are governed by the applicable licenses and law.

Keep a working configuration before updating rules or changing profiles, and use query or connection logs to verify the effects. Third-party mirrors and CDNs may have caching or synchronization delays. A successful download does not establish that the content is current; choose a working source and check the actual content.

## Feedback and updates to this page {#updates-feedback}

Report false positives, missed ads, or broken subscription links through the [support channels](./Support.md). Include the tool version, selected profile, relevant domains, reproduction steps, and necessary logs, with subscription credentials and personal information removed. Third-party tools and services are maintained by their respective providers; references do not imply mutual endorsement.

This page may be revised as the project changes, with its revision date shown above. Rights to use and distribute a particular version remain governed by its applicable license.
