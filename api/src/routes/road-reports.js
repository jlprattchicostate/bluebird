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
      .from('road_reports')
      .select('*', { count: 'exact' })
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.query.resort_id) {
      query = query.eq('resort_id', req.query.resort_id);
    }

    const { data, error, count } = await query;
    handleSupabaseError(error, 'Failed to list road reports');

    res.json({
      data,
      meta: buildPageMeta({ limit, offset, count: data.length, total: typeof count === 'number' ? count : data.length }),
    });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase.from('road_reports').insert([req.body]).select().single();
    handleSupabaseError(error, 'Failed to create road report');

    res.status(201).location(`/api/v1/road-reports/${data.road_id}`).json(data);
  })
);

router.get(
  '/:road_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('road_reports')
      .select('*')
      .eq('road_id', req.params.road_id)
      .maybeSingle();

    handleSupabaseError(error, 'Failed to fetch road report');
    ensureFound(data, 'Road report');
    res.json(data);
  })
);

router.patch(
  '/:road_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('road_reports')
      .update(req.body)
      .eq('road_id', req.params.road_id)
      .select()
      .maybeSingle();

    handleSupabaseError(error, 'Failed to update road report');
    ensureFound(data, 'Road report');

    res.json(data);
  })
);

router.delete(
  '/:road_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('road_reports')
      .delete()
      .eq('road_id', req.params.road_id)
      .select('road_id')
      .maybeSingle();

    handleSupabaseError(error, 'Failed to delete road report');
    ensureFound(data, 'Road report');

    res.status(204).end();
  })
);

module.exports = router;
