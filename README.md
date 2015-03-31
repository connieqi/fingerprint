# Browser Fingerprinting
Demo for EECS 588 web tracking and privacy presentation.

Calculates your browser fingerprint by looking at the following values:
- Useragent
- Cookies enabled?
- Language
- Platform
- OS CPU
- CPU class
- Do Not Track flag
- Screen resolution
- Screen color depth
- Timezone offset
- Plugins installed
- HTML5 Canvas fingerprint

The fingerprint is then calculated using a SHA3 hash.

Check it out live: http://bfp588.herokuapp.com/

NOTE: we do not collect fingerprints from visitors, this is client-side only!

Have fun :)
