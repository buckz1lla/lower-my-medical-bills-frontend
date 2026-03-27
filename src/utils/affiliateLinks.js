const fallbackLinks = {
  plans: 'https://www.healthcare.gov/see-plans/',
  rights: 'https://www.cms.gov/nosurprises',
  appealsGuide: 'https://www.cms.gov/cciio/resources/files/appeals_brochure.pdf',
  coverageOptions: 'https://www.healthcare.gov/',
};

const withUtm = (url, source) => {
  if (!url) {
    return '';
  }

  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=lmmb&utm_medium=referral&utm_campaign=${source}`;
};

const configuredLinks = {
  plans: process.env.REACT_APP_AFFILIATE_PLANS_URL || '',
  rights: process.env.REACT_APP_AFFILIATE_RIGHTS_URL || '',
  appealsGuide: process.env.REACT_APP_AFFILIATE_APPEALS_GUIDE_URL || '',
  coverageOptions: process.env.REACT_APP_AFFILIATE_COVERAGE_URL || '',
};

export const getAffiliateLink = (key, source = 'results') => {
  const configured = (configuredLinks[key] || '').trim();
  if (configured) {
    return {
      url: withUtm(configured, source),
      isAffiliate: true,
    };
  }

  const fallback = fallbackLinks[key] || '';
  return {
    url: withUtm(fallback, source),
    isAffiliate: false,
  };
};
