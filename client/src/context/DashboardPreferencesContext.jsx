import { createContext, useContext, useMemo, useState } from 'react'

const DASHBOARD_WIDGET_DEFAULTS = [
  {
    id: 'conditions',
    label: 'Daily Conditions Digest',
    description: 'Snowfall, temps, and telemetry snapshot.',
    enabled: true,
    order: 1,
  },
  {
    id: 'highlights',
    label: 'Resort Highlights',
    description: 'Favorite resorts and alert banner.',
    enabled: true,
    order: 2,
  },
  {
    id: 'community',
    label: 'Community Pulse',
    description: 'Recent rider posts and vibe tags.',
    enabled: true,
    order: 3,
  },
  {
    id: 'notifications',
    label: 'Priority Notifications',
    description: 'System + team alerts when something changes.',
    enabled: false,
    order: 4,
  },
]

const DashboardPreferencesContext = createContext(null)

export const DashboardPreferencesProvider = ({ children }) => {
  const [widgets, setWidgets] = useState(() =>
    DASHBOARD_WIDGET_DEFAULTS.map((widget) => ({ ...widget })),
  )

  const orderedWidgets = useMemo(
    () => [...widgets].sort((a, b) => a.order - b.order),
    [widgets],
  )

  const toggleWidget = (widgetId) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget,
      ),
    )
  }

  const reorderWidgets = (sourceId, targetId) => {
    if (!sourceId || !targetId || sourceId === targetId) {
      return
    }

    setWidgets((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order)
      const sourceIndex = sorted.findIndex((widget) => widget.id === sourceId)
      const targetIndex = sorted.findIndex((widget) => widget.id === targetId)

      if (sourceIndex === -1 || targetIndex === -1) {
        return prev
      }

      const [moved] = sorted.splice(sourceIndex, 1)
      sorted.splice(targetIndex, 0, moved)

      return sorted.map((widget, index) => ({ ...widget, order: index + 1 }))
    })
  }

  const value = useMemo(
    () => ({ orderedWidgets, toggleWidget, reorderWidgets }),
    [orderedWidgets],
  )

  return (
    <DashboardPreferencesContext.Provider value={value}>
      {children}
    </DashboardPreferencesContext.Provider>
  )
}

export const useDashboardPreferences = () => {
  const ctx = useContext(DashboardPreferencesContext)

  if (!ctx) {
    throw new Error('useDashboardPreferences must be used within DashboardPreferencesProvider')
  }

  return ctx
}
