import { useState, useEffect, useRef } from "react";

// ── SAP Fiori Icon System (SAP icon font approximation using SVG) ──
const icons = {
  home: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M8 1L1 6.5V15h4.5v-4h5v4H15V6.5L8 1z" />
    </svg>
  ),
  inbox: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M14 2H2v8h4l2 2 2-2h4V2zM2 12v2h12v-2H2z" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M1 1h2l.5 2H14l-2 6H5L3 3H1V1zm4 12a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M1 14h14v1H1v-1zm1-4h2v4H2v-4zm3-3h2v7H5V7zm3-2h2v9H8V5zm3-3h2v12h-2V2z" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 1c-3.3 0-6 1.8-6 4v1h12v-1c0-2.2-2.7-4-6-4z" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M4 0v2H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1h-2V0h-2v2H6V0H4zm-2 6h12v9H2V6z" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M8 10a2 2 0 100-4 2 2 0 000 4zm6.3-1.5l-1.1-.6c.1-.3.1-.6.1-.9s0-.6-.1-.9l1.1-.6c.2-.1.3-.4.2-.6l-1-1.7c-.1-.2-.4-.3-.6-.2l-1.1.6c-.5-.4-1-.7-1.6-.9V2.5c0-.3-.2-.5-.5-.5h-2c-.3 0-.5.2-.5.5v1.2c-.6.2-1.1.5-1.6.9l-1.1-.6c-.2-.1-.5 0-.6.2l-1 1.7c-.1.2-.1.5.2.6l1.1.6c-.1.3-.1.6-.1.9s0 .6.1.9l-1.1.6c-.2.1-.3.4-.2.6l1 1.7c.1.2.4.3.6.2l1.1-.6c.5.4 1 .7 1.6.9v1.2c0 .3.2.5.5.5h2c.3 0 .5-.2.5-.5v-1.2c.6-.2 1.1-.5 1.6-.9l1.1.6c.2.1.5 0 .6-.2l1-1.7c.1-.2.1-.5-.2-.6z" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M8 16a2 2 0 002-2H6a2 2 0 002 2zm6-5V7c0-3-2-5.5-5-6V0H7v1C4 1.5 2 4 2 7v4l-1 1v1h14v-1l-1-1z" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M11.7 10.3c.9-1.2 1.4-2.6 1.4-4.2C13.1 2.7 10.4 0 7.1 0S1 2.7 1 6.1s2.7 6.1 6.1 6.1c1.6 0 3-.5 4.2-1.4l3 3 1.4-1.4-3-3.1zm-4.6 0c-2.3 0-4.2-1.9-4.2-4.2S4.8 1.9 7.1 1.9s4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2z" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M3 0a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V4l-4-4H3zm7 1.5L13.5 5H10V1.5zM4 7h8v1H4V7zm0 2h8v1H4V9zm0 2h5v1H4v-1z" />
    </svg>
  ),
  money: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.5 12v1h-1v-1c-1.1-.1-2-.6-2.5-1.2l.9-.8c.4.5 1 .8 1.6.8.7 0 1.3-.3 1.3-.9 0-.5-.4-.8-1.4-1.1C5.8 8.3 5 7.8 5 6.7c0-1 .8-1.8 2-1.9V3.5h1v1.3c.9.1 1.6.5 2.1 1l-.8.8c-.4-.4-.9-.6-1.4-.6-.7 0-1.1.3-1.1.8 0 .5.4.7 1.5 1 1.5.4 2.2 1 2.2 2.1 0 1.1-.9 1.9-2 2.1z" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M0 3v8h1a2 2 0 104 0h6a2 2 0 104 0h1V7l-3-4H0zm12 1h2l2 3v4h-.3A2 2 0 0013.5 9.5 2 2 0 0012 11V4zM3 12a1 1 0 110-2 1 1 0 010 2zm10 0a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M10 1H6a1 1 0 00-1 1H3a1 1 0 00-1 1v11a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1-1zm0 1v1H6V2h4zM4 6h8v1H4V6zm0 2h8v1H4V8zm0 2h5v1H4v-1z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M6 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm5 0a2 2 0 100-4 2 2 0 000 4zM6 8.5c-2.7 0-5 1.5-5 3.3V13h10v-1.2c0-1.8-2.3-3.3-5-3.3zm5 .5c-.4 0-.8 0-1.2.1.7.6 1.2 1.4 1.2 2.4V13h4v-1c0-1.5-1.8-2.5-4-2.5z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm5.9 7h-2.8c-.1-1.8-.5-3.4-1.2-4.6A6 6 0 0113.9 7zM8 14c-.9 0-2.1-1.9-2.3-5h4.6c-.2 3.1-1.4 5-2.3 5zm-2.3-7C5.9 3.9 7.1 2 8 2s2.1 1.9 2.3 5H5.7zM6.1 2.4C5.4 3.6 5 5.2 4.9 7H2.1a6 6 0 014-4.6zM2.1 9h2.8c.1 1.8.5 3.4 1.2 4.6A6 6 0 012.1 9zm7.8 4.6c.7-1.2 1.1-2.8 1.2-4.6h2.8a6 6 0 01-4 4.6z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M6 11.2L2.8 8l-1.4 1.4L6 14 14.6 5.4 13.2 4 6 11.2z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M8 1L1 15h14L8 1zm0 4l.5 5h-1L8 5zm0 7.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M12.3 3.7L8 8l4.3 4.3-1.4 1.4L6.6 9.4l-4.3 4.3-1-1L5.6 8 1.3 3.7l1-1L6.6 7 11 2.7l1.3 1z" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M1 1h4v4H1V1zm5 0h4v4H6V1zm5 0h4v4h-4V1zM1 6h4v4H1V6zm5 0h4v4H6V6zm5 0h4v4h-4V6zM1 11h4v4H1v-4zm5 0h4v4H6v-4zm5 0h4v4h-4v-4z" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M1 2h14v2H1V2zm0 4h14v2H1V6zm0 4h14v2H1v-2zm0 4h14v2H1v-2z" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M10 0L6 4 4 3 1 6l3.5 3.5L1 14h1l4.5-3.5L10 14l3-3-1-2 4-4-6-5z" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M12.1 0L10 2.1 13.9 6l2.1-2.1L12.1 0zM0 12.2V16h3.8L12 7.8 8.2 4 0 12.2z" />
    </svg>
  ),
  back: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
      <path d="M10 2L4 8l6 6 1.4-1.4L6.8 8l4.6-4.6L10 2z" />
    </svg>
  ),
};

// ── Tile Color Palette (SAP Fiori style) ──
// Loaded from config at runtime; these are fallbacks
const defaultTileColors = [
  { bg: "#0070f2", text: "#fff" },
  { bg: "#1a5cbe", text: "#fff" },
  { bg: "#0a6ed1", text: "#fff" },
  { bg: "#d1efff", text: "#0057a3" },
  { bg: "#188918", text: "#fff" },
  { bg: "#e8f5e0", text: "#256f26" },
  { bg: "#c35500", text: "#fff" },
  { bg: "#fff3b0", text: "#6d4c00" },
  { bg: "#a100c2", text: "#fff" },
  { bg: "#f0d9ff", text: "#7800a4" },
  { bg: "#354a5f", text: "#fff" },
  { bg: "#d3dce2", text: "#354a5f" },
];

// ── Config loader ──
// In production, replace this URL with your API endpoint or static file path:
//   fetch("/api/portal/config") or fetch("/config/fiori-portal-config.json")
// The config JSON structure is documented in fiori-portal-config.json
const CONFIG_URL = null; // Set to your config endpoint URL

async function loadPortalConfig() {
  if (CONFIG_URL) {
    const res = await fetch(CONFIG_URL);
    if (!res.ok) throw new Error(`Config fetch failed: ${res.status}`);
    return await res.json();
  }
  // Fallback: return embedded defaults (mirrors fiori-portal-config.json)
  return null;
}

function mapConfigToAppGroups(config) {
  if (!config) return null;
  return config.appGroups
    .filter((g) => g.visible)
    .sort((a, b) => a.order - b.order)
    .map((g) => ({
      name: g.name,
      apps: g.apps
        .filter((a) => a.visible)
        .sort((a, b) => a.order - b.order)
        .map((a) => ({
          id: a.id,
          title: a.title,
          icon: a.icon,
          color: a.color,
          count: a.count,
          countLabel: a.countLabel,
          subtitle: a.subtitle,
          status: a.status,
          targetUrl: a.targetUrl,
          appType: a.appType,
        })),
    }));
}

function mapConfigToCatalog(config) {
  if (!config) return null;
  return config.catalogApps
    .filter((a) => a.visible)
    .map((a) => ({
      id: a.id,
      title: a.title,
      icon: a.icon,
      color: a.color,
      desc: a.description,
      targetUrl: a.targetUrl,
    }));
}

function mapConfigToNotifications(config) {
  if (!config) return null;
  return config.notifications.map((n) => ({
    id: n.id,
    title: n.title,
    desc: n.description,
    time: n.time,
    type: n.type,
    read: n.read,
  }));
}

// ── Default embedded data (used when CONFIG_URL is null) ──
const defaultAppGroups = [
  {
    name: "Human Capital Management",
    apps: [
      { id: "leave", title: "My Leave Requests", icon: "calendar", count: 16, countLabel: "Active", color: 0 },
      { id: "absences", title: "Manage Absences", icon: "calendar", color: 6 },
      { id: "manage-abs", title: "Manage Absences", icon: "person", subtitle: "Team View", color: 11 },
      { id: "directory", title: "Employee Directory", icon: "users", color: 4 },
      { id: "payslip", title: "Pay Statement", icon: "document", color: 10 },
      { id: "timesheet", title: "My Timesheet", icon: "clipboard", color: 1 },
    ],
  },
  {
    name: "Finance",
    apps: [
      { id: "purchasing", title: "My Purchasing Documents", icon: "cart", count: 15, countLabel: "Notification", color: 2 },
      { id: "sales-order", title: "Sales Order Fulfillment", icon: "chart", status: "On Track", color: 5 },
      { id: "reports", title: "Manage Process Reports", icon: "clipboard", count: 10, color: 10 },
      { id: "accounts", title: "Manage Order Accounts", icon: "money", count: 9, color: 4 },
      { id: "invoices", title: "Supplier Invoices", icon: "document", count: 3, countLabel: "New", color: 7 },
    ],
  },
  {
    name: "Analytics",
    apps: [
      { id: "dashboard", title: "Analytics Dashboard", icon: "chart", color: 8 },
      { id: "kpi", title: "KPI Overview", icon: "chart", subtitle: "Real-time Metrics", color: 2 },
      { id: "customer", title: "Customer Insights", icon: "globe", count: 1, countLabel: "New", color: 0 },
      { id: "analyze", title: "Analyze Orders", icon: "chart", count: 3, countLabel: "New", color: 6 },
    ],
  },
  {
    name: "Administration",
    apps: [
      { id: "system", title: "System Status", icon: "settings", color: 10 },
      { id: "notifications", title: "Notifications", icon: "bell", count: 3, color: 9 },
      { id: "learning", title: "Learning", icon: "document", color: 4 },
      { id: "business", title: "Business Data", icon: "globe", color: 11 },
    ],
  },
];

const defaultCatalogApps = [
  { id: "crm-appt", title: "CRM Appointments", icon: "calendar", desc: "Create sales appointments integrated with customer accounts", color: 6 },
  { id: "approve-po", title: "Approve Purchase Orders", icon: "check", desc: "Review and approve purchase orders from your team", color: 4 },
  { id: "travel-exp", title: "Travel Expenses", icon: "truck", desc: "Submit and manage travel expense reports", color: 2 },
  { id: "asset-mgmt", title: "Asset Management", icon: "settings", desc: "Track and manage company assets", color: 10 },
  { id: "quality", title: "Quality Inspections", icon: "clipboard", desc: "Perform and track quality inspection processes", color: 8 },
  { id: "warehouse", title: "Warehouse Management", icon: "cart", desc: "Manage warehouse inventory and operations", color: 1 },
];

const defaultNotifications = [
  { id: 1, title: "Leave Request Approved", desc: "Your vacation request for Mar 15-19 has been approved", time: "2 min ago", type: "success", read: false },
  { id: 2, title: "Purchase Order #4501 Pending", desc: "Awaiting your review and approval", time: "15 min ago", type: "warning", read: false },
  { id: 3, title: "Sales Order Completed", desc: "Order #8832 has been fulfilled and shipped", time: "1 hr ago", type: "info", read: false },
  { id: 4, title: "System Maintenance", desc: "Scheduled maintenance window: Sunday 2-4 AM", time: "3 hrs ago", type: "info", read: true },
  { id: 5, title: "New Employee Onboarded", desc: "Sarah Chen has joined the Engineering team", time: "5 hrs ago", type: "info", read: true },
];

// ── Detail Views ──
const LeaveRequestView = ({ onBack }) => {
  const requests = [
    { name: "Matthew Black", type: "Vacation", hours: "4.00 Hours", dates: "June 27 - June 29", status: "pending" },
    { name: "Diem Israelson", type: "Sick Leave", hours: "8.00 Hours", dates: "July 1", status: "pending" },
    { name: "Anjuy Harror", type: "Vacation", hours: "16.00 Hours", dates: "July 5 - July 7", status: "pending" },
    { name: "Dean Woker", type: "Personal", hours: "4.00 Hours", dates: "July 10", status: "pending" },
  ];
  const [selected, setSelected] = useState(0);
  const [statuses, setStatuses] = useState(requests.map(() => "pending"));

  return (
    <div style={{ animation: "fioriSlideIn 0.3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button onClick={onBack} style={{ ...btnReset, display: "flex", alignItems: "center", gap: 6, color: "var(--sapShell-InteractiveTextColor)", fontSize: 14, fontWeight: 600 }}>
          {icons.back} Back
        </button>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "var(--sapTextColor)" }}>Approve Leave Requests</h2>
        <span style={{ background: "var(--sapIndicationColor_2)", color: "#fff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
          {statuses.filter((s) => s === "pending").length}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16, minHeight: 400 }}>
        <div style={{ background: "var(--sapTile-Background)", borderRadius: 12, boxShadow: "var(--sapContent-Shadow0)", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "var(--sapContent_LabelColor)", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid var(--sapGroup_ContentBorderColor)" }}>
            Pending Requests
          </div>
          {requests.map((r, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              style={{
                padding: "14px 16px",
                cursor: "pointer",
                background: selected === i ? "var(--sapList-Active_Background)" : "transparent",
                color: selected === i ? "var(--sapShell-InteractiveTextColor)" : "var(--sapTextColor)",
                borderLeft: selected === i ? "3px solid var(--sapShell-InteractiveTextColor)" : "3px solid transparent",
                borderBottom: "1px solid var(--sapGroup_ContentBorderColor)",
                transition: "all 0.15s",
                opacity: statuses[i] !== "pending" ? 0.5 : 1,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: "var(--sapContent_LabelColor)", marginTop: 2 }}>{r.type}</div>
              {statuses[i] !== "pending" && (
                <span style={{ fontSize: 11, fontWeight: 700, color: statuses[i] === "approved" ? "var(--sapPositiveColor)" : "var(--sapNegativeColor)", textTransform: "uppercase" }}>
                  {statuses[i]}
                </span>
              )}
            </div>
          ))}
        </div>
        <div style={{ background: "var(--sapTile-Background)", borderRadius: 12, padding: 28, boxShadow: "var(--sapContent_Shadow0)" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "var(--sapTextColor)" }}>{requests[selected].name}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
            {[
              ["Leave Type", requests[selected].type],
              ["Duration", requests[selected].hours],
              ["Date Range", requests[selected].dates],
              ["Status", statuses[selected].charAt(0).toUpperCase() + statuses[selected].slice(1)],
            ].map(([label, value], i) => (
              <div key={i}>
                <div style={{ fontSize: 12, color: "var(--sapContent_LabelColor)", marginBottom: 4, fontWeight: 500 }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: i === 3 ? (statuses[selected] === "approved" ? "var(--sapPositiveColor)" : statuses[selected] === "rejected" ? "var(--sapNegativeColor)" : "var(--sapTextColor)") : "var(--sapTextColor)" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--sapContent_LabelColor)", marginBottom: 8 }}>Available Balance: <strong style={{ color: "var(--sapTextColor)" }}>44.01 hours</strong></div>
          {statuses[selected] === "pending" && (
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button
                onClick={() => { const s = [...statuses]; s[selected] = "approved"; setStatuses(s); }}
                style={{ ...btnReset, padding: "10px 28px", background: "var(--sapPositiveColor)", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", transition: "transform 0.1s", }}
                onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
                onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
              >
                {icons.check} Approve
              </button>
              <button
                onClick={() => { const s = [...statuses]; s[selected] = "rejected"; setStatuses(s); }}
                style={{ ...btnReset, padding: "10px 28px", background: "var(--sapNegativeColor)", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", transition: "transform 0.1s", }}
                onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
                onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
              >
                {icons.close} Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TimesheetView = ({ onBack }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weeks = [
    { label: "Jun 10", hours: [8, 8, 8, 8, 0] },
    { label: "Jun 17", hours: [8, 8, 8, 0, 8] },
    { label: "Jun 24", hours: [8, 0, 8, 8, 8] },
  ];
  return (
    <div style={{ animation: "fioriSlideIn 0.3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button onClick={onBack} style={{ ...btnReset, display: "flex", alignItems: "center", gap: 6, color: "var(--sapShell-InteractiveTextColor)", fontSize: 14, fontWeight: 600 }}>{icons.back} Back</button>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "var(--sapTextColor)" }}>My Timesheet</h2>
      </div>
      <div style={{ background: "var(--sapTile-Background)", borderRadius: 12, padding: 24, boxShadow: "var(--sapContent_Shadow0)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--sapTextColor)" }}>June 2024</span>
          <span style={{ fontSize: 13, color: "var(--sapContent_LabelColor)" }}>Total: 88 hours</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "80px repeat(5, 1fr)", gap: 1, background: "var(--sapGroup_ContentBorderColor)", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ background: "var(--sapList_HeaderBackground)", padding: 10 }}></div>
          {days.map((d) => (<div key={d} style={{ background: "var(--sapList_HeaderBackground)", padding: "10px 14px", fontSize: 12, fontWeight: 700, color: "var(--sapContent_LabelColor)", textAlign: "center" }}>{d}</div>))}
          {weeks.map((w, wi) => (
            <>
              <div key={`l${wi}`} style={{ background: "var(--sapTile-Background)", padding: "12px 10px", fontSize: 13, fontWeight: 600, color: "var(--sapTextColor)", display: "flex", alignItems: "center" }}>{w.label}</div>
              {w.hours.map((h, hi) => (
                <div key={`${wi}-${hi}`} style={{ background: "var(--sapTile-Background)", padding: 12, textAlign: "center" }}>
                  {h > 0 && (
                    <div style={{ background: "var(--sapShell-InteractiveTextColor)", color: "#fff", borderRadius: 6, padding: "6px 0", fontSize: 13, fontWeight: 700 }}>{h}:00</div>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

const EmployeeLookupView = ({ onBack }) => {
  const org = {
    name: "Timmy Tabasco",
    role: "Manager of Payroll",
    email: "timmy.tabasco@company.biz",
    phone: "+1-212-326-9109",
    reports: [
      { name: "Ann McArthur", role: "Payroll Specialist" },
      { name: "Matthew Black", role: "Senior Payroll Specialist" },
      { name: "Thomas Michael", role: "Analyst" },
    ],
  };
  return (
    <div style={{ animation: "fioriSlideIn 0.3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button onClick={onBack} style={{ ...btnReset, display: "flex", alignItems: "center", gap: 6, color: "var(--sapShell-InteractiveTextColor)", fontSize: 14, fontWeight: 600 }}>{icons.back} Back</button>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "var(--sapTextColor)" }}>Employee Lookup</h2>
      </div>
      <div style={{ background: "var(--sapTile-Background)", borderRadius: 12, padding: 28, boxShadow: "var(--sapContent_Shadow0)", maxWidth: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--sapShell-InteractiveTextColor)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>TT</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--sapTextColor)" }}>{org.name}</div>
            <div style={{ fontSize: 13, color: "var(--sapContent_LabelColor)" }}>{org.role}</div>
          </div>
        </div>
        <div style={{ display: "grid", gap: 8, marginBottom: 28 }}>
          <div style={{ fontSize: 13, color: "var(--sapContent_LabelColor)" }}>Email: <strong style={{ color: "var(--sapLinkColor)" }}>{org.email}</strong></div>
          <div style={{ fontSize: 13, color: "var(--sapContent_LabelColor)" }}>Mobile: <strong style={{ color: "var(--sapTextColor)" }}>{org.phone}</strong></div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--sapTextColor)", marginBottom: 14 }}>Direct Reports</div>
        <div style={{ display: "grid", gap: 8 }}>
          {org.reports.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: "var(--sapGroup_ContentBackground)", borderRadius: 8, border: "1px solid var(--sapGroup_ContentBorderColor)" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: tileColors[i + 4].bg, color: tileColors[i + 4].text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                {r.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--sapTextColor)" }}>{r.name}</div>
                <div style={{ fontSize: 12, color: "var(--sapContent_LabelColor)" }}>{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Utility ──
const btnReset = {
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  fontFamily: "inherit",
};

// ── Main Component ──
export default function SAPFioriPortal() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [meOpen, setMeOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeView, setActiveView] = useState(null);
  const [pinnedApps, setPinnedApps] = useState([]);
  const [hiddenTiles, setHiddenTiles] = useState([]);
  const [theme, setTheme] = useState("morning");
  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const meRef = useRef(null);

  // ── Config-driven state ──
  const [appGroups, setAppGroups] = useState(defaultAppGroups);
  const [catalogApps, setCatalogApps] = useState(defaultCatalogApps);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [tileColors, setTileColors] = useState(defaultTileColors);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [configError, setConfigError] = useState(null);

  // Load config on mount
  useEffect(() => {
    loadPortalConfig()
      .then((config) => {
        if (config) {
          const groups = mapConfigToAppGroups(config);
          if (groups) setAppGroups(groups);
          const catalog = mapConfigToCatalog(config);
          if (catalog) setCatalogApps(catalog);
          const notifs = mapConfigToNotifications(config);
          if (notifs) setNotifications(notifs);
          if (config.tileColors) {
            setTileColors(config.tileColors.map((c) => ({ bg: c.bg, text: c.text })));
          }
          if (config.portal?.defaultTheme) {
            setTheme(config.portal.defaultTheme);
          }
        }
        setConfigLoaded(true);
      })
      .catch((err) => {
        console.warn("Config load failed, using defaults:", err);
        setConfigError(err.message);
        setConfigLoaded(true);
      });
  }, []);
  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const meRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close popups on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (meRef.current && !meRef.current.contains(e.target)) setMeOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const filteredApps = searchQuery
    ? appGroups.flatMap((g) => g.apps).filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleAppClick = (appId) => {
    if (editMode) return;
    if (appId === "leave" || appId === "absences" || appId === "manage-abs") setActiveView("leave");
    else if (appId === "timesheet") setActiveView("timesheet");
    else if (appId === "directory") setActiveView("employee");
    else setActiveView(null);
  };

  const themeVars =
    theme === "morning"
      ? {
          "--sapBackgroundColor": "#f5f6f7",
          "--sapShell-Background": "#ffffff",
          "--sapShell-BorderColor": "#e5e5e5",
          "--sapShell-TextColor": "#1d2d3e",
          "--sapShell-InteractiveTextColor": "#0070f2",
          "--sapTextColor": "#1d2d3e",
          "--sapContent_LabelColor": "#556b82",
          "--sapTile-Background": "#ffffff",
          "--sapContent_Shadow0": "0 0 0 1px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)",
          "--sapGroup-TitleTextColor": "#1d2d3e",
          "--sapGroup_ContentBackground": "#f5f6f7",
          "--sapGroup_ContentBorderColor": "#e5e5e5",
          "--sapList-Active_Background": "#e8f4ff",
          "--sapList_HeaderBackground": "#f0f1f2",
          "--sapPositiveColor": "#188918",
          "--sapNegativeColor": "#cc1919",
          "--sapCriticalColor": "#c35500",
          "--sapInformativeColor": "#0070f2",
          "--sapIndicationColor_2": "#cc1919",
          "--sapLinkColor": "#0064d9",
          "--sapButton-Background": "#ffffff",
          "--sapButton-BorderColor": "#bcc3ca",
        }
      : {
          "--sapBackgroundColor": "#12171c",
          "--sapShell-Background": "#1c2228",
          "--sapShell-BorderColor": "#2c3640",
          "--sapShell-TextColor": "#d1dae4",
          "--sapShell-InteractiveTextColor": "#4db1ff",
          "--sapTextColor": "#d1dae4",
          "--sapContent_LabelColor": "#8696a9",
          "--sapTile-Background": "#1c2228",
          "--sapContent_Shadow0": "0 0 0 1px rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.3)",
          "--sapGroup-TitleTextColor": "#d1dae4",
          "--sapGroup_ContentBackground": "#12171c",
          "--sapGroup_ContentBorderColor": "#2c3640",
          "--sapList-Active_Background": "#1a3050",
          "--sapList_HeaderBackground": "#232a32",
          "--sapPositiveColor": "#36a936",
          "--sapNegativeColor": "#ff5c77",
          "--sapCriticalColor": "#e87400",
          "--sapInformativeColor": "#4db1ff",
          "--sapIndicationColor_2": "#ff5c77",
          "--sapLinkColor": "#4db1ff",
          "--sapButton-Background": "#232a32",
          "--sapButton-BorderColor": "#3c4a58",
        };

  return (
    <div style={{ ...themeVars, fontFamily: "'72', '72full', Arial, Helvetica, sans-serif", background: "var(--sapBackgroundColor)", minHeight: "100vh", color: "var(--sapTextColor)", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root { font-family: 'Source Sans 3', 'Segoe UI', Arial, sans-serif; }
        @keyframes fioriSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fioriFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fioriScaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes fioriBadgePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        .fiori-tile { transition: transform 0.15s ease, box-shadow 0.15s ease; cursor: pointer; }
        .fiori-tile:hover { transform: translateY(-3px); box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important; }
        .fiori-tile:active { transform: scale(0.98); }
        @keyframes fioriWiggle { 0%,100% { transform: rotate(-0.5deg); } 50% { transform: rotate(0.5deg); } }
        .fiori-tile-editing { animation: fioriWiggle 0.3s ease-in-out infinite; }
        .fiori-tile-editing:hover { transform: none !important; box-shadow: 0 0 0 2px var(--sapShell-InteractiveTextColor) !important; }
        .fiori-shell-btn { transition: background 0.15s; border-radius: 8px; padding: 8px; }
        .fiori-shell-btn:hover { background: ${theme === "morning" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)"}; }
        .fiori-catalog-item { transition: background 0.15s; }
        .fiori-catalog-item:hover { background: ${theme === "morning" ? "#f0f4f8" : "#232a32"} !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${theme === "morning" ? "#c4c6c8" : "#3c4a58"}; border-radius: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      {/* ═══ Shell Bar ═══ */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "var(--sapShell-Background)",
          borderBottom: "1px solid var(--sapShell-BorderColor)",
          padding: "0 24px",
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src="data:image/jpeg;base64,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AREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBF1mkZFG6SRwa1oySVaKfU1onqjTsqMPzjJGAferlFvsiyVkYvUmXleFfTtq6OWme4tbI3lJHVe4IIBByCit7F76mBUWiJ6e7slE2Kdm+x6rPQMADyRYRxN1VV2IU9PbiwTyHLi5ucDwUheZkzUe7IjVOFXKfZGbotS0WvbtGyOSpfG7cc/o4B88LaVsqm1tBDVM+bKwOHvCX4tlD1NFuJn05aflPsVCIijk0Lwr5201HLM4gBrSdyrZedTWm1P7upqAH+Q3wsduN4k1I80VF6FMCO8eT1GegUTJzK6INt9TJCtyZ4VD3CjiujC4umkbIfUCQs9opWz0scrSCHNBVgdRx/IfkHLlgaWg4+aMbK22G41dlqBQVjHyUucRygZPq2Wj4ZxCMLHGb+YkWw510M3RU9PW004HdStd6sqoXTJp9URGtBERVKBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREBYdetqX6dmFM17nZGQ3rjO609SukFV6GXudI0Fodk9fsW/nAOBDgCD1BVGy025k/ftpIhJ5hoU/FzfIg48u9mp4hwv+ssjPm1oWNsrbXAJch/IOpVag2GAigt7ezaxWloLXnGPT1XX01NdKCIySUpJkaDuW48B49VsNcOaHNLXAEEYIKyU2ypmpx7oxZFEb63XLsyNMTKq4Sw0FJC9z5H4Y3xx4k+pSI09SPoLJSUk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bGPD3qVVwf6kefEJS9TKmVkTYX1MVREJIzlsR6k+at0txqm1PNVz97JIC93qHgAqGO5xBgdGfzhONhsqy36fvGpapjaOklmlccAhuMBS4YFdPVmCMrb3pLZR1FbHJuM5zsr3pPSN41PVtZR0ruUbl4yQFtfQXA+CMR1moXgyAhwhb+1bmtFpt9ppW01BSxwRtHRoVtmdGvpUbbH4K5Pmtf8ABrvQ3CG0Wl7Ky5sFTUADDT81pWzoIYoIhFDG2Njdg1owAu6LWWWSse5M39VMKo8sFot2pLiLXZ56w/Qace3wWq7TrK+Vl8o4RO54mlHMxrRgNJGfgtvV9JDW0r6aoYHRvGCCrPp/Slrs0r5YI+d7jkFw+b7FmpshCDUltkfIotsnFxlpIvzfmjPkuURRiYEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQFNcaCjuNM6mraeOeJwwWvGQVq/V3BOyXEPltMhoZCc8g+Z8MLbKLNTkW0PdctGG7HquWrI7Iga24VarsMj5Y4XVcXQOjGdvYsDnhulK7kqaSSJw2Ae0hT7IBGD0KsV80hp28xvbX2unkLhu7kHMPet7j+Iro/8q2aHI8NY83ut6IPfKZenTHXC8aieUgdSPWpT3vgNpeqjd8gfNSyHxLsj7lhF77Pt0j/AMgr452Dwdt95W1q4/jz+boae3w3kV/J1NCSzOycku9SpZHuOCQcfatr3jglq+lBdHStlH6LwsXr+G+q6Zx722VWPqtjLvuU2PE8eXaSIz4TkwfWDMLMnM0hwBHrVBU0dM/JLWsPmFltXozUkOXPtNW1vh+ad+CtU+n7w072ycf+mQqyyKJ/7Iujj5EO6Zi9RQFp5oJOb1FU0bZWyZweYeXRZRNp+7829DN74yujNMXyTPd26qOfqxO2+xRZTqX+xMjG19HEs0NTLH6w3ce1epuFXLKHSyulx4u8lk9Dw41fWgfJ7PU7+LoyMqvPCLXQbk2idoHqysDyaI+qMyxLZdomIQVmG/MBdnr5qrgfLKQ5sZGPHnCrLpoLVVuBdLaKs+oRO2+xWaWgudN/C0k8Dh4lpCyxzIy6JmCzDsj3iXYVsnydjQ55w75pPQq5Wq80EVfSyXWgZV0kb8zREfOHksQfUysfh/MHetdhWZGCXYVW1IjOmSMrvlfaqitmqLTb20MMkvowNPohmPvyusE4laTyNY0HoPFYwypYTuvVlXysDWu2CvhGKRinVJmTCTAy04969oJRI0h1QIQ0bB2+fgsZZWFwAyPeV6Nq8ZG2Par5JNGLypIym3zvdKYhVsZI75nonBPmVtrROq7TZ4+W63GqqHsAApmvHdO+z9q0PS3Huo3t9FzXjBBC4fcMgD0OVvRpWpy8Dz/Ul49s6n0Ru3ixrXS2oq2B9PSd1JFHllT9Jx+r7FrGouTXECGR7+bcgnGFib65rnAOdnl6epdo6onYZd7kx8KNK7mS6Vlr3ovM1VI4n0d89SVc7VdrtbqqOqoK59JPy8vOw+CxqBldUACGCYnOwDCcrI7TpLVdy5RBZ6lxd0JjI+1ZbZUpfEykMe6fZHc19TLPJNUVD5pHuy5xPUrzdVPc88vMR7VsHTHAzW1ye11cIqGI+L3Bx+AK2Vprs92imcJLzXyVTvqxegP2qC87Hq7dSbXwfIs+boR1hp6+sdy01NJMSdgG5KzbSXCbVuoHskfTvpaY/Tk8Pd1UotO6I01YWMFvtsTXsGBI5oLvisjAAGAMAKJdxacukFo2lHA6odZvZqDRXA2x2polvDxXy5zyY9Ae5bTtdqt9rpxBQUkVPGOgYMKsRayds7HuTNvXTCpagtBcSODGF7ugGSuV0mZ3kTmZxzDCxmU1JqvirUU91kpLVHGWRjDnPaTvnqsz4daml1Fb3vnhDJYncriDs71gLUGrdK3W3X94ZSSzc+eV7Iy4O38cLZ3CCxVdrtUlTWs7uWoOeXpgezwW3yqcaOOpQfxGgwr8yeXKNi+EzxERag34REQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAXDmhww4A+1cogPKSlp5Bh8Ebva0KmfZrS85fbaRx9cTVXIq7ZTSLebHZicm1UX9i38F3jtFrj/g7dSt9kQCrUTbGkeccEMYwyJjR5AYXoiKhU8pqanmGJYI3j9JoKsl40Zpm6xllZZ6RwPiImg/csgRVUmuxRpM1JfOAGhLkS9tLLBJ4Fr+ixOs7LlheXGnvM8efAtJ/apDos0cq2PaTMTx6pd4kYqvsrw4Jp74c+HNH/erTP2W7u157q6RPHmSB+1SzRZlxDIX+xilg0S7xIks7L99Dt6+DH8ofivdnZfuvjc2N/pf3qV6KvtLI/cW+zsf9pFum7L9U3AlvAx4//Mq8UfZhtmQaq7Su8wAcfepGIrZZ+RLvIujgUR7RNHWzs1aLpiDUS1M+P0yFlVs4K6CocctrMhH13ZWx0WGWRbLvJmeNNceyLDQaO0xRNaKey0TeXoTC0n7leYKangaGwwRxgdA1oC9UWJtvuXpJdgiIqFQiIgKa51PyOgmqeUu7thdjzwFri2cUX118goGUPKHyBhIOepxnotmzxMmidFIMseCCPMKxWvR9httwNdTUbRMd8ncBZq5VqL5l1I10LpSjyPS9TIAcgFERYSScFoPUArlEQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf/2Q==" alt="GNDLF AIOps for SAP" style={{ height: 36, objectFit: "contain" }} />
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 480, margin: "0 32px", position: "relative" }}>
          {searchOpen ? (
            <div style={{ position: "relative", animation: "fioriFadeIn 0.2s" }}>
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                placeholder="Search apps, transactions, help..."
                style={{
                  width: "100%",
                  padding: "8px 40px 8px 36px",
                  borderRadius: 8,
                  border: `2px solid var(--sapShell-InteractiveTextColor)`,
                  background: "var(--sapTile-Background)",
                  fontSize: 14,
                  color: "var(--sapTextColor)",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--sapContent_LabelColor)", display: "flex" }}>{icons.search}</span>
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} style={{ ...btnReset, position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--sapContent_LabelColor)", display: "flex" }}>
                  {icons.close}
                </button>
              )}
              {searchQuery && filteredApps.length > 0 && (
                <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "var(--sapTile-Background)", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", border: "1px solid var(--sapShell-BorderColor)", zIndex: 200, maxHeight: 320, overflow: "auto", animation: "fioriScaleIn 0.15s" }}>
                  {filteredApps.map((app) => (
                    <div
                      key={app.id}
                      className="fiori-catalog-item"
                      onClick={() => { handleAppClick(app.id); setSearchQuery(""); setSearchOpen(false); }}
                      style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", borderBottom: "1px solid var(--sapGroup_ContentBorderColor)" }}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: tileColors[app.color].bg, color: tileColors[app.color].text, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {icons[app.icon]}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{app.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                ...btnReset,
                width: "100%",
                padding: "8px 16px 8px 36px",
                borderRadius: 8,
                border: `1px solid var(--sapShell-BorderColor)`,
                background: theme === "morning" ? "#f5f6f7" : "#232a32",
                fontSize: 14,
                color: "var(--sapContent_LabelColor)",
                textAlign: "left",
                position: "relative",
                cursor: "text",
                fontFamily: "inherit",
              }}
            >
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", display: "flex" }}>{icons.search}</span>
              Search
            </button>
          )}
        </div>

        {/* Shell Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Notifications */}
          <div ref={notifRef} style={{ position: "relative" }}>
            <button className="fiori-shell-btn" onClick={() => { setNotifOpen(!notifOpen); setMeOpen(false); }} style={{ ...btnReset, color: "var(--sapShell-TextColor)", display: "flex", alignItems: "center", position: "relative" }}>
              {icons.bell}
              {unreadCount > 0 && (
                <span style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, background: "var(--sapNegativeColor)", color: "#fff", borderRadius: "50%", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", animation: "fioriBadgePulse 2s infinite" }}>
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 380, background: "var(--sapTile-Background)", borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,0.18)", border: "1px solid var(--sapShell-BorderColor)", zIndex: 300, animation: "fioriScaleIn 0.15s", overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--sapGroup_ContentBorderColor)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>Notifications</span>
                  <button
                    onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
                    style={{ ...btnReset, fontSize: 12, color: "var(--sapShell-InteractiveTextColor)", fontWeight: 600, cursor: "pointer" }}
                  >
                    Mark all read
                  </button>
                </div>
                <div style={{ maxHeight: 360, overflow: "auto" }}>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => setNotifications(notifications.map((nn) => (nn.id === n.id ? { ...nn, read: true } : nn)))}
                      style={{
                        padding: "14px 20px",
                        borderBottom: "1px solid var(--sapGroup_ContentBorderColor)",
                        cursor: "pointer",
                        background: n.read ? "transparent" : (theme === "morning" ? "#f0f7ff" : "#1a2a3a"),
                        display: "flex",
                        gap: 12,
                        transition: "background 0.15s",
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          marginTop: 6,
                          flexShrink: 0,
                          background: n.type === "success" ? "var(--sapPositiveColor)" : n.type === "warning" ? "var(--sapCriticalColor)" : "var(--sapInformativeColor)",
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: n.read ? 400 : 600, marginBottom: 3 }}>{n.title}</div>
                        <div style={{ fontSize: 12, color: "var(--sapContent_LabelColor)", lineHeight: 1.4 }}>{n.desc}</div>
                        <div style={{ fontSize: 11, color: "var(--sapContent_LabelColor)", marginTop: 6 }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Me Area */}
          <div ref={meRef} style={{ position: "relative" }}>
            <button className="fiori-shell-btn" onClick={() => { setMeOpen(!meOpen); setNotifOpen(false); }} style={{ ...btnReset, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #0070f2, #0050b3)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                AJ
              </div>
            </button>
            {meOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 280, background: "var(--sapTile-Background)", borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,0.18)", border: "1px solid var(--sapShell-BorderColor)", zIndex: 300, animation: "fioriScaleIn 0.15s", overflow: "hidden" }}>
                <div style={{ padding: 20, borderBottom: "1px solid var(--sapGroup_ContentBorderColor)", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #0070f2, #0050b3)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>AJ</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>Alex Johnson</div>
                    <div style={{ fontSize: 12, color: "var(--sapContent_LabelColor)" }}>alex.johnson@company.com</div>
                  </div>
                </div>
                <div style={{ padding: 8 }}>
                  {["Settings", "App Finder"].map((label) => (
                    <button key={label} onClick={() => { if (label === "App Finder") { setCatalogOpen(true); setMeOpen(false); } }} style={{ ...btnReset, width: "100%", padding: "10px 14px", textAlign: "left", fontSize: 14, color: "var(--sapTextColor)", borderRadius: 8, cursor: "pointer", display: "block", fontFamily: "inherit" }}
                      onMouseEnter={(e) => (e.target.style.background = theme === "morning" ? "#f0f4f8" : "#232a32")}
                      onMouseLeave={(e) => (e.target.style.background = "transparent")}
                    >
                      {label}
                    </button>
                  ))}
                  <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 14 }}>Theme</span>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[["morning", "☀️"], ["evening", "🌙"]].map(([t, emoji]) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          style={{
                            ...btnReset,
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 14,
                            background: theme === t ? "var(--sapShell-InteractiveTextColor)" : "var(--sapGroup_ContentBackground)",
                            color: theme === t ? "#fff" : "var(--sapTextColor)",
                            border: `1px solid ${theme === t ? "var(--sapShell-InteractiveTextColor)" : "var(--sapGroup_ContentBorderColor)"}`,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid var(--sapGroup_ContentBorderColor)", marginTop: 4, paddingTop: 4 }}>
                    <button style={{ ...btnReset, width: "100%", padding: "10px 14px", textAlign: "left", fontSize: 14, color: "var(--sapNegativeColor)", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
                      onMouseEnter={(e) => (e.target.style.background = theme === "morning" ? "#fff0f0" : "#2a1a1a")}
                      onMouseLeave={(e) => (e.target.style.background = "transparent")}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ═══ Content Area ═══ */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 48px" }}>
        {activeView === "leave" ? (
          <LeaveRequestView onBack={() => setActiveView(null)} />
        ) : activeView === "timesheet" ? (
          <TimesheetView onBack={() => setActiveView(null)} />
        ) : activeView === "employee" ? (
          <EmployeeLookupView onBack={() => setActiveView(null)} />
        ) : (
          <>
            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => setEditMode(!editMode)} style={{ ...btnReset, padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: editMode ? "var(--sapShell-InteractiveTextColor)" : "var(--sapButton-Background)", color: editMode ? "#fff" : "var(--sapTextColor)", border: `1px solid ${editMode ? "var(--sapShell-InteractiveTextColor)" : "var(--sapButton-BorderColor)"}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", transition: "all 0.15s" }}>
                  {icons.edit}
                  {editMode ? "Done" : "Edit"}
                </button>
                {hiddenTiles.length > 0 && (
                  <button onClick={() => setHiddenTiles([])} style={{ ...btnReset, padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "var(--sapButton-Background)", color: "var(--sapCriticalColor)", border: "1px solid var(--sapButton-BorderColor)", cursor: "pointer", fontFamily: "inherit" }}>
                    Restore ({hiddenTiles.length})
                  </button>
                )}
                <button onClick={() => setCatalogOpen(true)} style={{ ...btnReset, padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "var(--sapButton-Background)", color: "var(--sapTextColor)", border: "1px solid var(--sapButton-BorderColor)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
                  {icons.grid}
                  App Finder
                </button>
              </div>
              <span style={{ fontSize: 12, color: "var(--sapContent_LabelColor)" }}>
                {appGroups.reduce((sum, g) => sum + g.apps.length, 0) + pinnedApps.length} apps · {appGroups.length} groups
                {configError && <span style={{ color: "var(--sapCriticalColor)", marginLeft: 8 }} title={configError}>⚠ config fallback</span>}
                {configLoaded && !configError && CONFIG_URL && <span style={{ color: "var(--sapPositiveColor)", marginLeft: 8 }}>● config loaded</span>}
              </span>
            </div>

            {/* Pinned from Catalog */}
            {pinnedApps.length > 0 && (
              <div style={{ marginBottom: 28, animation: "fioriSlideIn 0.3s" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--sapGroup-TitleTextColor)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  {icons.pin}
                  <span>Pinned Apps</span>
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(156px, 1fr))", gap: 12 }}>
                  {pinnedApps.map((app) => (
                    <TileCard key={app.id} app={app} onClick={() => handleAppClick(app.id)} editMode={editMode} onRemove={() => setPinnedApps(pinnedApps.filter((a) => a.id !== app.id))} />
                  ))}
                </div>
              </div>
            )}

            {/* Tile Groups */}
            {appGroups.map((group, gi) => {
              const visibleApps = group.apps.filter((a) => !hiddenTiles.includes(a.id));
              if (visibleApps.length === 0) return null;
              return (
              <div key={gi} style={{ marginBottom: 28, animation: `fioriSlideIn 0.3s ease ${gi * 0.06}s both` }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--sapGroup-TitleTextColor)", marginBottom: 12 }}>{group.name}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(156px, 1fr))", gap: 12 }}>
                  {visibleApps.map((app) => (
                    <TileCard key={app.id} app={app} onClick={() => handleAppClick(app.id)} editMode={editMode} onRemove={editMode ? () => setHiddenTiles([...hiddenTiles, app.id]) : undefined} />
                  ))}
                </div>
              </div>
              );
            })}
          </>
        )}
      </main>

      {/* ═══ App Catalog Modal ═══ */}
      {catalogOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", animation: "fioriFadeIn 0.2s" }}
          onClick={(e) => { if (e.target === e.currentTarget) setCatalogOpen(false); }}
        >
          <div style={{ background: "var(--sapTile-Background)", borderRadius: 16, width: "90%", maxWidth: 640, maxHeight: "80vh", display: "flex", flexDirection: "column", animation: "fioriScaleIn 0.2s", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--sapGroup_ContentBorderColor)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>App Finder</h2>
              <button onClick={() => setCatalogOpen(false)} style={{ ...btnReset, color: "var(--sapContent_LabelColor)", cursor: "pointer", display: "flex" }}>{icons.close}</button>
            </div>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--sapGroup_ContentBorderColor)" }}>
              <input placeholder="Search catalog..." style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--sapButton-BorderColor)", background: "var(--sapGroup_ContentBackground)", fontSize: 14, color: "var(--sapTextColor)", outline: "none", fontFamily: "inherit" }} />
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
              {catalogApps.map((app) => {
                const isPinned = pinnedApps.some((a) => a.id === app.id);
                return (
                  <div key={app.id} className="fiori-catalog-item" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 12px", borderRadius: 10, marginBottom: 4, cursor: "pointer" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: tileColors[app.color].bg, color: tileColors[app.color].text, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {icons[app.icon]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{app.title}</div>
                      <div style={{ fontSize: 12, color: "var(--sapContent_LabelColor)", lineHeight: 1.4 }}>{app.desc}</div>
                    </div>
                    <button
                      onClick={() => {
                        if (isPinned) setPinnedApps(pinnedApps.filter((a) => a.id !== app.id));
                        else setPinnedApps([...pinnedApps, app]);
                      }}
                      style={{
                        ...btnReset,
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        border: `1px solid ${isPinned ? "var(--sapPositiveColor)" : "var(--sapShell-InteractiveTextColor)"}`,
                        background: isPinned ? (theme === "morning" ? "#e8f5e0" : "#1a2e1a") : "transparent",
                        color: isPinned ? "var(--sapPositiveColor)" : "var(--sapShell-InteractiveTextColor)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontFamily: "inherit",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isPinned ? <>{icons.check} Pinned</> : <>{icons.pin} Pin</>}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ Footer ═══ */}
      <footer style={{ textAlign: "center", padding: "16px 24px 24px", fontSize: 12, color: "var(--sapContent_LabelColor)" }}>
        GNDLF AIOps for SAP · Fiori Launchpad · URL: /ui2/flp · Horizon Theme · © 2024 GNDLF
      </footer>
    </div>
  );
}

// ── Tile Component ──
function TileCard({ app, onClick, editMode, onRemove }) {
  const color = tileColors[app.color];
  return (
    <div
      className={`fiori-tile${editMode ? " fiori-tile-editing" : ""}`}
      onClick={editMode ? undefined : onClick}
      style={{
        background: "var(--sapTile-Background)",
        borderRadius: 12,
        padding: 16,
        position: "relative",
        boxShadow: "var(--sapContent_Shadow0)",
        minHeight: 130,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        cursor: editMode ? "default" : "pointer",
      }}
    >
      {editMode && onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{ ...btnReset, position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: "50%", background: "var(--sapNegativeColor)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
        </button>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: color.bg, color: color.text, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icons[app.icon]}
        </div>
        {app.count !== undefined && (
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--sapShell-InteractiveTextColor)", lineHeight: 1 }}>{app.count}</div>
        )}
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sapTextColor)", lineHeight: 1.3 }}>{app.title}</div>
        {app.countLabel && <div style={{ fontSize: 11, color: "var(--sapContent_LabelColor)", marginTop: 2 }}>{app.countLabel}</div>}
        {app.subtitle && <div style={{ fontSize: 11, color: "var(--sapContent_LabelColor)", marginTop: 2 }}>{app.subtitle}</div>}
        {app.status && (
          <div style={{ fontSize: 11, color: "var(--sapPositiveColor)", marginTop: 4, display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--sapPositiveColor)" }} />
            {app.status}
          </div>
        )}
      </div>
    </div>
  );
}
