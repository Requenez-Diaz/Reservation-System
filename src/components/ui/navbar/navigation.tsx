// "use client";

import Link from "next/link";
import { Button } from "../button";

const Navbar = () => {
  // const [ShowLogin, setShowLogin] = useState(false);

  // const handlerLoginButtonClick = () => {
  //   setShowLogin(true);
  // };

  // const router = useRouter();

  // const handleInitClick = () => {
  //   router.push("/");
  // };
  return (
    <>
      <div className='w-full h-20 bg-blue-950 sticky top-0'>
        <div className='container mx-auto px-4 h-full'>
          <div className='flex justify-between items-center h-full'>
            <div className='flex items-center gap-x-6'>
              <h1
                className='text-white font-extrabold'
                style={{
                  fontFamily: "cursive",
                  fontSize: "3rem",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
                Hotel Madroño
              </h1>
            </div>
            <ul className='hidden md:flex gap-x-6 text-white'>
              <li>
                <Link href='/'>
                  <p>Inicio</p>
                </Link>
              </li>
              <li>
                <Link href='/ofertas'>
                  <p>Ofertas</p>
                </Link>
              </li>
              <li>
                <Link href='/habitaciones'>
                  <p>Habitaciones</p>
                </Link>
              </li>
              <li>
                <Link href='/reservaciones'>
                  <p>Reservaciones</p>
                </Link>
              </li>
              <li>
                <Link href='/aboutUs'>
                  <p>Acerca de nosotros</p>
                </Link>
              </li>
            </ul>
            <div className='hidden md:flex gap-x-6'>
              <Button variant='ghost' className='bg-blue-600 text-white'>
                Registrarme
              </Button>
              {/* {ShowLogin && <SignInForm />} */}
              <Button variant={"secondary"} className='bg-blue-600 text-white'>
                Acceder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
