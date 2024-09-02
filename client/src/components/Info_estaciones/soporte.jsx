import { FaUser, FaEnvelope, FaTag,  FaComment } from 'react-icons/fa';
import "../../stilos/soporte.css";

export default function Soporte() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
        <div className="text-center space-y-4 contactanos">
            <h2 className="text-3xl md:text-3xl font-bold">
                Envía tus consultas o comentarios
            </h2>
        </div>
          <div className="space-y-4">
            <div className="relative">
              <FaUser className="absolute top-1 left-2 text-gray-500" />
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-7">
                Nombre completo
              </label>
              <input
                id="name"
                placeholder="Ingrese su nombre completo"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute top-1 left-2 text-gray-500" />
              <label htmlFor="correo_electronico" className="block text-sm font-medium text-gray-700 ml-7">
                Correo electrónico
              </label>
              <input
                id="correo_electronico"
                placeholder="Ingrese su correo_electronico"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
              />
            </div>
            <div className="relative">
              <FaTag className="absolute top-1 left-2 text-gray-500" />
              <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 ml-7">
                Asunto
              </label>
              <input
                id="asunto"
                placeholder="Ingrese su asunto"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
              />
            </div>
            <div className="relative">
                <FaComment className="absolute top-1 left-2 text-gray-500" />
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 ml-7">
                    Mensaje
                </label>
                <textarea
                id="message"
                placeholder="Ingrese su mensaje"
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                />
            </div>
            
            <div className='contenedor-form-editar-botones'>
              <button className="boton-form-editar-perfil">
                cancelar
              </button>
              <button className="boton-form-editar-perfil">
                Enviar
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="../../../src/images2/contacto3.jpg"
            alt="Edit Profile"
            className="w-full max-w-[400px] rounded-lg bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
        // <div className="w-full min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center">
        //     <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12">
        //         <div className="border border-gray-300 rounded-lg p-6 soporte">
        //             <h1 className="text-4xl font-bold mb-2">Soporte al cliente</h1>
        //             <p className="text-muted-foreground">
        //                 Nuestro equipo de soporte está aquí para ayudarte. Revisaremos tu consulta con la mayor prontitud posible y nos pondremos en contacto contigo a la brevedad.
        //                 Para casos urgentes o asistencia inmediata, te invitamos a que nos contactes por teléfono o utilices nuestro chat en vivo. Estamos disponibles para ofrecerte el apoyo que necesitas.
        //             </p>
        //         </div>
        //         <div className="border border-gray-300 rounded-lg p-6 soporte">
        //             <h1 className="text-4xl font-bold mb-2"> Contáctanos para un pronóstico más preciso</h1>
        //             <p className="text-muted-foreground">
        //             Nuestras 10 estaciones meteorológicas te brindarán información detallada sobre el clima en tu área.
        //             </p>
        //         </div>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        //             <div className="space-y-4">
        //                 <div className="text-center space-y-4 contactanos">
        //                     <h2 className="text-3xl md:text-3xl font-bold">
        //                     Envía tus consultas o comentarios
        //                     </h2>
        //                 </div>
        //                 <form className="space-y-6">
        //                     <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
        //                         <FaUser className="ml-3 text-gray-500" />
        //                         <input
        //                             id="name"
        //                             type="text"
        //                             placeholder="Nombre completo"
        //                             className="flex-1 mt-1 py-2 px-3 border-none rounded-md text-gray-700 focus:ring-primary focus:border-primary"
        //                         />
        //                     </div>
        //                     <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
        //                         <FaEnvelope className="ml-3 text-gray-500" />
        //                         <input
        //                             id="email"
        //                             type="email"
        //                             placeholder="Correo electrónico"
        //                             className="flex-1 mt-1 py-2 px-3 border-none rounded-md text-gray-700 focus:ring-primary focus:border-primary"
        //                         />
        //                     </div>
        //                     <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
        //                         <FaTag className="ml-3 text-gray-500" />
        //                         <input
        //                             id="subject"
        //                             type="text"
        //                             placeholder="Asunto"
        //                             className="flex-1 mt-1 py-2 px-3 border-none rounded-md text-gray-700 focus:ring-primary focus:border-primary"
        //                         />
        //                     </div>
        //                     <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
        //                         <FaComment className="ml-3 text-gray-500" />
        //                         <textarea
        //                             id="message"
        //                             placeholder="Mensaje"
        //                             rows="4"
        //                             className="flex-1 mt-1 py-2 px-3 border-none rounded-md text-gray-700 focus:ring-primary focus:border-primary"
        //                         />
        //                     </div>
        //                     <button className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-primary-dark transition">
        //                         Cancelar
        //                     </button>
        //                     <button className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-primary-dark transition">
        //                         Enviar
        //                     </button>
        //                 </form>
        //             </div>
        //             <div>
        //                 <img
        //                     src="../../../src/images2/yurucamp.jpeg"
        //                     alt="Placeholder Image"
        //                     width={700}
        //                     height={700}
        //                     className="w-full h-auto rounded-lg"
        //                     style={{ aspectRatio: "700/700", objectFit: "cover" }}
        //                 />
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}
