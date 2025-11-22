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
      .from('favorites')
      .select('*', { count: 'exact' })
      .order('favorited_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.query.user_id) {
      query = query.eq('user_id', req.query.user_id);
    }

    if (req.query.resort_id) {
      query = query.eq('resort_id', req.query.resort_id);
    }

    const { data, error, count } = await query;
    handleSupabaseError(error, 'Failed to list favorites');

    res.json({
      data,
      meta: buildPageMeta({ limit, offset, count: data.length, total: typeof count === 'number' ? count : data.length }),
    });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase.from('favorites').insert([req.body]).select().single();
    handleSupabaseError(error, 'Failed to create favorite');

    res.status(201).location(`/api/v1/favorites/${data.favorite_id}`).json(data);
  })
);

router.get(
  '/:favorite_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('favorite_id', req.params.favorite_id)
      .maybeSingle();

    handleSupabaseError(error, 'Failed to fetch favorite');
    ensureFound(data, 'Favorite');
    res.json(data);
  })
);

router.delete(
  '/:favorite_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('favorites')
      .delete()
      .eq('favorite_id', req.params.favorite_id)
      .select('favorite_id')
      .maybeSingle();

    handleSupabaseError(error, 'Failed to delete favorite');
    ensureFound(data, 'Favorite');

    res.status(204).end();
  })
);

module.exports = router;
