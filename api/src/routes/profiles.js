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
      .from('profiles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.query.user_id) {
      query = query.eq('user_id', req.query.user_id);
    }

    const { data, error, count } = await query;
    handleSupabaseError(error, 'Failed to list profiles');

    res.json({
      data,
      meta: buildPageMeta({ limit, offset, count: data.length, total: typeof count === 'number' ? count : data.length }),
    });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase.from('profiles').insert([req.body]).select().single();
    handleSupabaseError(error, 'Failed to create profile');

    res.status(201).location(`/api/v1/profiles/${data.profile_id}`).json(data);
  })
);

router.get(
  '/:profile_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('profile_id', req.params.profile_id)
      .maybeSingle();

    handleSupabaseError(error, 'Failed to fetch profile');
    ensureFound(data, 'Profile');
    res.json(data);
  })
);

router.patch(
  '/:profile_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(req.body)
      .eq('profile_id', req.params.profile_id)
      .select()
      .maybeSingle();

    handleSupabaseError(error, 'Failed to update profile');
    ensureFound(data, 'Profile');

    res.json(data);
  })
);

router.delete(
  '/:profile_id',
  asyncHandler(async (req, res) => {
    const { data: existing, error: fetchError } = await supabase
      .from('profiles')
      .select('profile_id')
      .eq('profile_id', req.params.profile_id)
      .maybeSingle();

    handleSupabaseError(fetchError, 'Failed to fetch profile');
    ensureFound(existing, 'Profile');

    const { error } = await supabase.from('profiles').delete().eq('profile_id', req.params.profile_id);
    handleSupabaseError(error, 'Failed to delete profile');

    res.status(204).end();
  })
);

module.exports = router;
