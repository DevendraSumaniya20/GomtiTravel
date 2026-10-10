import { enquiriesStore, useEnquiries } from '../api/contactGateway.ts'
import './EnquiryInbox.css'

/** Admin view of charter enquiries, newest first. */
export function EnquiryInbox() {
  const enquiries = useEnquiries()
  if (enquiries.length === 0) return <p>No charter enquiries yet.</p>

  return (
    <div className="enquiry-inbox">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Mobile</th>
            <th scope="col">Where to</th>
            <th scope="col">Date</th>
            <th scope="col">Passengers</th>
            <th scope="col">
              <span className="enquiry-inbox__hidden">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {enquiries.toReversed().map((enquiry) => (
            <tr key={enquiry.id}>
              <th scope="row">{enquiry.name}</th>
              <td>{enquiry.phone}</td>
              <td>{enquiry.destination}</td>
              <td>{enquiry.date}</td>
              <td>{enquiry.passengers}</td>
              <td>
                <button
                  className="link"
                  onClick={() => enquiriesStore.write(enquiries.filter((other) => other.id !== enquiry.id))}
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
