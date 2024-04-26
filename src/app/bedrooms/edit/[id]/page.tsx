import UpdateForm from "@/components/editform";
import { getBedroomsById } from "@/lib/action";
import { notFound } from "next/navigation";

const UpdateBedroomsPage = async ({ params }: { params: { id: number } }) => {
    const id = params.id;
    const bedrooms = await getBedroomsById(id);
    console.log(id);

    if (!bedrooms) {
        notFound();
    }

    return (
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text text-center mb-2">Actualizar Habitaciones</h1>
            <UpdateForm bedrooms={bedrooms} />
        </div>
    );
};

export default UpdateBedroomsPage
