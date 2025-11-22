const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 200;
const MIN_LIMIT = 1;

function parsePagination(query = {}) {
  let limit = parseInt(query.limit, 10);
  if (Number.isNaN(limit)) {
    limit = DEFAULT_LIMIT;
  }
  limit = Math.max(MIN_LIMIT, Math.min(MAX_LIMIT, limit));

  let offset = parseInt(query.offset, 10);
  if (Number.isNaN(offset) || offset < 0) {
    offset = 0;
  }

  return { limit, offset };
}

function buildPageMeta({ limit, offset, count, total }) {
  return {
    limit,
    offset,
    count,
    total,
  };
}

module.exports = {
  parsePagination,
  buildPageMeta,
};
