import React from 'react';

const TermsAndConditions: React.FC = () => {
    return (
        <div className="max-w-lg mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Términos y Condiciones</h2>
            <div className="text-lg leading-relaxed text-justify">
                <p className="mb-4">
                    Bienvenido a nuestro sitio web. Si continúas navegando y utilizando este sitio web,
                    aceptas cumplir y estar sujeto a los siguientes términos y condiciones de uso, los
                    cuales, junto con nuestra política de privacidad, rigen la relación de nuestro sitio
                    web contigo en relación con este sitio web. Si no estás de acuerdo con alguna parte de
                    estos términos y condiciones, por favor no utilices nuestro sitio web.
                </p>
                <p className="mb-4">
                    <strong>Uso del Sitio Web:</strong> El uso de este sitio web está sujeto a los siguientes términos de uso:
                </p>
                <ul className="list-disc ml-8 mb-4">
                    <li>El contenido de las páginas de este sitio web es solo para tu información general y uso.
                        Está sujeto a cambios sin previo aviso.
                    </li>
                    <li>Ni nosotros ni terceros ofrecemos garantía alguna en cuanto a la precisión, puntualidad,
                        rendimiento, integridad o idoneidad de la información y los materiales encontrados u ofrecidos
                        en este sitio web para un propósito particular. Reconoces que dicha información y materiales
                        pueden contener inexactitudes o errores, y excluimos expresamente la responsabilidad por tales
                        inexactitudes o errores en la máxima medida permitida por la ley.
                    </li>
                    <li>Tu uso de cualquier información o materiales en este sitio web es completamente bajo tu propio
                        riesgo, y no seremos responsables. Será tu responsabilidad asegurarte de que cualquier producto,
                        servicio o información disponible a través de este sitio web satisfaga tus requisitos específicos.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TermsAndConditions;
