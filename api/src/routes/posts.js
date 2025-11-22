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
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.query.user_id) {
      query = query.eq('user_id', req.query.user_id);
    }

    if (req.query.resort_id) {
      query = query.eq('resort_id', req.query.resort_id);
    }

    const { data, error, count } = await query;
    handleSupabaseError(error, 'Failed to list posts');

    res.json({
      data,
      meta: buildPageMeta({ limit, offset, count: data.length, total: typeof count === 'number' ? count : data.length }),
    });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase.from('posts').insert([req.body]).select().single();
    handleSupabaseError(error, 'Failed to create post');

    res.status(201).location(`/api/v1/posts/${data.post_id}`).json(data);
  })
);

router.get(
  '/:post_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('post_id', req.params.post_id)
      .maybeSingle();

    handleSupabaseError(error, 'Failed to fetch post');
    ensureFound(data, 'Post');
    res.json(data);
  })
);

router.patch(
  '/:post_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('posts')
      .update(req.body)
      .eq('post_id', req.params.post_id)
      .select()
      .maybeSingle();

    handleSupabaseError(error, 'Failed to update post');
    ensureFound(data, 'Post');

    res.json(data);
  })
);

router.delete(
  '/:post_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('post_id', req.params.post_id)
      .select('post_id')
      .maybeSingle();

    handleSupabaseError(error, 'Failed to delete post');
    ensureFound(data, 'Post');

    res.status(204).end();
  })
);

module.exports = router;
