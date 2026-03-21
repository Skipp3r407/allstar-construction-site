export function ContactForm() {
  return (
    <form className="card-premium space-y-4" action="#" method="post">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-[#111827]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-[#1f2937] focus:ring-2"
          placeholder="Your full name"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-[#111827]">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-[#1f2937] focus:ring-2"
            placeholder="321-315-6014"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-[#111827]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-[#1f2937] focus:ring-2"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="service" className="mb-1 block text-sm font-semibold text-[#111827]">
          Service Needed
        </label>
        <select
          id="service"
          name="service"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-[#1f2937] focus:ring-2"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select a service
          </option>
          <option>Concrete Footings</option>
          <option>Slabs & Sidewalks</option>
          <option>Pavers</option>
          <option>Masonry</option>
          <option>Pergolas</option>
          <option>Fire Pits</option>
          <option>Decks</option>
          <option>Fences</option>
          <option>Retaining Walls</option>
          <option>Other / Not Sure Yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="details" className="mb-1 block text-sm font-semibold text-[#111827]">
          Project Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-[#1f2937] focus:ring-2"
          placeholder="Tell us about your project goals, timeline, and property details."
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Request a Free Quote
      </button>
      <p className="text-xs text-[#6b7280]">
        We typically respond to quote requests within one business day.
      </p>
    </form>
  );
}
