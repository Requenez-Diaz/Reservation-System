import { getBedroomsById } from "@/app/actions/bedroomsAction";
import FormEditBedrooms from "@/components/habitaciones/formEditBedrooms";
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
            <h1 className="text-2xl text-center mb-2">Actualizar Habitaciones</h1>
            <FormEditBedrooms bedrooms={bedrooms} />
        </div>
    );
};

export default UpdateBedroomsPage
