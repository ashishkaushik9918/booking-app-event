import { FieldType } from "@/types/form";
import { getUtcOptions } from "@/utils/timezones";
export const eventCreateFormField: FieldType[] = [
    {
        name: "event_name",
        label: "Event Name",
        type: "text",
        placeholder: "Enter event name",
        required: true,
        colSpan: 8,
    },
    {
        name: "event_slug",
        label: "Event Slug",
        type: "text",
        placeholder: "event-name-url",
        required: true,
        colSpan: 8,
    },
    {
        name: "event_category",
        label: "Category",
        type: "select",
        placeholder: "Select category",
        options: [],
        required: true,
        colSpan: 8,
    },
    {
        name: "event_type",
        label: "Event Type",
        type: "select",
        placeholder: "Select event type",
        options: [
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
            { label: "Invite Only", value: "invite_only" },
        ],
        required: true,
        colSpan: 8,
    },
    {
        name: "event_status",
        label: "Event Status",
        placeholder: "Select event status",
        type: "select",
        options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
            { label: "Cancelled", value: "cancelled" },
        ],
        required: true,
        colSpan: 8,
    },

    // 📝 Description


    // 📅 Date & Time
    {
        name: "start_date",
        label: "Start Date",
        type: "date",
        required: true,
        placeholder: "Event Start Date",
        colSpan: 8,
    },
    {
        name: "start_time",
        label: "Start Time",
        type: "time",
        placeholder: "Event Start Time",
        required: true,
        colSpan: 8,
    },
    {
        name: "end_date",
        label: "End Date",
        type: "date",
        placeholder: "Event End Date",
        required: true,
        colSpan: 8,
    },
    {
        name: "end_time",
        label: "End Time",
        type: "time",
        placeholder: "Event End Time",
        required: true,
        colSpan: 8,
    },
    {
        name: "timezone",
        label: "Time Zone",
        type: "select",
        placeholder: "Event Timezone",
        options: [...getUtcOptions()],
        required: true,
        colSpan: 8,
    },

    // 👥 Capacity & Booking
    {
        name: "capacity",
        label: "Max Capacity",
        type: "number",
        placeholder: "Total seats",
        required: true,
        colSpan: 8,
    },
    {
        name: "min_booking",
        label: "Min Booking",
        type: "number",
        placeholder: "Minimum Booking",
        required: false,
        colSpan: 8,
    },
    {
        name: "max_booking",
        label: "Max Booking",
        type: "number",
        placeholder: "Maximum Booking",
        required: false,
        colSpan: 8,
    },


    // 💰 Pricing
    {
        name: "price_type",
        label: "Price Type",
        placeholder: "Select price type",
        type: "select",
        options: [
            { label: "Free", value: "free" },
            { label: "Paid", value: "paid" },
            { label: "Donation", value: "donation" },
        ],
        required: true,
        colSpan: 8,
    },
    {
        name: "base_price",
        label: "Base Price",
        type: "number",
        placeholder: "Enter price",

        required: false,
        colSpan: 8,
    },
    {
        name: "tax_percentage",
        label: "Tax %",
        type: "number",
        placeholder: "Tax Percentage",
        required: false,
        colSpan: 8,
    },

    // 📍 Location
    {
        name: "venue_type",
        label: "Venue Type",
        placeholder: "Select Value Type",
        type: "select",
        options: [
            { label: "Physical", value: "physical" },
            { label: "Online", value: "online" },
            { label: "Hybrid", value: "hybrid" },
        ],
        required: true,
        colSpan: 8,
    },
    {
        name: "venue_name",
        label: "Venue Name",
        placeholder: "Venue Name",
        type: "text",
        required: false,
        colSpan: 8,
    },

    {
        name: "google_map_link",
        label: "GoogleMap",
        placeholder: "Google Map Link",
        type: "text",
        required: false,
        colSpan: 8,
    },

    // 📄 Policies



    // 📸 Media
    {
        name: "cover_image",
        label: "Cover Image",
        type: "file",
        required: true,
        colSpan: 8,
    },
    {
        name: "gallery",
        label: "Gallery Images",
        type: "file",
        required: false,
        colSpan: 8,
    },

    // 🔍 SEO (Optional but Pro)
    {
        name: "seo_title",
        label: "SEO Title",
        type: "text",
        required: false,
        placeholder: "Seo title name",
        colSpan: 8,
    },
    {
        name: "seo_description",
        label: "SEO Description",
        type: "textarea",
        placeholder: "SEO Description",
        required: false,
        colSpan: 24,
    },
    {
        name: "short_description",
        label: "Short Description",
        type: "textarea",
        placeholder: "Brief summary of the event",
        required: true,
        colSpan: 24,
    },
    {
        name: "description",
        label: "Detailed Description",
        type: "textarea",
        placeholder: "Full event details",
        required: true,
        colSpan: 24,
    },
    {
        name: "address",
        label: "Address",
        type: "textarea",
        required: false,
        placeholder: "Address details",
        colSpan: 24,
    },
    {
        name: "refund_policy",
        label: "Refund Policy",
        placeholder: "Refund Policy",
        type: "textarea",
        required: false,
        colSpan: 24,
    },
    {
        name: "cancellation_policy",
        label: "Cancellation Policy",
        placeholder: "Cancellation Policy",
        type: "textarea",
        required: false,
        colSpan: 24,
    },
    {
        name: "allow_waitlist",
        label: "Enable Waitlist",
        type: "switch",
        required: false,
        colSpan: 8,
    },
];
