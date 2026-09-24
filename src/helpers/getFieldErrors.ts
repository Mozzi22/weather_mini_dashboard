import { z } from 'zod'

export const getFieldErrors = (error: z.ZodError) =>
  error.issues.reduce<Record<string, string[]>>(
    (errors: Record<string, string[]>, issue: z.ZodIssue) => {
      const field = issue.path[0]

      if (typeof field === 'string') {
        errors[field] ??= []
        errors[field].push(issue.message)
      }

      return errors
    },
    {}
  )
