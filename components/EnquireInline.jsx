'use client'
import { useCallback, useState } from 'react'
import EnquireFlow from './EnquireFlow'

/** The same two-step enquiry as the floating panel, sitting in the page. */
export default function EnquireInline() {
  const [service, setService] = useState(null)
  const [status, setStatus] = useState('idle')
  const onStatus = useCallback(value => setStatus(value), [])
  return (
    <div className="bp-enq-card">
      <p className="bp-enq-card-title">Start your project now</p>
      <p className="bp-enq-card-sub">{subhead(service, status)}</p>
      <EnquireFlow variant="inline" service={service} onService={setService} onStatus={onStatus} />
    </div>
  )
}

function subhead(service, status) {
  if (status === 'sent') return 'One of us will call you personally.'
  if (service) return 'Two details and we\u2019ll call you back.'
  return 'Pick what you need and we\u2019ll come back to you within one business day.'
}
