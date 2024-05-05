import { deleteBedrooms } from "@/app/actions/bedroomsAction";

export const DeleteBedrooms = ({ id, onDelete }: { id: number, onDelete: () => void }) => {
    const handleDelete = async () => {
        await deleteBedrooms(id);
        onDelete();
    }

    return (
        <button
            onClick={handleDelete}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
            Eliminar
        </button>
    );
};
