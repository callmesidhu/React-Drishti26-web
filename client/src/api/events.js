const normalizeEvent = (event) => ({
 ...event,
 image: event.image?.trim?.() || '',
 registerOptions: event.registerOptions || [],
 details: event.details || [],
 eligibility: event.eligibility || [],
})

export async function fetchEvents(params = {}) {
 const searchParams = new URLSearchParams()

 Object.entries(params).forEach(([key, value]) => {
  if (value !== undefined && value !== null && value !== '') {
   searchParams.set(key, value)
  }
 })

 const query = searchParams.toString()
 const response = await fetch(`/api/events/${query ? `?${query}` : ''}`)

 if (!response.ok) {
  throw new Error(`Failed to fetch events: ${response.status}`)
 }

 const events = await response.json()
 return events.map(normalizeEvent)
}

export async function fetchFeaturedEvents() {
 const response = await fetch('/api/events/featured/')

 if (!response.ok) {
  throw new Error(`Failed to fetch featured events: ${response.status}`)
 }

 const events = await response.json()
 return events.map(normalizeEvent)
}
