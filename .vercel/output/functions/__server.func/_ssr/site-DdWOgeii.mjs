//#region node_modules/.nitro/vite/services/ssr/assets/site-DdWOgeii.js
var SYMBOL = {
	USD: "$",
	INR: "₹",
	EUR: "€",
	GBP: "£"
};
function currencySymbol(currency = "INR") {
	return SYMBOL[currency.toUpperCase()] ?? currency.toUpperCase() + " ";
}
function formatPriceShort(cents, currency = "INR") {
	const v = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
	const withCommas = currency === "INR" ? Number(v).toLocaleString("en-IN", {
		maximumFractionDigits: 2,
		minimumFractionDigits: cents % 100 === 0 ? 0 : 2
	}) : v;
	return `${currencySymbol(currency)}${withCommas}`;
}
function generateRefCode() {
	return `HC-TX-${Date.now().toString(36).toUpperCase().slice(-6)}${Math.random().toString(36).toUpperCase().slice(2, 6)}`;
}
var SITE = {
	name: "HOLYCULT",
	tagline: "Heavyweight uniform for the congregation.",
	email: "hello@holycult.shop",
	city: "Mumbai",
	studio: "Bandra West, Mumbai 400050, India",
	social: [{
		label: "Instagram",
		href: "https://instagram.com"
	}, {
		label: "TikTok",
		href: "https://tiktok.com"
	}]
};
var PRIMARY_NAV = [
	{
		to: "/drop",
		label: "DROP"
	},
	{
		to: "/lookbook",
		label: "LOOKBOOK"
	},
	{
		to: "/archive",
		label: "ARCHIVE"
	},
	{
		to: "/journal",
		label: "JOURNAL"
	},
	{
		to: "/about",
		label: "ABOUT"
	},
	{
		to: "/contact",
		label: "CONTACT"
	}
];
var ACCOUNT_NAV = [
	{
		to: "/account",
		label: "PROFILE"
	},
	{
		to: "/account/addresses",
		label: "ADDRESSES"
	},
	{
		to: "/account/orders",
		label: "ORDERS"
	}
];
var FOOTER_COLUMNS = [
	{
		title: "SHOP",
		links: [
			{
				to: "/drop",
				label: "Current Drop"
			},
			{
				to: "/lookbook",
				label: "Lookbook"
			},
			{
				to: "/archive",
				label: "Archive"
			},
			{
				to: "/cart",
				label: "Cart"
			}
		]
	},
	{
		title: "ACCOUNT",
		links: [
			{
				to: "/account",
				label: "Profile"
			},
			{
				to: "/account/orders",
				label: "Orders"
			},
			{
				to: "/account/addresses",
				label: "Addresses"
			},
			{
				to: "/auth",
				label: "Sign In"
			}
		]
	},
	{
		title: "HELP",
		links: [
			{
				to: "/size-guide",
				label: "Size Guide"
			},
			{
				to: "/shipping-returns",
				label: "Shipping & Returns"
			},
			{
				to: "/faq",
				label: "FAQ"
			},
			{
				to: "/contact",
				label: "Contact"
			}
		]
	},
	{
		title: "CULT",
		links: [{
			to: "/about",
			label: "About"
		}, {
			to: "/journal",
			label: "Journal"
		}]
	}
];
var SHIPPING_FLAT_CENTS = 9900;
//#endregion
export { SITE as a, SHIPPING_FLAT_CENTS as i, FOOTER_COLUMNS as n, formatPriceShort as o, PRIMARY_NAV as r, generateRefCode as s, ACCOUNT_NAV as t };
