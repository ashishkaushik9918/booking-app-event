import CategoryCreateForm from "./_components/form/categoryForm";

export default function Page() {
    return (
        <>
            <div className="bg-white  px-4 p-4 rounded-sm">
                <h6 className="text-xl font-semibold border-b mb-3">Create Category</h6>
                <CategoryCreateForm/>
        </div>
        </>
    );
}