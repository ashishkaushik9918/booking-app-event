
import EventCreateForm from "./_components/form/EventCreateForm";
export default function Page() {
    return (
        <>
            <div className="bg-white px-4 rounded-sm py-3 shadow-sm rounded-sm">
                <h6 className="text-xl font-semibold border-b mb-2">Create Event</h6>
                <EventCreateForm />
            </div>
        </>
    );
}