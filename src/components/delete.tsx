import { deleteBedrooms } from "@/lib/action";

export const DeleteButton = ({ id }: { id: number }) => {
    const DeleteBedroomsWithId = deleteBedrooms.bind(null, id);
    return (
        <form action={DeleteBedroomsWithId} className="btn btn-error">
            <button>
                Eliminar
            </button>

        </form>
    );
};

