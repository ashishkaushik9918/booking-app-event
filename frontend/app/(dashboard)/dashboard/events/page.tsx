import { EventTable } from "./_components/table/tableColumn";
export default function Page() {
    return (
        <div className="bg-white rounded-sm pt-1">
            <h6 className="text-xl font-semibold m-2 border-b ">Event List</h6>
            <EventTable/>
        </div>
    );
}