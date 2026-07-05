import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQuery, o as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as Plus, r as Trash2, s as Save } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { c as adminListSizeCharts, f as adminUpsertSizeChart, i as adminDeleteSizeChart } from "./admin.functions-YJqvsvCJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.size-charts-CqFaoYEg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function emptyDraft() {
	return {
		kind: "",
		title: "",
		unit: "cm",
		headers: [
			"SIZE",
			"CHEST",
			"LENGTH",
			"SLEEVE"
		],
		rows: [
			[
				"S",
				"",
				"",
				""
			],
			[
				"M",
				"",
				"",
				""
			],
			[
				"L",
				"",
				"",
				""
			]
		],
		note: ""
	};
}
function SizeChartsAdmin() {
	const qc = useQueryClient();
	const listFn = useServerFn(adminListSizeCharts);
	const upsertFn = useServerFn(adminUpsertSizeChart);
	const deleteFn = useServerFn(adminDeleteSizeChart);
	const { data: charts = [] } = useQuery({
		queryKey: ["admin", "size-charts"],
		queryFn: () => listFn()
	});
	const [draft, setDraft] = (0, import_react.useState)(emptyDraft());
	function loadFor(id) {
		if (id === "new") return setDraft(emptyDraft());
		const c = charts.find((x) => x.id === id);
		if (!c) return;
		setDraft({
			id: c.id,
			kind: c.kind,
			title: c.title,
			unit: c.unit,
			headers: c.headers ?? [],
			rows: c.rows ?? [],
			note: c.note ?? ""
		});
	}
	(0, import_react.useEffect)(() => {
		if (!draft.id && charts.length && !draft.kind) loadFor(charts[0].id);
	}, [charts.length]);
	const save = useMutation({
		mutationFn: () => upsertFn({ data: {
			id: draft.id,
			kind: draft.kind.toLowerCase().trim(),
			title: draft.title,
			unit: draft.unit,
			headers: draft.headers.map((h) => h.trim()).filter(Boolean),
			rows: draft.rows.map((r) => r.map((c) => c.trim())),
			note: draft.note?.trim() ? draft.note.trim() : null
		} }),
		onSuccess: () => {
			toast.success("SAVED");
			qc.invalidateQueries({ queryKey: ["admin", "size-charts"] });
			qc.invalidateQueries({ queryKey: ["size-charts"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (id) => deleteFn({ data: { id } }),
		onSuccess: () => {
			toast.success("DELETED");
			setDraft(emptyDraft());
			qc.invalidateQueries({ queryKey: ["admin", "size-charts"] });
			qc.invalidateQueries({ queryKey: ["size-charts"] });
		},
		onError: (e) => toast.error(e.message)
	});
	function setHeader(i, v) {
		setDraft((d) => ({
			...d,
			headers: d.headers.map((h, idx) => idx === i ? v : h)
		}));
	}
	function setCell(r, c, v) {
		setDraft((d) => ({
			...d,
			rows: d.rows.map((row, ri) => ri === r ? row.map((cell, ci) => ci === c ? v : cell) : row)
		}));
	}
	function addColumn() {
		setDraft((d) => ({
			...d,
			headers: [...d.headers, ""],
			rows: d.rows.map((r) => [...r, ""])
		}));
	}
	function removeColumn(i) {
		setDraft((d) => ({
			...d,
			headers: d.headers.filter((_, idx) => idx !== i),
			rows: d.rows.map((r) => r.filter((_, idx) => idx !== i))
		}));
	}
	function addRow() {
		setDraft((d) => ({
			...d,
			rows: [...d.rows, d.headers.map(() => "")]
		}));
	}
	function removeRow(i) {
		setDraft((d) => ({
			...d,
			rows: d.rows.filter((_, idx) => idx !== i)
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 max-w-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-4 flex-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-num mb-2",
					children: "/ CMS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display-md",
					children: "SIZE CHARTS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-hc-muted meta mt-2 max-w-prose",
					children: [
						"Charts are matched to products by ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono",
							children: "kind"
						}),
						". Use",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono",
							children: "tops"
						}),
						" or ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono",
							children: "bottoms"
						}),
						" — categories containing pants / cargo / shorts / bottom / jean auto-route to bottoms."
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => loadFor("new"),
				className: "cta cta-outline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					size: 14,
					className: "mr-1"
				}), " NEW CHART"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "border border-hc-border bg-hc-surface/40",
				children: [charts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 meta text-hc-muted",
					children: "No charts yet."
				}), charts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => loadFor(c.id),
					className: `w-full text-left px-4 py-3 border-b border-hc-border block transition-colors ${draft.id === c.id ? "bg-hc-text text-hc-bg" : "hover:bg-hc-surface"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-xs",
						children: c.kind
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "meta opacity-70",
						children: c.title
					})]
				}, c.id))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					save.mutate();
				},
				className: "border border-hc-border p-5 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "KIND (slug)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.kind,
									onChange: (e) => setDraft({
										...draft,
										kind: e.target.value
									}),
									placeholder: "tops",
									required: true,
									className: "border border-hc-border px-3 py-2 bg-hc-surface meta w-full"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "TITLE",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.title,
									onChange: (e) => setDraft({
										...draft,
										title: e.target.value
									}),
									placeholder: "TOPS & HOODIES",
									required: true,
									className: "border border-hc-border px-3 py-2 bg-hc-surface meta w-full"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "UNIT",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.unit,
									onChange: (e) => setDraft({
										...draft,
										unit: e.target.value
									}),
									placeholder: "cm",
									required: true,
									className: "border border-hc-border px-3 py-2 bg-hc-surface meta w-full"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-xs text-hc-muted",
							children: "TABLE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: addColumn,
								className: "cta cta-outline text-[10px] px-3 py-1.5",
								children: "+ COL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: addRow,
								className: "cta cta-outline text-[10px] px-3 py-1.5",
								children: "+ ROW"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto border border-hc-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-hc-text text-hc-bg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: draft.headers.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: h,
											onChange: (e) => setHeader(i, e.target.value),
											className: "w-full bg-transparent text-hc-bg label-xs px-1 py-1 outline-none"
										}), draft.headers.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => removeColumn(i),
											className: "text-hc-bg/60 hover:text-hc-danger",
											title: "Remove column",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 })
										})]
									})
								}, i)) })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: draft.rows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-hc-border",
								children: [row.map((cell, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: cell,
										onChange: (e) => setCell(ri, ci, e.target.value),
										className: "w-full bg-transparent font-mono text-xs px-1 py-1 outline-none"
									})
								}, ci)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1 w-8",
									children: draft.rows.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => removeRow(ri),
										className: "text-hc-muted hover:text-hc-danger",
										title: "Remove row",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 })
									})
								})]
							}, ri)) })]
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "NOTE",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: draft.note,
							onChange: (e) => setDraft({
								...draft,
								note: e.target.value
							}),
							rows: 2,
							className: "border border-hc-border px-3 py-2 bg-hc-surface meta w-full",
							placeholder: "Fit guidance shown under the table"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-2 border-t border-hc-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !draft.id,
							onClick: () => draft.id && confirm("Delete chart?") && remove.mutate(draft.id),
							className: "meta text-hc-muted hover:text-hc-danger disabled:opacity-30 inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 }), " DELETE"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: save.isPending,
							className: "cta cta-neon",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
									size: 14,
									className: "mr-1"
								}),
								" ",
								save.isPending ? "SAVING…" : "SAVE CHART"
							]
						})]
					})
				]
			})]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "label-xs text-hc-muted",
			children: label
		}), children]
	});
}
//#endregion
export { SizeChartsAdmin as component };
