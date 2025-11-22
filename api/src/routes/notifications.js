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
      .from('notifications')
      .select('*', { count: 'exact' })
      .order('sent_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.query.user_id) {
      query = query.eq('user_id', req.query.user_id);
    }

    if (typeof req.query.read !== 'undefined') {
      const readValue = String(req.query.read).toLowerCase() === 'true';
      query = query.eq('read', readValue);
    }

    const { data, error, count } = await query;
    handleSupabaseError(error, 'Failed to list notifications');

    res.json({
      data,
      meta: buildPageMeta({ limit, offset, count: data.length, total: typeof count === 'number' ? count : data.length }),
    });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase.from('notifications').insert([req.body]).select().single();
    handleSupabaseError(error, 'Failed to create notification');

    res.status(201).location(`/api/v1/notifications/${data.notification_id}`).json(data);
  })
);

router.get(
  '/:notification_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('notification_id', req.params.notification_id)
      .maybeSingle();

    handleSupabaseError(error, 'Failed to fetch notification');
    ensureFound(data, 'Notification');
    res.json(data);
  })
);

router.patch(
  '/:notification_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('notifications')
      .update(req.body)
      .eq('notification_id', req.params.notification_id)
      .select()
      .maybeSingle();

    handleSupabaseError(error, 'Failed to update notification');
    ensureFound(data, 'Notification');

    res.json(data);
  })
);

router.delete(
  '/:notification_id',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from('notifications')
      .delete()
      .eq('notification_id', req.params.notification_id)
      .select('notification_id')
      .maybeSingle();

    handleSupabaseError(error, 'Failed to delete notification');
    ensureFound(data, 'Notification');

    res.status(204).end();
  })
);

module.exports = router;
