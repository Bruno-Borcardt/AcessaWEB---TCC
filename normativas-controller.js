/* Controlador sem camada visual para a futura Linha do Tempo Normativa. */
(() => {
  "use strict";

  const database = window.ACESSAWEB_NORMATIVAS;
  if (!database?.items) throw new Error("Base normativa do AcessaWEB não foi carregada.");

  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const state = { query: "", kinds: [], years: [], tags: [], selected: null };

  function searchableText(item) {
    return normalize([
      item.title, item.subtitle, item.summary, item.whyItMatters, item.scope,
      ...item.tags,
      ...item.practical.flatMap((entry) => [entry.title, entry.technical, entry.practical, entry.test, ...entry.people, ...entry.related])
    ].join(" "));
  }

  function getAll() { return clone(database.items).sort((a, b) => a.date.localeCompare(b.date)); }
  function getBySlug(slug) { const item = database.items.find((entry) => entry.slug === slug); return item ? clone(item) : null; }
  function getCriterion(itemSlug, criterionId) { return getBySlug(itemSlug)?.practical.find((entry) => entry.id === criterionId) || null; }

  function filter(options = state) {
    const query = normalize(options.query);
    const kinds = options.kinds || [];
    const years = (options.years || []).map(Number);
    const tags = (options.tags || []).map(normalize);
    return getAll().filter((item) => {
      if (query && !searchableText(item).includes(query)) return false;
      if (kinds.length && !kinds.includes(item.kind)) return false;
      if (years.length && !years.includes(item.year)) return false;
      if (tags.length && !tags.every((tag) => item.tags.map(normalize).includes(tag))) return false;
      return true;
    });
  }

  function facets() {
    return {
      years: [...new Set(database.items.map((item) => item.year))].sort((a, b) => a - b),
      kinds: [...new Set(database.items.map((item) => item.kind))].sort(),
      tags: [...new Set(database.items.flatMap((item) => item.tags))].sort((a, b) => a.localeCompare(b, "pt-BR")),
      people: [...new Set(database.items.flatMap((item) => item.practical.flatMap((entry) => entry.people)))].sort((a, b) => a.localeCompare(b, "pt-BR"))
    };
  }

  function statistics(items = database.items) {
    return {
      milestones: items.length,
      practicalTranslations: items.reduce((total, item) => total + item.practical.length, 0),
      officialSources: items.reduce((total, item) => total + item.sources.filter((source) => source.official).length, 0),
      firstYear: Math.min(...items.map((item) => item.year)),
      lastYear: Math.max(...items.map((item) => item.year))
    };
  }

  function relatedTo(slug, limit = 3) {
    const current = database.items.find((item) => item.slug === slug);
    if (!current) return [];
    const currentTags = new Set(current.tags.map(normalize));
    return database.items
      .filter((item) => item.slug !== slug)
      .map((item) => ({ item, score: item.tags.reduce((score, tag) => score + (currentTags.has(normalize(tag)) ? 1 : 0), 0) }))
      .sort((a, b) => b.score - a.score || a.item.year - b.item.year)
      .slice(0, limit)
      .map(({ item }) => clone(item));
  }

  function setState(patch) {
    Object.assign(state, patch);
    const detail = { state: clone(state), results: filter(), statistics: statistics(filter()) };
    window.dispatchEvent(new CustomEvent("acessaweb:normativas-change", { detail }));
    return detail;
  }

  function reset() { return setState({ query: "", kinds: [], years: [], tags: [], selected: null }); }
  function select(slug) { return setState({ selected: getBySlug(slug) ? slug : null }); }
  function exportData() { return clone(database); }

  window.AcessaWebNormativas = Object.freeze({
    getAll, getBySlug, getCriterion, filter, facets, statistics, relatedTo,
    setState, reset, select, exportData,
    getState: () => clone(state),
    getDisclaimer: () => database.disclaimer,
    getSchemaVersion: () => database.schemaVersion
  });
})();
