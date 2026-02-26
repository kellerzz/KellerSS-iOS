const VPS_HOSTING_KEYWORDS = [
  "hostinger", "hstgr",
  "locaweb",
  "kinghost",
  "umbler",
  "hostgator",
  "uol host", "uolhost",
  "bol", "bol.com.br",
  "redehost",
  "weblink",
  "brasileirohost", "br.host",
  "dialhost",
  "serverspace",
  "melhorhospedagem",
  "ibrcom",
  "masterweb",
  "superdomínios", "superdomin",
  "plankton", "vps.br",
  "digitalocean",
  "linode", "akamai",
  "vultr",
  "hetzner",
  "ovh", "ovhcloud",
  "contabo",
  "ionos",
  "godaddy",
  "siteground",
  "cloudways",
  "amazon", "aws", "amazonaws",
  "google cloud", "googlecloud",
  "microsoft azure", "azure",
  "alibaba cloud", "alibabacloud",
  "tencent cloud", "tencentcloud",
  "hstgr.cloud",
  "srv.umbler",
  "kinghost.net",
  "locaweb.com.br",
  "choopa", "psychz", "m247",
  "serverius", "frantech", "buyvm",
  "sharktech", "quadranet", "nexeon",
  "servermania", "hostwinds", "racknerd",
  "dedipath", "spartanhost", "cloudie",
  "tsohost", "wavenet", "fasthosts",
  "multacom",
  "telus",
  "fdcservers", "fdc servers",
  "leaseweb",
  "colocation america",
  "b2 net", "b2net",
  "path.net",
  "datacamp",
  "tzulo",
  "coresite",
]

const CHEAT_PROXY_ASN = {
  "AS35916": "Multacom Corporation (cheat proxy LA)",
  "AS47583": "Hostinger International (cheat proxy BR)",
  "AS60781": "LeaseWeb Netherlands",
  "AS28753": "LeaseWeb Deutschland",
  "AS16276": "OVH SAS",
  "AS14061": "DigitalOcean",
  "AS20473": "Choopa / Vultr",
  "AS8100":  "QuadraNet",
  "AS40065": "Cnservers / FDC Servers",
  "AS53667": "FranTech Solutions",
  "AS395954": "Leaseweb USA",
  "AS13335": "Cloudflare (CDN/Proxy — comum em cheats)",
  "AS209": "CenturyLink / Lumen",
  "AS7203": "Sharktech",
}

const RDNS_HOSTING_PATTERNS = [
  "hstgr.cloud",
  "staticip",
  "srv.",
  "vps.",
  "cloud.",
  "host.",
  "server.",
  "dedicated.",
  ".kinghost.net",
  ".locaweb.com.br",
  ".umbler.net",
  ".hostgator.com.br",
  ".digitalocean.com",
  ".vultr.com",
  ".linode.com",
  ".hetzner.com",
  ".contabo.net",
]

const CHEAT_APPS = {
  "com.touchingapp.potatsolite":  "PotatsoLite — app de proxy iOS (mitmproxy cheat)",
  "com.touchingapp.potatso":      "Potatso — app de proxy iOS",
  "com.privateinternetaccess.ios": "PIA VPN",
  "com.anonymousiphone.detoxme":  "Detox — proxy iOS",
  "com.nssurge.inc.surge-ios":    "Surge — proxy/MITM iOS",
  "com.luo.quantumultx":          "Quantumult X — proxy iOS",
  "com.github.shadowsocks":       "Shadowsocks",
  "com.futureland.vpnmaster":     "VPN Master",
  "com.cloudflare.1dot1dot1dot1": "Cloudflare 1.1.1.1 (proxy/warp)",
  "group.com.luo.quantumult":     "Quantumult — proxy iOS",
  "com.netease.trojan":           "Trojan proxy",
  "com.hiddify.app":              "Hiddify — proxy",
  "com.karing.app":               "Karing — proxy",
  "com.metacubex.ClashX":         "ClashX — proxy",
  "com.ssrss.Ssrss":              "SSR iOS proxy",
  "com.adguard.ios.AdguardPro":   "AdGuard Pro (pode ser usado como proxy MITM)",
  "com.monite.proxyff":           "ProxyFF — app de proxy iOS (cheat confirmado)",
}

const SUSPICIOUS_TLDS = [
  ".site", ".store", ".netlify.app", ".netlify", ".xyz", ".pw",
  ".top", ".click", ".bid", ".win", ".stream", ".download",
  ".icu", ".gq", ".cf", ".ml", ".ga", ".tk",
  ".monster", ".fun", ".rest", ".bar", ".lol",
]

const SUSPICIOUS_DOMAIN_WORDS = [
  "proxy", "cheat", "hack", "bypass", "mitm", "inject",
  "spoof", "crack", "exploit", "payload", "tunnel",
  "vpn", "socks", "relay", "forward", "gate",
]

const FALSE_POSITIVE_IPS = new Set([
  "104.29.152.79",  "104.29.152.107", "92.223.118.254",  "23.221.214.168",
  "23.192.36.217",  "54.69.69.125",   "104.29.152.189",  "104.29.137.146",
  "104.29.155.56",  "104.29.137.203", "104.29.155.129",  "104.29.137.125",
  "104.29.158.97",  "104.29.152.95",  "104.29.153.53",   "104.29.159.185",
  "104.29.157.123", "104.29.152.27",  "104.29.157.107",  "104.29.137.16",
  "104.29.152.164", "104.29.137.53",  "104.29.135.227",  "104.29.158.139",
  "104.29.152.157", "104.29.156.174", "104.29.156.24",   "104.29.154.91",
  "104.29.155.27",  "104.29.156.120", "104.29.137.112",
])

// IPs e domínios confirmados de cheats conhecidos — detecção CRÍTICA direta
const KNOWN_CHEAT_INFRA = {
  "46.202.145.85":    "Fatality Cheats — servidor confirmado",
  "fatalitycheats.xyz": "Fatality Cheats — domínio oficial do cheat",
}

async function findNdjsonFile() {
  let path = await DocumentPicker.openFile()
  if (!path) return null
  return { path: path, fm: FileManager.local() }
}

function parseNdjson(content) {
  let trimmed = content.trim()
  if (trimmed.startsWith("[")) {
    try { return JSON.parse(trimmed) } catch(e) {}
  }
  return trimmed
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => { try { return JSON.parse(l) } catch(e) { return null } })
    .filter(Boolean)
}

function validateReport(entries) {
  if (!entries || entries.length === 0)
    return { ok: false, reason: "Arquivo vazio ou sem entradas válidas." }

  let hasNet    = entries.some(e => e.type === "networkActivity")
  let hasAccess = entries.some(e => e.type === "access")
  let hasBundleID = entries.some(e => e.bundleID || (e.accessor && e.accessor.identifier))
  let hasTimestamp = entries.some(e => e.timeStamp)

  if (!hasNet && !hasAccess)
    return { ok: false, reason: "Nenhuma entrada de rede ou acesso encontrada.\nEste nao parece ser um App Privacy Report valido." }
  if (!hasBundleID)
    return { ok: false, reason: "Nenhum bundleID encontrado.\nO arquivo pode estar corrompido ou foi modificado." }
  if (!hasTimestamp)
    return { ok: false, reason: "Nenhum timestamp encontrado.\nO arquivo pode estar corrompido ou foi modificado." }

  let timestamps = entries.map(e => e.timeStamp).filter(Boolean)
  let valid = timestamps.filter(t => {
    let y = parseInt(t.slice(0,4))
    return y >= 2020 && y <= 2030
  })
  if (valid.length < timestamps.length * 0.5)
    return { ok: false, reason: "Timestamps fora do intervalo esperado.\nO arquivo pode ter sido adulterado." }

  let netEntries = entries.filter(e => e.type === "networkActivity")
  let validNet = netEntries.filter(e => e.domain && e.bundleID)
  if (netEntries.length > 0 && validNet.length < netEntries.length * 0.3)
    return { ok: false, reason: "Muitas entradas de rede sem domain/bundleID.\nO arquivo pode ter sido manipulado." }

  return { ok: true }
}

const FIELDS = "status,country,city,isp,org,hosting,proxy,query,reverse,as"

async function lookupBatch(targets) {
  try {
    let req = new Request(`http://ip-api.com/batch?fields=${FIELDS}`)
    req.method = "POST"
    req.body = Data.fromString(JSON.stringify(targets))
    req.headers = { "Content-Type": "application/json" }
    req.timeoutInterval = 15
    let results = await req.loadJSON()
    if (!Array.isArray(results)) return []
    return results
  } catch(e) {
    return []
  }
}

function isIPv4(s) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(s)
}

function isIPv6(s) {
  return s.includes(":") && !s.includes(".")
}

function isIP(s) {
  return isIPv4(s) || isIPv6(s)
}

async function resolveHostname(domain) {
  return domain
}

function classifyIP(info, domain) {
  if (!info) return { severity: null, reasons: [] }
  let reasons = []
  let severity = null
  let tldFlag = false

  let domLow = (domain || "").toLowerCase()
  for (let tld of SUSPICIOUS_TLDS) {
    if (domLow.endsWith(tld) || domLow.includes(tld + "/")) {
      severity = "HIGH"
      tldFlag = true
      reasons.push(`TLD suspeito detectado: "${tld}" — padrão comum em cheats/proxies`)
      break
    }
  }
  if (!tldFlag) {
    let parts = domLow.split(".")[0]
    for (let word of SUSPICIOUS_DOMAIN_WORDS) {
      if (parts.includes(word) || domLow.includes(word + ".")) {
        severity = "HIGH"
        tldFlag = true
        reasons.push(`Palavra suspeita no domínio: "${word}"`)
        break
      }
    }
  }

  if (info.hosting) {
    severity = "HIGH"
    reasons.push(`VPS/HOSTING — ISP: ${info.isp}`)
  }
  if (info.proxy) {
    severity = "HIGH"
    reasons.push("PROXY / VPN detectado")
  }

  let asn = (info.as || "").split(" ")[0].toUpperCase()
  if (CHEAT_PROXY_ASN[asn]) {
    let isCloudflare = asn === "AS13335"
    if (isCloudflare) {
      let domainIsIP = /^[\d.:]+$/.test(domain || "")
      if (domainIsIP) {
        severity = "HIGH"
        reasons.push(`Cloudflare acessado via IP direto — padrão de proxy cheat (${asn})`)
      }
    } else {
      severity = "HIGH"
      reasons.push(`ASN de cheat proxy conhecido: ${asn} — ${CHEAT_PROXY_ASN[asn]}`)
    }
  }

  let rdns = (info.reverse || "").toLowerCase()
  if (rdns) {
    for (let pattern of RDNS_HOSTING_PATTERNS) {
      if (rdns.includes(pattern)) {
        severity = severity || "HIGH"
        reasons.push(`rDNS de servidor: ${info.reverse}`)
        break
      }
    }
    if (rdns.match(/^srv\d+\.hstgr\.cloud$/)) {
      severity = "HIGH"
      reasons.push(`Hostinger VPS (padrao cheat proxy BR): ${info.reverse}`)
    }
  } else if (info.hosting) {
    reasons.push("Sem rDNS (PTR) — tipico de VPS usado como proxy")
  }

  let orgLower = ((info.org || "") + " " + (info.isp || "") + " " + (info.as || "")).toLowerCase()
  for (let kw of VPS_HOSTING_KEYWORDS) {
    if (orgLower.includes(kw)) {
      severity = severity || "MEDIUM"
      reasons.push(`Org/ISP associado a hospedagem/cheat proxy: ${kw}`)
      break
    }
  }

  return { severity, reasons }
}

async function probeHost(domain) {
  let safe = ["apple.com","icloud.com","google.com","googleapis.com",
              "gstatic.com","amazon.com","microsoft.com","iphone","localhost",
              "akamai","cloudfront","fastly","edgekey","aaplimg"]
  if (safe.some(s => domain.toLowerCase().includes(s))) return null

  let result = { status: null, banner: null, online: false, suspicious: false }
  let headers = null

  for (let scheme of ["https", "http"]) {
    try {
      let req = new Request(`${scheme}://${domain}`)
      req.timeoutInterval = 6
      req.allowInsecureRequest = true
      let body = await req.loadString()

      result.online = true
      let resp = req.response || {}
      result.status = resp.statusCode || 0
      headers = resp.headers || {}

      let serverHeader = (headers["Server"] || headers["server"] || "").toLowerCase()
      let bodyLow = (body || "").slice(0, 600).toLowerCase()
      let combined = serverHeader + " " + bodyLow

      let suspiciousBanners = [
        "nginx", "apache", "ubuntu", "debian", "centos", "mitmproxy",
        "squid", "haproxy", "openresty", "caddy", "traefik",
        "403 forbidden", "bad gateway", "bad request", "proxy error"
      ]

      if (serverHeader) {
        result.banner = serverHeader.split("/")[0].trim()
        result.suspicious = true
      } else {
        for (let b of suspiciousBanners) {
          if (combined.includes(b)) {
            result.banner = b
            result.suspicious = true
            break
          }
        }
      }

      let sc = result.status
      if (sc === 403 || sc === 502 || sc === 504 || sc === 400) result.suspicious = true

      break
    } catch(e) {
      result.online = false
    }
  }

  return result
}

async function analyze(entries) {
  let netEntries = entries.filter(e => e.type === "networkActivity")

  let domainHits = {}
  let domainBundles = {}
  for (let e of netEntries) {
    let d = e.domain || ""
    if (!d) continue
    domainHits[d] = (domainHits[d] || 0) + (e.hits || 1)
    if (!domainBundles[d]) domainBundles[d] = new Set()
    domainBundles[d].add(e.bundleID || "?")
  }

  let allDomains = Object.entries(domainHits)
    .sort((a, b) => b[1] - a[1])
    .map(([d]) => d)

  console.log(`Total dominios unicos: ${allDomains.length}`)

  let allBundles = new Set()
  for (let e of netEntries) { if (e.bundleID) allBundles.add(e.bundleID) }

  let cheatAppFindings = []
  for (let [bundleID, desc] of Object.entries(CHEAT_APPS)) {
    if (allBundles.has(bundleID)) {
      let appEntries = netEntries.filter(e => e.bundleID === bundleID)
      let appHits = appEntries.reduce((s, e) => s + (e.hits || 1), 0)
      let appDomains = [...new Set(appEntries.map(e => e.domain).filter(Boolean))]
      cheatAppFindings.push({ bundleID, desc, hits: appHits, domains: appDomains })
    }
  }

  // Detecção direta de infraestrutura conhecida de cheats (IP ou domínio exato)
  let knownCheatFindings = []
  for (let e of netEntries) {
    let d = (e.domain || "").toLowerCase()
    for (let [indicator, desc] of Object.entries(KNOWN_CHEAT_INFRA)) {
      if (d === indicator.toLowerCase() || d.endsWith("." + indicator.toLowerCase())) {
        let existing = knownCheatFindings.find(k => k.indicator === indicator)
        if (existing) {
          existing.hits += (e.hits || 1)
          if (e.bundleID) existing.bundles.add(e.bundleID)
        } else {
          knownCheatFindings.push({
            indicator,
            desc,
            hits: e.hits || 1,
            bundles: new Set(e.bundleID ? [e.bundleID] : []),
          })
        }
      }
    }
  }
  // Também checar se algum IP resolvido bate com os indicadores
  // (isso é feito depois do lookup, mas registramos o domínio para referência cruzada)
  knownCheatFindings = knownCheatFindings.map(k => ({ ...k, bundles: [...k.bundles] }))

  const FF_BUNDLES_A = ["com.dts.freefiremax", "com.dts.freefireth"]
  let ffLoginEntries = netEntries
    .filter(e => FF_BUNDLES_A.includes(e.bundleID) && e.domain === "loginbp.ggpolarbear.com" && e.timeStamp)
    .sort((a, b) => b.timeStamp.localeCompare(a.timeStamp))
  let ffLoginTs = ffLoginEntries.length ? new Date(ffLoginEntries[0].timeStamp) : null
  if (ffLoginTs) console.log(`Free Fire último login: ${ffLoginTs.toISOString()}`)

  const CHUNK = 100
  let candidates = []

  for (let i = 0; i < allDomains.length; i += CHUNK) {
    let chunk = allDomains.slice(i, i + CHUNK)
    let chunkNum = Math.floor(i / CHUNK) + 1
    let totalChunks = Math.ceil(allDomains.length / CHUNK)
    console.log(`Batch ${chunkNum}/${totalChunks} — ${chunk.length} dominios`)

    let results = await lookupBatch(chunk)

    for (let j = 0; j < results.length; j++) {
      let info = results[j]
      if (!info || info.status !== "success") continue

      let domain = chunk[j]
      let ip = info.query || domain

      if (FALSE_POSITIVE_IPS.has(ip) || FALSE_POSITIVE_IPS.has(domain)) continue

      let { severity, reasons } = classifyIP(info, domain)
      if (!severity) continue

      let domLow2 = domain.toLowerCase()
      let isTldSuspect = SUSPICIOUS_TLDS.some(t => domLow2.endsWith(t)) ||
                         SUSPICIOUS_DOMAIN_WORDS.some(w => domLow2.split(".")[0].includes(w))
      candidates.push({
        severity, domain, ip,
        country: info.country || "?",
        city:    info.city || "?",
        isp:     info.isp || "?",
        org:     info.org || "?",
        as:      info.as || "?",
        hosting: info.hosting || false,
        proxy:   info.proxy || false,
        reverse: info.reverse || "",
        hits:    domainHits[domain],
        bundles: [...domainBundles[domain]].slice(0, 4),
        reasons,
        tldSuspect: isTldSuspect,
      })
    }

    if (i + CHUNK < allDomains.length) await wait(1400)
  }

  console.log(`Iniciando probe HTTP em ${candidates.length} suspeitos...`)
  let probeResults = await Promise.all(candidates.map(c => probeHost(c.domain)))

  let findings = candidates.map((c, idx) => {
    let probe = probeResults[idx]
    let severity = c.severity
    let reasons = [...c.reasons]

    if (probe) {
      if (probe.suspicious && probe.banner) {
        severity = "HIGH"
        reasons.push(`Servidor: ${probe.banner}`)
      }
      if (probe.status === 403) {
        reasons.push("HTTP 403 — ativo mas bloqueando acesso (padrão de proxy)")
      }
      if (!probe.online) {
        reasons.push("Servidor offline ou sem resposta HTTP")
      }
    }

    return { ...c, severity, reasons, probe, tldSuspect: c.tldSuspect }
  })

  const ASN_SET = new Set(Object.keys(CHEAT_PROXY_ASN))

  function hasSuspiciousTLD(domain) {
    let d = (domain || "").toLowerCase()
    return SUSPICIOUS_TLDS.some(t => d.endsWith(t) || d.includes(t + "/")) ||
           SUSPICIOUS_DOMAIN_WORDS.some(w => d.split(".")[0].includes(w))
  }

  findings.sort((a, b) => {
    let aTld = hasSuspiciousTLD(a.domain) ? 0 : 1
    let bTld = hasSuspiciousTLD(b.domain) ? 0 : 1
    if (aTld !== bTld) return aTld - bTld

    let aAsn = (a.as || "").split(" ")[0].toUpperCase()
    let bAsn = (b.as || "").split(" ")[0].toUpperCase()
    let aKnown = ASN_SET.has(aAsn) ? 0 : 1
    let bKnown = ASN_SET.has(bAsn) ? 0 : 1
    if (aKnown !== bKnown) return aKnown - bKnown

    let sevOrder = { HIGH: 0, MEDIUM: 1 }
    if (a.severity !== b.severity) return sevOrder[a.severity] - sevOrder[b.severity]

    let aOnline = (a.probe && a.probe.online) ? 0 : 1
    let bOnline = (b.probe && b.probe.online) ? 0 : 1
    if (aOnline !== bOnline) return aOnline - bOnline

    return b.hits - a.hits
  })

  return { findings, netEntries, cheatAppFindings, knownCheatFindings, ffLoginTs }
}

function wait(ms) {
  return new Promise(resolve => Timer.schedule(ms, false, resolve))
}

function buildHTML(findings, netEntries, cheatAppFindings, knownCheatFindings, ffLoginTs, filename) {
  let allDomains = new Set(netEntries.map(e => e.domain || ""))

  let allTimestamps = netEntries.map(e => e.timeStamp).filter(Boolean).sort()
  let firstTs = allTimestamps.length ? new Date(allTimestamps[0]) : null
  let lastTs  = allTimestamps.length ? new Date(allTimestamps[allTimestamps.length - 1]) : null

  function fmtDt(d) {
    if (!d) return "?"
    return d.toLocaleString("pt-BR", {
      day:"2-digit", month:"2-digit", year:"numeric",
      hour:"2-digit", minute:"2-digit"
    })
  }

  let uptimeStr = "?"
  let uptimeWarning = false
  if (firstTs && lastTs) {
    let diffMs  = lastTs - firstTs
    let diffMin = Math.floor(diffMs / 60000)
    let diffH   = Math.floor(diffMin / 60)
    let diffD   = Math.floor(diffH / 24)
    let remH    = diffH % 24
    let remMin  = diffMin % 60
    if (diffD > 0)      uptimeStr = `${diffD}d ${remH}h ${remMin}min`
    else if (diffH > 0) uptimeStr = `${diffH}h ${remMin}min`
    else                uptimeStr = `${diffMin} minutos`
    if (diffMin < 20)   uptimeWarning = true
  }

  let startStr = fmtDt(firstTs)
  let endStr   = fmtDt(lastTs)

  let staleWarning = false
  let staleMinutes = 0
  let staleStr = ""
  if (lastTs) {
    let now = new Date()
    let diffFromNow = Math.floor((now - lastTs) / 60000)
    staleMinutes = diffFromNow
    if (diffFromNow > 15) {
      staleWarning = true
      if (diffFromNow >= 1440) {
        let d = Math.floor(diffFromNow / 1440)
        let h = Math.floor((diffFromNow % 1440) / 60)
        staleStr = `${d}d ${h}h atrás`
      } else if (diffFromNow >= 60) {
        let h = Math.floor(diffFromNow / 60)
        let m = diffFromNow % 60
        staleStr = `${h}h ${m}min atrás`
      } else {
        staleStr = `${diffFromNow} minutos atrás`
      }
    }
  }

  let appStoreEntries = netEntries
    .filter(e => e.bundleID === "com.apple.AppStore" && e.timeStamp)
    .sort((a, b) => b.timeStamp.localeCompare(a.timeStamp))
  let appStoreLastTs = appStoreEntries.length ? new Date(appStoreEntries[0].timeStamp) : null
  let appStoreStr = appStoreLastTs ? fmtDt(appStoreLastTs) : null

  const FF_BUNDLES = ["com.dts.freefiremax", "com.dts.freefireth"]

  // Garena = sempre Convidado, prioridade máxima
  const FF_GARENA_DOMAINS = new Set([
    "loginbp.ggpolarbear.com",
    "100067.connect.garena.com",
    "100067.msdk.garena.com",
    "gin.freefiremobile.com",
    "sdk.open.api.igamecorp.com",
  ])

  // Logins secundários — só valem se Garena NÃO estiver presente na sessão
  const FF_SECONDARY_DOMAINS = {
    "facebook.com":          "Login Facebook",
    "graph.facebook.com":    "Login Facebook",
    "connect.facebook.net":  "Login Facebook",
    "twitter.com":           "Login Twitter/X",
    "api.twitter.com":       "Login Twitter/X",
    "oauth2.googleapis.com": "Login Gmail",
    "accounts.google.com":   "Login Gmail",
    "apis.google.com":       "Login Gmail",
    "api.vk.com":            "Login VK",
    "login.vk.com":          "Login VK",
  }

  // Agrupa todas as entradas do FF por sessões (gap > 2min = nova sessão)
  let ffAll = netEntries
    .filter(e => FF_BUNDLES.includes(e.bundleID) && e.timeStamp)
    .sort((a, b) => a.timeStamp.localeCompare(b.timeStamp))

  let ffSessionGroups = []
  let _cur = []
  for (let e of ffAll) {
    if (_cur.length === 0) { _cur.push(e); continue }
    let gap = new Date(e.timeStamp) - new Date(_cur[_cur.length-1].timeStamp)
    if (gap > 2 * 60 * 1000) { ffSessionGroups.push(_cur); _cur = [e] }
    else _cur.push(e)
  }
  if (_cur.length > 0) ffSessionGroups.push(_cur)

  // Para cada sessão, determinar o tipo de login com prioridade: Garena > Secundário > Fallback
  function resolveSession(group) {
    let domains = new Set(group.map(e => e.domain))
    let anchor  = group[group.length - 1]

    // 1. Garena presente → Convidado, sem discussão
    for (let d of domains) {
      if (FF_GARENA_DOMAINS.has(d)) {
        return { ts: anchor.timeStamp, loginType: "Login Convidado (Garena)", bundleID: anchor.bundleID }
      }
    }
    // 2. Login secundário
    for (let d of domains) {
      if (FF_SECONDARY_DOMAINS[d]) {
        return { ts: anchor.timeStamp, loginType: FF_SECONDARY_DOMAINS[d], bundleID: anchor.bundleID }
      }
    }
    // 3. Sem tipo de login identificável → ignorar sessão
    return null
  }

  let ffSessions = ffSessionGroups
    .map(resolveSession)
    .filter(Boolean)
    .sort((a, b) => b.ts.localeCompare(a.ts))
    .slice(0, 3)
    .map(s => ({ ...s, ts: fmtDt(new Date(s.ts)) }))

  let ffStr     = ffSessions.length > 0 ? ffSessions[0].ts : null
  let ffEntries = ffAll
  let ffVersion = ffAll.length > 0
    ? (ffAll[0].bundleID === "com.dts.freefiremax" ? "Free Fire MAX" : "Free Fire")
    : null

  let displayFindingsForCount = ffLoginTs && findings.length > 0
    ? (() => {
        let preSet = new Set()
        return findings
      })()
    : findings
  let highCount = findings.filter(f => f.severity === "HIGH").length
  let medCount  = findings.filter(f => f.severity === "MEDIUM").length
  let criticalCount = cheatAppFindings.length + knownCheatFindings.length

  let preLoginFindings = []
  let preLoginWarning = false
  if (ffLoginTs) {
    for (let f of findings) {
      let preEntries = netEntries.filter(e =>
        (e.domain === f.domain) &&
        e.timeStamp &&
        new Date(e.timeStamp) < ffLoginTs
      )
      if (preEntries.length > 0) {
        let earliest = preEntries.sort((a,b) => a.timeStamp.localeCompare(b.timeStamp))[0]
        let diffMs = ffLoginTs - new Date(earliest.timeStamp)
        let diffMin = Math.floor(diffMs / 60000)
        preLoginFindings.push({
          domain: f.domain,
          ip: f.ip,
          isp: f.isp,
          hits: preEntries.length,
          earliestTs: fmtDt(new Date(earliest.timeStamp)),
          minutesBefore: diffMin,
          severity: f.severity,
        })
        preLoginWarning = true
      }
    }
    preLoginFindings.sort((a, b) => a.minutesBefore - b.minutesBefore)
  }

  let criticalCards = ""

  // Cards de infraestrutura confirmada de cheats (IP/domínio direto)
  for (let k of knownCheatFindings) {
    let bundleList = k.bundles.map(b => `<span class="bundle">${b}</span>`).join(" ")
    criticalCards += `
    <div class="card critical">
      <div class="card-header">
        <span class="badge critical">&#9888; CRÍTICO — CHEAT CONFIRMADO</span>
        <span class="conns">${k.hits} conexões</span>
      </div>
      <div class="card-domain">${k.indicator}</div>
      <div class="grid">
        <div class="row"><span class="label">Cheat</span><span class="val reason" style="color:#ff4444;font-weight:bold">${k.desc}</span></div>
        <div class="row"><span class="label">Indicador</span><span class="val">${k.indicator.includes(".") && !k.indicator.match(/^\d+\.\d+/) ? "Domínio" : "IP"} detectado no relatório de rede</span></div>
        ${bundleList ? `<div class="row"><span class="label">Usado por</span><span class="val">${bundleList}</span></div>` : ""}
      </div>
    </div>`
  }

  for (let f of cheatAppFindings) {
    let suspectDomainSet = new Set(findings.map(f2 => f2.domain))
    let suspectDomains = f.domains.filter(d => suspectDomainSet.has(d))
    let suspectRows = suspectDomains.map(d => {
      let match = findings.find(f2 => f2.domain === d)
      let info = match ? ` &mdash; ${match.isp} (${match.country})` : ""
      return `<div class="domain-row"><span class="domain-badge ${match ? match.severity.toLowerCase() : ""}">${match ? (match.severity === "HIGH" ? "SUSPEITO" : "POSSÍVEL") : ""}</span> ${d}${info}</div>`
    }).join("")
    criticalCards += `
    <div class="card critical">
      <div class="card-header">
        <span class="badge critical">&#9888; CRÍTICO — APP PROXY/CHEAT</span>
        <span class="conns">${f.hits} conexões</span>
      </div>
      <div class="card-domain">${f.bundleID}</div>
      <div class="grid">
        <div class="row"><span class="label">App</span><span class="val reason">${f.desc}</span></div>
        <div class="row">
          <span class="label">IPs suspeitos<br><span class="sub">${suspectDomains.length} de ${f.domains.length} domínios</span></span>
          <span class="val">${suspectRows || '<span class="none">Nenhum IP suspeito detectado</span>'}</span>
        </div>
      </div>
    </div>`
  }

  let displayFindings = findings
  if (ffLoginTs && preLoginFindings.length > 0) {
    let preLoginDomains = new Set(preLoginFindings.map(p => p.domain))
    displayFindings = findings.filter(f => preLoginDomains.has(f.domain))
  }

  let cards = ""
  if (displayFindings.length === 0) {
    cards = `<div class="ok">&#10003; Nenhum IP VPS / Hosting / Proxy detectado.</div>`
  } else {
    for (let f of displayFindings) {
      let tag = f.tldSuspect ? "DOMÍNIO SUSPEITO" : f.hosting ? "VPS/HOSTING" : f.proxy ? "PROXY/VPN" : "NUVEM"
      let cls = f.tldSuspect ? "tld" : f.severity === "HIGH" ? "high" : "medium"
      let sev = f.tldSuspect ? "&#9888; DOMÍNIO SUSPEITO" : f.severity === "HIGH" ? "SUSPEITO" : "POSSÍVEL"
      let bundleList = f.bundles.map(b => `<span class="bundle">${b}</span>`).join(" ")
      cards += `
      <div class="card ${cls}">
        <div class="card-header">
          <span class="badge ${cls}">${sev}</span>
          <span class="conns">${f.hits} conexões</span>
        </div>
        <div class="card-domain">${f.domain}</div>
        <div class="grid">
          <div class="row"><span class="label">IP</span><span class="val">${f.ip}</span></div>
          <div class="row"><span class="label">País</span><span class="val">${f.country} / ${f.city}</span></div>
          <div class="row"><span class="label">Provedor</span><span class="val isp">${f.isp}</span></div>
          <div class="row"><span class="label">Org</span><span class="val">${f.org}</span></div>
          ${f.reverse ? `<div class="row"><span class="label">rDNS</span><span class="val rdns">${f.reverse}</span></div>` : ""}
          ${f.probe ? `<div class="row"><span class="label">HTTP</span><span class="val">
            ${f.probe.online
              ? `<span class="http-on">&#9679; Online</span>${f.probe.status ? ` &mdash; HTTP ${f.probe.status}` : ""}${f.probe.banner ? ` &mdash; <span class="http-banner">${f.probe.banner}</span>` : ""}`
              : `<span class="http-off">&#9679; Offline / Sem resposta</span>`
            }
          </span></div>` : ""}
          <div class="row"><span class="label">Motivo</span><span class="val reason">${f.reasons.join("<br>")}</span></div>
          <div class="row"><span class="label">Usado por</span><span class="val">${bundleList}</span></div>
        </div>
      </div>`
    }
  }

  let uptimeBg    = uptimeWarning ? "background:linear-gradient(90deg,#2a1000,#1a0800)" : "background:#0d1b2a"
  let uptimeDotCl = uptimeWarning ? "background:#ff8800;box-shadow:0 0 6px #ff8800" : "background:#4caf50;box-shadow:0 0 6px #4caf50"
  let uptimeWarnBadge = uptimeWarning
    ? `<span style="margin-left:8px;background:#3a1800;color:#ff8800;border:1px solid #ff8800;font-size:9px;padding:2px 7px;border-radius:10px;font-weight:bold">&#9888; MENOS DE 20MIN — Relatório pode não cobrir a partida inteira!</span>`
    : ""

  let staleBanner = staleWarning ? `
  <div class="stale-banner">
    <div class="stale-left">&#128337;</div>
    <div>
      <div class="stale-label">Arquivo possivelmente antigo</div>
      <div class="stale-time">Último registro: <strong>${staleStr}</strong></div>
      <div class="stale-hint">Suspeita: arquivo gerado fora do período da partida para esconder atividade.</div>
    </div>
  </div>` : ""

  // Login type badge color
  function loginColor(type) {
    if (type.includes("Facebook"))  return "#1877f2"
    if (type.includes("Twitter") || type.includes("X")) return "#1da1f2"
    if (type.includes("Gmail"))     return "#ea4335"
    if (type.includes("VK"))        return "#4a76a8"
    if (type.includes("Convidado")) return "#888"
    return "#556"
  }

  let ffSessionRows = ffSessions.map((s, i) => {
    let col = loginColor(s.loginType)
    let label = i === 0 ? "Última abertura" : i === 1 ? "2ª abertura" : "3ª abertura"
    return `
      <div class="ff-session-row">
        <div class="ff-session-left">
          <span class="ff-session-num">${label}</span>
          <span class="ff-session-ts">${s.ts}</span>
        </div>
        <span class="ff-login-badge" style="background:${col}22;color:${col};border:1px solid ${col}44">${s.loginType}</span>
      </div>`
  }).join("")

  let ffBanner = ffStr ? `
  <div class="ff-banner">
    <div class="ff-left">&#128293;</div>
    <div class="ff-info">
      <div class="ff-label">${ffVersion || "Free Fire"} — Sessões no período</div>
      ${ffSessionRows}
      <div class="ff-sessions">${ffEntries.length} inicializações registradas no período</div>
      <div class="ff-hint">Se a última abertura foi após a partida &rarr; aplique o W.O!</div>
    </div>
  </div>` : ""

  let appStoreBanner = appStoreStr ? `
  <div class="appstore-banner">
    <div class="appstore-left">&#128722;</div>
    <div>
      <div class="appstore-label">App Store aberta</div>
      <div class="appstore-time">${appStoreStr}</div>
      <div class="appstore-hint">Se foi após a partida &rarr; aplique o W.O!</div>
    </div>
  </div>` : ""

  let rawHtml = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta charset="utf-8">
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:#0a0a0f; color:#e0e0e0; font-family:-apple-system,ui-monospace,monospace; font-size:13px; }

  /* HERO */
  .hero {
    background: linear-gradient(160deg, #0d1b2a 0%, #0a0a12 70%);
    border-bottom: 1px solid #1a2a3a;
    padding: 28px 16px 20px;
    position: relative; overflow: hidden;
    text-align: center;
  }
  .hero::after {
    content:""; position:absolute; top:-60px; left:50%; transform:translateX(-50%);
    width:220px; height:220px;
    background:radial-gradient(circle, #00e5ff0d 0%, transparent 70%);
    border-radius:50%; pointer-events:none;
  }
  .hero-eyebrow {
    font-size:9px; letter-spacing:3px; color:#00e5ff55;
    text-transform:uppercase; margin-bottom:8px;
  }
  .hero-name {
    font-size:30px; font-weight:700; color:#fff;
    letter-spacing:-0.5px; margin-bottom:5px;
  }
  .hero-credits {
    font-size:10px; color:#1e2c3a; letter-spacing:2px;
    margin-bottom:18px; font-weight:400;
  }
  .hero-name span { color:#00e5ff; }
  .hero-file {
    font-size:10px; color:#556; word-break:break-all;
    padding:7px 10px; background:#0d1520;
    border-radius:7px; border-left:3px solid #00e5ff33;
    margin-bottom:14px; line-height:1.5;
    text-align:left;
  }
  .hero-file strong { color:#00e5ff99; }
  .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .hg-card {
    background:#0d1520; border-radius:8px;
    padding:9px 12px; border:1px solid #1a2a3a;
  }
  .hg-label { font-size:9px; color:#446; letter-spacing:1px; text-transform:uppercase; margin-bottom:3px; }
  .hg-val   { font-size:12px; color:#ccd; }
  .hg-val.cyan  { color:#00e5ff; font-weight:bold; font-size:14px; }

  /* LANGUAGE SELECTOR */
  .lang-bar {
    display:flex; justify-content:center; gap:6px; margin-bottom:14px;
  }
  .lang-btn {
    background:#0d1520; border:1px solid #1a2a3a; border-radius:20px;
    color:#556; font-size:10px; letter-spacing:1px; padding:4px 10px;
    cursor:pointer; font-family:inherit; transition:all 0.2s;
    text-transform:uppercase; font-weight:600;
  }
  .lang-btn:hover { border-color:#00e5ff55; color:#00e5ffaa; }
  .lang-btn.active { background:#001a22; border-color:#00e5ff; color:#00e5ff; }

  /* UPTIME BAR */
  .uptime-bar {
    border-bottom:1px solid #1a2a3a;
    padding:10px 16px;
    display:flex; align-items:center; gap:8px; flex-wrap:wrap;
  }
  .uptime-dot {
    width:8px; height:8px; border-radius:50%; flex-shrink:0;
    animation:pulse 2s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
  .uptime-text { font-size:11px; color:#889; }
  .uptime-text strong { color:#fff; }

  /* CONTENT */
  .content { padding:16px; }

  /* APP STORE BANNER */
  .appstore-banner {
    display:flex; align-items:center; gap:14px;
    background:linear-gradient(135deg,#1c1800,#241f00);
    border:1px solid #6a5a00; border-radius:12px;
    padding:14px 16px; margin-bottom:18px;
  }
  .appstore-left { font-size:32px; flex-shrink:0; }
  .appstore-label { font-size:9px; color:#aa9900; letter-spacing:2px; text-transform:uppercase; font-weight:bold; }
  .appstore-time  { font-size:18px; font-weight:bold; color:#ffe500; margin:3px 0; }
  .appstore-hint  { font-size:10px; color:#8a7700; }

  /* SUMMARY */
  .summary { display:flex; gap:8px; margin-bottom:20px; }
  .stat {
    flex:1; background:#0d1520; border-radius:10px;
    padding:12px 6px; text-align:center; border:1px solid #1a2a3a;
  }
  .stat .num { font-size:28px; font-weight:bold; line-height:1; }
  .stat .lbl { font-size:9px; color:#446; margin-top:4px; letter-spacing:1px; text-transform:uppercase; }

  /* SECTION HEADERS */
  .section-header {
    display:flex; align-items:center; gap:10px;
    margin-bottom:14px; margin-top:6px;
  }
  .section-header .sh-icon {
    width:32px; height:32px; border-radius:8px;
    display:flex; align-items:center; justify-content:center;
    font-size:16px; flex-shrink:0;
  }
  .section-header .sh-text { flex:1; }
  .section-header .sh-title {
    font-size:12px; font-weight:bold; letter-spacing:0.5px; text-transform:uppercase;
  }
  .section-header .sh-sub { font-size:10px; color:#446; margin-top:1px; }
  .section-header .sh-count {
    font-size:11px; font-weight:bold;
    padding:3px 10px; border-radius:20px;
  }
  .sh-critical .sh-icon { background:#2a0035; }
  .sh-critical .sh-title { color:#ff00cc; }
  .sh-critical .sh-count { background:#2a0035; color:#ff00cc; border:1px solid #ff00cc44; }
  .sh-high .sh-icon { background:#2a0808; }
  .sh-high .sh-title { color:#ff5555; }
  .sh-high .sh-count { background:#2a0808; color:#ff5555; border:1px solid #ff444444; }
  .sh-medium .sh-icon { background:#2a2000; }
  .sh-medium .sh-title { color:#ffbb00; }
  .sh-medium .sh-count { background:#2a2000; color:#ffbb00; border:1px solid #ffbb0044; }
  .divider { height:1px; background:#1a2a3a; margin:20px 0; }

  /* CARDS */
  .card {
    background:#0d1520; border-radius:12px;
    margin-bottom:12px; overflow:hidden;
    border:1px solid #1a2a3a; border-left:4px solid #333;
  }
  .card.critical { border-left-color:#ff00cc; background:#110016; border-color:#2a0035; }
  .card.tld      { border-left-color:#ff6600; background:#120a00; border-color:#3a1a00; }
  .badge.tld     { background:#2a1000; color:#ff6600; border:1px solid #ff660055; }
  .card.high     { border-left-color:#ff4444; border-color:#2a0808; }
  .card.medium   { border-left-color:#ffbb00; border-color:#2a2000; }
  .card-header {
    display:flex; justify-content:space-between; align-items:center;
    padding:10px 14px 6px;
  }
  .badge {
    font-size:9px; font-weight:bold;
    padding:3px 9px; border-radius:20px; letter-spacing:0.5px;
  }
  .badge.critical { background:#2a0035; color:#ff00cc; border:1px solid #ff00cc55; }
  .badge.high     { background:#2a0808; color:#ff5555; border:1px solid #ff444455; }
  .badge.medium   { background:#2a2000; color:#ffbb00; border:1px solid #ffbb0055; }
  .conns { font-size:10px; color:#446; }
  .card-domain {
    font-size:13px; font-weight:bold; color:#fff;
    padding:0 14px 10px; word-break:break-all;
  }
  .grid { padding:0 14px 12px; }
  .row {
    display:flex; gap:8px; padding:5px 0;
    border-top:1px solid #1a2a3a; align-items:flex-start;
  }
  .label { color:#446; min-width:65px; font-size:10px; padding-top:1px; flex-shrink:0; line-height:1.4; }
  .sub   { color:#334; font-size:9px; }
  .val   { color:#bbc; word-break:break-all; flex:1; font-size:11px; line-height:1.5; }
  .isp    { color:#ffbb00; }
  .reason { color:#ff8a80; }
  .rdns        { color:#ce93d8; font-style:italic; }
  .stale-banner {
    display:flex; align-items:flex-start; gap:12px;
    background:linear-gradient(135deg,#1a1200,#221800);
    border:1px solid #8a6000; border-radius:12px;
    padding:12px 16px; margin-bottom:14px;
  }
  .stale-left  { font-size:26px; flex-shrink:0; margin-top:2px; }
  .stale-label { font-size:9px; color:#aa7700; letter-spacing:2px; text-transform:uppercase; font-weight:bold; }
  .stale-time  { font-size:14px; color:#ffaa00; margin:3px 0; }
  .stale-time strong { color:#ffd000; }
  .stale-hint  { font-size:10px; color:#7a5500; line-height:1.4; }
  .ff-banner {
    display:flex; align-items:flex-start; gap:14px;
    background:linear-gradient(135deg,#0a1a00,#0f2200);
    border:1px solid #2a5500; border-radius:12px;
    padding:14px 16px; margin-bottom:14px;
  }
  .ff-left  { font-size:30px; flex-shrink:0; margin-top:2px; }
  .ff-info  { flex:1; }
  .ff-label { font-size:9px; color:#5a9900; letter-spacing:2px; text-transform:uppercase; font-weight:bold; margin-bottom:6px; }
  .ff-row   { display:flex; align-items:baseline; gap:8px; margin-bottom:2px; }
  .ff-tag   { font-size:9px; color:#446; min-width:100px; text-transform:uppercase; letter-spacing:0.5px; }
  .ff-time  { font-size:16px; font-weight:bold; color:#88ff00; }
  .ff-time-sub { font-size:13px; color:#5a9900; }
  .ff-sessions { font-size:10px; color:#3a6600; margin-top:6px; }
  .ff-session-row {
    display:flex; align-items:center; justify-content:space-between;
    gap:8px; padding:5px 0; border-top:1px solid #1a2a10;
  }
  .ff-session-row:first-of-type { border-top:none; }
  .ff-session-left { display:flex; flex-direction:column; gap:1px; }
  .ff-session-num  { font-size:9px; color:#446; text-transform:uppercase; letter-spacing:0.5px; }
  .ff-session-ts   { font-size:13px; font-weight:bold; color:#88ff00; }
  .ff-login-badge  {
    font-size:9px; font-weight:bold; padding:3px 8px;
    border-radius:10px; white-space:nowrap; flex-shrink:0;
  }
  .ff-hint  { font-size:10px; color:#4a7700; margin-top:3px; }

  /* PRE-LOGIN BANNER */
  .prelim-banner {
    background:linear-gradient(135deg,#1a0000,#240808);
    border:1px solid #8a0000; border-radius:12px;
    padding:14px 16px; margin-bottom:14px;
  }
  .prelim-header {
    display:flex; align-items:center; gap:10px; margin-bottom:12px;
  }
  .prelim-icon  { font-size:22px; flex-shrink:0; }
  .prelim-title { font-size:12px; font-weight:bold; color:#ff4444; letter-spacing:0.3px; }
  .prelim-sub   { font-size:10px; color:#884444; margin-top:2px; }
  .prelim-count {
    margin-left:auto; background:#3a0000; color:#ff4444;
    border:1px solid #ff444444; font-size:14px; font-weight:bold;
    padding:4px 12px; border-radius:20px; flex-shrink:0;
  }
  .prelim-rows  { display:flex; flex-direction:column; gap:6px; margin-bottom:10px; }
  .pre-row {
    background:#0d0505; border-radius:8px;
    padding:8px 10px; border-left:3px solid #8a0000;
  }
  .pre-row-top    { display:flex; align-items:center; gap:6px; margin-bottom:3px; flex-wrap:wrap; }
  .pre-domain     { font-size:12px; color:#ddc; word-break:break-all; flex:1; }
  .pre-hits       { font-size:10px; color:#664444; flex-shrink:0; }
  .pre-row-detail { font-size:10px; color:#664444; line-height:1.4; }
  .prelim-hint {
    font-size:10px; color:#884444; padding-top:10px;
    border-top:1px solid #2a0808; line-height:1.5;
  }
  .http-on     { color:#4caf50; font-weight:bold; }
  .http-off    { color:#555; font-weight:bold; }
  .http-banner { color:#ff00cc; font-weight:bold; text-transform:uppercase; font-size:10px; }
  .none   { color:#334; }
  .bundle {
    display:inline-block; background:#0d1520; border-radius:5px;
    padding:2px 6px; font-size:9px; color:#556; margin:1px;
    word-break:break-all; border:1px solid #1a2a3a;
  }
  .domain-row { padding:3px 0; font-size:11px; color:#bbc; word-break:break-all; }
  .domain-badge {
    display:inline-block; font-size:9px; font-weight:bold;
    padding:1px 5px; border-radius:4px; margin-right:4px; vertical-align:middle;
  }
  .domain-badge.high   { background:#2a0808; color:#ff5555; }
  .domain-badge.medium { background:#2a2000; color:#ffbb00; }
  .ok {
    background:#0a1a10; border:1px solid #1a3020; color:#4caf50;
    padding:20px; border-radius:12px; text-align:center; font-size:14px;
  }
</style>
</head>
<body>

<div class="hero">
  <div class="hero-eyebrow">Detector de Proxy</div>
  <div class="hero-name">Keller<span>SS</span></div>
  <div class="hero-credits">por Keller &middot; Katiau &middot; Samir</div>
  <div class="lang-bar">
    <button class="lang-btn active" onclick="setLang('pt')" id="btn-pt">PT-BR</button>
    <button class="lang-btn" onclick="setLang('en')" id="btn-en">EN</button>
    <button class="lang-btn" onclick="setLang('es')" id="btn-es">ES</button>
  </div>
  <div class="hero-file"><strong>Arquivo:</strong> ${filename}</div>
  <div class="hero-grid">
    <div class="hg-card">
      <div class="hg-label">Início</div>
      <div class="hg-val">${startStr}</div>
    </div>
    <div class="hg-card">
      <div class="hg-label">Último registro</div>
      <div class="hg-val">${endStr}</div>
    </div>
    <div class="hg-card">
      <div class="hg-label">Domínios únicos</div>
      <div class="hg-val cyan">${allDomains.size}</div>
    </div>
    <div class="hg-card">
      <div class="hg-label">Total conexões</div>
      <div class="hg-val">${netEntries.length}</div>
    </div>
  </div>
</div>

<div class="uptime-bar" style="${uptimeBg}">
  <div class="uptime-dot" style="${uptimeDotCl}"></div>
  <div class="uptime-text">Monitorado há <strong>${uptimeStr}</strong></div>
  ${uptimeWarnBadge}
</div>

<div class="content">

  ${staleBanner}
  ${ffBanner}
  ${appStoreBanner}

  <div class="summary">
    <div class="stat">
      <div class="num" style="color:#ff00cc">${criticalCount}</div>
      <div class="lbl">Crítico</div>
    </div>
    <div class="stat">
      <div class="num" style="color:#ff5555">${highCount}</div>
      <div class="lbl">Suspeito</div>
    </div>
    <div class="stat">
      <div class="num" style="color:#ffbb00">${medCount}</div>
      <div class="lbl">Possível</div>
    </div>
  </div>

  ${criticalCount > 0 ? `
  <div class="section-header sh-critical">
    <div class="sh-icon">&#9888;</div>
    <div class="sh-text">
      <div class="sh-title">Apps Proxy / Cheat Detectados</div>
      <div class="sh-sub">Aplicativos e infraestrutura conhecida de cheats</div>
    </div>
    <div class="sh-count">${criticalCount}</div>
  </div>
  ${criticalCards}
  <div class="divider"></div>` : ""}

  ${highCount > 0 ? `
  <div class="section-header sh-high">
    <div class="sh-icon">&#128683;</div>
    <div class="sh-text">
      <div class="sh-title">IPs Suspeitos</div>
      <div class="sh-sub">VPS / Hosting / Proxy confirmados</div>
    </div>
    <div class="sh-count">${highCount}</div>
  </div>` : ""}

  ${medCount > 0 && highCount > 0 ? "" : highCount === 0 ? `
  <div class="section-header sh-medium">
    <div class="sh-icon">&#128308;</div>
    <div class="sh-text">
      <div class="sh-title">IPs Possíveis</div>
      <div class="sh-sub">Infraestrutura cloud / datacenter</div>
    </div>
    <div class="sh-count">${medCount}</div>
  </div>` : ""}

  ${cards}

  ${findings.length > 0 && highCount > 0 && medCount > 0 ? `
  <div class="divider"></div>
  <div class="section-header sh-medium">
    <div class="sh-icon">&#9888;</div>
    <div class="sh-text">
      <div class="sh-title">IPs Possíveis</div>
      <div class="sh-sub">Infraestrutura cloud / datacenter</div>
    </div>
    <div class="sh-count">${medCount}</div>
  </div>` : ""}

</div>
<LANGSCRIPT_PLACEHOLDER>
</body>
</html>`
  // inject lang script (defined outside template to avoid backtick/interpolation conflicts)
  let html = rawHtml.replace('<LANGSCRIPT_PLACEHOLDER>', buildLangScript())
  return html
}

function buildLangScript() {
  return `<script>
var TRANSLATIONS = {
  pt: {
    eyebrow: "Detector de Proxy",
    credits: "por Keller · Katiau · Samir",
    fileLabel: "Arquivo:",
    start: "Início",
    lastRecord: "Último registro",
    uniqueDomains: "Domínios únicos",
    totalConns: "Total conexões",
    monitoredFor: "Monitorado há",
    criticalLabel: "Crítico",
    suspectLabel: "Suspeito",
    possibleLabel: "Possível",
    appProxyTitle: "Apps Proxy / Cheat Detectados",
    appProxySub: "Aplicativos conhecidos de interceptação de tráfego",
    suspectIPsTitle: "IPs Suspeitos",
    suspectIPsSub: "VPS / Hosting / Proxy confirmados",
    possibleIPsTitle: "IPs Possíveis",
    possibleIPsSub: "Infraestrutura cloud / datacenter",
    labelIP: "IP",
    labelCountry: "País",
    labelProvider: "Provedor",
    labelOrg: "Org",
    labelRDNS: "rDNS",
    labelHTTP: "HTTP",
    labelReason: "Motivo",
    labelUsedBy: "Usado por",
    labelApp: "App",
    labelSuspectIPs: "IPs suspeitos",
    noneDetected: "Nenhum IP suspeito detectado",
    noVPS: "✓ Nenhum IP VPS / Hosting / Proxy detectado.",
    staleLabel: "Arquivo possivelmente antigo",
    staleHint: "Suspeita: arquivo gerado fora do período da partida para esconder atividade.",
    ffLabel: "Sessões no período",
    ffLastOpen: "Última abertura",
    ffFirstOpen: "Primeira abertura",
    ffSessions: "inicializações registradas no período",
    ffHint: "Se a última abertura foi após a partida → aplique o W.O!",
    appStoreLabel: "App Store aberta",
    appStoreHint: "Se foi após a partida → aplique o W.O!",
    uptimeLess20: "MENOS DE 20MIN — Relatório pode não cobrir a partida inteira!",
    badgeCritical: "⚠ CRÍTICO — APP PROXY/CHEAT",
    badgeSuspect: "SUSPEITO",
    badgePossible: "POSSÍVEL",
    badgeDomainSuspect: "⚠ DOMÍNIO SUSPEITO",
    of: "de",
    online: "● Online",
    offline: "● Offline / Sem resposta",
    lastRecord2: "Último registro:",
    conns: "conexões",
    domains: "domínios",
  },
  en: {
    eyebrow: "Proxy Detector",
    credits: "by Keller · Katiau · Samir",
    fileLabel: "File:",
    start: "Start",
    lastRecord: "Last record",
    uniqueDomains: "Unique domains",
    totalConns: "Total connections",
    monitoredFor: "Monitored for",
    criticalLabel: "Critical",
    suspectLabel: "Suspicious",
    possibleLabel: "Possible",
    appProxyTitle: "Proxy / Cheat Apps Detected",
    appProxySub: "Known traffic interception applications",
    suspectIPsTitle: "Suspicious IPs",
    suspectIPsSub: "VPS / Hosting / Confirmed Proxy",
    possibleIPsTitle: "Possible IPs",
    possibleIPsSub: "Cloud / datacenter infrastructure",
    labelIP: "IP",
    labelCountry: "Country",
    labelProvider: "Provider",
    labelOrg: "Org",
    labelRDNS: "rDNS",
    labelHTTP: "HTTP",
    labelReason: "Reason",
    labelUsedBy: "Used by",
    labelApp: "App",
    labelSuspectIPs: "Suspicious IPs",
    noneDetected: "No suspicious IPs detected",
    noVPS: "✓ No VPS / Hosting / Proxy IPs detected.",
    staleLabel: "File possibly outdated",
    staleHint: "Suspicion: file generated outside the match period to hide activity.",
    ffLabel: "Sessions in period",
    ffLastOpen: "Last opened",
    ffFirstOpen: "First opened",
    ffSessions: "startups recorded in the period",
    ffHint: "If last opened after the match → apply W.O!",
    appStoreLabel: "App Store opened",
    appStoreHint: "If it was after the match → apply W.O!",
    uptimeLess20: "LESS THAN 20MIN — Report may not cover the entire match!",
    badgeCritical: "⚠ CRITICAL — PROXY/CHEAT APP",
    badgeSuspect: "SUSPICIOUS",
    badgePossible: "POSSIBLE",
    badgeDomainSuspect: "⚠ SUSPICIOUS DOMAIN",
    of: "of",
    online: "● Online",
    offline: "● Offline / No response",
    lastRecord2: "Last record:",
    conns: "connections",
    domains: "domains",
  },
  es: {
    eyebrow: "Detector de Proxy",
    credits: "por Keller · Katiau · Samir",
    fileLabel: "Archivo:",
    start: "Inicio",
    lastRecord: "Último registro",
    uniqueDomains: "Dominios únicos",
    totalConns: "Total conexiones",
    monitoredFor: "Monitoreado hace",
    criticalLabel: "Crítico",
    suspectLabel: "Sospechoso",
    possibleLabel: "Posible",
    appProxyTitle: "Apps Proxy / Cheat Detectadas",
    appProxySub: "Aplicaciones conocidas de interceptación de tráfico",
    suspectIPsTitle: "IPs Sospechosas",
    suspectIPsSub: "VPS / Hosting / Proxy confirmados",
    possibleIPsTitle: "IPs Posibles",
    possibleIPsSub: "Infraestructura cloud / datacenter",
    labelIP: "IP",
    labelCountry: "País",
    labelProvider: "Proveedor",
    labelOrg: "Org",
    labelRDNS: "rDNS",
    labelHTTP: "HTTP",
    labelReason: "Motivo",
    labelUsedBy: "Usado por",
    labelApp: "App",
    labelSuspectIPs: "IPs sospechosas",
    noneDetected: "Ninguna IP sospechosa detectada",
    noVPS: "✓ Ninguna IP VPS / Hosting / Proxy detectada.",
    staleLabel: "Archivo posiblemente antiguo",
    staleHint: "Sospecha: archivo generado fuera del período del partido para ocultar actividad.",
    ffLabel: "Sesiones en el período",
    ffLastOpen: "Última apertura",
    ffFirstOpen: "Primera apertura",
    ffSessions: "inicializaciones registradas en el período",
    ffHint: "Si la última apertura fue después del partido → ¡aplica el W.O!",
    appStoreLabel: "App Store abierta",
    appStoreHint: "Si fue después del partido → ¡aplica el W.O!",
    uptimeLess20: "MENOS DE 20MIN — ¡El informe puede no cubrir toda la partida!",
    badgeCritical: "⚠ CRÍTICO — APP PROXY/CHEAT",
    badgeSuspect: "SOSPECHOSO",
    badgePossible: "POSIBLE",
    badgeDomainSuspect: "⚠ DOMINIO SOSPECHOSO",
    of: "de",
    online: "● En línea",
    offline: "● Sin conexión / Sin respuesta",
    lastRecord2: "Último registro:",
    conns: "conexiones",
    domains: "dominios",
  }
};

function setLang(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  ['pt','en','es'].forEach(function(l) {
    var btn = document.getElementById('btn-' + l);
    if (btn) btn.classList.toggle('active', l === lang);
  });

  function q(sel) { return Array.from(document.querySelectorAll(sel)); }

  q('.hero-eyebrow').forEach(function(el){ el.textContent = t.eyebrow; });
  q('.hero-credits').forEach(function(el){ el.textContent = t.credits; });
  q('.hero-file strong').forEach(function(el){ el.textContent = t.fileLabel; });

  var hgLabels = q('.hg-label');
  ['start','lastRecord','uniqueDomains','totalConns'].forEach(function(k,i){
    if (hgLabels[i]) hgLabels[i].textContent = t[k];
  });

  q('.uptime-text').forEach(function(el){
    var strong = el.querySelector('strong');
    if (strong) {
      var val = strong.textContent;
      while (el.firstChild) el.removeChild(el.firstChild);
      el.appendChild(document.createTextNode(t.monitoredFor + ' '));
      var ns = document.createElement('strong');
      ns.textContent = val;
      el.appendChild(ns);
    }
  });

  q('.uptime-bar span').forEach(function(el){
    if (el.style && el.style.marginLeft) el.innerHTML = '&#9888; ' + t.uptimeLess20;
  });

  var statLabels = q('.stat .lbl');
  ['criticalLabel','suspectLabel','possibleLabel'].forEach(function(k,i){
    if (statLabels[i]) statLabels[i].textContent = t[k];
  });

  q('.section-header').forEach(function(sh){
    var title = sh.querySelector('.sh-title');
    var sub   = sh.querySelector('.sh-sub');
    if (!title) return;
    if (sh.classList.contains('sh-critical')) {
      title.textContent = t.appProxyTitle;
      if (sub) sub.textContent = t.appProxySub;
    } else if (sh.classList.contains('sh-high')) {
      title.textContent = t.suspectIPsTitle;
      if (sub) sub.textContent = t.suspectIPsSub;
    } else if (sh.classList.contains('sh-medium')) {
      title.textContent = t.possibleIPsTitle;
      if (sub) sub.textContent = t.possibleIPsSub;
    }
  });

  q('.stale-label').forEach(function(el){ el.textContent = t.staleLabel; });
  q('.stale-hint').forEach(function(el){ el.textContent = t.staleHint; });
  q('.stale-time').forEach(function(el){
    var strong = el.querySelector('strong');
    if (strong) {
      var tv = strong.textContent;
      while (el.firstChild) el.removeChild(el.firstChild);
      el.appendChild(document.createTextNode(t.lastRecord2 + ' '));
      var ns2 = document.createElement('strong');
      ns2.textContent = tv;
      el.appendChild(ns2);
    }
  });

  q('.ff-label').forEach(function(el){
    var version = el.textContent.indexOf('MAX') !== -1 ? 'Free Fire MAX' : 'Free Fire';
    el.textContent = version + ' — ' + t.ffLabel;
  });
  var ffTags = q('.ff-tag');
  [t.ffLastOpen, t.ffFirstOpen].forEach(function(v,i){
    if (ffTags[i]) ffTags[i].textContent = v;
  });
  q('.ff-sessions').forEach(function(el){
    var num = el.textContent.match(/\d+/);
    if (num) el.textContent = num[0] + ' ' + t.ffSessions;
  });
  q('.ff-hint').forEach(function(el){ el.textContent = t.ffHint; });

  q('.appstore-label').forEach(function(el){ el.textContent = t.appStoreLabel; });
  q('.appstore-hint').forEach(function(el){ el.textContent = t.appStoreHint; });

  q('.ok').forEach(function(el){ el.textContent = t.noVPS; });

  var labelMap = {
    'IP': 'labelIP',
    'País': 'labelCountry', 'Country': 'labelCountry',
    'Provedor': 'labelProvider', 'Provider': 'labelProvider', 'Proveedor': 'labelProvider',
    'Org': 'labelOrg',
    'rDNS': 'labelRDNS',
    'HTTP': 'labelHTTP',
    'Motivo': 'labelReason', 'Reason': 'labelReason',
    'Usado por': 'labelUsedBy', 'Used by': 'labelUsedBy',
    'App': 'labelApp',
  };

  q('.card').forEach(function(card){
    var badge = card.querySelector('.badge');
    var connsEl = card.querySelector('.conns');
    if (connsEl) {
      var num = connsEl.textContent.match(/\d+/);
      if (num) connsEl.textContent = num[0] + ' ' + t.conns;
    }
    if (badge) {
      if (badge.classList.contains('critical')) badge.innerHTML = t.badgeCritical;
      else if (badge.classList.contains('tld')) badge.innerHTML = t.badgeDomainSuspect;
      else if (badge.classList.contains('high')) badge.textContent = t.badgeSuspect;
      else if (badge.classList.contains('medium')) badge.textContent = t.badgePossible;
    }
    card.querySelectorAll('.label').forEach(function(lbl){
      var sub = lbl.querySelector('.sub');
      if (sub) {
        var fn = lbl.childNodes[0];
        if (fn && fn.nodeType === 3) fn.textContent = t.labelSuspectIPs + ' ';
        var nums = sub.textContent.match(/\d+/g);
        if (nums && nums.length >= 2) sub.textContent = nums[0] + ' ' + t.of + ' ' + nums[1] + ' ' + t.domains;
        return;
      }
      var txt = lbl.textContent.trim();
      var key = labelMap[txt];
      if (key && t[key]) lbl.textContent = t[key];
    });
    card.querySelectorAll('.none').forEach(function(el){ el.textContent = t.noneDetected; });
    card.querySelectorAll('.val').forEach(function(el){
      if (el.textContent.indexOf('Online') !== -1 || el.textContent.indexOf('Offline') !== -1 || el.textContent.indexOf('línea') !== -1 || el.textContent.indexOf('conexión') !== -1) {
        el.innerHTML = el.innerHTML
          .replace(/●\s*(En línea|Online)/g, t.online)
          .replace(/●\s*(Sin conexión[^<]*|Offline[^<]*)/g, t.offline);
      }
    });
  });
}
window.setLang = setLang;
<\/script>`;
}

async function showResult(html) {
  let wv = new WebView()
  await wv.loadHTML(html)
  await wv.present(false)
}

async function main() {
  let fileResult = await findNdjsonFile()

  if (!fileResult) {
    Script.complete()
    return
  }

  let { path: filePath, fm: fileFm } = fileResult
  let filename = filePath.split("/").pop()

  let content
  try {
    if (fileFm.isFileStoredIniCloud && fileFm.isFileStoredIniCloud(filePath)) {
      await fileFm.downloadFileFromiCloud(filePath)
    }
    content = fileFm.readString(filePath)
  } catch(e) {
    try { content = FileManager.local().readString(filePath) } catch(e2) {}
  }

  if (!content) {
    let a = new Alert()
    a.title = "Erro"
    a.message = "Não foi possível ler o arquivo."
    a.addAction("OK")
    await a.present()
    return
  }

  let entries = parseNdjson(content)

  let validation = validateReport(entries)
  if (!validation.ok) {
    let a = new Alert()
    a.title = "Arquivo Inválido"
    a.message = validation.reason + "\n\nEnvie um App Privacy Report gerado pelo próprio iPhone em:\nAjustes → Privacidade → Relatório de Privacidade de Apps → Exportar"
    a.addAction("OK")
    await a.present()
    return
  }

  let { findings, netEntries, cheatAppFindings, knownCheatFindings, ffLoginTs } = await analyze(entries)

  let html = buildHTML(findings, netEntries, cheatAppFindings, knownCheatFindings, ffLoginTs, filename)
  await showResult(html)
}
