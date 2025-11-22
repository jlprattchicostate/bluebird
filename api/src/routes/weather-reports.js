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
      .from('weather_reports')
      .select('*', { count: 'exact' })
      .order('report_time', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.query.resort_id) {
      query = query.eq('resort_id', req.query.resort_id);
    }

    if (req.query.since) {
      query = query.gte('report_time', req.query.since);
    }

    const { data, error, count } = await query;
    handleSupabaseError(error, 'Failed to list weather reports');

    res.json({
      data,
      meta: buildPageMeta({ limit, offset, count: data.length, total: typeof count === 'number' ? count : data.length }),
    });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase.from('weather_reports').insert([req.body]).select().single();
    handleSupabaseError(error, 'Failed to create weather report');

    res.status(201).location(`/api/v1/weather-reports/${data.weather_id}`).json(data);
  })
);

router.get(
  '/:weather_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('weather_reports')
      .select('*')
      .eq('weather_id', req.params.weather_id)
      .maybeSingle();

    handleSupabaseError(error, 'Failed to fetch weather report');
    ensureFound(data, 'Weather report');
    res.json(data);
  })
);

router.patch(
  '/:weather_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('weather_reports')
      .update(req.body)
      .eq('weather_id', req.params.weather_id)
      .select()
      .maybeSingle();

    handleSupabaseError(error, 'Failed to update weather report');
    ensureFound(data, 'Weather report');

    res.json(data);
  })
);

router.delete(
  '/:weather_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('weather_reports')
      .delete()
      .eq('weather_id', req.params.weather_id)
      .select('weather_id')
      .maybeSingle();

    handleSupabaseError(error, 'Failed to delete weather report');
    ensureFound(data, 'Weather report');

    res.status(204).end();
  })
);

module.exports = router;
