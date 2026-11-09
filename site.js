"use strict";
(() => {
  const config = window.ZYNQO_LEGAL || {};
  const email = String(config.supportEmail || "").trim();
  const validEmail = config.supportEmailVerified === true &&
    /^[^\s@<>\[\]]+@[^\s@<>\[\]]+\.[^\s@<>\[\]]+$/.test(email) &&
    !/(?:@|\.)example\.(?:com|org|net)$|\.invalid$/i.test(email);
  document.querySelectorAll('[data-support]').forEach(node => {
    node.textContent = validEmail ? email : '[VERIFIED_SUPPORT_EMAIL — not configured]';
  });
  document.querySelectorAll('[data-address]').forEach(node => {
    node.textContent = config.businessAddress || '[BUSINESS_CONTACT_ADDRESS]';
  });
  const date = String(config.effectiveDate || '');
  const readyDate = /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date));
  document.querySelectorAll('[data-date]').forEach(node => {
    node.textContent = readyDate ? date : '[EFFECTIVE_DATE — to be confirmed]';
  });
  document.querySelectorAll('[data-email-link]').forEach(link => {
    if (!validEmail) return;
    const deletion = link.dataset.emailLink === 'deletion';
    const subject = deletion ? 'Zynqo account deletion request' : 'Zynqo privacy / support request';
    const body = deletion ? 'Please delete my Zynqo account and associated data.\n\nAccount email: [enter your account email]\nUsername (if known): [enter username]\n\nPlease tell me how to verify account ownership safely. I have not included any password or verification code.' : '';
    link.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}${body ? '&body=' + encodeURIComponent(body) : ''}`;
    link.hidden = false;
  });
  document.querySelectorAll('[data-channel-unavailable]').forEach(node => { node.hidden = validEmail; });
  const approved = config.publicationApproved === true && validEmail && readyDate &&
    config.businessAddress && !String(config.businessAddress).includes('[');
  document.querySelectorAll('[data-draft]').forEach(node => { node.hidden = approved; });
})();
