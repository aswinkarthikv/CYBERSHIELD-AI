import { ThreatActivity, SimulationScenario, EmergencyScenario, ScanHistory, SeverityLevel } from './types';

export const mockStats = {
  securityScore: 84,
  activeThreatsCount: 3,
  systemStatus: 'SHIELD ACTIVE',
  lastUpdated: 'Just now',
};

export const recentThreats: ThreatActivity[] = [
  {
    id: 'TX-1092',
    timestamp: '2026-06-26 21:40:12',
    source: '192.168.1.145 (Internal Dev Server)',
    category: 'Brute Force Attempt',
    severity: 'high',
    status: 'mitigated',
    description: '14 rapid failed SSH login attempts detected within a 12-second window.',
  },
  {
    id: 'TX-1091',
    timestamp: '2026-06-26 20:15:33',
    source: 'inbound-mail-daemon@enterprise.com',
    category: 'Credential Phishing',
    severity: 'critical',
    status: 'investigating',
    description: 'High-severity phishing email targeting C-suite executives with a forged Microsoft authentication screen.',
  },
  {
    id: 'TX-1090',
    timestamp: '2026-06-26 19:02:11',
    source: 'EP-501 (Marketing Endstation)',
    category: 'Heuristic Malware',
    severity: 'medium',
    status: 'resolved',
    description: 'Suspicious DLL load from unverified cabinet file executed in temporary AppData cache.',
  },
  {
    id: 'TX-1089',
    timestamp: '2026-06-26 14:22:45',
    source: 'Firewall-West-VPC',
    category: 'Unauthorized Port Scan',
    severity: 'low',
    status: 'mitigated',
    description: 'Sequential TCP port scanning activity registered from foreign egress gateway on range 8000-8090.',
  },
];

export const threatTrendData = [
  { name: 'Mon', threats: 12, remediated: 12, networkLoad: 45 },
  { name: 'Tue', threats: 19, remediated: 18, networkLoad: 64 },
  { name: 'Wed', threats: 8, remediated: 8, networkLoad: 50 },
  { name: 'Thu', threats: 24, remediated: 22, networkLoad: 78 },
  { name: 'Fri', threats: 15, remediated: 14, networkLoad: 55 },
  { name: 'Sat', threats: 6, remediated: 6, networkLoad: 30 },
  { name: 'Sun', threats: 3, remediated: 3, networkLoad: 25 },
];

export const riskDistributionData = [
  { name: 'Phishing', value: 35, color: '#a855f7' },
  { name: 'Malware', value: 25, color: '#3b82f6' },
  { name: 'Credential Abuse', value: 20, color: '#ef4444' },
  { name: 'System Intrusion', value: 15, color: '#eab308' },
  { name: 'Data Leak', value: 5, color: '#10b981' },
];

export const securityScoreHistory = [
  { week: 'Wk 21', score: 72 },
  { week: 'Wk 22', score: 75 },
  { week: 'Wk 23', score: 79 },
  { week: 'Wk 24', score: 81 },
  { week: 'Wk 25', score: 84 },
];

export const scanHistoryList: ScanHistory[] = [
  {
    id: 'S-2051',
    date: '2026-06-26 18:30',
    target: 'https://security-verify-banking.co-login.web/index.html',
    type: 'URL',
    riskScore: 92,
    status: 'malicious',
    threatName: 'PayPal Credential Grabber',
    confidence: 98,
  },
  {
    id: 'S-2050',
    date: '2026-06-26 15:10',
    target: 'purchase-invoice_6021.pdf',
    type: 'File',
    riskScore: 78,
    status: 'suspicious',
    threatName: 'Obfuscated macro payload',
    confidence: 84,
  },
  {
    id: 'S-2049',
    date: '2026-06-25 12:45',
    target: 'Secure payment confirmation QR.png',
    type: 'QR Code',
    riskScore: 12,
    status: 'clean',
    confidence: 96,
  },
  {
    id: 'S-2048',
    date: '2026-06-25 09:12',
    target: 'https://github.com/microsoft/vscode',
    type: 'URL',
    riskScore: 0,
    status: 'clean',
    confidence: 100,
  },
  {
    id: 'S-2047',
    date: '2026-06-24 16:30',
    target: 'support_ticket_screenshot.jpg',
    type: 'Screenshot',
    riskScore: 64,
    status: 'suspicious',
    threatName: 'Tech Support Impersonation overlay',
    confidence: 75,
  },
];

export const emergencyScenarios: EmergencyScenario[] = [
  {
    id: 'instahack',
    title: 'Social Media / Instagram Account Hijack',
    description: 'Unauthorized credentials exchange, modified MFA parameters, and targeted phishing messages disseminated to network followers.',
    icon: 'Instagram',
    estimatedTimeline: '2 - 4 Hours',
    steps: [
      {
        id: 1,
        title: 'Revoke Existing Session Authorizations',
        description: 'Initiate emergency authentication state refresh. Force termination of active sessions globally via Account Center.',
        priority: 'critical',
        actionLabel: 'Execute Kill Switch',
        isExecuted: false,
      },
      {
        id: 2,
        title: 'Audit Connected OAuth Integrations',
        description: 'Scan account integrations for unapproved third-party permissions, connected widgets, or unauthorized backup emails.',
        priority: 'high',
        actionLabel: 'Run API Audit',
        isExecuted: false,
      },
      {
        id: 3,
        title: 'Perform Authenticator Reset',
        description: 'Generate fresh master seed for physical or app-based 2FA (TOTP). Revoke legacy recovery codes.',
        priority: 'critical',
        actionLabel: 'Reset 2FA Seeds',
        isExecuted: false,
      },
      {
        id: 4,
        title: 'Broadcast Incident Notice to Network',
        description: 'Mitigate collateral harm. Inform close associates of compromised state to prevent downstream phishing infections.',
        priority: 'medium',
        actionLabel: 'Generate Alert Template',
        isExecuted: false,
      },
    ],
  },
  {
    id: 'ransomware',
    title: 'Active Ransomware Outbreak',
    description: 'Unidentified cryptographic locking of local partitions, file directories mounting extension mutations (.locky), and local extortion messages.',
    icon: 'Skull',
    estimatedTimeline: '12 - 24 Hours',
    steps: [
      {
        id: 1,
        title: 'Network Segmentation Isolation',
        description: 'Disconnect the infected node from WLAN, LAN, and VPN instantly. Prevent active SMB lateral traversal.',
        priority: 'critical',
        actionLabel: 'Sever Connection',
        isExecuted: false,
      },
      {
        id: 2,
        title: 'Preserve Volatile Memory (RAM Dump)',
        description: 'Capture active memory logs to extract ephemeral cryptographic keys before powering down or restarting endpoints.',
        priority: 'high',
        actionLabel: 'Trigger Memory Dump',
        isExecuted: false,
      },
      {
        id: 3,
        title: 'Identify Ransomware Strain Signature',
        description: 'Correlate signature extension mutations and ransom text strings against global threat-intel bases (NoMoreRansom).',
        priority: 'medium',
        actionLabel: 'Identify Mutation',
        isExecuted: false,
      },
      {
        id: 4,
        title: 'Audit Vault Backup Restorations',
        description: 'Audit air-gapped backups for temporal integrity. Verify last uncorrupted restoration snapshot preceding the initial breach timeline.',
        priority: 'high',
        actionLabel: 'Verify Cold Backups',
        isExecuted: false,
      },
    ],
  },
  {
    id: 'phishing',
    title: 'Active Executive Bank Phishing Threat',
    description: 'C-Suite personnel entered primary banking vault credentials into simulated routing portal.',
    icon: 'CreditCard',
    estimatedTimeline: '1 - 2 Hours',
    steps: [
      {
        id: 1,
        title: 'Enact Immediate Account Suspension',
        description: 'Signal bank treasury representatives via rapid hotlines to freeze transaction routing capabilities and ACH clearances.',
        priority: 'critical',
        actionLabel: 'Deploy Freeze Request',
        isExecuted: false,
      },
      {
        id: 2,
        title: 'Global Credential Purge',
        description: 'Purge active directories and force password resets on all organizational accounts linked with the target executive.',
        priority: 'critical',
        actionLabel: 'Purge Directory Credentials',
        isExecuted: false,
      },
      {
        id: 3,
        title: 'URL Inbound Block',
        description: 'Update centralized security gateways (DNS/Firewall) to blackhole the spoofed routing portal globally.',
        priority: 'high',
        actionLabel: 'Blackhole Domain',
        isExecuted: false,
      },
    ],
  },
];

export const simulationScenarios: SimulationScenario[] = [
  {
    id: 'phishing-email',
    title: 'Phishing Email Detection',
    description: 'Evaluate an urgent email claiming to be from security compliance. Detect deceptive headers, generic greetings, and suspicious domains.',
    difficulty: 'Beginner',
    category: 'Email Security',
    initialArtifacts: [
      'From: IT-Security Support <admin-verification-portal@secure-pwc-portal.net>',
      'To: Employee <intern@pwc.com>',
      'Subject: URGENT: MFA update required within 2 hours or access terminated',
      'Body:\nDear Employee,\n\nWe have detected unusual connection logs from your workstation. To preserve secure remote-working eligibility, you are requested to re-verify your MFA authenticator settings immediately.\n\nClick the portal below to synchronize status:\n-> http://sync-pwc.verification-gateway.com/login\n\nKind Regards,\nSecurity Operations Command Desk'
    ],
    questions: [
      {
        questionText: 'What is the most critical red flag in the sender\'s email address?',
        options: [
          'It contains "Support" which is too informal.',
          'The domain name "secure-pwc-portal.net" is an external lookup domain, not the official enterprise domain.',
          'It is sent to "intern@pwc.com" instead of the main mailbox.',
          'The mailbox prefix is "admin-verification-portal" which is too long.'
        ],
        correctIndex: 1,
        explanation: 'Attackers register domains that look official (cybersquatting or typo-squatting) like "secure-pwc-portal.net" to fool readers. Official emails always originate from authenticated corporate domains.'
      },
      {
        questionText: 'Identify the threat indicator in the destination hyperlink provided (sync-pwc.verification-gateway.com):',
        options: [
          'It uses unencrypted HTTP instead of HTTPS.',
          'The root domain is "verification-gateway.com", which has no connection to the official enterprise infrastructure.',
          'It contains suspicious subdomains designed to look like "pwc".',
          'All of the above.'
        ],
        correctIndex: 3,
        explanation: 'The link has multiple flags: it lacks SSL encryption (HTTP), uses a suspicious subdomain to trigger brand recognition, and redirects to an unknown root domain "verification-gateway.com".'
      },
      {
        questionText: 'What is the recommended response action if you receive this email?',
        options: [
          'Reply to the sender to verify if the request is legitimate.',
          'Delete the email immediately and ignore the alert.',
          'Click the link but do not type your actual password.',
          'Report the message via the official "Report Phishing" client plugin or forward it to the internal SOC team.'
        ],
        correctIndex: 3,
        explanation: 'Replying validates your email exists, while deleting hides the incident. Reporting it allows security operations to block the threat globally for all employees.'
      }
    ]
  },
  {
    id: 'bank-login',
    title: 'Fake Banking Portal Authentication',
    description: 'Inspect a digital banking login prompt. Discern structural visual cues and URL markers to identify if it is an official portal or a credential harvester.',
    difficulty: 'Intermediate',
    category: 'Web Browser Safety',
    initialArtifacts: [
      'URL: http://secure.pwc-bank-verification.com/client/signin',
      'Page Visual Assets:\n- Official bank branding logo (slightly pixelated)\n- Red alert box stating "Your session is expiring due to security upgrades"\n- Form requesting: Username, Password, PIN, and Mother\'s Maiden Name.'
    ],
    questions: [
      {
        questionText: 'Which data request is the strongest indicator of a fraudulent credential harvest site?',
        options: [
          'The standard username field.',
          'The password field.',
          'The request for your private banking PIN and Mother\'s Maiden Name on a simple login interface.',
          'None of the above.'
        ],
        correctIndex: 2,
        explanation: 'Official login interfaces rarely request security PINs or high-sensitivity security questions (like Mother\'s Maiden Name) on the first step of authentication. This is an indicator of deep harvesting.'
      },
      {
        questionText: 'If you already input your password into this portal, what is your immediate priority action?',
        options: [
          'Wait to see if your bank contacts you.',
          'Log into your official banking app and immediately update your password, then report the fraud to the bank\'s compliance center.',
          'Perform a virus scan on your phone.',
          'Clear your browser cache and cookies.'
        ],
        correctIndex: 1,
        explanation: 'If credentials are leaked, you must immediately update them via a known trusted channel (official app or bookmarked link) to cut off access, then notify the financial institute to monitor for suspicious transactions.'
      }
    ]
  },
  {
    id: 'usb-malware',
    title: 'USB Drop & Social Engineering',
    description: 'You find a high-capacity USB stick in the office lobby with a label reading "Executive Salaries Q2 - Confidential". Measure security compliance and hardware safety.',
    difficulty: 'Advanced',
    category: 'Hardware & Physical Security',
    initialArtifacts: [
      'Physical item: USB 3.0 sandisk drive.',
      'Location: Main elevator lobby floor.',
      'Label: Hand-written "Executive Compensation 2026 - HR Draft".'
    ],
    questions: [
      {
        questionText: 'Why is connecting this USB drive to your personal or work workstation highly dangerous?',
        options: [
          'It could contain HID Keyboard emulator payloads (e.g. Rubber Ducky) that inject keystrokes in seconds.',
          'It may contain auto-running executable files or macro-enabled documents.',
          'It could contain custom capacitors designed to discharge high voltage to fry your motherboard (USB Killer).',
          'All of the above.'
        ],
        correctIndex: 3,
        explanation: 'Foreign USB drives present structural hardware, firmware, and software exploits. They can act as keyboards to run shell commands, deploy trojans via shortcut exploits, or physically destroy systems.'
      },
      {
        questionText: 'What is the correct way to handle a suspicious USB drive found on corporate grounds?',
        options: [
          'Plug it into a colleague\'s computer to see if it belongs to them.',
          'Hand it over to corporate physical security or the IT service desk, specifying that it is untrusted physical media.',
          'Upload its file list to your cloud drive to inspect it safely.',
          'Throw it in the regular recycling bin.'
        ],
        correctIndex: 1,
        explanation: 'Untrusted media should be isolated and submitted directly to security staff. They can analyze the device inside a physical air-gapped sandboxed terminal.'
      }
    ]
  }
];

export const copilotPreloadedQuestions = [
  'I clicked on a suspicious link claiming to be from PwC Security. What should I do now?',
  'My business Instagram account was compromised and the recovery email changed. What is the immediate plan?',
  'I downloaded a PDF attachment from an unexpected invoice email but did not open it. Am I safe?',
  'What are the critical steps to protect our system against active ransomware lateral propagation?'
];

// Mock database of responses for matching user queries
export const copilotKnowledgeBase: { keywords: string[]; title: string; category: string; severity: SeverityLevel; riskScore: number; impact: string; actions: string[]; recovery: string[]; prevention: string[]; explanation: string; }[] = [
  {
    keywords: ['link', 'banking', 'phishing', 'click', 'url'],
    title: 'Suspicious Link Interaction & Phishing Exposure',
    category: 'Phishing Threat Vector',
    severity: 'high',
    riskScore: 78,
    impact: 'Potential loss of single sign-on (SSO) credentials, account takeover, or session token interception.',
    actions: [
      'Do not enter any further credentials or multi-factor codes into that browser session.',
      'Disconnect from public networks and switch to authenticated corporate VPN or secure internet.',
      'Force-close any active tabs routing to that suspicious destination.'
    ],
    recovery: [
      'Immediately modify your primary active passwords via an official, trusted corporate portal.',
      'Revoke all current web sessions for that account from the active sessions security dashboard.',
      'Report the phishing target URL to security operations so it can be blocked in corporate firewalls.'
    ],
    prevention: [
      'Always hover over links to inspect the target host domain before clicking.',
      'Look for the official domain name syntax - pay attention to subdomains like "pwc-login-verify.com" vs "pwc.com".',
      'Use multi-factor authentication methods that are resistant to phishing (like FIDO2 / Passkeys).'
    ],
    explanation: 'When you click a phishing link, the primary threat is credential harvesting. If you did not input any username, password, or security codes, your risk of a compromised account is relatively low, but tracking cookie hijacking remains possible.'
  },
  {
    keywords: ['instagram', 'facebook', 'social', 'hack', 'compromise', 'account'],
    title: 'Social Media Profile Takeover & Brand Hijack',
    category: 'Identity & Access Threat',
    severity: 'high',
    riskScore: 82,
    impact: 'Reputational fallout, corporate impersonation, targeted phishing campaigns sent directly to customers, and secondary data leaks.',
    actions: [
      'Initiate account recovery procedures via the native app utilizing previous security phone numbers or emails.',
      'Document all visible changes (such as altered profile bios, posts, and newly added followings) for forensic support.',
      'Publish an emergency notice on sister channels warning followers to ignore direct messages from this profile.'
    ],
    recovery: [
      'Submit a formal Identity Verification request with security selfie recordings directly to the platform help team.',
      'Audit secondary linked platforms (like Facebook or business accounts) and detach unauthorized access layers.',
      'Perform a deep malware scan on physical devices previously used to log into the account.'
    ],
    prevention: [
      'Use high-entropy passwords unique to social platforms - never reuse corporate credentials.',
      'Utilize strong authenticator-app based 2FA rather than SMS-based verification.',
      'Restrict administrative profile access to authorized personnel using role-based group portals.'
    ],
    explanation: 'Social accounts are frequently targeted through credential reuse or social engineering. Attackers instantly alter linked recovery parameters (emails and phone numbers) to lock you out. Fast recovery requires verifying your authentic brand identity directly with platform support.'
  },
  {
    keywords: ['pdf', 'download', 'file', 'attachment', 'invoice'],
    title: 'Downloaded File Analysis & Executable Payload Risks',
    category: 'Host Malware Infection',
    severity: 'medium',
    riskScore: 45,
    impact: 'System backdoor loading, local document encryption, keystroke logging, or quiet registry persistence.',
    actions: [
      'Do not open, double-click, or preview the downloaded file under any circumstances.',
      'Locate the file in your downloads directory and do not move or unzip it.',
      'Submit the file hash to an isolated sandbox analyzer or your security desk.'
    ],
    recovery: [
      'Permanently delete the file from your computer (Shift + Delete to bypass Recycle Bin).',
      'Execute a full system scan with your enterprise-managed endpoint protection software.',
      'Notify IT security if the file attempted to automatically invoke any terminal window or script.'
    ],
    prevention: [
      'Never download files from unverified or generic inbound corporate senders.',
      'Keep your Operating System and PDF viewer patched to the latest version to block zero-day exploits.',
      'Maintain an active local firewall and active heuristic antivirus configurations.'
    ],
    explanation: 'Simply downloading a file without executing or opening it rarely compromises an operating system, as modern web browsers isolate downloads. The danger arises if the document executes hidden macros or exploits vulnerable parsing scripts once opened.'
  },
  {
    keywords: ['ransomware', 'lateral', 'extortion', 'propagation', 'network'],
    title: 'Ransomware Containment & Active Encryption',
    category: 'Lateral Network Incident',
    severity: 'critical',
    riskScore: 96,
    impact: 'Widespread storage network lockouts, corporate operational standstill, and high-liability sensitive data exposure.',
    actions: [
      'Sever physical and wireless network connections for all infected nodes immediately.',
      'Shut down network switches routing between infected domains if lateral scanning is detected.',
      'Alert the active Incident Response lead and security team instantly.'
    ],
    recovery: [
      'Identify the compromised folders to isolate the starting node and pinpoint the encryption vector.',
      'Verify backup integrity and ensure that backup repositories have not been altered or formatted.',
      'Retrieve fresh corporate keys or contact cyber insurance coordinators before any ransom discussions.'
    ],
    prevention: [
      'Enact zero-trust network architectures to segment sensitive file vaults.',
      'Deploy endpoint detection and response (EDR) platforms capable of blocking suspicious high-frequency encryption file behaviors.',
      'Perform routine automated offline back-ups.'
    ],
    explanation: 'Ransomware relies on fast network traversal to lock as much business data as possible. Immediate physical network isolation of affected workstations is the single most effective way to prevent a minor workstation incident from becoming an enterprise crisis.'
  }
];

export const defaultCopilotResponse = {
  title: 'AI Security Analysis Output',
  category: 'General Inquiry Resolved',
  severity: 'low' as SeverityLevel,
  riskScore: 15,
  impact: 'Minimal organizational exposure. General informational inquiry.',
  actions: [
    'Confirm security settings are updated across personal devices.',
    'Remain vigilant for emerging physical and digital social engineering hooks.',
    'Submit any further suspicious payloads or links directly to our Threat Analyzer panel.'
  ],
  recovery: [
    'Run a general system diagnostic or antivirus sweep to confirm local endpoint health.',
    'Verify that authentication settings utilize robust authenticator-app setups.'
  ],
  prevention: [
    'Participate in periodic cyber simulator drills to train recognition skills.',
    'Consult our emergency playbook to build familiarity with security protocols.'
  ],
  explanation: 'Your query is being classified as general information seeking. To ensure maximum defense, ensure your systems are fully patched and always verify the sender on any unexpected incoming communication.'
};
