'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import TimeField from 'react-simple-timefield'

import { subscribe, type TSubscriptionState } from '@/app/actions/subscription'
import {
  subscriptionSchema,
  type TSubscriptionFormData
} from '@/schemas/subscription'

type TProps = {
  id: number
  city: string
}

const SubscriptionForm = ({ id, city }: TProps) => {
  const [serverErrors, setServerErrors] = useState<
    TSubscriptionState['errors']
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<TSubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      id,
      city,
      name: '',
      phone: '',
      postalCode: '',
      sendTime: '07:00'
    }
  })

  const onSubmit = async (data: TSubscriptionFormData) => {
    setServerErrors({})
    setIsSubmitting(true)
    try {
      const result = await subscribe(data)

      if (result.errors) {
        setServerErrors(result.errors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2">
          Want to stay up to date on the weather?
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
          Sign up for the daily forecast - fill out the form below.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem'
          }}
        >
          <input type="hidden" {...register('id')} />
          <input type="hidden" {...register('city')} />
          <TextField
            label="Name"
            placeholder="Taras Petrenko"
            {...register('name')}
            error={!!errors.name || !!serverErrors?.name}
            helperText={errors.name?.message ?? serverErrors?.name?.[0]}
            disabled={isSubmitting}
          />
          <TextField
            label="Phone"
            placeholder="+380XXXXXXXXX"
            {...register('phone')}
            slotProps={{
              htmlInput: {
                inputMode: 'tel'
              }
            }}
            onFocus={(event) => {
              if (!event.target.value) {
                setValue('phone', '+380')
              }
            }}
            error={!!errors.phone || !!serverErrors?.phone}
            helperText={errors.phone?.message ?? serverErrors?.phone?.[0]}
            disabled={isSubmitting}
          />
          <TextField
            label="Postal code"
            placeholder="01054"
            {...register('postalCode')}
            slotProps={{
              htmlInput: {
                inputMode: 'numeric'
              }
            }}
            error={!!errors.postalCode || !!serverErrors?.postalCode}
            helperText={
              errors.postalCode?.message ?? serverErrors?.postalCode?.[0]
            }
            disabled={isSubmitting}
          />
          <Controller
            name="sendTime"
            control={control}
            render={({ field }) => (
              <TimeField
                value={field.value}
                onChange={(_, value) => {
                  field.onChange(value)
                }}
                input={
                  <TextField
                    label="Send time"
                    placeholder="07:00"
                    error={!!errors.sendTime || !!serverErrors?.sendTime}
                    helperText={
                      errors.sendTime?.message ??
                      serverErrors?.sendTime?.[0] ??
                      'Available time: 05:00–11:00'
                    }
                    disabled={isSubmitting}
                  />
                }
              />
            )}
          />

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Subscribe'}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default SubscriptionForm
