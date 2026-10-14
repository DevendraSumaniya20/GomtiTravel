import { useState } from 'react'
import { removeEnquiry, useEnquiries } from '../api/contactGateway.ts'
import './EnquiryInbox.css'

type EnquiryInboxProps = {
  /** Enquiries that arrived while the page was open, marked as new. */
  newIds: ReadonlySet<string>
}

/** Admin view of the enquiries left on the public page, newest first. */
export function EnquiryInbox({ newIds }: EnquiryInboxProps) {
  const enquiries = useEnquiries()
  const [failed, setFailed] = useState(false)
  if (enquiries.length === 0) return <p>No enquiries yet.</p>

  const newCount = enquiries.filter((enquiry) => newIds.has(enquiry.id)).length

  const handled = (id: string) => {
    setFailed(false)
    removeEnquiry(id).catch(() => setFailed(true))
  }

  return (
    <div className="enquiry-inbox">
      <p role="status">
        {failed ? 'Could not remove the enquiry. Try again.' : newCount > 0 && `${newCount} new since you opened this page.`}
      </p>
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Mobile</th>
            <th scope="col">Service</th>
            <th scope="col">Date</th>
            <th scope="col">Details</th>
            <th scope="col">
              <span className="enquiry-inbox__hidden">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id}>
              <th scope="row">
                {enquiry.name}
                {newIds.has(enquiry.id) && <span className="enquiry-inbox__new">New</span>}
              </th>
              <td>{enquiry.phone}</td>
              <td>{enquiry.service}</td>
              <td>{enquiry.date}</td>
              <td>{enquiry.message}</td>
              <td>
                <button
                  className="link"
                  onClick={() => handled(enquiry.id)}
                  aria-label={`Mark the enquiry from ${enquiry.name} as handled and remove it`}
                >
                  Handled
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
