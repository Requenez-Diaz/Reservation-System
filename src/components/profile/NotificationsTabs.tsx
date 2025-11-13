// 'use client';

// import { useEffect, useState } from 'react';
// import { Bell } from 'lucide-react';
// import Image from 'next/image';
// import ReservationDetailModal from './ReservationDetailModal';
// import NotificationMenu from './NotificationMenu';
// import { getConfirmedNotifications } from '@/app/actions/notification/getNotification';
// import { useSession } from 'next-auth/react';

// interface User {
//   id: number;
//   username: string;
//   image?: string | null;
//   email?: string | null;
// }

// interface Notification {
//   id: number;
//   message: string;
//   user: User;
//   reservation: string | null;
//   createdAt: string;
// }

// interface SelectedReservation {
//   id: string;
//   arrivalDate: string;
//   departureDate: string;
//   bedroomsType: string;
//   status: string;
//   rooms: number;
//   guests: number;
//   formattedArrivalDate: string;
//   formattedDepartureDate: string;
//   User: {
//     image?: string;
//     username: string;
//     email: string;
//   };
// }

// export function NotificationsTab() {
//   const { data: session } = useSession();
//   const [items, setItems] = useState<Notification[]>([]);
//   const [selectedReservation, setSelectedReservation] =
//     useState<SelectedReservation | null>(null);

//   useEffect(() => {
//     const fetchAll = async () => {
//       if (!session?.user?.id) return;

//       try {
//         const response = await getConfirmedNotifications(
//           Number(session.user.id)
//         );
//         if (!response.success) {
//           console.error('Error cargando notificaciones:', response.message);
//           setItems([]);
//           return;
//         }

//         const notifications: Notification[] = response.notifications.map(
//           (n: any) => ({
//             id: n.id,
//             user: n.user,
//             message: n.message,
//             reservation: n.reservation,
//             createdAt: new Date(n.createdAt).toLocaleString('es-NI', {
//               day: '2-digit',
//               month: 'long',
//               year: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit'
//             })
//           })
//         );

//         // Ordenar por fecha más reciente
//         notifications.sort(
//           (a, b) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         );

//         setItems(notifications);
//       } catch (error) {
//         console.error('Error cargando notificaciones:', error);
//       }
//     };

//     fetchAll();
//   }, [session]);

//   // 🔹 Función para normalizar la reserva al formato que el modal espera
//   const mapToSelectedReservation = (
//     res: any,
//     user: User
//   ): SelectedReservation => ({
//     id: String(res.id ?? ''),
//     arrivalDate: res.arrivalDate ?? '',
//     departureDate: res.departureDate ?? '',
//     bedroomsType: res.bedroomsType ?? 'Habitación',
//     status: res.status ?? 'confirmada',
//     rooms: res.rooms ?? 1,
//     guests: res.guests ?? res.guestsCount ?? 1,
//     formattedArrivalDate: new Date(res.arrivalDate).toLocaleDateString('es-NI'),
//     formattedDepartureDate: new Date(res.departureDate).toLocaleDateString(
//       'es-NI'
//     ),
//     User: {
//       image: user.image ?? undefined,
//       username: user.username ?? 'Usuario',
//       email: user.email ?? 'Sin correo'
//     }
//   });

//   return (
//     <div className="p-6">
//       <h1 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-800">
//         <Bell className="h-5 w-5 text-blue-600" />
//         Notificaciones
//       </h1>

//       {items.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-10 text-gray-500">
//           <Bell className="mb-3 h-12 w-12 text-gray-400" />
//           <p className="text-lg">No tienes notificaciones 🎉</p>
//         </div>
//       ) : (
//         <ul className="space-y-4">
//           {items.map((item) => (
//             <li key={item.id}>
//               <div
//                 className="flex cursor-pointer items-center justify-between rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
//                 onClick={() => {
//                   if (!item.reservation) return;
//                   const selected = mapToSelectedReservation(
//                     item.reservation,
//                     item.user
//                   );
//                   setSelectedReservation(selected);
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   {item.user?.image ? (
//                     <div className="relative aspect-square w-10 overflow-hidden rounded-full border border-gray-300">
//                       <Image
//                         alt={item.user.username}
//                         className="object-cover"
//                         fill
//                         src={item.user.image}
//                       />
//                     </div>
//                   ) : (
//                     <div className="flex aspect-square w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
//                       {item.user?.username?.[0]?.toUpperCase() ?? 'U'}
//                     </div>
//                   )}

//                   <div className="flex flex-col">
//                     <p className="text-sm text-gray-700">
//                       <span className="font-semibold text-gray-900">
//                         {item.user?.username ?? 'Usuario'}
//                       </span>{' '}
//                       se ha confirmado una{' '}
//                       <span className="font-medium text-blue-600">
//                         {item.reservation?.bedroomsType || 'habitación'}
//                       </span>
//                       .
//                     </p>
//                     <p className="text-xs text-gray-500">{item.createdAt}</p>
//                   </div>
//                 </div>

//                 <NotificationMenu
//                   notificationId={item.id}
//                   onDeleted={() =>
//                     setItems((prev) => prev.filter((i) => i.id !== item.id))
//                   }
//                 />
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {selectedReservation && (
//         <ReservationDetailModal
//           reservation={selectedReservation}
//           selectedReservation={selectedReservation}
//           setSelectedReservation={setSelectedReservation}
//         />
//       )}
//     </div>
//   );
// }
