const express = require('express');
const supabase = require('../supabase');
const asyncHandler = require('../utils/async-handler');
const { parsePagination, buildPageMeta } = require('../utils/pagination');
const { handleSupabaseError, ensureFound } = require('../utils/supabase-helpers');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { limit, offset } = parsePagination(req.query);

    let query = supabase
      .from('resorts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.query.name) {
      query = query.ilike('name', `%${req.query.name}%`);
    }

    const { data, error, count } = await query;
    handleSupabaseError(error, 'Failed to list resorts');

    res.json({
      data,
      meta: buildPageMeta({ limit, offset, count: data.length, total: typeof count === 'number' ? count : data.length }),
    });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    const { data, error } = await supabase.from('resorts').insert([payload]).select().single();
    handleSupabaseError(error, 'Failed to create resort');

    res.status(201).location(`/api/v1/resorts/${data.resort_id}`).json(data);
  })
);

router.get(
  '/:resort_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('resorts')
      .select('*')
      .eq('resort_id', req.params.resort_id)
      .maybeSingle();

    handleSupabaseError(error, 'Failed to fetch resort');
    ensureFound(data, 'Resort');
    res.json(data);
  })
);

router.patch(
  '/:resort_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('resorts')
      .update(req.body)
      .eq('resort_id', req.params.resort_id)
      .select()
      .maybeSingle();

    handleSupabaseError(error, 'Failed to update resort');
    ensureFound(data, 'Resort');

    res.json(data);
  })
);

router.delete(
  '/:resort_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('resorts')
      .delete()
      .eq('resort_id', req.params.resort_id)
      .select('resort_id')
      .maybeSingle();

    handleSupabaseError(error, 'Failed to delete resort');
    ensureFound(data, 'Resort');

    res.status(204).end();
  })
);

module.exports = router;
