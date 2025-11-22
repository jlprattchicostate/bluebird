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
      .from('verifications')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.query.user_id) {
      query = query.eq('user_id', req.query.user_id);
    }

    if (req.query.status) {
      query = query.eq('status', req.query.status);
    }

    const { data, error, count } = await query;
    handleSupabaseError(error, 'Failed to list verifications');

    res.json({
      data,
      meta: buildPageMeta({ limit, offset, count: data.length, total: typeof count === 'number' ? count : data.length }),
    });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const payload = { status: 'pending', ...req.body };
    const { data, error } = await supabase.from('verifications').insert([payload]).select().single();
    handleSupabaseError(error, 'Failed to create verification');

    res.status(201).location(`/api/v1/verifications/${data.verification_id}`).json(data);
  })
);

router.get(
  '/:verification_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('verifications')
      .select('*')
      .eq('verification_id', req.params.verification_id)
      .maybeSingle();

    handleSupabaseError(error, 'Failed to fetch verification');
    ensureFound(data, 'Verification');
    res.json(data);
  })
);

router.patch(
  '/:verification_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('verifications')
      .update(req.body)
      .eq('verification_id', req.params.verification_id)
      .select()
      .maybeSingle();

    handleSupabaseError(error, 'Failed to update verification');
    ensureFound(data, 'Verification');

    res.json(data);
  })
);

router.delete(
  '/:verification_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('verifications')
      .delete()
      .eq('verification_id', req.params.verification_id)
      .select('verification_id')
      .maybeSingle();

    handleSupabaseError(error, 'Failed to delete verification');
    ensureFound(data, 'Verification');

    res.status(204).end();
  })
);

module.exports = router;
