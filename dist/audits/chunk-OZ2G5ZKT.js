import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  LighthouseError
} from "./chunk-EBBYNBKM.js";
import {
  Util
} from "./chunk-ZGW6XDCS.js";
import {
  __commonJS,
  __name,
  __toESM
} from "./chunk-XE6XARIN.js";

// node_modules/tldts-icann/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/tldts-icann/dist/cjs/index.js"(exports) {
    "use strict";
    function shareSameDomainSuffix(hostname, vhost) {
      if (hostname.endsWith(vhost)) {
        return hostname.length === vhost.length || hostname[hostname.length - vhost.length - 1] === ".";
      }
      return false;
    }
    __name(shareSameDomainSuffix, "shareSameDomainSuffix");
    function extractDomainWithSuffix(hostname, publicSuffix) {
      const publicSuffixIndex = hostname.length - publicSuffix.length - 2;
      const lastDotBeforeSuffixIndex = hostname.lastIndexOf(".", publicSuffixIndex);
      if (lastDotBeforeSuffixIndex === -1) {
        return hostname;
      }
      return hostname.slice(lastDotBeforeSuffixIndex + 1);
    }
    __name(extractDomainWithSuffix, "extractDomainWithSuffix");
    function getDomain$1(suffix, hostname, options) {
      if (options.validHosts !== null) {
        const validHosts = options.validHosts;
        for (const vhost of validHosts) {
          if (
            /*@__INLINE__*/
            shareSameDomainSuffix(hostname, vhost)
          ) {
            return vhost;
          }
        }
      }
      let numberOfLeadingDots = 0;
      if (hostname.startsWith(".")) {
        while (numberOfLeadingDots < hostname.length && hostname[numberOfLeadingDots] === ".") {
          numberOfLeadingDots += 1;
        }
      }
      if (suffix.length === hostname.length - numberOfLeadingDots) {
        return null;
      }
      return (
        /*@__INLINE__*/
        extractDomainWithSuffix(hostname, suffix)
      );
    }
    __name(getDomain$1, "getDomain$1");
    function getDomainWithoutSuffix$1(domain, suffix) {
      return domain.slice(0, -suffix.length - 1);
    }
    __name(getDomainWithoutSuffix$1, "getDomainWithoutSuffix$1");
    function extractHostname(url, urlIsValidHostname) {
      let start = 0;
      let end = url.length;
      let hasUpper = false;
      if (!urlIsValidHostname) {
        if (url.startsWith("data:")) {
          return null;
        }
        while (start < url.length && url.charCodeAt(start) <= 32) {
          start += 1;
        }
        while (end > start + 1 && url.charCodeAt(end - 1) <= 32) {
          end -= 1;
        }
        if (url.charCodeAt(start) === 47 && url.charCodeAt(start + 1) === 47) {
          start += 2;
        } else {
          const indexOfProtocol = url.indexOf(":/", start);
          if (indexOfProtocol !== -1) {
            const protocolSize = indexOfProtocol - start;
            const c0 = url.charCodeAt(start);
            const c1 = url.charCodeAt(start + 1);
            const c2 = url.charCodeAt(start + 2);
            const c3 = url.charCodeAt(start + 3);
            const c4 = url.charCodeAt(start + 4);
            if (protocolSize === 5 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112 && c4 === 115) ;
            else if (protocolSize === 4 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112) ;
            else if (protocolSize === 3 && c0 === 119 && c1 === 115 && c2 === 115) ;
            else if (protocolSize === 2 && c0 === 119 && c1 === 115) ;
            else {
              for (let i = start; i < indexOfProtocol; i += 1) {
                const lowerCaseCode = url.charCodeAt(i) | 32;
                if (!(lowerCaseCode >= 97 && lowerCaseCode <= 122 || // [a, z]
                lowerCaseCode >= 48 && lowerCaseCode <= 57 || // [0, 9]
                lowerCaseCode === 46 || // '.'
                lowerCaseCode === 45 || // '-'
                lowerCaseCode === 43)) {
                  return null;
                }
              }
            }
            start = indexOfProtocol + 2;
            while (url.charCodeAt(start) === 47) {
              start += 1;
            }
          }
        }
        let indexOfIdentifier = -1;
        let indexOfClosingBracket = -1;
        let indexOfPort = -1;
        for (let i = start; i < end; i += 1) {
          const code = url.charCodeAt(i);
          if (code === 35 || // '#'
          code === 47 || // '/'
          code === 63) {
            end = i;
            break;
          } else if (code === 64) {
            indexOfIdentifier = i;
          } else if (code === 93) {
            indexOfClosingBracket = i;
          } else if (code === 58) {
            indexOfPort = i;
          } else if (code >= 65 && code <= 90) {
            hasUpper = true;
          }
        }
        if (indexOfIdentifier !== -1 && indexOfIdentifier > start && indexOfIdentifier < end) {
          start = indexOfIdentifier + 1;
        }
        if (url.charCodeAt(start) === 91) {
          if (indexOfClosingBracket !== -1) {
            return url.slice(start + 1, indexOfClosingBracket).toLowerCase();
          }
          return null;
        } else if (indexOfPort !== -1 && indexOfPort > start && indexOfPort < end) {
          end = indexOfPort;
        }
      }
      while (end > start + 1 && url.charCodeAt(end - 1) === 46) {
        end -= 1;
      }
      const hostname = start !== 0 || end !== url.length ? url.slice(start, end) : url;
      if (hasUpper) {
        return hostname.toLowerCase();
      }
      return hostname;
    }
    __name(extractHostname, "extractHostname");
    function isProbablyIpv4(hostname) {
      if (hostname.length < 7) {
        return false;
      }
      if (hostname.length > 15) {
        return false;
      }
      let numberOfDots = 0;
      for (let i = 0; i < hostname.length; i += 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46) {
          numberOfDots += 1;
        } else if (code < 48 || code > 57) {
          return false;
        }
      }
      return numberOfDots === 3 && hostname.charCodeAt(0) !== 46 && hostname.charCodeAt(hostname.length - 1) !== 46;
    }
    __name(isProbablyIpv4, "isProbablyIpv4");
    function isProbablyIpv6(hostname) {
      if (hostname.length < 3) {
        return false;
      }
      let start = hostname.startsWith("[") ? 1 : 0;
      let end = hostname.length;
      if (hostname[end - 1] === "]") {
        end -= 1;
      }
      if (end - start > 39) {
        return false;
      }
      let hasColon = false;
      for (; start < end; start += 1) {
        const code = hostname.charCodeAt(start);
        if (code === 58) {
          hasColon = true;
        } else if (!(code >= 48 && code <= 57 || // 0-9
        code >= 97 && code <= 102 || // a-f
        code >= 65 && code <= 90)) {
          return false;
        }
      }
      return hasColon;
    }
    __name(isProbablyIpv6, "isProbablyIpv6");
    function isIp(hostname) {
      return isProbablyIpv6(hostname) || isProbablyIpv4(hostname);
    }
    __name(isIp, "isIp");
    function isValidAscii(code) {
      return code >= 97 && code <= 122 || code >= 48 && code <= 57 || code > 127;
    }
    __name(isValidAscii, "isValidAscii");
    function isValidHostname(hostname) {
      if (hostname.length > 255) {
        return false;
      }
      if (hostname.length === 0) {
        return false;
      }
      if (
        /*@__INLINE__*/
        !isValidAscii(hostname.charCodeAt(0)) && hostname.charCodeAt(0) !== 46 && // '.' (dot)
        hostname.charCodeAt(0) !== 95
      ) {
        return false;
      }
      let lastDotIndex = -1;
      let lastCharCode = -1;
      const len = hostname.length;
      for (let i = 0; i < len; i += 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46) {
          if (
            // Check that previous label is < 63 bytes long (64 = 63 + '.')
            i - lastDotIndex > 64 || // Check that previous character was not already a '.'
            lastCharCode === 46 || // Check that the previous label does not end with a '-' (dash)
            lastCharCode === 45 || // Check that the previous label does not end with a '_' (underscore)
            lastCharCode === 95
          ) {
            return false;
          }
          lastDotIndex = i;
        } else if (!/*@__INLINE__*/
        (isValidAscii(code) || code === 45 || code === 95)) {
          return false;
        }
        lastCharCode = code;
      }
      return (
        // Check that last label is shorter than 63 chars
        len - lastDotIndex - 1 <= 63 && // Check that the last character is an allowed trailing label character.
        // Since we already checked that the char is a valid hostname character,
        // we only need to check that it's different from '-'.
        lastCharCode !== 45
      );
    }
    __name(isValidHostname, "isValidHostname");
    function setDefaultsImpl({ allowIcannDomains = true, allowPrivateDomains = false, detectIp = true, extractHostname: extractHostname2 = true, mixedInputs = true, validHosts = null, validateHostname = true }) {
      return {
        allowIcannDomains,
        allowPrivateDomains,
        detectIp,
        extractHostname: extractHostname2,
        mixedInputs,
        validHosts,
        validateHostname
      };
    }
    __name(setDefaultsImpl, "setDefaultsImpl");
    var DEFAULT_OPTIONS = (
      /*@__INLINE__*/
      setDefaultsImpl({})
    );
    function setDefaults(options) {
      if (options === void 0) {
        return DEFAULT_OPTIONS;
      }
      return (
        /*@__INLINE__*/
        setDefaultsImpl(options)
      );
    }
    __name(setDefaults, "setDefaults");
    function getSubdomain$1(hostname, domain) {
      if (domain.length === hostname.length) {
        return "";
      }
      return hostname.slice(0, -domain.length - 1);
    }
    __name(getSubdomain$1, "getSubdomain$1");
    function getEmptyResult() {
      return {
        domain: null,
        domainWithoutSuffix: null,
        hostname: null,
        isIcann: null,
        isIp: null,
        isPrivate: null,
        publicSuffix: null,
        subdomain: null
      };
    }
    __name(getEmptyResult, "getEmptyResult");
    function resetResult(result) {
      result.domain = null;
      result.domainWithoutSuffix = null;
      result.hostname = null;
      result.isIcann = null;
      result.isIp = null;
      result.isPrivate = null;
      result.publicSuffix = null;
      result.subdomain = null;
    }
    __name(resetResult, "resetResult");
    function parseImpl(url, step, suffixLookup2, partialOptions, result) {
      const options = (
        /*@__INLINE__*/
        setDefaults(partialOptions)
      );
      if (typeof url !== "string") {
        return result;
      }
      if (!options.extractHostname) {
        result.hostname = url;
      } else if (options.mixedInputs) {
        result.hostname = extractHostname(url, isValidHostname(url));
      } else {
        result.hostname = extractHostname(url, false);
      }
      if (options.detectIp && result.hostname !== null) {
        result.isIp = isIp(result.hostname);
        if (result.isIp) {
          return result;
        }
      }
      if (options.validateHostname && options.extractHostname && result.hostname !== null && !isValidHostname(result.hostname)) {
        result.hostname = null;
        return result;
      }
      if (step === 0 || result.hostname === null) {
        return result;
      }
      suffixLookup2(result.hostname, options, result);
      if (step === 2 || result.publicSuffix === null) {
        return result;
      }
      result.domain = getDomain$1(result.publicSuffix, result.hostname, options);
      if (step === 3 || result.domain === null) {
        return result;
      }
      result.subdomain = getSubdomain$1(result.hostname, result.domain);
      if (step === 4) {
        return result;
      }
      result.domainWithoutSuffix = getDomainWithoutSuffix$1(result.domain, result.publicSuffix);
      return result;
    }
    __name(parseImpl, "parseImpl");
    function fastPathLookup(hostname, options, out) {
      if (!options.allowPrivateDomains && hostname.length > 3) {
        const last = hostname.length - 1;
        const c3 = hostname.charCodeAt(last);
        const c2 = hostname.charCodeAt(last - 1);
        const c1 = hostname.charCodeAt(last - 2);
        const c0 = hostname.charCodeAt(last - 3);
        if (c3 === 109 && c2 === 111 && c1 === 99 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "com";
          return true;
        } else if (c3 === 103 && c2 === 114 && c1 === 111 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "org";
          return true;
        } else if (c3 === 117 && c2 === 100 && c1 === 101 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "edu";
          return true;
        } else if (c3 === 118 && c2 === 111 && c1 === 103 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "gov";
          return true;
        } else if (c3 === 116 && c2 === 101 && c1 === 110 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "net";
          return true;
        } else if (c3 === 101 && c2 === 100 && c1 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "de";
          return true;
        }
      }
      return false;
    }
    __name(fastPathLookup, "fastPathLookup");
    var exceptions = /* @__PURE__ */ (function() {
      const _72 = [1, {}], _73 = [0, { "city": _72 }];
      const exceptions2 = [0, { "ck": [0, { "www": _72 }], "jp": [0, { "kawasaki": _73, "kitakyushu": _73, "kobe": _73, "nagoya": _73, "sapporo": _73, "sendai": _73, "yokohama": _73 }] }];
      return exceptions2;
    })();
    var rules = /* @__PURE__ */ (function() {
      const _74 = [1, {}], _75 = [1, { "com": _74, "edu": _74, "gov": _74, "mil": _74, "net": _74, "org": _74 }], _76 = [1, { "com": _74, "edu": _74, "gov": _74, "net": _74, "org": _74 }], _77 = [1, { "gov": _74 }], _78 = [0, { "*": _74 }], _79 = [1, { "co": _74, "com": _74, "edu": _74, "gov": _74, "net": _74, "org": _74 }], _80 = [1, { "com": _74, "edu": _74, "net": _74, "org": _74 }], _81 = [1, { "co": _74, "net": _74, "org": _74 }], _82 = [1, { "co": _74, "com": _74, "edu": _74, "gov": _74, "mil": _74, "net": _74, "nom": _74, "org": _74 }], _83 = [1, { "biz": _74, "com": _74, "edu": _74, "gov": _74, "info": _74, "net": _74, "org": _74 }], _84 = [1, { "gs": _74 }], _85 = [0, { "nes": _74 }], _86 = [1, { "k12": _74, "cc": _74, "lib": _74 }], _87 = [1, { "cc": _74 }], _88 = [1, { "cc": _74, "lib": _74 }];
      const rules2 = [0, { "ac": _75, "ad": _74, "ae": [1, { "ac": _74, "co": _74, "gov": _74, "mil": _74, "net": _74, "org": _74, "sch": _74 }], "aero": [1, { "airline": _74, "airport": _74, "accident-investigation": _74, "accident-prevention": _74, "aerobatic": _74, "aeroclub": _74, "aerodrome": _74, "agents": _74, "air-surveillance": _74, "air-traffic-control": _74, "aircraft": _74, "airtraffic": _74, "ambulance": _74, "association": _74, "author": _74, "ballooning": _74, "broker": _74, "caa": _74, "cargo": _74, "catering": _74, "certification": _74, "championship": _74, "charter": _74, "civilaviation": _74, "club": _74, "conference": _74, "consultant": _74, "consulting": _74, "control": _74, "council": _74, "crew": _74, "design": _74, "dgca": _74, "educator": _74, "emergency": _74, "engine": _74, "engineer": _74, "entertainment": _74, "equipment": _74, "exchange": _74, "express": _74, "federation": _74, "flight": _74, "freight": _74, "fuel": _74, "gliding": _74, "government": _74, "groundhandling": _74, "group": _74, "hanggliding": _74, "homebuilt": _74, "insurance": _74, "journal": _74, "journalist": _74, "leasing": _74, "logistics": _74, "magazine": _74, "maintenance": _74, "marketplace": _74, "media": _74, "microlight": _74, "modelling": _74, "navigation": _74, "parachuting": _74, "paragliding": _74, "passenger-association": _74, "pilot": _74, "press": _74, "production": _74, "recreation": _74, "repbody": _74, "res": _74, "research": _74, "rotorcraft": _74, "safety": _74, "scientist": _74, "services": _74, "show": _74, "skydiving": _74, "software": _74, "student": _74, "taxi": _74, "trader": _74, "trading": _74, "trainer": _74, "union": _74, "workinggroup": _74, "works": _74 }], "af": _76, "ag": [1, { "co": _74, "com": _74, "net": _74, "nom": _74, "org": _74 }], "ai": [1, { "com": _74, "net": _74, "off": _74, "org": _74 }], "al": _75, "am": [1, { "co": _74, "com": _74, "commune": _74, "net": _74, "org": _74 }], "ao": [1, { "co": _74, "ed": _74, "edu": _74, "gov": _74, "gv": _74, "it": _74, "og": _74, "org": _74, "pb": _74 }], "aq": _74, "ar": [1, { "bet": _74, "com": _74, "coop": _74, "edu": _74, "gob": _74, "gov": _74, "int": _74, "mil": _74, "musica": _74, "mutual": _74, "net": _74, "org": _74, "seg": _74, "senasa": _74, "tur": _74 }], "arpa": [1, { "e164": _74, "home": _74, "in-addr": _74, "ip6": _74, "iris": _74, "uri": _74, "urn": _74 }], "as": _77, "asia": _74, "at": [1, { "ac": [1, { "sth": _74 }], "co": _74, "gv": _74, "or": _74 }], "au": [1, { "asn": _74, "com": _74, "edu": [1, { "act": _74, "catholic": _74, "nsw": _74, "nt": _74, "qld": _74, "sa": _74, "tas": _74, "vic": _74, "wa": _74 }], "gov": [1, { "qld": _74, "sa": _74, "tas": _74, "vic": _74, "wa": _74 }], "id": _74, "net": _74, "org": _74, "conf": _74, "oz": _74, "act": _74, "nsw": _74, "nt": _74, "qld": _74, "sa": _74, "tas": _74, "vic": _74, "wa": _74 }], "aw": [1, { "com": _74 }], "ax": _74, "az": [1, { "biz": _74, "co": _74, "com": _74, "edu": _74, "gov": _74, "info": _74, "int": _74, "mil": _74, "name": _74, "net": _74, "org": _74, "pp": _74, "pro": _74 }], "ba": _75, "bb": [1, { "biz": _74, "co": _74, "com": _74, "edu": _74, "gov": _74, "info": _74, "net": _74, "org": _74, "store": _74, "tv": _74 }], "bd": [1, { "ac": _74, "ai": _74, "co": _74, "com": _74, "edu": _74, "gov": _74, "id": _74, "info": _74, "it": _74, "mil": _74, "net": _74, "org": _74, "sch": _74, "tv": _74 }], "be": [1, { "ac": _74 }], "bf": _77, "bg": [1, { "0": _74, "1": _74, "2": _74, "3": _74, "4": _74, "5": _74, "6": _74, "7": _74, "8": _74, "9": _74, "a": _74, "b": _74, "c": _74, "d": _74, "e": _74, "f": _74, "g": _74, "h": _74, "i": _74, "j": _74, "k": _74, "l": _74, "m": _74, "n": _74, "o": _74, "p": _74, "q": _74, "r": _74, "s": _74, "t": _74, "u": _74, "v": _74, "w": _74, "x": _74, "y": _74, "z": _74 }], "bh": _76, "bi": [1, { "co": _74, "com": _74, "edu": _74, "or": _74, "org": _74 }], "biz": _74, "bj": [1, { "africa": _74, "agro": _74, "architectes": _74, "assur": _74, "avocats": _74, "co": _74, "com": _74, "eco": _74, "econo": _74, "edu": _74, "info": _74, "loisirs": _74, "money": _74, "net": _74, "org": _74, "ote": _74, "restaurant": _74, "resto": _74, "tourism": _74, "univ": _74 }], "bm": _76, "bn": _76, "bo": [1, { "com": _74, "edu": _74, "gob": _74, "int": _74, "mil": _74, "net": _74, "org": _74, "tv": _74, "web": _74, "academia": _74, "agro": _74, "arte": _74, "blog": _74, "bolivia": _74, "ciencia": _74, "cooperativa": _74, "democracia": _74, "deporte": _74, "ecologia": _74, "economia": _74, "empresa": _74, "indigena": _74, "industria": _74, "info": _74, "medicina": _74, "movimiento": _74, "musica": _74, "natural": _74, "nombre": _74, "noticias": _74, "patria": _74, "plurinacional": _74, "politica": _74, "profesional": _74, "pueblo": _74, "revista": _74, "salud": _74, "tecnologia": _74, "tksat": _74, "transporte": _74, "wiki": _74 }], "br": [1, { "9guacu": _74, "abc": _74, "adm": _74, "adv": _74, "agr": _74, "aju": _74, "am": _74, "anani": _74, "aparecida": _74, "api": _74, "app": _74, "arq": _74, "art": _74, "ato": _74, "b": _74, "barueri": _74, "belem": _74, "bet": _74, "bhz": _74, "bib": _74, "bio": _74, "blog": _74, "bmd": _74, "boavista": _74, "bsb": _74, "campinagrande": _74, "campinas": _74, "caxias": _74, "cim": _74, "cng": _74, "cnt": _74, "com": _74, "contagem": _74, "coop": _74, "coz": _74, "cri": _74, "cuiaba": _74, "curitiba": _74, "def": _74, "des": _74, "det": _74, "dev": _74, "ecn": _74, "eco": _74, "edu": _74, "emp": _74, "enf": _74, "eng": _74, "esp": _74, "etc": _74, "eti": _74, "far": _74, "feira": _74, "flog": _74, "floripa": _74, "fm": _74, "fnd": _74, "fortal": _74, "fot": _74, "foz": _74, "fst": _74, "g12": _74, "geo": _74, "ggf": _74, "goiania": _74, "gov": [1, { "ac": _74, "al": _74, "am": _74, "ap": _74, "ba": _74, "ce": _74, "df": _74, "es": _74, "go": _74, "ma": _74, "mg": _74, "ms": _74, "mt": _74, "pa": _74, "pb": _74, "pe": _74, "pi": _74, "pr": _74, "rj": _74, "rn": _74, "ro": _74, "rr": _74, "rs": _74, "sc": _74, "se": _74, "sp": _74, "to": _74 }], "gru": _74, "ia": _74, "imb": _74, "ind": _74, "inf": _74, "jab": _74, "jampa": _74, "jdf": _74, "joinville": _74, "jor": _74, "jus": _74, "leg": _74, "leilao": _74, "lel": _74, "log": _74, "londrina": _74, "macapa": _74, "maceio": _74, "manaus": _74, "maringa": _74, "mat": _74, "med": _74, "mil": _74, "morena": _74, "mp": _74, "mus": _74, "natal": _74, "net": _74, "niteroi": _74, "nom": _78, "not": _74, "ntr": _74, "odo": _74, "ong": _74, "org": _74, "osasco": _74, "palmas": _74, "poa": _74, "ppg": _74, "pro": _74, "psc": _74, "psi": _74, "pvh": _74, "qsl": _74, "radio": _74, "rec": _74, "recife": _74, "rep": _74, "ribeirao": _74, "rio": _74, "riobranco": _74, "riopreto": _74, "salvador": _74, "sampa": _74, "santamaria": _74, "santoandre": _74, "saobernardo": _74, "saogonca": _74, "seg": _74, "sjc": _74, "slg": _74, "slz": _74, "social": _74, "sorocaba": _74, "srv": _74, "taxi": _74, "tc": _74, "tec": _74, "teo": _74, "the": _74, "tmp": _74, "trd": _74, "tur": _74, "tv": _74, "udi": _74, "vet": _74, "vix": _74, "vlog": _74, "wiki": _74, "xyz": _74, "zlg": _74 }], "bs": _76, "bt": _76, "bv": _74, "bw": [1, { "ac": _74, "co": _74, "gov": _74, "net": _74, "org": _74 }], "by": [1, { "gov": _74, "mil": _74, "com": _74, "of": _74 }], "bz": _79, "ca": [1, { "ab": _74, "bc": _74, "mb": _74, "nb": _74, "nf": _74, "nl": _74, "ns": _74, "nt": _74, "nu": _74, "on": _74, "pe": _74, "qc": _74, "sk": _74, "yk": _74, "gc": _74 }], "cat": _74, "cc": _74, "cd": _77, "cf": _74, "cg": _74, "ch": _74, "ci": [1, { "ac": _74, "xn--aroport-bya": _74, "a\xE9roport": _74, "asso": _74, "co": _74, "com": _74, "ed": _74, "edu": _74, "go": _74, "gouv": _74, "int": _74, "net": _74, "or": _74, "org": _74 }], "ck": _78, "cl": [1, { "co": _74, "gob": _74, "gov": _74, "mil": _74 }], "cm": [1, { "co": _74, "com": _74, "gov": _74, "net": _74 }], "cn": [1, { "ac": _74, "com": _74, "edu": _74, "gov": _74, "mil": _74, "net": _74, "org": _74, "xn--55qx5d": _74, "\u516C\u53F8": _74, "xn--od0alg": _74, "\u7DB2\u7D61": _74, "xn--io0a7i": _74, "\u7F51\u7EDC": _74, "ah": _74, "bj": _74, "cq": _74, "fj": _74, "gd": _74, "gs": _74, "gx": _74, "gz": _74, "ha": _74, "hb": _74, "he": _74, "hi": _74, "hk": _74, "hl": _74, "hn": _74, "jl": _74, "js": _74, "jx": _74, "ln": _74, "mo": _74, "nm": _74, "nx": _74, "qh": _74, "sc": _74, "sd": _74, "sh": _74, "sn": _74, "sx": _74, "tj": _74, "tw": _74, "xj": _74, "xz": _74, "yn": _74, "zj": _74 }], "co": [1, { "com": _74, "edu": _74, "gov": _74, "mil": _74, "net": _74, "nom": _74, "org": _74 }], "com": _74, "coop": _74, "cr": [1, { "ac": _74, "co": _74, "ed": _74, "fi": _74, "go": _74, "or": _74, "sa": _74 }], "cu": [1, { "com": _74, "edu": _74, "gob": _74, "inf": _74, "nat": _74, "net": _74, "org": _74 }], "cv": [1, { "com": _74, "edu": _74, "id": _74, "int": _74, "net": _74, "nome": _74, "org": _74, "publ": _74 }], "cw": _80, "cx": _77, "cy": [1, { "ac": _74, "biz": _74, "com": _74, "ekloges": _74, "gov": _74, "ltd": _74, "mil": _74, "net": _74, "org": _74, "press": _74, "pro": _74, "tm": _74 }], "cz": _77, "de": _74, "dj": _74, "dk": _74, "dm": _79, "do": [1, { "art": _74, "com": _74, "edu": _74, "gob": _74, "gov": _74, "mil": _74, "net": _74, "org": _74, "sld": _74, "web": _74 }], "dz": [1, { "art": _74, "asso": _74, "com": _74, "edu": _74, "gov": _74, "net": _74, "org": _74, "pol": _74, "soc": _74, "tm": _74 }], "ec": [1, { "abg": _74, "adm": _74, "agron": _74, "arqt": _74, "art": _74, "bar": _74, "chef": _74, "com": _74, "cont": _74, "cpa": _74, "cue": _74, "dent": _74, "dgn": _74, "disco": _74, "doc": _74, "edu": _74, "eng": _74, "esm": _74, "fin": _74, "fot": _74, "gal": _74, "gob": _74, "gov": _74, "gye": _74, "ibr": _74, "info": _74, "k12": _74, "lat": _74, "loj": _74, "med": _74, "mil": _74, "mktg": _74, "mon": _74, "net": _74, "ntr": _74, "odont": _74, "org": _74, "pro": _74, "prof": _74, "psic": _74, "psiq": _74, "pub": _74, "rio": _74, "rrpp": _74, "sal": _74, "tech": _74, "tul": _74, "tur": _74, "uio": _74, "vet": _74, "xxx": _74 }], "edu": _74, "ee": [1, { "aip": _74, "com": _74, "edu": _74, "fie": _74, "gov": _74, "lib": _74, "med": _74, "org": _74, "pri": _74, "riik": _74 }], "eg": [1, { "ac": _74, "com": _74, "edu": _74, "eun": _74, "gov": _74, "info": _74, "me": _74, "mil": _74, "name": _74, "net": _74, "org": _74, "sci": _74, "sport": _74, "tv": _74 }], "er": _78, "es": [1, { "com": _74, "edu": _74, "gob": _74, "nom": _74, "org": _74 }], "et": [1, { "biz": _74, "com": _74, "edu": _74, "gov": _74, "info": _74, "name": _74, "net": _74, "org": _74 }], "eu": _74, "fi": [1, { "aland": _74 }], "fj": [1, { "ac": _74, "biz": _74, "com": _74, "edu": _74, "gov": _74, "id": _74, "info": _74, "mil": _74, "name": _74, "net": _74, "org": _74, "pro": _74 }], "fk": _78, "fm": _80, "fo": _74, "fr": [1, { "asso": _74, "com": _74, "gouv": _74, "nom": _74, "prd": _74, "tm": _74, "avoues": _74, "cci": _74, "greta": _74, "huissier-justice": _74 }], "ga": _74, "gb": _74, "gd": [1, { "edu": _74, "gov": _74 }], "ge": [1, { "com": _74, "edu": _74, "gov": _74, "net": _74, "org": _74, "pvt": _74, "school": _74 }], "gf": _74, "gg": _81, "gh": [1, { "biz": _74, "com": _74, "edu": _74, "gov": _74, "mil": _74, "net": _74, "org": _74 }], "gi": [1, { "com": _74, "edu": _74, "gov": _74, "ltd": _74, "mod": _74, "org": _74 }], "gl": [1, { "co": _74, "com": _74, "edu": _74, "net": _74, "org": _74 }], "gm": _74, "gn": [1, { "ac": _74, "com": _74, "edu": _74, "gov": _74, "net": _74, "org": _74 }], "gov": _74, "gp": [1, { "asso": _74, "com": _74, "edu": _74, "mobi": _74, "net": _74, "org": _74 }], "gq": _74, "gr": _76, "gs": _74, "gt": [1, { "com": _74, "edu": _74, "gob": _74, "ind": _74, "mil": _74, "net": _74, "org": _74 }], "gu": [1, { "com": _74, "edu": _74, "gov": _74, "guam": _74, "info": _74, "net": _74, "org": _74, "web": _74 }], "gw": _74, "gy": _79, "hk": [1, { "com": _74, "edu": _74, "gov": _74, "idv": _74, "net": _74, "org": _74, "xn--ciqpn": _74, "\u4E2A\u4EBA": _74, "xn--gmqw5a": _74, "\u500B\u4EBA": _74, "xn--55qx5d": _74, "\u516C\u53F8": _74, "xn--mxtq1m": _74, "\u653F\u5E9C": _74, "xn--lcvr32d": _74, "\u654E\u80B2": _74, "xn--wcvs22d": _74, "\u6559\u80B2": _74, "xn--gmq050i": _74, "\u7B87\u4EBA": _74, "xn--uc0atv": _74, "\u7D44\u7E54": _74, "xn--uc0ay4a": _74, "\u7D44\u7EC7": _74, "xn--od0alg": _74, "\u7DB2\u7D61": _74, "xn--zf0avx": _74, "\u7DB2\u7EDC": _74, "xn--mk0axi": _74, "\u7EC4\u7E54": _74, "xn--tn0ag": _74, "\u7EC4\u7EC7": _74, "xn--od0aq3b": _74, "\u7F51\u7D61": _74, "xn--io0a7i": _74, "\u7F51\u7EDC": _74 }], "hm": _74, "hn": [1, { "com": _74, "edu": _74, "gob": _74, "mil": _74, "net": _74, "org": _74 }], "hr": [1, { "com": _74, "from": _74, "iz": _74, "name": _74 }], "ht": [1, { "adult": _74, "art": _74, "asso": _74, "com": _74, "coop": _74, "edu": _74, "firm": _74, "gouv": _74, "info": _74, "med": _74, "net": _74, "org": _74, "perso": _74, "pol": _74, "pro": _74, "rel": _74, "shop": _74 }], "hu": [1, { "2000": _74, "agrar": _74, "bolt": _74, "casino": _74, "city": _74, "co": _74, "erotica": _74, "erotika": _74, "film": _74, "forum": _74, "games": _74, "hotel": _74, "info": _74, "ingatlan": _74, "jogasz": _74, "konyvelo": _74, "lakas": _74, "media": _74, "news": _74, "org": _74, "priv": _74, "reklam": _74, "sex": _74, "shop": _74, "sport": _74, "suli": _74, "szex": _74, "tm": _74, "tozsde": _74, "utazas": _74, "video": _74 }], "id": [1, { "ac": _74, "biz": _74, "co": _74, "desa": _74, "go": _74, "kop": _74, "mil": _74, "my": _74, "net": _74, "or": _74, "ponpes": _74, "sch": _74, "web": _74, "xn--9tfky": _74, "\u1B29\u1B2E\u1B36": _74 }], "ie": _77, "il": [1, { "ac": _74, "co": _74, "gov": _74, "idf": _74, "k12": _74, "muni": _74, "net": _74, "org": _74 }], "xn--4dbrk0ce": [1, { "xn--4dbgdty6c": _74, "xn--5dbhl8d": _74, "xn--8dbq2a": _74, "xn--hebda8b": _74 }], "\u05D9\u05E9\u05E8\u05D0\u05DC": [1, { "\u05D0\u05E7\u05D3\u05DE\u05D9\u05D4": _74, "\u05D9\u05E9\u05D5\u05D1": _74, "\u05E6\u05D4\u05DC": _74, "\u05DE\u05DE\u05E9\u05DC": _74 }], "im": [1, { "ac": _74, "co": [1, { "ltd": _74, "plc": _74 }], "com": _74, "net": _74, "org": _74, "tt": _74, "tv": _74 }], "in": [1, { "5g": _74, "6g": _74, "ac": _74, "ai": _74, "am": _74, "bank": _74, "bihar": _74, "biz": _74, "business": _74, "ca": _74, "cn": _74, "co": _74, "com": _74, "coop": _74, "cs": _74, "delhi": _74, "dr": _74, "edu": _74, "er": _74, "fin": _74, "firm": _74, "gen": _74, "gov": _74, "gujarat": _74, "ind": _74, "info": _74, "int": _74, "internet": _74, "io": _74, "me": _74, "mil": _74, "net": _74, "nic": _74, "org": _74, "pg": _74, "post": _74, "pro": _74, "res": _74, "travel": _74, "tv": _74, "uk": _74, "up": _74, "us": _74 }], "info": _74, "int": [1, { "eu": _74 }], "io": _82, "iq": _75, "ir": [1, { "ac": _74, "co": _74, "gov": _74, "id": _74, "net": _74, "org": _74, "sch": _74, "xn--mgba3a4f16a": _74, "\u0627\u06CC\u0631\u0627\u0646": _74, "xn--mgba3a4fra": _74, "\u0627\u064A\u0631\u0627\u0646": _74 }], "is": _74, "it": [1, { "edu": _74, "gov": _74, "abr": _74, "abruzzo": _74, "aosta-valley": _74, "aostavalley": _74, "bas": _74, "basilicata": _74, "cal": _74, "calabria": _74, "cam": _74, "campania": _74, "emilia-romagna": _74, "emiliaromagna": _74, "emr": _74, "friuli-v-giulia": _74, "friuli-ve-giulia": _74, "friuli-vegiulia": _74, "friuli-venezia-giulia": _74, "friuli-veneziagiulia": _74, "friuli-vgiulia": _74, "friuliv-giulia": _74, "friulive-giulia": _74, "friulivegiulia": _74, "friulivenezia-giulia": _74, "friuliveneziagiulia": _74, "friulivgiulia": _74, "fvg": _74, "laz": _74, "lazio": _74, "lig": _74, "liguria": _74, "lom": _74, "lombardia": _74, "lombardy": _74, "lucania": _74, "mar": _74, "marche": _74, "mol": _74, "molise": _74, "piedmont": _74, "piemonte": _74, "pmn": _74, "pug": _74, "puglia": _74, "sar": _74, "sardegna": _74, "sardinia": _74, "sic": _74, "sicilia": _74, "sicily": _74, "taa": _74, "tos": _74, "toscana": _74, "trentin-sud-tirol": _74, "xn--trentin-sd-tirol-rzb": _74, "trentin-s\xFCd-tirol": _74, "trentin-sudtirol": _74, "xn--trentin-sdtirol-7vb": _74, "trentin-s\xFCdtirol": _74, "trentin-sued-tirol": _74, "trentin-suedtirol": _74, "trentino": _74, "trentino-a-adige": _74, "trentino-aadige": _74, "trentino-alto-adige": _74, "trentino-altoadige": _74, "trentino-s-tirol": _74, "trentino-stirol": _74, "trentino-sud-tirol": _74, "xn--trentino-sd-tirol-c3b": _74, "trentino-s\xFCd-tirol": _74, "trentino-sudtirol": _74, "xn--trentino-sdtirol-szb": _74, "trentino-s\xFCdtirol": _74, "trentino-sued-tirol": _74, "trentino-suedtirol": _74, "trentinoa-adige": _74, "trentinoaadige": _74, "trentinoalto-adige": _74, "trentinoaltoadige": _74, "trentinos-tirol": _74, "trentinostirol": _74, "trentinosud-tirol": _74, "xn--trentinosd-tirol-rzb": _74, "trentinos\xFCd-tirol": _74, "trentinosudtirol": _74, "xn--trentinosdtirol-7vb": _74, "trentinos\xFCdtirol": _74, "trentinosued-tirol": _74, "trentinosuedtirol": _74, "trentinsud-tirol": _74, "xn--trentinsd-tirol-6vb": _74, "trentins\xFCd-tirol": _74, "trentinsudtirol": _74, "xn--trentinsdtirol-nsb": _74, "trentins\xFCdtirol": _74, "trentinsued-tirol": _74, "trentinsuedtirol": _74, "tuscany": _74, "umb": _74, "umbria": _74, "val-d-aosta": _74, "val-daosta": _74, "vald-aosta": _74, "valdaosta": _74, "valle-aosta": _74, "valle-d-aosta": _74, "valle-daosta": _74, "valleaosta": _74, "valled-aosta": _74, "valledaosta": _74, "vallee-aoste": _74, "xn--valle-aoste-ebb": _74, "vall\xE9e-aoste": _74, "vallee-d-aoste": _74, "xn--valle-d-aoste-ehb": _74, "vall\xE9e-d-aoste": _74, "valleeaoste": _74, "xn--valleaoste-e7a": _74, "vall\xE9eaoste": _74, "valleedaoste": _74, "xn--valledaoste-ebb": _74, "vall\xE9edaoste": _74, "vao": _74, "vda": _74, "ven": _74, "veneto": _74, "ag": _74, "agrigento": _74, "al": _74, "alessandria": _74, "alto-adige": _74, "altoadige": _74, "an": _74, "ancona": _74, "andria-barletta-trani": _74, "andria-trani-barletta": _74, "andriabarlettatrani": _74, "andriatranibarletta": _74, "ao": _74, "aosta": _74, "aoste": _74, "ap": _74, "aq": _74, "aquila": _74, "ar": _74, "arezzo": _74, "ascoli-piceno": _74, "ascolipiceno": _74, "asti": _74, "at": _74, "av": _74, "avellino": _74, "ba": _74, "balsan": _74, "balsan-sudtirol": _74, "xn--balsan-sdtirol-nsb": _74, "balsan-s\xFCdtirol": _74, "balsan-suedtirol": _74, "bari": _74, "barletta-trani-andria": _74, "barlettatraniandria": _74, "belluno": _74, "benevento": _74, "bergamo": _74, "bg": _74, "bi": _74, "biella": _74, "bl": _74, "bn": _74, "bo": _74, "bologna": _74, "bolzano": _74, "bolzano-altoadige": _74, "bozen": _74, "bozen-sudtirol": _74, "xn--bozen-sdtirol-2ob": _74, "bozen-s\xFCdtirol": _74, "bozen-suedtirol": _74, "br": _74, "brescia": _74, "brindisi": _74, "bs": _74, "bt": _74, "bulsan": _74, "bulsan-sudtirol": _74, "xn--bulsan-sdtirol-nsb": _74, "bulsan-s\xFCdtirol": _74, "bulsan-suedtirol": _74, "bz": _74, "ca": _74, "cagliari": _74, "caltanissetta": _74, "campidano-medio": _74, "campidanomedio": _74, "campobasso": _74, "carbonia-iglesias": _74, "carboniaiglesias": _74, "carrara-massa": _74, "carraramassa": _74, "caserta": _74, "catania": _74, "catanzaro": _74, "cb": _74, "ce": _74, "cesena-forli": _74, "xn--cesena-forl-mcb": _74, "cesena-forl\xEC": _74, "cesenaforli": _74, "xn--cesenaforl-i8a": _74, "cesenaforl\xEC": _74, "ch": _74, "chieti": _74, "ci": _74, "cl": _74, "cn": _74, "co": _74, "como": _74, "cosenza": _74, "cr": _74, "cremona": _74, "crotone": _74, "cs": _74, "ct": _74, "cuneo": _74, "cz": _74, "dell-ogliastra": _74, "dellogliastra": _74, "en": _74, "enna": _74, "fc": _74, "fe": _74, "fermo": _74, "ferrara": _74, "fg": _74, "fi": _74, "firenze": _74, "florence": _74, "fm": _74, "foggia": _74, "forli-cesena": _74, "xn--forl-cesena-fcb": _74, "forl\xEC-cesena": _74, "forlicesena": _74, "xn--forlcesena-c8a": _74, "forl\xECcesena": _74, "fr": _74, "frosinone": _74, "ge": _74, "genoa": _74, "genova": _74, "go": _74, "gorizia": _74, "gr": _74, "grosseto": _74, "iglesias-carbonia": _74, "iglesiascarbonia": _74, "im": _74, "imperia": _74, "is": _74, "isernia": _74, "kr": _74, "la-spezia": _74, "laquila": _74, "laspezia": _74, "latina": _74, "lc": _74, "le": _74, "lecce": _74, "lecco": _74, "li": _74, "livorno": _74, "lo": _74, "lodi": _74, "lt": _74, "lu": _74, "lucca": _74, "macerata": _74, "mantova": _74, "massa-carrara": _74, "massacarrara": _74, "matera": _74, "mb": _74, "mc": _74, "me": _74, "medio-campidano": _74, "mediocampidano": _74, "messina": _74, "mi": _74, "milan": _74, "milano": _74, "mn": _74, "mo": _74, "modena": _74, "monza": _74, "monza-brianza": _74, "monza-e-della-brianza": _74, "monzabrianza": _74, "monzaebrianza": _74, "monzaedellabrianza": _74, "ms": _74, "mt": _74, "na": _74, "naples": _74, "napoli": _74, "no": _74, "novara": _74, "nu": _74, "nuoro": _74, "og": _74, "ogliastra": _74, "olbia-tempio": _74, "olbiatempio": _74, "or": _74, "oristano": _74, "ot": _74, "pa": _74, "padova": _74, "padua": _74, "palermo": _74, "parma": _74, "pavia": _74, "pc": _74, "pd": _74, "pe": _74, "perugia": _74, "pesaro-urbino": _74, "pesarourbino": _74, "pescara": _74, "pg": _74, "pi": _74, "piacenza": _74, "pisa": _74, "pistoia": _74, "pn": _74, "po": _74, "pordenone": _74, "potenza": _74, "pr": _74, "prato": _74, "pt": _74, "pu": _74, "pv": _74, "pz": _74, "ra": _74, "ragusa": _74, "ravenna": _74, "rc": _74, "re": _74, "reggio-calabria": _74, "reggio-emilia": _74, "reggiocalabria": _74, "reggioemilia": _74, "rg": _74, "ri": _74, "rieti": _74, "rimini": _74, "rm": _74, "rn": _74, "ro": _74, "roma": _74, "rome": _74, "rovigo": _74, "sa": _74, "salerno": _74, "sassari": _74, "savona": _74, "si": _74, "siena": _74, "siracusa": _74, "so": _74, "sondrio": _74, "sp": _74, "sr": _74, "ss": _74, "xn--sdtirol-n2a": _74, "s\xFCdtirol": _74, "suedtirol": _74, "sv": _74, "ta": _74, "taranto": _74, "te": _74, "tempio-olbia": _74, "tempioolbia": _74, "teramo": _74, "terni": _74, "tn": _74, "to": _74, "torino": _74, "tp": _74, "tr": _74, "trani-andria-barletta": _74, "trani-barletta-andria": _74, "traniandriabarletta": _74, "tranibarlettaandria": _74, "trapani": _74, "trento": _74, "treviso": _74, "trieste": _74, "ts": _74, "turin": _74, "tv": _74, "ud": _74, "udine": _74, "urbino-pesaro": _74, "urbinopesaro": _74, "va": _74, "varese": _74, "vb": _74, "vc": _74, "ve": _74, "venezia": _74, "venice": _74, "verbania": _74, "vercelli": _74, "verona": _74, "vi": _74, "vibo-valentia": _74, "vibovalentia": _74, "vicenza": _74, "viterbo": _74, "vr": _74, "vs": _74, "vt": _74, "vv": _74 }], "je": _81, "jm": _78, "jo": [1, { "agri": _74, "ai": _74, "com": _74, "edu": _74, "eng": _74, "fm": _74, "gov": _74, "mil": _74, "net": _74, "org": _74, "per": _74, "phd": _74, "sch": _74, "tv": _74 }], "jobs": _74, "jp": [1, { "ac": _74, "ad": _74, "co": _74, "ed": _74, "go": _74, "gr": _74, "lg": _74, "ne": _74, "or": _74, "aichi": [1, { "aisai": _74, "ama": _74, "anjo": _74, "asuke": _74, "chiryu": _74, "chita": _74, "fuso": _74, "gamagori": _74, "handa": _74, "hazu": _74, "hekinan": _74, "higashiura": _74, "ichinomiya": _74, "inazawa": _74, "inuyama": _74, "isshiki": _74, "iwakura": _74, "kanie": _74, "kariya": _74, "kasugai": _74, "kira": _74, "kiyosu": _74, "komaki": _74, "konan": _74, "kota": _74, "mihama": _74, "miyoshi": _74, "nishio": _74, "nisshin": _74, "obu": _74, "oguchi": _74, "oharu": _74, "okazaki": _74, "owariasahi": _74, "seto": _74, "shikatsu": _74, "shinshiro": _74, "shitara": _74, "tahara": _74, "takahama": _74, "tobishima": _74, "toei": _74, "togo": _74, "tokai": _74, "tokoname": _74, "toyoake": _74, "toyohashi": _74, "toyokawa": _74, "toyone": _74, "toyota": _74, "tsushima": _74, "yatomi": _74 }], "akita": [1, { "akita": _74, "daisen": _74, "fujisato": _74, "gojome": _74, "hachirogata": _74, "happou": _74, "higashinaruse": _74, "honjo": _74, "honjyo": _74, "ikawa": _74, "kamikoani": _74, "kamioka": _74, "katagami": _74, "kazuno": _74, "kitaakita": _74, "kosaka": _74, "kyowa": _74, "misato": _74, "mitane": _74, "moriyoshi": _74, "nikaho": _74, "noshiro": _74, "odate": _74, "oga": _74, "ogata": _74, "semboku": _74, "yokote": _74, "yurihonjo": _74 }], "aomori": [1, { "aomori": _74, "gonohe": _74, "hachinohe": _74, "hashikami": _74, "hiranai": _74, "hirosaki": _74, "itayanagi": _74, "kuroishi": _74, "misawa": _74, "mutsu": _74, "nakadomari": _74, "noheji": _74, "oirase": _74, "owani": _74, "rokunohe": _74, "sannohe": _74, "shichinohe": _74, "shingo": _74, "takko": _74, "towada": _74, "tsugaru": _74, "tsuruta": _74 }], "chiba": [1, { "abiko": _74, "asahi": _74, "chonan": _74, "chosei": _74, "choshi": _74, "chuo": _74, "funabashi": _74, "futtsu": _74, "hanamigawa": _74, "ichihara": _74, "ichikawa": _74, "ichinomiya": _74, "inzai": _74, "isumi": _74, "kamagaya": _74, "kamogawa": _74, "kashiwa": _74, "katori": _74, "katsuura": _74, "kimitsu": _74, "kisarazu": _74, "kozaki": _74, "kujukuri": _74, "kyonan": _74, "matsudo": _74, "midori": _74, "mihama": _74, "minamiboso": _74, "mobara": _74, "mutsuzawa": _74, "nagara": _74, "nagareyama": _74, "narashino": _74, "narita": _74, "noda": _74, "oamishirasato": _74, "omigawa": _74, "onjuku": _74, "otaki": _74, "sakae": _74, "sakura": _74, "shimofusa": _74, "shirako": _74, "shiroi": _74, "shisui": _74, "sodegaura": _74, "sosa": _74, "tako": _74, "tateyama": _74, "togane": _74, "tohnosho": _74, "tomisato": _74, "urayasu": _74, "yachimata": _74, "yachiyo": _74, "yokaichiba": _74, "yokoshibahikari": _74, "yotsukaido": _74 }], "ehime": [1, { "ainan": _74, "honai": _74, "ikata": _74, "imabari": _74, "iyo": _74, "kamijima": _74, "kihoku": _74, "kumakogen": _74, "masaki": _74, "matsuno": _74, "matsuyama": _74, "namikata": _74, "niihama": _74, "ozu": _74, "saijo": _74, "seiyo": _74, "shikokuchuo": _74, "tobe": _74, "toon": _74, "uchiko": _74, "uwajima": _74, "yawatahama": _74 }], "fukui": [1, { "echizen": _74, "eiheiji": _74, "fukui": _74, "ikeda": _74, "katsuyama": _74, "mihama": _74, "minamiechizen": _74, "obama": _74, "ohi": _74, "ono": _74, "sabae": _74, "sakai": _74, "takahama": _74, "tsuruga": _74, "wakasa": _74 }], "fukuoka": [1, { "ashiya": _74, "buzen": _74, "chikugo": _74, "chikuho": _74, "chikujo": _74, "chikushino": _74, "chikuzen": _74, "chuo": _74, "dazaifu": _74, "fukuchi": _74, "hakata": _74, "higashi": _74, "hirokawa": _74, "hisayama": _74, "iizuka": _74, "inatsuki": _74, "kaho": _74, "kasuga": _74, "kasuya": _74, "kawara": _74, "keisen": _74, "koga": _74, "kurate": _74, "kurogi": _74, "kurume": _74, "minami": _74, "miyako": _74, "miyama": _74, "miyawaka": _74, "mizumaki": _74, "munakata": _74, "nakagawa": _74, "nakama": _74, "nishi": _74, "nogata": _74, "ogori": _74, "okagaki": _74, "okawa": _74, "oki": _74, "omuta": _74, "onga": _74, "onojo": _74, "oto": _74, "saigawa": _74, "sasaguri": _74, "shingu": _74, "shinyoshitomi": _74, "shonai": _74, "soeda": _74, "sue": _74, "tachiarai": _74, "tagawa": _74, "takata": _74, "toho": _74, "toyotsu": _74, "tsuiki": _74, "ukiha": _74, "umi": _74, "usui": _74, "yamada": _74, "yame": _74, "yanagawa": _74, "yukuhashi": _74 }], "fukushima": [1, { "aizubange": _74, "aizumisato": _74, "aizuwakamatsu": _74, "asakawa": _74, "bandai": _74, "date": _74, "fukushima": _74, "furudono": _74, "futaba": _74, "hanawa": _74, "higashi": _74, "hirata": _74, "hirono": _74, "iitate": _74, "inawashiro": _74, "ishikawa": _74, "iwaki": _74, "izumizaki": _74, "kagamiishi": _74, "kaneyama": _74, "kawamata": _74, "kitakata": _74, "kitashiobara": _74, "koori": _74, "koriyama": _74, "kunimi": _74, "miharu": _74, "mishima": _74, "namie": _74, "nango": _74, "nishiaizu": _74, "nishigo": _74, "okuma": _74, "omotego": _74, "ono": _74, "otama": _74, "samegawa": _74, "shimogo": _74, "shirakawa": _74, "showa": _74, "soma": _74, "sukagawa": _74, "taishin": _74, "tamakawa": _74, "tanagura": _74, "tenei": _74, "yabuki": _74, "yamato": _74, "yamatsuri": _74, "yanaizu": _74, "yugawa": _74 }], "gifu": [1, { "anpachi": _74, "ena": _74, "gifu": _74, "ginan": _74, "godo": _74, "gujo": _74, "hashima": _74, "hichiso": _74, "hida": _74, "higashishirakawa": _74, "ibigawa": _74, "ikeda": _74, "kakamigahara": _74, "kani": _74, "kasahara": _74, "kasamatsu": _74, "kawaue": _74, "kitagata": _74, "mino": _74, "minokamo": _74, "mitake": _74, "mizunami": _74, "motosu": _74, "nakatsugawa": _74, "ogaki": _74, "sakahogi": _74, "seki": _74, "sekigahara": _74, "shirakawa": _74, "tajimi": _74, "takayama": _74, "tarui": _74, "toki": _74, "tomika": _74, "wanouchi": _74, "yamagata": _74, "yaotsu": _74, "yoro": _74 }], "gunma": [1, { "annaka": _74, "chiyoda": _74, "fujioka": _74, "higashiagatsuma": _74, "isesaki": _74, "itakura": _74, "kanna": _74, "kanra": _74, "katashina": _74, "kawaba": _74, "kiryu": _74, "kusatsu": _74, "maebashi": _74, "meiwa": _74, "midori": _74, "minakami": _74, "naganohara": _74, "nakanojo": _74, "nanmoku": _74, "numata": _74, "oizumi": _74, "ora": _74, "ota": _74, "shibukawa": _74, "shimonita": _74, "shinto": _74, "showa": _74, "takasaki": _74, "takayama": _74, "tamamura": _74, "tatebayashi": _74, "tomioka": _74, "tsukiyono": _74, "tsumagoi": _74, "ueno": _74, "yoshioka": _74 }], "hiroshima": [1, { "asaminami": _74, "daiwa": _74, "etajima": _74, "fuchu": _74, "fukuyama": _74, "hatsukaichi": _74, "higashihiroshima": _74, "hongo": _74, "jinsekikogen": _74, "kaita": _74, "kui": _74, "kumano": _74, "kure": _74, "mihara": _74, "miyoshi": _74, "naka": _74, "onomichi": _74, "osakikamijima": _74, "otake": _74, "saka": _74, "sera": _74, "seranishi": _74, "shinichi": _74, "shobara": _74, "takehara": _74 }], "hokkaido": [1, { "abashiri": _74, "abira": _74, "aibetsu": _74, "akabira": _74, "akkeshi": _74, "asahikawa": _74, "ashibetsu": _74, "ashoro": _74, "assabu": _74, "atsuma": _74, "bibai": _74, "biei": _74, "bifuka": _74, "bihoro": _74, "biratori": _74, "chippubetsu": _74, "chitose": _74, "date": _74, "ebetsu": _74, "embetsu": _74, "eniwa": _74, "erimo": _74, "esan": _74, "esashi": _74, "fukagawa": _74, "fukushima": _74, "furano": _74, "furubira": _74, "haboro": _74, "hakodate": _74, "hamatonbetsu": _74, "hidaka": _74, "higashikagura": _74, "higashikawa": _74, "hiroo": _74, "hokuryu": _74, "hokuto": _74, "honbetsu": _74, "horokanai": _74, "horonobe": _74, "ikeda": _74, "imakane": _74, "ishikari": _74, "iwamizawa": _74, "iwanai": _74, "kamifurano": _74, "kamikawa": _74, "kamishihoro": _74, "kamisunagawa": _74, "kamoenai": _74, "kayabe": _74, "kembuchi": _74, "kikonai": _74, "kimobetsu": _74, "kitahiroshima": _74, "kitami": _74, "kiyosato": _74, "koshimizu": _74, "kunneppu": _74, "kuriyama": _74, "kuromatsunai": _74, "kushiro": _74, "kutchan": _74, "kyowa": _74, "mashike": _74, "matsumae": _74, "mikasa": _74, "minamifurano": _74, "mombetsu": _74, "moseushi": _74, "mukawa": _74, "muroran": _74, "naie": _74, "nakagawa": _74, "nakasatsunai": _74, "nakatombetsu": _74, "nanae": _74, "nanporo": _74, "nayoro": _74, "nemuro": _74, "niikappu": _74, "niki": _74, "nishiokoppe": _74, "noboribetsu": _74, "numata": _74, "obihiro": _74, "obira": _74, "oketo": _74, "okoppe": _74, "otaru": _74, "otobe": _74, "otofuke": _74, "otoineppu": _74, "oumu": _74, "ozora": _74, "pippu": _74, "rankoshi": _74, "rebun": _74, "rikubetsu": _74, "rishiri": _74, "rishirifuji": _74, "saroma": _74, "sarufutsu": _74, "shakotan": _74, "shari": _74, "shibecha": _74, "shibetsu": _74, "shikabe": _74, "shikaoi": _74, "shimamaki": _74, "shimizu": _74, "shimokawa": _74, "shinshinotsu": _74, "shintoku": _74, "shiranuka": _74, "shiraoi": _74, "shiriuchi": _74, "sobetsu": _74, "sunagawa": _74, "taiki": _74, "takasu": _74, "takikawa": _74, "takinoue": _74, "teshikaga": _74, "tobetsu": _74, "tohma": _74, "tomakomai": _74, "tomari": _74, "toya": _74, "toyako": _74, "toyotomi": _74, "toyoura": _74, "tsubetsu": _74, "tsukigata": _74, "urakawa": _74, "urausu": _74, "uryu": _74, "utashinai": _74, "wakkanai": _74, "wassamu": _74, "yakumo": _74, "yoichi": _74 }], "hyogo": [1, { "aioi": _74, "akashi": _74, "ako": _74, "amagasaki": _74, "aogaki": _74, "asago": _74, "ashiya": _74, "awaji": _74, "fukusaki": _74, "goshiki": _74, "harima": _74, "himeji": _74, "ichikawa": _74, "inagawa": _74, "itami": _74, "kakogawa": _74, "kamigori": _74, "kamikawa": _74, "kasai": _74, "kasuga": _74, "kawanishi": _74, "miki": _74, "minamiawaji": _74, "nishinomiya": _74, "nishiwaki": _74, "ono": _74, "sanda": _74, "sannan": _74, "sasayama": _74, "sayo": _74, "shingu": _74, "shinonsen": _74, "shiso": _74, "sumoto": _74, "taishi": _74, "taka": _74, "takarazuka": _74, "takasago": _74, "takino": _74, "tamba": _74, "tatsuno": _74, "toyooka": _74, "yabu": _74, "yashiro": _74, "yoka": _74, "yokawa": _74 }], "ibaraki": [1, { "ami": _74, "asahi": _74, "bando": _74, "chikusei": _74, "daigo": _74, "fujishiro": _74, "hitachi": _74, "hitachinaka": _74, "hitachiomiya": _74, "hitachiota": _74, "ibaraki": _74, "ina": _74, "inashiki": _74, "itako": _74, "iwama": _74, "joso": _74, "kamisu": _74, "kasama": _74, "kashima": _74, "kasumigaura": _74, "koga": _74, "miho": _74, "mito": _74, "moriya": _74, "naka": _74, "namegata": _74, "oarai": _74, "ogawa": _74, "omitama": _74, "ryugasaki": _74, "sakai": _74, "sakuragawa": _74, "shimodate": _74, "shimotsuma": _74, "shirosato": _74, "sowa": _74, "suifu": _74, "takahagi": _74, "tamatsukuri": _74, "tokai": _74, "tomobe": _74, "tone": _74, "toride": _74, "tsuchiura": _74, "tsukuba": _74, "uchihara": _74, "ushiku": _74, "yachiyo": _74, "yamagata": _74, "yawara": _74, "yuki": _74 }], "ishikawa": [1, { "anamizu": _74, "hakui": _74, "hakusan": _74, "kaga": _74, "kahoku": _74, "kanazawa": _74, "kawakita": _74, "komatsu": _74, "nakanoto": _74, "nanao": _74, "nomi": _74, "nonoichi": _74, "noto": _74, "shika": _74, "suzu": _74, "tsubata": _74, "tsurugi": _74, "uchinada": _74, "wajima": _74 }], "iwate": [1, { "fudai": _74, "fujisawa": _74, "hanamaki": _74, "hiraizumi": _74, "hirono": _74, "ichinohe": _74, "ichinoseki": _74, "iwaizumi": _74, "iwate": _74, "joboji": _74, "kamaishi": _74, "kanegasaki": _74, "karumai": _74, "kawai": _74, "kitakami": _74, "kuji": _74, "kunohe": _74, "kuzumaki": _74, "miyako": _74, "mizusawa": _74, "morioka": _74, "ninohe": _74, "noda": _74, "ofunato": _74, "oshu": _74, "otsuchi": _74, "rikuzentakata": _74, "shiwa": _74, "shizukuishi": _74, "sumita": _74, "tanohata": _74, "tono": _74, "yahaba": _74, "yamada": _74 }], "kagawa": [1, { "ayagawa": _74, "higashikagawa": _74, "kanonji": _74, "kotohira": _74, "manno": _74, "marugame": _74, "mitoyo": _74, "naoshima": _74, "sanuki": _74, "tadotsu": _74, "takamatsu": _74, "tonosho": _74, "uchinomi": _74, "utazu": _74, "zentsuji": _74 }], "kagoshima": [1, { "akune": _74, "amami": _74, "hioki": _74, "isa": _74, "isen": _74, "izumi": _74, "kagoshima": _74, "kanoya": _74, "kawanabe": _74, "kinko": _74, "kouyama": _74, "makurazaki": _74, "matsumoto": _74, "minamitane": _74, "nakatane": _74, "nishinoomote": _74, "satsumasendai": _74, "soo": _74, "tarumizu": _74, "yusui": _74 }], "kanagawa": [1, { "aikawa": _74, "atsugi": _74, "ayase": _74, "chigasaki": _74, "ebina": _74, "fujisawa": _74, "hadano": _74, "hakone": _74, "hiratsuka": _74, "isehara": _74, "kaisei": _74, "kamakura": _74, "kiyokawa": _74, "matsuda": _74, "minamiashigara": _74, "miura": _74, "nakai": _74, "ninomiya": _74, "odawara": _74, "oi": _74, "oiso": _74, "sagamihara": _74, "samukawa": _74, "tsukui": _74, "yamakita": _74, "yamato": _74, "yokosuka": _74, "yugawara": _74, "zama": _74, "zushi": _74 }], "kochi": [1, { "aki": _74, "geisei": _74, "hidaka": _74, "higashitsuno": _74, "ino": _74, "kagami": _74, "kami": _74, "kitagawa": _74, "kochi": _74, "mihara": _74, "motoyama": _74, "muroto": _74, "nahari": _74, "nakamura": _74, "nankoku": _74, "nishitosa": _74, "niyodogawa": _74, "ochi": _74, "okawa": _74, "otoyo": _74, "otsuki": _74, "sakawa": _74, "sukumo": _74, "susaki": _74, "tosa": _74, "tosashimizu": _74, "toyo": _74, "tsuno": _74, "umaji": _74, "yasuda": _74, "yusuhara": _74 }], "kumamoto": [1, { "amakusa": _74, "arao": _74, "aso": _74, "choyo": _74, "gyokuto": _74, "kamiamakusa": _74, "kikuchi": _74, "kumamoto": _74, "mashiki": _74, "mifune": _74, "minamata": _74, "minamioguni": _74, "nagasu": _74, "nishihara": _74, "oguni": _74, "ozu": _74, "sumoto": _74, "takamori": _74, "uki": _74, "uto": _74, "yamaga": _74, "yamato": _74, "yatsushiro": _74 }], "kyoto": [1, { "ayabe": _74, "fukuchiyama": _74, "higashiyama": _74, "ide": _74, "ine": _74, "joyo": _74, "kameoka": _74, "kamo": _74, "kita": _74, "kizu": _74, "kumiyama": _74, "kyotamba": _74, "kyotanabe": _74, "kyotango": _74, "maizuru": _74, "minami": _74, "minamiyamashiro": _74, "miyazu": _74, "muko": _74, "nagaokakyo": _74, "nakagyo": _74, "nantan": _74, "oyamazaki": _74, "sakyo": _74, "seika": _74, "tanabe": _74, "uji": _74, "ujitawara": _74, "wazuka": _74, "yamashina": _74, "yawata": _74 }], "mie": [1, { "asahi": _74, "inabe": _74, "ise": _74, "kameyama": _74, "kawagoe": _74, "kiho": _74, "kisosaki": _74, "kiwa": _74, "komono": _74, "kumano": _74, "kuwana": _74, "matsusaka": _74, "meiwa": _74, "mihama": _74, "minamiise": _74, "misugi": _74, "miyama": _74, "nabari": _74, "shima": _74, "suzuka": _74, "tado": _74, "taiki": _74, "taki": _74, "tamaki": _74, "toba": _74, "tsu": _74, "udono": _74, "ureshino": _74, "watarai": _74, "yokkaichi": _74 }], "miyagi": [1, { "furukawa": _74, "higashimatsushima": _74, "ishinomaki": _74, "iwanuma": _74, "kakuda": _74, "kami": _74, "kawasaki": _74, "marumori": _74, "matsushima": _74, "minamisanriku": _74, "misato": _74, "murata": _74, "natori": _74, "ogawara": _74, "ohira": _74, "onagawa": _74, "osaki": _74, "rifu": _74, "semine": _74, "shibata": _74, "shichikashuku": _74, "shikama": _74, "shiogama": _74, "shiroishi": _74, "tagajo": _74, "taiwa": _74, "tome": _74, "tomiya": _74, "wakuya": _74, "watari": _74, "yamamoto": _74, "zao": _74 }], "miyazaki": [1, { "aya": _74, "ebino": _74, "gokase": _74, "hyuga": _74, "kadogawa": _74, "kawaminami": _74, "kijo": _74, "kitagawa": _74, "kitakata": _74, "kitaura": _74, "kobayashi": _74, "kunitomi": _74, "kushima": _74, "mimata": _74, "miyakonojo": _74, "miyazaki": _74, "morotsuka": _74, "nichinan": _74, "nishimera": _74, "nobeoka": _74, "saito": _74, "shiiba": _74, "shintomi": _74, "takaharu": _74, "takanabe": _74, "takazaki": _74, "tsuno": _74 }], "nagano": [1, { "achi": _74, "agematsu": _74, "anan": _74, "aoki": _74, "asahi": _74, "azumino": _74, "chikuhoku": _74, "chikuma": _74, "chino": _74, "fujimi": _74, "hakuba": _74, "hara": _74, "hiraya": _74, "iida": _74, "iijima": _74, "iiyama": _74, "iizuna": _74, "ikeda": _74, "ikusaka": _74, "ina": _74, "karuizawa": _74, "kawakami": _74, "kiso": _74, "kisofukushima": _74, "kitaaiki": _74, "komagane": _74, "komoro": _74, "matsukawa": _74, "matsumoto": _74, "miasa": _74, "minamiaiki": _74, "minamimaki": _74, "minamiminowa": _74, "minowa": _74, "miyada": _74, "miyota": _74, "mochizuki": _74, "nagano": _74, "nagawa": _74, "nagiso": _74, "nakagawa": _74, "nakano": _74, "nozawaonsen": _74, "obuse": _74, "ogawa": _74, "okaya": _74, "omachi": _74, "omi": _74, "ookuwa": _74, "ooshika": _74, "otaki": _74, "otari": _74, "sakae": _74, "sakaki": _74, "saku": _74, "sakuho": _74, "shimosuwa": _74, "shinanomachi": _74, "shiojiri": _74, "suwa": _74, "suzaka": _74, "takagi": _74, "takamori": _74, "takayama": _74, "tateshina": _74, "tatsuno": _74, "togakushi": _74, "togura": _74, "tomi": _74, "ueda": _74, "wada": _74, "yamagata": _74, "yamanouchi": _74, "yasaka": _74, "yasuoka": _74 }], "nagasaki": [1, { "chijiwa": _74, "futsu": _74, "goto": _74, "hasami": _74, "hirado": _74, "iki": _74, "isahaya": _74, "kawatana": _74, "kuchinotsu": _74, "matsuura": _74, "nagasaki": _74, "obama": _74, "omura": _74, "oseto": _74, "saikai": _74, "sasebo": _74, "seihi": _74, "shimabara": _74, "shinkamigoto": _74, "togitsu": _74, "tsushima": _74, "unzen": _74 }], "nara": [1, { "ando": _74, "gose": _74, "heguri": _74, "higashiyoshino": _74, "ikaruga": _74, "ikoma": _74, "kamikitayama": _74, "kanmaki": _74, "kashiba": _74, "kashihara": _74, "katsuragi": _74, "kawai": _74, "kawakami": _74, "kawanishi": _74, "koryo": _74, "kurotaki": _74, "mitsue": _74, "miyake": _74, "nara": _74, "nosegawa": _74, "oji": _74, "ouda": _74, "oyodo": _74, "sakurai": _74, "sango": _74, "shimoichi": _74, "shimokitayama": _74, "shinjo": _74, "soni": _74, "takatori": _74, "tawaramoto": _74, "tenkawa": _74, "tenri": _74, "uda": _74, "yamatokoriyama": _74, "yamatotakada": _74, "yamazoe": _74, "yoshino": _74 }], "niigata": [1, { "aga": _74, "agano": _74, "gosen": _74, "itoigawa": _74, "izumozaki": _74, "joetsu": _74, "kamo": _74, "kariwa": _74, "kashiwazaki": _74, "minamiuonuma": _74, "mitsuke": _74, "muika": _74, "murakami": _74, "myoko": _74, "nagaoka": _74, "niigata": _74, "ojiya": _74, "omi": _74, "sado": _74, "sanjo": _74, "seiro": _74, "seirou": _74, "sekikawa": _74, "shibata": _74, "tagami": _74, "tainai": _74, "tochio": _74, "tokamachi": _74, "tsubame": _74, "tsunan": _74, "uonuma": _74, "yahiko": _74, "yoita": _74, "yuzawa": _74 }], "oita": [1, { "beppu": _74, "bungoono": _74, "bungotakada": _74, "hasama": _74, "hiji": _74, "himeshima": _74, "hita": _74, "kamitsue": _74, "kokonoe": _74, "kuju": _74, "kunisaki": _74, "kusu": _74, "oita": _74, "saiki": _74, "taketa": _74, "tsukumi": _74, "usa": _74, "usuki": _74, "yufu": _74 }], "okayama": [1, { "akaiwa": _74, "asakuchi": _74, "bizen": _74, "hayashima": _74, "ibara": _74, "kagamino": _74, "kasaoka": _74, "kibichuo": _74, "kumenan": _74, "kurashiki": _74, "maniwa": _74, "misaki": _74, "nagi": _74, "niimi": _74, "nishiawakura": _74, "okayama": _74, "satosho": _74, "setouchi": _74, "shinjo": _74, "shoo": _74, "soja": _74, "takahashi": _74, "tamano": _74, "tsuyama": _74, "wake": _74, "yakage": _74 }], "okinawa": [1, { "aguni": _74, "ginowan": _74, "ginoza": _74, "gushikami": _74, "haebaru": _74, "higashi": _74, "hirara": _74, "iheya": _74, "ishigaki": _74, "ishikawa": _74, "itoman": _74, "izena": _74, "kadena": _74, "kin": _74, "kitadaito": _74, "kitanakagusuku": _74, "kumejima": _74, "kunigami": _74, "minamidaito": _74, "motobu": _74, "nago": _74, "naha": _74, "nakagusuku": _74, "nakijin": _74, "nanjo": _74, "nishihara": _74, "ogimi": _74, "okinawa": _74, "onna": _74, "shimoji": _74, "taketomi": _74, "tarama": _74, "tokashiki": _74, "tomigusuku": _74, "tonaki": _74, "urasoe": _74, "uruma": _74, "yaese": _74, "yomitan": _74, "yonabaru": _74, "yonaguni": _74, "zamami": _74 }], "osaka": [1, { "abeno": _74, "chihayaakasaka": _74, "chuo": _74, "daito": _74, "fujiidera": _74, "habikino": _74, "hannan": _74, "higashiosaka": _74, "higashisumiyoshi": _74, "higashiyodogawa": _74, "hirakata": _74, "ibaraki": _74, "ikeda": _74, "izumi": _74, "izumiotsu": _74, "izumisano": _74, "kadoma": _74, "kaizuka": _74, "kanan": _74, "kashiwara": _74, "katano": _74, "kawachinagano": _74, "kishiwada": _74, "kita": _74, "kumatori": _74, "matsubara": _74, "minato": _74, "minoh": _74, "misaki": _74, "moriguchi": _74, "neyagawa": _74, "nishi": _74, "nose": _74, "osakasayama": _74, "sakai": _74, "sayama": _74, "sennan": _74, "settsu": _74, "shijonawate": _74, "shimamoto": _74, "suita": _74, "tadaoka": _74, "taishi": _74, "tajiri": _74, "takaishi": _74, "takatsuki": _74, "tondabayashi": _74, "toyonaka": _74, "toyono": _74, "yao": _74 }], "saga": [1, { "ariake": _74, "arita": _74, "fukudomi": _74, "genkai": _74, "hamatama": _74, "hizen": _74, "imari": _74, "kamimine": _74, "kanzaki": _74, "karatsu": _74, "kashima": _74, "kitagata": _74, "kitahata": _74, "kiyama": _74, "kouhoku": _74, "kyuragi": _74, "nishiarita": _74, "ogi": _74, "omachi": _74, "ouchi": _74, "saga": _74, "shiroishi": _74, "taku": _74, "tara": _74, "tosu": _74, "yoshinogari": _74 }], "saitama": [1, { "arakawa": _74, "asaka": _74, "chichibu": _74, "fujimi": _74, "fujimino": _74, "fukaya": _74, "hanno": _74, "hanyu": _74, "hasuda": _74, "hatogaya": _74, "hatoyama": _74, "hidaka": _74, "higashichichibu": _74, "higashimatsuyama": _74, "honjo": _74, "ina": _74, "iruma": _74, "iwatsuki": _74, "kamiizumi": _74, "kamikawa": _74, "kamisato": _74, "kasukabe": _74, "kawagoe": _74, "kawaguchi": _74, "kawajima": _74, "kazo": _74, "kitamoto": _74, "koshigaya": _74, "kounosu": _74, "kuki": _74, "kumagaya": _74, "matsubushi": _74, "minano": _74, "misato": _74, "miyashiro": _74, "miyoshi": _74, "moroyama": _74, "nagatoro": _74, "namegawa": _74, "niiza": _74, "ogano": _74, "ogawa": _74, "ogose": _74, "okegawa": _74, "omiya": _74, "otaki": _74, "ranzan": _74, "ryokami": _74, "saitama": _74, "sakado": _74, "satte": _74, "sayama": _74, "shiki": _74, "shiraoka": _74, "soka": _74, "sugito": _74, "toda": _74, "tokigawa": _74, "tokorozawa": _74, "tsurugashima": _74, "urawa": _74, "warabi": _74, "yashio": _74, "yokoze": _74, "yono": _74, "yorii": _74, "yoshida": _74, "yoshikawa": _74, "yoshimi": _74 }], "shiga": [1, { "aisho": _74, "gamo": _74, "higashiomi": _74, "hikone": _74, "koka": _74, "konan": _74, "kosei": _74, "koto": _74, "kusatsu": _74, "maibara": _74, "moriyama": _74, "nagahama": _74, "nishiazai": _74, "notogawa": _74, "omihachiman": _74, "otsu": _74, "ritto": _74, "ryuoh": _74, "takashima": _74, "takatsuki": _74, "torahime": _74, "toyosato": _74, "yasu": _74 }], "shimane": [1, { "akagi": _74, "ama": _74, "gotsu": _74, "hamada": _74, "higashiizumo": _74, "hikawa": _74, "hikimi": _74, "izumo": _74, "kakinoki": _74, "masuda": _74, "matsue": _74, "misato": _74, "nishinoshima": _74, "ohda": _74, "okinoshima": _74, "okuizumo": _74, "shimane": _74, "tamayu": _74, "tsuwano": _74, "unnan": _74, "yakumo": _74, "yasugi": _74, "yatsuka": _74 }], "shizuoka": [1, { "arai": _74, "atami": _74, "fuji": _74, "fujieda": _74, "fujikawa": _74, "fujinomiya": _74, "fukuroi": _74, "gotemba": _74, "haibara": _74, "hamamatsu": _74, "higashiizu": _74, "ito": _74, "iwata": _74, "izu": _74, "izunokuni": _74, "kakegawa": _74, "kannami": _74, "kawanehon": _74, "kawazu": _74, "kikugawa": _74, "kosai": _74, "makinohara": _74, "matsuzaki": _74, "minamiizu": _74, "mishima": _74, "morimachi": _74, "nishiizu": _74, "numazu": _74, "omaezaki": _74, "shimada": _74, "shimizu": _74, "shimoda": _74, "shizuoka": _74, "susono": _74, "yaizu": _74, "yoshida": _74 }], "tochigi": [1, { "ashikaga": _74, "bato": _74, "haga": _74, "ichikai": _74, "iwafune": _74, "kaminokawa": _74, "kanuma": _74, "karasuyama": _74, "kuroiso": _74, "mashiko": _74, "mibu": _74, "moka": _74, "motegi": _74, "nasu": _74, "nasushiobara": _74, "nikko": _74, "nishikata": _74, "nogi": _74, "ohira": _74, "ohtawara": _74, "oyama": _74, "sakura": _74, "sano": _74, "shimotsuke": _74, "shioya": _74, "takanezawa": _74, "tochigi": _74, "tsuga": _74, "ujiie": _74, "utsunomiya": _74, "yaita": _74 }], "tokushima": [1, { "aizumi": _74, "anan": _74, "ichiba": _74, "itano": _74, "kainan": _74, "komatsushima": _74, "matsushige": _74, "mima": _74, "minami": _74, "miyoshi": _74, "mugi": _74, "nakagawa": _74, "naruto": _74, "sanagochi": _74, "shishikui": _74, "tokushima": _74, "wajiki": _74 }], "tokyo": [1, { "adachi": _74, "akiruno": _74, "akishima": _74, "aogashima": _74, "arakawa": _74, "bunkyo": _74, "chiyoda": _74, "chofu": _74, "chuo": _74, "edogawa": _74, "fuchu": _74, "fussa": _74, "hachijo": _74, "hachioji": _74, "hamura": _74, "higashikurume": _74, "higashimurayama": _74, "higashiyamato": _74, "hino": _74, "hinode": _74, "hinohara": _74, "inagi": _74, "itabashi": _74, "katsushika": _74, "kita": _74, "kiyose": _74, "kodaira": _74, "koganei": _74, "kokubunji": _74, "komae": _74, "koto": _74, "kouzushima": _74, "kunitachi": _74, "machida": _74, "meguro": _74, "minato": _74, "mitaka": _74, "mizuho": _74, "musashimurayama": _74, "musashino": _74, "nakano": _74, "nerima": _74, "ogasawara": _74, "okutama": _74, "ome": _74, "oshima": _74, "ota": _74, "setagaya": _74, "shibuya": _74, "shinagawa": _74, "shinjuku": _74, "suginami": _74, "sumida": _74, "tachikawa": _74, "taito": _74, "tama": _74, "toshima": _74 }], "tottori": [1, { "chizu": _74, "hino": _74, "kawahara": _74, "koge": _74, "kotoura": _74, "misasa": _74, "nanbu": _74, "nichinan": _74, "sakaiminato": _74, "tottori": _74, "wakasa": _74, "yazu": _74, "yonago": _74 }], "toyama": [1, { "asahi": _74, "fuchu": _74, "fukumitsu": _74, "funahashi": _74, "himi": _74, "imizu": _74, "inami": _74, "johana": _74, "kamiichi": _74, "kurobe": _74, "nakaniikawa": _74, "namerikawa": _74, "nanto": _74, "nyuzen": _74, "oyabe": _74, "taira": _74, "takaoka": _74, "tateyama": _74, "toga": _74, "tonami": _74, "toyama": _74, "unazuki": _74, "uozu": _74, "yamada": _74 }], "wakayama": [1, { "arida": _74, "aridagawa": _74, "gobo": _74, "hashimoto": _74, "hidaka": _74, "hirogawa": _74, "inami": _74, "iwade": _74, "kainan": _74, "kamitonda": _74, "katsuragi": _74, "kimino": _74, "kinokawa": _74, "kitayama": _74, "koya": _74, "koza": _74, "kozagawa": _74, "kudoyama": _74, "kushimoto": _74, "mihama": _74, "misato": _74, "nachikatsuura": _74, "shingu": _74, "shirahama": _74, "taiji": _74, "tanabe": _74, "wakayama": _74, "yuasa": _74, "yura": _74 }], "yamagata": [1, { "asahi": _74, "funagata": _74, "higashine": _74, "iide": _74, "kahoku": _74, "kaminoyama": _74, "kaneyama": _74, "kawanishi": _74, "mamurogawa": _74, "mikawa": _74, "murayama": _74, "nagai": _74, "nakayama": _74, "nanyo": _74, "nishikawa": _74, "obanazawa": _74, "oe": _74, "oguni": _74, "ohkura": _74, "oishida": _74, "sagae": _74, "sakata": _74, "sakegawa": _74, "shinjo": _74, "shirataka": _74, "shonai": _74, "takahata": _74, "tendo": _74, "tozawa": _74, "tsuruoka": _74, "yamagata": _74, "yamanobe": _74, "yonezawa": _74, "yuza": _74 }], "yamaguchi": [1, { "abu": _74, "hagi": _74, "hikari": _74, "hofu": _74, "iwakuni": _74, "kudamatsu": _74, "mitou": _74, "nagato": _74, "oshima": _74, "shimonoseki": _74, "shunan": _74, "tabuse": _74, "tokuyama": _74, "toyota": _74, "ube": _74, "yuu": _74 }], "yamanashi": [1, { "chuo": _74, "doshi": _74, "fuefuki": _74, "fujikawa": _74, "fujikawaguchiko": _74, "fujiyoshida": _74, "hayakawa": _74, "hokuto": _74, "ichikawamisato": _74, "kai": _74, "kofu": _74, "koshu": _74, "kosuge": _74, "minami-alps": _74, "minobu": _74, "nakamichi": _74, "nanbu": _74, "narusawa": _74, "nirasaki": _74, "nishikatsura": _74, "oshino": _74, "otsuki": _74, "showa": _74, "tabayama": _74, "tsuru": _74, "uenohara": _74, "yamanakako": _74, "yamanashi": _74 }], "xn--ehqz56n": _74, "\u4E09\u91CD": _74, "xn--1lqs03n": _74, "\u4EAC\u90FD": _74, "xn--qqqt11m": _74, "\u4F50\u8CC0": _74, "xn--f6qx53a": _74, "\u5175\u5EAB": _74, "xn--djrs72d6uy": _74, "\u5317\u6D77\u9053": _74, "xn--mkru45i": _74, "\u5343\u8449": _74, "xn--0trq7p7nn": _74, "\u548C\u6B4C\u5C71": _74, "xn--5js045d": _74, "\u57FC\u7389": _74, "xn--kbrq7o": _74, "\u5927\u5206": _74, "xn--pssu33l": _74, "\u5927\u962A": _74, "xn--ntsq17g": _74, "\u5948\u826F": _74, "xn--uisz3g": _74, "\u5BAE\u57CE": _74, "xn--6btw5a": _74, "\u5BAE\u5D0E": _74, "xn--1ctwo": _74, "\u5BCC\u5C71": _74, "xn--6orx2r": _74, "\u5C71\u53E3": _74, "xn--rht61e": _74, "\u5C71\u5F62": _74, "xn--rht27z": _74, "\u5C71\u68A8": _74, "xn--nit225k": _74, "\u5C90\u961C": _74, "xn--rht3d": _74, "\u5CA1\u5C71": _74, "xn--djty4k": _74, "\u5CA9\u624B": _74, "xn--klty5x": _74, "\u5CF6\u6839": _74, "xn--kltx9a": _74, "\u5E83\u5CF6": _74, "xn--kltp7d": _74, "\u5FB3\u5CF6": _74, "xn--c3s14m": _74, "\u611B\u5A9B": _74, "xn--vgu402c": _74, "\u611B\u77E5": _74, "xn--efvn9s": _74, "\u65B0\u6F5F": _74, "xn--1lqs71d": _74, "\u6771\u4EAC": _74, "xn--4pvxs": _74, "\u6803\u6728": _74, "xn--uuwu58a": _74, "\u6C96\u7E04": _74, "xn--zbx025d": _74, "\u6ECB\u8CC0": _74, "xn--8pvr4u": _74, "\u718A\u672C": _74, "xn--5rtp49c": _74, "\u77F3\u5DDD": _74, "xn--ntso0iqx3a": _74, "\u795E\u5948\u5DDD": _74, "xn--elqq16h": _74, "\u798F\u4E95": _74, "xn--4it168d": _74, "\u798F\u5CA1": _74, "xn--klt787d": _74, "\u798F\u5CF6": _74, "xn--rny31h": _74, "\u79CB\u7530": _74, "xn--7t0a264c": _74, "\u7FA4\u99AC": _74, "xn--uist22h": _74, "\u8328\u57CE": _74, "xn--8ltr62k": _74, "\u9577\u5D0E": _74, "xn--2m4a15e": _74, "\u9577\u91CE": _74, "xn--32vp30h": _74, "\u9752\u68EE": _74, "xn--4it797k": _74, "\u9759\u5CA1": _74, "xn--5rtq34k": _74, "\u9999\u5DDD": _74, "xn--k7yn95e": _74, "\u9AD8\u77E5": _74, "xn--tor131o": _74, "\u9CE5\u53D6": _74, "xn--d5qv7z876c": _74, "\u9E7F\u5150\u5CF6": _74, "kawasaki": _78, "kitakyushu": _78, "kobe": _78, "nagoya": _78, "sapporo": _78, "sendai": _78, "yokohama": _78 }], "ke": [1, { "ac": _74, "co": _74, "go": _74, "info": _74, "me": _74, "mobi": _74, "ne": _74, "or": _74, "sc": _74 }], "kg": _75, "kh": _76, "ki": _83, "km": [1, { "ass": _74, "com": _74, "edu": _74, "gov": _74, "mil": _74, "nom": _74, "org": _74, "prd": _74, "tm": _74, "asso": _74, "coop": _74, "gouv": _74, "medecin": _74, "notaires": _74, "pharmaciens": _74, "presse": _74, "veterinaire": _74 }], "kn": [1, { "edu": _74, "gov": _74, "net": _74, "org": _74 }], "kp": [1, { "com": _74, "edu": _74, "gov": _74, "org": _74, "rep": _74, "tra": _74 }], "kr": [1, { "ac": _74, "ai": _74, "co": _74, "es": _74, "go": _74, "hs": _74, "io": _74, "it": _74, "kg": _74, "me": _74, "mil": _74, "ms": _74, "ne": _74, "or": _74, "pe": _74, "re": _74, "sc": _74, "busan": _74, "chungbuk": _74, "chungnam": _74, "daegu": _74, "daejeon": _74, "gangwon": _74, "gwangju": _74, "gyeongbuk": _74, "gyeonggi": _74, "gyeongnam": _74, "incheon": _74, "jeju": _74, "jeonbuk": _74, "jeonnam": _74, "seoul": _74, "ulsan": _74 }], "kw": [1, { "com": _74, "edu": _74, "emb": _74, "gov": _74, "ind": _74, "net": _74, "org": _74 }], "ky": _80, "kz": _75, "la": [1, { "com": _74, "edu": _74, "gov": _74, "info": _74, "int": _74, "net": _74, "org": _74, "per": _74 }], "lb": _76, "lc": _79, "li": _74, "lk": [1, { "ac": _74, "assn": _74, "com": _74, "edu": _74, "gov": _74, "grp": _74, "hotel": _74, "int": _74, "ltd": _74, "net": _74, "ngo": _74, "org": _74, "sch": _74, "soc": _74, "web": _74 }], "lr": _76, "ls": [1, { "ac": _74, "biz": _74, "co": _74, "edu": _74, "gov": _74, "info": _74, "net": _74, "org": _74, "sc": _74 }], "lt": _77, "lu": _74, "lv": [1, { "asn": _74, "com": _74, "conf": _74, "edu": _74, "gov": _74, "id": _74, "mil": _74, "net": _74, "org": _74 }], "ly": [1, { "com": _74, "edu": _74, "gov": _74, "id": _74, "med": _74, "net": _74, "org": _74, "plc": _74, "sch": _74 }], "ma": [1, { "ac": _74, "co": _74, "gov": _74, "net": _74, "org": _74, "press": _74 }], "mc": [1, { "asso": _74, "tm": _74 }], "md": _74, "me": [1, { "ac": _74, "co": _74, "edu": _74, "gov": _74, "its": _74, "net": _74, "org": _74, "priv": _74 }], "mg": [1, { "co": _74, "com": _74, "edu": _74, "gov": _74, "mil": _74, "nom": _74, "org": _74, "prd": _74 }], "mh": _74, "mil": _74, "mk": [1, { "com": _74, "edu": _74, "gov": _74, "inf": _74, "name": _74, "net": _74, "org": _74 }], "ml": [1, { "ac": _74, "art": _74, "asso": _74, "com": _74, "edu": _74, "gouv": _74, "gov": _74, "info": _74, "inst": _74, "net": _74, "org": _74, "pr": _74, "presse": _74 }], "mm": _78, "mn": [1, { "edu": _74, "gov": _74, "org": _74 }], "mo": _76, "mobi": _74, "mp": _74, "mq": _74, "mr": _77, "ms": _76, "mt": _80, "mu": [1, { "ac": _74, "co": _74, "com": _74, "gov": _74, "net": _74, "or": _74, "org": _74 }], "museum": _74, "mv": [1, { "aero": _74, "biz": _74, "com": _74, "coop": _74, "edu": _74, "gov": _74, "info": _74, "int": _74, "mil": _74, "museum": _74, "name": _74, "net": _74, "org": _74, "pro": _74 }], "mw": [1, { "ac": _74, "biz": _74, "co": _74, "com": _74, "coop": _74, "edu": _74, "gov": _74, "int": _74, "net": _74, "org": _74 }], "mx": [1, { "com": _74, "edu": _74, "gob": _74, "net": _74, "org": _74 }], "my": [1, { "biz": _74, "com": _74, "edu": _74, "gov": _74, "mil": _74, "name": _74, "net": _74, "org": _74 }], "mz": [1, { "ac": _74, "adv": _74, "co": _74, "edu": _74, "gov": _74, "mil": _74, "net": _74, "org": _74 }], "na": [1, { "alt": _74, "co": _74, "com": _74, "gov": _74, "net": _74, "org": _74 }], "name": _74, "nc": [1, { "asso": _74, "nom": _74 }], "ne": _74, "net": _74, "nf": [1, { "arts": _74, "com": _74, "firm": _74, "info": _74, "net": _74, "other": _74, "per": _74, "rec": _74, "store": _74, "web": _74 }], "ng": [1, { "com": _74, "edu": _74, "gov": _74, "i": _74, "mil": _74, "mobi": _74, "name": _74, "net": _74, "org": _74, "sch": _74 }], "ni": [1, { "ac": _74, "biz": _74, "co": _74, "com": _74, "edu": _74, "gob": _74, "in": _74, "info": _74, "int": _74, "mil": _74, "net": _74, "nom": _74, "org": _74, "web": _74 }], "nl": _74, "no": [1, { "fhs": _74, "folkebibl": _74, "fylkesbibl": _74, "idrett": _74, "museum": _74, "priv": _74, "vgs": _74, "dep": _74, "herad": _74, "kommune": _74, "mil": _74, "stat": _74, "aa": _84, "ah": _84, "bu": _84, "fm": _84, "hl": _84, "hm": _84, "jan-mayen": _84, "mr": _84, "nl": _84, "nt": _84, "of": _84, "ol": _84, "oslo": _84, "rl": _84, "sf": _84, "st": _84, "svalbard": _84, "tm": _84, "tr": _84, "va": _84, "vf": _84, "akrehamn": _74, "xn--krehamn-dxa": _74, "\xE5krehamn": _74, "algard": _74, "xn--lgrd-poac": _74, "\xE5lg\xE5rd": _74, "arna": _74, "bronnoysund": _74, "xn--brnnysund-m8ac": _74, "br\xF8nn\xF8ysund": _74, "brumunddal": _74, "bryne": _74, "drobak": _74, "xn--drbak-wua": _74, "dr\xF8bak": _74, "egersund": _74, "fetsund": _74, "floro": _74, "xn--flor-jra": _74, "flor\xF8": _74, "fredrikstad": _74, "hokksund": _74, "honefoss": _74, "xn--hnefoss-q1a": _74, "h\xF8nefoss": _74, "jessheim": _74, "jorpeland": _74, "xn--jrpeland-54a": _74, "j\xF8rpeland": _74, "kirkenes": _74, "kopervik": _74, "krokstadelva": _74, "langevag": _74, "xn--langevg-jxa": _74, "langev\xE5g": _74, "leirvik": _74, "mjondalen": _74, "xn--mjndalen-64a": _74, "mj\xF8ndalen": _74, "mo-i-rana": _74, "mosjoen": _74, "xn--mosjen-eya": _74, "mosj\xF8en": _74, "nesoddtangen": _74, "orkanger": _74, "osoyro": _74, "xn--osyro-wua": _74, "os\xF8yro": _74, "raholt": _74, "xn--rholt-mra": _74, "r\xE5holt": _74, "sandnessjoen": _74, "xn--sandnessjen-ogb": _74, "sandnessj\xF8en": _74, "skedsmokorset": _74, "slattum": _74, "spjelkavik": _74, "stathelle": _74, "stavern": _74, "stjordalshalsen": _74, "xn--stjrdalshalsen-sqb": _74, "stj\xF8rdalshalsen": _74, "tananger": _74, "tranby": _74, "vossevangen": _74, "aarborte": _74, "aejrie": _74, "afjord": _74, "xn--fjord-lra": _74, "\xE5fjord": _74, "agdenes": _74, "akershus": _85, "aknoluokta": _74, "xn--koluokta-7ya57h": _74, "\xE1k\u014Boluokta": _74, "al": _74, "xn--l-1fa": _74, "\xE5l": _74, "alaheadju": _74, "xn--laheadju-7ya": _74, "\xE1laheadju": _74, "alesund": _74, "xn--lesund-hua": _74, "\xE5lesund": _74, "alstahaug": _74, "alta": _74, "xn--lt-liac": _74, "\xE1lt\xE1": _74, "alvdal": _74, "amli": _74, "xn--mli-tla": _74, "\xE5mli": _74, "amot": _74, "xn--mot-tla": _74, "\xE5mot": _74, "andasuolo": _74, "andebu": _74, "andoy": _74, "xn--andy-ira": _74, "and\xF8y": _74, "ardal": _74, "xn--rdal-poa": _74, "\xE5rdal": _74, "aremark": _74, "arendal": _74, "xn--s-1fa": _74, "\xE5s": _74, "aseral": _74, "xn--seral-lra": _74, "\xE5seral": _74, "asker": _74, "askim": _74, "askoy": _74, "xn--asky-ira": _74, "ask\xF8y": _74, "askvoll": _74, "asnes": _74, "xn--snes-poa": _74, "\xE5snes": _74, "audnedaln": _74, "aukra": _74, "aure": _74, "aurland": _74, "aurskog-holand": _74, "xn--aurskog-hland-jnb": _74, "aurskog-h\xF8land": _74, "austevoll": _74, "austrheim": _74, "averoy": _74, "xn--avery-yua": _74, "aver\xF8y": _74, "badaddja": _74, "xn--bdddj-mrabd": _74, "b\xE5d\xE5ddj\xE5": _74, "xn--brum-voa": _74, "b\xE6rum": _74, "bahcavuotna": _74, "xn--bhcavuotna-s4a": _74, "b\xE1hcavuotna": _74, "bahccavuotna": _74, "xn--bhccavuotna-k7a": _74, "b\xE1hccavuotna": _74, "baidar": _74, "xn--bidr-5nac": _74, "b\xE1id\xE1r": _74, "bajddar": _74, "xn--bjddar-pta": _74, "b\xE1jddar": _74, "balat": _74, "xn--blt-elab": _74, "b\xE1l\xE1t": _74, "balestrand": _74, "ballangen": _74, "balsfjord": _74, "bamble": _74, "bardu": _74, "barum": _74, "batsfjord": _74, "xn--btsfjord-9za": _74, "b\xE5tsfjord": _74, "bearalvahki": _74, "xn--bearalvhki-y4a": _74, "bearalv\xE1hki": _74, "beardu": _74, "beiarn": _74, "berg": _74, "bergen": _74, "berlevag": _74, "xn--berlevg-jxa": _74, "berlev\xE5g": _74, "bievat": _74, "xn--bievt-0qa": _74, "biev\xE1t": _74, "bindal": _74, "birkenes": _74, "bjerkreim": _74, "bjugn": _74, "bodo": _74, "xn--bod-2na": _74, "bod\xF8": _74, "bokn": _74, "bomlo": _74, "xn--bmlo-gra": _74, "b\xF8mlo": _74, "bremanger": _74, "bronnoy": _74, "xn--brnny-wuac": _74, "br\xF8nn\xF8y": _74, "budejju": _74, "buskerud": _85, "bygland": _74, "bykle": _74, "cahcesuolo": _74, "xn--hcesuolo-7ya35b": _74, "\u010D\xE1hcesuolo": _74, "davvenjarga": _74, "xn--davvenjrga-y4a": _74, "davvenj\xE1rga": _74, "davvesiida": _74, "deatnu": _74, "dielddanuorri": _74, "divtasvuodna": _74, "divttasvuotna": _74, "donna": _74, "xn--dnna-gra": _74, "d\xF8nna": _74, "dovre": _74, "drammen": _74, "drangedal": _74, "dyroy": _74, "xn--dyry-ira": _74, "dyr\xF8y": _74, "eid": _74, "eidfjord": _74, "eidsberg": _74, "eidskog": _74, "eidsvoll": _74, "eigersund": _74, "elverum": _74, "enebakk": _74, "engerdal": _74, "etne": _74, "etnedal": _74, "evenassi": _74, "xn--eveni-0qa01ga": _74, "even\xE1\u0161\u0161i": _74, "evenes": _74, "evje-og-hornnes": _74, "farsund": _74, "fauske": _74, "fedje": _74, "fet": _74, "finnoy": _74, "xn--finny-yua": _74, "finn\xF8y": _74, "fitjar": _74, "fjaler": _74, "fjell": _74, "fla": _74, "xn--fl-zia": _74, "fl\xE5": _74, "flakstad": _74, "flatanger": _74, "flekkefjord": _74, "flesberg": _74, "flora": _74, "folldal": _74, "forde": _74, "xn--frde-gra": _74, "f\xF8rde": _74, "forsand": _74, "fosnes": _74, "xn--frna-woa": _74, "fr\xE6na": _74, "frana": _74, "frei": _74, "frogn": _74, "froland": _74, "frosta": _74, "froya": _74, "xn--frya-hra": _74, "fr\xF8ya": _74, "fuoisku": _74, "fuossko": _74, "fusa": _74, "fyresdal": _74, "gaivuotna": _74, "xn--givuotna-8ya": _74, "g\xE1ivuotna": _74, "galsa": _74, "xn--gls-elac": _74, "g\xE1ls\xE1": _74, "gamvik": _74, "gangaviika": _74, "xn--ggaviika-8ya47h": _74, "g\xE1\u014Bgaviika": _74, "gaular": _74, "gausdal": _74, "giehtavuoatna": _74, "gildeskal": _74, "xn--gildeskl-g0a": _74, "gildesk\xE5l": _74, "giske": _74, "gjemnes": _74, "gjerdrum": _74, "gjerstad": _74, "gjesdal": _74, "gjovik": _74, "xn--gjvik-wua": _74, "gj\xF8vik": _74, "gloppen": _74, "gol": _74, "gran": _74, "grane": _74, "granvin": _74, "gratangen": _74, "grimstad": _74, "grong": _74, "grue": _74, "gulen": _74, "guovdageaidnu": _74, "ha": _74, "xn--h-2fa": _74, "h\xE5": _74, "habmer": _74, "xn--hbmer-xqa": _74, "h\xE1bmer": _74, "hadsel": _74, "xn--hgebostad-g3a": _74, "h\xE6gebostad": _74, "hagebostad": _74, "halden": _74, "halsa": _74, "hamar": _74, "hamaroy": _74, "hammarfeasta": _74, "xn--hmmrfeasta-s4ac": _74, "h\xE1mm\xE1rfeasta": _74, "hammerfest": _74, "hapmir": _74, "xn--hpmir-xqa": _74, "h\xE1pmir": _74, "haram": _74, "hareid": _74, "harstad": _74, "hasvik": _74, "hattfjelldal": _74, "haugesund": _74, "hedmark": [0, { "os": _74, "valer": _74, "xn--vler-qoa": _74, "v\xE5ler": _74 }], "hemne": _74, "hemnes": _74, "hemsedal": _74, "hitra": _74, "hjartdal": _74, "hjelmeland": _74, "hobol": _74, "xn--hobl-ira": _74, "hob\xF8l": _74, "hof": _74, "hol": _74, "hole": _74, "holmestrand": _74, "holtalen": _74, "xn--holtlen-hxa": _74, "holt\xE5len": _74, "hordaland": [0, { "os": _74 }], "hornindal": _74, "horten": _74, "hoyanger": _74, "xn--hyanger-q1a": _74, "h\xF8yanger": _74, "hoylandet": _74, "xn--hylandet-54a": _74, "h\xF8ylandet": _74, "hurdal": _74, "hurum": _74, "hvaler": _74, "hyllestad": _74, "ibestad": _74, "inderoy": _74, "xn--indery-fya": _74, "inder\xF8y": _74, "iveland": _74, "ivgu": _74, "jevnaker": _74, "jolster": _74, "xn--jlster-bya": _74, "j\xF8lster": _74, "jondal": _74, "kafjord": _74, "xn--kfjord-iua": _74, "k\xE5fjord": _74, "karasjohka": _74, "xn--krjohka-hwab49j": _74, "k\xE1r\xE1\u0161johka": _74, "karasjok": _74, "karlsoy": _74, "karmoy": _74, "xn--karmy-yua": _74, "karm\xF8y": _74, "kautokeino": _74, "klabu": _74, "xn--klbu-woa": _74, "kl\xE6bu": _74, "klepp": _74, "kongsberg": _74, "kongsvinger": _74, "kraanghke": _74, "xn--kranghke-b0a": _74, "kr\xE5anghke": _74, "kragero": _74, "xn--krager-gya": _74, "krager\xF8": _74, "kristiansand": _74, "kristiansund": _74, "krodsherad": _74, "xn--krdsherad-m8a": _74, "kr\xF8dsherad": _74, "xn--kvfjord-nxa": _74, "kv\xE6fjord": _74, "xn--kvnangen-k0a": _74, "kv\xE6nangen": _74, "kvafjord": _74, "kvalsund": _74, "kvam": _74, "kvanangen": _74, "kvinesdal": _74, "kvinnherad": _74, "kviteseid": _74, "kvitsoy": _74, "xn--kvitsy-fya": _74, "kvits\xF8y": _74, "laakesvuemie": _74, "xn--lrdal-sra": _74, "l\xE6rdal": _74, "lahppi": _74, "xn--lhppi-xqa": _74, "l\xE1hppi": _74, "lardal": _74, "larvik": _74, "lavagis": _74, "lavangen": _74, "leangaviika": _74, "xn--leagaviika-52b": _74, "lea\u014Bgaviika": _74, "lebesby": _74, "leikanger": _74, "leirfjord": _74, "leka": _74, "leksvik": _74, "lenvik": _74, "lerdal": _74, "lesja": _74, "levanger": _74, "lier": _74, "lierne": _74, "lillehammer": _74, "lillesand": _74, "lindas": _74, "xn--linds-pra": _74, "lind\xE5s": _74, "lindesnes": _74, "loabat": _74, "xn--loabt-0qa": _74, "loab\xE1t": _74, "lodingen": _74, "xn--ldingen-q1a": _74, "l\xF8dingen": _74, "lom": _74, "loppa": _74, "lorenskog": _74, "xn--lrenskog-54a": _74, "l\xF8renskog": _74, "loten": _74, "xn--lten-gra": _74, "l\xF8ten": _74, "lund": _74, "lunner": _74, "luroy": _74, "xn--lury-ira": _74, "lur\xF8y": _74, "luster": _74, "lyngdal": _74, "lyngen": _74, "malatvuopmi": _74, "xn--mlatvuopmi-s4a": _74, "m\xE1latvuopmi": _74, "malselv": _74, "xn--mlselv-iua": _74, "m\xE5lselv": _74, "malvik": _74, "mandal": _74, "marker": _74, "marnardal": _74, "masfjorden": _74, "masoy": _74, "xn--msy-ula0h": _74, "m\xE5s\xF8y": _74, "matta-varjjat": _74, "xn--mtta-vrjjat-k7af": _74, "m\xE1tta-v\xE1rjjat": _74, "meland": _74, "meldal": _74, "melhus": _74, "meloy": _74, "xn--mely-ira": _74, "mel\xF8y": _74, "meraker": _74, "xn--merker-kua": _74, "mer\xE5ker": _74, "midsund": _74, "midtre-gauldal": _74, "moareke": _74, "xn--moreke-jua": _74, "mo\xE5reke": _74, "modalen": _74, "modum": _74, "molde": _74, "more-og-romsdal": [0, { "heroy": _74, "sande": _74 }], "xn--mre-og-romsdal-qqb": [0, { "xn--hery-ira": _74, "sande": _74 }], "m\xF8re-og-romsdal": [0, { "her\xF8y": _74, "sande": _74 }], "moskenes": _74, "moss": _74, "muosat": _74, "xn--muost-0qa": _74, "muos\xE1t": _74, "naamesjevuemie": _74, "xn--nmesjevuemie-tcba": _74, "n\xE5\xE5mesjevuemie": _74, "xn--nry-yla5g": _74, "n\xE6r\xF8y": _74, "namdalseid": _74, "namsos": _74, "namsskogan": _74, "nannestad": _74, "naroy": _74, "narviika": _74, "narvik": _74, "naustdal": _74, "navuotna": _74, "xn--nvuotna-hwa": _74, "n\xE1vuotna": _74, "nedre-eiker": _74, "nesna": _74, "nesodden": _74, "nesseby": _74, "nesset": _74, "nissedal": _74, "nittedal": _74, "nord-aurdal": _74, "nord-fron": _74, "nord-odal": _74, "norddal": _74, "nordkapp": _74, "nordland": [0, { "bo": _74, "xn--b-5ga": _74, "b\xF8": _74, "heroy": _74, "xn--hery-ira": _74, "her\xF8y": _74 }], "nordre-land": _74, "nordreisa": _74, "nore-og-uvdal": _74, "notodden": _74, "notteroy": _74, "xn--nttery-byae": _74, "n\xF8tter\xF8y": _74, "odda": _74, "oksnes": _74, "xn--ksnes-uua": _74, "\xF8ksnes": _74, "omasvuotna": _74, "oppdal": _74, "oppegard": _74, "xn--oppegrd-ixa": _74, "oppeg\xE5rd": _74, "orkdal": _74, "orland": _74, "xn--rland-uua": _74, "\xF8rland": _74, "orskog": _74, "xn--rskog-uua": _74, "\xF8rskog": _74, "orsta": _74, "xn--rsta-fra": _74, "\xF8rsta": _74, "osen": _74, "osteroy": _74, "xn--ostery-fya": _74, "oster\xF8y": _74, "ostfold": [0, { "valer": _74 }], "xn--stfold-9xa": [0, { "xn--vler-qoa": _74 }], "\xF8stfold": [0, { "v\xE5ler": _74 }], "ostre-toten": _74, "xn--stre-toten-zcb": _74, "\xF8stre-toten": _74, "overhalla": _74, "ovre-eiker": _74, "xn--vre-eiker-k8a": _74, "\xF8vre-eiker": _74, "oyer": _74, "xn--yer-zna": _74, "\xF8yer": _74, "oygarden": _74, "xn--ygarden-p1a": _74, "\xF8ygarden": _74, "oystre-slidre": _74, "xn--ystre-slidre-ujb": _74, "\xF8ystre-slidre": _74, "porsanger": _74, "porsangu": _74, "xn--porsgu-sta26f": _74, "pors\xE1\u014Bgu": _74, "porsgrunn": _74, "rade": _74, "xn--rde-ula": _74, "r\xE5de": _74, "radoy": _74, "xn--rady-ira": _74, "rad\xF8y": _74, "xn--rlingen-mxa": _74, "r\xE6lingen": _74, "rahkkeravju": _74, "xn--rhkkervju-01af": _74, "r\xE1hkker\xE1vju": _74, "raisa": _74, "xn--risa-5na": _74, "r\xE1isa": _74, "rakkestad": _74, "ralingen": _74, "rana": _74, "randaberg": _74, "rauma": _74, "rendalen": _74, "rennebu": _74, "rennesoy": _74, "xn--rennesy-v1a": _74, "rennes\xF8y": _74, "rindal": _74, "ringebu": _74, "ringerike": _74, "ringsaker": _74, "risor": _74, "xn--risr-ira": _74, "ris\xF8r": _74, "rissa": _74, "roan": _74, "rodoy": _74, "xn--rdy-0nab": _74, "r\xF8d\xF8y": _74, "rollag": _74, "romsa": _74, "romskog": _74, "xn--rmskog-bya": _74, "r\xF8mskog": _74, "roros": _74, "xn--rros-gra": _74, "r\xF8ros": _74, "rost": _74, "xn--rst-0na": _74, "r\xF8st": _74, "royken": _74, "xn--ryken-vua": _74, "r\xF8yken": _74, "royrvik": _74, "xn--ryrvik-bya": _74, "r\xF8yrvik": _74, "ruovat": _74, "rygge": _74, "salangen": _74, "salat": _74, "xn--slat-5na": _74, "s\xE1lat": _74, "xn--slt-elab": _74, "s\xE1l\xE1t": _74, "saltdal": _74, "samnanger": _74, "sandefjord": _74, "sandnes": _74, "sandoy": _74, "xn--sandy-yua": _74, "sand\xF8y": _74, "sarpsborg": _74, "sauda": _74, "sauherad": _74, "sel": _74, "selbu": _74, "selje": _74, "seljord": _74, "siellak": _74, "sigdal": _74, "siljan": _74, "sirdal": _74, "skanit": _74, "xn--sknit-yqa": _74, "sk\xE1nit": _74, "skanland": _74, "xn--sknland-fxa": _74, "sk\xE5nland": _74, "skaun": _74, "skedsmo": _74, "ski": _74, "skien": _74, "skierva": _74, "xn--skierv-uta": _74, "skierv\xE1": _74, "skiptvet": _74, "skjak": _74, "xn--skjk-soa": _74, "skj\xE5k": _74, "skjervoy": _74, "xn--skjervy-v1a": _74, "skjerv\xF8y": _74, "skodje": _74, "smola": _74, "xn--smla-hra": _74, "sm\xF8la": _74, "snaase": _74, "xn--snase-nra": _74, "sn\xE5ase": _74, "snasa": _74, "xn--snsa-roa": _74, "sn\xE5sa": _74, "snillfjord": _74, "snoasa": _74, "sogndal": _74, "sogne": _74, "xn--sgne-gra": _74, "s\xF8gne": _74, "sokndal": _74, "sola": _74, "solund": _74, "somna": _74, "xn--smna-gra": _74, "s\xF8mna": _74, "sondre-land": _74, "xn--sndre-land-0cb": _74, "s\xF8ndre-land": _74, "songdalen": _74, "sor-aurdal": _74, "xn--sr-aurdal-l8a": _74, "s\xF8r-aurdal": _74, "sor-fron": _74, "xn--sr-fron-q1a": _74, "s\xF8r-fron": _74, "sor-odal": _74, "xn--sr-odal-q1a": _74, "s\xF8r-odal": _74, "sor-varanger": _74, "xn--sr-varanger-ggb": _74, "s\xF8r-varanger": _74, "sorfold": _74, "xn--srfold-bya": _74, "s\xF8rfold": _74, "sorreisa": _74, "xn--srreisa-q1a": _74, "s\xF8rreisa": _74, "sortland": _74, "sorum": _74, "xn--srum-gra": _74, "s\xF8rum": _74, "spydeberg": _74, "stange": _74, "stavanger": _74, "steigen": _74, "steinkjer": _74, "stjordal": _74, "xn--stjrdal-s1a": _74, "stj\xF8rdal": _74, "stokke": _74, "stor-elvdal": _74, "stord": _74, "stordal": _74, "storfjord": _74, "strand": _74, "stranda": _74, "stryn": _74, "sula": _74, "suldal": _74, "sund": _74, "sunndal": _74, "surnadal": _74, "sveio": _74, "svelvik": _74, "sykkylven": _74, "tana": _74, "telemark": [0, { "bo": _74, "xn--b-5ga": _74, "b\xF8": _74 }], "time": _74, "tingvoll": _74, "tinn": _74, "tjeldsund": _74, "tjome": _74, "xn--tjme-hra": _74, "tj\xF8me": _74, "tokke": _74, "tolga": _74, "tonsberg": _74, "xn--tnsberg-q1a": _74, "t\xF8nsberg": _74, "torsken": _74, "xn--trna-woa": _74, "tr\xE6na": _74, "trana": _74, "tranoy": _74, "xn--trany-yua": _74, "tran\xF8y": _74, "troandin": _74, "trogstad": _74, "xn--trgstad-r1a": _74, "tr\xF8gstad": _74, "tromsa": _74, "tromso": _74, "xn--troms-zua": _74, "troms\xF8": _74, "trondheim": _74, "trysil": _74, "tvedestrand": _74, "tydal": _74, "tynset": _74, "tysfjord": _74, "tysnes": _74, "xn--tysvr-vra": _74, "tysv\xE6r": _74, "tysvar": _74, "ullensaker": _74, "ullensvang": _74, "ulvik": _74, "unjarga": _74, "xn--unjrga-rta": _74, "unj\xE1rga": _74, "utsira": _74, "vaapste": _74, "vadso": _74, "xn--vads-jra": _74, "vads\xF8": _74, "xn--vry-yla5g": _74, "v\xE6r\xF8y": _74, "vaga": _74, "xn--vg-yiab": _74, "v\xE5g\xE5": _74, "vagan": _74, "xn--vgan-qoa": _74, "v\xE5gan": _74, "vagsoy": _74, "xn--vgsy-qoa0j": _74, "v\xE5gs\xF8y": _74, "vaksdal": _74, "valle": _74, "vang": _74, "vanylven": _74, "vardo": _74, "xn--vard-jra": _74, "vard\xF8": _74, "varggat": _74, "xn--vrggt-xqad": _74, "v\xE1rgg\xE1t": _74, "varoy": _74, "vefsn": _74, "vega": _74, "vegarshei": _74, "xn--vegrshei-c0a": _74, "veg\xE5rshei": _74, "vennesla": _74, "verdal": _74, "verran": _74, "vestby": _74, "vestfold": [0, { "sande": _74 }], "vestnes": _74, "vestre-slidre": _74, "vestre-toten": _74, "vestvagoy": _74, "xn--vestvgy-ixa6o": _74, "vestv\xE5g\xF8y": _74, "vevelstad": _74, "vik": _74, "vikna": _74, "vindafjord": _74, "voagat": _74, "volda": _74, "voss": _74 }], "np": _78, "nr": _83, "nu": _74, "nz": [1, { "ac": _74, "co": _74, "cri": _74, "geek": _74, "gen": _74, "govt": _74, "health": _74, "iwi": _74, "kiwi": _74, "maori": _74, "xn--mori-qsa": _74, "m\u0101ori": _74, "mil": _74, "net": _74, "org": _74, "parliament": _74, "school": _74 }], "om": [1, { "co": _74, "com": _74, "edu": _74, "gov": _74, "med": _74, "museum": _74, "net": _74, "org": _74, "pro": _74 }], "onion": _74, "org": _74, "pa": [1, { "abo": _74, "ac": _74, "com": _74, "edu": _74, "gob": _74, "ing": _74, "med": _74, "net": _74, "nom": _74, "org": _74, "sld": _74 }], "pe": [1, { "com": _74, "edu": _74, "gob": _74, "mil": _74, "net": _74, "nom": _74, "org": _74 }], "pf": [1, { "com": _74, "edu": _74, "org": _74 }], "pg": _78, "ph": [1, { "com": _74, "edu": _74, "gov": _74, "i": _74, "mil": _74, "net": _74, "ngo": _74, "org": _74 }], "pk": [1, { "ac": _74, "biz": _74, "com": _74, "edu": _74, "fam": _74, "gkp": _74, "gob": _74, "gog": _74, "gok": _74, "gop": _74, "gos": _74, "gov": _74, "net": _74, "org": _74, "web": _74 }], "pl": [1, { "com": _74, "net": _74, "org": _74, "agro": _74, "aid": _74, "atm": _74, "auto": _74, "biz": _74, "edu": _74, "gmina": _74, "gsm": _74, "info": _74, "mail": _74, "media": _74, "miasta": _74, "mil": _74, "nieruchomosci": _74, "nom": _74, "pc": _74, "powiat": _74, "priv": _74, "realestate": _74, "rel": _74, "sex": _74, "shop": _74, "sklep": _74, "sos": _74, "szkola": _74, "targi": _74, "tm": _74, "tourism": _74, "travel": _74, "turystyka": _74, "gov": [1, { "ap": _74, "griw": _74, "ic": _74, "is": _74, "kmpsp": _74, "konsulat": _74, "kppsp": _74, "kwp": _74, "kwpsp": _74, "mup": _74, "mw": _74, "oia": _74, "oirm": _74, "oke": _74, "oow": _74, "oschr": _74, "oum": _74, "pa": _74, "pinb": _74, "piw": _74, "po": _74, "pr": _74, "psp": _74, "psse": _74, "pup": _74, "rzgw": _74, "sa": _74, "sdn": _74, "sko": _74, "so": _74, "sr": _74, "starostwo": _74, "ug": _74, "ugim": _74, "um": _74, "umig": _74, "upow": _74, "uppo": _74, "us": _74, "uw": _74, "uzs": _74, "wif": _74, "wiih": _74, "winb": _74, "wios": _74, "witd": _74, "wiw": _74, "wkz": _74, "wsa": _74, "wskr": _74, "wsse": _74, "wuoz": _74, "wzmiuw": _74, "zp": _74, "zpisdn": _74 }], "augustow": _74, "babia-gora": _74, "bedzin": _74, "beskidy": _74, "bialowieza": _74, "bialystok": _74, "bielawa": _74, "bieszczady": _74, "boleslawiec": _74, "bydgoszcz": _74, "bytom": _74, "cieszyn": _74, "czeladz": _74, "czest": _74, "dlugoleka": _74, "elblag": _74, "elk": _74, "glogow": _74, "gniezno": _74, "gorlice": _74, "grajewo": _74, "ilawa": _74, "jaworzno": _74, "jelenia-gora": _74, "jgora": _74, "kalisz": _74, "karpacz": _74, "kartuzy": _74, "kaszuby": _74, "katowice": _74, "kazimierz-dolny": _74, "kepno": _74, "ketrzyn": _74, "klodzko": _74, "kobierzyce": _74, "kolobrzeg": _74, "konin": _74, "konskowola": _74, "kutno": _74, "lapy": _74, "lebork": _74, "legnica": _74, "lezajsk": _74, "limanowa": _74, "lomza": _74, "lowicz": _74, "lubin": _74, "lukow": _74, "malbork": _74, "malopolska": _74, "mazowsze": _74, "mazury": _74, "mielec": _74, "mielno": _74, "mragowo": _74, "naklo": _74, "nowaruda": _74, "nysa": _74, "olawa": _74, "olecko": _74, "olkusz": _74, "olsztyn": _74, "opoczno": _74, "opole": _74, "ostroda": _74, "ostroleka": _74, "ostrowiec": _74, "ostrowwlkp": _74, "pila": _74, "pisz": _74, "podhale": _74, "podlasie": _74, "polkowice": _74, "pomorskie": _74, "pomorze": _74, "prochowice": _74, "pruszkow": _74, "przeworsk": _74, "pulawy": _74, "radom": _74, "rawa-maz": _74, "rybnik": _74, "rzeszow": _74, "sanok": _74, "sejny": _74, "skoczow": _74, "slask": _74, "slupsk": _74, "sosnowiec": _74, "stalowa-wola": _74, "starachowice": _74, "stargard": _74, "suwalki": _74, "swidnica": _74, "swiebodzin": _74, "swinoujscie": _74, "szczecin": _74, "szczytno": _74, "tarnobrzeg": _74, "tgory": _74, "turek": _74, "tychy": _74, "ustka": _74, "walbrzych": _74, "warmia": _74, "warszawa": _74, "waw": _74, "wegrow": _74, "wielun": _74, "wlocl": _74, "wloclawek": _74, "wodzislaw": _74, "wolomin": _74, "wroclaw": _74, "zachpomor": _74, "zagan": _74, "zarow": _74, "zgora": _74, "zgorzelec": _74 }], "pm": _74, "pn": [1, { "co": _74, "edu": _74, "gov": _74, "net": _74, "org": _74 }], "post": _74, "pr": [1, { "biz": _74, "com": _74, "edu": _74, "gov": _74, "info": _74, "isla": _74, "name": _74, "net": _74, "org": _74, "pro": _74, "ac": _74, "est": _74, "prof": _74 }], "pro": [1, { "aaa": _74, "aca": _74, "acct": _74, "avocat": _74, "bar": _74, "cpa": _74, "eng": _74, "jur": _74, "law": _74, "med": _74, "recht": _74 }], "ps": [1, { "com": _74, "edu": _74, "gov": _74, "net": _74, "org": _74, "plo": _74, "sec": _74 }], "pt": [1, { "com": _74, "edu": _74, "gov": _74, "int": _74, "net": _74, "nome": _74, "org": _74, "publ": _74 }], "pw": _77, "py": [1, { "com": _74, "coop": _74, "edu": _74, "gov": _74, "mil": _74, "net": _74, "org": _74 }], "qa": [1, { "com": _74, "edu": _74, "gov": _74, "mil": _74, "name": _74, "net": _74, "org": _74, "sch": _74 }], "re": [1, { "asso": _74, "com": _74 }], "ro": [1, { "arts": _74, "com": _74, "firm": _74, "info": _74, "nom": _74, "nt": _74, "org": _74, "rec": _74, "store": _74, "tm": _74, "www": _74 }], "rs": [1, { "ac": _74, "co": _74, "edu": _74, "gov": _74, "in": _74, "org": _74 }], "ru": _74, "rw": [1, { "ac": _74, "co": _74, "coop": _74, "gov": _74, "mil": _74, "net": _74, "org": _74 }], "sa": [1, { "com": _74, "edu": _74, "gov": _74, "med": _74, "net": _74, "org": _74, "pub": _74, "sch": _74 }], "sb": _76, "sc": _76, "sd": [1, { "com": _74, "edu": _74, "gov": _74, "info": _74, "med": _74, "net": _74, "org": _74, "tv": _74 }], "se": [1, { "a": _74, "ac": _74, "b": _74, "bd": _74, "brand": _74, "c": _74, "d": _74, "e": _74, "f": _74, "fh": _74, "fhsk": _74, "fhv": _74, "g": _74, "h": _74, "i": _74, "k": _74, "komforb": _74, "kommunalforbund": _74, "komvux": _74, "l": _74, "lanbib": _74, "m": _74, "n": _74, "naturbruksgymn": _74, "o": _74, "org": _74, "p": _74, "parti": _74, "pp": _74, "press": _74, "r": _74, "s": _74, "t": _74, "tm": _74, "u": _74, "w": _74, "x": _74, "y": _74, "z": _74 }], "sg": _76, "sh": [1, { "com": _74, "gov": _74, "mil": _74, "net": _74, "org": _74 }], "si": _74, "sj": _74, "sk": [1, { "org": _74 }], "sl": _76, "sm": _74, "sn": [1, { "art": _74, "com": _74, "edu": _74, "gouv": _74, "org": _74, "univ": _74 }], "so": [1, { "com": _74, "edu": _74, "gov": _74, "me": _74, "net": _74, "org": _74 }], "sr": _74, "ss": [1, { "biz": _74, "co": _74, "com": _74, "edu": _74, "gov": _74, "me": _74, "net": _74, "org": _74, "sch": _74 }], "st": [1, { "co": _74, "com": _74, "consulado": _74, "edu": _74, "embaixada": _74, "mil": _74, "net": _74, "org": _74, "principe": _74, "saotome": _74, "store": _74 }], "su": _74, "sv": [1, { "com": _74, "edu": _74, "gob": _74, "org": _74, "red": _74 }], "sx": _77, "sy": _75, "sz": [1, { "ac": _74, "co": _74, "org": _74 }], "tc": _74, "td": _74, "tel": _74, "tf": _74, "tg": _74, "th": [1, { "ac": _74, "co": _74, "go": _74, "in": _74, "mi": _74, "net": _74, "or": _74 }], "tj": [1, { "ac": _74, "biz": _74, "co": _74, "com": _74, "edu": _74, "go": _74, "gov": _74, "int": _74, "mil": _74, "name": _74, "net": _74, "nic": _74, "org": _74, "test": _74, "web": _74 }], "tk": _74, "tl": _77, "tm": _82, "tn": [1, { "com": _74, "ens": _74, "fin": _74, "gov": _74, "ind": _74, "info": _74, "intl": _74, "mincom": _74, "nat": _74, "net": _74, "org": _74, "perso": _74, "tourism": _74 }], "to": _75, "tr": [1, { "av": _74, "bbs": _74, "bel": _74, "biz": _74, "com": _74, "dr": _74, "edu": _74, "gen": _74, "gov": _74, "info": _74, "k12": _74, "kep": _74, "mil": _74, "name": _74, "net": _74, "org": _74, "pol": _74, "tel": _74, "tsk": _74, "tv": _74, "web": _74, "nc": _77 }], "tt": [1, { "biz": _74, "co": _74, "com": _74, "edu": _74, "gov": _74, "info": _74, "mil": _74, "name": _74, "net": _74, "org": _74, "pro": _74 }], "tv": _74, "tw": [1, { "club": _74, "com": _74, "ebiz": _74, "edu": _74, "game": _74, "gov": _74, "idv": _74, "mil": _74, "net": _74, "org": _74 }], "tz": [1, { "ac": _74, "co": _74, "go": _74, "hotel": _74, "info": _74, "me": _74, "mil": _74, "mobi": _74, "ne": _74, "or": _74, "sc": _74, "tv": _74 }], "ua": [1, { "com": _74, "edu": _74, "gov": _74, "in": _74, "net": _74, "org": _74, "cherkassy": _74, "cherkasy": _74, "chernigov": _74, "chernihiv": _74, "chernivtsi": _74, "chernovtsy": _74, "ck": _74, "cn": _74, "cr": _74, "crimea": _74, "cv": _74, "dn": _74, "dnepropetrovsk": _74, "dnipropetrovsk": _74, "donetsk": _74, "dp": _74, "if": _74, "ivano-frankivsk": _74, "kh": _74, "kharkiv": _74, "kharkov": _74, "kherson": _74, "khmelnitskiy": _74, "khmelnytskyi": _74, "kiev": _74, "kirovograd": _74, "km": _74, "kr": _74, "kropyvnytskyi": _74, "krym": _74, "ks": _74, "kv": _74, "kyiv": _74, "lg": _74, "lt": _74, "lugansk": _74, "luhansk": _74, "lutsk": _74, "lv": _74, "lviv": _74, "mk": _74, "mykolaiv": _74, "nikolaev": _74, "od": _74, "odesa": _74, "odessa": _74, "pl": _74, "poltava": _74, "rivne": _74, "rovno": _74, "rv": _74, "sb": _74, "sebastopol": _74, "sevastopol": _74, "sm": _74, "sumy": _74, "te": _74, "ternopil": _74, "uz": _74, "uzhgorod": _74, "uzhhorod": _74, "vinnica": _74, "vinnytsia": _74, "vn": _74, "volyn": _74, "yalta": _74, "zakarpattia": _74, "zaporizhzhe": _74, "zaporizhzhia": _74, "zhitomir": _74, "zhytomyr": _74, "zp": _74, "zt": _74 }], "ug": [1, { "ac": _74, "co": _74, "com": _74, "edu": _74, "go": _74, "gov": _74, "mil": _74, "ne": _74, "or": _74, "org": _74, "sc": _74, "us": _74 }], "uk": [1, { "ac": _74, "co": _74, "gov": _74, "ltd": _74, "me": _74, "net": _74, "nhs": _74, "org": _74, "plc": _74, "police": _74, "sch": _78 }], "us": [1, { "dni": _74, "isa": _74, "nsn": _74, "ak": _86, "al": _86, "ar": _86, "as": _86, "az": _86, "ca": _86, "co": _86, "ct": _86, "dc": _86, "de": _87, "fl": _86, "ga": _86, "gu": _86, "hi": _88, "ia": _86, "id": _86, "il": _86, "in": _86, "ks": _86, "ky": _86, "la": _86, "ma": [1, { "k12": [1, { "chtr": _74, "paroch": _74, "pvt": _74 }], "cc": _74, "lib": _74 }], "md": _86, "me": _86, "mi": [1, { "k12": _74, "cc": _74, "lib": _74, "ann-arbor": _74, "cog": _74, "dst": _74, "eaton": _74, "gen": _74, "mus": _74, "tec": _74, "washtenaw": _74 }], "mn": _86, "mo": _86, "ms": [1, { "k12": _74, "cc": _74 }], "mt": _86, "nc": _86, "nd": _88, "ne": _86, "nh": _86, "nj": _86, "nm": _86, "nv": _86, "ny": _86, "oh": _86, "ok": _86, "or": _86, "pa": _86, "pr": _86, "ri": _88, "sc": _86, "sd": _88, "tn": _86, "tx": _86, "ut": _86, "va": _86, "vi": _86, "vt": _86, "wa": _86, "wi": _86, "wv": _87, "wy": _86 }], "uy": [1, { "com": _74, "edu": _74, "gub": _74, "mil": _74, "net": _74, "org": _74 }], "uz": [1, { "co": _74, "com": _74, "net": _74, "org": _74 }], "va": _74, "vc": _75, "ve": [1, { "arts": _74, "bib": _74, "co": _74, "com": _74, "e12": _74, "edu": _74, "emprende": _74, "firm": _74, "gob": _74, "gov": _74, "ia": _74, "info": _74, "int": _74, "mil": _74, "net": _74, "nom": _74, "org": _74, "rar": _74, "rec": _74, "store": _74, "tec": _74, "web": _74 }], "vg": [1, { "edu": _74 }], "vi": [1, { "co": _74, "com": _74, "k12": _74, "net": _74, "org": _74 }], "vn": [1, { "ac": _74, "ai": _74, "biz": _74, "com": _74, "edu": _74, "gov": _74, "health": _74, "id": _74, "info": _74, "int": _74, "io": _74, "name": _74, "net": _74, "org": _74, "pro": _74, "angiang": _74, "bacgiang": _74, "backan": _74, "baclieu": _74, "bacninh": _74, "baria-vungtau": _74, "bentre": _74, "binhdinh": _74, "binhduong": _74, "binhphuoc": _74, "binhthuan": _74, "camau": _74, "cantho": _74, "caobang": _74, "daklak": _74, "daknong": _74, "danang": _74, "dienbien": _74, "dongnai": _74, "dongthap": _74, "gialai": _74, "hagiang": _74, "haiduong": _74, "haiphong": _74, "hanam": _74, "hanoi": _74, "hatinh": _74, "haugiang": _74, "hoabinh": _74, "hue": _74, "hungyen": _74, "khanhhoa": _74, "kiengiang": _74, "kontum": _74, "laichau": _74, "lamdong": _74, "langson": _74, "laocai": _74, "longan": _74, "namdinh": _74, "nghean": _74, "ninhbinh": _74, "ninhthuan": _74, "phutho": _74, "phuyen": _74, "quangbinh": _74, "quangnam": _74, "quangngai": _74, "quangninh": _74, "quangtri": _74, "soctrang": _74, "sonla": _74, "tayninh": _74, "thaibinh": _74, "thainguyen": _74, "thanhhoa": _74, "thanhphohochiminh": _74, "thuathienhue": _74, "tiengiang": _74, "travinh": _74, "tuyenquang": _74, "vinhlong": _74, "vinhphuc": _74, "yenbai": _74 }], "vu": _80, "wf": _74, "ws": _76, "yt": _74, "xn--mgbaam7a8h": _74, "\u0627\u0645\u0627\u0631\u0627\u062A": _74, "xn--y9a3aq": _74, "\u0570\u0561\u0575": _74, "xn--54b7fta0cc": _74, "\u09AC\u09BE\u0982\u09B2\u09BE": _74, "xn--90ae": _74, "\u0431\u0433": _74, "xn--mgbcpq6gpa1a": _74, "\u0627\u0644\u0628\u062D\u0631\u064A\u0646": _74, "xn--90ais": _74, "\u0431\u0435\u043B": _74, "xn--fiqs8s": _74, "\u4E2D\u56FD": _74, "xn--fiqz9s": _74, "\u4E2D\u570B": _74, "xn--lgbbat1ad8j": _74, "\u0627\u0644\u062C\u0632\u0627\u0626\u0631": _74, "xn--wgbh1c": _74, "\u0645\u0635\u0631": _74, "xn--e1a4c": _74, "\u0435\u044E": _74, "xn--qxa6a": _74, "\u03B5\u03C5": _74, "xn--mgbah1a3hjkrd": _74, "\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627": _74, "xn--node": _74, "\u10D2\u10D4": _74, "xn--qxam": _74, "\u03B5\u03BB": _74, "xn--j6w193g": [1, { "xn--gmqw5a": _74, "xn--55qx5d": _74, "xn--mxtq1m": _74, "xn--wcvs22d": _74, "xn--uc0atv": _74, "xn--od0alg": _74 }], "\u9999\u6E2F": [1, { "\u500B\u4EBA": _74, "\u516C\u53F8": _74, "\u653F\u5E9C": _74, "\u6559\u80B2": _74, "\u7D44\u7E54": _74, "\u7DB2\u7D61": _74 }], "xn--2scrj9c": _74, "\u0CAD\u0CBE\u0CB0\u0CA4": _74, "xn--3hcrj9c": _74, "\u0B2D\u0B3E\u0B30\u0B24": _74, "xn--45br5cyl": _74, "\u09AD\u09BE\u09F0\u09A4": _74, "xn--h2breg3eve": _74, "\u092D\u093E\u0930\u0924\u092E\u094D": _74, "xn--h2brj9c8c": _74, "\u092D\u093E\u0930\u094B\u0924": _74, "xn--mgbgu82a": _74, "\u0680\u0627\u0631\u062A": _74, "xn--rvc1e0am3e": _74, "\u0D2D\u0D3E\u0D30\u0D24\u0D02": _74, "xn--h2brj9c": _74, "\u092D\u093E\u0930\u0924": _74, "xn--mgbbh1a": _74, "\u0628\u0627\u0631\u062A": _74, "xn--mgbbh1a71e": _74, "\u0628\u06BE\u0627\u0631\u062A": _74, "xn--fpcrj9c3d": _74, "\u0C2D\u0C3E\u0C30\u0C24\u0C4D": _74, "xn--gecrj9c": _74, "\u0AAD\u0ABE\u0AB0\u0AA4": _74, "xn--s9brj9c": _74, "\u0A2D\u0A3E\u0A30\u0A24": _74, "xn--45brj9c": _74, "\u09AD\u09BE\u09B0\u09A4": _74, "xn--xkc2dl3a5ee0h": _74, "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE": _74, "xn--mgba3a4f16a": _74, "\u0627\u06CC\u0631\u0627\u0646": _74, "xn--mgba3a4fra": _74, "\u0627\u064A\u0631\u0627\u0646": _74, "xn--mgbtx2b": _74, "\u0639\u0631\u0627\u0642": _74, "xn--mgbayh7gpa": _74, "\u0627\u0644\u0627\u0631\u062F\u0646": _74, "xn--3e0b707e": _74, "\uD55C\uAD6D": _74, "xn--80ao21a": _74, "\u049B\u0430\u0437": _74, "xn--q7ce6a": _74, "\u0EA5\u0EB2\u0EA7": _74, "xn--fzc2c9e2c": _74, "\u0DBD\u0D82\u0D9A\u0DCF": _74, "xn--xkc2al3hye2a": _74, "\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8": _74, "xn--mgbc0a9azcg": _74, "\u0627\u0644\u0645\u063A\u0631\u0628": _74, "xn--d1alf": _74, "\u043C\u043A\u0434": _74, "xn--l1acc": _74, "\u043C\u043E\u043D": _74, "xn--mix891f": _74, "\u6FB3\u9580": _74, "xn--mix082f": _74, "\u6FB3\u95E8": _74, "xn--mgbx4cd0ab": _74, "\u0645\u0644\u064A\u0633\u064A\u0627": _74, "xn--mgb9awbf": _74, "\u0639\u0645\u0627\u0646": _74, "xn--mgbai9azgqp6j": _74, "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646": _74, "xn--mgbai9a5eva00b": _74, "\u067E\u0627\u0643\u0633\u062A\u0627\u0646": _74, "xn--ygbi2ammx": _74, "\u0641\u0644\u0633\u0637\u064A\u0646": _74, "xn--90a3ac": [1, { "xn--80au": _74, "xn--90azh": _74, "xn--d1at": _74, "xn--c1avg": _74, "xn--o1ac": _74, "xn--o1ach": _74 }], "\u0441\u0440\u0431": [1, { "\u0430\u043A": _74, "\u043E\u0431\u0440": _74, "\u043E\u0434": _74, "\u043E\u0440\u0433": _74, "\u043F\u0440": _74, "\u0443\u043F\u0440": _74 }], "xn--p1ai": _74, "\u0440\u0444": _74, "xn--wgbl6a": _74, "\u0642\u0637\u0631": _74, "xn--mgberp4a5d4ar": _74, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629": _74, "xn--mgberp4a5d4a87g": _74, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u0629": _74, "xn--mgbqly7c0a67fbc": _74, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u06C3": _74, "xn--mgbqly7cvafr": _74, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0647": _74, "xn--mgbpl2fh": _74, "\u0633\u0648\u062F\u0627\u0646": _74, "xn--yfro4i67o": _74, "\u65B0\u52A0\u5761": _74, "xn--clchc0ea0b2g2a9gcd": _74, "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD": _74, "xn--ogbpf8fl": _74, "\u0633\u0648\u0631\u064A\u0629": _74, "xn--mgbtf8fl": _74, "\u0633\u0648\u0631\u064A\u0627": _74, "xn--o3cw4h": [1, { "xn--o3cyx2a": _74, "xn--12co0c3b4eva": _74, "xn--m3ch0j3a": _74, "xn--h3cuzk1di": _74, "xn--12c1fe0br": _74, "xn--12cfi8ixb8l": _74 }], "\u0E44\u0E17\u0E22": [1, { "\u0E17\u0E2B\u0E32\u0E23": _74, "\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08": _74, "\u0E40\u0E19\u0E47\u0E15": _74, "\u0E23\u0E31\u0E10\u0E1A\u0E32\u0E25": _74, "\u0E28\u0E36\u0E01\u0E29\u0E32": _74, "\u0E2D\u0E07\u0E04\u0E4C\u0E01\u0E23": _74 }], "xn--pgbs0dh": _74, "\u062A\u0648\u0646\u0633": _74, "xn--kpry57d": _74, "\u53F0\u7063": _74, "xn--kprw13d": _74, "\u53F0\u6E7E": _74, "xn--nnx388a": _74, "\u81FA\u7063": _74, "xn--j1amh": _74, "\u0443\u043A\u0440": _74, "xn--mgb2ddes": _74, "\u0627\u0644\u064A\u0645\u0646": _74, "xxx": _74, "ye": _75, "za": [0, { "ac": _74, "agric": _74, "alt": _74, "co": _74, "edu": _74, "gov": _74, "grondar": _74, "law": _74, "mil": _74, "net": _74, "ngo": _74, "nic": _74, "nis": _74, "nom": _74, "org": _74, "school": _74, "tm": _74, "web": _74 }], "zm": [1, { "ac": _74, "biz": _74, "co": _74, "com": _74, "edu": _74, "gov": _74, "info": _74, "mil": _74, "net": _74, "org": _74, "sch": _74 }], "zw": [1, { "ac": _74, "co": _74, "gov": _74, "mil": _74, "org": _74 }], "aaa": _74, "aarp": _74, "abb": _74, "abbott": _74, "abbvie": _74, "abc": _74, "able": _74, "abogado": _74, "abudhabi": _74, "academy": _74, "accenture": _74, "accountant": _74, "accountants": _74, "aco": _74, "actor": _74, "ads": _74, "adult": _74, "aeg": _74, "aetna": _74, "afl": _74, "africa": _74, "agakhan": _74, "agency": _74, "aig": _74, "airbus": _74, "airforce": _74, "airtel": _74, "akdn": _74, "alibaba": _74, "alipay": _74, "allfinanz": _74, "allstate": _74, "ally": _74, "alsace": _74, "alstom": _74, "amazon": _74, "americanexpress": _74, "americanfamily": _74, "amex": _74, "amfam": _74, "amica": _74, "amsterdam": _74, "analytics": _74, "android": _74, "anquan": _74, "anz": _74, "aol": _74, "apartments": _74, "app": _74, "apple": _74, "aquarelle": _74, "arab": _74, "aramco": _74, "archi": _74, "army": _74, "art": _74, "arte": _74, "asda": _74, "associates": _74, "athleta": _74, "attorney": _74, "auction": _74, "audi": _74, "audible": _74, "audio": _74, "auspost": _74, "author": _74, "auto": _74, "autos": _74, "aws": _74, "axa": _74, "azure": _74, "baby": _74, "baidu": _74, "banamex": _74, "band": _74, "bank": _74, "bar": _74, "barcelona": _74, "barclaycard": _74, "barclays": _74, "barefoot": _74, "bargains": _74, "baseball": _74, "basketball": _74, "bauhaus": _74, "bayern": _74, "bbc": _74, "bbt": _74, "bbva": _74, "bcg": _74, "bcn": _74, "beats": _74, "beauty": _74, "beer": _74, "berlin": _74, "best": _74, "bestbuy": _74, "bet": _74, "bharti": _74, "bible": _74, "bid": _74, "bike": _74, "bing": _74, "bingo": _74, "bio": _74, "black": _74, "blackfriday": _74, "blockbuster": _74, "blog": _74, "bloomberg": _74, "blue": _74, "bms": _74, "bmw": _74, "bnpparibas": _74, "boats": _74, "boehringer": _74, "bofa": _74, "bom": _74, "bond": _74, "boo": _74, "book": _74, "booking": _74, "bosch": _74, "bostik": _74, "boston": _74, "bot": _74, "boutique": _74, "box": _74, "bradesco": _74, "bridgestone": _74, "broadway": _74, "broker": _74, "brother": _74, "brussels": _74, "build": _74, "builders": _74, "business": _74, "buy": _74, "buzz": _74, "bzh": _74, "cab": _74, "cafe": _74, "cal": _74, "call": _74, "calvinklein": _74, "cam": _74, "camera": _74, "camp": _74, "canon": _74, "capetown": _74, "capital": _74, "capitalone": _74, "car": _74, "caravan": _74, "cards": _74, "care": _74, "career": _74, "careers": _74, "cars": _74, "casa": _74, "case": _74, "cash": _74, "casino": _74, "catering": _74, "catholic": _74, "cba": _74, "cbn": _74, "cbre": _74, "center": _74, "ceo": _74, "cern": _74, "cfa": _74, "cfd": _74, "chanel": _74, "channel": _74, "charity": _74, "chase": _74, "chat": _74, "cheap": _74, "chintai": _74, "christmas": _74, "chrome": _74, "church": _74, "cipriani": _74, "circle": _74, "cisco": _74, "citadel": _74, "citi": _74, "citic": _74, "city": _74, "claims": _74, "cleaning": _74, "click": _74, "clinic": _74, "clinique": _74, "clothing": _74, "cloud": _74, "club": _74, "clubmed": _74, "coach": _74, "codes": _74, "coffee": _74, "college": _74, "cologne": _74, "commbank": _74, "community": _74, "company": _74, "compare": _74, "computer": _74, "comsec": _74, "condos": _74, "construction": _74, "consulting": _74, "contact": _74, "contractors": _74, "cooking": _74, "cool": _74, "corsica": _74, "country": _74, "coupon": _74, "coupons": _74, "courses": _74, "cpa": _74, "credit": _74, "creditcard": _74, "creditunion": _74, "cricket": _74, "crown": _74, "crs": _74, "cruise": _74, "cruises": _74, "cuisinella": _74, "cymru": _74, "cyou": _74, "dad": _74, "dance": _74, "data": _74, "date": _74, "dating": _74, "datsun": _74, "day": _74, "dclk": _74, "dds": _74, "deal": _74, "dealer": _74, "deals": _74, "degree": _74, "delivery": _74, "dell": _74, "deloitte": _74, "delta": _74, "democrat": _74, "dental": _74, "dentist": _74, "desi": _74, "design": _74, "dev": _74, "dhl": _74, "diamonds": _74, "diet": _74, "digital": _74, "direct": _74, "directory": _74, "discount": _74, "discover": _74, "dish": _74, "diy": _74, "dnp": _74, "docs": _74, "doctor": _74, "dog": _74, "domains": _74, "dot": _74, "download": _74, "drive": _74, "dtv": _74, "dubai": _74, "dupont": _74, "durban": _74, "dvag": _74, "dvr": _74, "earth": _74, "eat": _74, "eco": _74, "edeka": _74, "education": _74, "email": _74, "emerck": _74, "energy": _74, "engineer": _74, "engineering": _74, "enterprises": _74, "epson": _74, "equipment": _74, "ericsson": _74, "erni": _74, "esq": _74, "estate": _74, "eurovision": _74, "eus": _74, "events": _74, "exchange": _74, "expert": _74, "exposed": _74, "express": _74, "extraspace": _74, "fage": _74, "fail": _74, "fairwinds": _74, "faith": _74, "family": _74, "fan": _74, "fans": _74, "farm": _74, "farmers": _74, "fashion": _74, "fast": _74, "fedex": _74, "feedback": _74, "ferrari": _74, "ferrero": _74, "fidelity": _74, "fido": _74, "film": _74, "final": _74, "finance": _74, "financial": _74, "fire": _74, "firestone": _74, "firmdale": _74, "fish": _74, "fishing": _74, "fit": _74, "fitness": _74, "flickr": _74, "flights": _74, "flir": _74, "florist": _74, "flowers": _74, "fly": _74, "foo": _74, "food": _74, "football": _74, "ford": _74, "forex": _74, "forsale": _74, "forum": _74, "foundation": _74, "fox": _74, "free": _74, "fresenius": _74, "frl": _74, "frogans": _74, "frontier": _74, "ftr": _74, "fujitsu": _74, "fun": _74, "fund": _74, "furniture": _74, "futbol": _74, "fyi": _74, "gal": _74, "gallery": _74, "gallo": _74, "gallup": _74, "game": _74, "games": _74, "gap": _74, "garden": _74, "gay": _74, "gbiz": _74, "gdn": _74, "gea": _74, "gent": _74, "genting": _74, "george": _74, "ggee": _74, "gift": _74, "gifts": _74, "gives": _74, "giving": _74, "glass": _74, "gle": _74, "global": _74, "globo": _74, "gmail": _74, "gmbh": _74, "gmo": _74, "gmx": _74, "godaddy": _74, "gold": _74, "goldpoint": _74, "golf": _74, "goodyear": _74, "goog": _74, "google": _74, "gop": _74, "got": _74, "grainger": _74, "graphics": _74, "gratis": _74, "green": _74, "gripe": _74, "grocery": _74, "group": _74, "gucci": _74, "guge": _74, "guide": _74, "guitars": _74, "guru": _74, "hair": _74, "hamburg": _74, "hangout": _74, "haus": _74, "hbo": _74, "hdfc": _74, "hdfcbank": _74, "health": _74, "healthcare": _74, "help": _74, "helsinki": _74, "here": _74, "hermes": _74, "hiphop": _74, "hisamitsu": _74, "hitachi": _74, "hiv": _74, "hkt": _74, "hockey": _74, "holdings": _74, "holiday": _74, "homedepot": _74, "homegoods": _74, "homes": _74, "homesense": _74, "honda": _74, "horse": _74, "hospital": _74, "host": _74, "hosting": _74, "hot": _74, "hotel": _74, "hotels": _74, "hotmail": _74, "house": _74, "how": _74, "hsbc": _74, "hughes": _74, "hyatt": _74, "hyundai": _74, "ibm": _74, "icbc": _74, "ice": _74, "icu": _74, "ieee": _74, "ifm": _74, "ikano": _74, "imamat": _74, "imdb": _74, "immo": _74, "immobilien": _74, "inc": _74, "industries": _74, "infiniti": _74, "ing": _74, "ink": _74, "institute": _74, "insurance": _74, "insure": _74, "international": _74, "intuit": _74, "investments": _74, "ipiranga": _74, "irish": _74, "ismaili": _74, "ist": _74, "istanbul": _74, "itau": _74, "itv": _74, "jaguar": _74, "java": _74, "jcb": _74, "jeep": _74, "jetzt": _74, "jewelry": _74, "jio": _74, "jll": _74, "jmp": _74, "jnj": _74, "joburg": _74, "jot": _74, "joy": _74, "jpmorgan": _74, "jprs": _74, "juegos": _74, "juniper": _74, "kaufen": _74, "kddi": _74, "kerryhotels": _74, "kerryproperties": _74, "kfh": _74, "kia": _74, "kids": _74, "kim": _74, "kindle": _74, "kitchen": _74, "kiwi": _74, "koeln": _74, "komatsu": _74, "kosher": _74, "kpmg": _74, "kpn": _74, "krd": _74, "kred": _74, "kuokgroup": _74, "kyoto": _74, "lacaixa": _74, "lamborghini": _74, "lamer": _74, "land": _74, "landrover": _74, "lanxess": _74, "lasalle": _74, "lat": _74, "latino": _74, "latrobe": _74, "law": _74, "lawyer": _74, "lds": _74, "lease": _74, "leclerc": _74, "lefrak": _74, "legal": _74, "lego": _74, "lexus": _74, "lgbt": _74, "lidl": _74, "life": _74, "lifeinsurance": _74, "lifestyle": _74, "lighting": _74, "like": _74, "lilly": _74, "limited": _74, "limo": _74, "lincoln": _74, "link": _74, "live": _74, "living": _74, "llc": _74, "llp": _74, "loan": _74, "loans": _74, "locker": _74, "locus": _74, "lol": _74, "london": _74, "lotte": _74, "lotto": _74, "love": _74, "lpl": _74, "lplfinancial": _74, "ltd": _74, "ltda": _74, "lundbeck": _74, "luxe": _74, "luxury": _74, "madrid": _74, "maif": _74, "maison": _74, "makeup": _74, "man": _74, "management": _74, "mango": _74, "map": _74, "market": _74, "marketing": _74, "markets": _74, "marriott": _74, "marshalls": _74, "mattel": _74, "mba": _74, "mckinsey": _74, "med": _74, "media": _74, "meet": _74, "melbourne": _74, "meme": _74, "memorial": _74, "men": _74, "menu": _74, "merck": _74, "merckmsd": _74, "miami": _74, "microsoft": _74, "mini": _74, "mint": _74, "mit": _74, "mitsubishi": _74, "mlb": _74, "mls": _74, "mma": _74, "mobile": _74, "moda": _74, "moe": _74, "moi": _74, "mom": _74, "monash": _74, "money": _74, "monster": _74, "mormon": _74, "mortgage": _74, "moscow": _74, "moto": _74, "motorcycles": _74, "mov": _74, "movie": _74, "msd": _74, "mtn": _74, "mtr": _74, "music": _74, "nab": _74, "nagoya": _74, "navy": _74, "nba": _74, "nec": _74, "netbank": _74, "netflix": _74, "network": _74, "neustar": _74, "new": _74, "news": _74, "next": _74, "nextdirect": _74, "nexus": _74, "nfl": _74, "ngo": _74, "nhk": _74, "nico": _74, "nike": _74, "nikon": _74, "ninja": _74, "nissan": _74, "nissay": _74, "nokia": _74, "norton": _74, "now": _74, "nowruz": _74, "nowtv": _74, "nra": _74, "nrw": _74, "ntt": _74, "nyc": _74, "obi": _74, "observer": _74, "office": _74, "okinawa": _74, "olayan": _74, "olayangroup": _74, "ollo": _74, "omega": _74, "one": _74, "ong": _74, "onl": _74, "online": _74, "ooo": _74, "open": _74, "oracle": _74, "orange": _74, "organic": _74, "origins": _74, "osaka": _74, "otsuka": _74, "ott": _74, "ovh": _74, "page": _74, "panasonic": _74, "paris": _74, "pars": _74, "partners": _74, "parts": _74, "party": _74, "pay": _74, "pccw": _74, "pet": _74, "pfizer": _74, "pharmacy": _74, "phd": _74, "philips": _74, "phone": _74, "photo": _74, "photography": _74, "photos": _74, "physio": _74, "pics": _74, "pictet": _74, "pictures": _74, "pid": _74, "pin": _74, "ping": _74, "pink": _74, "pioneer": _74, "pizza": _74, "place": _74, "play": _74, "playstation": _74, "plumbing": _74, "plus": _74, "pnc": _74, "pohl": _74, "poker": _74, "politie": _74, "porn": _74, "praxi": _74, "press": _74, "prime": _74, "prod": _74, "productions": _74, "prof": _74, "progressive": _74, "promo": _74, "properties": _74, "property": _74, "protection": _74, "pru": _74, "prudential": _74, "pub": _74, "pwc": _74, "qpon": _74, "quebec": _74, "quest": _74, "racing": _74, "radio": _74, "read": _74, "realestate": _74, "realtor": _74, "realty": _74, "recipes": _74, "red": _74, "redumbrella": _74, "rehab": _74, "reise": _74, "reisen": _74, "reit": _74, "reliance": _74, "ren": _74, "rent": _74, "rentals": _74, "repair": _74, "report": _74, "republican": _74, "rest": _74, "restaurant": _74, "review": _74, "reviews": _74, "rexroth": _74, "rich": _74, "richardli": _74, "ricoh": _74, "ril": _74, "rio": _74, "rip": _74, "rocks": _74, "rodeo": _74, "rogers": _74, "room": _74, "rsvp": _74, "rugby": _74, "ruhr": _74, "run": _74, "rwe": _74, "ryukyu": _74, "saarland": _74, "safe": _74, "safety": _74, "sakura": _74, "sale": _74, "salon": _74, "samsclub": _74, "samsung": _74, "sandvik": _74, "sandvikcoromant": _74, "sanofi": _74, "sap": _74, "sarl": _74, "sas": _74, "save": _74, "saxo": _74, "sbi": _74, "sbs": _74, "scb": _74, "schaeffler": _74, "schmidt": _74, "scholarships": _74, "school": _74, "schule": _74, "schwarz": _74, "science": _74, "scot": _74, "search": _74, "seat": _74, "secure": _74, "security": _74, "seek": _74, "select": _74, "sener": _74, "services": _74, "seven": _74, "sew": _74, "sex": _74, "sexy": _74, "sfr": _74, "shangrila": _74, "sharp": _74, "shell": _74, "shia": _74, "shiksha": _74, "shoes": _74, "shop": _74, "shopping": _74, "shouji": _74, "show": _74, "silk": _74, "sina": _74, "singles": _74, "site": _74, "ski": _74, "skin": _74, "sky": _74, "skype": _74, "sling": _74, "smart": _74, "smile": _74, "sncf": _74, "soccer": _74, "social": _74, "softbank": _74, "software": _74, "sohu": _74, "solar": _74, "solutions": _74, "song": _74, "sony": _74, "soy": _74, "spa": _74, "space": _74, "sport": _74, "spot": _74, "srl": _74, "stada": _74, "staples": _74, "star": _74, "statebank": _74, "statefarm": _74, "stc": _74, "stcgroup": _74, "stockholm": _74, "storage": _74, "store": _74, "stream": _74, "studio": _74, "study": _74, "style": _74, "sucks": _74, "supplies": _74, "supply": _74, "support": _74, "surf": _74, "surgery": _74, "suzuki": _74, "swatch": _74, "swiss": _74, "sydney": _74, "systems": _74, "tab": _74, "taipei": _74, "talk": _74, "taobao": _74, "target": _74, "tatamotors": _74, "tatar": _74, "tattoo": _74, "tax": _74, "taxi": _74, "tci": _74, "tdk": _74, "team": _74, "tech": _74, "technology": _74, "temasek": _74, "tennis": _74, "teva": _74, "thd": _74, "theater": _74, "theatre": _74, "tiaa": _74, "tickets": _74, "tienda": _74, "tips": _74, "tires": _74, "tirol": _74, "tjmaxx": _74, "tjx": _74, "tkmaxx": _74, "tmall": _74, "today": _74, "tokyo": _74, "tools": _74, "top": _74, "toray": _74, "toshiba": _74, "total": _74, "tours": _74, "town": _74, "toyota": _74, "toys": _74, "trade": _74, "trading": _74, "training": _74, "travel": _74, "travelers": _74, "travelersinsurance": _74, "trust": _74, "trv": _74, "tube": _74, "tui": _74, "tunes": _74, "tushu": _74, "tvs": _74, "ubank": _74, "ubs": _74, "unicom": _74, "university": _74, "uno": _74, "uol": _74, "ups": _74, "vacations": _74, "vana": _74, "vanguard": _74, "vegas": _74, "ventures": _74, "verisign": _74, "versicherung": _74, "vet": _74, "viajes": _74, "video": _74, "vig": _74, "viking": _74, "villas": _74, "vin": _74, "vip": _74, "virgin": _74, "visa": _74, "vision": _74, "viva": _74, "vivo": _74, "vlaanderen": _74, "vodka": _74, "volvo": _74, "vote": _74, "voting": _74, "voto": _74, "voyage": _74, "wales": _74, "walmart": _74, "walter": _74, "wang": _74, "wanggou": _74, "watch": _74, "watches": _74, "weather": _74, "weatherchannel": _74, "webcam": _74, "weber": _74, "website": _74, "wed": _74, "wedding": _74, "weibo": _74, "weir": _74, "whoswho": _74, "wien": _74, "wiki": _74, "williamhill": _74, "win": _74, "windows": _74, "wine": _74, "winners": _74, "wme": _74, "woodside": _74, "work": _74, "works": _74, "world": _74, "wow": _74, "wtc": _74, "wtf": _74, "xbox": _74, "xerox": _74, "xihuan": _74, "xin": _74, "xn--11b4c3d": _74, "\u0915\u0949\u092E": _74, "xn--1ck2e1b": _74, "\u30BB\u30FC\u30EB": _74, "xn--1qqw23a": _74, "\u4F5B\u5C71": _74, "xn--30rr7y": _74, "\u6148\u5584": _74, "xn--3bst00m": _74, "\u96C6\u56E2": _74, "xn--3ds443g": _74, "\u5728\u7EBF": _74, "xn--3pxu8k": _74, "\u70B9\u770B": _74, "xn--42c2d9a": _74, "\u0E04\u0E2D\u0E21": _74, "xn--45q11c": _74, "\u516B\u5366": _74, "xn--4gbrim": _74, "\u0645\u0648\u0642\u0639": _74, "xn--55qw42g": _74, "\u516C\u76CA": _74, "xn--55qx5d": _74, "\u516C\u53F8": _74, "xn--5su34j936bgsg": _74, "\u9999\u683C\u91CC\u62C9": _74, "xn--5tzm5g": _74, "\u7F51\u7AD9": _74, "xn--6frz82g": _74, "\u79FB\u52A8": _74, "xn--6qq986b3xl": _74, "\u6211\u7231\u4F60": _74, "xn--80adxhks": _74, "\u043C\u043E\u0441\u043A\u0432\u0430": _74, "xn--80aqecdr1a": _74, "\u043A\u0430\u0442\u043E\u043B\u0438\u043A": _74, "xn--80asehdb": _74, "\u043E\u043D\u043B\u0430\u0439\u043D": _74, "xn--80aswg": _74, "\u0441\u0430\u0439\u0442": _74, "xn--8y0a063a": _74, "\u8054\u901A": _74, "xn--9dbq2a": _74, "\u05E7\u05D5\u05DD": _74, "xn--9et52u": _74, "\u65F6\u5C1A": _74, "xn--9krt00a": _74, "\u5FAE\u535A": _74, "xn--b4w605ferd": _74, "\u6DE1\u9A6C\u9521": _74, "xn--bck1b9a5dre4c": _74, "\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3": _74, "xn--c1avg": _74, "\u043E\u0440\u0433": _74, "xn--c2br7g": _74, "\u0928\u0947\u091F": _74, "xn--cck2b3b": _74, "\u30B9\u30C8\u30A2": _74, "xn--cckwcxetd": _74, "\u30A2\u30DE\u30BE\u30F3": _74, "xn--cg4bki": _74, "\uC0BC\uC131": _74, "xn--czr694b": _74, "\u5546\u6807": _74, "xn--czrs0t": _74, "\u5546\u5E97": _74, "xn--czru2d": _74, "\u5546\u57CE": _74, "xn--d1acj3b": _74, "\u0434\u0435\u0442\u0438": _74, "xn--eckvdtc9d": _74, "\u30DD\u30A4\u30F3\u30C8": _74, "xn--efvy88h": _74, "\u65B0\u95FB": _74, "xn--fct429k": _74, "\u5BB6\u96FB": _74, "xn--fhbei": _74, "\u0643\u0648\u0645": _74, "xn--fiq228c5hs": _74, "\u4E2D\u6587\u7F51": _74, "xn--fiq64b": _74, "\u4E2D\u4FE1": _74, "xn--fjq720a": _74, "\u5A31\u4E50": _74, "xn--flw351e": _74, "\u8C37\u6B4C": _74, "xn--fzys8d69uvgm": _74, "\u96FB\u8A0A\u76C8\u79D1": _74, "xn--g2xx48c": _74, "\u8D2D\u7269": _74, "xn--gckr3f0f": _74, "\u30AF\u30E9\u30A6\u30C9": _74, "xn--gk3at1e": _74, "\u901A\u8CA9": _74, "xn--hxt814e": _74, "\u7F51\u5E97": _74, "xn--i1b6b1a6a2e": _74, "\u0938\u0902\u0917\u0920\u0928": _74, "xn--imr513n": _74, "\u9910\u5385": _74, "xn--io0a7i": _74, "\u7F51\u7EDC": _74, "xn--j1aef": _74, "\u043A\u043E\u043C": _74, "xn--jlq480n2rg": _74, "\u4E9A\u9A6C\u900A": _74, "xn--jvr189m": _74, "\u98DF\u54C1": _74, "xn--kcrx77d1x4a": _74, "\u98DE\u5229\u6D66": _74, "xn--kput3i": _74, "\u624B\u673A": _74, "xn--mgba3a3ejt": _74, "\u0627\u0631\u0627\u0645\u0643\u0648": _74, "xn--mgba7c0bbn0a": _74, "\u0627\u0644\u0639\u0644\u064A\u0627\u0646": _74, "xn--mgbab2bd": _74, "\u0628\u0627\u0632\u0627\u0631": _74, "xn--mgbca7dzdo": _74, "\u0627\u0628\u0648\u0638\u0628\u064A": _74, "xn--mgbi4ecexp": _74, "\u0643\u0627\u062B\u0648\u0644\u064A\u0643": _74, "xn--mgbt3dhd": _74, "\u0647\u0645\u0631\u0627\u0647": _74, "xn--mk1bu44c": _74, "\uB2F7\uCEF4": _74, "xn--mxtq1m": _74, "\u653F\u5E9C": _74, "xn--ngbc5azd": _74, "\u0634\u0628\u0643\u0629": _74, "xn--ngbe9e0a": _74, "\u0628\u064A\u062A\u0643": _74, "xn--ngbrx": _74, "\u0639\u0631\u0628": _74, "xn--nqv7f": _74, "\u673A\u6784": _74, "xn--nqv7fs00ema": _74, "\u7EC4\u7EC7\u673A\u6784": _74, "xn--nyqy26a": _74, "\u5065\u5EB7": _74, "xn--otu796d": _74, "\u62DB\u8058": _74, "xn--p1acf": _74, "\u0440\u0443\u0441": _74, "xn--pssy2u": _74, "\u5927\u62FF": _74, "xn--q9jyb4c": _74, "\u307F\u3093\u306A": _74, "xn--qcka1pmc": _74, "\u30B0\u30FC\u30B0\u30EB": _74, "xn--rhqv96g": _74, "\u4E16\u754C": _74, "xn--rovu88b": _74, "\u66F8\u7C4D": _74, "xn--ses554g": _74, "\u7F51\u5740": _74, "xn--t60b56a": _74, "\uB2F7\uB137": _74, "xn--tckwe": _74, "\u30B3\u30E0": _74, "xn--tiq49xqyj": _74, "\u5929\u4E3B\u6559": _74, "xn--unup4y": _74, "\u6E38\u620F": _74, "xn--vermgensberater-ctb": _74, "verm\xF6gensberater": _74, "xn--vermgensberatung-pwb": _74, "verm\xF6gensberatung": _74, "xn--vhquv": _74, "\u4F01\u4E1A": _74, "xn--vuq861b": _74, "\u4FE1\u606F": _74, "xn--w4r85el8fhu5dnra": _74, "\u5609\u91CC\u5927\u9152\u5E97": _74, "xn--w4rs40l": _74, "\u5609\u91CC": _74, "xn--xhq521b": _74, "\u5E7F\u4E1C": _74, "xn--zfr164b": _74, "\u653F\u52A1": _74, "xyz": _74, "yachts": _74, "yahoo": _74, "yamaxun": _74, "yandex": _74, "yodobashi": _74, "yoga": _74, "yokohama": _74, "you": _74, "youtube": _74, "yun": _74, "zappos": _74, "zara": _74, "zero": _74, "zip": _74, "zone": _74, "zuerich": _74 }];
      return rules2;
    })();
    function lookupInTrie(parts, trie, index) {
      let result = null;
      let node = trie;
      while (node !== void 0) {
        if (node[0] === 1) {
          result = {
            index: index + 1
          };
        }
        if (index === -1) {
          break;
        }
        const succ = node[1];
        node = Object.prototype.hasOwnProperty.call(succ, parts[index]) ? succ[parts[index]] : succ["*"];
        index -= 1;
      }
      return result;
    }
    __name(lookupInTrie, "lookupInTrie");
    function suffixLookup(hostname, options, out) {
      var _a;
      if (fastPathLookup(hostname, options, out)) {
        return;
      }
      const hostnameParts = hostname.split(".");
      const exceptionMatch = lookupInTrie(hostnameParts, exceptions, hostnameParts.length - 1);
      if (exceptionMatch !== null) {
        out.publicSuffix = hostnameParts.slice(exceptionMatch.index + 1).join(".");
        return;
      }
      const rulesMatch = lookupInTrie(hostnameParts, rules, hostnameParts.length - 1);
      if (rulesMatch !== null) {
        out.publicSuffix = hostnameParts.slice(rulesMatch.index).join(".");
        return;
      }
      out.publicSuffix = (_a = hostnameParts[hostnameParts.length - 1]) !== null && _a !== void 0 ? _a : null;
    }
    __name(suffixLookup, "suffixLookup");
    var RESULT = getEmptyResult();
    function parse(url, options = {}) {
      return parseImpl(url, 5, suffixLookup, options, getEmptyResult());
    }
    __name(parse, "parse");
    function getHostname(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 0, suffixLookup, options, RESULT).hostname;
    }
    __name(getHostname, "getHostname");
    function getPublicSuffix(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 2, suffixLookup, options, RESULT).publicSuffix;
    }
    __name(getPublicSuffix, "getPublicSuffix");
    function getDomain2(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 3, suffixLookup, options, RESULT).domain;
    }
    __name(getDomain2, "getDomain");
    function getSubdomain(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 4, suffixLookup, options, RESULT).subdomain;
    }
    __name(getSubdomain, "getSubdomain");
    function getDomainWithoutSuffix(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 5, suffixLookup, options, RESULT).domainWithoutSuffix;
    }
    __name(getDomainWithoutSuffix, "getDomainWithoutSuffix");
    exports.getDomain = getDomain2;
    exports.getDomainWithoutSuffix = getDomainWithoutSuffix;
    exports.getHostname = getHostname;
    exports.getPublicSuffix = getPublicSuffix;
    exports.getSubdomain = getSubdomain;
    exports.parse = parse;
  }
});

// node_modules/lighthouse/core/lib/url-utils.js
var import_tldts_icann = __toESM(require_cjs(), 1);
var allowedProtocols = [
  "https:",
  "http:",
  "chrome:",
  "chrome-extension:"
];
var SECURE_SCHEMES = [
  "data",
  "https",
  "wss",
  "blob",
  "chrome",
  "chrome-extension",
  "about",
  "filesystem"
];
var SECURE_LOCALHOST_DOMAINS = ["localhost", "127.0.0.1"];
var NON_NETWORK_SCHEMES = [
  "blob",
  // @see https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  "data",
  // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
  "intent",
  // @see https://developer.chrome.com/docs/multidevice/android/intents/
  "file",
  // @see https://en.wikipedia.org/wiki/File_URI_scheme
  "filesystem",
  // @see https://developer.mozilla.org/en-US/docs/Web/API/FileSystem
  "chrome-extension"
];
function rewriteChromeInternalUrl(url) {
  if (!url || !url.startsWith("chrome://")) return url;
  if (url.endsWith("/")) url = url.replace(/\/$/, "");
  return url.replace(/^chrome:\/\/chrome\//, "chrome://");
}
__name(rewriteChromeInternalUrl, "rewriteChromeInternalUrl");
var UrlUtils = class _UrlUtils {
  static {
    __name(this, "UrlUtils");
  }
  /**
   * @param {string} url
   * @return {boolean}
   */
  static isValid(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * @param {string} urlA
   * @param {string} urlB
   * @return {boolean}
   */
  static hostsMatch(urlA, urlB) {
    try {
      return new URL(urlA).host === new URL(urlB).host;
    } catch (e) {
      return false;
    }
  }
  /**
   * @param {string} urlA
   * @param {string} urlB
   * @return {boolean}
   */
  static originsMatch(urlA, urlB) {
    try {
      return new URL(urlA).origin === new URL(urlB).origin;
    } catch (e) {
      return false;
    }
  }
  /**
   * @param {string} url
   * @return {?string}
   */
  static getOrigin(url) {
    try {
      const urlInfo = new URL(url);
      if (urlInfo.protocol === "chrome-extension:") {
        return Util.getChromeExtensionOrigin(url);
      }
      return urlInfo.host && urlInfo.origin || null;
    } catch (e) {
      return null;
    }
  }
  /**
   * Returns a primary domain for provided hostname (e.g. www.example.com -> example.com).
   * @param {string|URL} url hostname or URL object
   * @return {string}
   */
  static getRootDomain(url) {
    const parsedUrl = Util.createOrReturnURL(url);
    return (0, import_tldts_icann.getDomain)(parsedUrl.href) || parsedUrl.hostname;
  }
  /**
   * Check if rootDomains matches
   *
   * @param {string|URL} urlA
   * @param {string|URL} urlB
   */
  static rootDomainsMatch(urlA, urlB) {
    let urlAInfo;
    let urlBInfo;
    try {
      urlAInfo = Util.createOrReturnURL(urlA);
      urlBInfo = Util.createOrReturnURL(urlB);
    } catch (err) {
      return false;
    }
    if (!urlAInfo.hostname || !urlBInfo.hostname) {
      return false;
    }
    const urlARootDomain = _UrlUtils.getRootDomain(urlAInfo);
    const urlBRootDomain = _UrlUtils.getRootDomain(urlBInfo);
    return urlARootDomain === urlBRootDomain;
  }
  /**
   * @param {string} url
   * @param {{numPathParts: number, preserveQuery: boolean, preserveHost: boolean}=} options
   * @return {string}
   */
  static getURLDisplayName(url, options) {
    return Util.getURLDisplayName(new URL(url), options);
  }
  /**
   * Limits data URIs to 100 characters, returns all other strings untouched.
   * @param {string} url
   * @return {string}
   */
  static elideDataURI(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "data:" ? Util.truncate(url, 100) : url;
    } catch (e) {
      return url;
    }
  }
  /**
   * Determine if url1 equals url2, ignoring URL fragments.
   * @param {string} url1
   * @param {string} url2
   * @return {boolean}
   */
  static equalWithExcludedFragments(url1, url2) {
    [url1, url2] = [url1, url2].map(rewriteChromeInternalUrl);
    try {
      const urla = new URL(url1);
      urla.hash = "";
      const urlb = new URL(url2);
      urlb.hash = "";
      return urla.href === urlb.href;
    } catch (e) {
      return false;
    }
  }
  /**
   * Determine if the url has a protocol that we're able to test
   * @param {string} url
   * @return {boolean}
   */
  static isProtocolAllowed(url) {
    try {
      const parsed = new URL(url);
      return allowedProtocols.includes(parsed.protocol);
    } catch (e) {
      return false;
    }
  }
  /**
   * Is the host localhost-enough to satisfy the "secure context" definition
   * https://github.com/GoogleChrome/lighthouse/pull/11766#discussion_r582340683
   * @param {string} hostname Either a `new URL(url).hostname` or a `networkRequest.parsedUrl.host`
   * @return {boolean}
   */
  static isLikeLocalhost(hostname) {
    return SECURE_LOCALHOST_DOMAINS.includes(hostname) || hostname.endsWith(".localhost");
  }
  /**
   * @param {NetworkRequest['parsedURL']['scheme']} scheme
   * @return {boolean}
   */
  static isSecureScheme(scheme) {
    return SECURE_SCHEMES.includes(scheme);
  }
  /**
   * Use `NetworkRequest.isNonNetworkRequest(req)` if working with a request.
   * Note: the `protocol` field from CDP can be 'h2', 'http', (not 'https'!) or it'll be url's scheme.
   *   https://source.chromium.org/chromium/chromium/src/+/main:content/browser/devtools/protocol/network_handler.cc;l=598-611;drc=56d4a9a9deb30be73adcee8737c73bcb2a5ab64f
   * However, a `new URL(href).protocol` has a colon suffix.
   *   https://url.spec.whatwg.org/#dom-url-protocol
   * A URL's `scheme` is specced as the `protocol` sans-colon, but isn't exposed on a URL object.
   * This method can take all 3 of these string types as a parameter.
   * @param {NetworkRequest['protocol'] | URL['protocol']} protocol Either a networkRequest's `protocol` per CDP or a `new URL(href).protocol`
   * @return {boolean}
   */
  static isNonNetworkProtocol(protocol) {
    const urlScheme = protocol.includes(":") ? protocol.slice(0, protocol.indexOf(":")) : protocol;
    return NON_NETWORK_SCHEMES.includes(urlScheme);
  }
  /**
   * @param {string} src
   * @return {string|undefined}
   */
  static guessMimeType(src) {
    let url;
    try {
      url = new URL(src);
    } catch {
      return void 0;
    }
    if (url.protocol === "data:") {
      const match2 = url.pathname.match(/^(image\/(png|jpeg|svg\+xml|webp|gif|avif))[;,]/);
      if (!match2) return void 0;
      return match2[1];
    }
    const match = url.pathname.toLowerCase().match(/\.(png|jpeg|jpg|svg|webp|gif|avif)$/);
    if (!match) return void 0;
    const ext = match[1];
    if (ext === "svg") return "image/svg+xml";
    if (ext === "jpg") return "image/jpeg";
    return `image/${ext}`;
  }
  /**
   * @param {string|undefined} url
   * @return {string}
   */
  static normalizeUrl(url) {
    if (url && this.isValid(url) && this.isProtocolAllowed(url)) {
      return new URL(url).href;
    } else {
      throw new LighthouseError(LighthouseError.errors.INVALID_URL);
    }
  }
};
UrlUtils.INVALID_URL_DEBUG_STRING = "Lighthouse was unable to determine the URL of some script executions. It's possible a Chrome extension or other eval'd code is the source.";
var url_utils_default = UrlUtils;

export {
  url_utils_default
};
/*! Bundled license information:

lighthouse/core/lib/url-utils.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
